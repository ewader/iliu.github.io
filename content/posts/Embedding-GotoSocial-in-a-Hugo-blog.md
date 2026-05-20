---
title: "把GotoSocial嵌入到Hugo"
date: 2025-10-21T11:10:32+08:00
# weight: 1
# aliases: ["/first"]
tags: ["博客","hugo","联邦宇宙"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
把博客重新换成Hugo后，我又把GotoSocial安装了起来，就是想发布自己有一些碎语之类的东西，在memos和GotoSocial中纠结了一会，最终选择了GotoSocial，主要原因还是看到memeos的作者随意改动API，为了以后不再有不必要的麻烦，还是选择一个更稳定的最好。整体完成后的效果可以参考：

[我的微博](http://iliu.org/toots)

## 总体思路
由于 GoToSocial 默认开启了严格的 CORS 限制，获取内容的时候需要token，由于Hugo是静态博客，直接把token写在前端非常不安全，所以我们需要一个中转层。
Cloudflare Workers 可以完美胜任代理转发的功能，作用是：
- 从 Hugo 前端发请求 → Cloudflare Worker
- Worker 向 https://你的域名/api/v1/accounts/.../statuses 请求 GoToSocial 数据
- Worker 再把 JSON 数据返回给 Hugo 前端
- Hugo 构建时渲染
## 获取 GoToSocial 的 toot API 接口
### 目标概述
我们要：
1. 向 https://你的域名/api/v1/apps 注册一个应用；
2. 通过浏览器授权；
3. 用授权码换取 access_token；
4. 把这个 token 放入 Cloudflare Worker 的环境变量；
5. 然后 Hugo 博客就能安全地从 Worker 获取嘟文数据。
### 详细步骤
#### 注册一个新应用
在命令行执行以下命令（用 curl，别忘了改你的 app 名称）：
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
        "client_name": "hugo-gts-proxy",
        "redirect_uris": "urn:ietf:wg:oauth:2.0:oob",
        "scopes": "read"
      }' \
  'https://你的域名/api/v1/apps'

```
成功后会返回类似：
```json
{
  "id": "01J1CYJ4QRNFZD6WHQMZV7248G",
  "name": "hugo-gts-proxy",
  "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
  "client_id": "xxxxxxxxxxxxxxxx",
  "client_secret": "yyyyyyyyyyyyyyyy"
}

```
👉 复制并保存 client_id 与 client_secret。
#### 获取授权码
打开浏览器访问以下链接（注意替换 YOUR_CLIENT_ID）：
```
https://你的域名/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=urn:ietf:wg:oauth:2.0:oob&response_type=code&scope=read

```
系统会要求你登录并授权。
点击「允许」，你会看到页面上出现：
```
Here's your out-of-band token:
YOUR_AUTHORIZATION_CODE

```
👉 复制这个 YOUR_AUTHORIZATION_CODE。
#### 用授权码换取访问令牌
然后在命令行执行：
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{
        "redirect_uri": "urn:ietf:wg:oauth:2.0:oob",
        "client_id": "YOUR_CLIENT_ID",
        "client_secret": "YOUR_CLIENT_SECRET",
        "grant_type": "authorization_code",
        "code": "YOUR_AUTHORIZATION_CODE"
      }' \
  'https://你的域名/oauth/token'

```
会返回类似：
```json
{
  "access_token": "YOUR_ACCESS_TOKEN",
  "created_at": 1729436650,
  "scope": "read",
  "token_type": "Bearer"
}

```
🎉 这就是我们需要的 access_token！
#### 验证 token 是否可用
试试看：
```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  'https://你的域名/api/v1/accounts/verify_credentials'

```
如果返回你的用户资料（ username, id, url 等），说明 token 有效 。
##  Cloudflare Worker的设置
接下来打开 Cloudflare → Workers → 你的 Worker →
「Settings」→「Variables」→「Add Variable」
```
Name: GTS_TOKEN
Value: YOUR_ACCESS_TOKEN

```
保存。
Worker 代码示例如下 👇：

<details>
<summary>点击展开查看完整的配置代码（大约 160 行）</summary>

```js

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const target = `https://你的域名${url.pathname}${url.search}`;
    const resp = await fetch(target, {
      headers: {
        "Authorization": "Bearer " + env.GTS_TOKEN,
        "User-Agent": "GTS-Proxy-Worker",
      },
    });

    if (!resp.ok) {
      return new Response(await resp.text(), {
        status: resp.status,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
细步骤
    // 并行拉取每条嘟文的回复
    const statuses = await Promise.all(data.map(async (status) => {
      let replies = [];
      try {
        const ctx = await fetch(`https://你的域名/api/v1/statuses/${status.id}/context`, {
          headers: { "Authorization": "Bearer " + env.GTS_TOKEN },
        });
        if (ctx.ok) {
          const contextData = await ctx.json();
          replies = contextData?.descendants?.map(r => ({
            id: r.id,
            content: r.content,
            account: {<details>
<summary>点击展开查看完整的配置代码（大约 100 行）</summary>
              username: r.account?.username,
              display_name: r.account?.display_name,
              avatar完全正确 ✅: r.account?.avatar,
            }
          })) || [];
        }
      } catch (err) {
        console.log("Reply fetch failed:", err);
      }

      return {
        id: status.id,
        created_at: status.created_at,
        content: status.content,
        url: status.url,
        account: {
          username: status.account?.username,
          display_name: statuexport default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "*",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers });
    }

    const target = `https://l22.org${url.pathname}${url.search}`;
    const resp = await fetch(target, {
      headers: {
        "Authorization": "Bearer " + env.GTS_TOKEN,
        "User-Agent": "GTS-Proxy-Worker",
      },
    });

    if (!resp.ok) {
      return new Response(await resp.text(), {
        status: resp.status,
        headers: { ...headers, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();

    // 并行拉取每条嘟文的回复
    const statuses = await Promise.all(data.map(async (status) => {
      let replies = [];
      try {
        const ctx = await fetch(`https://l22.org/api/v1/statuses/${status.id}/context`, {
          headers: { "Authorization": "Bearer " + env.GTS_TOKEN },
        });
        if (ctx.ok) {
          const contextData = await ctx.json();
          replies = contextData?.descendants?.map(r => ({
            id: r.id,
            content: r.content,
            account: {
              username: r.account?.username,
              display_name: r.account?.display_name,
              avatar: r.account?.avatar,
            }
          })) || [];
        }
      } catch (err) {
        console.log("Reply fetch failed:", err);
      }

      return {
        id: status.id,
        created_at: status.created_at,
        content: status.content,
        url: status.url,
        account: {
          username: status.account?.username,
          display_name: status.account?.display_name,
          avatar: status.account?.avatar,
        },
        replies_count: status.replies_count || 0,
        reblogs_count: status.reblogs_count || 0,
        favourites_count: status.favourites_count || 0,
        media_attachments: (status.media_attachments || []).map(media => ({
          url: media.url?.startsWith("/") ? "https://域名" + media.url : media.url,
          preview_url: media.preview_url?.startsWith("/") ? "https://域名" + media.preview_url : media.preview_url,
        })),
        replies,
      };
    }));

    return new Response(JSON.stringify(statuses, null, 2), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  },
};</details>
s.account?.display_name,
          avatar: status.account?.avatar,
        },
        replies_count: status.replies_count || 0,
        reblogs_count: status.reblogs_count || 0,
        favourites_count: status.favourites_count || 0,
        media_attachments: (status.media_attachments || []).map(media => ({
          url: media.url?.startsWith("/") ? "https://你的域名" + media.url : media.url,
          preview_url: media.preview_url?.startsWith("/") ? "https://你的域名" + media.preview_url : media.preview_url,
        })),
        replies,
      };
    }));

    return new Response(JSON.stringify(statuses, null, 2), {
      headers: { ...headers, "Content-Type": "application/json" },
    });
  },
};

```

</details>

### Hugo模板设置
在 Hugo 博客根目录下，新建：
```
content/toots/_index.md
layouts/_default/toots.html

```
#### 📄 content/toots/_index.md
```markdown
---
title: "我的嘟文"
description: "来自 GoToSocial 的最新动态"
---

```
#### 🧩 layouts/_default/toots.html

<details>
<summary>点击展开查看完整的配置代码（大约 280 行）</summary>


```html
{{ define "main" }}
<main class="main post-single" id="toots-page">
  <header class="page-header">
    <h1>{{ .Title }}</h1>
    {{ with .Description }}
      <p class="page-description">{{ . }}</p>
    {{ end }}
  </header>

  <div id="toots-container" class="toots"></div>

  <div class="load-more-wrapper">
    <button id="load-more-btn">加载更多嘟文</button>
  </div>

  <script>
  let tootsData = [];
  let displayedCount = 0;
  const pageSize = 5; // 每次加载条数

  // ✅ 加载嘟文
  async function loadToots(initial=false) {
    if (initial) {
      // 请注意：如果您要使用 Cloudflare Worker，这里的 URL 应该是您的 Worker URL，而不是原始 Mastodon/GoToSocial 实例的 URL。
      // 假设您的 Worker 地址是 https://worker.yourdomain.com/api/v1/accounts/01M4A5Q58VD6GJH97T2TE6W25J/statuses?exclude_reblogs=true
      const url = "https://toots.iliu.org/api/v1/accounts/01M4A5Q58VD6GJH97T2TE6W25J/statuses?exclude_reblogs=true"; 
      const res = await fetch(url);
      tootsData = await res.json();
    }

    const container = document.getElementById("toots-container");
    const nextToots = tootsData.slice(displayedCount, displayedCount + pageSize);

    for (const t of nextToots) {
      const date = new Date(t.created_at).toLocaleString();
      const username = t.account?.display_name || t.account?.username || "匿名";
      const avatar = t.account?.avatar || "https://l22.org/path-to-default-avatar.png";

      // ✅ 九宫格多图布局
      let mediaHTML = "";
      if (t.media_attachments && t.media_attachments.length > 0) {
        mediaHTML = `
          <div class="toot-media-grid">
            ${t.media_attachments.map(m => `
              <div class="toot-media-item">
                <img src="${m.preview_url || m.url}" alt="${m.description || ''}" loading="lazy" onclick="showLightbox('${m.url}')">
              </div>
            `).join('')}
          </div>
        `;
      }

      // 🚨 【修复点】直接使用 Worker 预取的 t.replies 数据来构建回复内容
      let repliesHTML = "";
      if (t.replies && t.replies.length > 0) {
        repliesHTML = `
          <div class="toot-replies">
            ${t.replies.map(r => {
              const avatar = r.account?.avatar || "https://l22.org/path-to-default-avatar.png";
              const name = r.account?.display_name || r.account?.username || "匿名";
              return `
                <div class="toot-reply">
                  <img src="${avatar}" class="toot-reply-avatar" alt="${name}">
                  <div class="toot-reply-body">
                    <strong>${name}</strong>：${r.content}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        `;
      } else if (t.replies_count > 0) {
        // 如果 Worker 没有返回 replies 但计数大于 0，可能是 Worker 拉取回复失败
        repliesHTML = `<div class="toot-replies"><p class='no-reply'>暂无回复（或Worker拉取失败）</p></div>`;
      }

      const tootHTML = `
        <article class="toot-card">
          <div class="toot-header">
            <img class="toot-avatar" src="${avatar}" alt="${username}">
            <span class="toot-username">${username}</span>
          </div>
          <div class="toot-date">
            <a href="${t.url}" target="_blank">${date}</a>
          </div>
          <div class="toot-content">${t.content}</div>
          ${mediaHTML}
          <div class="toot-footer">
            ❤️ ${t.favourites_count}　🔁 ${t.reblogs_count}　💬 ${t.replies_count}
          </div>
          ${repliesHTML}
        </article>
      `;

      container.insertAdjacentHTML("beforeend", tootHTML);
      
      // 🚨 【修复点】移除了原有的 loadReplies(t.id) 调用
    }

    displayedCount += pageSize;
    document.getElementById("load-more-btn").style.display = displayedCount >= tootsData.length ? "none" : "inline-block";
  }

  // 🚨 【修复点】移除了 loadReplies 函数

  // ✅ 初次加载
  document.getElementById("load-more-btn").onclick = () => loadToots();
  loadToots(true);

  // ✅ 简易图片灯箱
  function showLightbox(src) {
    let lightbox = document.getElementById("lightbox");
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.id = "lightbox";
      lightbox.innerHTML = `<img id="lightbox-img"><span id="lightbox-close">×</span>`;
      document.body.appendChild(lightbox);
      document.getElementById("lightbox-close").onclick = () => lightbox.classList.remove("show");
      lightbox.onclick = e => { if (e.target === lightbox) lightbox.classList.remove("show"); };
    }
    document.getElementById("lightbox-img").src = src;
    lightbox.classList.add("show");
  }
  </script>

  <style>
  /* 容器样式 */
  #toots-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 2rem;
  }

  /* 嘟文卡片 */
  .toot-card {
    background: var(--entry);
    border-radius: var(--radius);
    padding: 1rem 1.5rem;
    box-shadow: var(--shadow);
    transition: transform .2s ease, box-shadow .2s ease;
  }
  .toot-card:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-hover);
  }

  .toot-header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }
  .toot-avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
  .toot-username {
    font-weight: bold;
    color: var(--primary);
  }

  .toot-date {
    font-size: .85rem;
    color: var(--secondary);
    margin-bottom: .25rem;
  }

  .toot-content {
    font-size: 1rem;
    color: var(--primary);
    line-height: 1.6;
    overflow-wrap: break-word;
  }

  /* 九宫格多图 */
  .toot-media-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 4px;
    margin-top: .5rem;
  }
  .toot-media-item img {
    width: 100%;
    height: 100px;
    object-fit: cover;
    border-radius: 6px;
    cursor: pointer;
    transition: transform .2s ease, opacity .3s ease;
  }
  .toot-media-item img:hover {
    transform: scale(1.05);
    opacity: .9;
  }

  /* 回复样式 */
  .toot-replies {
    margin-top: .75rem;
    border-left: 2px solid var(--border);
    padding-left: .75rem;
  }
  .toot-reply {
    display: flex;
    align-items: flex-start;
    gap: .5rem;
    margin-top: .5rem;
  }
  .toot-reply-avatar {
    width: 28px;
    height: 28px;
    border-radius: 50%;
  }
  .toot-reply-body {
    font-size: .9rem;
    line-height: 1.4;
  }
  .no-reply {
    color: var(--secondary);
    font-size: .85rem;
  }

  /* 加载更多按钮 */
  .load-more-wrapper {
    text-align: center;
    margin: 2rem 0;
  }
  #load-more-btn {
    padding: .6rem 1.5rem;
    border: none;
    border-radius: 9999px;
    background: linear-gradient(90deg, #1e90ff, #0066cc);
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    box-shadow: 0 3px 10px rgba(0,0,0,.1);
    transition: all .3s ease;
  }
  #load-more-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0,0,0,.2);
  }

  /* 灯箱样式 */
  #lightbox {
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,0.8);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  #lightbox.show {
    display: flex;
  }
  #lightbox img {
    max-width: 90%;
    max-height: 85%;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(0,0,0,.5);
  }
  #lightbox-close {
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 2rem;
    color: #fff;
    cursor: pointer;
  }

  @media (prefers-color-scheme: dark) {
    .toot-card {
      background: #1c1c1c;
    }
  }
  </style>
</main>
{{ end }}

```

</details>

### 生成页面

运行：

```
hugo server

```
访问：
👉 http://localhost:1313/toots/
即可看到自动加载的嘟文列表。
部署后访问 https://你的博客域名/toots/ 就能看到相同效果。
我是把CSS和模板写到了一起，有兴趣的可以把CSS单独弄一个文件，还会更简练。

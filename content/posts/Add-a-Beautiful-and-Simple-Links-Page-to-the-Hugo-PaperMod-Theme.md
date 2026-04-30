---
title: "给Hugo PaperMod主题添加一个漂亮又简洁的友情链接页面"
date: 2025-10-13T15:45:49+08:00
# weight: 1
# aliases: ["/first"]
tags: ["博客","hugo","papermod"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true


---
 PaperMod 默认是极简风格，没有自带“友情链接（Friends / Links）”页，但是我们博主也不是互联网的孤岛，总有一些自己喜欢的左邻右舍，最简单的方法是用生成一个页面来作为友情链接页面，但是太丑了。老刘结合chatgpt，自己添加一个漂亮的友情链接页面，下面是 详细教程（以 Hugo + PaperMod 为例）：
### 一、创建友情链接页面
在你的 Hugo 项目根目录执行：
```bash
hugo new friends/_index.md

```
> 这会在 content/friends/_index.md 生成文件。
打开该文件，修改为：
```yaml
---
title: "友情链接"
layout: "friends"
summary: "那些值得一去的好地方"
---

```
（ 注意： layout 是我们下一步要创建的模板文件名。）
###  二、创建页面模板
PaperMod 的页面模板位于：
```
themes/PaperMod/layouts/

```
但我们不直接改主题文件（避免主题升级覆盖），而是复制到你的项目中：
```bash
mkdir -p layouts/_default

```
然后创建一个新模板文件：
```bash
nano layouts/_default/friends.html

```
写入以下示例模板（简洁、与 PaperMod 风格一致）：
```html
{{ define "main" }}
<main class="main-content" id="main-content">
  <article class="post-single">
    <header class="post-header">
     

      <h1 class="post-title">{{ .Title }}</h1>
      {{ with .Params.summary }}
        <p class="post-description">{{ . }}</p>
      {{ end }}
    </header>
<style>
.friend-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.2rem;
  margin-top: 1.5rem;
}
.friend-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 0.75rem;
  background: var(--entry);
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: all 0.25s ease;
}
.friend-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
}
.friend-card img {
  width: 3rem;
  height: 3rem;
  border-radius: 9999px;
  margin-right: 1rem;
}
.friend-card .text-gray-600 {
  color: var(--secondary);
}
</style>

    <div class="post-content">
      {{ .Content }}

      <div class="friend-links grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {{ range .Site.Data.friends }}
          <a href="{{ .url }}" target="_blank" rel="noopener" class="friend-card flex items-center p-4 rounded-xl shadow-sm hover:shadow-md transition">
            <img src="{{ .avatar }}" alt="{{ .name }}" class="w-12 h-12 rounded-full mr-4">
            <div>
              <div class="font-semibold">{{ .name }}</div>
              <div class="text-sm text-gray-600">{{ .desc }}</div>
            </div>
          </a>
        {{ end }}
      </div>
    </div>
  </article>
</main>
{{ end }}

```
### 三、创建数据文件（友情链接信息）
在项目根目录新建：
```
data/friends.yml
```
添加如下内容（你可以随意扩展）：
```yaml
- name: "PaperMod 官方"
  url: "https://github.com/adityatelange/hugo-PaperMod"
  avatar: "https://avatars.githubusercontent.com/u/21258296?v=4"
  desc: "简洁优雅的 Hugo 主题"

- name: "Hugo 官网"
  url: "https://gohugo.io/"
  avatar: "https://gohugo.io/images/hugo-logo-wide.svg"
  desc: "世界上最快的静态网站生成器"

- name: "老刘博客"
  url: "https://iliu.org/"
  avatar: "https://iliu.org/img/apple-touch-icon.png/"
  desc: "分享我的思考与生活"

```
### 四、将“友情链接”加入导航栏
打开 config.yml 或 config.toml（根据你使用的格式），找到菜单配置部分：
```yaml
menu:
  main:
    - identifier: friends
      name: 友情链接
      url: /friends/
      weight: 30

```
### 五、重新生成并预览
```bash
hugo server -D

```
打开浏览器访问：
```
http://localhost:1313/friends/

```
即可看到一个简洁、卡片式的友情链接页面，与 PaperMod 风格一致。
具体风格可以参考：
[老刘博客](https://iliu.org/friends/)

通过以上步骤，你就成功地为 Hugo PaperMod 主题添加了一个既美观又简洁的友情链接页面。这个页面不仅能增强你的站点互通性，还能提升用户体验。如果你喜欢，也可以根据自己的需求对样式和布局进行进一步的调整和优化。希望这篇文章对你有所帮助！

---
title: "利用cloudflare页面规则设置301永久跳转"
date: 2023-12-01T21:04:03+08:00
# weight: 1
# aliases: ["/first"]
tags: ["Cloudflare"]
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
## 前言

细心的读者可能已经发现，图南博客的域名已经由`iliu.org` 更换到`iliu.org`。这个域名是之前在`Google`注册的，可惜的80端口被墙了，也不知道是怎么实现强域名80端口的。于是在暂时使用一段时间后又使用了原域名。

前两天的时候，感觉还是需要用iliu这个域名，和博客的名字比较搭配，而且用了ssl之后，网站走的443端口，基本上也不会影响什么，所以就切换了过来。

换域名之后另一个需要的解决的事情是要把`iliu.org`的网址301跳转到新网站，以前用VPS的时候，直接在`nginx`里设置，现在不用vps了，有没有别的方法呢？答案是肯定的，而且比vps更方便。那就是使用`Cloudflare`的页面规则进行跳转。

## 方法

进入到`cloudflare`的个人中心，点击需要跳转的网站域名，点击DNS。 把域名解析到8.8.8.8，当然你解析到1.1.1.1也是可以的。然后点击规则，再点击页面规则。具体的设置如下图：![规则](https://ewader.s3.bitiful.net/blog/guize.png)

这样，就把`iliu.org`这个网站的网址，按照同样的规则，跳转到了`iliu.org`这个网站。

使用免费的`cloudflare`一个域名只有3个免费的页面规则，因此还有另外一个方法也可以实现，那就是利用`cloudflare`的`workers`。

进入到`cloudflare`的后台后，点击`Workers 和 Pages`。

点击`创建应用程序`,再点击`创建workers`：把下面的代码修改一下，复制到代码区保存。

```
/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

// Redirect requests from one domain to another

const base = "https://iliu.org"
const statusCode = 301

async function handleRequest(request) {
  const url = new URL(request.url)
  const { pathname, search } = url
  const destinationURL = base + pathname + search

  return Response.redirect(destinationURL, statusCode)
}

addEventListener("fetch", async event => {
  event.respondWith(handleRequest(event.request))
})
```

上面秩序把域名化成你的域名，然后设置workers的域名是你要转出的域名即可。

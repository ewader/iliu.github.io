---
title: "博客托管平台换成edgeone pages"
date: 2026-01-04T18:01:08+08:00
# weight: 1
# aliases: ["/first"]
tags: ["博客","hugo","edgeone"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
image: "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg"

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---

作为个人博主，Cloudflare 被称为赛博菩萨：免费 CDN、自动 SSL、无限流量。但对于中国大陆用户来说，CF 的免费版线路对联通用户来说非常的不友好——动辄 300ms+ 的延迟和高峰期的丢包，让“全球加速”变成了“全球减速”。

前两天看到1900把博客迁移到了Edgeone，速度很快，我的博客没有备案，看了下可以使用海外版，测试了一下，发现要比cf快一些，于是决定把博客从 Cloudflare 迁移了过去。

## 为什么选择 EdgeOne Pages？

虽然 EdgeOne 的 Pages 功能在目前也主要使用海外节点，但实际体验下来，它在亚洲地区的路由优化明显优于 Cloudflare 的 pages。

### 延迟表现：从“红爆”到“稳住”

* **Cloudflare**：联通线路经常在晚高峰时期，Ping 常跳到 800ms 以上。
* **EdgeOne**：同样是海外线路，EdgeOne 的 Anycast 策略似乎更懂中国开发者。实测联通和移动的延迟基本稳定在 **200ms 左右**。虽然比不上内地的“极速”，但相比 CF 的已经有了质的区别。

### 部署体验：平替 Cloudflare

EdgeOne Pages 的逻辑与 CF Pages 基本差不多，所以迁移成本几乎为零：

* **GitHub 集成**：直接关联仓库，代码推送到指定分支即可触发全量构建。
* **自动化部署**：支持常见的静态网站框架（Hexo, Hugo, VitePress 等）。
* **域名绑定**：支持自定义域名，并自动签发免费的 SSL 证书。
由于我的博客是在本地生成了html，所以，1900遇到的那些坑，我一个都没有遇到
---

## 迁移流程详解

整个迁移过程非常丝滑，三步搞定：

### 第一步：开通 Pages

登录腾讯云 EdgeOne 控制台，在左侧菜单栏找到 **“Pages”**

### 第二步：关联 GitHub 项目

授权 GitHub 账号后，选择你的博客仓库。

### 第三步：绑定域名

部署完成后，你会得到一个边缘域名。直接绑定你自己的域名，并在 DNS 服务商处将 CNAME 指向 EdgeOne 提供的地址即可。


---

## 总结

这次迁移最大的感受是：**选对路由比选大厂更重要。** EdgeOne Pages 弥补了 Cloudflare 在国内部分运营商环境下“由于链路过长导致访问缓慢”的痛点。如果你也受够了 CF 联通线路的拉跨，不妨试试这个新选择。


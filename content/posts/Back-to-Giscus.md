---
title: "博客评论换回Giscus"
date: 2025-12-30T11:31:56+08:00
# weight: 1
# aliases: ["/first"]
tags: ["博客","评论","Giscus"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
image: "https://images.pexels.com/photos/10389926/pexels-photo-10389926.jpeg"


cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---

前几天，老张他们几个人一直吐槽，说想留言还得翻墙登录 GitHub。听多了，我也动了心思，就去折腾了一下 Artalk，把博客的评论系统换了过去。

不得不说，Artalk 用起来确实舒服。界面清爽，也更像我们习惯的那种“博客评论”，不用账号体系，不用跳来跳去，交流起来顺手很多。



我用的这台VPS，本来就只是随手用来跑点轻量服务：FreshRSS、Umami，再加一个 Artalk。前两天瞎折腾系统的时候，一个不小心，把服务给折腾挂了。

更糟的是——
没备份。

于是结果也就很自然了：
FreshRSS 的数据没了，Umami 的统计没了，Artalk 里的评论，也一起消失了。


---

Artalk 并不差，甚至可以说比较完美：
它把“数据安全”这件事完全交给了使用者自己。

使用者需要考虑：

- VPS 是否稳定

- 是否做了定期备份

- 备份是否真的可恢复

- 迁移、重装、误操作怎么办

对爱折腾的人来说，这些都是“可以接受的成本”；
但对一个只是想安安静静写点东西的博客来说，这些成本其实非常高。

尤其是评论这种东西——
它不是核心内容，却往往承载着读者的痕迹与交流，一旦丢了，有时候感觉比文章丢了还让人难受。

---

所以兜兜转转，我又把评论系统换回了 Giscus。

它不完美：
要 GitHub 登录，对不少人不友好；
国内访问也谈不上顺畅；
用起来多少有点“技术味”。

但它有一个很现实的优点——省心。

评论直接存在 GitHub 仓库里，不用我操心数据库，不用备份，也不怕哪天手滑把服务器玩坏。只要 GitHub 还在，这些内容大概率就还在。

对我这种一边写博客，一边又总忍不住折腾系统的人来说，这一点反而显得特别重要。

---

这次折腾完，反倒更清楚了一件事：

越“自由”的方案，其实越吃精力；
越省事的方案，往往是把控制权交出去。

Artalk 是自由的，Giscus 是妥协的。
但对现在的我来说，这种妥协是可以接受的。

博客这东西，说到底是个慢活。
能一直写下去，比用什么技术更重要。

所以，评论系统又换回来了。
也许以后还会再折腾，但至少这一次，我想让它先安静地用一段时间。


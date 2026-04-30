---
title: "给Hugo PaperMod增加giscus评论系统"
date: 2024-02-26T14:39:25+08:00
# weight: 1
# aliases: ["/first"]
tags: [""]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true


---
自从把博客程序从`WordPress`换成`Hugo`以来，我把评论也给取消了，原因在我看来，评论有时候变成了我的负担。很多时候是为了评论而评论，或者为了获取评论而写一些迎合读者的文章，这样以来，我感觉偏离了我的初心，所以，干脆就不在布置评论。

放弃评论后，我是爽了，但是也不断的有博友反馈，希望有评论的功能，考虑再三，觉得还是加上为好。

阿甘博客里说了一个使用`artalk`的方法，之前我也部署过，不过使用这个需要VPS，维护起来也有点麻烦，后来也就不了了之了。

## giscus介绍

前几天我发现了`giscus` 这个评论系统。他有诸多的优点：

* 开源。🌏
* 无跟踪，无广告，永久免费。📡 🚫
* 无需数据库。所有数据均储存在 GitHub Discussions 中。
* 支持自定义主题！🌗
* 支持多种语言。🌐
* 高可配置性。🔧
* 自动从 GitHub 拉取新评论与编辑。🔃
* 可自建服务！🤳

唯一的缺点是评论者需要有GitHub的账户，登录后才能评论。

## 部署方法：

使用`Hugo PaperMod`部署`giscus`非常的简单

* 在你GitHub项目的开通GitHub Discussions。具体的开通方法点击[这里](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/enabling-or-disabling-github-discussions-for-a-repository)！
* 登录[giscus](https://giscus.app/zh-CN)官网，往下拉，在`配置`那个地方，输入你的GitHub项目名称
* 复制生成的代码
* 在文件夹`layouts/partials/`下新建一个名字叫`comments.html`的文件。然后把上一步复制的代码粘贴进去，保存。
* 在`hugo.yml`中，设置`comments: true`.

至此，部署完成，需要说明的是，项目一定要设置成public，不然评论可能不会显示。

PS：

系统上线后，小胡同学和老张同志都说，这个评论系统不方便。其实还好吧，主要的是部署简单。虽然能挡着一部分正常评论，但是也不会有垃圾评论了不是。
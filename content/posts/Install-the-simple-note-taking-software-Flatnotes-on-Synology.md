---
title: "在群晖里安装简单的笔记软件flatnotes"
date: 2024-10-30T03:48:47-04:00
# weight: 1
# aliases: ["/first"]
tags: ["软件","群晖"]
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
老刘这一段时间以来都是使用`VSCode`来写博客，主要是因为`anytype`对长文的支持一般，另外对`markdown`语法支持的也不够，比如表格功能就没法用`markdown`语法。但是`VSCode`有一个缺点是同步不方便，而我也想要能随时随地的写博客，直到看到`flatnotes`这个笔记软件，说它是笔记软件有点抬举它了，因为它太简洁，不过用来写博客文章是刚刚好，并且支持docker部署使用，这样只要有网络，有浏览器，就可以随时随地的写博客了。

既然合适使用，当然就要把他部署在`NAS`里，网上群晖部署的教程比较麻烦，还需要进命令行操作，其实根本不用那么麻烦，直接使用群晖默认的`docker`管理套件`container manager`来部署就行了。步骤如下：

## 首先找到flatnotes
在注册表里搜索flatnotes，选择第一个，下载
![image](https://s2.l22.org/flatnotes/flatnote1.png)

## 安装过程
下载完成后，点击安装，在端口设置，环境，存储空间设置，根据实际情况设置一下就行，其他一路下一步。
![image](https://s2.l22.org/flatnotes/flatenote2.png)
![image](https://s2.l22.org/flatnotes/flatenote3.png)

重点说一下环境变量设置，
增加如下几个字段：
```
FLATNOTES_AUTH_TYPE: password

FLATNOTES_USERNAME: user

FLATNOTES_PASSWORD: panda # 密码可自行修改

FLATNOTES_SECRET_KEY: aLongRandomSeriesOfCharacters
```
另外一个需要说明的地方是8080端口不要改成其他的，改了虽然docker不会报错，但是网页是打不开的。
## 代理设置
如果不出意外的，在浏览器里输入你NAS的ip加上你设置的端口号就应该可以打开应用了，但是我们需要的是随时随地的使用，所以还需要在NAS里设置一下代理。
### 反向代理设置方法
点击控制面板，点击登录门户，点击高级，点击反向代理服务器。
![image](https://s2.l22.org/flatnotes/flatnotes4.png)
点击新增，如下：
![image](https://s2.l22.org/flatnotes/flatnotes5.png)
至此 ，就可以愉快的使用flatnotes来写文章了，本文就是使用这个软件写的，体验非常的不错！~
![image](https://s2.l22.org/flatnotes/flatnotes6.png)
唯一的一点，这个软件好像不是实时保存，写完文章后记得保存一下

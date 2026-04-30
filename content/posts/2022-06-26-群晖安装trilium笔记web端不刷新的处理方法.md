---
title: 群晖安装trilium笔记web端不刷新的处理方法
author: 老刘

date: 2022-06-26T03:50:24+00:00
url: /4154.html
baidutui:
  - '{"remain":2999,"success":1}'
views:
  - 489
categories:
  - 齐物
  - 网站相关
tags:
  - trilium
  - websocket错误
  - 反代
  - 群晖

---
最初装上trilium上之后，发现web端新建笔记或者删除笔记等都不会刷新。也和中文博客群里的少君等人讨论过，也没有得出过什么结论，毕竟环境不同嘛，当时貌似也就我一个人遇到了这种情况。后来发现是网络有错误，是websocket链接错误。但是作为小白，也没有解决的办法。

后来张波老师也遇到了，原来用域名反代访问就会出现这个问题。群里的大神给出了NGINX下的解决方案，可是我用的群晖啊，没有nginx肿么办？

### 其实，用群晖的反代更简单 {.wp-block-heading}

打开群晖反代的设置界面，点击自定义标题，点新增，点websocket。保存，即可。<figure class="wp-block-image size-full">

<img loading="lazy" decoding="async" width="732" height="677" src="https://tunan.org/wp-content/uploads/2022/06/a29f701cb0ead1b.png" alt="" class="wp-image-4155" /> </figure>
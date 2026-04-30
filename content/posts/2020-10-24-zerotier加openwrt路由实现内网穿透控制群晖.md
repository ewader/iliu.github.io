---
title: zerotier加openwrt路由实现内网穿透控制群晖
author: 老刘

date: 2020-10-24T07:49:34+00:00
url: /3356.html
categories:
  - 齐物
---

刚开始完群晖的时候，写过一片使用zerotier进行内网穿透实现连接群晖的功能。详情《[使用zerotier进行内网穿透][1] 》但是后来升级移动宽带，带了一个光猫的路由，导致群晖成为了内网中的内网，使用zerotier总链接不上。因此，改用了frp进行内网穿透。

FRP和zerotier各有千秋，本站也一些文章来结束这些，有兴趣可以利用搜索来查询。昨天，发现路由器里带的又zerotier的插件。其实以前也见到过，只是觉得只是控制路由器，用处不大，所以也没有过多的理会。昨天，突发奇想，是不是在两台路由器都设置zerotier的情况下，能实现各自路由下的设备能访问另一台路由下的设备。网上查了一下，发现是可行的。而且，设置起来也要简单的多。

## 首先，注册zerotier

这里就不在多说了，上面那篇文章有说明如何注册。

## 在公司和家中的两台路由内都设置zerotier。

这个网上有一堆的教程，又是设置端口的，又是设置防火墙的。其实那都已经很老了，目前的的插件简单不能再简单了。

[<img loading="lazy" decoding="async" class="aligncenter size-full wp-image-3357" src="https://iliu.org/wp-content/uploads/2020/10/bae175604f2b130.png" alt="" width="641" height="429" srcset="https://iliu.org/wp-content/uploads/2020/10/bae175604f2b130.png 641w, https://iliu.org/wp-content/uploads/2020/10/bae175604f2b130-300x201.png 300w" sizes="(max-width: 641px) 100vw, 641px" />][2]

如果上图，填入zero的 id 勾选下面的运行客户端NAT。不需要在设置别的了。

## 进入zero控制台，设置路由

[<img loading="lazy" decoding="async" class="aligncenter size-large wp-image-3359" src="https://iliu.org/wp-content/uploads/2020/10/f7e0b956540676a-1024x456.png" alt="" width="1024" height="456" srcset="https://iliu.org/wp-content/uploads/2020/10/f7e0b956540676a-1024x456.png 1024w, https://iliu.org/wp-content/uploads/2020/10/f7e0b956540676a-300x134.png 300w, https://iliu.org/wp-content/uploads/2020/10/f7e0b956540676a-768x342.png 768w, https://iliu.org/wp-content/uploads/2020/10/f7e0b956540676a.png 1236w" sizes="(max-width: 1024px) 100vw, 1024px" />][3]

## 在下面add routes里进行添加

前面是你路由器的IP段，后面是zero给你分配的ip，千万不要填反了。在设置的时候要注意，家里和办公司的IP不能一致。其他的就没有关系了。设置完之后，就可以在办公室输入家里设备的IP或者在家里输入办公室设备的IP进行控制了。

 [1]: https://iliu.org/2872.html
 [2]: https://iliu.org/wp-content/uploads/2020/10/bae175604f2b130.png
 [3]: https://iliu.org/wp-content/uploads/2020/10/f7e0b956540676a.png
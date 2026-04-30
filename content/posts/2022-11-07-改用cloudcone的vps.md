---
title: 改用cloudcone的VPS
author: 老刘

date: 2022-11-07T06:58:25+00:00
url: /4285.html
baidutui:
  - '{"remain":2999,"success":1}'
views:
  - 509
like:
  - 1
categories:
  - 网站相关
tags:
  - cloudcone
  - 优惠
  - 服务器

---
上个月，由于服务器到期加上注销备案，需要找一个便宜、稳定的香港vps，大厂的云又太贵，看双十一也没有打算作活动的意思。后来看老张说起硅云的云服务器，十年之约用户的福利，2C4G一年380块钱，看了一下网上的介绍，说什么的都有。

**<mark style="background-color:rgba(0, 0, 0, 0)" class="has-inline-color has-luminous-vivid-orange-color">PS，网上的评论还真不是空穴来风，妈的，我用了一个月，退款的时候扣了我130。说是按原价计费。套路真深！</mark>**<figure class="wp-block-image">

<img decoding="async" src="https://cdn.staticaly.com/gh/ewader/img@master/20221107/OIP-C.677d9gnsgak0.webp" alt="OIP-C" /> </figure> 

抱着试试看的态度，入手了一台，下面谈谈用了快一个月的感受。

首先，VPS的系统都比较老，我常用的debian才是9.0的版本，而新版本是11了，于是，升级，从9升级到10,然后从10升级到11,用了大概1个小时。用oneinstack安装lnmp，用了大概40来分钟。把博客先迁了过来，打开速度还是不错的。硅云说的是用的cn2的线路，这点是加分项。但是它的硬盘和带宽真的是有点差。所以，无论是升级还是编译安装生产力系统都很慢。

看博客运行的还不错，打算把另外一个网站，以及我的商城之类的都迁移过来，就当是个展示吧，在这里出了点问题，另一个网站的数据库有点大，大概30m左右，用phpmyadmin，死活就是导入不进来，刚开始是数据表里有个问题，解决了这个问题之后，导入总是显示503错误。没办法，不用软件导了，直接用终端在数据库里用source的方法来导入，发现导入的时候，速度非常的慢，有的表都要几十秒甚至1分钟才能导入，不过后来算是成功搞进去了。

再来弄我的商城，安装的时候用的Mariadb10.5,商城竟然需要MYSQL5.7以上版本，按理说M也是达到了的，可能是商城程序的问题，没有兼容。那就换成Mysql好了，删除原来的Mariadb，编译安装mysql8.0,安装到中间，ssh断了，我以为是网络的问题，但是怎么重连都连不上。我觉得是我的问题，来回的升级系统，折腾数据库。那就重装系统吧。结果，等了1一个小时也没有装好。

赶紧联系客服，客服说2个小时解决。我问是什么问题，他说是硬盘的问题。看来，和我无关。这还没有咋折腾呢，硬盘就挂了，折腾了这么多的服务器，还从来没有玩坏过硬盘类。

这时候，对这个服务器就有点不满意了，然后就是备份的问题，我的备份方案是备份到本地NAS，结果是一言难尽，2m的小水管，备份是太慢了。

后来看MJJ以及城南旧事的推荐，说cloudcone也可以，看了看双11有活动，于是入手了一台，硅云已经申请退款了。

cloudcone复活节的活动<figure class="wp-block-table">

<table>
  <tr>
    <td>
      <strong>2023-复活节·VPS活动</strong>
    </td>
  </tr>
  
  <tr>
    <td>
      CPU
    </td>
    
    <td>
      内存
    </td>
    
    <td>
      硬盘
    </td>
    
    <td>
      流量/带宽/月
    </td>
    
    <td>
      价格(续费不变)
    </td>
    
    <td>
      链接
    </td>
  </tr>
  
  <tr>
    <td>
      1核
    </td>
    
    <td>
      0.5G
    </td>
    
    <td>
      20GB
    </td>
    
    <td>
      2T @1Gbps
    </td>
    
    <td>
      10.99美元/年
    </td>
    
    <td>
      <strong><a href="https://app.cloudcone.com.cn/vps/171/create?token=hashtag-2023-vps-1&ref=8581">购买</a></strong>
    </td>
  </tr>
  
  <tr>
    <td>
      2核
    </td>
    
    <td>
      2G
    </td>
    
    <td>
      80GB
    </td>
    
    <td>
      3T @1Gbps
    </td>
    
    <td>
      29.26美元/年
    </td>
    
    <td>
      <strong><a href="https://app.cloudcone.com.cn/vps/173/create?token=hashtag-2023-vps-3&ref=8581" target="_blank" rel="noreferrer noopener">购买</a></strong>
    </td>
  </tr>
  
  <tr>
    <td>
      4核
    </td>
    
    <td>
      4G
    </td>
    
    <td>
      180GB
    </td>
    
    <td>
      5T @1Gbps
    </td>
    
    <td>
      53.81美元/年
    </td>
    
    <td>
      <strong><a href="https://app.cloudcone.com.cn/vps/175/create?token=hashtag-2023-vps-5&ref=8581">购买</a></strong>
    </td>
  </tr>
  
  <tr>
    <td>
      4核
    </td>
    
    <td>
      8G
    </td>
    
    <td>
      280GB
    </td>
    
    <td>
      10T @1Gbps
    </td>
    
    <td>
      101.75美元/年
    </td>
    
    <td>
      <strong><a href="https://app.cloudcone.com/vps/176/create?token=hashtag-2023-vps-6&ref=8581" target="_blank" rel="noreferrer noopener">购买</a></strong>
    </td>
  </tr>
  
  <tr>
    <td>
      8核
    </td>
    
    <td>
      16G
    </td>
    
    <td>
      570GB
    </td>
    
    <td>
      10T @1Gbps
    </td>
    
    <td>
      199.12美元/年
    </td>
    
    <td>
      <strong><a href="https://app.cloudcone.com/vps/177/create?token=hashtag-2023-vps-7&ref=8581" target="_blank" rel="noreferrer noopener">购买</a></strong>
    </td>
  </tr>
  
  <tr>
    <td>
      <s>16核</s>
    </td>
    
    <td>
      32G
    </td>
    
    <td>
      1024GB
    </td>
    
    <td>
      10T @1Gbps
    </td>
    
    <td>
      390.00美元/年
    </td>
    
    <td>
      <strong><a href="https://app.cloudcone.com.cn/vps/109/create?token=pre-bf-6&ref=8581" target="_blank" rel="noreferrer noopener">购买</a></strong>
    </td>
  </tr>
</table></figure> 

PS

截止到目前，使用了快半年了，非常的满意
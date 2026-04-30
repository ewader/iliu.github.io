---
title: 完美解决godaddy免费空间广告条对wordpress后台的影响
author: 老刘

date: 2010-01-03T13:09:22+00:00
url: /388.html
views:
  - 836
zrz_credit_add:
  - 1
b2_post_reading_role:
  - none
b2_vote:
  - 'a:2:{s:2:"up";i:0;s:4:"down";i:0;}'
tin_post_views:
  - 660
baidu_record:
  - 1
categories:
  - 免费资源
tags:
  - godaddy免费空间
  - wordpress

---
自从从godaddy搞了域名之后，一直对它提供的免费空间耿耿于怀，用也不是，不用又觉得可惜，难怪网上都说此空间是一个鸡肋。很多童鞋都把此空间做为图床来使用，只是我觉得，这么好的一个空间，10g，300g的流量，仅仅用做图床未免有些浪费，加之目前手里也没有什么像样的空间，先前一直在有pipni的空间，各方面还比较满意，就是速度差了些，后来又觉得byethost的空间也不错，可惜IP老被封，加上本次的整顿事件，越发不敢用了，毕竟被墙以后，再找空间也麻烦。所以想来想去，还是就用godaddy提供的这个免费的空间吧。<figure class="content-img-box" id="2304">

<img decoding="async" alt="完美解决godaddy免费空间广告条对wordpress后台的影响" src="https://tunan.org/wp-content/uploads/2019/07/12594530ebe0d5.png" id="D061A37B" class="po-img-big" /> <figcaption class="addDesn"></figcaption></figure> 

要说用你的免费空间给你做做广告也不是不可以，但是加载的代码对网页有影响。对wordpress而言，主要的问题是在后台，发文章，传文件等都受到很大的影响。目前迫切需要的是，1、把后台的广告给去掉，这个网上有很多的方法。我这里就不一一介绍了，只是说我的做法是`：在admin-footer.php加上`

`<br /> function hideGoDaddy(){<br /> if( ! ( null === document.getElementById( "conash3D0" ) ) ) {<br /> gDaddy = document.getElementById( "conash3D0" );<br /> if( 'none' === gDaddy.style.display ) {}<br /> else { gDaddy.style.display = 'none'; }<br /> }<br /> }<br /> setInterval("hideGoDaddy()", 1500);<br />` 

 `这样，在后台就不会在显示广告了，但是代码造成的影响依然存在。那么就用第二步：`

`下载一个离线编辑器，通过比较我用的是zoundry raven，用这个基本上和用wordpress的后台没有什么区别，刚好是后台受到影响部分的补充。`
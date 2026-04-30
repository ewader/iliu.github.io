---
title: 只需三步，让你的wordpress在godaddy免费空间上完美呈现
author: 老刘

date: 2010-10-28T06:03:38+00:00
url: /950.html
views:
  - 1431
zrz_credit_add:
  - 1
b2_post_reading_role:
  - none
b2_vote:
  - 'a:2:{s:2:"up";i:0;s:4:"down";i:0;}'
tin_post_views:
  - 1198
categories:
  - 网站相关
tags:
  - godaddy免费空间
  - wordpress

---
以前本站有一篇文章，说是解决godaddy免费空间广告条对wordpress后台的影响，当时是采用第三方软件来实现的，但是到底有没有一种方法，能让不借用第三方软件来实现呢，答案是肯定的。而且很简单，只需要三步。

**1.隐藏前台页面广告**

打开主题文件中的“style.css”文件，在文件最后加上如下这段代码：

> #conash3D0 {height:0px; top:-1px;}

原理：使用css样式把广告上移，移到显示页面以外，谁都看不到了，实际上并没有去掉广告代码，只是“隐藏”而已**，K号的可能性比较小，但是有一定的危险，到底用不用再你。**<figure class="content-img-box" id="2306">

<img decoding="async" alt="只需三步，让你的wordpress在godaddy免费空间上完美呈现" src="https://tunan.org/wp-content/uploads/2019/07/1c5077b9935ed2.png" id="DC3A0631" class="po-img-big" /> <figcaption class="addDesn"></figcaption></figure> 

**2.恢复后台页面样式**

 ****

godaddy的广告代码破坏了wordpress后台的css样式表及js，导致后台显示不正常，在wordpresswp-includesscript-loader.php中修改：</p> 

找到print\_admin\_styles()及\_print\_scripts()函数，

将print\_admin\_styles()中的

echo &#8220;n&#8221;;

更改为

$css = @file\_get\_contents($href);

echo &#8220;&#8221;;

将\_print\_scripts()中的

echo &#8220;n&#8221;;

替换为

$js = @file\_get\_contents($src);

echo &#8220;n&#8221;.substr($js,0,-184).&#8221;n&#8221;;

之前有一个加上不少代码的修改方法，在3.01版本无效，但是我这个方法绝对是有效果的。

3、搞掉后台广告</p> 

打开“wp-adminadmin- footer.php”文件，在末尾部分

> 
的前面加上如下代码：

> </div> <div id=&#8221;\_mcePaste&#8221;>function hideGoDaddy(){</div> <div id=&#8221;\_mcePaste&#8221;>if( ! ( null === document.getElementById( “conash3D0″ ) ) ) {</div> <div id=&#8221;\_mcePaste&#8221;>gDaddy = document.getElementById( “conash3D0″ );</div> <div id=&#8221;\_mcePaste&#8221;>if( ‘none’ === gDaddy.style.display ) {}</div> <div id=&#8221;\_mcePaste&#8221;>else { gDaddy.style.display = ‘none’; }</div> <div id=&#8221;\_mcePaste&#8221;>}</div> <div id=&#8221;\_mcePaste&#8221;>}</div> <div id=&#8221;\_mcePaste&#8221;>setInterval(“hideGoDaddy()”, 1500);</div> <div id=&#8221;_mcePaste&#8221;>

至此，修改完毕，一切都很完美！后台可以用 用户名：test 密码：test来测试。 关于采用第三方软件的方法，见 <a href="http://www.lghcx.info/2010/01/388.html" target="_blank" rel="noopener noreferrer">完美解决godaddy免费空间广告条对wordpress后台的影响 | 华彩生活</a>
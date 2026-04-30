---
title: keepass配合群晖及keepasshttp实现密码快速登陆
author: 老刘

date: 2020-11-26T09:10:34+00:00
url: /3413.html
baidutui:
  - '{"remain":2999,"success":1}'
views:
  - 1993
baidu_record:
  - 1
tin_post_views:
  - 1040
categories:
  - 免费资源
tags:
  - keepass
  - 同步
  - 密码管理
  - 浏览器
  - 群晖

---
前两天看老张老师到处寻找管理密码的软件，老刘由于一直在使用Norton的密码管理，所以没有在意，后来发现Norton的服务器链接较慢，使用起来还是有点不方便，恰好又看到老张在吐槽 某个软件（主要是老刘忘记名字了）使用的问题，于是老刘就想群晖上有没有一款密码管理的软件或者套件（自从老刘入白群晖后，找软件都先考虑这个），你还别说，真的搜出来了这样一个软件，不过不是安装在群晖上，而是把数据放在群晖上，其他的客户端都从群晖来读取数据，这个软件叫Keepass。

## 为什么选择Keepass？

因为这是一款开源软件，任何人都能读它的源代码，支持所有的端，插件非常的丰富，只要你想到的功能，都有插件来实现。最重要的是免费，所以老刘毫不犹豫的上手了这个软件。

## Keepass如何把数据存储在群晖上

其实这是利用了keepass的WebDav的功能，而这个功能恰好群晖又支持。

首先，下载安装keepass.官网的地址是：[KeePass Password Safe][1]；可以到官网下载最新的版本，如果喜欢绿色版的，这个软件也又提供。

第二，群晖里的一些设置

首先登陆群晖，在套件里安装webdav。

[<img loading="lazy" decoding="async" class="aligncenter size-full wp-image-3414" src="https://tunan.org/wp-content/uploads/2020/11/c4ca4238a0b9238.png" alt="" width="633" height="381" srcset="https://tunan.org/wp-content/uploads/2020/11/c4ca4238a0b9238.png 633w, https://tunan.org/wp-content/uploads/2020/11/c4ca4238a0b9238-300x181.png 300w" sizes="(max-width: 633px) 100vw, 633px" />][2]

webdav的设置很简单，如下图，因为老刘没有公网IP，所以只能用http端口了，如果你可以用https，也可以开启5006端口

[<img loading="lazy" decoding="async" class="aligncenter size-full wp-image-3415" src="https://tunan.org/wp-content/uploads/2020/11/c81e728d9d4c2f6.png" alt="" width="739" height="507" srcset="https://tunan.org/wp-content/uploads/2020/11/c81e728d9d4c2f6.png 739w, https://tunan.org/wp-content/uploads/2020/11/c81e728d9d4c2f6-300x206.png 300w, https://tunan.org/wp-content/uploads/2020/11/c81e728d9d4c2f6-220x150.png 220w" sizes="(max-width: 739px) 100vw, 739px" />][3]

新建一个共享文件夹，专门放密码的，所以老刘就直接命名为mima了。

[<img loading="lazy" decoding="async" class="aligncenter size-full wp-image-3416" src="https://tunan.org/wp-content/uploads/2020/11/eccbc87e4b5ce2f.png" alt="" width="580" height="342" srcset="https://tunan.org/wp-content/uploads/2020/11/eccbc87e4b5ce2f.png 580w, https://tunan.org/wp-content/uploads/2020/11/eccbc87e4b5ce2f-300x177.png 300w" sizes="(max-width: 580px) 100vw, 580px" />][4]

为了安全，再给这个文件夹专门建一个新用户，这个用户只能读写mima这个文件夹，用户组就是普通的USR

[<img loading="lazy" decoding="async" class="aligncenter size-full wp-image-3417" src="https://tunan.org/wp-content/uploads/2020/11/a87ff679a2f3e71.png" alt="" width="613" height="397" srcset="https://tunan.org/wp-content/uploads/2020/11/a87ff679a2f3e71.png 613w, https://tunan.org/wp-content/uploads/2020/11/a87ff679a2f3e71-300x194.png 300w" sizes="(max-width: 613px) 100vw, 613px" />][5]

除了mima这个文件，其他的都设置成禁止访问

[<img loading="lazy" decoding="async" class="aligncenter size-full wp-image-3418" src="https://tunan.org/wp-content/uploads/2020/11/e4da3b7fbbce234.png" alt="" width="759" height="256" srcset="https://tunan.org/wp-content/uploads/2020/11/e4da3b7fbbce234.png 759w, https://tunan.org/wp-content/uploads/2020/11/e4da3b7fbbce234-300x101.png 300w" sizes="(max-width: 759px) 100vw, 759px" />][6]

应用程序里。

[<img loading="lazy" decoding="async" class="aligncenter size-full wp-image-3419" src="https://tunan.org/wp-content/uploads/2020/11/1679091c5a880fa.png" alt="" width="834" height="140" srcset="https://tunan.org/wp-content/uploads/2020/11/1679091c5a880fa.png 834w, https://tunan.org/wp-content/uploads/2020/11/1679091c5a880fa-300x50.png 300w, https://tunan.org/wp-content/uploads/2020/11/1679091c5a880fa-768x129.png 768w" sizes="(max-width: 834px) 100vw, 834px" />][7]

至此，群晖里设置完毕

## keepass设置

打开软件，点击新建数据库

[<img loading="lazy" decoding="async" class="aligncenter size-full wp-image-3421" src="https://tunan.org/wp-content/uploads/2020/11/8f14e45fceea167.png" alt="" width="925" height="573" srcset="https://tunan.org/wp-content/uploads/2020/11/8f14e45fceea167.png 925w, https://tunan.org/wp-content/uploads/2020/11/8f14e45fceea167-300x186.png 300w, https://tunan.org/wp-content/uploads/2020/11/8f14e45fceea167-768x476.png 768w" sizes="(max-width: 925px) 100vw, 925px" />][8]

如上图的位置，填入你的webdav的网址，这里有个小坑，如果保存不了，提示程序无法打开这个位置的话，需要到注册表里

HKEY\_LOCAL\_MACHINE\SYSTEM\CurrentControlSet\Services\WebClient\Parameters  
把BasicAuthLevel 值改成2，即同时支持http和https，默认只支持https，然后重启服务

至于PC上如何操作，很多教程，而且是中文，不多说了。说说密码自动填写

## 下载插件keepasshttp，

很老的插件了，直接点击下面的链接下吧，官网很慢,解压缩后，把KeePassHttp.plgx文件放到keepass的插件目录里。设置一下，端口不用改，前三项打勾，高级设置中，前两项打勾。

http://gofile.me/5x2t4/39jIZSgbC

chrome浏览器进入商店搜索KeePassHttp-Connector 安装。点击连接，然后弹出的对话框里随便输几个数字。确定即可。

&nbsp;

&nbsp;

&nbsp;

 [1]: https://keepass.info/
 [2]: https://tunan.org/wp-content/uploads/2020/11/c4ca4238a0b9238.png
 [3]: https://tunan.org/wp-content/uploads/2020/11/c81e728d9d4c2f6.png
 [4]: https://tunan.org/wp-content/uploads/2020/11/eccbc87e4b5ce2f.png
 [5]: https://tunan.org/wp-content/uploads/2020/11/a87ff679a2f3e71.png
 [6]: https://tunan.org/wp-content/uploads/2020/11/e4da3b7fbbce234.png
 [7]: https://tunan.org/wp-content/uploads/2020/11/1679091c5a880fa.png
 [8]: https://tunan.org/wp-content/uploads/2020/11/8f14e45fceea167.png
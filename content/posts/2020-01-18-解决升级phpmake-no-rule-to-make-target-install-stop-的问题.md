---
title: '解决升级PHPmake: *** No rule to make target `install’. Stop.的问题'
author: 老刘

date: 2020-01-18T10:14:33+00:00
url: /3022.html
views:
  - 3075
tin_post_views:
  - 1838
baidu_record:
  - 1
tin_rating:
  - 0,0,0,0,1
tin_rating_average:
  - 5
tin_post_likes:
  - 1
categories:
  - 网站相关
tags:
  - php
  - PHP升级

---
今天发现PHP7.3已经有7.3.13版本了，而我博客的版本还是7.3.10，所以，为了更好的安全性就决定把php升级到最新的版本。其实，oneinstack升级php版本很简单，因为已经自带了升级的程序，只需进入到oneinstack的目录，然后./upgrade，选择升级php的选项即可。

[<img loading="lazy" decoding="async" class="aligncenter size-large wp-image-3023" src="https://tunan.org/wp-content/uploads/2020/01/7cdd46e35b66157-1024x512.png" alt="" width="1024" height="512" srcset="https://tunan.org/wp-content/uploads/2020/01/7cdd46e35b66157-1024x512.png 1024w, https://tunan.org/wp-content/uploads/2020/01/7cdd46e35b66157-300x150.png 300w, https://tunan.org/wp-content/uploads/2020/01/7cdd46e35b66157-768x384.png 768w, https://tunan.org/wp-content/uploads/2020/01/7cdd46e35b66157.png 1320w" sizes="(max-width: 1024px) 100vw, 1024px" />][1]

升级一会就完成了，提示成功升级到了7.3.13。但是看了下php的版本还是7.3.10。看了下上面的代码，显示make: \*** No rule to make target \`install’. Stop.。虽然我也是菜鸟一枚，但是也看出是在编译的过程中出现了问题，导致编译不成功的。

百度上搜了一下，各种的回答，Google了一下，发现可能是安装包没有下全造成的，于是重新wget下载安装包，很快看出原因了，10k的下载速度，下了一会竟然断线了，?。

然后想出来了另外一个办法，本地下载，由于有梯子下载的很快，然后通过FTP传到src的目录了，然后运行./upgrade。编译了十来分钟，终于升级成功了。

 [1]: https://tunan.org/wp-content/uploads/2020/01/7cdd46e35b66157.png
---
title: nginx使用CDN后获取用户真实IP的方法
author: 老刘

date: 2020-12-21T07:15:11+00:00
url: /3486.html
baidutui:
  - '{"remain":3000,"success":0,"not_same_site":["https://iliu.org/3486.html"]}'
views:
  - 1848
baidu_record:
  - 1
tin_post_views:
  - 1416
categories:
  - 网站相关
tags:
  - cdn
  - Nginx
  - 真实ip

---
老刘前两天弄了个racknerd的便宜的vps，准备把一个网站放到这个vps上，再顺便把篱落的这台VPS好好的整理一下，当时装系统的时候装的是centos8，可惜这个系统明年官方就不再支持了，所以，长痛不如短痛，早晚都要换系统，不如早换。于是先把博客也迁到了这个rn的空间里。顺便又给加了个CF的套，加上之后，加的时候是扫了几个本地延迟最低的IP，直接分联通、移动、电信把这几个ip分别解析了。经过这么几天的试用，老刘觉得加了CF的速度还算差强人意。准备一直用下去。

但是加了CDN后，有一个问题，那就是不管日志里还是wordpress后台的评论里的IP都是cf的IP，无法获取用户的真实IP，这对管理网站有点麻烦，比如受到攻击或者想封一些发垃圾邮件IP的地址的时候，就没有办法。老刘记得以前看过这方面的文章。于是找了一下，把经过记录下来。

阿帕奇老刘好久没有用过了，这里只说nginx的方面，从网上的教程来看，可以分成两种。老刘把两种方法的说说

## 一、利用ngx\_http\_realip_module模块获取用户真实IP {.wp-block-heading}

由于老刘用的是oneinstack一键安装包，所以之说这个方法，lnmp一键安装包也可以用类似的方面来搞定。宝塔面板的话，就很简单，装那款免费的防火墙，里面就是cdn的设置，设置完了之后就OK了，不得不说还是可视化面板方便。好了，闲话少说，正式开始。

首先通过nginx -V我们发现默认编译的nginx并不会安装ngx\_http\_realip_module模块，我们需要重新编译nginx使其载入这个功能模块。

这里我们直接利用oneinstack的升级脚本来完成，这样做，一是很简单，二是一般不会出错，很适合初学者使用，第三，就是以后你升级nginx的话，也能一劳永逸。

<pre class="wp-block-code"><code>#增量添加参数到${nginx_configure_args}后面
vim /root/oneinstack/include/upgrade_web.sh
#在${nginx_configure_args}后面增加--with-http_realip_module即可
#大致位于升级脚本的第57行</code></pre><figure class="wp-block-image size-large">

[<img loading="lazy" decoding="async" width="500" height="301" src="https://tunan.org/wp-content/uploads/2021/01/3c4e83f775536ad.jpg" alt="" class="wp-image-3593" srcset="https://tunan.org/wp-content/uploads/2021/01/3c4e83f775536ad.jpg 500w, https://tunan.org/wp-content/uploads/2021/01/3c4e83f775536ad-300x181.jpg 300w" sizes="(max-width: 500px) 100vw, 500px" />][1]</figure> 

保存并退出，执行oneinstack的升级脚本/root/oneinstack/upgrade.sh进行nginx升级编译即可。

最后执行nginx -V查看最终编译后的结果。<figure class="wp-block-image size-large">

[<img decoding="async" src="https://tunan.org/wp-content/uploads/2020/12/43904aa51d7dce2-1024x109.png" alt="" class="wp-image-3488" />][2]</figure> 

### Nginx设置set\_real\_ip_from {.wp-block-heading}

编译好了ngx\_http\_realip\_module，现在我们只需要在Nginx配置文件中添加set\_real\_ip\_from代码到nginx.conf文件的http段落里面，老刘用的cf的，用期待的CDN类似，只有知道IP段可以了。示例如下：

<pre class="wp-block-code"><code>set_real_ip_from 103.21.244.0/22;
 set_real_ip_from 103.22.200.0/22;
 set_real_ip_from 103.31.4.0/22;
 set_real_ip_from 104.16.0.0/12;
 set_real_ip_from 108.162.192.0/18;
 set_real_ip_from 131.0.72.0/22;
 set_real_ip_from 141.101.64.0/18;
 set_real_ip_from 162.158.0.0/15;
 set_real_ip_from 172.64.0.0/13;
 set_real_ip_from 173.245.48.0/20;
 set_real_ip_from 188.114.96.0/20;
 set_real_ip_from 190.93.240.0/20;
 set_real_ip_from 197.234.240.0/22;
 set_real_ip_from 198.41.128.0/17;
 set_real_ip_from 199.27.128.0/21;
 set_real_ip_from 2400:cb00::/32;
 set_real_ip_from 2606:4700::/32;
 set_real_ip_from 2803:f800::/32;
 set_real_ip_from 2405:b500::/32;
 set_real_ip_from 2405:8100::/32;
 set_real_ip_from 2c0f:f248::/32;
 set_real_ip_from 2a06:98c0::/29;
 real_ip_header  X-Forwarded-For;
 real_ip_recursive on;</code></pre>

配置完成后，使用nginx -t检查配置文件是否存在格式问题。如果没有报错执行service nginx reload重载nginx服务即可。

然后访问网站，再次查看nginx日志，就可以正常获取到用户真实IP了。

## 二、利用nginx的日期格式来达到目的 {.wp-block-heading}

首先，将下面的代码添加到nginx.conf文件的http{后面让日志重置化：

<pre class="wp-block-code"><code>#自定义一个日志格式
log_format cdn '$http_x_forwarded_for - $remote_user &#91;$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent"';</code></pre>

然后，我们修改nginx站点原来的日志输出格式，修改access\_log /home/wwwlogs/xxxx.log; 为access\_log /home/wwwlogs/xxxx.log cdn;全部保存之后不要急着重启nginx，再次强调一个命令nginx -t，用于检查nginx配置文件是否存在错误。这是一个非常实用的命令，可以让你在业务运行的同时从起nginx服务，不至于造成业务中断或者业务停止。

这个方法的有点是不需要编译nginx，设置完了之后也是一劳永逸。但是对于oneinstack一键安装包来说，因为它已经重置了日志的格式，所以就不适用了。

## 小结 {.wp-block-heading}

以上就是两种在使用CDN后可以获取用户真实IP的方法，可以根据自己的情况来使用。

 [1]: https://tunan.org/wp-content/uploads/2021/01/3c4e83f775536ad.jpg
 [2]: https://tunan.org/wp-content/uploads/2020/12/43904aa51d7dce2.png
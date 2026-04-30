---
title: ubuntu20.10升级编译安装ibus-libpinyin输入法
author: 老刘

date: 2021-12-25T05:47:41+00:00
url: /3976.html
categories:
  - 齐物
---

以前无论是使用Uos还是linuxmint或者是ubtuntu，都是直接安装搜狗输入法。可以和ubuntu兼容最好的还是自带的ibus-libpinyin，开始的时候觉得这个输入法的词库比较小，用起来很不方便，但是后来发现这个输入法加入新的云输入引擎后，使用体验大幅上升，并且再加上额外的词库的话，用起来已经是非常方便了。

ubuntu20.10自带的是1.20.0的版本，这个版本已经有了云输入引擎，但是不能把云输入引擎里的词自动添加到用户的本地词库里，而最新版已经解决了这个问题。要升级输入法，只能编译安装，Linux的不方便之处就在于此。## 首先，下载ibus-libpinyin输入法源码 

源码地址是：<https://github.com/libpinyin/ibus-libpinyin>

## 第二步，安装编译环境 

<pre class="wp-block-code"><code>sudo apt install libibus-1.0-dev
sudo apt install sqlite3
sudo apt install libsqlite3-dev
sudo apt install libpinyin13-dev
sudo apt install libgtk-3-dev
sudo apt install libjson-glib-dev
sudo apt install libsoup2.4-dev
sudo apt install gnome-common checkinstall
</code></pre>

## 第三步，编译输入法 

<pre class="wp-block-code"><code>./autogen.sh --prefix=/usr/  --enable-cloud-input-mode
make
sudo make install</code></pre>

至此，安装结束。在编译的第一步骤中，如果编译成功的化，应该出现以下的文字：

Build options:  
Version 1.20.2  
Install prefix /usr  
Use boost no  
Use opencc no  
Use libpinyin yes  
Build lua extension no  
Build stroke input mode yes  
Build cloud input mode ye  
Build english input mode yes

一般出错的化都是编译环境缺少一些组件，按照提示安装即可。
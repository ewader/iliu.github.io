---
title: Django设置使用MySql的时候遇到的一些坑
author: 老刘

date: 2022-11-18T00:17:14+00:00
url: /4298.html
baidutui:
  - '{"remain":2999,"success":1}'
views:
  - 182
categories:
  - 网站相关
tags:
  - django
  - mysql

---
Django默认使用的数据库是sqllit,如果是一个小项目的话是完全够用的，但是如果考虑到这个项目未来的话，一般都会换成Mysql或者其他更专业的数据库。本文，就来说说，在设置使用mysql的时候，遇到的一些问题及解决的方法。<figure class="wp-block-image">

<img decoding="async" src="https://cdn.staticaly.com/gh/ewader/img@master/20221118/OIP-C.3x9vnetzw6m0.webp" alt="OIP-C" /> </figure> 

## 项目里设置引用Mysql {.wp-block-heading}

在setting.py里,把原来使用sqllit的语句删除或者注释掉，添加如下代码

<pre class="wp-block-code"><code>DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',   # 数据库引擎
        'NAME': '',  # 数据库名，先前创建的
        'USER': '',     # 用户名，可以自己创建用户
        'PASSWORD': '',  # 密码
        'HOST': '127.0.0.1',  # mysql服务所在的主机ip
        'PORT': '3306',         # mysql服务端口
    }
}</code></pre>

**安装Python访问MySQL的模块**

Django官方已经不建议使用pymysql库了，而是改用mysqlclient，直接pip安装即可。

<pre class="wp-block-code"><code>pip install mysqlclient</code></pre>

在debian11上安装的时候，显示OSError: mysql_config not found的错误，查询得知，需要安装libmysqlclient-dev，但是用apt install libmysqlclient-dev的时候，安装不成功，提示是另一个分支，建议安装libmariadb-dev。所以安装这个即可。

<pre class="wp-block-code"><code>apt install libmariadb-dev</code></pre>

出错：error: command &#8216;x86_64-linux-gnu-gcc&#8217; failed: No such file or directory

<pre class="wp-block-code"><code>sudo apt-get install build-essential python3-dev libssl-dev libffi-dev libxml2 libxml2-dev libxslt1-dev zlib1g-dev
</code></pre>
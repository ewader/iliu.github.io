---
title: "从WordPress转到Hugo"
date: 2023-11-01T21:35:36+08:00
# weight: 1
# aliases: ["/first"]
tags: ["Hugo"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
url: /frome-wordpress-to-hugo

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
在cloudcone上买的VPS马上就要到期了，由于去年买的是黑五预售，比正经黑五的机子要贵20来块钱，而且配置还要低一些。所以，续费是不能续费的了。原本打算在荷兰的liteserver这个上面暂时放一段时间。这是一台2c2g的机子，装完php、MySQL、和Nginx之后，只要运行一段时间，内存就基本上爆了。再加上最近lnmp和oneinstack都被收购而且被挂恶意代码，也不想用宝塔之类的面板，自己编译环境又很麻烦。于是，就产生了转成静态博客的想法。在这里也要感谢阿甘和韩宇的帮助。

原本以为很复杂，其实操作下来发现也是挺简单的。

## 首先，WordPress的文章转换成md文件

这里有大佬已经整好了，我是使用的插件的形式。 在WordPress的插件目录`wp-content/plugins/`下，直接克隆`WordPress to Hugo Exporter`的源码。

```
$ git clone https://github.com/SchumacherFM/wordpress-to-hugo-exporter.git
```

然后进到网站的后台，在插件里启用这个插件。在工具里，点`Export to Hugo`。会下载一个压缩包，这个压缩包就是你网站的文章转换成的md文件。 这个插件很好用，能保留网站原来的目录，换成Hugo后，搜索引擎的收录不会受到影响。

## 第二步，安装Hugo

我是用的系统是Ubuntu22.04，所以直接安装就好了。

```
sudo snap install hugo
hugo new site youweb
```

然后进入到你的网站文件夹，找一个喜欢的主题。一般主题都会有使用的方法，按照使用方法安装即可。 另外主题里面也都会有网站设置的样板，把样板文件`hugo.yml`放到网站的根目录，按照自己网站的域名啥的设置一下。

安装设置完成后，把你下载的文件，md文件copy到content这个文件夹，图片之类的放到static。然后

```
hugo server
```

打开浏览器，localhost：1313，文章是不是显示出来了？

## 第三，生成HTML文件，并上传

使用代码

```
hugo
```

然后把public这个文件夹的内容传到你的虚拟主机、VPS或者GitHub，Cloudflare page等，再绑定域名就可以了。 至于如何操作，网上的教程大把的，直接参考就行了。

## 测试一下代码高亮

代码：

```
<link href="/artalk/Artalk.css" rel="stylesheet">
<script src="/artalk/Artalk.js"></script>

<!-- Artalk -->
<div id="Comments"></div>

<script>
  Artalk.init({
    el:        '#Comments',
    pageKey:   '{{ .Permalink }}',
    pageTitle: '{{ .Title }}',
    server:    '{{ $.Site.Params.artalk.server }}',
    site:      '{{ $.Site.Params.artalk.site }}',
    // ...你的其他配置
  })
</script>
```
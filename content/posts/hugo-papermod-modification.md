---
title: "Hugo-papermod主题的优化记录"
date: 2023-11-04T21:30:05+08:00
# weight: 1
# aliases: ["/first"]
tags: ["博客"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
在上一篇文章中曾经说到把博客从WordPress转到了Hugo，经过这几天的使用，发现还是很不错的，用起来也比较方便。但是，在使用PaperMod主题的时候，也是遇到了一些问题，本文就遇到的问题作一个记录。目前，主题的代码高亮功能还是没有搞定，不过也是影响不大，先放一放也无所谓。

### 首页不显示文章

把WordPress导出的md文件导入的Hugo的psots目录后，在使用代码创建新文件时候

```
hugo new posts/***.md
```

发现新建的md文件，生成网页后不会在首页显示。但是在栏目里是会有的。后来的在@[阿甘博客](https://www.sharpgan.com/)博客的提醒下，使用导出的md文件的文档属性标头，成功的显示了。但是，每次在生成文章md的时候，都需要手动的更改，不是太方便。后来，在看某篇文章的时候得到启发，修改archetypes/default.md,把默认的代码删除，改成：

```
---
title: "{{ replace .Name "-" " " | title }}" 
author: 老刘

date: {{ .Date }}
url: /optics-weekly-issue-8/
categories:
  - 齐物
---
```

然后，再创建md文件后，只需要修改一下url里的值就OK了。

### 增加评论功能

这个主要是copy了阿甘博客的方法。 在artalk的官方文档中找到`Artalk.css`和`Artalk.js`文件的cdn地址然后下载到本地，在hugo项目根目录的/static文件夹下面新建一个叫 artalk的文件夹，然后把前述两个静态文件放进这个文件夹

创建模板文件 /主题目录/layouts/partials/comment/artalk.html，文件内容如下：

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

文章页模板 /主题目录/layouts/\_default/single.html 合适的位置添加：

```
<div class="article-comments">
  {{- partial "comment/artalk" . -}}
</div>
```

具体位置为`single.html`文件的{{- if (.Param “comments”) }}判断体中，完整的代码如下：

```
{{- if (.Param "comments") }}
  <div class="article-comments">
  {{- partial "comment/artalk" . -}}
</div>
  {{- end }}
```

然后在 Hugo 配置文件中添加如下内容：

```
params:
  artalk:
    server: 'https://artalk.sharpgan.com'
    site: '图南博客'
```

至于artalk的部署方法，可以用docker来部署，官方有详细的方法

### 不加载CSS和JS

这个问题有点玄学，很多教程给出的答案都是去Cloudflare里修改，使优化不压缩js和CSS，但是在我这里没有效果。看了错误的提示好像是SHA-256完整性的检查不通过，浏览器阻塞了。 一般的解决办法是： 是要么关闭 SRI，要么取消 Cloudflare 的「Auto Minify」。 Cloudflare 关闭的方法：速度 - 优化 - Auto Minify。 在 Hugo 中关闭的方法：

```
params:
  assets:
    disableFingerprinting: true
```

但是，在我这里怎么搞都没有用。 后来看到一个哥们的博客，网址我忘掉了，通过修改一个值，搞定了。 在 themes\\PaperMod\\layouts\\partials 文件夹下找到一个 head.html 文件，发现里面确实有 integrity\="{{ \$stylesheet.Data.Integrity }}" 这么一句代码，把它改为 integrity\="" 然后重新发布

### 代码高亮

这个我参考了阿甘和其他的一些文章，但是都没有成功，有时候有一点颜色，有时候一丢丢颜色也没有。我感觉可能是和物品修改了上面的那个head.html有关系。 然而，我的猜测是错误❌的，加上那个代码也没有用。然后我回复用官方的一个dome，发现是可以显示代码高亮的，仔细查看了我的配置文件和官方的配置文件的差别，发现是在设置代码高亮的那个地方，有一个选项不能是true，不然就不显示，太玄学了。 具体代码：

```
highlight:

# anchorLineNos: true

noClasses: false

# anchorLineNos: true

#codeFences: true

#guessSyntax: true

lineNos: true

style: monokai
```
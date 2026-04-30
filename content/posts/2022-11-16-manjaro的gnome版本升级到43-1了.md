---
title: manjaro的gnome版本升级到43.1了
author: 老刘

date: 2022-11-16T01:40:50+00:00
url: /4295.html
baidutui:
  - '{"remain":2999,"success":1}'
views:
  - 278
like:
  - 1
categories:
  - 齐物
tags:
  - gnome
  - manjaro
  - 升级

---
都说使用manjaro最频繁使用的就是命令是

<pre class="wp-block-code"><code>sudo pacman -Syyu</code></pre>

这不，照例这么运行了一下，提示有更新，好家伙下载了1g多，不过更新替换后，系统反而小了1m。当时也没有注意更新了啥，直到我点击了这里，发现快速设置菜单变了。  
<img decoding="async" src="https://cdn.staticaly.com/gh/ewader/img@master/20221116/截图-2022-11-16-09-12-36.356jzs54ykg0.webp" alt="截图-2022-11-16-09-12-36" />  
发现整个改变了，看了一下系统才发现原来是更新了gnome，现在已经是最新版的了，不得不说，如果想用linux的最新版本，还的使用ARCH系的。滚动更新，yyds。  
**_gnome43更新了不少东西。别说这些东西win都有。_**

## 文件管理器自适应侧边栏 {.wp-block-heading}

现在的文件管理器可以根据打开窗口的尺寸，自动调整侧边了，当较小尺寸的时候，侧边栏可以自动隐藏。

## 文件夹上带图标了 {.wp-block-heading}

GNOME 43 中以文件和目录旁边的小图标的形象卷土重来。这些图标代表着类型，如符号链接、只读等。此外，这些图标会根据你的主题改变它们的颜色，而且一个文件也可以有多个图标。  
<img decoding="async" src="https://cdn.staticaly.com/gh/ewader/img@master/20221116/截图-2022-11-16-09-35-48.5yg6ny0lrwk0.webp" alt="截图-2022-11-16-09-35-48" /> 

## 更新后原来使用的插件没有发现异常 {.wp-block-heading}

GNome比较烦人的一点是，桌面的极简化，想实现一些功能必须安装插件，如果GNOME升级了，而插件没有升级，就会出错，现在看来，manjaro的策略还是比较成功的，延缓一些再发布，给开发者时间适配新版本，目前来说使用的几个插件都没有发现什么问题。
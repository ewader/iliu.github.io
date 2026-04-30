---
title: manjaro安装配置fcitx5输入法
author: 老刘

date: 2022-01-06T09:38:19+00:00
url: /4016.html
categories:
  - 齐物
---

网上很多文章都说manjaro多么的牛叉，软件如何的多，如何的稳定，滚动更新如何的方便等等等等。下午没事，在一台不怎么用的电脑上试用了一下这个系统。kde的界面很漂亮，运行也流畅，但就是没使用习惯，总体来说不如debian系的方便。也可能是我用习惯了的缘故吧。记得张波老师在群里问过manjaro如何安装输入法的问题，特意安装了最新的fcitx5输入法。

## 以下是安装流程 

<pre class="wp-block-code"><code>sudo pacman -S fcitx5-im fcitx5-chinese-addons fcitx5-qt fcitx5-gtk
#安装 Fcitx5主体、配置工具、输入法引擎及中文输入法模块
sudo nano  /etc/environment

GTK_IM_MODULE=fcitx
QT_IM_MODULE=fcitx
XMODIFIERS=@im=fcitx
SDL_IM_MODULE=fcitx
GLFW_IM_MODULE=ibus
</code></pre>

然后注销一下系统，输入法的图标就已经出来了。

## 然后安装词库 

<pre class="wp-block-code"><code>sudo pacman -S fcitx5-pinyin-zhwiki
#安装中文维基百科词库
sudo pacman -S fcitx5-pinyin-moegirl
#安装二刺螈萌娘百科词库 
</code></pre>

## 一点坑 

安装完成后，切换到中文输入法状态，显示拼音不可用，老刘找了很多教程也没有发现有用的，后来更新了一下系统，输入法正常使用了。如果，你也正受到这个问题的影响，不妨更新一下系统试试。

## 最后说一下 

这个系统真的使用不习惯，新手不建议使用，目前强烈推荐使用uos家庭版。经过最近一段时间的试用，最新版电脑死机的问题已经修复了，安装简单，并且软件丰富，连原生的Linux版本的微信都是绑定了uos系统。可见国家对这个系统的支持。
---
title: 在manjaro中安装使用Rime并启用雾凇输入法
author: 老刘

date: 2023-04-23T09:47:27+00:00
url: /4367.html

categories:
  - 齐物

---
前几天，在朋友的推荐下，使用了小狼毫rime输入法，不过那是在Windows11里使用的，装的另外一个系统是manjaro，偶尔想搞几下Python代码的时候会使用，在这个系统里一直使用的Fcitx5，这个输入法也是挺成熟的了，用起来也很不错，不过既然在Windows里使用了rime就想在manjaro里也使用。## 安装方法 

首先要安装Fcitx5输入法框架，由于老刘已经在使用了，所以这一步就省略了，如果你还没有安装Fcitx5输入法，请参考老刘的另一篇文章，《[manjaro安装配置Fcitx5输入法][1]》。

<pre class="wp-block-code"><code>sudo pacman -S fcitx5-rime 
</code></pre>

就这么一行简单的代码就可以，然后在输入法的配置里，把rime加入进来，这时候，rime已经是可以使用的了，选择明月输入法即可。

由于我们是要用雾凇的词库，因此还需要把雾凇的词库设置一下。在manjaro下配置雾凇词库其实和Windows下类似，老刘从网上找的一些教程，包括官方写Arch的安装方法是：

<pre class="wp-block-code"><code># paru 默认会每次重新评估 pkgver，所以有新的提交时 paru 会自动更新，
# yay 默认未开启此功能，可以通过此命令开启
# yay -Y --devel --save

paru -S rime-ice-git
# yay -S rime-ice-git
</code></pre>

实际这么安装之后，输入法里并没有出现雾凇拼音。于是，老刘参考之前写的《[开始试用小狼毫输入法][2]》里设置雾凇拼音的方法，直接在https://github.com/iDvel/rime-ice下载代码，解压后把解压出来的文件放在$HOME/.local/share/fcitx5/rime/里，输入法里已经出现了雾凇拼音，至此已经可以使用了。

在manjaro里使用rime体验和Windows下一致，非常的丝滑，并且词库很全，包括颜文字，推荐大家使用。

 [1]: https://iliu.org/4016.html
 [2]: https://iliu.org/4357.html
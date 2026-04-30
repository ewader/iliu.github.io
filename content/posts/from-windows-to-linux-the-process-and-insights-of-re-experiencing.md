---
title: "从 Windows 到 Linux：重新体验的过程与心得"
date: 2025-09-23T10:13:07+08:00
# weight: 1
# aliases: ["/first"]
tags: ["Linux"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
url: /from-windows-to-linux-the-process-and-insights-of-re-experiencing

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
几年前，我使用过一段时间Linux，后来因为没有官方的微信客户端，并且每三个月需要报税的软件只能在Windows上使用，所以我放弃了Linux，转而使用了Windows 11，过了几年，便懒得再折腾。最近，电脑偶尔会出现卡顿的情况，每次都需要重启才能解决。我曾经重置过系统，但问题依然没有得到彻底解决。恰好，我看到某位博友写的主力使用Ubuntu24的博客，因此，我决定重新尝试使用Linux，毕竟我的电脑使用场景非常简单，除了偶尔报税，其它基本需求都能在Linux下实现。

### 我的需求

1. 写博客：主要使用思源笔记。
2. 上网：浏览网页，查找资料。
3. 微信：官方已经出了客户端，体验基本上和Windows上一致
4. 偶尔结合AI写点小程序：一些简单的开发任务。
5. 每三个月报税一次：这一点只能在Windows下实现。

对于我来说，Linux完全可以满足上述需求，除了报税以外，其他都可以在Linux上顺利完成。

### 选择发行版

我尝试过几个Linux发行版，分别是：

- Deepin：虽然其界面精美，但安装过程中出现了问题——将系统烧录到U盘后，安装时屏幕闪烁，无法正常安装，因此我放弃了。
- Ubuntu：安装没有问题，系统也非常流畅。不过，由于Snap源中有些软件版本过低，且GitHub上没有直接的deb包，我在使用“科学”时遇到了些许麻烦。同时，安装WPS时，还需要去Windows系统中搞字体，非常繁琐。
- EndeavourOS：最终我选择了EndeavourOS，使用GNOME桌面环境。这个发行版的软件更新较为及时，且桌面体验与Ubuntu非常相似。安装和使用都非常顺利，整体性能也非常好。

### 安装过程

现在Linux的安装已经变得非常简单。回想起1999年左右的那段日子，记得我有个室友想尝试安装Linux，结果不但没有成功，还把硬盘搞得无法识别，最后不得不花钱请人来重新分区。现在的安装过程就简单得多了。

我的分区方案如下：

- Snap分区：8GB
- EFI分区：4GB（其实EFI不需要这么大，分区时手滑多了个0，结果就这样了）
- 系统分区：80GB
- Home分区：剩余的全部分配给了Home

安装过程也非常简便，选择在线安装后，可以根据需要选择桌面环境。分区完后，只需要按照提示操作就能完成安装。

### 安装后的使用

安装完成后，我就开始配置常用软件了。以下是我目前使用的一些软件：

1. 微信：archlinux安装软件现在是非常的方便了，直接用yay命令，省去了到处找软件的步骤，这也是很多人使用Arch Linux的原因。
2. 思源笔记：写博客、做笔记时使用，功能强大且稳定。
3. SSH客户端（WindTerm）：这是我在Windows下也常用的工具，功能全面，非常推荐。
4. 小狼毫输入法（RIM）：为Linux提供了中文输入支持，配合雾凇拼音方案，和Windows下体验一致
5. Edge、Chrome浏览器：Microsoft的浏览器在Linux下也运行流畅。
6. WPS：在Linux上安装WPS办公套件，安装时需要同时安装相关字体，方便使用。

例如，如果要安装微信，只需要在终端输入以下命令：

```undefined
yay wechat
```

然后按照提示选择你要安装的软件即可，比macOS和Windows上的软件安装要简单得多。这是我安装完成后的截图：

![](https://s2.l22.org/%E6%88%AA%E5%9B%BE%202025-09-23%2009-12-41.png)

### 总结

Linux的安装和使用已经变得越来越方便，尤其是对于像我这样需求简单的用户。通过选择EndeavourOS和GNOME桌面，我可以顺利完成日常的写作、上网、使用微信、开发小程序等任务。虽然报税这一场景仍然需要依赖Windows，但除此之外，Linux已经足够满足我的工作和生活需求。

如果你也是个需求简单的用户，或许可以考虑尝试Linux系统。无论是安装过程的简便，还是软件的丰富性，都能给你带来不小的惊喜。


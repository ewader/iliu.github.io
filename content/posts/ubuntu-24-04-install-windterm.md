---
title: "Ubuntu24.04安装Windterm"
date: 2025-10-02T10:33:29+08:00
# weight: 1
# aliases: ["/first"]
tags: ["Linux"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true

url: /ubuntu-24-04-install-windterm
cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
经过这一段时间的使用Linux，我发现确实是可以满足我日常的使用。系统也流畅，再没有了之前使用Windows 11的时候偶尔的卡顿，决定长期使用了。既然要长期使用那么EndeavourOS就不是太适合了，毕竟这个以Archlinux为基础的系统，追求的是新而不是稳定。所以我决定换成Ubuntu，而之前科学软件换了一款之后，影响我使用的因素也不存在了。

换了Ubuntu之后，我常用的微信，wps，anytype等软件都有deb的安装包，只有windterm是源码的形式。没法直接点击安装，当然，可以在终端中用命令直接打开，但是不是很方便。找了一下网上的方法，也没有能很好的解决，最终还是借助ai,才安装成功。如下：

## 下载

在这里下载最新的源码：[https://github.com/kingToolbox/WindTerm](https://github.com/kingToolbox/WindTerm?ref=iliu.org)

## 安装

首先在opt下建立一个叫windterm的文件夹，把刚才下载的源代码解压复制过去。然后按下列步骤进行：

### 1. 给可执行权限

进入目录，确保主程序能运行：

```bash
cd /opt/windterm 
sudo chmod +x WindTerm
```

```bash
/opt/windterm/WindTerm
```

如果能启动，就说明没有问题

### 建立软链接（让你直接用 windterm 启动）（可选）

```bash
sudo ln -s /opt/windterm/WindTerm /usr/local/bin/windterm
```

```bash
windterm
```

之后在终端输入这个命令，就能直接用了

### 创建桌面图标（应用菜单里显示）

新建一个 .desktop 文件：

```bash
sudo nano /usr/share/applications/windterm.desktop
```

输入以下内容：

```ini
[Desktop Entry]
Name=WindTerm
Exec=/opt/windterm/WindTerm
Icon=/opt/windterm/windterm.png
Type=Application
Categories=Utility;TerminalEmulator;
```

保存并退出。然后刷新数据库：

```bash
sudo update-desktop-database
```

现在你就可以在应用菜单里找到 **WindTerm** 了。

ubuntu-24-04-install-windterm
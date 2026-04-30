---
title: "EndeavourOS安装之后的几件事"
date: 2023-11-08T21:22:44+08:00
# weight: 1
# aliases: ["/first"]
tags: ["系统"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
url: /A-few-things-after-installing-EndeavourOS/

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
很多追求新，追求精简的Linux系统的使用者，往往都会推荐Arch Linux，这个系统特点是精简，精简到什么都需要你来搞定，所以也让很多人望而却步。

![最终效果](https://iliu.org/tupian/2023-11-08.png)

后来有人根据Arch Linux开发出manjaro这个系统，一问世就获得了用户的好评，但是，后来manjaro的发展也偏离了初心，EndeavourOs可以简便了Arch Linux的安装，但是又不多添加零碎，是最接近Arch Linux的系统了。老刘原来用Ubuntu，但是又不想到处去找想要安装的软件，所以换成了EndeavourOs，为了打造更好用的系统，老刘安装后做了如下的优化，文章小白可以参考，大佬请路过。

## 安装输入法

老刘比较喜欢用的小狼毫的输入法，这个在Linux平台下，叫rime输入法，aur里什么都用，直接命令安装就行：

```bash
yay ibus ibus-rime #安装输入法框架及输入法
#安装雾凇拼音
git clone --depth=1 https://github.com/rime/plum 
cd plum
bash rime-install iDvel/rime-ice:others/recipes/full
#以后更新词库这样
bash rime-install iDvel/rime-ice:others/recipes/all_dicts
```

## 安装各种需要的软件

### 微信和QQ

不得不说，腾讯真的阻碍了中国国产系统的发展，之前QQ死活不弄Linux的，后来出了一个不能用的Linux版本，直到今年才算出了真正意义上的QQ，但是现在微信Linux版依然是基本没法用，不过好在有wine，偶尔凑合的用一下还是可以的。

```bash
yay linuxqq
yay wechat deepin
```

选择你喜欢的版本即可。

### Visual Studio Code

```bash
yay visual studio code
#这里不建议使用code那个版本，虽然是开源的，但是我觉得没有官方版本好用
```

### 笔记软件obsidian

```
yay obsidian
```

### Hugo

```
yay hugo
```

### zsh

系统自带的是bash，我比较喜欢用的是zsh，因为功能更强大。

```bash
sudo pacman -S zsh
sudo pacman -S zsh-autosuggestions
sudo pacman -S zsh-syntax-highlighting
sudo pacman -S zsh-theme-powerlevel10k
```

然后，设置默认shell位zsh

```shell
chsh -s /usr/bin/zsh
```

开始配置，我使用了一个脚本

```shell
yay -S oh-my-zsh-git
cp /usr/share/oh-my-zsh/zshrc ~/.zshrc
```

重新打开终端，应该就是zsh了，不过现在还不是很好用，我们需要在配置一下。

编辑\~/.zshrc文件，找到ZSH\_THEME\=“robbyrussell"在这里改成自己想要的主题名字就行了，打开新的终端就能看到效果，我用的是agnoste。找到`plugins=(git)`这个位置，加上几个我们之前安装的插件。

```shell
plugins=(
git
autojump
zsh-syntax-highlighting
zsh-autosuggestions
)
```

注意，不要用逗号之类的标点符号。重新打开终端试试吧，比默认的bash好用的多了。

### Microsoft edge

```bash
yay microsoft edge #版本比较多，选你喜欢的安装即可
```

总而言之，用Arch Linux系，想要什么软件，直接yay即可。在这方面，要比Windows安装软件方便的多😄。

## 对系统进行一点优化

### 安装插件

gnome做的是实在太精简了，所以还要搞一点点的优化才用好。这个就需要用到插件了。Chrome和Firefox浏览器都用gnome的插件。在浏览器里搜gnome然后，安装上就行。不过这里有个坑，浏览器显示缺少一个叫chrome-gnome-shell软件，你的第一反应一定是

```shell
yay chrome gnome shell
```

但是很不幸，这个已经没有了，改名了，正确的做法是：

```shell
yay -S gnome-browser-connector
```

现在你可以在浏览器上安装你要的插件了，目前用了以下三个

#### dash to dock

这个玩意不装的话，鼠标移动到dock栏不会自动出来，装上就方便很多

#### 农历插件

这个插件可以显示农历，但是节气有时候不太对。装之前需要装另外一个软件

```shell
yay -Sy lunar-date
```

#### 天气插件

这个插件可以在时间的那个位置显示天气信息，用的是挪威的天气源，能看个大概
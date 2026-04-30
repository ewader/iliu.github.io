---
title: "Ubuntu25.10编译安装Ibus-libpinyin "
date: 2026-01-14T17:04:40+08:00
# weight: 1
# aliases: ["/first"]
tags: ["linux","输入法"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
image: "https://images.unsplash.com/photo-1679245883026-adea0f43e6f4?q=80&w=2064&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
"

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
前几年用ubuntu的时候，也写过[编译升级](https://iliu.org/3976.html)的方法，5年过去，旧的方法已经不适合现在的需要了，中间编译的时候，编译环境还是缺的蛮多的，不过好在有了AI，在AI的帮助下，总算是编译安装好了。

默认你已经下载了输入法的最新源码。

## 首先需要安装libpinyin

安装ibus-libpinyin官方的教程很简单的说，需要：
- ibus
- libpinyin
- sqlite3

### 安装基础工具

在开始之前，确保编译环境是完整的：

```bash
sudo apt update
sudo apt install build-essential autoconf automake libtool pkg-config intltool gettext

```

### 依赖库清单

针对你遇到的所有 `configure` 报错，这里是对应的 Ubuntu 软件包：

| 缺失项 (报错显示) | 对应的安装包 (Ubuntu) |
| --- | --- |
| `glib-2.0` | `libglib2.0-dev` |
| `db.h` / `version 5` | `libdb5.3-dev` |
| `ibus-1.0` | `libibus-1.0-dev` |
| `sqlite3` | `libsqlite3-dev` |
| `lua >= 5.1` | `liblua5.1-0-dev` |
| `libnotify` | `libnotify-dev` |
| `libsoup-3.0` | `libsoup-3.0-dev` |
| `json-glib-1.0` | `libjson-glib-dev` |

**一键安装命令：**

```bash
sudo apt install libglib2.0-dev libdb5.3-dev libibus-1.0-dev libsqlite3-dev \
liblua5.1-0-dev libnotify-dev libsoup-3.0-dev libjson-glib-dev

```

### 编译

由于 Makefile 存在并行逻辑缺陷（即你遇到的 `.tmp` 文件找不到的问题），请务必按此顺序执行：

```bash
# 进入源码目录
./autogen.sh --prefix=/usr/  --enable-cloud-input-mode
make
sudo make install

# 核心：先单线程处理 data 目录，防止 sed 读写冲突
make -j1

# 成功后可执行安装
sudo make install
sudo ldconfig       # 刷新动态链接库

```

### 常见问题排查

* **安装后找不到输入法？**
执行 `ibus-daemon -drx` 重启 IBus。
* **缺少 pinyin-data？**
`libpinyin` 只是引擎，通常还需要 `pinyin-data`（词库文件）。如果运行报错，检查 `/usr/share/libpinyin/` 下是否有数据。

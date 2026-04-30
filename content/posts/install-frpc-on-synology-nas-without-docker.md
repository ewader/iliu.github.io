---
title: "群晖NAS安装FRP客户端（frpc）"
date: 2025-10-11T08:12:42+08:00
# weight: 1
# aliases: ["/first"]
tags: ["群晖"]
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
今年5月份的时候，购买了一款搬瓦工的VPS，当时是想用来做博客的VPS，用的是美西的优化线路，速度非常的理想，前几天我又把博客系统转回到了`Hugo`，这样这台VPS就空出来了，加上最近群晖的`QC`以及`tailscale`这些都不太理想，所以我决定使用FRP的方式来穿透群晖。搜了一下网上的教程都是采用的`docker`，但是我安装后总是报错，所以研究了一下，采用直接安装的方式，省资源还不容易出错。本文详细介绍如何在用户目录下部署frpc，并实现开机自启。
### 一、FRP 简介
`FRP（Fast Reverse Proxy）`是一款高性能反向代理应用，可实现 内网穿透。
通过在公网服务器上运行 `frps（服务端）`，在内网设备上运行 `frpc（客户端）`，你就可以从外网直接访问局域网中的群晖 DSM、SSH 等服务。
### 二、准备条件
一台有公网IP的服务器，这里老刘推荐[`搬瓦工`](https://bandwagonhost.com/aff.php?aff=78194)的美西优化线路，速度非常的理想。购买服务器后，安装1panel面板，然后在应用里搜索FRP，安装frps。到这里，你所需要的条件如下：
- 公网服务器 IP（frps）：104.***....
- 认证 token：xxxxx
- 群晖局域网 IP：192.168.3.19
- 群晖登录用户：xxxxx

token、端口号这些可以在你安装的frps应用里查找。
### 三、在群晖上安装 frpc
#### 1. 进入用户目录
```bash
cd /var/services/homes/xxxxx
```
> 放在用户目录无需 root 权限，最安全。
#### 2. 下载 frpc
#### x86\_64 群晖（Intel/AMD 平台）
```
wget https://ghproxy.net/https://github.com/fatedier/frp/releases/download/v0.61.1/frp_0.61.1_linux_amd64.tar.gz
```
#### ARM64 群晖（J 系列或低功耗 NAS）
```
wget https://ghproxy.net/https://github.com/fatedier/frp/releases/download/v0.61.1/frp_0.61.1_linux_arm64.tar.gz
```
解压并重命名：
```bash
tar -zxvf frp_0.61.1_linux_amd64.tar.gz
mv frp_0.61.1_linux_amd64 frp
cd frp
```
### 四、创建配置文件
```bash
nano frpc.toml
```
写入内容：
```toml
serverAddr = "104.***.***.***"
serverPort = 7000
auth.token = "xxxxx"

[[proxies]]
name = "synology_web"
type = "tcp"
localIP = "192.168.3.19"
localPort = 5000
remotePort = 5000

[[proxies]]
name = "synology_ssh"
type = "tcp"
localIP = "192.168.3.19"
localPort = 22
remotePort = 6000
```
保存退出。
### 五、测试运行
```bash
./frpc -c ./frpc.toml
```
若看到：
```
start proxy success
```
说明连接成功。
### 六、后台运行（可选）
```bash
nohup ./frpc -c ./frpc.toml > frpc.log 2>&1 &
```
查看日志：
```
tail -f frpc.log
```
停止运行：
```bash
ps aux | grep frpc
kill [进程号]
```
### 七、开机自启（可选）
1. DSM → 控制面板 → 计划任务 → 创建 → “触发的任务” → “用户定义的脚本”
2. 用户选择 xxxxx或者root
3. 脚本内容：
```
/var/services/homes/xxxxx/frp/frpc -c /var/services/homes/xxxxx/frp/frpc.toml
```
1. 保存并勾选“启动时运行”
### 八、验证连接
在外网访问：
```
http://公网服务器IP:5000
```
如果配置了 SSH 通道：
```
ssh xxxxx@公网服务器IP -p 6000
```
即可远程登录群晖。
### ✅ 总结
- 所有文件都放在 用户目录下，无需 root 权限
- 支持 DSM 重启后自动运行
- 安装简单、权限安全、长期稳定


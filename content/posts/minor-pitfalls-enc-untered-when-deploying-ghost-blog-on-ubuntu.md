---
title: "Ubuntu部署ghost博客所踩的小坑"
date: 2025-08-06T08:26:28+08:00
# weight: 1
# aliases: ["/first"]
tags: ["Linux"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
url: /minor-pitfalls-enc-untered-when-deploying-ghost-blog-on-ubuntu

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
Ghost 6.0 发布后，我就被它宣传的“联邦宇宙（Activitypub）”和“内置 Web 分析”功能狠狠吸引了。可惜一直用的 1Panel 面板并没有 Ghost 的升级选项，考虑到 Ghost 6 改动幅度较大，盲猜1Panel里的Docker需要重建，再加上想要尽快体验ghost的联邦宇宙等功能，所以打算用官方推荐的方式“一劳永逸”。

---

## 换系统，换方式

我挑了个快要过期的 VPS 练手，把系统换成了 **Ubuntu 24.04**。结果部署异常顺利，Ghost 6.0 安装一气呵成。于是果断把主 VPS 也重装，迁移博客数据，正式切换新架构。

Ghost 官方推荐部署环境如下：

- ✅ Ubuntu 22.04 或 24.04
- ✅ MySQL 8+
- ✅ Node.js v22（**仅支持这个版本**）
- ✅ Nginx
- ✅ Ghost-CLI 工具
- ✅ 一个非 root 的 sudo 用户

---

## 安装步骤（Ubuntu 24.04）

### 创建非 root 用户

```bash
adduser ghostuser
usermod -aG sudo ghostuser
su - ghostuser
```

---

### 安装系统依赖

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install nginx mysql-server -y
sudo ufw allow 'Nginx Full'
```

---

### 配置 MySQL 密码认证

Ghost 不支持 `auth_socket` 模式，需要切换为 `mysql_native_password`：

```bash
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your-password';
FLUSH PRIVILEGES;
EXIT;
```

建议运行：

```bash
sudo mysql_secure_installation
```

---

### 安装 Node.js v22

```bash
sudo apt install -y ca-certificates curl gnupg
sudo mkdir -p /etc/apt/keyrings

curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | \
  sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg

NODE_MAJOR=22
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | \
  sudo tee /etc/apt/sources.list.d/nodesource.list

sudo apt update
sudo apt install -y nodejs

node -v && npm -v
```

---

### 👻 安装 Ghost-CLI

```bash
sudo npm install -g ghost-cli
```

---

### 创建网站目录并设置权限

```bash
sudo mkdir -p /var/www/ghost
sudo chown ghostuser:ghostuser /var/www/ghost
cd /var/www/ghost
```

---

## 正式安装 Ghost

```bash
ghost install
```

安装过程会提示：

- 博客域名（输入完整的 `https://xxx.com`）
- 数据库配置
- 是否自动配置 nginx / SSL / systemd 服务

---

## 踩坑记：Let’s Encrypt 安装失败

安装 SSL 证书这一步卡住了，错误信息如下：

```csharp
Message: Command failed: /bin/sh -c sudo -S -p '#node-sudo-passwd#'  ./acme.sh --install ...
[Wed Aug 6 04:16:11 UTC 2025] It is recommended to install crontab first.
[Wed Aug 6 04:16:11 UTC 2025] Pre-check failed, cannot install
```

### 原因：

系统没装 `cron`，Ghost-CLI 在安装 Let’s Encrypt 时依赖 `acme.sh`，它需要用 cron 来自动续签证书。

### 解决方法：

```bash
sudo apt install cron
```

然后重新运行安装：

```bash
ghost install ssl
```

或干脆执行：

```bash
ghost setup ssl
```

问题顺利解决。

---

## 联邦宇宙 & Web 分析体验反馈

原以为 Ghost 6.0 的“联邦宇宙”和“内置分析”是开箱即用的神器，实际用下来有点不如预期：

### 🌐 联邦宇宙（ActivityPub）

- ✅ 博主可以被 Mastodon 等联邦平台关注，也可以关注他人
- ❌ 目前**不支持客户端功能**
- ⚠️ 功能还稍微有点粗糙

如果你指望 Ghost 成为一个真正“联邦社交平台”，目前还差点火候。

---

### 📊 Web Analytics

- ✅ 轻量级内置分析功能（无需 GA）
- ❌ **并不是完全“内建”** ，依赖第三方的统计分析
- ⚠️ 需要额外配置

期待的“零配置可视化分析面板”暂时没有出现。

---

## 🧾 日常维护命令

```bash
ghost status       # 查看服务状态
ghost restart      # 重启 Ghost
ghost upgrade      # 升级 Ghost 和依赖
ghost doctor       # 健康检查
ghost setup ssl    # 重新配置 SSL
```

后台管理地址默认是：`https://yourdomain.com/ghost`

---

## 总结与建议

- **Node.js v22 是硬要求**，Ghost 6 只支持它
- 安装 cron 是配置 SSL 的必要步骤
- 联邦宇宙 和 Web 分析 功能目前还有较大改进空间
- Ghost 依然是一款优秀的写作平台，但不要期望太多“即插即用”社交功能

---

## 最后的话

这次从 1Panel 回归 Ghost 官方部署，虽然中间踩了个 SSL 的坑，整体过程依然算顺利。对我这种写作者来说，Ghost 的速度和极简风格依旧无可替代。

如果你也打算部署 Ghost 6，不妨按照这篇流程一步步来，踩的坑我已经帮你趟过了 😄。
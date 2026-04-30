---
title: lnmp一键开启waf及使用 Fail2Ban防护
author: 老刘

date: 2019-07-28T09:07:40+00:00
url: /2556.html
categories:
  - 齐物

---


本文主要介绍如何在 **LNMP 一键安装包** 环境下，启用 **ngx_lua_waf** Web 防火墙，并使用 **Fail2Ban** 防护 Nginx 与 WordPress。

---

## 一、LNMP 开启 Lua 支持

LNMP 一键安装包从 **1.5 版本**开始支持 Lua，可用于启用 ngx_lua_waf。

1. 修改 `lnmp.conf`：

```bash
Enable_Nginx_Lua=y
```

2. 若 LNMP 已安装，执行：

```bash
./upgrade.sh nginx
```

输入当前 Nginx 版本号或需要升级的版本号，即可启用 Lua 支持。

---

## 二、安装 ngx_lua_waf

1. 下载并解压：

```bash
wget https://github.com/loveshell/ngx_lua_waf/archive/master.zip -O ngx_lua_waf.zip
unzip ngx_lua_waf.zip
mv ngx_lua_waf-master /usr/local/nginx/conf/waf
```

2. 修改 Nginx 配置 `/usr/local/nginx/conf/nginx.conf`：

在 `server_tokens off;` 下添加：

```nginx
lua_package_path "/usr/local/nginx/conf/waf/?.lua;;";
lua_shared_dict limit 10m;
init_by_lua_file /usr/local/nginx/conf/waf/init.lua;
```

3. 在虚拟主机中启用 WAF：

```nginx
server {
    root /网站目录;
    access_by_lua_file /usr/local/nginx/conf/waf/waf.lua;
}
```

4. 测试 Nginx 配置并重载：

```bash
/usr/local/nginx/sbin/nginx -t
/usr/local/nginx/sbin/nginx -s reload
```

5. 测试防护：

```http
http://你的域名/test.php?id=../etc/passwd
```

提示“您的请求带有不合法参数，已被网站管理员设置拦截”表示生效。

* WAF 配置文件路径：`/usr/local/nginx/conf/waf/config.lua`

---

## 三、Fail2Ban 防护网站与服务器

### 1. 获取真实访问 IP

套用 CDN 后，需要在 Nginx 中获取真实 IP：

```nginx
http {
    log_format main '$http_x_forwarded_for-$remote_user[$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"';
    access_log /home/wwwlogs/xxxx.log main;
}
```

重载 Nginx 后，日志中显示的即为真实来源 IP。

---

### 2. 配置 Fail2Ban

1. 复制配置文件：

```bash
cp /etc/fail2ban/jail.conf /etc/fail2ban/jail.local
```

2. 编辑 `/etc/fail2ban/jail.local`：

在 `[DEFAULT]` 下设置：

```ini
bantime = 3600     # 封禁时长
findtime = 3600    # 统计时间
maxretry = 6       # 最大失败次数
```

3. 启用监狱（示例 Nginx 与 WordPress 防护）：

```ini
[nginx-http-auth]
enabled = true
filter = nginx-http-auth
port = http,https
logpath = /var/log/nginx/error.log

[nginx-badbots]
enabled = true
filter = nginx-badbots
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2

[nginx-nohome]
enabled = true
filter = nginx-nohome
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2

[nginx-noproxy]
enabled = true
filter = nginx-noproxy
port = http,https
logpath = /var/log/nginx/access.log
maxretry = 2

[wp-login]
enabled = true
filter = wp-login
port = http,https
maxretry = 10
findtime = 60
bantime = 43600
logpath = /var/log/nginx/access.log

[xmlrpc]
enabled = true
filter = xmlrpc
port = http,https
logpath = /var/log/nginx/access.log
bantime = 43600
maxretry = 1
findtime = 5
```

---

### 3. 创建 Fail2Ban 规则

在 `/etc/fail2ban/filter.d/` 中添加规则文件：

* **nginx-http-auth.conf**：过滤 HTTP 验证失败
* **nginx-badbots.conf**：过滤恶意爬虫（可复制 apache-badbots.conf）
* **nginx-nohome.conf**：过滤目录扫描
* **nginx-noproxy.conf**：防止反代
* **wp-login.conf**：防止 WordPress 登录暴力破解
* **xmlrpc.conf**：防止 WordPress xmlrpc 攻击

---

### 4. 防护无效 404 请求

1. 创建过滤规则 `/etc/fail2ban/filter.d/nginx-not-found.conf`：

```ini
[Definition]
failregex = ^<HOST>.*"(GET|POST).*" (404|444|403|400) .*$
ignoreregex =
```

2. 启用监狱：

```ini
[nginxno404]
enabled = true
port = http,https
filter = nginx-not-found
action = iptables[name=nginxno404, port=http, protocol=tcp]
logpath = /home/wwwlogs/access.log
bantime = 3600
findtime = 60
maxretry = 5
```

3. 重启 Fail2Ban：

```bash
systemctl restart fail2ban.service
```

4. 查看状态：

```bash
fail2ban-client status
tail -f /var/log/fail2ban.log
iptables --list -n
```

---

## 四、总结

* LNMP + Lua + ngx_lua_waf 可提供基本 Web 防火墙保护。
* Fail2Ban 可防暴力破解、恶意爬虫、目录扫描、WordPress xmlrpc 攻击及无效请求。
* 结合日志监控与定期规则更新，可有效提升网站安全性。

> 注：本文参考了 [落格部落](https://www.logcg.com/archives/2998.html) 及 [明月登楼博客](https://www.imydl.com) 的相关内容。



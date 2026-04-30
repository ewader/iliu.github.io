---
title: WordPress开启Nginx fastcgi_cache缓存加速
author: 老刘

date: 2019-09-08T01:51:11+00:00
url: /2700.html
categories:
  - 齐物

---



昨天趁着重装景安服务器，把一直想弄的 `nginx fastcgi_cache` 配置好了，虽然走了不少弯路，但最终成功了，网页打开速度明显提升。

---

## 一、安装 Nginx ngx_cache_purge 模块

由于使用的是 OneinStack 面板，以下步骤基于 OneinStack。其他面板如 LNMP 可能需要微调。

1. **检查 ngx_cache_purge 是否安装**

```bash
nginx -V 2>&1 | grep -o ngx_cache_purge
```

> 如果没有输出，表示未安装。

2. **下载并解压 ngx_cache_purge 模块**

```bash
cd /root/oneinstack/src
wget http://labs.frickle.com/files/ngx_cache_purge-2.3.tar.gz
tar xzf ngx_cache_purge-2.3.tar.gz
```

3. **解压 Nginx 及依赖包**

```bash
tar xzf nginx-1.16.1.tar.gz
tar xzf pcre-8.43.tar.gz
tar xzf openssl-1.1.1c.tar.gz
cd /root/oneinstack/src/nginx-1.16.1
```

4. **查看 Nginx 编译参数**

```bash
nginx -V
```

5. **编译并安装 ngx_cache_purge**

注意：添加模块时必须保留原有编译参数，只在末尾加上 `--add-module=../ngx_cache_purge-2.3`

```bash
./configure --prefix=/usr/local/nginx --user=www --group=www \
--with-http_stub_status_module --with-http_v2_module --with-http_ssl_module \
--with-http_gzip_static_module --with-http_realip_module --with-http_flv_module \
--with-http_mp4_module --with-openssl=../openssl-1.0.2o --with-pcre=../pcre-8.42 \
--with-pcre-jit --with-ld-opt=-ljemalloc --add-module=../ngx_cache_purge-2.3

make
mv /usr/local/nginx/sbin/nginx{,_`date +%F`} # 备份旧版本
cp objs/nginx /usr/local/nginx/sbin
```

6. **验证安装成功**

```bash
nginx -V 2>&1 | grep -o ngx_cache_purge
```

> 输出 `ngx_cache_purge` 表示安装成功。

---

## 二、Nginx 开启 FastCGI Cache 配置实例

以下为我的 WordPress 网站配置示例（`www.yanjingweb.cn`）：

```nginx
fastcgi_cache_path /tmp/wpcache levels=1:2 keys_zone=WORDPRESS:250m inactive=1d max_size=1G;
fastcgi_temp_path /tmp/wpcache/temp;
fastcgi_cache_key "$scheme$request_method$host$request_uri";
fastcgi_cache_use_stale error timeout invalid_header http_500;

server {
    listen 80;
    listen 443 ssl http2;
    
    set $skip_cache 0;

    # POST 请求不缓存
    if ($request_method = POST) {
        set $skip_cache 1;
    }

    # 带查询字符串的请求不缓存
    if ($query_string != "") {
        set $skip_cache 1;
    }

    # 后台及特定页面不缓存
    if ($request_uri ~* "/wp-admin/|/xmlrpc.php|wp-.*.php|/feed/|index.php|sitemap(_index)?.xml") {
        set $skip_cache 1;
    }

    # 登录用户或评论用户不缓存
    if ($http_cookie ~* "comment_author|wordpress_[a-f0-9]+|wp-postpass|wordpress_no_cache|wordpress_logged_in") {
        set $skip_cache 1;
    }

    location ~ [^/]\.php(/|$) {
        fastcgi_index index.php;
        include fastcgi.conf;
        fastcgi_cache_bypass $skip_cache;
        fastcgi_no_cache $skip_cache;
        fastcgi_cache WORDPRESS;
        fastcgi_cache_valid 200 301 302 1d;

        add_header X-Cache "$upstream_cache_status From $host";
        add_header Nginx-Cache "$upstream_cache_status";
    }

    # 缓存清理配置（可选）
    location ~ /purge(/.*) {
        allow 127.0.0.1;
        allow 122.115.122.111; # 请改为你服务器 IP
        deny all;
        fastcgi_cache_purge WORDPRESS "$scheme$request_method$host$1";
    }
}
```

---

## 三、测试与验证

1. 检查 Nginx 配置是否正确：

```bash
nginx -t
```

2. 重启 Nginx：

```bash
service nginx restart
```

3. 打开网页，F5 刷新几次，查看浏览器响应头：

> 如果看到 `X-Cache: HIT` 字样，表示缓存生效。

4. 查看缓存文件夹 `/tmp/wpcache`，可以看到缓存文件生成。

---

## 四、效果总结

开启 `fastcgi_cache` 后，即使不使用 CDN，网页打开速度明显提升，实现了秒开体验。

> 有动手能力的同学可以尝试，操作难度中等，但效果非常明显。



---
title: "解决腾讯 EdgeOne 域名解析与 SSL 证书申请失败问题"
date: 2025-09-16T10:37:19+08:00
# weight: 1
# aliases: ["/first"]
tags: ["网站"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
url: /troubleshooting-tencent-edgeone-a-dnssec-odyssey

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---

前几个月，我关注到腾讯新推出的 **EdgeOne** 服务。这款产品无需备案和实名，而且提供免费额度，对于个人网站来说非常友好。刚发布时兑换码一码难求，我并没有太多关注。后来，腾讯推出了一个活动，只要在 X（原 Twitter）上转发推文，就能获得两个兑换码。我成功领取并兑换了一个，并将其用于我的“镜缘轩”网站。

我的“镜缘轩”网站部署在 CloudCone 的 VPS 上，访问速度一直不尽如人意。接入 EdgeOne 后，网站速度有了显著提升，这让我决定将我的博客也套上这个服务。

### 域名解析遇到的第一个问题：CNAME 扁平化

在将博客主域名 `iliu.org` 通过 **CNAME** 解析到 EdgeOne 提供的地址后，我发现 EdgeOne 无法识别解析成功。奇怪的是，“镜缘轩”网站的解析过程却非常顺利。

经过一番排查，我发现问题出在 Cloudflare 的 \*\*CNAME 扁平化（CNAME Flattening）\*\*功能上。由于我的博客使用的是主域名，而 Cloudflare 的免费套餐又不支持自定义 NS 地址，它的 CNAME 扁平化技术导致 EdgeOne 无法正确识别解析。我决定将域名从 Cloudflare 转移出去。

### 域名转移与 DNSSEC 冲突

我选择了之前用过的 **Name.com** 作为新的域名注册商。虽然转移费用比 Cloudflare 略贵，但我也能接受。现在想来，当时没有做更多功课，如果选择了 **Spaceship**，或许会是更好的选择。

域名转移到 Name.com 后，EdgeOne 成功识别了 CNAME 解析。然而，我又遇到了新的问题：**SSL 证书申请一直失败**。

我仔细研究了失败原因，发现一些海外的 **DNS 服务器**无法正常解析我的域名。我以为是 DNS 记录同步需要时间，便没有多想。但等了一周后，美国和欧洲的一些 DNS 服务器依然无法解析我的域名。

### 问题根源：DNSSEC 签名记录冲突

为了找到问题的根源，我向 Gemini 寻求帮助。它建议我使用 `dig` 命令进行分析。我在终端输入了以下命令：

```bash
dig iliu.org A @8.8.8.8
```

获得的查询结果显示 `status: SERVFAIL`，并在 `EDE` 部分提示：`10 (RRSIGs Missing)`。Gemini 根据这个结果判断，问题出在我的域名 `iliu.org` 的 **DNSSEC 签名记录配置**上。

原来，我在 Cloudflare 启用过 DNSSEC，这在 `.org` 域名注册局（如 Afilias）留下了一个 **DS (Delegation Signer)**  记录。这个记录告诉解析器：“这个域名启用了 DNSSEC，请去其权威 DNS 服务器（也就是 Name.com 的服务器）验证签名。”

然而，Name.com 本身**不支持 DNSSEC**。这就导致了矛盾：注册局要求用 DNSSEC 验证，但 Name.com 却无法提供。因此，当海外的 DNS 服务器尝试进行验证时，就会导致解析失败。与此同时，中国大陆和亚洲的一些 DNS 服务器可能由于配置更宽松，所以可以正常解析。

找到问题根源后，我立即登录 Name.com 的后台，找到了 **DNSSEC 设置**并删除了 **DS 记录**。几分钟后，EdgeOne 成功申请了 SSL 证书，困扰我多日的难题也迎刃而解。

希望我的这段经历能帮助遇到类似问题的朋友们少走弯路！


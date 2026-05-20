---
title: 微软 Mcrosoft Store打不开的处理方法
author: 老刘

date: 2021-07-01T11:51:06+00:00
url: /3797.html
baidutui:
  - '{"remain":3000,"success":0,"not_same_site":["https://iliu.org/3797.html"]}'
views:
  - 667
tin_post_views:
  - 357
categories:
  - 电脑网络

---
昨天青山在群里说，微软的好几个软件限时免费送，最搞的一个原来卖300多，本着有便宜就占的风格，赶紧去搞去，结果进微软商店，却打不开，提示代码: 0x80131500错误。<figure class="wp-block-image size-large">

[<img loading="lazy" decoding="async" width="1000" height="750" src="https://tunan.org/wp-content/uploads/2021/07/a34f6902df20c81.jpg" alt="" class="wp-image-3798" srcset="https://tunan.org/wp-content/uploads/2021/07/a34f6902df20c81.jpg 1000w, https://tunan.org/wp-content/uploads/2021/07/a34f6902df20c81-300x225.jpg 300w, https://tunan.org/wp-content/uploads/2021/07/a34f6902df20c81-768x576.jpg 768w" sizes="(max-width: 1000px) 100vw, 1000px" />][1]</figure> 

## 网上搜了一下，答案五花八门的。官方的回答如下： {.wp-block-heading}

建议您先尝试更换网络连接，比如连接个人手机热点，再使用 Microsoft Store 进行尝试。如果您连接了 VPN 或下载了第三方防火墙应用，建议断开 VPN，卸载第三方防火墙应用。

**如果上述方法无法解决问题，****您可以尝试清理应用商店的缓存，看看是否可以恢复正常：**

按 “Windows 徽标键+R”，在运行窗口中，键入“WSReset.exe”&nbsp;并点击 “运行”。

**如果问题依旧**，建议您打开 设置>应用>应用和功能>在左边的列表中找到应用商店选中>高级选项>重置。

**如果重置无效**，请打开&nbsp;IE&nbsp;浏览器，点击设置，打开&nbsp;Internet&nbsp;选项，点击高级，并勾选 “使用SSL 3.0”、”使用&nbsp;TLS 1.0“、”使用&nbsp;TLS 1.1“、”使用&nbsp;TLS 1.2“，应用后重启电脑，查看能否解决问题。

**如果上述方法均无效，建议您尝试以下方案重新部署您的应用商店：**

在打开的 “Windows Powershell（管理员）” 窗口中输入以下命令（慎用）：

get-appxpackage \*store\* | remove-Appxpackage

再次安装：

add-appxpackage -register &#8220;C:\Program Files\WindowsApps\*Store*\AppxManifest.xml&#8221; -disabledevelopmentmode

## 经过老刘的实验，采用如下的办法可以搞定： {.wp-block-heading}

1、打开“运行”输入 inetcpl.cpl （“WINDOWS”+“R”键，输入 inetcpl.cpl亦可）

2、点开高级往下拉，勾上&#8221;使用TLS 1.2&#8243;选项，或者点还原高级设置。

 [1]: https://tunan.org/wp-content/uploads/2021/07/a34f6902df20c81.jpg
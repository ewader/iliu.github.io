---
title: "解决Windows11打开安全中心空白的方法"
date: 2024-08-29T07:56:45+08:00
# weight: 1
# aliases: ["/first"]
tags: ["操作系统"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true

---

老刘在前面一篇文章中说，某年某月的某一天，老刘重置了电脑，不但丢失了存在本地的博客数据，而且发现安全中心打开是一个空白的窗口。老刘使用了重启大法的手段，但是发现并没有什么卵用。文心一言里给出了很多的建议，满满的一大页，照着做了下，问题还是没有解决。

不得以，老刘还是去搜索引擎上找方法吧，有一些方法大同小异，只到看到了一篇文章，说把一段代码保存成reg的格式，双击导入注册表即可。老刘试用了一下，完美解决了问题。

```bash
Windows Registry Editor Version 5.00

　　［HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender］

　　“DisableAntiSpyware”=dword:00000000

　　［HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows Defender\Real-Time Protection］

　　“DisableBehaviorMonitoring”=dword:00000000

　　“DisableIOAVProtection”=dword:00000000

　　“DisableOnAccessProtection”=dword:00000000

　　“DisableRealtimeMonitoring”=dword:00000000

　　［HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SecurityHealthService］

　　“Start”=dword:00000002
```
## 使用方法
- 桌面新建一个文本文件，把上述代码拷贝进去。然后另存为，类型选择所有文件，名称设置为aaa.reg。
- 双击aaa.reg文件，导入注册表即可
## 这是一个bug

老刘有一次重置电脑，发现这个方法不能用了，其实这个Windows11的一个bug，不知道为什么一直没有修复，重新安装一下md即可。

文件老刘放在下面了：
[点击下载](https://pan.baidu.com/s/111uBACLN3HExSuUFd3Mzqw?pwd=9a78)



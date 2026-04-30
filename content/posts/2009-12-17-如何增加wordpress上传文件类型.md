---
title: 如何增加WordPress上传文件类型
author: 老刘

date: 2009-12-17T02:20:09+00:00
url: /196.html

categories:
  - 齐物

---

WordPress默认的上传文件类型只有图片、视频、音频、其他媒体。但是如果我们想分享一些其他的文件比如文档等怎么办呢？其实Wordpress其充满魅力的所在就在于开源，开源的好处是随时可以增加你想要的东西。下面就以增加一个.rar类型为例来说明如何增加Wordpress上传文件类型！

修改 wp-includes/functions.php

查找：

```php
function wp\_check\_filetype($filename, $mimes = null) {
```

在底下的$mimes里加入要添加的文件类型，例如 rar ：
```php

‘rar’ => ‘application/rar’,

```

保存，重新上传服务器，一切就OK了，很简单吧！
---
title: wordpress中文tag、中文分类找不到文章的解决方法
author: 老刘

date: 2010-01-09T02:19:28+00:00
url: /407.html
categories:
  - 齐物
---




原来用的是 Linux 主机，在设定固定链接后，中文 tag、中文分类都能正常访问。
但自从换到 GoDaddy 的 Windows 主机后，由于 IIS7 对 PHP 支持不太好，中文 tag 和中文分类的文章就会出现找不到的情况。

比如：

* **正常情况（能访问）**：`www.example.com/?tag=中文`
* **不正常情况（不能访问）**：`www.example.com/tag/中文`

这是系统的兼容问题，没办法直接解决。
但为了 SEO，我们又必须启用固定链接，怎么办呢？
折腾了一个上午，总算找到了解决方案，而且支持目前的 **WordPress 2.9.1** 版本。

---

网上有几种解决办法：

**第一种方法**：修改 `wp-includes/classes.php` 文件。
这个方法在中文系统下可能有效，但我在 GoDaddy 主机上试的时候，直接报错，所以局限性比较大。

---

**第二种方法**：修改 `wp-includes/rewrite.php` 文件。

找到以下代码：

```php
function get_tag_permastruct() {
    if (isset($this->tag_structure)) {
        return $this->tag_structure;
    }
    if (empty($this->permalink_structure)) { //——这行需要修改——
        $this->tag_structure = "";
        return false;
    }
```

把第五行改成：

```php
if (!empty($this->permalink_structure)) {
```

---

**第三种方法（推荐）**：
一个一劳永逸、不用改源代码的方法。

进入 WordPress 后台 → “设置” → “固定链接”，
在“标签前缀”一栏中填入：

```
?tag=
```

这样，当你点击文章中的中文 tag 时，系统会自动跳转到：
`www.example.com/?tag=中文`
页面就能正常显示了。

---

经过验证，**第二种和第三种方法**都能完美解决这个问题。

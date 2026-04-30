---
title: 配置WP-Mail-SMTP的技巧
author: 老刘

date: 2011-09-06T11:08:45+00:00
url: /1331.html
views:
  - 958
zrz_credit_add:
  - 1
b2_post_reading_role:
  - none
b2_vote:
  - 'a:2:{s:2:"up";i:0;s:4:"down";i:0;}'
tin_post_views:
  - 780
categories:
  - 网站相关
tags:
  - worpress
  - WP-Mail-SMTP

---
网站搬到新浪SAE之后，由于不支持mail（）函数，所以只好采用WP-MAIL-SMTP这个插件来发送密码评论等，但是这个插件非常的不容易配置，明明都是按要求来填写的，最后的test的却往往是fals，所以，华彩根据配置N次的经验，把成功配置的步骤理一下！

引用网上的翻译

> From Email:

> 发送者的邮件地址,也就是对方收到邮件后看到的发件人地址。

> From Name:

> 发件人姓名。

> Mailer:

> Send all WordPress emails via SMTP.

> Use the PHP mail() function to send emails.

> 这里要注意一下,有的朋友的空间不支持mail()函数,通常是Windows环境的主机。如果不支持此函数,那么就选择上面的那个选项。

> SMTP Options

> SMTP服务器设置,也就是邮件发送服务器设置,如果设置错误就不会给留言的人发送邮件,当然,也不会把备份的数据文件发送到你的邮箱中。

> SMTP Host:

> QQ邮箱的是:SMTP.QQ.COM 谷歌的SMTP.GMAIL.COM 126邮箱是：SMTP.126.COM （大小写无所谓）sina的smtp.sina.cn或smtp.sina.com

> SMTP Port:

> QQ邮箱的是:25

> 谷歌的是587，126是25。sina的是25，QQ帮助里说端口号是465或587，试了没成功，不知道原因。

> Encryption:

> 是否启用加密连接

> No encryption.

> 无加密

> Use SSL encryption.

> 采用SSL方式

> Use TLS encryption. This is not the same as STARTTLS. For most servers SSL is the recommended option.

> 使用TLS方式.

> polaris提醒您，此处是关键。一会儿详细讨论这点。

> Authentication:

> 用户验证

> No: Do not use SMTP authentication.

> Yes: Use SMTP authentication.

> 如果你这里用的是免费邮箱,那么都是选择yes,如果不验证的话恐怕垃圾邮件就满天飞了吧.

> 下面的这两项，就是你的用户名和密码。

> Username: 注意:这个用户名是全名，如我的：lghcx@sina.cn

> Password: \***\****

> update option

> 全部填写后点此更新设置。

> Send a Test Email

> 发送一个测试邮件

> To: (这里填写邮件地址)

现在点test，如果

> Test Message Sent

> The result was:

> bool(true)

说明配置对了，否则就是错的咯，如果出错的话，按网上的教程设置一般都不行，可以在用户验证那里选中第二项，一般都可以成功，如果还不行的话，可以选择&nbsp;Use SSL encryption.
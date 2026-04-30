---
title: "Ghost 博客与 Mailgun 邮件服务申请全流程"
date: 2025-08-10T08:34:35+08:00
# weight: 1
# aliases: ["/first"]
tags: ["blog"]
categories: ["齐物"]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
url: /complete-setup-process-for-ghost-blog-and-mailgun-email-service

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
Ghost 的邮件系统与 Mailgun 深度集成，如果想要在 Ghost 上实现邮件订阅、密码找回、通知等功能，申请一个 Mailgun 账户几乎是必选项。好消息是——Mailgun 已经恢复免费套餐，每天可发送 100 封邮件，对个人博客来说完全够用，而且现在**验证信用卡不再是必需**。坏消息是——Mailgun 的风控依然非常严格，尤其是中国大陆用户，注册和解封过程可能会比较“曲折”。下面是我亲身踩坑并最终申请成功的全过程，希望能帮到你。

---

## 1. 中国大陆能正常访问，但注册有坑

Mailgun 官网在中国大陆是可以直接打开的，但注册过程中会遇到两个大坑：

1. **不挂梯子 → 验证码加载不出来**注册页的验证根本就不显示，导致注册按钮点不动。
2. **挂了梯子 → 手机号与 IP 不匹配触发风控**注册时需要验证手机号，如果你的 IP 地址（梯子出口）与手机号所在地区不一致，就很容易被判定为风险账号，触发临时封禁。

---

## 2. 常见问题与解决方法

### 收不到验证码

- 进入 [Mailgun 工单系统](https://help.mailgun.com/hc/en-us/requests/new?ref=iliu.org)
- 类别选择 **Account Management**
- 标题示例：I can't verify my email
- 内容示例：I can't verify my email because I clicked the link to enter my mobile phone number, and when I sent the verification code, it reminded me that I sent too many times and other reminders.
  This is my phone number: +86 XXX XXXX XXXX

  把 XXX XXXX XXXX 换成你自己的手机号即可。（英文机翻没关系，客服看得懂，实测有效）

---

### 账号被临时锁定

错误提示：Your account is temporarily disabled. (Account disabled)
Please contact support to resolve.

可以给客服发一封说明邮件（或直接在工单提交），核心是解释你是正常用途、愿意配合验证、并说明中国大陆网络环境的特殊性。**参考邮件模板：** Request for Account Review and Reactivation

Hello Mailgun Support Team,

My account was disabled shortly after registration with the message:
"Your account is temporarily disabled. (Account disabled) Please contact support to resolve."
I believe this may have been triggered by the automated fraud prevention system.

I am located in mainland China, where network routing and IP geolocation may sometimes cause unusual patterns in automated checks.

My intended usage is legitimate:

- Purpose: Sending transactional emails (password resets, notifications) and newsletters for my Ghost-based personal website/blog.
- Domain: [yourdomain.com]
- Website: https://yourdomain.com
- Recipients: 100% opt-in subscribers, no purchased or scraped mailing lists.
- Sending volume: Low to moderate.

I am happy to:

- Provide ID or domain ownership proof.
- Bind a valid credit card for verification.
- Comply fully with Mailgun’s Acceptable Use Policy and anti-spam requirements.

Could you please review and reactivate my account?

Thank you for your understanding and assistance.

Best regards,
[Your Name]
[Your Email Address]
[Your Website Name]

---

## 3. 客服的最终回复与“养号期”

客服审核后给我的反馈是：账号已恢复，但由于缺少已验证域名和对应的发送历史，暂时保留发送限制(根据ghost论坛的信息，应该是同时只能发送9封邮件)。请先添加并验证域名，然后在 3-5 天内正常发送邮件（收件人必须是有机收集的双重确认用户）。之后可以更新工单申请解除限制。换句话说，即使解封了，也要经历 3-5 天的“养号期”：

1. **绑定并验证域名**（添加 DNS 记录）
2. **正常发送邮件**（不要群发垃圾内容）
3. **积累发送历史**（每天发一点）
4. **再次联系支持**，申请解除限制

---

## 4. 总结与建议

- **注册前准备好：**

  - 一个稳定的域名（用于验证）
  - 一个能接收验证码的手机号
  - 一个相对干净的 IP
- **遇到问题，直接开工单**，说明用途与网络环境。
- **解封后不要急着大批量发信**，先养号几天再申请完全解限。

---

Mailgun 的免费额度每天 100 封邮件，对个人博客来说绰绰有余。虽然注册过程麻烦，但一旦稳定下来，Ghost 邮件功能就能顺畅使用了。如果你正打算为 Ghost 配置邮件服务，不妨先参考这篇经验，少走一些弯路。


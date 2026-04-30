---
title: EndeavourOS + Btrfs + Snapper + GRUB：完整的快照回滚系统配置指南
date: 2025-11-30T10:00:00+08:00
tags:
  - Linux
  - EndeavourOS
  - Btrfs
  - Snapper
  - GRUB
  - 系统管理
categories:
  - 齐物
author: 老刘
showToc: true
url: /endeavouros-snapper-grub-snapshot-rollback-guide/
---

EndeavourOS由于使用的是滚动更新，系统存在着滚挂的可能性（尽管我已经使用了1个多月也没有问题），所以快照回滚是一个必须的选项。本文将详细介绍如何在 EndeavourOS 系统中配置完整的快照回滚系统，让您在系统出现问题时能够轻松恢复到之前的状态。

![](https://s2.l22.org/images/1764499404_endeavour-os-logo-on-a-purple-background-1.jpg)

## 前言

为什么需要快照回滚系统？在日常使用中，我们难免会遇到以下情况：

- 系统更新后出现兼容性问题
- 安装某个软件导致系统不稳定
- 配置文件修改错误导致系统无法启动
- 恶意软件或误操作破坏系统

有了快照回滚功能，这些问题都可以通过简单的重启和菜单选择来解决。

## 系统要求

在开始之前，请确保您的系统满足以下条件：

1. **已安装 EndeavourOS**（或基于 Arch 的其他发行版）
2. **使用 Btrfs 文件系统**作为根分区
3. **安装时选择 GRUB 作为引导加载程序**

## 核心组件介绍

我们的快照回滚系统将由以下几个核心组件构成：

| 组件 | 作用 | 必要性 |
|------|------|--------|
| **Snapper** | 快照管理核心程序，负责创建、删除和管理快照 | 必需 |
| **snap-pac** | 在 pacman 操作时自动创建 pre/post 快照 | 强烈推荐 |
| **grub-btrfs** | 将 Snapper 快照集成到 GRUB 启动菜单 | 必需 |
| **inotify-tools** | 文件系统监控工具，确保 GRUB 菜单及时更新 | 可选但推荐 |

## 安装步骤

### 步骤 1：安装核心软件包

打开终端，执行以下命令安装所需的软件包：

```bash
# 安装 snapper, snap-pac 和 grub-btrfs
sudo pacman -S snapper snap-pac grub-btrfs
```

**软件包说明：**
- `snapper`：快照管理的核心程序，提供快照创建、删除、比较等功能
- `snap-pac`：自动化工具，在每次 pacman 操作时自动创建"操作前"和"操作后"快照
- `grub-btrfs`：GRUB 扩展模块，自动扫描 Snapper 快照并将其添加到启动菜单

### 步骤 2：配置 Snapper

安装完成后，我们需要创建 Snapper 配置：

```bash
# 创建根分区的 Snapper 配置
sudo snapper -c root create-config /

# 创建第一个手动快照作为基准
sudo snapper create --description "初始系统快照"
```

### 步骤 3：启用 GRUB 集成服务

`grub-btrfsd` 服务会监控快照变化并自动更新 GRUB 配置：

```bash
# 启用并启动 grub-btrfs 守护进程
sudo systemctl enable --now grub-btrfsd.service
```

### 步骤 4：生成初始 GRUB 配置

手动生成一次 GRUB 配置，确保现有快照出现在启动菜单中：

```bash
# 重新生成 GRUB 配置文件
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

## 验证配置

### 检查服务状态

确认 `grub-btrfsd` 服务正常运行：

```bash
# 查看服务状态
sudo systemctl status grub-btrfsd
```

正常情况下，您应该看到类似以下的输出：
```
● grub-btrfsd.service - GRUB Btrfs snapshot detection daemon
   Loaded: loaded (/usr/lib/systemd/system/grub-btrfsd.service; enabled; vendor preset: disabled)
   Active: active (running) since ...
```

### 查看快照列表

检查 Snapper 是否正常工作：

```bash
# 列出所有快照
sudo snapper list
```

您应该能看到包含刚才创建的"初始系统快照"的列表。

### 测试自动快照功能

安装一个简单的软件包来测试自动快照功能：

```bash
# 安装测试软件包
sudo pacman -S neofetch

# 查看是否自动创建了快照
sudo snapper list
```

您应该能看到两个新的快照：一个在安装前（pre），一个在安装后（post）。

## 故障排除

### 问题 1：GRUB 菜单中没有显示快照

如果重启后 GRUB 菜单中没有显示快照选项，可能是因为缺少 `inotify-tools`：

```bash
# 安装 inotify-tools
sudo pacman -S inotify-tools

# 重启 grub-btrfsd 服务
sudo systemctl restart grub-btrfsd.service

# 重新生成 GRUB 配置
sudo grub-mkconfig -o /boot/grub/grub.cfg
```

### 问题 2：服务启动失败

如果 `grub-btrfsd` 服务启动失败，检查以下内容：

```bash
# 检查服务日志
sudo journalctl -u grub-btrfsd.service -f

# 检查 Btrfs 子卷挂载情况
mount | grep btrfs
```

### 问题 3：快照无法启动

如果快照在 GRUB 菜单中显示但无法启动，可能是由于以下原因：

1. **内核版本不匹配**：确保快照中的内核版本与当前系统兼容
2. **initramfs 问题**：重新生成 initramfs 镜像
3. **子卷挂载问题**：检查 `/etc/fstab` 配置

## 高级配置

### 自定义快照保留策略

编辑 Snapper 配置文件来自定义快照保留策略：

```bash
# 编辑配置文件
sudo nano /etc/snapper/configs/root
```

在文件中找到以下部分并根据自己的需求调整：

```ini
# 数量限制
TIMELINE_LIMIT_HOURLY="10"
TIMELINE_LIMIT_DAILY="7"
TIMELINE_LIMIT_WEEKLY="4"
TIMELINE_LIMIT_MONTHLY="12"
TIMELINE_LIMIT_YEARLY="0"

# 清理算法
TIMELINE_CLEANUP="true"
```

### 配置定时快照

启用定时快照功能，系统会定期自动创建快照：

```bash
# 启用 snapper-timeline.timer
sudo systemctl enable --now snapper-timeline.timer

# 启用 snapper-cleanup.timer
sudo systemctl enable --now snapper-cleanup.timer
```

## 使用指南

### 创建手动快照

```bash
# 创建描述性快照
sudo snapper create --description "安装显卡驱动前"

# 创建带类型和描述的快照
sudo snapper create --type single --description "系统优化完成"
```

### 删除快照

```bash
# 删除指定快照（替换 <ID> 为实际的快照编号）
sudo snapper delete <ID>

# 删除多个快照
sudo snapper delete <ID1> <ID2> <ID3>
```

### 比较快照

```bash
# 比较两个快照之间的差异
sudo snapper diff <ID1> <ID2>

# 比较特定文件的变化
sudo snapper diff <ID1> <ID2> /etc/fstab
```

### 回滚到快照

1. 重启系统
2. 在 GRUB 菜单中选择"Snapper snapshots"
3. 选择要回滚的快照
4. 按照屏幕提示完成回滚


# liutheme

三栏杂志型 Hugo 主题 — 米白底 + 衬线 + 留白克制，定位"高级感个人博客"。

## 特点

- 三栏布局：左（作者/分类/归档）｜中（主内容）｜右（最新/标签/统计/关于）
- 米白底（默认）/ 深棕（深色模式），衬线标题，宋体中文
- 不刺眼的暖棕强调色 — 取代 PaperMod 那种鲜艳蓝
- 内置站内搜索（客户端 JSON 索引）、归档、标签云、上下篇
- 文章页/列表页/归档页/标签页/分类页/搜索页 全覆盖
- 响应式：≤1024px 自动折叠为单栏

## 启用

```yaml
# config.yml
theme: liutheme
```

可选 `params`：

```yaml
params:
  label:
    icon: /img/apple-touch-icon.png
    subtitle: 流金岁月
  profile:
    avatar: /img/avatar.jpg
    tagline: 验光师 · 读书 · 折腾
```

## 目录

```
liutheme/
├── assets/
│   ├── css/main.css           # 主样式（设计 token + 全部组件）
│   └── js/search.json.tmpl    # Hugo 渲染的搜索索引
├── layouts/
│   ├── _default/
│   │   ├── baseof.html        # 三栏骨架
│   │   ├── list.html          # 通用列表
│   │   ├── single.html        # 文章页
│   │   ├── page.html          # 普通页
│   │   ├── archives.html      # 归档
│   │   ├── tags.html          # 全部标签
│   │   ├── categories.html    # 全部分类
│   │   ├── term.html          # 单个标签/分类
│   │   └── search.html        # 搜索页
│   ├── partials/
│   │   ├── header.html
│   │   ├── sidebar-left.html
│   │   ├── sidebar-right.html
│   │   ├── footer.html
│   │   └── pagination.html
│   └── index.html             # 首页
├── static/
│   ├── js/theme.js            # 主题切换
│   └── js/main.js             # 客户端搜索
└── theme.toml
```

## 设计说明

调色取自"哑光羊皮纸"，没用纯白 — 偏暖的 `--bg: #faf7f1` 让眼睛更舒服。
强调色 `#8b6f4a` 是低饱和暖棕，链接悬停不扎眼，整体气质偏《读库》《单读》那种独立杂志感。

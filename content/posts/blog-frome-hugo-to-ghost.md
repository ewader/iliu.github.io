---
title: "博客从Hugo迁移到Ghost"
date: 2025-06-01T20:41:52+08:00
# weight: 1
# aliases: ["/first"]
tags: [""]
categories: [""]
author: "老刘"
# author: ["Me", "You"] # multiple authors
showToc: true
url: /blog-frome-hugo-to-ghost

cover:
    image: "<image path/url>" # image path/url
    alt: "<alt text>" # alt text
    caption: "<text>" # display caption under cover
    relative: false # when using page bundles set this to true
    hidden: true # only hide on current single page

---
的博客从2023年开始从WordPress迁移到Hugo，使用Hugo有很多的优点，比如说省钱，只需把博客部署在GitHub上，就能剩下一笔VPS的开支。但是它也有很多的缺点，最让我感觉到不方便的地方在于，我不能随时随地的写博客。

最早的时候，我在我店里的电脑上部署了Hugo，我写博客就只能到店里之后才能进行，当然也可以在别的地方写好，然后在店里的电脑上进行上传，但是这个过程是不连续的。有时候我们做事情讲究一鼓作气，很多时候，因为不连续的原因，写博客的兴致也少了很多。

后来，我们Hugo系统部署在我的VPS上。这样我就可以随时随地的写博客了，但是还有一个问题就是，写博客需要打开终端，连上VPS，步骤太多。因此，我不止一次的想要从Hugo迁移会WordPress。但是从网上搜索的教程全都是从WordPress迁移到Hugo的。大佬们好像是不屑于再回归WordPress。

最近了解到了ghost这个系统，我用docker安装上之后体验了一下，感觉不错。没有WordPress那么臃肿，有后台可以直接写文章。于是就想把博客迁移到Ghost，网上搜索相关教程当然也是无果的。博友建议我寻求AI的帮助。

疫情期间，我也自学过一点点python。于是我就想把Hugo的md文件，转化成ghost导入的json文件。借助ChatGPT，终于把代码给搞了出来。代码如下：

## 转换代码

```python

import os
import json
import re
import yaml
import markdown
from datetime import datetime

def parse_markdown(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        text = f.read()

    match = re.match(r'^---\n(.*?)\n---\n(.*)', text, re.DOTALL)
    if not match:
        print(f"⚠️ 跳过文件：{filepath}，没有找到 front matter")
        return None

    front_matter_text, content_part = match.groups()
    try:
        front_matter = yaml.safe_load(front_matter_text)
    except Exception as e:
        print(f"⚠️ YAML 解析错误：{filepath} -> {e}")
        return None

    title = front_matter.get('title')
    raw_date = front_matter.get('date')
    tags = front_matter.get('tags', [])

    if not title or not raw_date or not content_part.strip():
        print(f"⚠️ 数据不完整，跳过文件：{filepath} -> title: {title}, date: {raw_date}, content_length: {len(content_part.strip())}")
        return None

    try:
        if isinstance(raw_date, datetime):
            dt = raw_date
        elif isinstance(raw_date, str):
            try:
                dt = datetime.fromisoformat(raw_date.replace("Z", "+00:00"))
            except ValueError:
                try:
                    dt = datetime.strptime(raw_date, "%Y-%m-%d %H:%M:%S")
                except ValueError:
                    dt = datetime.strptime(raw_date, "%Y-%m-%dT%H:%M:%S%z")
        else:
            print(f"⚠️ 日期格式无法识别，跳过：{filepath} -> date: {raw_date}")
            return None
    except Exception as e:
        print(f"⚠️ 日期解析失败：{filepath} -> {e}")
        return None

    date_str = dt.strftime('%Y-%m-%dT%H:%M:%S.000Z')

    html_content = markdown.markdown(content_part.strip(), extensions=['extra', 'codehilite', 'tables'])

    return {
        'title': title,
        'slug': os.path.splitext(os.path.basename(filepath))[0],
        'html': html_content,
        'created_at': date_str,
        'updated_at': date_str,
        'tags': tags
    }

def walk_md_files(base_dir):
    for root, _, files in os.walk(base_dir):
        for file in files:
            if file.endswith('.md'):
                yield os.path.join(root, file)

def main():
    base_dir = './'
    print(f"开始遍历目录：{base_dir}")
    posts = []
    tags_set = set()

    for filepath in walk_md_files(base_dir):
        print(f"📄 正在处理文件：{filepath}")
        post = parse_markdown(filepath)
        if post:
            post_tags = []
            for tag_name in post['tags']:
                tag_str = str(tag_name).strip()
                if tag_str:
                    tags_set.add(tag_str)
                    post_tags.append(tag_str)

            post['tags'] = post_tags
            posts.append(post)

    ghost_data = {
        "meta": {
            "exported_on": int(datetime.now().timestamp() * 1000),
            "version": "5.0.0"
        },
        "data": {
            "posts": [],
            "tags": [],
            "posts_tags": [],
            "users": [
                {
                    "id": 1,
                    "name": "admin",
                    "slug": "admin",
                    "email": "admin@example.com"
                }
            ]
        }
    }

    for i, post in enumerate(posts, start=1):
        ghost_data["data"]["posts"].append({
            "id": i,
            "title": post["title"],
            "slug": post["slug"],
            "html": post["html"],
            "status": "published",
            "created_at": post["created_at"],
            "updated_at": post["updated_at"],
            "published_at": post["created_at"],
            "author_id": 1
        })

    tag_id_map = {tag: idx + 1 for idx, tag in enumerate(tags_set)}
    for tag, tag_id in tag_id_map.items():
        ghost_data["data"]["tags"].append({
            "id": tag_id,
            "name": tag,
            "slug": tag.lower().replace(" ", "-")
        })

    for post_id, post in enumerate(posts, start=1):
        for tag in post["tags"]:
            ghost_data["data"]["posts_tags"].append({
                "post_id": post_id,
                "tag_id": tag_id_map[tag]
            })

    with open("ghost_import.json", "w", encoding="utf-8") as f:
        json.dump(ghost_data, f, ensure_ascii=False, indent=2)
    print("✅ 已生成 ghost_import.json 文件")

if __name__ == "__main__":
    main()
```

## 使用方法：

把这个代码保存成`Hugotoghost.py`,把这个文件放在`content`文件夹里。然后输入命令：

```undefined
python hugotoghost.py
```

会生成一个`ghost_import.json`的文件，在ghost的后台把这个文件上传即可。
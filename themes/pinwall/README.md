# Pinwall

一个 [Hexo](https://hexo.io/) 主题：**首页是 3D 斜置图片画廊，博客区是图钉便利贴板。**

在线效果：https://muzi-xiaoren.github.io

## 特性

- 🖼️ **3D 画廊首页** —— 多张图片斜置排开，鼠标靠近哪张，哪张弹性展开平铺（带缓慢晃动 + 水面波纹滤镜）；触屏设备点按切换
- 📌 **便利贴文章板** —— 文章以图钉便利贴呈现：彩色纸片、随机微倾、悬停摆正晃动；自动瀑布流排版**保证互不重叠**，也支持每篇文章手动定位
- 🗂️ **半图便利贴导航** —— 板子右上角的归档/分类/标签/关于入口，配置文件里加一行即可扩展新页面
- 🎨 **四套板面方案** —— `dark` 深夜钉板 / `paper` 米白方格 / `felt` 蓝灰毛毡 / `cork` 经典软木，一行配置切换
- ✍️ 打字机副标语、社交图标（GitHub / 哔哩哔哩 / Bangumi 内置）、文章页图钉白纸排版、代码高亮
- 零外部依赖：无 jQuery、无字体/CDN 请求，全部本地资源

## 安装

要求：Hexo 7+，且站点装有 `hexo-renderer-ejs`（默认脚手架自带）。

1. 把 `pinwall` 文件夹放进你站点的 `themes/` 目录：

   ```bash
   # 方式一：从本仓库复制
   cp -r themes/pinwall 你的博客/themes/

   # 方式二：git clone 后复制（本主题随博客源码仓库分发）
   git clone https://github.com/muzi-xiaoren/Blog.git
   cp -r Blog/themes/pinwall 你的博客/themes/
   ```

2. 修改站点 `_config.yml`：

   ```yaml
   theme: pinwall
   ```

3. 创建导航需要的页面（front-matter 写法见下）：

   ```bash
   hexo new page about
   hexo new page tags        # front-matter 加 type: tags
   hexo new page categories  # front-matter 加 type: categories
   ```

   `tags/index.md` 示例：

   ```yaml
   ---
   title: 标签
   layout: page
   type: tags
   ---
   ```

4. 首页画廊图片：直接丢进站点的 `source/img/background/` 文件夹（支持 jpg/png/webp/gif/avif），构建时自动扫描，无需配置。

## 配置

在站点根目录创建 `_config.pinwall.yml`（覆盖主题默认值）：

```yaml
# 板面与页面底色方案：dark / paper / felt / cork
board_style: dark

hero:
  title: 你的名字          # 为空则用站点 title
  subtitle: 一句话副标语    # 为空则用站点 subtitle，打字机效果
  avatar: /img/avatar.png  # 头像（图片放 source/img/ 下）
  socials:                 # icon 可选：github / bilibili / bangumi / link
    - { name: GitHub,  url: "https://github.com/你的ID", icon: github }
    - { name: 哔哩哔哩, url: "https://space.bilibili.com/你的UID", icon: bilibili }

# 板子右上角的便利贴导航（内页顶栏同步使用），加一行即新增一个入口
nav:
  - { title: 归档, url: /archives/,   image: /img/notes/archive.svg }
  - { title: 分类, url: /categories/, image: /img/notes/category.svg }
  - { title: 标签, url: /tags/,       image: /img/notes/tag.svg }
  - { title: 关于, url: /about/,      image: /img/notes/about.svg }
```

## 文章 front-matter（全部可选）

```yaml
---
title: 文章标题
date: 2026-06-10 19:30:00
cover: /img/xxx.jpg   # 便利贴封面图
pin_x: 60             # 手动定位：距板左侧百分比（0-100）
pin_y: 80             # 手动定位：距板顶部像素
rotate: -3            # 固定旋转角度（度），不写则随机微倾
color: "#ffd9e8"      # 便利贴纸色，不写则五色自动轮换
---
```

排版规则：未手动定位的文章自动瀑布流摆放，永不重叠；手动定位的便利贴若与他人相撞会自动向下让位。

## 目录结构

```
pinwall/
├── _config.yml          # 主题默认配置
├── layout/              # EJS 模板（首页/文章/页面/归档 + 图标）
├── scripts/helpers.js   # 构建期扫描首页画廊图片
└── source/
    ├── css/main.css     # 全部样式（板面方案也在这里）
    ├── js/main.js       # 画廊感应 / 水波滤镜 / 便利贴排版
    └── img/             # 默认头像与导航贴占位图
```

## License

MIT

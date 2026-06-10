# Blog —— Hexo 博客源码

本仓库存放 **博客源码**（Markdown 文章 + 配置 + 主题设置）。
基于 [Hexo](https://hexo.io/) + 自制 **Pinwall 主题**（`themes/pinwall/`）：
首页为 3D 斜置图片画廊（鼠标靠近平铺 + 水波纹），博客区为软木板图钉便利贴。

## 两个仓库的关系

| 仓库 | 存什么 | 谁看 |
|------|--------|------|
| **muzi-xiaoren/Blog**（本仓库） | 源码：Markdown、`_config.yml`、`_config.fluid.yml` 等——**可编辑的原材料** | 自己（备份 / 版本管理 / 多设备同步） |
| **muzi-xiaoren/muzi-xiaoren.github.io** | `hexo generate` 编译出的静态 HTML——**访客看到的成品** | 所有人（https://muzi-xiaoren.github.io ） |

> 写作改这里（Blog），发布后自动生成 HTML 推到 github.io。**两件事是分开的。**

## 日常流程

### 写新文章
```bash
hexo new "文章标题"        # 生成在 source/_posts/ 下，用 Markdown 编写
```

### 本地预览
```bash
hexo server               # 打开 http://localhost:4000 看效果
```

### 发布到网站
```bash
./deploy.sh               # 一键：清理 → 生成 → 推到 github.io
```

### 备份源码（每次写完文章后）
```bash
git add -A
git commit -m "新增文章：xxx"
git push                  # 推到本仓库（Blog）
```

## 换电脑 / 重装后怎么恢复

```bash
git clone git@github.com:muzi-xiaoren/Blog.git
cd Blog
npm install               # 重新装依赖（node_modules 不在仓库里，需重装）
```
> 注意：发布用的 SSH 私钥 `~/.ssh/passman_deploy` 不在仓库里（也不该在），换电脑需自行拷贝过去。

## 常改的配置

- 站点标题 / 作者 / 语言 → `_config.yml`
- 头像 / 社交链接 / 右上角便利贴导航 → `_config.pinwall.yml`
- 首页画廊图片 → 丢进 `source/img/background/`，重新生成即可
- 其他图片资源放 `source/img/`

## 便利贴文章字段（front-matter 可选）

```yaml
cover: /img/xxx.jpg   # 便利贴封面图
pin_x: 60             # 手动定位：距板左侧百分比（0-100）
pin_y: 80             # 手动定位：距板顶部像素
rotate: -3            # 固定旋转角度，不写则随机微倾
color: "#ffd9e8"      # 纸色，不写则自动轮换
```

> 旧的 Fluid 主题仍保留在依赖里，`_config.fluid.yml` 未删；想换回去把 `_config.yml` 的 `theme:` 改回 `fluid` 即可。

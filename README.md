# Blog —— Hexo 博客源码

本仓库存放 **博客源码**（Markdown 文章 + 配置 + 主题设置）。
基于 [Hexo](https://hexo.io/) + 自制 **Pinwall 主题**：
首页为 3D 斜置图片画廊（鼠标靠近弹性平铺 + 水波纹），博客区为图钉便利贴板。

> 主题的完整说明（特性、配置、给其他人安装使用的方法）见 [themes/pinwall/README.md](themes/pinwall/README.md)。

## 两个仓库的关系

| 仓库 | 存什么 | 谁看 |
|------|--------|------|
| **muzi-xiaoren/Blog**（本仓库） | 源码：Markdown、`_config.yml`、`_config.pinwall.yml` 等——**可编辑的原材料** | 自己（备份 / 版本管理 / 多设备同步） |
| **muzi-xiaoren/muzi-xiaoren.github.io** | `hexo generate` 编译出的静态 HTML——**访客看到的成品** | 所有人（https://muzi-xiaoren.github.io ） |

> 写作改这里（Blog），GitHub Actions 自动生成 HTML 并推到 github.io。**两件事是分开的。**

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
git add -A
git commit -m "新增文章：xxx"
git push                  # 推送后 GitHub Actions 自动构建部署
```

> 🚀 **自动部署**：推送到 `main` 分支后，GitHub Actions 会自动：
> 1. 安装依赖
> 2. 执行 `hexo clean && hexo generate`
> 3. 推送到 `muzi-xiaoren.github.io` 仓库
> 
> 查看部署进度：https://github.com/muzi-xiaoren/Blog/actions

## 换电脑 / 重装后怎么恢复

```bash
git clone git@github.com:muzi-xiaoren/Blog.git
cd Blog
npm install               # 重新装依赖（node_modules 不在仓库里，需重装）
```

> ✅ **多设备友好**：GitHub Actions 部署无需配置 SSH 密钥，任何设备 push 后都会自动部署。

## 部署配置

本项目使用 **GitHub Actions** 自动部署，配置文件：[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml)

### 初次设置（仅需一次）

需要在 GitHub 仓库中配置 Personal Access Token：

1. 生成 Token：https://github.com/settings/tokens/new
   - **Note**: `Hexo Deploy Token`
   - **Scopes**: 勾选 `repo`
   
2. 添加到仓库 Secrets：https://github.com/muzi-xiaoren/Blog/settings/secrets/actions
   - **Name**: `DEPLOY_TOKEN`
   - **Secret**: 粘贴生成的 token

详细步骤见：[`.github/workflows/SETUP.md`](.github/workflows/SETUP.md)

## 常改的配置

- 站点标题 / 作者 / 语言 → `_config.yml`
- 板面底色方案（dark/paper/felt/cork）/ 头像 / 社交链接 / 右上角便利贴导航 → `_config.pinwall.yml`
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
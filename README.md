# Blog —— Hexo 博客源码

本仓库存放 **博客源码**（Markdown 文章 + 配置 + 主题设置）。
基于 [Hexo](https://hexo.io/) + [Fluid 主题](https://github.com/fluid-dev/hexo-theme-fluid)。

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
- 头图 / 头像 / 社交链接 / 个人简介 → `_config.fluid.yml`
- 图片资源放 `source/img/`

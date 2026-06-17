# GitHub Actions 自动部署配置

## 已完成的配置

✅ 创建了 `.github/workflows/deploy.yml` 工作流文件

## 需要在 GitHub 上完成的配置

### 1. 设置仓库权限

前往 **Blog 仓库** 设置：
```
https://github.com/muzi-xiaoren/Blog/settings/actions
```

找到 **Workflow permissions** 部分，选择：
- ✅ **Read and write permissions**
- ✅ 勾选 **Allow GitHub Actions to create and approve pull requests**

点击 **Save** 保存。

### 2. 生成 Personal Access Token (PAT)

这是因为 GitHub Actions 需要跨仓库推送（从 Blog 推送到 muzi-xiaoren.github.io）。

#### 步骤：
1. 访问 https://github.com/settings/tokens/new
2. 填写信息：
   - **Note**: `Hexo Deploy Token`
   - **Expiration**: `No expiration` 或选择一个时间
   - **Select scopes**: 勾选 `repo` (完整的仓库访问权限)
3. 点击 **Generate token**
4. **复制生成的 token**（只显示一次！）

#### 添加到仓库 Secrets：
1. 访问 https://github.com/muzi-xiaoren/Blog/settings/secrets/actions
2. 点击 **New repository secret**
3. 填写：
   - **Name**: `DEPLOY_TOKEN`
   - **Secret**: 粘贴刚才复制的 token
4. 点击 **Add secret**

### 3. 更新工作流文件

由于需要跨仓库推送，需要修改 `deploy.yml` 使用自定义 token：

```yaml
- name: 部署到 GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    personal_token: ${{ secrets.DEPLOY_TOKEN }}  # 使用自定义 token
    publish_dir: ./public
    external_repository: muzi-xiaoren/muzi-xiaoren.github.io
    publish_branch: main
```

## 使用方法

### 以后写文章的流程：

```bash
# 1. 创建新文章
cd Blog
hexo new post "文章标题"

# 2. 编辑文章
# 编辑 source/_posts/文章标题.md

# 3. 本地预览（可选）
hexo server

# 4. 提交并推送
git add .
git commit -m "新增文章：文章标题"
git push

# 5. GitHub Actions 自动构建部署
# 访问 https://github.com/muzi-xiaoren/Blog/actions 查看进度
```

### 手动触发部署：

访问 https://github.com/muzi-xiaoren/Blog/actions/workflows/deploy.yml
点击 **Run workflow** 按钮。

## 优势

✅ 多设备同步：任何机器 push 后都会自动部署
✅ 无需本地配置 SSH 密钥
✅ 有构建日志，出错容易排查
✅ 可以随时手动触发部署

## 旧文件清理

配置完成后，可以删除：
- `deploy.sh`（已被 GitHub Actions 替代）
- 本地的 `muzi-xiaoren.github.io` 文件夹（冗余）

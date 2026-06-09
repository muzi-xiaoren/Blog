#!/usr/bin/env bash
# 一键发布博客到 https://muzi-xiaoren.github.io
# 用法：在 hexo-blog 目录下运行  ./deploy.sh
set -e

cd "$(dirname "$0")"

echo "==> 清理旧产物"
hexo clean

echo "==> 生成静态文件"
hexo generate

echo "==> 推送到 GitHub（使用 muzi-xiaoren 部署密钥）"
GIT_SSH_COMMAND="ssh -i $HOME/.ssh/passman_deploy -o IdentitiesOnly=yes" hexo deploy

echo "==> 完成！1-2 分钟后刷新 https://muzi-xiaoren.github.io"

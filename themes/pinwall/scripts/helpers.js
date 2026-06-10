'use strict';

const fs = require('fs');
const path = require('path');

// 构建时自动扫描 source/img/background/ 下的图片，作为首页 3D 画廊素材。
// 用户往该文件夹添加/删除图片后重新生成即可，无需改配置。
hexo.extend.helper.register('hero_images', function () {
  const dir = path.join(hexo.source_dir, 'img', 'background');
  let files = [];
  try {
    files = fs.readdirSync(dir)
      .filter((f) => /\.(jpe?g|png|webp|gif|avif)$/i.test(f))
      .sort();
  } catch (e) {
    // 文件夹不存在时返回空数组，主题会显示渐变占位面板
  }
  return files.map((f) => this.url_for('/img/background/' + encodeURIComponent(f)));
});

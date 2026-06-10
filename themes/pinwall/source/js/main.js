/* Pinwall 主题交互脚本 */
(function () {
  'use strict';

  /* ---------- 水波纹滤镜驱动 ----------
     全局共享一个 SVG 位移滤镜：raf 循环缓动 scale（波纹强度）
     并以正弦振荡 baseFrequency（波形流动），模拟水面 */
  var turb = document.getElementById('waterTurb');
  var disp = document.getElementById('waterDisp');
  var activeWaters = [];
  var phase = 0;
  var scaleCur = 0;
  var scaleTarget = 0;
  var rafId = null;

  function rippleTick() {
    phase += 0.016;
    scaleCur += (scaleTarget - scaleCur) * 0.07;
    if (turb && disp) {
      var bf = 0.013 + Math.sin(phase * 1.25) * 0.0045;
      turb.setAttribute('baseFrequency', (bf * 0.55).toFixed(4) + ' ' + bf.toFixed(4));
      disp.setAttribute('scale', scaleCur.toFixed(2));
    }
    if (scaleCur > 0.05 || scaleTarget > 0) {
      rafId = requestAnimationFrame(rippleTick);
    } else {
      rafId = null;
      // 完全平息后摘除滤镜类，归还渲染开销
      activeWaters.splice(0).forEach(function (el) { el.classList.remove('water'); });
    }
  }

  function rippleOn(el) {
    if (!el) return;
    el.classList.add('water');
    if (activeWaters.indexOf(el) < 0) activeWaters.push(el);
    scaleTarget = 9;
    if (rafId == null) rafId = requestAnimationFrame(rippleTick);
  }

  function rippleOff(el) {
    if (!el) return;
    var i = activeWaters.indexOf(el);
    if (i >= 0) activeWaters.splice(i, 1);
    if (!activeWaters.length) scaleTarget = 0;
    else el.classList.remove('water');
  }

  /* ---------- 首屏：鼠标靠近哪块斜板，哪块平铺 ---------- */
  var panelsBox = document.getElementById('heroPanels');
  if (panelsBox) {
    var panels = Array.prototype.slice.call(panelsBox.querySelectorAll('.panel'));
    var activeIdx = -1;

    var nearest = function (clientX) {
      var best = -1;
      var bestD = Infinity;
      panels.forEach(function (p, i) {
        var r = p.getBoundingClientRect();
        var d = Math.abs(clientX - (r.left + r.width / 2));
        if (d < bestD) { bestD = d; best = i; }
      });
      return best;
    };

    var activate = function (i) {
      if (i === activeIdx) return;
      if (activeIdx >= 0) {
        panels[activeIdx].classList.remove('active');
        rippleOff(panels[activeIdx].querySelector('.panel-img'));
      }
      activeIdx = i;
      if (i >= 0) {
        panels[i].classList.add('active');
        rippleOn(panels[i].querySelector('.panel-img'));
      }
    };

    var hero = panelsBox.closest('.hero');
    hero.addEventListener('mousemove', function (e) { activate(nearest(e.clientX)); });
    hero.addEventListener('mouseleave', function () { activate(-1); });
    // 触屏：点按平铺，再点收回
    hero.addEventListener('touchstart', function (e) {
      var i = nearest(e.touches[0].clientX);
      activate(i === activeIdx ? -1 : i);
    }, { passive: true });
  }

  /* ---------- 副标语打字机 ---------- */
  var slogan = document.getElementById('heroSlogan');
  if (slogan) {
    var text = slogan.getAttribute('data-text') || '';
    var ti = 0;
    (function typeNext() {
      if (ti <= text.length) {
        slogan.textContent = text.slice(0, ti++);
        setTimeout(typeNext, 95);
      }
    })();
  }

  /* ---------- 向下滚动按钮 ---------- */
  var sd = document.getElementById('scrollDown');
  if (sd) {
    sd.addEventListener('click', function () {
      var b = document.getElementById('board');
      if (b) b.scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------- 便利贴排版：手动定位优先，自动瀑布流补位，碰撞下移保证不重叠 ---------- */
  var field = document.getElementById('boardField');
  if (field) {
    var notes = Array.prototype.slice.call(field.querySelectorAll('.note'));

    // 确定性伪随机（同一篇文章每次刷新位置一致）
    var hash01 = function (n) {
      var x = (n * 2654435761) % 4294967296;
      return ((x >>> 8) % 1000) / 1000;
    };

    var layout = function () {
      if (!notes.length) { field.classList.add('ready'); return; }
      var W = field.clientWidth;
      var NW = notes[0].offsetWidth || 250;
      var GX = 34, GY = 38, JITTER = 14, PAD = 18;
      var cols = Math.max(1, Math.floor((W - NW) / (NW + GX)) + 1);
      var span = cols > 1 ? (W - NW) / (cols - 1) : 0;
      var placed = [];

      var collide = function (r) {
        return placed.some(function (p) {
          return !(r.x + r.w + PAD <= p.x || p.x + p.w + PAD <= r.x ||
                   r.y + r.h + PAD <= p.y || p.y + p.h + PAD <= r.y);
        });
      };

      var manual = [];
      var auto = [];
      notes.forEach(function (n) {
        (n.dataset.x != null || n.dataset.y != null ? manual : auto).push(n);
      });

      // 1) 手动定位（pin_x 为板宽百分比，pin_y 为像素），重叠时向下让位
      manual.forEach(function (n) {
        var x = Math.min(Math.max((parseFloat(n.dataset.x || 0) / 100) * (W - NW), 0), Math.max(W - NW, 0));
        var rect = { x: x, y: parseFloat(n.dataset.y || 0), w: NW, h: n.offsetHeight, n: n };
        while (collide(rect)) rect.y += 24;
        placed.push(rect);
      });

      // 2) 自动排版：最矮列优先 + 确定性抖动
      var colY = [];
      for (var c = 0; c < cols; c++) colY.push(20);
      auto.forEach(function (n) {
        var idx = parseInt(n.dataset.i || 0, 10);
        var col = 0;
        colY.forEach(function (v, k) { if (v < colY[col]) col = k; });
        var jx = (hash01(idx * 3 + 1) - 0.5) * 2 * JITTER;
        var rect = {
          x: Math.min(Math.max(col * span + jx, 0), Math.max(W - NW, 0)),
          y: colY[col] + hash01(idx * 7 + 2) * 10,
          w: NW, h: n.offsetHeight, n: n
        };
        while (collide(rect)) rect.y += 24;
        placed.push(rect);
        colY[col] = rect.y + rect.h + GY;
      });

      // 应用坐标与旋转
      var maxBottom = 0;
      placed.forEach(function (r) {
        r.n.style.left = r.x + 'px';
        r.n.style.top = r.y + 'px';
        if (r.n.dataset.rot != null) {
          r.n.style.setProperty('--rot', r.n.dataset.rot + 'deg');
        } else {
          var idx = parseInt(r.n.dataset.i || 0, 10);
          r.n.style.setProperty('--rot', ((hash01(idx * 13 + 5) - 0.5) * 7).toFixed(2) + 'deg');
        }
        maxBottom = Math.max(maxBottom, r.y + r.h);
      });
      field.style.height = (maxBottom + 30) + 'px';
      field.classList.add('ready');
    };

    layout();
    window.addEventListener('load', layout);
    var resizeTimer;
    window.addEventListener('resize', function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(layout, 200);
    });

    // 悬停水波
    notes.forEach(function (n) {
      var w = n.querySelector('.note-water');
      n.addEventListener('mouseenter', function () { rippleOn(w); });
      n.addEventListener('mouseleave', function () { rippleOff(w); });
    });
  }
})();

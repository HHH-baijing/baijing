/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：首页数据渲染 + canvas 粒子背景动画
 */
(function () {
  'use strict';

  // 页面导航数据（新建页面后在此追加，并同步在 index.html 中可点击）
  var baijing_pageList = [
    { baijing_title: '首页', baijing_desc: '项目入口与导航', baijing_href: './index.html', baijing_ready: true },
    { baijing_title: '数据库连接测试', baijing_desc: '输入用户名与密码，测试 MySQL 连接是否成功', baijing_href: './database.html', baijing_ready: true },
    { baijing_title: '科技新闻列表', baijing_desc: '新闻数据存储于数据库，页面展示接口地址与数据内容', baijing_href: './news.html', baijing_ready: true },
    { baijing_title: '图文列表', baijing_desc: '图文混排列表，数据来自独立数据表', baijing_href: './gallery.html', baijing_ready: true }
  ];

  function baijing_renderNav() {
    var baijing_grid = document.getElementById('baijing_navGrid');
    if (!baijing_grid) {
      return;
    }

    baijing_pageList.forEach(function (baijing_item) {
      var baijing_card;

      if (baijing_item.baijing_ready) {
        baijing_card = document.createElement('a');
        baijing_card.href = baijing_item.baijing_href;
      } else {
        baijing_card = document.createElement('div');
      }

      baijing_card.className = 'baijing_navCard' + (baijing_item.baijing_ready ? '' : ' baijing_navCard--disabled');

      var baijing_titleEl = document.createElement('span');
      baijing_titleEl.className = 'baijing_navTitle';
      baijing_titleEl.textContent = baijing_item.baijing_title;

      var baijing_descEl = document.createElement('span');
      baijing_descEl.className = 'baijing_navDesc';
      baijing_descEl.textContent = baijing_item.baijing_desc;

      var baijing_statusEl = document.createElement('span');
      baijing_statusEl.className = 'baijing_navStatus';
      baijing_statusEl.textContent = baijing_item.baijing_ready ? '已上线' : '待开发';

      baijing_card.appendChild(baijing_titleEl);
      baijing_card.appendChild(baijing_descEl);
      baijing_card.appendChild(baijing_statusEl);
      baijing_grid.appendChild(baijing_card);
    });

    console.log('页面导航渲染完成，共 ' + baijing_pageList.length + ' 项');
  }

  function baijing_initCanvas() {
    var baijing_canvas = document.getElementById('baijing_canvasBg');
    if (!baijing_canvas || !baijing_canvas.getContext) {
      return;
    }

    var baijing_ctx = baijing_canvas.getContext('2d');
    var baijing_particles = [];
    var baijing_mouse = { baijing_x: null, baijing_y: null };
    var baijing_count = 70;

    function baijing_resize() {
      baijing_canvas.width = window.innerWidth;
      baijing_canvas.height = window.innerHeight;
    }

    function baijing_createParticles() {
      baijing_particles = [];
      for (var baijing_i = 0; baijing_i < baijing_count; baijing_i++) {
        baijing_particles.push({
          baijing_x: Math.random() * baijing_canvas.width,
          baijing_y: Math.random() * baijing_canvas.height,
          baijing_vx: (Math.random() - 0.5) * 0.45,
          baijing_vy: (Math.random() - 0.5) * 0.45,
          baijing_r: Math.random() * 1.8 + 0.8
        });
      }
    }

    function baijing_draw() {
      baijing_ctx.clearRect(0, 0, baijing_canvas.width, baijing_canvas.height);

      baijing_particles.forEach(function (baijing_p) {
        baijing_p.baijing_x += baijing_p.baijing_vx;
        baijing_p.baijing_y += baijing_p.baijing_vy;

        if (baijing_p.baijing_x < 0 || baijing_p.baijing_x > baijing_canvas.width) {
          baijing_p.baijing_vx *= -1;
        }
        if (baijing_p.baijing_y < 0 || baijing_p.baijing_y > baijing_canvas.height) {
          baijing_p.baijing_vy *= -1;
        }

        baijing_ctx.beginPath();
        baijing_ctx.arc(baijing_p.baijing_x, baijing_p.baijing_y, baijing_p.baijing_r, 0, Math.PI * 2);
        baijing_ctx.fillStyle = 'rgba(120, 180, 255, 0.65)';
        baijing_ctx.fill();
      });

      // 粒子连线
      for (var baijing_i = 0; baijing_i < baijing_particles.length; baijing_i++) {
        for (var baijing_j = baijing_i + 1; baijing_j < baijing_particles.length; baijing_j++) {
          var baijing_a = baijing_particles[baijing_i];
          var baijing_b = baijing_particles[baijing_j];
          var baijing_dx = baijing_a.baijing_x - baijing_b.baijing_x;
          var baijing_dy = baijing_a.baijing_y - baijing_b.baijing_y;
          var baijing_dist = Math.sqrt(baijing_dx * baijing_dx + baijing_dy * baijing_dy);

          if (baijing_dist < 130) {
            baijing_ctx.beginPath();
            baijing_ctx.moveTo(baijing_a.baijing_x, baijing_a.baijing_y);
            baijing_ctx.lineTo(baijing_b.baijing_x, baijing_b.baijing_y);
            baijing_ctx.strokeStyle = 'rgba(0, 132, 255, ' + (0.22 * (1 - baijing_dist / 130)) + ')';
            baijing_ctx.lineWidth = 1;
            baijing_ctx.stroke();
          }
        }

        // 鼠标吸附连线
        if (baijing_mouse.baijing_x !== null) {
          var baijing_mdx = baijing_particles[baijing_i].baijing_x - baijing_mouse.baijing_x;
          var baijing_mdy = baijing_particles[baijing_i].baijing_y - baijing_mouse.baijing_y;
          var baijing_mdist = Math.sqrt(baijing_mdx * baijing_mdx + baijing_mdy * baijing_mdy);

          if (baijing_mdist < 170) {
            baijing_ctx.beginPath();
            baijing_ctx.moveTo(baijing_particles[baijing_i].baijing_x, baijing_particles[baijing_i].baijing_y);
            baijing_ctx.lineTo(baijing_mouse.baijing_x, baijing_mouse.baijing_y);
            baijing_ctx.strokeStyle = 'rgba(106, 92, 255, ' + (0.35 * (1 - baijing_mdist / 170)) + ')';
            baijing_ctx.lineWidth = 1;
            baijing_ctx.stroke();
          }
        }
      }

      window.requestAnimationFrame(baijing_draw);
    }

    window.addEventListener('resize', function () {
      baijing_resize();
      baijing_createParticles();
    });

    window.addEventListener('mousemove', function (baijing_event) {
      baijing_mouse.baijing_x = baijing_event.clientX;
      baijing_mouse.baijing_y = baijing_event.clientY;
    });

    window.addEventListener('mouseout', function () {
      baijing_mouse.baijing_x = null;
      baijing_mouse.baijing_y = null;
    });

    baijing_resize();
    baijing_createParticles();
    baijing_draw();
  }

  document.addEventListener('DOMContentLoaded', function () {
    baijing_renderNav();
    baijing_initCanvas();
    console.log('首页加载完成：知乎的模仿与制作');
  });
})();

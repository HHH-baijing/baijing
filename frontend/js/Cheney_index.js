/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：首页数据渲染 + canvas 粒子背景动画
 */
(function () {
  'use strict';

  // 页面导航数据（新建页面后在此追加，并同步在 index.html 中可点击）
  var Cheney_pageList = [
    { Cheney_title: '首页', Cheney_desc: '项目入口与导航', Cheney_href: './index.html', Cheney_ready: true },
    { Cheney_title: '数据库连接测试', Cheney_desc: '输入用户名与密码，测试 MySQL 连接是否成功', Cheney_href: './database.html', Cheney_ready: false },
    { Cheney_title: '科技新闻列表', Cheney_desc: '新闻数据存储于数据库，页面展示接口地址与数据内容', Cheney_href: './news.html', Cheney_ready: false },
    { Cheney_title: '图文列表', Cheney_desc: '图文混排列表，数据来自独立数据表', Cheney_href: './gallery.html', Cheney_ready: false }
  ];

  function Cheney_renderNav() {
    var Cheney_grid = document.getElementById('Cheney_navGrid');
    if (!Cheney_grid) {
      return;
    }

    Cheney_pageList.forEach(function (Cheney_item) {
      var Cheney_card;

      if (Cheney_item.Cheney_ready) {
        Cheney_card = document.createElement('a');
        Cheney_card.href = Cheney_item.Cheney_href;
      } else {
        Cheney_card = document.createElement('div');
      }

      Cheney_card.className = 'Cheney_navCard' + (Cheney_item.Cheney_ready ? '' : ' Cheney_navCard--disabled');

      var Cheney_titleEl = document.createElement('span');
      Cheney_titleEl.className = 'Cheney_navTitle';
      Cheney_titleEl.textContent = Cheney_item.Cheney_title;

      var Cheney_descEl = document.createElement('span');
      Cheney_descEl.className = 'Cheney_navDesc';
      Cheney_descEl.textContent = Cheney_item.Cheney_desc;

      var Cheney_statusEl = document.createElement('span');
      Cheney_statusEl.className = 'Cheney_navStatus';
      Cheney_statusEl.textContent = Cheney_item.Cheney_ready ? '已上线' : '待开发';

      Cheney_card.appendChild(Cheney_titleEl);
      Cheney_card.appendChild(Cheney_descEl);
      Cheney_card.appendChild(Cheney_statusEl);
      Cheney_grid.appendChild(Cheney_card);
    });

    console.log('页面导航渲染完成，共 ' + Cheney_pageList.length + ' 项');
  }

  function Cheney_initCanvas() {
    var Cheney_canvas = document.getElementById('Cheney_canvasBg');
    if (!Cheney_canvas || !Cheney_canvas.getContext) {
      return;
    }

    var Cheney_ctx = Cheney_canvas.getContext('2d');
    var Cheney_particles = [];
    var Cheney_mouse = { Cheney_x: null, Cheney_y: null };
    var Cheney_count = 70;

    function Cheney_resize() {
      Cheney_canvas.width = window.innerWidth;
      Cheney_canvas.height = window.innerHeight;
    }

    function Cheney_createParticles() {
      Cheney_particles = [];
      for (var Cheney_i = 0; Cheney_i < Cheney_count; Cheney_i++) {
        Cheney_particles.push({
          Cheney_x: Math.random() * Cheney_canvas.width,
          Cheney_y: Math.random() * Cheney_canvas.height,
          Cheney_vx: (Math.random() - 0.5) * 0.45,
          Cheney_vy: (Math.random() - 0.5) * 0.45,
          Cheney_r: Math.random() * 1.8 + 0.8
        });
      }
    }

    function Cheney_draw() {
      Cheney_ctx.clearRect(0, 0, Cheney_canvas.width, Cheney_canvas.height);

      Cheney_particles.forEach(function (Cheney_p) {
        Cheney_p.Cheney_x += Cheney_p.Cheney_vx;
        Cheney_p.Cheney_y += Cheney_p.Cheney_vy;

        if (Cheney_p.Cheney_x < 0 || Cheney_p.Cheney_x > Cheney_canvas.width) {
          Cheney_p.Cheney_vx *= -1;
        }
        if (Cheney_p.Cheney_y < 0 || Cheney_p.Cheney_y > Cheney_canvas.height) {
          Cheney_p.Cheney_vy *= -1;
        }

        Cheney_ctx.beginPath();
        Cheney_ctx.arc(Cheney_p.Cheney_x, Cheney_p.Cheney_y, Cheney_p.Cheney_r, 0, Math.PI * 2);
        Cheney_ctx.fillStyle = 'rgba(120, 180, 255, 0.65)';
        Cheney_ctx.fill();
      });

      // 粒子连线
      for (var Cheney_i = 0; Cheney_i < Cheney_particles.length; Cheney_i++) {
        for (var Cheney_j = Cheney_i + 1; Cheney_j < Cheney_particles.length; Cheney_j++) {
          var Cheney_a = Cheney_particles[Cheney_i];
          var Cheney_b = Cheney_particles[Cheney_j];
          var Cheney_dx = Cheney_a.Cheney_x - Cheney_b.Cheney_x;
          var Cheney_dy = Cheney_a.Cheney_y - Cheney_b.Cheney_y;
          var Cheney_dist = Math.sqrt(Cheney_dx * Cheney_dx + Cheney_dy * Cheney_dy);

          if (Cheney_dist < 130) {
            Cheney_ctx.beginPath();
            Cheney_ctx.moveTo(Cheney_a.Cheney_x, Cheney_a.Cheney_y);
            Cheney_ctx.lineTo(Cheney_b.Cheney_x, Cheney_b.Cheney_y);
            Cheney_ctx.strokeStyle = 'rgba(0, 132, 255, ' + (0.22 * (1 - Cheney_dist / 130)) + ')';
            Cheney_ctx.lineWidth = 1;
            Cheney_ctx.stroke();
          }
        }

        // 鼠标吸附连线
        if (Cheney_mouse.Cheney_x !== null) {
          var Cheney_mdx = Cheney_particles[Cheney_i].Cheney_x - Cheney_mouse.Cheney_x;
          var Cheney_mdy = Cheney_particles[Cheney_i].Cheney_y - Cheney_mouse.Cheney_y;
          var Cheney_mdist = Math.sqrt(Cheney_mdx * Cheney_mdx + Cheney_mdy * Cheney_mdy);

          if (Cheney_mdist < 170) {
            Cheney_ctx.beginPath();
            Cheney_ctx.moveTo(Cheney_particles[Cheney_i].Cheney_x, Cheney_particles[Cheney_i].Cheney_y);
            Cheney_ctx.lineTo(Cheney_mouse.Cheney_x, Cheney_mouse.Cheney_y);
            Cheney_ctx.strokeStyle = 'rgba(106, 92, 255, ' + (0.35 * (1 - Cheney_mdist / 170)) + ')';
            Cheney_ctx.lineWidth = 1;
            Cheney_ctx.stroke();
          }
        }
      }

      window.requestAnimationFrame(Cheney_draw);
    }

    window.addEventListener('resize', function () {
      Cheney_resize();
      Cheney_createParticles();
    });

    window.addEventListener('mousemove', function (Cheney_event) {
      Cheney_mouse.Cheney_x = Cheney_event.clientX;
      Cheney_mouse.Cheney_y = Cheney_event.clientY;
    });

    window.addEventListener('mouseout', function () {
      Cheney_mouse.Cheney_x = null;
      Cheney_mouse.Cheney_y = null;
    });

    Cheney_resize();
    Cheney_createParticles();
    Cheney_draw();
  }

  document.addEventListener('DOMContentLoaded', function () {
    Cheney_renderNav();
    Cheney_initCanvas();
    console.log('首页加载完成：知乎的模仿与制作');
  });
})();

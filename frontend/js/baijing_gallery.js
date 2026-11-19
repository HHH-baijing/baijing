/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：图文列表页交互逻辑
 */
(function () {
  'use strict';

  var baijing_gridEl = document.getElementById('baijing_galleryGrid');
  var baijing_resultEl = document.getElementById('baijing_result');
  var baijing_countEl = document.getElementById('baijing_apiCount');

  function baijing_showError(baijing_msg) {
    baijing_resultEl.className = 'baijing_result baijing_result--error';
    baijing_resultEl.textContent = baijing_msg;
  }

  function baijing_renderGallery(baijing_list) {
    baijing_gridEl.innerHTML = '';

    baijing_list.forEach(function (baijing_item) {
      var baijing_card = document.createElement('article');
      baijing_card.className = 'baijing_galleryCard';

      var baijing_imgWrap = document.createElement('div');
      baijing_imgWrap.className = 'baijing_galleryImgWrap';

      var baijing_img = document.createElement('img');
      baijing_img.className = 'baijing_galleryImg';
      baijing_img.src = baijing_item.baijing_image_url;
      baijing_img.alt = baijing_item.baijing_title;
      baijing_img.loading = 'lazy';
      baijing_img.addEventListener('error', function () {
        baijing_imgWrap.classList.add('baijing_galleryImgWrap--failed');
        console.error('图片加载失败：', baijing_item.baijing_image_url);
      });

      var baijing_category = document.createElement('span');
      baijing_category.className = 'baijing_galleryCategory';
      baijing_category.textContent = baijing_item.baijing_category;

      baijing_imgWrap.appendChild(baijing_img);
      baijing_imgWrap.appendChild(baijing_category);

      var baijing_body = document.createElement('div');
      baijing_body.className = 'baijing_galleryBody';

      var baijing_title = document.createElement('h3');
      baijing_title.className = 'baijing_galleryTitle';
      baijing_title.textContent = baijing_item.baijing_title;

      var baijing_desc = document.createElement('p');
      baijing_desc.className = 'baijing_galleryDesc';
      baijing_desc.textContent = baijing_item.baijing_desc;

      var baijing_meta = document.createElement('div');
      baijing_meta.className = 'baijing_galleryMeta';
      baijing_meta.textContent = '浏览 ' + baijing_item.baijing_views;

      baijing_body.appendChild(baijing_title);
      baijing_body.appendChild(baijing_desc);
      baijing_body.appendChild(baijing_meta);

      baijing_card.appendChild(baijing_imgWrap);
      baijing_card.appendChild(baijing_body);
      baijing_gridEl.appendChild(baijing_card);
    });
  }

  fetch('/api/gallery')
    .then(function (baijing_res) {
      return baijing_res.json();
    })
    .then(function (baijing_data) {
      console.log('图文列表接口返回：', baijing_data);

      if (baijing_data.code !== 0) {
        baijing_showError(baijing_data.msg);
        console.error('获取图文列表失败：', baijing_data);
        return;
      }

      baijing_countEl.textContent = '共 ' + baijing_data.data.baijing_total + ' 条';
      baijing_renderGallery(baijing_data.data.baijing_list);
    })
    .catch(function (baijing_err) {
      baijing_showError('请求接口失败：' + baijing_err.message);
      console.error('图文列表接口请求异常：', baijing_err);
    });
})();

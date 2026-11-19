/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：科技新闻列表页交互逻辑
 */
(function () {
  'use strict';

  var baijing_listEl = document.getElementById('baijing_newsList');
  var baijing_resultEl = document.getElementById('baijing_result');
  var baijing_countEl = document.getElementById('baijing_apiCount');

  function baijing_showError(baijing_msg) {
    baijing_resultEl.className = 'baijing_result baijing_result--error';
    baijing_resultEl.textContent = baijing_msg;
  }

  function baijing_renderNews(baijing_list) {
    baijing_listEl.innerHTML = '';

    baijing_list.forEach(function (baijing_item) {
      var baijing_card = document.createElement('article');
      baijing_card.className = 'baijing_newsCard';

      var baijing_title = document.createElement('h3');
      baijing_title.className = 'baijing_newsCardTitle';
      baijing_title.textContent = baijing_item.baijing_title;

      var baijing_summary = document.createElement('p');
      baijing_summary.className = 'baijing_newsCardSummary';
      baijing_summary.textContent = baijing_item.baijing_summary;

      var baijing_meta = document.createElement('div');
      baijing_meta.className = 'baijing_newsCardMeta';

      var baijing_time = String(baijing_item.baijing_publish_time).replace('T', ' ').slice(0, 16);

      [
        baijing_item.baijing_source,
        baijing_item.baijing_author,
        baijing_time,
        '阅读 ' + baijing_item.baijing_views
      ].forEach(function (baijing_text) {
        var baijing_span = document.createElement('span');
        baijing_span.className = 'baijing_metaItem';
        baijing_span.textContent = baijing_text;
        baijing_meta.appendChild(baijing_span);
      });

      baijing_card.appendChild(baijing_title);
      baijing_card.appendChild(baijing_summary);
      baijing_card.appendChild(baijing_meta);
      baijing_listEl.appendChild(baijing_card);
    });
  }

  fetch('/api/news')
    .then(function (baijing_res) {
      return baijing_res.json();
    })
    .then(function (baijing_data) {
      console.log('科技新闻接口返回：', baijing_data);

      if (baijing_data.code !== 0) {
        baijing_showError(baijing_data.msg);
        console.error('获取科技新闻失败：', baijing_data);
        return;
      }

      baijing_countEl.textContent = '共 ' + baijing_data.data.baijing_total + ' 条';
      baijing_renderNews(baijing_data.data.baijing_list);
    })
    .catch(function (baijing_err) {
      baijing_showError('请求接口失败：' + baijing_err.message);
      console.error('科技新闻接口请求异常：', baijing_err);
    });
})();

/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：数据库连接测试页交互逻辑
 */
(function () {
  'use strict';

  var baijing_form = document.getElementById('baijing_dbForm');
  var baijing_result = document.getElementById('baijing_result');
  var baijing_submitBtn = document.getElementById('baijing_submitBtn');

  function baijing_showResult(baijing_type, baijing_msg) {
    baijing_result.className = 'baijing_result baijing_result--' + baijing_type;
    baijing_result.textContent = baijing_msg;
  }

  baijing_form.addEventListener('submit', function (baijing_event) {
    baijing_event.preventDefault();

    var baijing_username = document.getElementById('baijing_username').value.trim();
    var baijing_password = document.getElementById('baijing_password').value;

    if (!baijing_username) {
      baijing_showResult('error', '请输入用户名');
      console.error('数据库连接测试失败：用户名为空');
      return;
    }

    baijing_submitBtn.disabled = true;
    baijing_submitBtn.textContent = '连接中...';
    baijing_showResult('loading', '正在连接 MySQL 数据库，请稍候...');

    fetch('/api/db/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        baijing_username: baijing_username,
        baijing_password: baijing_password
      })
    })
      .then(function (baijing_res) {
        return baijing_res.json();
      })
      .then(function (baijing_data) {
        console.log('数据库连接测试接口返回：', baijing_data);

        if (baijing_data.code === 0) {
          var baijing_info = baijing_data.data;
          baijing_showResult(
            'success',
            baijing_data.msg +
              '（MySQL ' + baijing_info.baijing_version +
              '，地址 ' + baijing_info.baijing_host + ':' + baijing_info.baijing_port +
              '，用户 ' + baijing_info.baijing_user + '）'
          );
        } else {
          baijing_showResult('error', baijing_data.msg);
          console.error('数据库连接测试失败：', baijing_data);
        }
      })
      .catch(function (baijing_err) {
        baijing_showResult('error', '请求接口失败：' + baijing_err.message);
        console.error('数据库连接测试请求异常：', baijing_err);
      })
      .finally(function () {
        baijing_submitBtn.disabled = false;
        baijing_submitBtn.textContent = '测试连接';
      });
  });

  console.log('数据库连接测试页加载完成');
})();

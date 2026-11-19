/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：科技新闻列表控制器
 */
const baijing_pool = require('../models/baijing_db.model');

const baijing_getNewsList = async (baijing_req, baijing_res) => {
  try {
    const [baijing_rows] = await baijing_pool.query(
      'SELECT baijing_id, baijing_title, baijing_summary, baijing_source, baijing_author, baijing_publish_time, baijing_views FROM baijing_news ORDER BY baijing_publish_time DESC'
    );

    baijing_res.json({
      code: 0,
      msg: '获取科技新闻列表成功',
      data: {
        baijing_total: baijing_rows.length,
        baijing_list: baijing_rows
      }
    });
  } catch (baijing_err) {
    console.error('获取科技新闻列表失败：', baijing_err.message);
    baijing_res.json({
      code: 1,
      msg: '获取科技新闻列表失败：' + baijing_err.message,
      data: null
    });
  }
};

module.exports = { baijing_getNewsList };

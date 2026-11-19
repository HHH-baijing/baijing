/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：图文列表控制器
 */
const baijing_pool = require('../models/baijing_db.model');

const baijing_getGalleryList = async (baijing_req, baijing_res) => {
  try {
    const [baijing_rows] = await baijing_pool.query(
      'SELECT baijing_id, baijing_title, baijing_desc, baijing_image_url, baijing_category, baijing_views FROM baijing_gallery ORDER BY baijing_id ASC'
    );

    baijing_res.json({
      code: 0,
      msg: '获取图文列表成功',
      data: {
        baijing_total: baijing_rows.length,
        baijing_list: baijing_rows
      }
    });
  } catch (baijing_err) {
    console.error('获取图文列表失败：', baijing_err.message);
    baijing_res.json({
      code: 1,
      msg: '获取图文列表失败：' + baijing_err.message,
      data: null
    });
  }
};

module.exports = { baijing_getGalleryList };

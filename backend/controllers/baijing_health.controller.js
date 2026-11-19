/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：健康检查控制器
 */
const baijing_getHealth = (baijing_req, baijing_res) => {
  baijing_res.json({
    code: 0,
    msg: '服务运行正常',
    data: {
      baijing_serverTime: new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }),
      baijing_port: 8327
    }
  });
};

module.exports = { baijing_getHealth };

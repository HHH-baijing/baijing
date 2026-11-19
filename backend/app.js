/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：Express 服务入口，托管 frontend 静态资源，统一挂载 /api 路由
 */
const baijing_express = require('express');
const baijing_cors = require('cors');
const baijing_path = require('path');
require('dotenv').config();

const baijing_apiRouter = require('./routes/baijing_api.route');

const baijing_app = baijing_express();
const baijing_PORT = 8327;

// 支持所有跨域访问
baijing_app.use(baijing_cors());
baijing_app.use(baijing_express.json());
baijing_app.use(baijing_express.urlencoded({ extended: true }));

// 托管前端静态资源
baijing_app.use(baijing_express.static(baijing_path.join(__dirname, '..', 'frontend')));

// 所有接口统一以 /api 为前缀
baijing_app.use('/api', baijing_apiRouter);

// 404 兜底
baijing_app.use((baijing_req, baijing_res) => {
  baijing_res.status(404).json({ code: 404, msg: '接口不存在', data: null });
});

baijing_app.listen(baijing_PORT, () => {
  console.log(`服务已启动：http://localhost:${baijing_PORT}`);
  console.log(`接口根路径：http://localhost:${baijing_PORT}/api`);
});

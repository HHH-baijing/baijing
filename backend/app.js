/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：Express 服务入口，托管 frontend 静态资源，统一挂载 /api 路由
 */
const Cheney_express = require('express');
const Cheney_cors = require('cors');
const Cheney_path = require('path');
require('dotenv').config();

const Cheney_apiRouter = require('./routes/Cheney_api.route');

const Cheney_app = Cheney_express();
const Cheney_PORT = 8327;

// 支持所有跨域访问
Cheney_app.use(Cheney_cors());
Cheney_app.use(Cheney_express.json());
Cheney_app.use(Cheney_express.urlencoded({ extended: true }));

// 托管前端静态资源
Cheney_app.use(Cheney_express.static(Cheney_path.join(__dirname, '..', 'frontend')));

// 所有接口统一以 /api 为前缀
Cheney_app.use('/api', Cheney_apiRouter);

// 404 兜底
Cheney_app.use((Cheney_req, Cheney_res) => {
  Cheney_res.status(404).json({ code: 404, msg: '接口不存在', data: null });
});

Cheney_app.listen(Cheney_PORT, () => {
  console.log(`服务已启动：http://localhost:${Cheney_PORT}`);
  console.log(`接口根路径：http://localhost:${Cheney_PORT}/api`);
});

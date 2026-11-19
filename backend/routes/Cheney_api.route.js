/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：/api 路由汇总
 */
const Cheney_express = require('express');
const Cheney_router = Cheney_express.Router();

const Cheney_healthController = require('../controllers/Cheney_health.controller');

Cheney_router.get('/health', Cheney_healthController.Cheney_getHealth);

module.exports = Cheney_router;

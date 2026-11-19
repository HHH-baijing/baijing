/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：/api 路由汇总
 */
const baijing_express = require('express');
const baijing_router = baijing_express.Router();

const baijing_healthController = require('../controllers/baijing_health.controller');
const baijing_databaseController = require('../controllers/baijing_database.controller');
const baijing_newsController = require('../controllers/baijing_news.controller');
const baijing_galleryController = require('../controllers/baijing_gallery.controller');

baijing_router.get('/health', baijing_healthController.baijing_getHealth);
baijing_router.post('/db/test', baijing_databaseController.baijing_testConnection);
baijing_router.get('/news', baijing_newsController.baijing_getNewsList);
baijing_router.get('/gallery', baijing_galleryController.baijing_getGalleryList);

module.exports = baijing_router;

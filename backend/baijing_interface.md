# 接口文档

> 统一 JSON 响应格式：`{ "code": 0, "msg": "提示信息", "data": {...} }`，code=0 表示成功，非 0 表示失败。

---

## GET /api/health

- HTTP 方法：GET
- 请求参数：无
- 请求示例：`http://localhost:8327/api/health`
- 响应格式：

```json
{
  "code": 0,
  "msg": "服务运行正常",
  "data": {
    "baijing_serverTime": "2026/11/19 13:50:00",
    "baijing_port": 8327
  }
}
```

- 修改时间：2026-11-19 13:49

---

## POST /api/db/test

- HTTP 方法：POST
- 请求参数（JSON Body）：

```json
{
  "baijing_username": "root",
  "baijing_password": "root"
}
```

- 请求示例：`POST http://localhost:8327/api/db/test`
- 响应格式（成功）：

```json
{
  "code": 0,
  "msg": "数据库连接成功",
  "data": {
    "baijing_version": "8.4.0",
    "baijing_host": "localhost",
    "baijing_port": 3306,
    "baijing_user": "root",
    "baijing_databases": ["classroom_db", "mysql", "sys", "world"]
  }
}
```

- 响应格式（失败）：

```json
{
  "code": 2,
  "msg": "数据库连接失败：Access denied for user 'root'@'localhost' (using password: YES)",
  "data": {
    "baijing_code": "ER_ACCESS_DENIED_ERROR",
    "baijing_errno": 1045
  }
}
```

- 修改时间：2026-11-19 14:12

---

## GET /api/news

- HTTP 方法：GET
- 请求参数：无
- 请求示例：`http://localhost:8327/api/news`
- 响应格式（成功）：

```json
{
  "code": 0,
  "msg": "获取科技新闻列表成功",
  "data": {
    "baijing_total": 9,
    "baijing_list": [
      {
        "baijing_id": 1,
        "baijing_title": "国产大模型发布新一代版本，多模态能力显著提升",
        "baijing_summary": "新版本在图像理解、语音交互与长文本推理三项评测中均取得领先成绩，并同步开放企业级接口。",
        "baijing_source": "科技日报",
        "baijing_author": "张明",
        "baijing_publish_time": "2026-11-18 09:30:00",
        "baijing_views": 12800
      }
    ]
  }
}
```

- 响应格式（失败）：

```json
{
  "code": 1,
  "msg": "获取科技新闻列表失败：连接数据库失败",
  "data": null
}
```

- 数据来源：MySQL 表 `zhihu_copy.baijing_news`，按发布时间倒序
- 修改时间：2026-11-19 14:20

---

## GET /api/gallery

- HTTP 方法：GET
- 请求参数：无
- 请求示例：`http://localhost:8327/api/gallery`
- 响应格式（成功）：

```json
{
  "code": 0,
  "msg": "获取图文列表成功",
  "data": {
    "baijing_total": 9,
    "baijing_list": [
      {
        "baijing_id": 1,
        "baijing_title": "智能芯片的微观世界",
        "baijing_desc": "芯片内部的晶体管排列如同城市路网，制程越小，单位面积内可容纳的计算单元越多。",
        "baijing_image_url": "/images/baijing_gallery_1.jpg",
        "baijing_category": "硬件",
        "baijing_views": 3200
      }
    ]
  }
}
```

- 响应格式（失败）：

```json
{
  "code": 1,
  "msg": "获取图文列表失败：连接数据库失败",
  "data": null
}
```

- 数据来源：MySQL 表 `zhihu_copy.baijing_gallery`，按 id 升序
- 修改时间：2026-11-19 14:26




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
    "Cheney_serverTime": "2026/11/19 13:50:00",
    "Cheney_port": 8327
  }
}
```

- 修改时间：2026-11-19 13:49

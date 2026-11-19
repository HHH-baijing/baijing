# 数据库说明（执行顺序）

> 数据库：MySQL 8.4，库名 `zhihu_copy`，字符集 `utf8mb4`。
> 连接凭据存放于 `backend/.env`（`DB_USER`、`DB_PASSWORD`、`DB_HOST`、`DB_PORT`、`DB_NAME`），不在本文件与代码中体现。
> 仅凭本文件按顺序执行，即可在新机器上完整重建数据库。

---

## 1. 创建数据库

```sql
CREATE DATABASE IF NOT EXISTS zhihu_copy
  DEFAULT CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE zhihu_copy;
```

执行时间：2026-11-19 14:20

---

## 2. 创建科技新闻表 `baijing_news`

```sql
CREATE TABLE IF NOT EXISTS baijing_news (
  baijing_id INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  baijing_title VARCHAR(200) NOT NULL COMMENT '新闻标题',
  baijing_summary VARCHAR(500) NOT NULL DEFAULT '' COMMENT '新闻摘要',
  baijing_source VARCHAR(100) NOT NULL DEFAULT '' COMMENT '来源媒体',
  baijing_author VARCHAR(50) NOT NULL DEFAULT '' COMMENT '作者',
  baijing_publish_time DATETIME NOT NULL COMMENT '发布时间',
  baijing_views INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '阅读量',
  baijing_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (baijing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='科技新闻表';
```

执行时间：2026-11-19 14:20

---

## 3. 插入科技新闻测试数据（9 条）

```sql
INSERT INTO baijing_news (baijing_title, baijing_summary, baijing_source, baijing_author, baijing_publish_time, baijing_views) VALUES
('国产大模型发布新一代版本，多模态能力显著提升', '新版本在图像理解、语音交互与长文本推理三项评测中均取得领先成绩，并同步开放企业级接口。', '科技日报', '张明', '2026-11-18 09:30:00', 12800),
('新一代折叠屏手机发布：铰链结构与屏幕寿命双双升级', '官方称折叠次数通过四十万次测试，整机重量进一步下降，起售价与上代持平。', '极客公园', '李然', '2026-11-17 14:20:00', 9600),
('量子计算原型机完成新算法验证，纠错效率提升明显', '研究团队在超导量子平台上验证了新型纠错方案，为通用量子计算迈出关键一步。', '中国科学报', '王芳', '2026-11-16 10:05:00', 7400),
('开源社区推出轻量级前端框架，首周下载量破百万', '该框架主打零依赖与原生渲染，压缩后体积不足十千字节，受到中小项目开发者关注。', 'InfoQ', '陈晨', '2026-11-15 16:45:00', 15300),
('自动驾驶出租车扩大运营范围，覆盖城市核心商圈', '运营方表示车队规模将增加至千辆级别，夜间时段也将开放叫车服务。', '36氪', '赵磊', '2026-11-14 11:10:00', 11200),
('芯片厂商公布两纳米工艺路线图，预计后年量产', '新工艺重点优化能效比，首批产能将优先供应移动终端与数据中心客户。', '半导体观察', '刘洋', '2026-11-13 08:50:00', 8800),
('卫星互联网完成手机直连通话测试，时延低于预期', '测试在偏远地区进行，普通智能手机无需外接设备即可完成语音与短信通信。', '通信世界', '孙悦', '2026-11-12 19:30:00', 6900),
('脑机接口临床试验取得阶段性成果，患者实现意念打字', '试验参与者通过植入设备完成每分钟二十字符的输入，为后续康复应用提供数据支撑。', '医学科技前沿', '周宁', '2026-11-11 13:15:00', 5400),
('数据中心液冷技术规模化落地，整体能耗下降三成', '多家云服务商在新一代机房中采用浸没式液冷方案，单机柜功率密度明显提升。', '绿色算力网', '吴桐', '2026-11-10 09:00:00', 4300);
```

执行时间：2026-11-19 14:20

---

## 4. 创建图文列表表 `baijing_gallery`

```sql
CREATE TABLE IF NOT EXISTS baijing_gallery (
  baijing_id INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
  baijing_title VARCHAR(150) NOT NULL COMMENT '图文标题',
  baijing_desc VARCHAR(500) NOT NULL DEFAULT '' COMMENT '图文描述',
  baijing_image_url VARCHAR(600) NOT NULL COMMENT '图片地址',
  baijing_category VARCHAR(50) NOT NULL DEFAULT '' COMMENT '所属分类',
  baijing_views INT UNSIGNED NOT NULL DEFAULT 0 COMMENT '浏览量',
  baijing_created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  PRIMARY KEY (baijing_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='图文列表表';
```

执行时间：2026-11-19 14:26

---

## 5. 插入图文列表测试数据（9 条）

```sql
INSERT INTO baijing_gallery (baijing_title, baijing_desc, baijing_image_url, baijing_category, baijing_views) VALUES
('智能芯片的微观世界', '芯片内部的晶体管排列如同城市路网，制程越小，单位面积内可容纳的计算单元越多。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=futuristic%20AI%20chip%20with%20glowing%20blue%20circuit%20lines%20macro%20photography&image_size=landscape_4_3', '硬件', 3200),
('数据中心机房一隅', '成排的机柜与冷通道构成现代算力的物理底座，液冷与余热回收正在成为标配。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=modern%20data%20center%20server%20room%20blue%20led%20lights%20rows%20of%20racks&image_size=landscape_4_3', '基础设施', 2100),
('智能工厂中的机械臂', '机械臂完成重复工序，视觉识别负责质检，产线节拍由算法统一调度。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=robotic%20arm%20working%20on%20smart%20factory%20assembly%20line&image_size=landscape_4_3', '智能制造', 1800),
('低轨卫星与地球', '卫星互联网依靠低轨星座组网，为偏远地区提供低时延的宽带接入能力。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=satellite%20orbiting%20earth%20blue%20atmosphere%20space%20photography&image_size=landscape_4_3', '航天', 2600),
('自动驾驶车辆在城市道路', '激光雷达、毫米波雷达与摄像头多传感器融合，构成车辆的感知系统。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=autonomous%20self%20driving%20car%20with%20sensors%20on%20city%20street&image_size=landscape_4_3', '智能出行', 4100),
('量子计算机低温装置', '稀释制冷机为超导量子比特提供接近绝对零度的工作环境。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=quantum%20computer%20golden%20cryostat%20laboratory%20equipment&image_size=landscape_4_3', '前沿计算', 1500),
('虚拟现实沉浸体验', '高刷新率显示与空间音频让虚拟场景更具临场感，交互方式也在持续演进。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=person%20wearing%20vr%20headset%20in%20neon%20lit%20room&image_size=landscape_4_3', '人机交互', 2300),
('城市中的通信基站', '第五代移动通信基站采用大规模天线阵列，覆盖密度显著提升。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=telecommunication%20tower%20at%20sunset%20with%20city%20skyline&image_size=landscape_4_3', '通信', 1700),
('脑机接口概念图', '通过采集神经信号并将其转化为指令，为运动障碍患者提供新的交互通道。', 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=brain%20computer%20interface%20futuristic%20medical%20technology%20concept&image_size=landscape_4_3', '医疗科技', 2900);
```

执行时间：2026-11-19 14:26

---

## 6. 图片改为本地路径（图片文件存放于 `frontend/images/baijing_gallery_1.jpg` ~ `baijing_gallery_9.jpg`）

```sql
UPDATE baijing_gallery
SET baijing_image_url = CONCAT('/images/baijing_gallery_', baijing_id, '.jpg');
```

执行时间：2026-11-19 14:45

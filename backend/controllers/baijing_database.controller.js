/**
 * 姓名：白静 | 学号：24001010327 | 时间：2026-11-19 | 大模型：DeepSeek-V4.1-Flash
 * 功能：数据库连接测试控制器（MySQL）
 */
const baijing_mysql = require('mysql2/promise');

const baijing_testConnection = async (baijing_req, baijing_res) => {
  const { baijing_username, baijing_password } = baijing_req.body || {};

  if (!baijing_username) {
    return baijing_res.json({ code: 1, msg: '请输入用户名', data: null });
  }

  let baijing_conn = null;

  try {
    baijing_conn = await baijing_mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT || 3306),
      user: baijing_username,
      password: baijing_password || '',
      connectTimeout: 5000
    });

    const [baijing_rows] = await baijing_conn.query('SELECT VERSION() AS baijing_version');
    const baijing_dbList = await baijing_conn.query('SHOW DATABASES');

    baijing_res.json({
      code: 0,
      msg: '数据库连接成功',
      data: {
        baijing_version: baijing_rows[0].baijing_version,
        baijing_host: process.env.DB_HOST || 'localhost',
        baijing_port: Number(process.env.DB_PORT || 3306),
        baijing_user: baijing_username,
        baijing_databases: baijing_dbList[0].map((baijing_row) => baijing_row.Database)
      }
    });
  } catch (baijing_err) {
    baijing_res.json({
      code: 2,
      msg: '数据库连接失败：' + baijing_err.message,
      data: {
        baijing_code: baijing_err.code || null,
        baijing_errno: baijing_err.errno || null
      }
    });
  } finally {
    if (baijing_conn) {
      await baijing_conn.end().catch(() => {});
    }
  }
};

module.exports = { baijing_testConnection };

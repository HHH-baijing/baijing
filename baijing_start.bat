@echo off
chcp 65001 >nul
title 知乎的模仿与制作 - 后端服务
cd /d "%~dp0backend"
echo 正在启动后端服务，端口 8327 ...
echo 启动成功后请访问：http://localhost:8327/
echo 关闭本窗口或按 Ctrl+C 可停止服务。
echo.
node app.js
pause

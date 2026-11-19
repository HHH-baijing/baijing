---
name: github-push
description: Commit the current project and push it to the GitHub repo https://github.com/HHH-baijing/baijing.git over SSH. Use when the user says 提交到 GitHub, push 到远程仓库, 提交 commit 并 push, or asks to publish this repo. Do not use for unrelated git operations such as branch cleanup or history rewriting.
---

# GitHub 提交与推送

将当前工作区的改动提交为一次 commit，并推送到 GitHub 仓库 `https://github.com/HHH-baijing/baijing.git`，使用本机已配置的 SSH 公钥认证。

## 前置检查

1. `git status --short` 查看改动；确认没有把 `node_modules/`、`.env`、构建产物、临时文件加入提交。
2. `git remote -v` 查看远程。若没有 `origin`，执行：
   - `git remote add origin git@github.com:HHH-baijing/baijing.git`
3. 仓库地址统一转成 SSH 形式 `git@github.com:HHH-baijing/baijing.git`，不要用 HTTPS 形式，否则会要求输入账号密码而不是使用公钥。
4. 若 `origin` 已存在但指向 HTTPS 地址，用 `git remote set-url origin git@github.com:HHH-baijing/baijing.git` 改掉。
5. 密钥检查：`~/.ssh` 下应有 `id_ed25519` 与 `id_ed25519.pub`（或 `id_rsa`）。可用 `ssh -T git@github.com` 验证，返回 `successfully authenticated` 即通过；首次连接如提示确认主机指纹，选 yes。

## 提交

1. 只暂存需要提交的文件：按文件名 `git add <文件>`；文件较多且确认无敏感文件时才用 `git add .`。
2. 写有意义的提交信息，说明"为什么改"而不是逐条罗列文件，例如：

   ```
   git commit -m "完成图文列表页并补充数据库与接口文档"
   ```

3. 提交后 `git status --short` 确认工作区干净。

## 推送

1. 第一次推送：`git push -u origin HEAD`（当前分支为 `master` 时即推送 master 并建立追踪关系）。
2. 后续推送：`git push`。
3. 若远端已有内容导致 `non-fast-forward` 被拒绝，**不要使用 `--force`**。先 `git pull --rebase origin master`，解决冲突后再推送；无法自动合并时停下来向用户说明冲突文件。
4. 推送成功后输出远端地址与提交哈希，并提示用户到 `https://github.com/HHH-baijing/baijing` 查看。

## 注意

- 网络或 SSH 失败时，先确认是认证问题（`Permission denied (publickey)`）还是网络问题，再决定是否重试。
- 不要提交 `.env`、私钥、`id_ed25519` 等敏感文件。
- 不要修改全局 git 配置（`user.name`、`user.email`）。

---
title: "Git"
layout: single       
author_profile: true 
collection: misc
permalink: /misc/Git Command
---

# Git Command

*   **配置用户名**: `git config --global user.name "Your Name"`
*   **配置邮箱**: `git config --global user.email "email@example.com"`
*   **初始化仓库**: `git init`
*   **克隆远程仓库**: `git clone <url>`
*   **查看当前状态**: `git status`
*   **添加指定文件到暂存区**: `git add <file>`
*   **添加所有修改到暂存区**: `git add .`
*   **提交更改并附带信息**: `git commit -m "message"`
*   **查看提交历史**: `git log`
*   **查看精简的提交历史**: `git log --oneline`
*   **查看远程仓库地址**: `git remote -v`
*   **添加远程仓库**: `git remote add origin <url>`
*   **拉取远程代码并合并**: `git pull origin master`
*   **推送到远程主分支**: `git push origin master`
*   **创建新分支**: `git branch <branch-name>`
*   **切换分支**: `git checkout <branch-name>`
*   **创建并切换到新分支**: `git checkout -b <branch-name>`
*   **合并分支到当前分支**: `git merge <branch-name>`
*   **撤销工作区的修改 (慎用)**: `git restore <file>`
*   **设置全局 HTTP 代理**: `git config --global http.proxy http://127.0.0.1:7890`
*   **取消全局 HTTP 代理**: `git config --global --unset http.proxy`
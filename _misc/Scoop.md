---
title: "Scoop"
layout: single       
author_profile: true 
collection: misc
permalink: /misc/Scoop Command
---

# Scoop Command

- 安装软件包: `scoop install <package>`
- 更新软件包: `scoop update <package>`
- 卸载软件包: `scoop uninstall <package>`
- 查找软件包: `scoop search <package>`
- 列出已安装的软件包: `scoop list`
- 更新已安装的所有软件包 ：`scoop update --all`
- 更新 Scoop: `scoop update`
- 查看软件包信息: `scoop info <package>`
- 列出所有软件桶: `scoop bucket list`
- 添加一个软件桶: `scoop bucket add <bucket>`
- 移除一个软件桶: `scoop bucket remove <bucket>`
- 清理旧版本软件（保留当前版本: `scoop cleanup *`
- 清除下载缓存: `scoop cache rm <package>`
- 清除所有下载缓存: `scoop cache rm *`
- 一键完成清理旧版本软件和消除所有缓存：`scoop cleanup * && scoop cache rm *`
- 查看可清理的旧版本：`scoop cleanup --dry-run *`
- 查看缓存内容：`scoop cache list`
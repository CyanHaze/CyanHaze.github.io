---
title: "ZJU Living Guide"
layout: single       
author_profile: true 
collection: misc
permalink: /misc/ZJU-Living-Guide
---

# ZJU-Living-Guide

## ZJU-Living-Better

```javascript
# Setup (one-time)

pnpm install
cp .env.example .env

# Edit .env with credentials

# Test setup

node courses.zju/todolist.js

# Start attendance automation

node courses.zju/autosign.js

# Download materials

node courses.zju/materialDown.js

# View quiz answers

node courses.zju/quizanswer.js

# Extract video URLs

node classroom.zju/getVideoURL.js

# Incremental material sync

node courses.zju/materialMaintainer.js

# Archive Webplus document

node webplus.zju/saveDoc.js
```

## Learning at ZJU

- 引导手动登录并自动更新登录凭据和本地会话:`login`
- 管理学在浙大课程信息与章节:`course`
- 管理学在浙大云盘资源:`resource`
- 管理学在浙大活动任务:`assignment`
- 处理学在浙大签到任务:`rollcall`
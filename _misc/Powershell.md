---
title: "Powershell"
layout: single       
author_profile: true 
collection: misc
permalink: /misc/Powershell Command
---

# PowerShell Command

### 📂 File System

*   **列出当前目录文件**: `ls` (或者 `dir`, `gci`)
    *   *PowerShell 原名: `Get-ChildItem`*
*   **进入目录**: `cd <path>`
    *   *PowerShell 原名: `Set-Location`*
*   **返回上一级**: `cd ..`
*   **新建文件夹**: `mkdir <folder_name>`
    *   *PowerShell 原名: `New-Item -ItemType Directory`*
*   **新建空文件**: `ni <filename.txt>` (或者 `echo $null > file.txt`)
    *   *PowerShell 原名: `New-Item`*
*   **删除文件/文件夹**: `rm <path>` (递归删除加 `-r`)
    *   *PowerShell 原名: `Remove-Item`*
*   **复制文件**: `cp <source> <dest>`
    *   *PowerShell 原名: `Copy-Item`*
*   **移动/重命名文件**: `mv <source> <dest>`
    *   *PowerShell 原名: `Move-Item`*
*   **查看文件内容**: `cat <filename>`
    *   *PowerShell 原名: `Get-Content`*
    *   *场景: 查看 log 文件或者读取 key。*
*   **用资源管理器打开当前文件夹 (神器)**: `ii .`
    *   *PowerShell 原名: `Invoke-Item`。场景: 终端敲累了，想弹窗出来看文件。*

### 🔍 Search & Filtering

*   **在文件中查找字符串**: `sls "pattern" <filename>`
    *   *PowerShell 原名: `Select-String`。这是 PS 版的 `grep`。*
    *   *例: `sls "error" log.txt`*
*   **查找命令的位置**: `gcm <command_name>`
    *   *PowerShell 原名: `Get-Command`。这是 PS 版的 `which` 或 `where`。*
    *   *场景: 查看到底调用的是哪个 python.exe。*

### ⚙️ System & Environment (系统与环境)

*   **查看环境变量**: `$env:Path`
    *   *场景: 报错 "command not found" 时，检查你的程序路径有没有在里面。*
*   **临时设置环境变量**: `$env:HTTP_PROXY="http://127.0.0.1:7890"`
    *   *场景: 临时给终端挂梯子下载东西。*
*   **查看历史命令**: `history` (或者 `h`)
*   **清屏**: `clear` (或者 `cls`)
*   **修改执行策略 (必会)**: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
    *   第一次运行 Python 虚拟环境激活脚本 (`activate.ps1`) 报错时，必须执行这个，否则 Windows 默认禁止运行脚本。

### 🌐 Network & Download

*   **下载文件**: `iwr <url> -OutFile <filename>`
    *   *PowerShell 原名: `Invoke-WebRequest`。这是 PS 版的 `wget` 或 `curl`。*
*   **测试端口连通**: `tnc <ip> -port <port>`
    *   *PowerShell 原名: `Test-NetConnection`。*
    *   *场景: 比如 `tnc 192.168.1.5 -port 22`，测试能不能 SSH 连上机器人。*

### 💡 Piping

*   **查看进程并按内存排序**: `ps | sort PM -Descending`
*   **查找占用端口的进程 ID**: `Get-NetTCPConnection -LocalPort 4000 | Select-Object OwningProcess`

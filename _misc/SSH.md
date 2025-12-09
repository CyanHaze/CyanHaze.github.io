---
title: "ssh"
layout: single       
author_profile: true 
collection: misc
permalink: /misc/SSH Command
---

# SSH Command

- 连接到服务器:`ssh username@server_ip`

- 连接到服务器并经过代理:`ssh -R 7890:127.0.0.1:7890 username@server_ip`

  > 如果端口被占用可改为17890

  ```powershell
  # 设置 HTTP 和 HTTPS 代理
  export http_proxy="http://127.0.0.1:7890"
  export https_proxy="http://127.0.0.1:7890"
  
  # 设置 ALL_PROXY (部分软件用这个)
  export all_proxy="socks5://127.0.0.1:7890"
  ```

  验证是否成功

  ```powershell
  curl -I https://www.google.com
  ```

  
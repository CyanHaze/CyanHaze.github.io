---
title: "ROS2"
layout: single       
author_profile: true 
collection: misc
permalink: /misc/ROS2 Command
---

# ROS 2 Command

### 📦 Workspace & Build (工作空间与编译)

*   **编译整个工作空间**: `colcon build`
*   **编译指定功能包**: `colcon build --packages-select <package_name>`
*   **编译并显示日志 (调试用)**: `colcon build --symlink-install`
*   **加载环境变量 (必做)**: `source install/setup.bash` (Linux) 或 `call install/setup.bat` (Windows)
*   **检查依赖是否安装**: `rosdep install -i --from-path src --rosdistro humble -y`

### 🚀 Execution (运行与启动)

*   **运行单个节点**: `ros2 run <package_name> <executable_name>`
    *   *例: `ros2 run demo_nodes_cpp talker`*
*   **运行启动文件 (Launch)**: `ros2 launch <package_name> <launch_file_name>`
    *   *例: `ros2 launch nav2_bringup navigation_launch.py`*
*   **查看当前运行的所有节点**: `ros2 node list`
*   **查看特定节点的详细信息**: `ros2 node info <node_name>`

### 📡 Topics (话题 - 最核心部分)

*   **列出所有话题**: `ros2 topic list`
*   **查看话题数据内容 (实时)**: `ros2 topic echo <topic_name>`
    *   *场景: 检查摄像头有没有数据，或者雷达数据是否正常。*
*   **查看话题发布频率**: `ros2 topic hz <topic_name>`
    *   *场景: 机器人卡顿？检查一下控制指令是不是从 30Hz 掉到了 1Hz。*
*   **查看话题的消息类型**: `ros2 topic type <topic_name>`
*   **查看话题详细信息 (发布者/订阅者数量)**: `ros2 topic info <topic_name>`
*   **手动发布一条指令 (测试用)**: `ros2 topic pub <topic_name> <msg_type> "<args>"`
    *   *例: 给小车发个速度 `ros2 topic pub /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.2}, angular: {z: 0.0}}"`*

### 📨 Interfaces & Services (消息类型与服务)

*   **列出所有服务**: `ros2 service list`
*   **手动调用服务**: `ros2 service call <service_name> <service_type> "<args>"`
    *   *场景: 手动重置仿真环境，或请求机器人归零。*
*   **查看消息结构定义**: `ros2 interface show <msg_type>`
    *   *场景: 忘了 `Twist` 消息里是叫 `x` 还是 `linear.x`？用这个查。*

### 🛠 Tools (调试工具)

*   **启动可视化工具**: `rviz2`
    *   *场景: 具身智能的“眼睛”，用来显示激光雷达点云、摄像头图像、机器人模型 TF。*
*   **录制数据包 (Bag)**: `ros2 bag record -a` (录制所有话题)
*   **录制指定话题**: `ros2 bag record <topic1> <topic2>`
*   **回放数据包**: `ros2 bag play <bag_file>`
*   **查看 TF 坐标变换树**: `ros2 run tf2_tools view_frames`
    *   *场景: 机器人手臂散架了？检查 TF 树看各个关节坐标系连接对不对。*


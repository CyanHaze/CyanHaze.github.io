---
title: "人工智能基础A"
layout: single       
author_profile: true 
collection: notes   
date: 2025-06-19 
permalink: /notes/2025-5
---

# 人工智能基础（A） 


## 题型

> 判断20分（20题） 
>
> 单选20分（20题）
>
> 多选30分（15题） 
>
> 计算15分（3题） 
>
> 问答15分（3题）

<img src="C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618122746857.png" alt="image-20250618122746857" style="zoom:67%;" />

## 第一章：初识人工智能

- 三大学派：

  - **符号主义**：

    - 又称**逻辑主义**。

    - 认为人类认知和思维的基本单元是符号。认知过程是建立在符号表示基础上的一种逻辑运算。

    - 优点：精准，严谨，可解释性和普适性。

      缺点：知识抽象难度大，知识更新复杂，容易产生语义分歧。

  - **联结主义**：

    - 又称**仿生学派**或**生理学派**。

    - 通过模拟人脑的生物神经网络来解释人的认知功能。

    - 提出了人工神经元、基于神经网络的**机器学习**和**深度学习**。

    - 优点：自动训练可预测，自适应变化，实现高维的学习。

      缺点：可解释性差，训练耗费算力，容易发生过拟合，鲁棒性难以提高，容易产生偏见。

    - 成功案例：人脸识别，机器翻译，图像分类，ChatGPT 等。

  - **行为主义**：

    - 强调模拟人的行为，与外界环境互动决策。
    - 以最大化奖励为目标。
    - 例子：强化学习。

- 发展浪潮

  - 三次浪潮两次低谷
  - 第一次浪潮：符号主义时期
  - 第二次浪潮：联结主义时期
  - 第三次浪潮



## 第二章：人工智能系统数据基础

- 人工智能三要素：**算法**、**数据**、**算力**
- 人工智能系统技术架构：
  - 基础设施层：系统设施、软件设施、数据设施
  - 智能技术层
  - 智能应用层
- 冯诺依曼体系架构：存储器、运算器、控制器、输入设备、输出设备



## 第三章：人工智能的应用开发基础

- Python部分（自学）
- 深度学习框架：PyTorch TensorFlow



## 第四章：从问题求解到机器学习

> 算法部分基础主要为上学期的C程，如果希望速成可参见：
>
> [Week 0 Search - CS50's Introduction to Artificial Intelligence with Python](https://cs50.harvard.edu/ai/2024/weeks/0/)
>
> [Week 3 Algorithms - CS50x 2025](https://cs50.harvard.edu/x/2025/weeks/3/)

- 算法方法学：

  - 贪心法：小方案推广至大方案，选择局部最优解
  - 分治法：Divide and Conquer，多以递归形式呈现
  - 回溯法：也叫穷举搜索法，常用递归形式呈现
  - 动态规划法：以空间换时间，将大问题分解为子问题，子问题的解存放

- 搜索算法：

  - 四要素：

    - 初始状态（Initial State）
    - 目标状态（Goal State）
    - 操作（Operators）
    - 路径（Path）

  - 常见算法：

    ![image-20250618130613879](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618130613879.png)

- 机器学习

  - 核心要素：

    - 数据：输入
    - 模型：输出
    - 算法：建模

  - 过程：

    - 训练：学习算法、训练算法
    - 预测
    - 评估：准确率、精确率、召回率、F1分数

  - 分类：

    - 有监督学习：X、Y都已知
      - 分类（Classification）：针对离散标签进行预测，如图像分类
      - 回归（Regression）：预测连续的值，如房价预测
    - 无监督学习：X已知、Y未知，发现数据的内在结构
      - 聚类：将相似数据分组，如客户细分
      - 降维：减少数据维度便于可视化，如主成分分析（PCA）
    - 半监督学习：部分X、Y已知，结合少量标注数据和大量未标注数据学习
      - 降低获取标注数据的成本

    - 强化学习&深度学习

  - 常见模型：

    - 有监督学习：线性回归、逻辑回归、决策树、随机森林、支持向量机（SVM）、K临近算法（K-NN）、神经网络（NN）
    - 无监督学习：K均值聚类（K-Means）、层次聚类、主成分分析（PCA）、异常检测

- 数据处理

  - 数据标准化和归一化：

    - min-max标准化（MinMaxScaler）：映射至$[0,1]$区间
      $$
      x^\prime=\frac{x-x_{min}}{x_{max}-x_{min}}
      $$

    - Z-score标准化（StandardScaler）：使数据满足标准正态分布
      $$
      x^\prime=\frac{x-\bar{X}}{S}
      $$

    - 归一化（Normalizer）：L2归一化
      $$
      x^\prime=\frac{x}{\sqrt{\Sigma^{m}_{j}x_j^2}}
      $$

  - 数据二值化：将数据转化为布尔值，Binarizer

  - 编码：

    - 标签编码：将不连续的数值或文本变量转化成有序数值变量
    - 独热编码：将可能值转化成二值化特征

## 第五章：回归与分类模型

> 具体回归与分类的算法概述不了，请翻阅课本或者相关网课

### 回归模型

- 整体工作流程
  1. 收集数据
  2. 分析数据
  3. 选择回归类型种类
  4. 训练模型
  5. 评估模型
  6. 使用模型预测
  7. 持续改进
- 回归模型分类
  - 按自变量数量：简单回归、多元回归
  - 按因变量数量：单输出回归、多输出回归
  - 按关系性质：线性回归、非线性回归

### 分类模型

- 分类模型分类

  - 按类别数量：
    - 二分类问题：逻辑回归、决策树、支持向量机
    - 多分类问题：决策树、随机森林、多类支持向量机
  - 按标签数量：单标签分类、多标签分类
  - 按类别关系：平坦分类、层次分类

- 线性分类器：定义超平面作为决策边界
  $$
  f(x)=w^tx+\beta
  \\w:权重向量weight
  \\b:偏置项bias
  \\x:输入特征向量
  $$

- 逻辑回归模型：使用$sigmoid$函数将线性函数输出转化为0到1之间概率值
  $$
  Sigmoid:\:\sigma(z)=\frac{1}{1+e^{-z}}
  \\z=w^tx+b
  $$

- 决策树分类模型：

  - 构建流程：
    1. 特征选择：选择输入特征分割来进行节点分割数据
    2. 决策树生成：递归过程
    3. 决策树剪枝：解决过拟合问题



##  第六章：数据的聚类和降维问题

- 数据相似度和距离度量
  - 欧式距离：处理图像分割
  - 曼哈顿距离：对异常值不太敏感
  - 余弦相似度：多用于计算高维稀疏的文本数据

### 聚类分析技术

- K-means算法

  1. 初始化：选择k个初始簇中心：$\mu_1,\mu2,...,\mu_k$

  2. 分配过程：计算每一个数据点$x_i$到每个簇中心的距离
     $$
     d(x_i,\mu_k)=\sqrt{\Sigma_t^{dim}(x_{i,t}-\mu_{k,t})^2}
     $$
     每朵花被分配至离其最近的簇中心对应的簇

  3. 更新过程：重新计算每个簇的中心，新的簇中心是簇中所有点的算术平均值
     $$
     \mu_k=\frac{\Sigma_{i=1}^{n}w_{i,k}x_i}{\Sigma_{i=1}^{n}w_{i,k}}
     $$

### 数据降维技术

- 主成分分析算法（PCA）：寻找数据方差最大的正交方向



## 第七章：深度网络基础组件

> BP算法、梯度下降法和感知机模型 请自行查阅书本（P152起）和相关网课
>
> 推荐李宏毅机器学习与吴恩达深度学习与机器学习（虽然感觉补天不太可能）

![image-20250618155144187](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155144187.png)

- 深度学习基础算法：

  - 拓扑结构：
    - 多个并行的感知机组成网络层
    - 标准深度神经网络由输入层、隐含层和输出层组成
  - 优化器：
    - 梯度下降法是BP算法的核心算法
    - 最初梯度下降法的缺陷有：固定学习率、梯度消失、梯度爆炸、局部最优
  - 预训练-微调

- BP算法：

  ![image-20250618154939401](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618154939401.png)

### 激活函数

- Sigmoid

  $$
  f(x)=\frac{1}{1+e^{-x}}
  $$
  ![image-20250618151527572](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618151527572.png)


- Tanh
  $$
  f(x)=\frac{e^x-e^{-x}}{e^x+e^{-x}}
  $$
  ![image-20250618151746063](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618151746063.png)

  

- ReLU
  $$
  f(x)=max(0,x)
  $$
  ![image-20250618151832633](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618151832633.png)

- ELU
  $$
  f_i(a_i)=\left\{
  \begin{aligned}
  x\qquad if\enspace x>0\\
  \alpha(e^x-1)\quad \:\:if\:x\leq0
  \end{aligned}
  \right.
  $$
  ![image-20250618152525849](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618152525849.png)

- Softmax
  $$
  S_i=\frac{e^{x_i}}{\Sigma_je^{x_j}}
  $$
  ![image-20250618152636301](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618152636301.png)

### 损失函数

> 因为个人习惯问题，此处$\hat Y$代表真实值

#### 回归损失函数

- 均方误差（mean_squared_error,MSE）
  $$
  MSE=\frac{1}{N}\Sigma^N_{i=1}(Y_i-\hat Y_i)^2
  $$

- 平均绝对误差（mean_absolute_error,MAE）
  $$
  MAE=\frac{1}{N}\Sigma_{i=1}^N|Y_i-\hat Y_i|
  $$

- 平均绝对百分比误差（mean_absolute_percentage_error,MAPE）
  $$
  MAPE=\frac{1}{N}\Sigma_{i=1}^N|\frac{Y_i-\hat Y_i}{\hat Y_i}*100|
  $$

- 均方对数误差（mean_squared_logarithmic_error,MSLE）
  $$
  MSLE=\frac{1}{N}\Sigma_{i=1}^N[log(\hat Y_i+1)-log({Y_i}+1)]^2
  $$
  ⚠：此处教材有误，教材的均方根对数误差为RMSLE，为$\sqrt{MSLE}$

#### 分类损失函数

- 二进制交叉熵（binary_crossentropy）
  $$
  Loss=-\frac{1}{N}\Sigma_{i=1}^N[\hat Y_i*logY_i+(1-\hat Y_i)*log(1-Y_i)]
  $$
  ⚠：此处教材有误

- 多分类交叉熵（categorical_crossentropy）
  $$
  Loss=-\frac{1}{N}\Sigma_{i=1}^N\hat Y_i*logY_i
  $$

### 优化器

- 随机梯度下降法（SGD）

  <img src="C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155000244.png" alt="image-20250618155000244" style="zoom:50%;" />

- 自适应梯度算法（AdaGrad）

  <img src="C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155103064.png" alt="image-20250618155103064" style="zoom:50%;" />



## 第八章：卷积神经网络（CNN）

<img src="C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155518058.png" alt="image-20250618155518058" style="zoom: 33%;" />



![image-20250618155547005](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155547005.png)

![image-20250618155611677](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155611677.png)

![image-20250618155626005](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155626005.png)



## 第九章：循环神经网络（RNN）

![image-20250618155734683](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155734683.png)

![image-20250618155804500](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618155804500.png)

> RNN和CNN不仔细记录了，这种感觉懂的人本来就懂，不懂的人也看不懂（）
>
> 如果原先没学过，我觉得这块复习一个CNN的卷积、池化和展平就好了，具体细节不用深究。





## 第十章：完整的人工智能应用开发实践

### 模型评估与选择

预测正、实际正：TP 真正例

预测负、实际正：FN 假反例

预测正、实际负：FP 假正例

预测负、实际负：TN 真反例

- 准确率（Accuracy）
  $$
  准确率=\frac{预测正确的样本数}{样本总数}*100\%
  $$

- 精确率（Precision）
  $$
  精确率=\frac{TP}{TP+FP}*100\%
  $$

- 召回率（Recall）
  $$
  召回率=\frac{TP}{TP+FN}*100\%
  $$

- F1值
  $$
  F1=2*\frac{精确率*召回率}{精确率+召回率}
  $$

- ROC曲线：面积越大，性能越好

## 第十一章：自然语言处理中的模型

![image-20250618160317467](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618160317467.png)

![image-20250618160329167](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618160329167.png)

![image-20250618160350697](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618160350697.png)

### 文本相似度

- 余弦相似度
  $$
  Cosine Similarity(\vec A,\vec B)=\frac {\vec A⋅\vec B}{∥\vec A∥∥\vec B∥}
  $$

- 

- 欧氏距离
  $$
  d=\sqrt{\Sigma_{i=1}^n(x_i-y_i)^2}
  $$

- 

- Jaccard相似度
  $$
  Jaccard Similarity(\vec A,\vec B)&=&\frac {\vec A \cap \vec B}{\vec A \cup \vec B}
  \\&=&\frac{\vec A·\vec B }{\vec A·\vec A+\vec B·\vec B-\vec A·\vec B}
  $$

- 曼哈顿距离
  $$
  d=\sqrt{\Sigma_{i=1}^n|x_i-y_i|}
  $$

### Transformer

![image-20250618161345712](C:\Users\霭溪\AppData\Roaming\Typora\typora-user-images\image-20250618161345712.png)


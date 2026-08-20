# 多维度人格测评

## 推荐用法（单文件）

下载 **`personality-test.html`** 这一个文件到电脑任意位置（例如桌面），双击即可离线使用。不需要 `css/`、`js/` 或联网。

> Cloud Agent 写的是云端虚拟机，**不会自动出现在你本机桌面**。请从本仓库下载 `personality-test.html`，或下载 `cursor-personality-test.zip` 后取出该文件。

GitHub 直链（当前分支）：
https://github.com/Mrhaoq/memorandum/blob/cursor/personality-test-fc20/cursor/personality-test.html

## 功能

- **五档 Likert 量表**（1 非常不符合 → 5 非常符合）
- **7 大测评模块**（共约 220 题）：
  - M1 16型人格 (MBTI)
  - M2 Step II 式子维度
  - M3 A/T 自信型 vs 动荡型
  - M4 大五人格 (OCEAN)
  - M5 九型人格
  - M6 DISC 行为风格
  - M7 霍兰德 RIASEC 职业兴趣
- **快速版**：仅 M1 + M4（约 115 题）
- **本地保存**：自动断点续答（localStorage）
- **JSON 备份**：导出/导入答题进度与结果
- **PDF 下载**：题本 PDF、结果报告 PDF（浏览器打印）

## 使用方法

1. 用 Chrome / Edge / Firefox 打开 `personality-test.html`
2. 选择完整版或快速版，点击「开始测试」
3. 完成后查看多维结果报告；可打印另存为 PDF

## 文件说明

```
cursor/
├── personality-test.html  # 推荐：全部内嵌的单文件（双击即可）
├── index.html             # 多文件版入口（需同目录 css/ js/）
├── README.md
├── css/style.css
└── js/                    # 题目、计分、存储、图表（改题时用）
```

多文件版仅便于维护题目源码；日常使用请只用 `personality-test.html`。

## 免责声明

本测评为**自研倾向工具**，基于 Jung 类型理论等公开心理学框架编写，**非 MBTI® 官方产品**。结果仅供自我探索参考，不能替代专业心理咨询或临床诊断。

## 预计时长

- 完整版：90–120 分钟
- 快速版：45–60 分钟

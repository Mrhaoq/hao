---
name: add-site-feature
description: Adds a new tool page under the personal site on the same Cloudflare Pages domain. Use when adding a feature, tool, 功能, 抽奖, 记事本, 留言, lottery, notes, feedback, or when the user wants to extend the site catalog.
---

# 加一个站点功能

先读仓库根目录 `改进计划.md`（第 5、9、10 节）。不要另开域名或新的 Pages 项目。

## 判断类型

| 类型 | 何时 | 后端 |
| --- | --- | --- |
| A 打开即用 | 测评、抽奖 | 否 |
| B 本人私有可丢 | 单机笔记 | 否，必须能导出 |
| C 本人要跨设备 | 同步笔记 | 后做 D1 |
| D 公共可见 | 留言 | 必须 D1 + 审核 + Turnstile |
| E 调外部 API | AI | Worker，密钥不进前端 |

## 必须做完

1. 定英文短 `id`，路径 `/<id>/`
2. 建独立目录（html/js/css），不要改 `personality-test.html` 来塞功能
3. `localStorage` 只用 `hao.<id>.v1`
4. 在 `catalog` 加一条：id, name, aliases, tags, summary, path, status, data
5. 顶栏能回 `/`；该页 URL 不经首页也能打开
6. 手机宽度可点、可返回
7. 部署同一项目：`wrangler pages deploy <目录> --project-name=cursor-personality-test --branch=main`

## 禁止

- 首页写死卡片、不走 catalog
- 两个功能共用存储键
- 无验证码的公开写入
- 为新功能再创建一个托管站点

---
name: add-site-feature
description: Adds a new tool page under the personal site on the same Cloudflare Pages domain. Use when adding a feature, tool, 功能, 抽奖, 记事本, 留言, lottery, notes, feedback, or when the user wants to extend the site catalog.
---

# 加一个站点功能

先读 `cursor/改进计划.md`（第 0、5、9、10 节）。不要另开域名或新的 Pages 项目。

## 判断类型

| 类型 | 何时 | 后端 |
| --- | --- | --- |
| A 打开即用 | 测评、抽奖 | 否 |
| B 本人私有可丢 | 单机笔记 | 否，必须能导出 |
| C 本人要跨设备 | 同步笔记 | 后做 Node + Prisma |
| D 公共可见 | 留言 | 必须库 + 审核 + Turnstile |
| E 调外部 API | AI | Node 路由，密钥不进前端 |

一期后端只有健康检查，不要顺手写业务接口。

## 必须做完

1. 定英文短 `id`，路径 `/<id>/`
2. 建 `apps/web/src/<id>/` 与 `apps/web/<id>/index.html`，在 `apps/web/vite.config.ts` 的 `rollupOptions.input` 登记
3. `localStorage` 只用 `hao.<id>.v1`
4. 在 `apps/web/src/shared/catalog/index.ts` 加一条：id, name, aliases, tags, summary, path, status, data
5. 顶栏用 `shared/shell/Shell.tsx` 能回 `/`；该页 URL 不经首页也能打开
6. 手机宽度可点、可返回
7. 写 `apps/web/src/<id>/功能文档.md`（按当前源码写真实行为，不是设计稿；必须含「可拓展」）
8. 部署：`npx pnpm@9.15.0 --filter @hao/web build` 后 `npx wrangler pages deploy apps/web/dist --project-name=cursor-personality-test --branch=main`

缺第 7 步不算做完。范例：`apps/web/src/valorant-sens/功能文档.md`。

## 禁止

- 首页写死卡片、不走 catalog
- 两个功能共用存储键
- 无验证码的公开写入
- 为新功能再创建一个托管站点
- 只交代码、不交 `功能文档.md`，或「可拓展」空着
- 把新功能做成 React Router 子路由而不是独立入口

## 功能文档模板

文件：`apps/web/src/<id>/功能文档.md`。按源码写，实现变了就改文档。

```markdown
# <名称> — 功能文档

路径：`/<id>/`
类型：A/B/C/D/E（及存储/后端一句话）
存储键：`hao.<id>.v1`（无存储则写「无」）

## 这是什么
## 在站点中的位置
## 页面与主路径
## 存储
## 限制与已知缺口
## 可拓展
```

「可拓展」不能省略，至少写清下面四块（没有就写「无」）：

1. **未做的模式/入口**：现在故意没做、以后可以加的功能点
2. **可插的存储字段**：在现有 `hao.<id>.v1` 对象上可加的键；**不要改键名、不要和其他功能共用**
3. **不要动的公共约定**：catalog / shell / 存储键 / 路径 / 类型边界
4. **建议的下一步**：按优先级列 1～3 条，写「为什么现在没做」

中间章节（算法、关卡、公式等）按功能需要增减，不要为了凑结构空写。

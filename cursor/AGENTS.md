# Agent 说明

本仓库的个人站是**单域名**站点（Cloudflare Pages：`cursor-personality-test`）。

源码不在旧的 `cursor/*.html`，而在：

- 前端：`apps/web`（Vite + React + TS 多入口 MPA）
- 后端骨架：`apps/api`（Fastify + TS + Prisma，一期仅 `/health`）
- 反代：`functions/api/[[path]].ts`

请先读：

- 完整计划与纠偏：`cursor/改进计划.md`
- 每次对话红线：`.cursor/rules/personal-site.mdc`
- 加新功能时走技能：`.cursor/skills/add-site-feature/SKILL.md`

线上：https://cursor-personality-test.pages.dev/

旧静态站快照：`cursor/legacy/`

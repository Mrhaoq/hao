# Hao API（骨架）

Fastify + TypeScript + Prisma 占位。一期只有健康检查，没有业务接口。

```text
npx pnpm@9.15.0 --filter @hao/api dev
```

- `GET /health`
- `GET /api/health`

公网由 Cloudflare Pages Function `functions/api/[[path]].ts` 转发。未配置 `API_ORIGIN` 时返回 503 JSON，不暴露独立 API 域名。

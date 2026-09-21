import Fastify from 'fastify';

const port = Number(process.env.API_PORT || 8787);
const host = process.env.API_HOST || '0.0.0.0';

const app = Fastify({ logger: true });

app.get('/health', async () => ({
  ok: true,
  service: 'hao-api',
  phase: 'reserved'
}));

app.get('/api/health', async () => ({
  ok: true,
  service: 'hao-api',
  phase: 'reserved'
}));

app.listen({ port, host }).catch((err) => {
  app.log.error(err);
  process.exit(1);
});

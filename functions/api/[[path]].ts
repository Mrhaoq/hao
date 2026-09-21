type PagesContext = {
  request: Request;
  env: { API_ORIGIN?: string };
};

export const onRequest = async (context: PagesContext) => {
  const origin = context.env.API_ORIGIN?.replace(/\/$/, '');
  if (!origin) {
    return new Response(
      JSON.stringify({
        ok: false,
        error: 'api_not_configured',
        message: '一期仅预留 Node 后端。配置 Pages 环境变量 API_ORIGIN 后才会转发 /api/*。'
      }),
      {
        status: 503,
        headers: { 'content-type': 'application/json; charset=utf-8' }
      }
    );
  }

  const incoming = new URL(context.request.url);
  const target = new URL(incoming.pathname + incoming.search, origin);
  const headers = new Headers(context.request.headers);
  headers.delete('host');

  return fetch(
    new Request(target.toString(), {
      method: context.request.method,
      headers,
      body: context.request.body,
      redirect: 'manual'
    })
  );
};

export type ApiErrorBody = {
  ok: false;
  error: string;
  message: string;
};

export type HealthResponse = {
  ok: true;
  service: string;
  phase: string;
};

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(path, {
    ...init,
    headers: {
      accept: 'application/json',
      ...(init?.headers || {})
    }
  });
  const data = (await res.json().catch(() => null)) as T | ApiErrorBody | null;
  if (!res.ok) {
    const err = data as ApiErrorBody | null;
    throw new Error(err?.message || `请求失败 ${res.status}`);
  }
  return data as T;
}

/** 一期无业务接口。后续留言等只通过 /api/* 调用，便于换 Node 实现。 */
export const api = {
  health: () => requestJson<HealthResponse>('/api/health')
};

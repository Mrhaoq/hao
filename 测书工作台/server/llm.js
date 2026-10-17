import { DEFAULT_API_BASE, DEFAULT_MODEL, RATE_INPUT_MISS, RATE_OUTPUT } from "./playbook.js";
import { parseMilestoneLine } from "./setup-text.js";

export class LLMError extends Error {
  constructor(message, { status = 0, aborted = false } = {}) {
    super(message);
    this.upstreamStatus = status;
    this.aborted = aborted;
  }
}

export function estimateCost(inputTokens, outputTokens) {
  return (inputTokens * RATE_INPUT_MISS + outputTokens * RATE_OUTPUT) / 1_000_000;
}

export async function complete({ apiKey, apiBase, model, system, user, signal, maxTokens, allowEmpty = false }) {
  if (!apiKey) throw new LLMError("还没有配置 API Key。打开「设置」填入后才能生成。");
  const base = (apiBase || DEFAULT_API_BASE).replace(/\/$/, "");
  const timeout = AbortSignal.timeout(180000);
  const combined = signal ? AbortSignal.any([timeout, signal]) : timeout;
  const payload = {
    model: model || DEFAULT_MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.85,
  };
  if (maxTokens) payload.max_tokens = maxTokens;
  let res;
  let text;
  try {
    res = await fetch(`${base}/v1/chat/completions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: combined,
    });
    text = await res.text();
  } catch (err) {
    if (signal?.aborted) throw new LLMError("请求已取消。", { aborted: true });
    if (timeout.aborted) throw new LLMError("模型 180 秒内没有返回，已超时。");
    throw new LLMError(`调用模型失败：${err.message}`);
  }
  if (!res.ok) throw new LLMError(`模型接口 ${res.status}：${text.slice(0, 500)}`, { status: res.status });
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new LLMError("模型返回不是 JSON。");
  }
  const content = data?.choices?.[0]?.message?.content?.trim() || "";
  if (!content && !allowEmpty) throw new LLMError("模型返回空内容。");
  const inp = data.usage?.prompt_tokens || Math.max(system.length + user.length, 1);
  const out = data.usage?.completion_tokens || Math.max(content.length, 1);
  return {
    content,
    input_tokens: inp,
    output_tokens: out,
    cost_yuan: Number(estimateCost(inp, out).toFixed(6)),
    model: model || DEFAULT_MODEL,
  };
}

export function parseChapter(raw) {
  const lines = String(raw).replaceAll("\r\n", "\n").split("\n");
  const first = (lines[0] || "").trim();
  const prefixes = ["标题：", "标题:", "题目：", "题目:"];
  for (const prefix of prefixes) {
    if (first.startsWith(prefix)) {
      return [first.slice(prefix.length).trim() || "未命名章节", lines.slice(1).join("\n").trim()];
    }
  }
  if (first.startsWith("# ")) {
    return [first.slice(2).trim() || "未命名章节", lines.slice(1).join("\n").trim()];
  }
  return ["未命名章节", String(raw).trim()];
}

export function parseBeats(raw) {
  const stages = {};
  let current = null;
  for (const line of String(raw).replaceAll("\r\n", "\n").split("\n")) {
    const stripped = line.trim();
    if (stripped.toUpperCase().startsWith("STAGE:")) {
      const key = stripped.split(":").slice(1).join(":").trim().toLowerCase();
      current = { stage: key, title: "", summary: "", milestones: [] };
      stages[key] = current;
    } else if (current && stripped.toUpperCase().startsWith("MILESTONE:")) {
      const milestone = parseMilestoneLine(stripped.slice(10));
      if (milestone) current.milestones.push(milestone);
    } else if (current && stripped.toUpperCase().startsWith("TITLE:")) {
      current.title = stripped.split(":").slice(1).join(":").trim();
    } else if (current && stripped.toUpperCase().startsWith("SUMMARY:")) {
      current.summary = stripped.split(":").slice(1).join(":").trim();
    } else if (current && current.summary && stripped) {
      current.summary += `\n${stripped}`;
    }
  }
  return ["promise", "buildup", "payoff", "pressure", "lock", "volume_end"]
    .filter((k) => stages[k])
    .map((k) => stages[k]);
}

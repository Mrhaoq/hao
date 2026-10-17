import { REQUEST_LOG_MAX } from "./playbook.js";
import * as store from "./store.js";

const FIELDS = [
  "at",
  "book_id",
  "book_title",
  "action",
  "model",
  "api_base",
  "ms",
  "input_tokens",
  "output_tokens",
  "cost_yuan",
  "ok",
  "status",
  "error",
];

function scrub(text) {
  return String(text || "")
    .replace(/Bearer\s+[\w.\-]+/gi, "Bearer ***")
    .replace(/sk-[\w\-]{6,}/g, "sk-***")
    .slice(0, 300);
}

export function sanitizeEntry(entry) {
  const row = {};
  for (const key of FIELDS) if (entry[key] !== undefined) row[key] = entry[key];
  if (row.error) row.error = scrub(row.error);
  if (row.api_base) row.api_base = String(row.api_base).replace(/\/\/[^/@]*@/, "//");
  return row;
}

export function logRequest(entry) {
  return store.appendRequestLog(sanitizeEntry({ at: new Date().toISOString(), ...entry }), REQUEST_LOG_MAX);
}

export function listRequests({ bookId } = {}) {
  const all = store.readRequestLog();
  const items = (bookId ? all.filter((row) => Number(row.book_id) === Number(bookId)) : all).slice().reverse();
  const total = items.reduce((sum, row) => sum + (Number(row.cost_yuan) || 0), 0);
  return {
    items,
    count: items.length,
    ok_count: items.filter((row) => row.ok).length,
    total_cost_yuan: Number(total.toFixed(6)),
    max: REQUEST_LOG_MAX,
  };
}

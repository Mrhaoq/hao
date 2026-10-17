import { REQUEST_LOG_MAX } from "./playbook.js";
import { listRequests, logRequest, sanitizeEntry } from "./requests.js";

function assert(cond, label) {
  if (!cond) throw new Error(label);
}

const clean = sanitizeEntry({
  action: "生成大纲",
  error: "模型接口 401：Bearer sk-abcdef1234567890 无效",
  api_key: "sk-secret",
  user: "整段提示词",
});
assert(!("api_key" in clean) && !("user" in clean), "drops key and prompt");
assert(!clean.error.includes("sk-abcdef") && clean.error.includes("***"), "scrubs key in error");

for (let i = 0; i < REQUEST_LOG_MAX + 5; i += 1) {
  logRequest({ book_id: i % 2 ? 1 : 2, action: "测试", ms: 10, cost_yuan: 0.001, ok: true, status: 200 });
}
const all = listRequests();
assert(all.count === REQUEST_LOG_MAX, "capped at max");
const one = listRequests({ bookId: 1 });
assert(one.items.every((row) => row.book_id === 1), "filter by book");
assert(one.total_cost_yuan > 0, "sums cost");

console.log("ok");

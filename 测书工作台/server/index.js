import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import { complete, LLMError, parseBeats, parseChapter } from "./llm.js";
import {
  DEFAULT_API_BASE,
  DEFAULT_MODEL,
  MAX_DRAFTING,
  STAGES,
  countWords,
  evaluate,
  pitchLengthMessage,
  publicRules,
  stageForWords,
} from "./playbook.js";
import * as store from "./store.js";
import { acceptPaste, assertCanWriteChapter, buildPrompt, chapterGoal, decideStep, forceMemory, pickCards } from "./paste.js";
import { cardIds, currentPlan } from "./prompt.js";
import { chapterPrompt, splitChapterCards } from "./setup-text.js";
import { importManuscripts, openBookFolder, writeBookFiles } from "./files.js";
import {
  addMilestone,
  confirmCards,
  continueBook,
  deleteMilestone,
  patchChapter,
  patchMilestone,
  recordDecision,
  rejectCards,
} from "./book-ops.js";
import { listRequests, logRequest } from "./requests.js";

const ROOT = path.resolve(import.meta.dirname, "..");
const STATIC = path.join(ROOT, "static");
const PORT = Number(process.env.CESHU_PORT || 8787);
const HOST = process.env.CESHU_HOST || "127.0.0.1";

loadDotEnv();

const SYSTEM = `你是中文长篇网文的章稿写手，服务「测书首轮 30 万字裁决」，不是完本代写。
硬规则：
- 只写当前这一章，1800～2500 字，不要总结全书，不要预告后面几十章。
- 文风口语、场面清楚、每章有推进和章末钩子。
- 人名、称谓、已发生事实必须服从注入的卡片和前文摘要，不得发明与卡片冲突的新核心设定。
- 30 万字前核心事件必须能闭环：不要把真正兑现拖到「以后再说」。
- 不要输出写作说明、标题之外的元信息。不要用 markdown 标题堆设定。`;

function loadDotEnv() {
  const envPath = path.join(ROOT, ".env");
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i < 1) continue;
    const key = trimmed.slice(0, i).trim();
    let value = trimmed.slice(i + 1).trim();
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }
    if (process.env[key] == null) process.env[key] = value;
  }
}

function send(res, status, body, headers = {}) {
  const data = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": typeof body === "string" ? "text/plain; charset=utf-8" : "application/json; charset=utf-8",
    ...headers,
  });
  res.end(data);
}

function fail(res, status, message, extra = {}) {
  send(res, status, { detail: message, ...extra });
}

function credentials() {
  const saved = store.getSettings();
  return {
    api_key: saved.api_key || process.env.CESHU_API_KEY || "",
    api_base: saved.api_base || process.env.CESHU_API_BASE || DEFAULT_API_BASE,
    model: saved.model || process.env.CESHU_MODEL || DEFAULT_MODEL,
  };
}

function maskKey(key) {
  if (!key) return "";
  if (key.length <= 4) return "已配置";
  return `••••${key.slice(-4)}`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString("utf8");
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (err) {
        reject(err);
      }
    });
    req.on("error", reject);
  });
}

function requireBook(id) {
  const book = store.getBook(id);
  if (!book) {
    const err = new Error("找不到这本书。");
    err.status = 404;
    throw err;
  }
  return book;
}

function assertCanDraftNew() {
  if (store.draftingCount() >= MAX_DRAFTING) {
    const err = new Error(`同时在产不能超过 ${MAX_DRAFTING} 本。先把观察中的书裁决掉，或停掉冷门书。`);
    err.status = 409;
    throw err;
  }
}

function assertCostRoom(book) {
  if (book.api_cost_yuan >= book.cost_cap_yuan) {
    const err = new Error("API 费用已到本书上限，停止调用模型。");
    err.status = 409;
    throw err;
  }
}

/** Calls the model, logs the request and returns the result plus display meta. */
async function callModel({ book, action, system, user, signal, maxTokens, allowEmpty }) {
  const creds = credentials();
  const meta = { model: creds.model, api_base: creds.api_base };
  if (!creds.api_key) {
    const err = new Error("还没有配置 API Key。打开「设置 API」填入后再试。");
    err.status = 400;
    throw err;
  }
  const started = Date.now();
  const base = { book_id: book?.id ?? null, book_title: book?.title || "", action, ...meta };
  try {
    const result = await complete({ ...mapCreds(creds), system, user, signal, maxTokens, allowEmpty });
    const done = {
      ...meta,
      ms: Date.now() - started,
      input_tokens: result.input_tokens,
      output_tokens: result.output_tokens,
      cost_yuan: result.cost_yuan,
    };
    logRequest({ ...base, ...done, ok: true, status: 200 });
    return { result, meta: done };
  } catch (err) {
    const ms = Date.now() - started;
    logRequest({
      ...base,
      ms,
      ok: false,
      status: err.upstreamStatus || 0,
      error: err.aborted ? "已取消" : err.message,
    });
    err.meta = { ...meta, ms };
    throw err;
  }
}

function idsFrom(body) {
  return {
    character_ids: body.character_ids || [],
    world_ids: body.world_ids || [],
    foreshadow_ids: body.foreshadow_ids || [],
    relation_ids: body.relation_ids || [],
    place_ids: body.place_ids || [],
    item_ids: body.item_ids || [],
  };
}

function mime(file) {
  if (file.endsWith(".js")) return "text/javascript; charset=utf-8";
  if (file.endsWith(".css")) return "text/css; charset=utf-8";
  if (file.endsWith(".html")) return "text/html; charset=utf-8";
  if (file.endsWith(".svg")) return "image/svg+xml";
  return "application/octet-stream";
}

function serveStatic(res, urlPath) {
  const rel = urlPath === "/" ? "/index.html" : urlPath.replace(/^\/static/, "") || "/index.html";
  const file = path.normalize(path.join(STATIC, rel));
  if (!file.startsWith(STATIC)) return fail(res, 403, "forbidden");
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) return false;
  res.writeHead(200, { "Content-Type": mime(file) });
  fs.createReadStream(file).pipe(res);
  return true;
}

async function handle(req, res) {
  const url = new URL(req.url, `http://${HOST}:${PORT}`);
  const { pathname } = url;
  const method = req.method || "GET";

  if (method === "GET" && (pathname === "/" || pathname.startsWith("/static/"))) {
    if (serveStatic(res, pathname === "/" ? "/" : pathname)) return;
    return fail(res, 404, "not found");
  }

  const bookMatch = pathname.match(/^\/api\/books\/(\d+)(?:\/([a-z-]+)(?:\/(\d+))?)?$/);
  const controller = new AbortController();
  res.on("close", () => {
    if (!res.writableFinished) controller.abort();
  });
  let body = {};
  if (method !== "GET" && method !== "DELETE") {
    try {
      body = await readBody(req);
    } catch {
      return fail(res, 400, "JSON 无法解析。");
    }
  }

  try {
    if (method === "GET" && pathname === "/api/playbook") {
      return send(res, 200, { ...publicRules(), drafting_now: store.draftingCount() });
    }
    if (method === "GET" && pathname === "/api/settings") {
      const creds = credentials();
      return send(res, 200, {
        api_key_set: Boolean(creds.api_key),
        api_key_masked: maskKey(creds.api_key),
        api_base: creds.api_base,
        model: creds.model,
      });
    }
    if (method === "POST" && pathname === "/api/settings") {
      const patch = {};
      if (body.api_key != null) patch.api_key = String(body.api_key).trim();
      if (body.api_base != null) patch.api_base = String(body.api_base).trim();
      if (body.model != null) patch.model = String(body.model).trim();
      store.setSettings(patch);
      const creds = credentials();
      return send(res, 200, {
        api_key_set: Boolean(creds.api_key),
        api_key_masked: maskKey(creds.api_key),
        api_base: creds.api_base,
        model: creds.model,
      });
    }
    if (method === "POST" && pathname === "/api/settings/test") {
      const { result, meta } = await callModel({
        book: null,
        action: "测试连接",
        system: "你是连通性测试。",
        user: "只回复两个字母：ok",
        signal: controller.signal,
        maxTokens: 32,
        allowEmpty: true,
      });
      return send(res, 200, { ok: true, reply: result.content.slice(0, 40) || "（接口已响应，内容为空）", meta });
    }
    if (method === "GET" && pathname === "/api/requests") {
      return send(res, 200, listRequests({ bookId: url.searchParams.get("book_id") || null }));
    }
    if (method === "GET" && pathname === "/api/books") {
      return send(res, 200, {
        books: store.listBooks(),
        drafting_now: store.draftingCount(),
        max_drafting: MAX_DRAFTING,
      });
    }
    if (method === "POST" && pathname === "/api/books") {
      if (!String(body.title || "").trim()) return fail(res, 400, "书名不能空。");
      const pitchErr = pitchLengthMessage(body.pitch);
      if (pitchErr) return fail(res, 400, pitchErr);
      return send(res, 200, store.createBook(body));
    }

    if (bookMatch) {
      const bookId = Number(bookMatch[1]);
      const action = bookMatch[2];
      const itemId = bookMatch[3] ? Number(bookMatch[3]) : null;
      const book = requireBook(bookId);

      if (method === "GET" && !action) {
        const plan = currentPlan(book);
        return send(res, 200, {
          ...book,
          evaluation: evaluate(book.word_count, book.metrics),
          stage: stageForWords(book.word_count),
          plan: { kind: plan.kind, key: plan.key, label: plan.label, closing: plan.closing },
        });
      }
      if (method === "PATCH" && !action) {
        if ((body.status === "drafting" || body.status === "closing") && book.status !== body.status) {
          if (store.draftingCount(book.id) >= MAX_DRAFTING) {
            return fail(res, 409, `在产已满 ${MAX_DRAFTING} 本。`);
          }
          if ((book.status === "observing" || book.status === "watch") && body.status === "drafting") {
            return fail(res, 409, "观察中的书不能改回在产。要加更，先按数据裁决为「继续」。");
          }
        }
        if (body.pitch != null) {
          const pitchErr = pitchLengthMessage(body.pitch, { required: true });
          if (pitchErr) return fail(res, 400, pitchErr);
        }
        const allowed = ["title", "genre", "pitch", "direction", "status", "word_cap", "cost_cap_yuan", "decision_note"];
        const fields = {};
        for (const key of allowed) if (body[key] != null) fields[key] = body[key];
        const updated = store.updateBook(bookId, fields);
        if (body.pitch != null || body.title != null || body.genre != null || body.direction != null) {
          writeBookFiles(updated);
        }
        return send(res, 200, updated);
      }
      if (method === "DELETE" && !action) {
        store.deleteBook(bookId);
        return send(res, 200, { ok: true });
      }
      if (method === "GET" && action === "export") {
        const parts = [book.title, book.pitch || "", ""];
        for (const ch of book.chapters) {
          parts.push(`第${ch.number}章 ${ch.title || ""}`, ch.body || "", "");
        }
        return send(res, 200, parts.join("\n"), {
          "Content-Type": "text/plain; charset=utf-8",
          "Content-Disposition": `attachment; filename*=UTF-8''${encodeURIComponent(`${book.title}.txt`)}`,
        });
      }

      const childMap = {
        characters: "characters",
        world: "world_entries",
        foreshadows: "foreshadows",
        relations: "relations",
        places: "places",
        items: "items",
        beats: "beats",
        chapters: "chapters",
        metrics: "metrics",
      };

      if (action === "chapters" && itemId && method === "PATCH") {
        const { row, promoted } = patchChapter(bookId, itemId, body);
        store.maybeObserve(bookId);
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, { ...row, promoted });
      }
      if (action === "milestones" && method === "POST") {
        const row = addMilestone(bookId, body);
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, row);
      }
      if (action === "milestones" && itemId && method === "PATCH") {
        const row = patchMilestone(bookId, itemId, body);
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, row);
      }
      if (action === "milestones" && itemId && method === "DELETE") {
        deleteMilestone(bookId, itemId);
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, { ok: true });
      }
      if (action === "pending-confirm" && method === "POST") {
        const count = confirmCards(bookId, body.all ? "all" : body.ids || []);
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, { confirmed: count, book: store.getBook(bookId) });
      }
      if (action === "pending-reject" && method === "POST") {
        const count = rejectCards(bookId, body.all ? "all" : body.ids || []);
        return send(res, 200, { rejected: count, book: store.getBook(bookId) });
      }
      if (["relations", "places", "items"].includes(action) && method === "POST") {
        const row = store.addChild(bookId, action, {
          name: body.name || "新卡片",
          card: body.card || "",
        });
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, row);
      }

      if (action && childMap[action] && itemId && method === "PATCH") {
        const key = childMap[action];
        const row = store.patchChild(bookId, key, itemId, body);
        if (!row) return fail(res, 404, "找不到这条记录。");
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, row);
      }
      if (action && childMap[action] && itemId && method === "DELETE") {
        store.deleteChild(bookId, childMap[action], itemId);
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, { ok: true });
      }
      if (action === "characters" && method === "POST") {
        return send(res, 200, store.addChild(bookId, "characters", {
          name: body.name || "新人物",
          role: body.role || "",
          card: body.card || "",
          tags: body.tags || "",
        }));
      }
      if (action === "world" && method === "POST") {
        return send(res, 200, store.addChild(bookId, "world_entries", {
          name: body.name || "新规则",
          card: body.card || "",
        }));
      }
      if (action === "foreshadows" && method === "POST") {
        return send(res, 200, store.addChild(bookId, "foreshadows", {
          setup: body.setup || "新伏笔",
          payoff_at: body.payoff_at || "",
          status: body.status || "open",
          note: body.note || "",
        }));
      }
      if (action === "chapters" && method === "POST") {
        const number = (book.chapters.at(-1)?.number || 0) + 1;
        const words = countWords(body.body);
        if (book.word_count + words > book.word_cap && words) {
          return fail(res, 409, "加上这一章会超过本卷字数上限。");
        }
        const row = store.addChild(bookId, "chapters", {
          number,
          title: body.title || "",
          goal: body.goal || "",
          stage: currentPlan(book).label,
          body: body.body || "",
          digest: "",
          dirty: false,
          card_suggestions: [],
          word_count: words,
          accepted: Boolean(body.accepted),
          ...idsFrom(body),
          created_at: new Date().toISOString(),
        });
        store.maybeObserve(bookId);
        return send(res, 200, row);
      }
      if (action === "metrics" && method === "POST") {
        const metrics = store.upsertMetric(bookId, {
          recorded_on: body.recorded_on,
          readers: body.readers ?? null,
          follow_readers: body.follow_readers ?? null,
          shelves: body.shelves ?? null,
          readthrough_10w: body.readthrough_10w ?? null,
          readthrough_30w: body.readthrough_30w ?? null,
          minutes_per_10k: body.minutes_per_10k ?? null,
          note: body.note || "",
        });
        const fresh = store.getBook(bookId);
        return send(res, 200, { metrics, evaluation: evaluate(fresh.word_count, metrics) });
      }
      if (action === "evaluate" && method === "POST") {
        const result = evaluate(book.word_count, book.metrics);
        store.updateBook(bookId, { recommendation: result.recommendation });
        return send(res, 200, { ...result, book: store.getBook(bookId) });
      }
      if (action === "decision" && method === "POST") {
        const decision = body.decision;
        if (!["continue", "stop", "watch"].includes(decision)) {
          return fail(res, 400, "裁决只能是 continue / stop / watch。");
        }
        if (decision === "continue") {
          if (book.status === "drafting" && book.word_count < book.word_cap) {
            return fail(res, 409, "字数未到本段上限，不能开下一段。");
          }
          if (store.draftingCount(book.id) >= MAX_DRAFTING) {
            return fail(res, 409, `在产已满 ${MAX_DRAFTING} 本，先停掉别的冷门书。`);
          }
          const updated = continueBook(bookId, { words: body.words, note: body.note || "" });
          writeBookFiles(updated);
          return send(res, 200, updated);
        }
        if (decision === "stop") {
          recordDecision(bookId, { decision: "stop", word_count: book.word_count, note: body.note || "" });
          return send(res, 200, store.updateBook(bookId, {
            status: "closing",
            recommendation: "stop",
            close_chapters_done: 0,
            decision_note: body.note || "停更：先用 6～10 章短收尾，再标已停更。",
          }));
        }
        recordDecision(bookId, { decision: "watch", word_count: book.word_count, note: body.note || "" });
        return send(res, 200, store.updateBook(bookId, {
          status: "observing",
          recommendation: "watch",
          decision_note: body.note || "",
        }));
      }
      if (action === "prompt" && method === "POST") {
        if (body.direction != null) store.updateBook(bookId, { direction: String(body.direction) });
        const fresh = store.getBook(bookId);
        return send(res, 200, buildPrompt(fresh, idsFrom(body)));
      }
      if (action === "force-memory" && method === "POST") {
        const prompt = forceMemory(bookId);
        return send(res, 200, prompt);
      }
      if (action === "undo-paste" && method === "POST") {
        const restored = store.undoBook(bookId);
        writeBookFiles(restored);
        return send(res, 200, { book: restored, next: buildPrompt(restored) });
      }
      if (action === "paste" && method === "POST") {
        try {
          const result = acceptPaste(bookId, body.text, {
            step: body.step,
            revision: body.revision,
            ...idsFrom(body),
          });
          writeBookFiles(result.book);
          return send(res, 200, result);
        } catch (err) {
          return fail(res, err.status || 400, err.message || "贴回失败。");
        }
      }
      if (action === "open-folder" && method === "POST") {
        const dir = openBookFolder(book);
        return send(res, 200, { dir });
      }
      if (action === "generate-beats" && method === "POST") {
        const pitchErr = pitchLengthMessage(book.pitch, { required: true });
        if (pitchErr) return fail(res, 400, pitchErr);
        assertCostRoom(book);
        const user = `根据简介，写出测书第一卷的六阶段闭环大纲。每阶段都要能独立停住，每阶段给 1～3 个里程碑。

标题：${book.title || "未定"}
标签：${book.genre || "未定"}
主题：${book.direction || "未定"}
简介：${book.pitch || "（空）"}

请严格输出六段，格式如下（不要其它文字）：
${STAGES.map((item) => `STAGE:${item.key}\nTITLE:${item.title}\nSUMMARY:（300字内，${item.range}必须交付：${item.must}）\nMILESTONE:关键事件｜目标累计字数`).join("\n")}`;
        const { result, meta } = await callModel({
          book,
          action: "生成大纲",
          system: SYSTEM,
          user,
          signal: controller.signal,
        });
        const parsed = parseBeats(result.content);
        if (parsed.length < 6) return fail(res, 502, "模型没有按六阶段格式返回，请再试一次。", { meta });
        const cost = book.api_cost_yuan + result.cost_yuan;
        if (cost > book.cost_cap_yuan) return fail(res, 409, "这次调用会超过费用上限。", { meta });
        store.mutate((data) => {
          const raw = data.books.find((item) => item.id === bookId);
          for (const item of parsed) {
            const beat = raw.beats.find((b) => b.stage === item.stage);
            if (!beat) continue;
            beat.title = item.title || beat.title;
            beat.summary = item.summary;
            if (!(beat.milestones || []).length && item.milestones.length) {
              beat.milestones = item.milestones.map((row) => ({ id: data.childSeq++, ...row }));
            }
          }
          raw.api_cost_yuan = cost;
        });
        const fresh = store.getBook(bookId);
        writeBookFiles(fresh);
        return send(res, 200, { beats: fresh.beats, cost_yuan: result.cost_yuan, meta });
      }
      if (action === "generate-chapter" && method === "POST") {
        assertCanWriteChapter(book);
        assertCostRoom(book);
        const step = decideStep(book);
        if (step !== "chapter") {
          return fail(res, 409, "先完成设定、补齐大纲、续写段大纲、改稿重整，或贴回变化清单/前情，再生成下一章。");
        }
        const cards = pickCards(book, idsFrom(body));
        const plan = currentPlan(book);
        const goal = String(body.goal || "").trim() || chapterGoal(book);
        const user = chapterPrompt(book, goal, cards, plan);
        const { result, meta } = await callModel({
          book,
          action: "生成下一章",
          system: SYSTEM,
          user,
          signal: controller.signal,
        });
        const [title, chapterBody] = parseChapter(result.content);
        const { cards: suggestions } = splitChapterCards(result.content);
        const words = countWords(chapterBody);
        if (book.word_count + words > book.word_cap) {
          return fail(res, 409, "生成结果会超过本段字数上限，未写入。", { meta });
        }
        const cost = book.api_cost_yuan + result.cost_yuan;
        if (cost > book.cost_cap_yuan) return fail(res, 409, "这次调用会超过费用上限，未写入。", { meta });
        const nextNo = (book.chapters.at(-1)?.number || 0) + 1;
        const chapter = store.addChild(bookId, "chapters", {
          number: nextNo,
          title,
          goal,
          stage: plan.label,
          body: chapterBody,
          digest: "",
          dirty: false,
          card_suggestions: suggestions.map((item) => ({ ...item, chapter_number: nextNo })),
          word_count: words,
          accepted: false,
          ...cardIds(cards),
          created_at: new Date().toISOString(),
        });
        store.updateBook(bookId, { api_cost_yuan: cost });
        store.maybeObserve(bookId);
        writeBookFiles(store.getBook(bookId));
        return send(res, 200, {
          chapter,
          cost_yuan: result.cost_yuan,
          meta,
          book: store.getBook(bookId),
        });
      }
    }

    return fail(res, 404, "not found");
  } catch (err) {
    if (err instanceof LLMError) {
      return fail(res, err.aborted ? 499 : 502, err.message, {
        upstream_status: err.upstreamStatus || 0,
        meta: err.meta || null,
      });
    }
    if (err.status) return fail(res, err.status, err.message);
    console.error(err);
    return fail(res, 500, err.message || "服务器错误");
  }
}

function mapCreds(creds) {
  return { apiKey: creds.api_key, apiBase: creds.api_base, model: creds.model };
}

const server = http.createServer((req, res) => {
  handle(req, res).catch((err) => {
    console.error(err);
    if (!res.headersSent) fail(res, 500, err.message || "服务器错误");
  });
});

server.listen(PORT, HOST, () => {
  const imported = importManuscripts();
  console.log(`测书工作台 http://${HOST}:${PORT}`);
  if (imported.length) console.log(`已从文稿导入新书 ${imported.length} 本：${imported.join("、")}`);
});

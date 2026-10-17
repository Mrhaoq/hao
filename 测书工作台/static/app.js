const statusLabel = {
  drafting: "在产",
  candidate: "候选",
  closing: "短收尾",
  observing: "观察中",
  watch: "再观察",
  continue: "已继续",
  stopped: "已停更",
};

let playbook = null;
let books = [];
let current = null;
let tab = "setup";
let lastPrompt = null;
let settingsState = null;
let activeRequest = null;

const INJECT_KINDS = [
  { ids: "character_ids", key: "characters", label: "人物", name: "name" },
  { ids: "world_ids", key: "world_entries", label: "世界", name: "name" },
  { ids: "foreshadow_ids", key: "foreshadows", label: "伏笔", name: "setup" },
  { ids: "relation_ids", key: "relations", label: "关系", name: "name" },
  { ids: "place_ids", key: "places", label: "地点", name: "name" },
  { ids: "item_ids", key: "items", label: "道具", name: "name" },
];

const PENDING_LABEL = {
  character: "人物",
  world: "规则",
  foreshadow: "伏笔",
  relation: "关系",
  place: "地点势力",
  item: "道具",
};

const $ = (id) => document.getElementById(id);

function toast(msg) {
  const el = $("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(toast._t);
  toast._t = setTimeout(() => el.classList.add("hidden"), 4200);
}

async function api(path, options = {}) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (res.status === 204) return null;
  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = { detail: text };
  }
  if (!res.ok) {
    const detail = data && data.detail;
    const err = new Error(typeof detail === "string" ? detail : JSON.stringify(detail || res.status));
    err.status = res.status;
    err.data = data;
    throw err;
  }
  return data;
}

async function loadSettings() {
  settingsState = await api("/api/settings");
  return settingsState;
}

function secs(ms) {
  return `${(Number(ms || 0) / 1000).toFixed(1)} 秒`;
}

function metaLine(meta) {
  if (!meta) return "";
  const parts = [`耗时 ${secs(meta.ms)}`];
  if (meta.input_tokens != null) parts.push(`token ${meta.input_tokens} / ${meta.output_tokens}`);
  if (meta.cost_yuan != null) parts.push(`花费 ¥${Number(meta.cost_yuan).toFixed(4)}`);
  if (meta.model) parts.push(`模型 ${meta.model}`);
  return parts.join(" · ");
}

/** Runs a request that calls the third-party model: key precheck, live timer, cancel, result toast. */
async function runModelRequest({ label, path, body = {}, button }) {
  if (activeRequest) {
    toast("已有一个模型请求在进行，先等它结束或取消。");
    return null;
  }
  const settings = settingsState || (await loadSettings());
  if (!settings.api_key_set) {
    toast("还没有配置 API Key。先点左下角「设置 API」填入，再试。");
    return null;
  }
  const controller = new AbortController();
  const started = Date.now();
  const bar = $("reqBar");
  const tick = () => {
    $("reqText").textContent = `${label}：请求中，已等 ${Math.floor((Date.now() - started) / 1000)} 秒 · 模型 ${settings.model} · 接口 ${settings.api_base}`;
  };
  tick();
  const timer = setInterval(tick, 1000);
  bar.classList.remove("hidden");
  activeRequest = controller;
  if (button) button.disabled = true;
  try {
    const result = await api(path, { method: "POST", body: JSON.stringify(body), signal: controller.signal });
    toast(`${label}完成。${metaLine(result.meta)}`);
    return result;
  } catch (err) {
    if (err.name === "AbortError") {
      toast(`${label}已取消。`);
    } else {
      const upstream = err.data?.upstream_status ? `（接口状态码 ${err.data.upstream_status}）` : "";
      const code = err.status ? `HTTP ${err.status}` : "网络错误";
      toast(`${label}失败：${code}${upstream} ${err.message}`);
    }
    return null;
  } finally {
    clearInterval(timer);
    bar.classList.add("hidden");
    activeRequest = null;
    if (button) button.disabled = false;
  }
}

function pickedIds() {
  const out = {};
  for (const kind of INJECT_KINDS) out[kind.ids] = selectedIds(kind.ids);
  return out;
}

function num(form, name) {
  const v = form[name].value;
  if (v === "" || v == null) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
}

function countWords(text) {
  return Array.from(String(text || "").replace(/\s+/g, "")).length;
}

function refreshPitchCount() {
  const el = $("pitchCount");
  if (!el || !playbook) return;
  const min = playbook.pitch_min_words || 50;
  const max = playbook.pitch_max_words || 70;
  const target = playbook.pitch_target_words || 60;
  const n = countWords($("pitchInput").value);
  el.textContent = `${n} / ${target} 字（${min}～${max}）`;
  el.classList.remove("ok", "bad");
  if (!n) return;
  el.classList.add(n >= min && n <= max ? "ok" : "bad");
}

function wan(n) {
  const v = Number(n || 0);
  if (v < 10000) return `${Math.round(v)} 字`;
  return `${(v / 10000).toFixed(1)} 万`;
}

function pct(n) {
  if (n == null) return "—";
  return `${Number(n).toFixed(1)}%`;
}

async function loadPlaybook() {
  playbook = await api("/api/playbook");
}

async function loadBooks() {
  const data = await api("/api/books");
  books = data.books;
  $("slotHint").textContent = `在产 ${data.drafting_now} / ${data.max_drafting}`;
  renderBookList();
}

function renderBookList() {
  const nav = $("bookList");
  nav.innerHTML = "";
  books.forEach((b) => {
    const btn = document.createElement("button");
    btn.type = "button";
    if (current && current.id === b.id) btn.classList.add("on");
    btn.innerHTML = `<span class="name">${escapeHtml(b.title)}</span>
      <span class="muted">${statusLabel[b.status] || b.status} · ${wan(b.word_count)} / ${wan(b.word_cap)}</span>`;
    btn.onclick = () => openBook(b.id);
    nav.appendChild(btn);
  });
}

function escapeHtml(s) {
  return String(s || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

async function openBook(id) {
  current = await api(`/api/books/${id}`);
  $("emptyState").classList.add("hidden");
  $("requestView").classList.add("hidden");
  $("bookView").classList.remove("hidden");
  renderBookList();
  fillBook();
}

async function showRequests() {
  $("emptyState").classList.add("hidden");
  $("bookView").classList.add("hidden");
  $("requestView").classList.remove("hidden");
  const select = $("reqFilter");
  const keep = select.value;
  select.innerHTML = `<option value="">全部</option>${books
    .map((b) => `<option value="${b.id}">${escapeHtml(b.title)}</option>`)
    .join("")}`;
  select.value = keep;
  const query = select.value ? `?book_id=${select.value}` : "";
  const data = await api(`/api/requests${query}`);
  $("reqSummary").textContent = `共 ${data.count} 条（成功 ${data.ok_count}），合计花费 ¥${Number(data.total_cost_yuan).toFixed(4)}。只保留最近 ${data.max} 条，不记录 Key 和提示词正文。`;
  const tb = $("reqTable");
  tb.innerHTML = "";
  for (const row of data.items) {
    const tr = document.createElement("tr");
    const result = row.ok
      ? `<span class="ok-text">成功</span>`
      : `<span class="bad-text">失败${row.status ? ` ${row.status}` : ""}</span> ${escapeHtml(row.error || "")}`;
    tr.innerHTML = `<td>${escapeHtml(new Date(row.at).toLocaleString())}</td><td>${escapeHtml(row.book_title || "—")}</td>
      <td>${escapeHtml(row.action || "")}</td><td>${escapeHtml(row.model || "")}</td><td>${escapeHtml(row.api_base || "")}</td>
      <td>${secs(row.ms)}</td><td>${row.input_tokens ?? "—"} / ${row.output_tokens ?? "—"}</td>
      <td>${row.cost_yuan != null ? `¥${Number(row.cost_yuan).toFixed(4)}` : "—"}</td><td>${result}</td>`;
    tb.appendChild(tr);
  }
}

function fillBook() {
  const b = current;
  const st = $("bookStatus");
  st.textContent = statusLabel[b.status] || b.status;
  st.className = `status ${b.status}`;
  $("bookTitle").value = b.title;
  const flags = [
    b.pending_count ? `待确认卡片 ${b.pending_count}` : "",
    b.dirty_count ? `改稿待重整 ${b.dirty_count} 章` : "",
  ].filter(Boolean);
  $("bookMeta").textContent = [`${b.genre || "未填标签"}`, `阶段 ${b.plan?.label || b.stage}`, `建议 ${b.evaluation?.label || "—"}`, ...flags].join(" · ");
  $("genreInput").value = b.genre || "";
  $("themeInput").value = b.direction || "";
  $("pitchInput").value = b.pitch || "";
  refreshPitchCount();
  $("wordCapLabel").textContent = `${wan(b.word_count)} / ${wan(b.word_cap)}`;
  $("costCapLabel").textContent = `${Number(b.api_cost_yuan).toFixed(2)} / ${Number(b.cost_cap_yuan).toFixed(0)} 元`;
  const wp = Math.min(100, (b.word_count / b.word_cap) * 100);
  const cp = Math.min(100, (b.api_cost_yuan / b.cost_cap_yuan) * 100);
  $("wordBar").style.width = `${wp}%`;
  $("costBar").style.width = `${cp}%`;
  $("exportLink").href = `/api/books/${b.id}/export`;
  $("directionInput").value = b.direction || "";
  $("startDraftBtn").classList.toggle("hidden", b.status !== "candidate");
  $("finishCloseBtn").classList.toggle("hidden", b.status !== "closing");
  $("statusActions").classList.toggle("hidden", b.status !== "candidate" && b.status !== "closing");
  if (!lastPrompt || lastPrompt.book_id !== b.id) {
    showPrompt({
      book_id: b.id,
      label: "点「准备下一段提示词」，复制到豆包，再把回复贴回来。",
      text: "",
      reason: "",
      can_undo: Boolean(b.can_undo),
    });
  }
  renderCards();
  renderBeats();
  renderInject();
  renderChapters();
  renderMetrics();
  renderVerdict();
  showTab(tab);
}

function showTab(name) {
  tab = name;
  document.querySelectorAll(".tabs button").forEach((btn) => {
    btn.classList.toggle("on", btn.dataset.tab === name);
  });
  ["setup", "beats", "chapters", "metrics", "verdict"].forEach((id) => {
    $(`tab-${id}`).classList.toggle("hidden", id !== name);
  });
}

function cardEditor(item, fields, onSave, onDelete) {
  const wrap = document.createElement("div");
  wrap.className = "card";
  wrap.innerHTML = fields
    .map(
      (f) =>
        `<label>${f.label}${
          f.area
            ? `<textarea data-k="${f.key}">${escapeHtml(item[f.key] || "")}</textarea>`
            : `<input data-k="${f.key}" value="${escapeHtml(item[f.key] || "")}" />`
        }</label>`
    )
    .join("");
  const row = document.createElement("div");
  row.className = "row-head";
  const save = document.createElement("button");
  save.type = "button";
  save.textContent = "保存";
  save.onclick = () => {
    const payload = {};
    wrap.querySelectorAll("[data-k]").forEach((el) => {
      payload[el.dataset.k] = el.value;
    });
    onSave(payload);
  };
  const del = document.createElement("button");
  del.type = "button";
  del.textContent = "删";
  del.onclick = onDelete;
  row.append(save, del);
  wrap.appendChild(row);
  return wrap;
}

const NAME_CARD = [
  { key: "name", label: "名称" },
  { key: "card", label: "说明", area: true },
];

const CARD_GROUPS = [
  {
    list: "charList",
    key: "characters",
    route: "characters",
    label: "人物",
    fields: [
      { key: "name", label: "名" },
      { key: "role", label: "身份（主角 / 对手 / …）" },
      { key: "card", label: "卡片", area: true },
    ],
    blank: { name: "新人物", role: "", card: "" },
  },
  {
    list: "worldList",
    key: "world_entries",
    route: "world",
    label: "世界规则",
    fields: [
      { key: "name", label: "规则名" },
      { key: "card", label: "说明", area: true },
    ],
    blank: { name: "新规则", card: "" },
  },
  {
    list: "fsList",
    key: "foreshadows",
    route: "foreshadows",
    label: "伏笔",
    fields: [
      { key: "setup", label: "埋设" },
      { key: "payoff_at", label: "预计回收" },
      { key: "status", label: "状态 open / closed" },
      { key: "note", label: "备注", area: true },
    ],
    blank: { setup: "新伏笔", payoff_at: "本卷", status: "open", note: "" },
  },
  {
    list: "relList",
    key: "relations",
    route: "relations",
    label: "关系",
    fields: [
      { key: "name", label: "谁和谁（A—B）" },
      { key: "card", label: "关系与变化", area: true },
    ],
    blank: { name: "A—B", card: "" },
  },
  { list: "placeList", key: "places", route: "places", label: "地点势力", fields: NAME_CARD, blank: { name: "新地点", card: "" } },
  { list: "itemList", key: "items", route: "items", label: "道具", fields: NAME_CARD, blank: { name: "新道具", card: "" } },
];

function renderCards() {
  const b = current;
  for (const group of CARD_GROUPS) {
    const box = $(group.list);
    box.innerHTML = "";
    (b[group.key] || []).forEach((row) => {
      box.appendChild(
        cardEditor(
          row,
          group.fields,
          async (payload) => {
            await api(`/api/books/${b.id}/${group.route}/${row.id}`, {
              method: "PATCH",
              body: JSON.stringify({ ...row, ...payload }),
            });
            toast(`${group.label}已存`);
            openBook(b.id);
          },
          async () => {
            await api(`/api/books/${b.id}/${group.route}/${row.id}`, { method: "DELETE" });
            openBook(b.id);
          }
        )
      );
    });
  }
  renderPending();
  $("timelineBox").textContent = b.timeline || "（还没有章节摘要。每 3 章整理变化清单后会自动出现。）";
}

function renderPending() {
  const list = current.pending_cards || [];
  $("pendingBox").classList.toggle("hidden", !list.length);
  $("pendingCount").textContent = list.length ? `（${list.length} 条）` : "";
  const box = $("pendingList");
  box.innerHTML = "";
  for (const row of list) {
    const el = document.createElement("div");
    el.className = "pending-row";
    const extra = [row.role, row.payoff_at ? `回收 ${row.payoff_at}` : ""].filter(Boolean).join(" · ");
    el.innerHTML = `<input type="checkbox" data-pending value="${row.id}" />
      <label><span class="tag">${escapeHtml(PENDING_LABEL[row.kind] || row.kind)}</span><strong>${escapeHtml(row.name)}</strong>
      ${extra ? `<span class="muted">（${escapeHtml(extra)}）</span>` : ""} ${escapeHtml(row.card || "")}
      <span class="muted">· 来自${escapeHtml(row.source || "贴回")}</span></label>`;
    box.appendChild(el);
  }
}

function pendingSelected() {
  return [...document.querySelectorAll("#pendingList input[data-pending]:checked")].map((el) => Number(el.value));
}

async function pendingAction(path, payload, okText) {
  try {
    const result = await api(`/api/books/${current.id}/${path}`, { method: "POST", body: JSON.stringify(payload) });
    toast(okText(result));
    await loadBooks();
    await openBook(current.id);
  } catch (err) {
    toast(err.message);
  }
}

function milestoneEditor(row) {
  const el = document.createElement("div");
  el.className = "milestone";
  el.innerHTML = `<input type="checkbox" data-done ${row.done ? "checked" : ""} title="已完成" />
    <input type="text" data-text value="${escapeHtml(row.text)}" />
    <input type="number" data-target min="0" step="1000" value="${row.target_words || ""}" placeholder="目标字数" />
    <button class="small" data-save type="button">存</button>
    <button class="small" data-del type="button">删</button>`;
  const save = async (extra = {}) => {
    await api(`/api/books/${current.id}/milestones/${row.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        text: el.querySelector("[data-text]").value,
        target_words: Number(el.querySelector("[data-target]").value) || 0,
        done: el.querySelector("[data-done]").checked,
        ...extra,
      }),
    });
    openBook(current.id);
  };
  el.querySelector("[data-done]").onchange = () => save();
  el.querySelector("[data-save]").onclick = () => save().then(() => toast("里程碑已存"));
  el.querySelector("[data-del]").onclick = async () => {
    await api(`/api/books/${current.id}/milestones/${row.id}`, { method: "DELETE" });
    openBook(current.id);
  };
  return el;
}

function milestoneBlock(owner, ownerKey) {
  const wrap = document.createElement("div");
  const list = owner.milestones || [];
  const done = list.filter((row) => row.done).length;
  const head = document.createElement("p");
  head.className = "muted";
  head.textContent = list.length ? `里程碑 ${done} / ${list.length} 完成` : "还没有里程碑";
  wrap.appendChild(head);
  list.forEach((row) => wrap.appendChild(milestoneEditor(row)));
  const add = document.createElement("div");
  add.className = "milestone";
  add.innerHTML = `<input type="text" data-new placeholder="新里程碑：关键事件" />
    <input type="number" data-new-target min="0" step="1000" placeholder="目标字数" />
    <button class="small" type="button">加</button>`;
  add.querySelector("button").onclick = async () => {
    const text = add.querySelector("[data-new]").value.trim();
    if (!text) return toast("先写里程碑内容。");
    try {
      await api(`/api/books/${current.id}/milestones`, {
        method: "POST",
        body: JSON.stringify({ [ownerKey]: owner.id, text, target_words: Number(add.querySelector("[data-new-target]").value) || 0 }),
      });
      openBook(current.id);
    } catch (err) {
      toast(err.message);
    }
  };
  wrap.appendChild(add);
  return wrap;
}

function renderBeats() {
  $("beatList").innerHTML = "";
  const plan = current.plan || {};
  const stages = playbook?.stages || [];
  const currentBeat = current.beats.find((beat) => plan.kind === "stage" && beat.stage === plan.key);
  const meta = stages.find((item) => item.key === plan.key);
  $("beatProgress").textContent =
    plan.kind === "segment"
      ? `当前在 ${plan.label}${plan.closing ? "，已进入段末收束" : ""}。累计 ${wan(current.word_count)}。`
      : `当前阶段：${currentBeat?.title || plan.label}（${meta?.range || ""}）。累计 ${wan(current.word_count)}${plan.closing ? "，处于收束窗口" : ""}。`;
  current.beats.forEach((beat) => {
    const el = document.createElement("div");
    el.className = `card${beat === currentBeat ? " current" : ""}`;
    const range = stages.find((item) => item.key === beat.stage)?.range || wan(beat.target_words);
    el.innerHTML = `<h3>${escapeHtml(beat.title)} · ${escapeHtml(range)}${beat === currentBeat ? " · 当前" : ""}</h3>
      <textarea data-summary>${escapeHtml(beat.summary || "")}</textarea>
      <div class="row-head"><label><input type="checkbox" data-closed ${beat.closed ? "checked" : ""}/> 本阶段已闭环</label>
      <button type="button" data-save-beat>保存大纲</button></div>`;
    el.querySelector("[data-save-beat]").onclick = async () => {
      await api(`/api/books/${current.id}/beats/${beat.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: beat.title,
          summary: el.querySelector("[data-summary]").value,
          closed: el.querySelector("[data-closed]").checked,
        }),
      });
      toast("大纲已存");
      openBook(current.id);
    };
    el.appendChild(milestoneBlock(beat, "beat_id"));
    $("beatList").appendChild(el);
  });
  const segBox = $("segmentList");
  segBox.innerHTML = "";
  const segments = current.segments || [];
  if (!segments.length) {
    segBox.innerHTML = `<p class="muted">还没有续写段。</p>`;
    return;
  }
  segments.forEach((seg) => {
    const el = document.createElement("div");
    const isCurrent = plan.kind === "segment" && current.word_count >= seg.start_words && current.word_count < seg.end_words;
    el.className = `card${isCurrent ? " current" : ""}`;
    el.innerHTML = `<h3>${wan(seg.start_words)} → ${wan(seg.end_words)}${seg.outlined ? "" : " · 未出大纲"}${isCurrent ? " · 当前" : ""}</h3>
      <p><strong>目标：</strong>${escapeHtml(seg.goal || "（贴回续写段大纲后出现）")}</p>
      <p><strong>段末收束：</strong>${escapeHtml(seg.summary || "—")}</p>`;
    el.appendChild(milestoneBlock(seg, "segment_id"));
    segBox.appendChild(el);
  });
}

function renderInject() {
  const box = $("injectPick");
  box.innerHTML = "";
  for (const kind of INJECT_KINDS) {
    (current[kind.key] || []).forEach((item) => {
      const lab = document.createElement("label");
      lab.innerHTML = `<input type="checkbox" data-kind="${kind.ids}" value="${item.id}" /> ${escapeHtml(kind.label)}：${escapeHtml(item[kind.name] || "")}`;
      box.appendChild(lab);
    });
  }
}

function cardNames(ch) {
  const names = [];
  for (const kind of INJECT_KINDS) {
    const ids = new Set(ch[kind.ids] || []);
    for (const item of current[kind.key] || []) if (ids.has(item.id)) names.push(`${kind.label}:${item[kind.name]}`);
  }
  return names;
}

function selectedIds(kind) {
  return [...document.querySelectorAll(`#injectPick input[data-kind="${kind}"]:checked`)].map((el) => Number(el.value));
}

function renderChapters() {
  const box = $("chapterList");
  box.innerHTML = "";
  [...current.chapters].reverse().forEach((ch) => {
    const el = document.createElement("article");
    el.className = "chapter";
    const used = cardNames(ch);
    const suggestions = (ch.card_suggestions || []).length;
    const status = [
      `${ch.word_count} 字`,
      ch.accepted ? "已验收" : "待验收",
      ch.stage ? `阶段 ${ch.stage}` : "",
      suggestions ? `新卡片建议 ${suggestions} 条（验收后进待确认）` : "",
    ].filter(Boolean);
    el.innerHTML = `<div class="row-head"><strong>第${ch.number}章</strong><span class="muted">${escapeHtml(status.join(" · "))}</span>
      ${ch.dirty ? `<span class="dirty">已改稿待重整</span>` : ""}</div>
      <label>标题<input data-title value="${escapeHtml(ch.title || "")}" /></label>
      <label>本章目标<textarea data-goal rows="2">${escapeHtml(ch.goal || "")}</textarea></label>
      <p class="muted">用到的卡片：${used.length ? escapeHtml(used.join("、")) : "（无记录）"}</p>
      ${ch.digest ? `<p class="muted">摘要：${escapeHtml(ch.digest)}</p>` : ""}
      <label>正文<textarea class="body" data-body>${escapeHtml(ch.body || "")}</textarea></label>
      <div class="row-head">
        <button data-save type="button">保存并计字</button>
        <button data-accept type="button">${ch.accepted ? "取消验收" : "验收通过"}</button>
        <button data-del type="button">删除</button>
      </div>`;
    const patch = async (accepted) => {
      const result = await api(`/api/books/${current.id}/chapters/${ch.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: el.querySelector("[data-title]").value,
          goal: el.querySelector("[data-goal]").value,
          body: el.querySelector("[data-body]").value,
          accepted,
        }),
      });
      return result;
    };
    el.querySelector("[data-save]").onclick = async () => {
      try {
        const result = await patch(Boolean(ch.accepted));
        toast(result.dirty ? "章节已存。正文改过，下一段提示词会先重整这一章。" : "章节已存");
        openBook(current.id);
      } catch (err) {
        toast(err.message);
      }
    };
    el.querySelector("[data-accept]").onclick = async () => {
      try {
        const result = await patch(!ch.accepted);
        if (result.promoted) toast(`已验收，${result.promoted} 条新卡片进了待确认（设定页）。`);
        openBook(current.id);
      } catch (err) {
        toast(err.message);
      }
    };
    el.querySelector("[data-del]").onclick = async () => {
      if (!confirm("删这一章？")) return;
      await api(`/api/books/${current.id}/chapters/${ch.id}`, { method: "DELETE" });
      openBook(current.id);
    };
    box.appendChild(el);
  });
}

function renderMetrics() {
  const tb = $("metricTable");
  tb.innerHTML = "";
  [...current.metrics].reverse().forEach((m) => {
    const rate =
      m.readers && m.follow_readers != null ? `${((m.follow_readers / m.readers) * 100).toFixed(1)}%` : "—";
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${escapeHtml(m.recorded_on)}</td><td>${m.readers ?? "—"}</td><td>${m.follow_readers ?? "—"}</td>
      <td>${rate}</td><td>${m.shelves ?? "—"}</td><td>${pct(m.readthrough_10w)}</td><td>${pct(m.readthrough_30w)}</td>
      <td>${m.minutes_per_10k ?? "—"}</td><td><button type="button">删</button></td>`;
    tr.querySelector("button").onclick = async () => {
      await api(`/api/books/${current.id}/metrics/${m.id}`, { method: "DELETE" });
      openBook(current.id);
    };
    tb.appendChild(tr);
  });
}

function renderVerdict() {
  const ev = current.evaluation || {};
  const box = $("verdictBox");
  box.className = `verdict ${ev.recommendation || "watch"}`;
  const av = ev.averages || {};
  const follow = av.follow_rate == null ? "—" : `${(av.follow_rate * 100).toFixed(1)}%`;
  box.innerHTML = `<p class="eyebrow">打法建议 · ${ev.window_days || 0} 天窗口</p>
    <h2>${escapeHtml(ev.label || "再观察")}</h2>
    <p>均阅读 ${av.readers != null ? av.readers.toFixed(0) : "—"} · 追读率 ${follow} · 10万读完 ${pct(av.readthrough_10w)} · 30万读完 ${pct(av.readthrough_30w)}</p>
    <ul>${(ev.reasons || []).map((r) => `<li>${escapeHtml(r)}</li>`).join("")}</ul>
    <p class="muted">最终由你按按钮。继续会按下面选的字数加上限（费用上限不变）并占回在产槽，然后先贴回续写段大纲。停更会进入短收尾（6～10 章），写完后再标已停更。</p>`;
  $("decisionNote").value = current.decision_note || "";
  const need = playbook?.observe_days || 7;
  const days = current.metric_days || 0;
  $("dataDays").textContent = days >= need ? `已录 ${days} 天数据，够裁决。` : `已录 ${days} 天数据，还差 ${need - days} 天才满 ${need} 天窗口。`;
  const select = $("continueWords");
  if (!select.options.length) {
    const presets = playbook?.continue_presets || [50000, 100000, 200000, 300000];
    const def = playbook?.continue_default_words || 100000;
    select.innerHTML = `${presets
      .map((n) => `<option value="${n}" ${n === def ? "selected" : ""}>${n / 10000} 万${n === def ? "（默认）" : ""}</option>`)
      .join("")}<option value="custom">自定义</option>`;
  }
  const tb = $("decisionTable");
  tb.innerHTML = "";
  const names = { continue: "继续", stop: "停更", watch: "再观察" };
  [...(current.decisions || [])].reverse().forEach((row) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${escapeHtml(new Date(row.at).toLocaleString())}</td><td>${names[row.decision] || escapeHtml(row.decision)}</td>
      <td>${row.word_count != null ? wan(row.word_count) : "—"}</td><td>${row.words ? wan(row.words) : "—"}</td><td>${escapeHtml(row.note || "")}</td>`;
    tb.appendChild(tr);
  });
  if (!(current.decisions || []).length) tb.innerHTML = `<tr><td colspan="5" class="muted">还没有裁决记录。</td></tr>`;
}

function continueWords() {
  const value = $("continueWords").value;
  if (value === "custom") return Math.round(Number($("continueCustom").value || 0) * 10000);
  return Number(value);
}

async function createBook(ev) {
  ev.preventDefault();
  const title = $("newTitle").value.trim();
  if (!title) return;
  try {
    const book = await api("/api/books", {
      method: "POST",
      body: JSON.stringify({
        title,
        genre: $("newGenre").value,
        direction: $("newTheme").value,
        pitch: $("newPitch").value,
      }),
    });
    $("newBookDlg").close();
    $("newTitle").value = "";
    $("newGenre").value = "";
    $("newTheme").value = "";
    $("newPitch").value = "";
    await loadBooks();
    await openBook(book.id);
  } catch (err) {
    toast(err.message);
  }
}

function bind() {
  $("newBookBtn").onclick = () => $("newBookDlg").showModal();
  $("emptyNewBtn").onclick = () => $("newBookDlg").showModal();
  $("newBookDlg").querySelector("form").addEventListener("submit", (ev) => {
    if (ev.submitter && ev.submitter.value === "cancel") return;
    createBook(ev);
  });
  $("settingsBtn").onclick = async () => {
    const s = await loadSettings();
    $("settingsHint").textContent = s.api_key_set
      ? `已配置 Key ${s.api_key_masked}。留空保存则不改 Key。`
      : "还没有 Key。可用环境变量 CESHU_API_KEY，或写在这里。";
    $("apiKey").value = "";
    $("apiBase").value = s.api_base;
    $("apiModel").value = s.model;
    $("testResult").textContent = "";
    $("settingsDlg").showModal();
  };
  $("settingsDlg").querySelector("form").addEventListener("submit", async (ev) => {
    if (ev.submitter && ev.submitter.value === "cancel") return;
    ev.preventDefault();
    const payload = { api_base: $("apiBase").value, model: $("apiModel").value };
    if ($("apiKey").value.trim()) payload.api_key = $("apiKey").value.trim();
    try {
      settingsState = await api("/api/settings", { method: "POST", body: JSON.stringify(payload) });
      $("settingsDlg").close();
      toast("设置已保存");
    } catch (err) {
      toast(err.message);
    }
  });
  $("testConnBtn").onclick = async () => {
    const out = $("testResult");
    out.textContent = "测试中……";
    const result = await runModelRequest({ label: "测试连接", path: "/api/settings/test", button: $("testConnBtn") });
    out.textContent = result
      ? `连通：模型回复「${result.reply}」。${metaLine(result.meta)}`
      : "没有连通，看右下角提示或「请求记录」。";
  };
  $("requestsBtn").onclick = () => showRequests().catch((err) => toast(err.message));
  $("reqRefresh").onclick = () => showRequests().catch((err) => toast(err.message));
  $("reqFilter").onchange = () => showRequests().catch((err) => toast(err.message));
  $("reqCancel").onclick = () => {
    if (activeRequest) activeRequest.abort();
  };
  document.querySelectorAll("[data-add]").forEach((btn) => {
    btn.onclick = async () => {
      const group = CARD_GROUPS.find((item) => item.key === btn.dataset.add);
      try {
        await api(`/api/books/${current.id}/${group.route}`, { method: "POST", body: JSON.stringify(group.blank) });
        openBook(current.id);
      } catch (err) {
        toast(err.message);
      }
    };
  });
  $("pendingConfirmAll").onclick = () =>
    pendingAction("pending-confirm", { all: true }, (r) => `已确认 ${r.confirmed} 条，进了卡片库。`);
  $("pendingConfirmSel").onclick = () => {
    const ids = pendingSelected();
    if (!ids.length) return toast("先勾选要确认的卡片。");
    pendingAction("pending-confirm", { ids }, (r) => `已确认 ${r.confirmed} 条。`);
  };
  $("pendingRejectSel").onclick = () => {
    const ids = pendingSelected();
    if (!ids.length) return toast("先勾选要驳回的卡片。");
    pendingAction("pending-reject", { ids }, (r) => `已驳回 ${r.rejected} 条。`);
  };
  $("continueWords").onchange = () => {
    $("continueCustomWrap").classList.toggle("hidden", $("continueWords").value !== "custom");
  };
  document.querySelectorAll(".tabs button").forEach((btn) => {
    btn.onclick = () => showTab(btn.dataset.tab);
  });
  $("pitchInput").addEventListener("input", refreshPitchCount);
  $("themeInput").addEventListener("input", () => {
    $("directionInput").value = $("themeInput").value;
  });
  $("directionInput").addEventListener("input", () => {
    $("themeInput").value = $("directionInput").value;
  });
  $("savePitchBtn").onclick = async () => {
    try {
      await api(`/api/books/${current.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: $("bookTitle").value,
          genre: $("genreInput").value,
          direction: $("themeInput").value || $("directionInput").value,
          pitch: $("pitchInput").value,
        }),
      });
      toast("封面信息已存");
      openBook(current.id);
    } catch (err) {
      toast(err.message);
    }
  };
  $("genBeatsBtn").onclick = async () => {
    if (!current) return;
    const bookId = current.id;
    const result = await runModelRequest({
      label: "按简介生成大纲",
      path: `/api/books/${bookId}/generate-beats`,
      button: $("genBeatsBtn"),
    });
    if (!result) return;
    await loadBooks();
    if (current?.id === bookId) await openBook(bookId);
  };
  $("genChapterBtn").onclick = async () => {
    if (!current) return;
    const bookId = current.id;
    const result = await runModelRequest({
      label: "生成下一章",
      path: `/api/books/${bookId}/generate-chapter`,
      body: { goal: $("chapterGoal").value, ...pickedIds() },
      button: $("genChapterBtn"),
    });
    if (!result) return;
    $("chapterGoal").value = "";
    await loadBooks();
    if (current?.id === bookId) await openBook(bookId);
  };
  $("addBlankChapterBtn").onclick = async () => {
    await api(`/api/books/${current.id}/chapters`, {
      method: "POST",
      body: JSON.stringify({ title: "", goal: $("chapterGoal").value, body: "" }),
    });
    openBook(current.id);
  };
  $("metricForm").onsubmit = async (ev) => {
    ev.preventDefault();
    const form = ev.target;
    try {
      await api(`/api/books/${current.id}/metrics`, {
        method: "POST",
        body: JSON.stringify({
          recorded_on: form.recorded_on.value,
          readers: num(form, "readers"),
          follow_readers: num(form, "follow_readers"),
          shelves: num(form, "shelves"),
          readthrough_10w: num(form, "readthrough_10w"),
          readthrough_30w: num(form, "readthrough_30w"),
          minutes_per_10k: num(form, "minutes_per_10k"),
          note: form.note.value,
        }),
      });
      form.reset();
      form.recorded_on.valueAsDate = new Date();
      await openBook(current.id);
    } catch (err) {
      toast(err.message);
    }
  };
  $("evalBtn").onclick = async () => {
    const evl = await api(`/api/books/${current.id}/evaluate`, { method: "POST" });
    toast(`建议：${evl.label}`);
    openBook(current.id);
  };
  const decide = async (decision) => {
    const payload = { decision, note: $("decisionNote").value };
    if (decision === "continue") {
      payload.words = continueWords();
      const min = playbook?.continue_min_words || 50000;
      if (!payload.words || payload.words < min) return toast(`继续加的字数至少 ${min / 10000} 万。`);
      if (!confirm(`继续：字数上限加 ${payload.words / 10000} 万，费用上限不变。确定？`)) return;
    }
    try {
      await api(`/api/books/${current.id}/decision`, { method: "POST", body: JSON.stringify(payload) });
      if (decision === "continue") toast("已继续。下一段提示词会先要续写段大纲。");
      await loadBooks();
      await openBook(current.id);
    } catch (err) {
      toast(err.message);
    }
  };
  $("goContinue").onclick = () => decide("continue");
  $("goWatch").onclick = () => decide("watch");
  $("goStop").onclick = () => decide("stop");
  const patchStatus = async (status, okText) => {
    if (!current) return;
    try {
      await api(`/api/books/${current.id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
      toast(okText);
      await loadBooks();
      await openBook(current.id);
    } catch (err) {
      toast(err.message);
    }
  };
  $("startDraftBtn").onclick = () => patchStatus("drafting", "已进入在产，可以写正文。");
  $("finishCloseBtn").onclick = () => patchStatus("stopped", "短收尾完成，已停更。");
  $("refreshPromptBtn").onclick = () => loadPrompt();
  $("forceMemoryBtn").onclick = async () => {
    if (!current) return;
    try {
      const prompt = await api(`/api/books/${current.id}/force-memory`, { method: "POST", body: "{}" });
      showPrompt(prompt);
      toast("已改为重写完整前情。复制后贴进豆包。");
    } catch (err) {
      toast(err.message);
    }
  };
  $("undoPasteBtn").onclick = async () => {
    if (!current) return;
    try {
      const result = await api(`/api/books/${current.id}/undo-paste`, { method: "POST", body: "{}" });
      toast("已撤销最近一次贴回。");
      await loadBooks();
      await openBook(result.book.id);
      showPrompt(result.next);
    } catch (err) {
      toast(err.message);
    }
  };
  $("openFolderBtn").onclick = async () => {
    if (!current) return;
    const result = await api(`/api/books/${current.id}/open-folder`, { method: "POST", body: "{}" });
    toast(`正文文件夹已打开：${result.dir}`);
  };
  $("copyPromptBtn").onclick = async () => {
    const text = $("promptOutput").value;
    if (!text) {
      toast("还没有提示词。先点「准备下一段提示词」。");
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      toast("提示词已复制，去豆包粘贴。");
    } catch {
      toast("复制失败。请在提示词框里全选后手动复制。");
    }
  };
  $("pasteBtn").onclick = async () => {
    if (!current) return;
    $("pasteBtn").disabled = true;
    try {
      const result = await api(`/api/books/${current.id}/paste`, {
        method: "POST",
        body: JSON.stringify({
          text: $("pasteInput").value,
          step: lastPrompt?.step,
          revision: lastPrompt?.revision,
          ...pickedIds(),
        }),
      });
      $("pasteInput").value = "";
      toast(result.warning || "已整理。下一段提示词已换好。");
      await loadBooks();
      current = result.book;
      fillBook();
      showPrompt(result.next);
    } catch (err) {
      toast(err.message);
    } finally {
      $("pasteBtn").disabled = false;
    }
  };
}

async function loadPrompt() {
  if (!current) return;
  try {
    const prompt = await api(`/api/books/${current.id}/prompt`, {
      method: "POST",
      body: JSON.stringify({
        direction: $("directionInput").value,
        ...pickedIds(),
      }),
    });
    showPrompt(prompt);
  } catch (err) {
    toast(err.message);
  }
}

function showPrompt(prompt) {
  if (!prompt) return;
  lastPrompt = prompt;
  $("pasteLabel").textContent = prompt.label || "";
  $("promptOutput").value = prompt.text || "";
  const stepNames = {
    setup: "设定",
    outline_repair: "补齐大纲",
    segment_outline: "续写段大纲",
    redo: "改稿重整",
    memory: "完整前情",
    changes: "变化清单",
    chapter: "写章",
  };
  $("promptMeta").textContent = [prompt.reason, prompt.step ? `步骤：${stepNames[prompt.step] || prompt.step}` : "", prompt.revision ? `版本 ${prompt.revision}` : ""]
    .filter(Boolean)
    .join(" · ");
  const warn = $("promptWarn");
  if (prompt.warning) {
    warn.textContent = prompt.warning;
    warn.classList.remove("hidden");
  } else {
    warn.textContent = "";
    warn.classList.add("hidden");
  }
  $("undoPasteBtn").classList.toggle("hidden", !prompt.can_undo);
}

async function boot() {
  bind();
  $("metricForm").recorded_on.valueAsDate = new Date();
  try {
    await loadPlaybook();
    await loadSettings();
    await loadBooks();
    if (books[0]) await openBook(books[0].id);
  } catch (err) {
    toast(err.message);
  }
}

boot();

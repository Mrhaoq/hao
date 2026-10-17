export const CARD_KINDS = {
  character: { key: "characters", label: "人物" },
  world: { key: "world_entries", label: "规则" },
  foreshadow: { key: "foreshadows", label: "伏笔" },
  relation: { key: "relations", label: "关系" },
  place: { key: "places", label: "地点势力" },
  item: { key: "items", label: "道具" },
};

const LABEL_TO_KIND = {
  人物: "character",
  角色: "character",
  规则: "world",
  世界: "world",
  伏笔: "foreshadow",
  关系: "relation",
  地点: "place",
  势力: "place",
  地点势力: "place",
  道具: "item",
  金手指: "item",
};

export function kindFromLabel(label) {
  return LABEL_TO_KIND[String(label || "").trim()] || "";
}

export function cardName(kind, row) {
  if (kind === "foreshadow") return String(row.setup || row.name || "").trim();
  return String(row.name || "").trim();
}

function norm(text) {
  return String(text || "").replace(/\s+/g, "").toLowerCase();
}

export function hasCard(book, kind, name) {
  const key = CARD_KINDS[kind]?.key;
  if (!key) return true;
  const target = norm(name);
  if (!target) return true;
  return (book[key] || []).some((row) => norm(cardName(kind, row)) === target);
}

export function hasPending(book, kind, name) {
  const target = norm(name);
  return (book.pending_cards || []).some((row) => row.kind === kind && norm(row.name) === target);
}

/** Adds suggestions that are neither in the library nor already pending. Returns how many were added. */
export function addPendingCards(book, suggestions, nextId, source = "") {
  if (!book.pending_cards) book.pending_cards = [];
  let added = 0;
  for (const item of suggestions || []) {
    const kind = item.kind;
    const name = String(item.name || "").trim();
    if (!CARD_KINDS[kind] || !name || name === "无") continue;
    if (hasCard(book, kind, name) || hasPending(book, kind, name)) continue;
    book.pending_cards.push({
      id: nextId(),
      kind,
      name,
      role: item.role || "",
      card: item.card || "",
      payoff_at: item.payoff_at || "",
      source: item.source || source,
      chapter_number: item.chapter_number ?? null,
      created_at: new Date().toISOString(),
    });
    added += 1;
  }
  return added;
}

function toLibraryRow(pending, id) {
  if (pending.kind === "character") {
    return { id, name: pending.name, role: pending.role || "", card: pending.card || "", tags: "" };
  }
  if (pending.kind === "foreshadow") {
    return {
      id,
      setup: pending.name,
      payoff_at: pending.payoff_at || "30万",
      status: "open",
      kind: "must",
      note: pending.card || "",
    };
  }
  return { id, name: pending.name, card: pending.card || "" };
}

export function confirmPending(book, ids, nextId) {
  const pick = ids === "all" ? null : new Set((ids || []).map(Number));
  const keep = [];
  let confirmed = 0;
  for (const pending of book.pending_cards || []) {
    if (pick && !pick.has(pending.id)) {
      keep.push(pending);
      continue;
    }
    const key = CARD_KINDS[pending.kind]?.key;
    if (key && !hasCard(book, pending.kind, pending.name)) {
      if (!book[key]) book[key] = [];
      book[key].push(toLibraryRow(pending, nextId()));
      confirmed += 1;
    }
  }
  book.pending_cards = keep;
  return confirmed;
}

export function rejectPending(book, ids) {
  const before = (book.pending_cards || []).length;
  if (ids === "all") book.pending_cards = [];
  else {
    const drop = new Set((ids || []).map(Number));
    book.pending_cards = (book.pending_cards || []).filter((row) => !drop.has(row.id));
  }
  return before - book.pending_cards.length;
}

/** Parses lines like 「人物｜名字｜身份｜卡片」. */
export function parseCardLines(lines, extra = {}) {
  const out = [];
  for (const raw of lines || []) {
    const text = String(raw || "").trim().replace(/^[-*·]\s*/, "");
    if (!text || text === "无") continue;
    const parts = text.split(/[｜|]/).map((part) => part.trim());
    const kind = kindFromLabel(parts[0]);
    if (!kind || !parts[1]) continue;
    if (kind === "character") {
      out.push({ kind, name: parts[1], role: parts[2] || "", card: parts.slice(3).join("｜") || "", ...extra });
    } else if (kind === "foreshadow") {
      out.push({ kind, name: parts[1], payoff_at: parts[2] || "", card: parts.slice(3).join("｜") || "", ...extra });
    } else {
      out.push({ kind, name: parts[1], card: parts.slice(2).join("｜") || "", ...extra });
    }
  }
  return out;
}

export function timelineOf(book) {
  return (book.chapters || [])
    .filter((chapter) => String(chapter.digest || "").trim())
    .map((chapter) => `第${chapter.number}章 ${chapter.title || ""}：${chapter.digest}`)
    .join("\n");
}

export function allMilestones(book) {
  const rows = [];
  for (const beat of book.beats || []) {
    for (const milestone of beat.milestones || []) rows.push({ owner: beat, milestone });
  }
  for (const segment of book.segments || []) {
    for (const milestone of segment.milestones || []) rows.push({ owner: segment, milestone });
  }
  return rows;
}

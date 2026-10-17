import fs from "node:fs";
import path from "node:path";
import { COST_CAP_YUAN, SCHEMA_VERSION, WORD_CAP, countWords, defaultBeats, ensureSixBeats, hasCompleteSetup } from "./playbook.js";
import { timelineOf } from "./cards.js";

const ROOT = path.resolve(import.meta.dirname, "..");

function dataDir() {
  return process.env.CESHU_DATA_DIR || path.join(ROOT, "data");
}

function storePath() {
  return path.join(dataDir(), "store.json");
}

function emptyStore() {
  return { schemaVersion: SCHEMA_VERSION, seq: 1, childSeq: 1, settings: {}, books: [], request_log: [] };
}

function emptyStory() {
  return {
    summary: "",
    facts: "",
    character_state: "",
    recent: "",
    through: 0,
    setup_done: false,
    force_memory: false,
    updated_at: "",
  };
}

function nextChildId(store) {
  const id = store.childSeq;
  store.childSeq += 1;
  return id;
}

function migrateBook(book, store) {
  ensureSixBeats(book, () => nextChildId(store));
  for (const key of ["characters", "world_entries", "foreshadows", "relations", "places", "items", "pending_cards", "chapters", "metrics", "decisions"]) {
    if (!Array.isArray(book[key])) book[key] = [];
  }
  for (const chapter of book.chapters) {
    if (chapter.dirty == null) chapter.dirty = false;
    if (!Array.isArray(chapter.card_suggestions)) chapter.card_suggestions = [];
    if (chapter.stage == null) chapter.stage = "";
    if (chapter.digest == null) chapter.digest = "";
  }
  if (!Array.isArray(book.segments)) book.segments = [];
  if (!book.segments.length && Number(book.word_cap) > WORD_CAP) {
    book.segments.push({
      id: nextChildId(store),
      start_words: WORD_CAP,
      end_words: Number(book.word_cap),
      goal: "",
      summary: "",
      milestones: [],
      outlined: false,
      closed: false,
    });
  }
  for (const segment of book.segments) {
    if (!Array.isArray(segment.milestones)) segment.milestones = [];
  }
  const chapters = book.chapters || [];
  const prev = book.story || {};
  book.story = {
    ...emptyStory(),
    ...prev,
    through: Math.min(Number(prev.through) || 0, chapters.length),
    setup_done: Boolean(prev.setup_done) || (chapters.length > 0 && hasCompleteSetup(book)),
    force_memory: Boolean(prev.force_memory),
  };
  if (!book.prompt_state) book.prompt_state = { step: "", revision: 0, prepared_at: "" };
  return book;
}

function migrateStore(data) {
  if (!data.seq) data.seq = 1;
  if (!data.childSeq) data.childSeq = 1;
  if (!data.settings) data.settings = {};
  if (!data.books) data.books = [];
  if (!Array.isArray(data.request_log)) data.request_log = [];
  let changed = (data.schemaVersion || 0) < SCHEMA_VERSION;
  for (const book of data.books) {
    const before = JSON.stringify(book.beats?.map((item) => item.stage) || []);
    migrateBook(book, data);
    if (JSON.stringify(book.beats.map((item) => item.stage)) !== before) changed = true;
  }
  if (changed) {
    data.schemaVersion = SCHEMA_VERSION;
    save(data);
  } else {
    data.schemaVersion = SCHEMA_VERSION;
  }
  return data;
}

function load() {
  const file = storePath();
  if (!fs.existsSync(file)) return emptyStore();
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  return migrateStore(data);
}

function save(store) {
  const dir = dataDir();
  const file = storePath();
  fs.mkdirSync(dir, { recursive: true });
  const tmp = `${file}.tmp`;
  fs.writeFileSync(tmp, JSON.stringify(store, null, 2), "utf8");
  fs.renameSync(tmp, file);
}

function nowIso() {
  return new Date().toISOString().replace(/\.\d{3}Z$/, "Z");
}

export function wordCountOf(book) {
  return (book.chapters || []).reduce((n, ch) => n + (ch.word_count || 0), 0);
}

export function enrich(book) {
  const word_count = wordCountOf(book);
  const chapters = book.chapters || [];
  return {
    ...book,
    direction: book.direction || "",
    nightly: Boolean(book.nightly),
    story: { ...emptyStory(), ...(book.story || {}) },
    prompt_state: book.prompt_state || { step: "", revision: 0, prepared_at: "" },
    can_undo: Boolean(book.undo),
    timeline: timelineOf(book),
    dirty_count: chapters.filter((c) => c.dirty).length,
    pending_count: (book.pending_cards || []).length,
    word_count,
    chapter_count: chapters.length,
    accepted_count: chapters.filter((c) => c.accepted).length,
    metric_days: (book.metrics || []).length,
  };
}

export function listBooks() {
  return load().books.map(enrich).sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
}

export function draftingCount(excludeId = null) {
  return load().books.filter(
    (b) => (b.status === "drafting" || b.status === "closing") && b.id !== excludeId,
  ).length;
}

export function getBook(id) {
  const book = load().books.find((b) => b.id === Number(id));
  return book ? enrich(book) : null;
}

export function mutate(fn) {
  const store = load();
  const result = fn(store);
  save(store);
  return result;
}

export function createBook({ title, genre = "", pitch = "", direction = "" }) {
  return mutate((store) => {
    const ts = nowIso();
    const book = {
      id: store.seq++,
      title: title.trim(),
      genre: genre.trim(),
      pitch: pitch.trim(),
      status: "candidate",
      word_cap: WORD_CAP,
      cost_cap_yuan: COST_CAP_YUAN,
      api_cost_yuan: 0,
      recommendation: "",
      decision_note: "",
      direction: String(direction || "").trim(),
      nightly: false,
      story: emptyStory(),
      prompt_state: { step: "", revision: 0, prepared_at: "" },
      created_at: ts,
      updated_at: ts,
      characters: [],
      world_entries: [],
      foreshadows: [],
      relations: [],
      places: [],
      items: [],
      pending_cards: [],
      segments: [],
      decisions: [],
      beats: defaultBeats(() => nextChildId(store)),
      chapters: [],
      metrics: [],
    };
    store.books.push(book);
    return enrich(book);
  });
}

export function updateBook(id, fields) {
  return mutate((store) => {
    const book = store.books.find((b) => b.id === Number(id));
    if (!book) return null;
    Object.assign(book, fields, { updated_at: nowIso() });
    return enrich(book);
  });
}

export function deleteBook(id) {
  return mutate((store) => {
    const before = store.books.length;
    store.books = store.books.filter((b) => b.id !== Number(id));
    return before !== store.books.length;
  });
}

export function addChild(bookId, key, item) {
  return mutate((store) => {
    const book = store.books.find((b) => b.id === Number(bookId));
    if (!book) return null;
    const row = { id: nextChildId(store), ...item };
    if (!Array.isArray(book[key])) book[key] = [];
    book[key].push(row);
    book.updated_at = nowIso();
    return row;
  });
}

export function patchChild(bookId, key, itemId, fields) {
  return mutate((store) => {
    const book = store.books.find((b) => b.id === Number(bookId));
    if (!book) return null;
    const row = book[key].find((x) => x.id === Number(itemId));
    if (!row) return null;
    Object.assign(row, fields);
    if (key === "chapters") row.word_count = countWords(row.body);
    book.updated_at = nowIso();
    return row;
  });
}

export function deleteChild(bookId, key, itemId) {
  return mutate((store) => {
    const book = store.books.find((b) => b.id === Number(bookId));
    if (!book) return false;
    const before = book[key].length;
    book[key] = book[key].filter((x) => x.id !== Number(itemId));
    if (key === "chapters" && book.story) {
      book.story.through = Math.min(book.story.through || 0, book.chapters.length);
    }
    book.updated_at = nowIso();
    return before !== book[key].length;
  });
}

export function upsertMetric(bookId, metric) {
  return mutate((store) => {
    const book = store.books.find((b) => b.id === Number(bookId));
    if (!book) return null;
    const existing = book.metrics.find((m) => m.recorded_on === metric.recorded_on);
    if (existing) Object.assign(existing, metric);
    else book.metrics.push({ id: nextChildId(store), ...metric });
    book.metrics.sort((a, b) => (a.recorded_on < b.recorded_on ? -1 : 1));
    book.updated_at = nowIso();
    return book.metrics;
  });
}

export function getSettings() {
  return load().settings || {};
}

export function setSettings(fields) {
  return mutate((store) => {
    store.settings = { ...store.settings, ...fields };
    return store.settings;
  });
}

export function maybeObserve(bookId) {
  return mutate((store) => {
    const book = store.books.find((b) => b.id === Number(bookId));
    if (!book) return null;
    if ((book.status === "drafting" || book.status === "closing") && wordCountOf(book) >= book.word_cap) {
      if (book.status !== "closing") book.status = "observing";
      book.updated_at = nowIso();
    }
    return enrich(book);
  });
}

export function snapshotBook(bookId) {
  return mutate((store) => {
    const book = store.books.find((item) => item.id === Number(bookId));
    if (!book) return null;
    const copy = JSON.parse(JSON.stringify(book));
    delete copy.undo;
    book.undo = copy;
    return true;
  });
}

export function undoBook(bookId) {
  return mutate((store) => {
    const book = store.books.find((item) => item.id === Number(bookId));
    if (!book?.undo) {
      const err = new Error("没有可撤销的贴回。");
      err.status = 409;
      throw err;
    }
    const snap = book.undo;
    const keepId = book.id;
    for (const key of Object.keys(book)) delete book[key];
    Object.assign(book, snap, { id: keepId, undo: null, updated_at: nowIso() });
    return enrich(book);
  });
}

export function appendRequestLog(entry, max) {
  return mutate((store) => {
    if (!Array.isArray(store.request_log)) store.request_log = [];
    const row = { id: nextChildId(store), ...entry };
    store.request_log.push(row);
    if (store.request_log.length > max) store.request_log = store.request_log.slice(-max);
    return row;
  });
}

export function readRequestLog() {
  return load().request_log || [];
}

export { ROOT, nowIso, emptyStory, dataDir, nextChildId };

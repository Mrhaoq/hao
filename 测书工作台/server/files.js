import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { COST_CAP_YUAN, STAGES, WORD_CAP, countWords, ensureSixBeats } from "./playbook.js";
import { formatSetupMd, parseCover, parseSetupMd } from "./cover-text.js";
import * as store from "./store.js";
import { ROOT, emptyStory, nowIso } from "./store.js";
import { timelineOf } from "./cards.js";

const MANUSCRIPT_ROOT = process.env.CESHU_MANUSCRIPT_ROOT || path.join(ROOT, "文稿");

function safeName(name) {
  const cleaned = String(name || "未命名").replace(/[<>:"/\\|?*\r\n]/g, "").trim();
  return (cleaned || "未命名").slice(0, 40);
}

function read(file) {
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8").replace(/^\uFEFF/, "");
}

function writeIfMissing(file, text) {
  if (fs.existsSync(file)) return;
  writeFile(file, text);
}

function writeFile(file, text) {
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, text, "utf8");
}

export function bookDir(book) {
  const wanted = `${book.id}-${safeName(book.title)}`;
  const wantedPath = path.join(MANUSCRIPT_ROOT, wanted);
  if (!fs.existsSync(MANUSCRIPT_ROOT)) return wantedPath;
  const matches = fs
    .readdirSync(MANUSCRIPT_ROOT, { withFileTypes: true })
    .filter((item) => item.isDirectory() && item.name.startsWith(`${book.id}-`))
    .map((item) => item.name);
  if (matches.includes(wanted)) return wantedPath;
  if (matches.length) return path.join(MANUSCRIPT_ROOT, matches[0]);
  return wantedPath;
}

function splitBlocks(text) {
  return String(text || "")
    .replaceAll("\r\n", "\n")
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);
}

const LEGACY_SETUP_FILES = [
  ["设定", "封面.txt"],
  ["设定", "卖点.txt"],
  ["设定", "人物.txt"],
  ["设定", "世界.txt"],
  ["大纲", "三阶段.txt"],
  ["伏笔", "伏笔.txt"],
  ["伏笔", "前情.txt"],
];

function setupPath(dir) {
  return path.join(dir, "设定.md");
}

function usable(text) {
  const t = String(text || "").trim();
  if (!t) return "";
  if (t === "（无）" || /^（还没有/.test(t)) return "";
  return t;
}

function readLegacyFile(dir, ...parts) {
  return usable(read(path.join(dir, ...parts)));
}

function hasLegacySetup(dir) {
  return LEGACY_SETUP_FILES.some((parts) => fs.existsSync(path.join(dir, ...parts)));
}

function gatherSetup(dir) {
  const fromMd = fs.existsSync(setupPath(dir)) ? parseSetupMd(read(setupPath(dir))) : {};
  const coverRaw = read(path.join(dir, "设定", "封面.txt")) || read(path.join(dir, "设定", "卖点.txt"));
  const fromCover = coverRaw ? parseCover(coverRaw) : {};
  return {
    title: fromCover.title || fromMd.title || "",
    genre: fromCover.genre || fromMd.genre || "",
    direction: fromCover.direction || fromMd.direction || "",
    pitch: fromCover.pitch || fromMd.pitch || "",
    people: readLegacyFile(dir, "设定", "人物.txt") || usable(fromMd.people),
    world: readLegacyFile(dir, "设定", "世界.txt") || usable(fromMd.world),
    outline: readLegacyFile(dir, "大纲", "三阶段.txt") || usable(fromMd.outline),
    hooks: readLegacyFile(dir, "伏笔", "伏笔.txt") || usable(fromMd.hooks),
    relations: usable(fromMd.relations),
    places: usable(fromMd.places),
    items: usable(fromMd.items),
    story: readLegacyFile(dir, "伏笔", "前情.txt") || usable(fromMd.story),
    timeline: usable(fromMd.timeline),
    segments: usable(fromMd.segments),
  };
}

function removeLegacySetup(dir) {
  for (const parts of LEGACY_SETUP_FILES) {
    const file = path.join(dir, ...parts);
    if (fs.existsSync(file)) fs.unlinkSync(file);
  }
  for (const name of ["设定", "大纲", "伏笔"]) {
    const folder = path.join(dir, name);
    if (fs.existsSync(folder) && fs.readdirSync(folder).length === 0) fs.rmdirSync(folder);
  }
}

function textsFromBook(book) {
  const people = (book.characters || [])
    .map((item) => `${item.name}｜${item.role || ""}\n${item.card || ""}`)
    .join("\n\n");
  const world = (book.world_entries || []).map((item) => `${item.name}\n${item.card || ""}`).join("\n\n");
  const milestoneLines = (list) =>
    (list || []).map((row) => `- [${row.done ? "x" : " "}] ${row.text}${row.target_words ? `｜${row.target_words}字` : ""}`);
  const outline = (book.beats || [])
    .map((item) =>
      [`${item.title || item.stage}｜${item.target_words}字`, item.summary || "", ...milestoneLines(item.milestones)]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
  const cardBlocks = (list) => (list || []).map((row) => `${row.name}\n${row.card || ""}`.trim()).join("\n\n");
  const segments = (book.segments || [])
    .map((item) =>
      [
        `${item.start_words}–${item.end_words}字${item.outlined ? "" : "（未出大纲）"}`,
        item.goal ? `目标：${item.goal}` : "",
        item.summary ? `收束：${item.summary}` : "",
        ...milestoneLines(item.milestones),
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
  const hooks = (book.foreshadows || [])
    .map((item) => `${item.kind || "must"}｜${item.setup}｜${item.payoff_at || ""}｜${item.note || ""}`)
    .join("\n");
  const story = book.story || {};
  return {
    title: book.title || "",
    genre: book.genre || "",
    direction: book.direction || "",
    pitch: book.pitch || "",
    people,
    world,
    outline,
    hooks,
    relations: cardBlocks(book.relations),
    places: cardBlocks(book.places),
    items: cardBlocks(book.items),
    timeline: timelineOf(book),
    segments,
    story: `硬事实：\n${story.facts || "（无）"}\n\n前情：\n${story.summary || "（无）"}\n\n人物状态：\n${story.character_state || "（无）"}\n\n最近三章：\n${story.recent || "（无）"}`,
  };
}

function writeSetupMd(dir, book) {
  writeFile(setupPath(dir), formatSetupMd(textsFromBook(book)));
  removeLegacySetup(dir);
}

export function consolidateManuscripts() {
  if (!fs.existsSync(MANUSCRIPT_ROOT)) return;
  const index = path.join(MANUSCRIPT_ROOT, "五本框架.txt");
  if (fs.existsSync(index)) fs.unlinkSync(index);
  for (const item of fs.readdirSync(MANUSCRIPT_ROOT, { withFileTypes: true })) {
    if (!item.isDirectory()) continue;
    const dir = path.join(MANUSCRIPT_ROOT, item.name);
    if (!fs.existsSync(setupPath(dir)) && !hasLegacySetup(dir)) continue;
    writeFile(setupPath(dir), formatSetupMd(gatherSetup(dir)));
    removeLegacySetup(dir);
  }
}

function parsePeople(text) {
  if (!usable(text)) return [];
  return splitBlocks(text).map((block) => {
    const [first, ...body] = block.split("\n");
    const [name, role] = first.split("｜").map((part) => (part || "").trim());
    return { name: name || "未命名", role: role || "", card: body.join("\n").trim() };
  }).filter((item) => item.name);
}

function parseWorld(text) {
  if (!usable(text)) return [];
  return splitBlocks(text).map((block) => {
    const [first, ...body] = block.split("\n");
    return { name: first.trim(), card: body.join("\n").trim() };
  }).filter((item) => item.name);
}

function parseBeats(text) {
  if (!usable(text)) return [];
  const raw = String(text || "").replaceAll("\r\n", "\n");
  const sections = [
    { stage: "promise", title: "读者承诺", target_words: 30000, re: /0\s*[–\-到至]\s*3\s*万|读者承诺/ },
    { stage: "buildup", title: "加压蓄力", target_words: 80000, re: /3\s*[–\-到至]\s*8\s*万|加压蓄力/ },
    { stage: "payoff", title: "第一次回报", target_words: 120000, re: /8\s*[–\-到至]\s*12\s*万|3\s*[–\-到至]\s*10\s*万|第一次回报/ },
    { stage: "pressure", title: "加压对质", target_words: 200000, re: /12\s*[–\-到至]\s*20\s*万|10\s*[–\-到至]\s*20\s*万|加压对质/ },
    { stage: "lock", title: "锁定结局", target_words: 260000, re: /20\s*[–\-到至]\s*26\s*万|锁定结局/ },
    { stage: "volume_end", title: "30万裁决", target_words: 300000, re: /26\s*[–\-到至]\s*30\s*万|30\s*万裁决|本卷结局/ },
  ];
  const withMilestones = (section, chunk) => {
    const milestones = [];
    const rest = [];
    for (const line of chunk.split("\n")) {
      const hit = line.trim().match(/^- \[( |x)\]\s*(.+?)(?:｜(\d+)字)?$/);
      if (hit) milestones.push({ text: hit[2].trim(), target_words: Number(hit[3]) || 0, done: hit[1] === "x" });
      else rest.push(line);
    }
    return { stage: section.stage, title: section.title, target_words: section.target_words, summary: rest.join("\n").trim(), closed: false, milestones };
  };
  const found = [];
  for (const section of sections) {
    const match = raw.search(section.re);
    found.push({ ...section, index: match < 0 ? Number.POSITIVE_INFINITY : match });
  }
  const ordered = found.filter((item) => item.index !== Number.POSITIVE_INFINITY).sort((a, b) => a.index - b.index);
  if (!ordered.length) {
    return sections.map((section) => ({
      stage: section.stage,
      title: section.title,
      target_words: section.target_words,
      summary: raw.trim(),
      closed: false,
    }));
  }
  return sections.map((section) => {
    const current = ordered.find((item) => item.stage === section.stage);
    if (!current) {
      return { stage: section.stage, title: section.title, target_words: section.target_words, summary: "", closed: false };
    }
    const next = ordered.find((item) => item.index > current.index);
    return withMilestones(section, raw.slice(current.index, next ? next.index : raw.length).trim());
  });
}

function parseHooks(text) {
  if (!usable(text)) return [];
  return String(text || "")
    .replaceAll("\r\n", "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [kind, setup, payoff, note] = line.split("｜").map((part) => (part || "").trim());
      const drop = kind === "drop";
      return {
        kind: drop ? "drop" : "must",
        setup: setup || kind,
        payoff_at: payoff || "",
        note: note || "",
        status: "open",
      };
    })
    .filter((item) => item.setup);
}

function parseStory(text) {
  const raw = String(text || "").replaceAll("\r\n", "\n");
  const facts = (raw.split(/硬事实：/)[1] || "").split(/前情：/)[0] || "";
  const people = raw.split(/人物状态：/)[1] || "";
  const recent = (raw.split(/最近三章：/)[1] || "").trim();
  const summary = (raw.split(/前情：/)[1] || raw).split(/人物状态：/)[0] || "";
  return {
    ...emptyStory(),
    facts: facts.trim(),
    summary: summary.trim(),
    character_state: people.split(/最近三章：/)[0].trim(),
    recent,
    updated_at: nowIso(),
  };
}

function parseChapters(dir) {
  const folder = path.join(dir, "正文");
  if (!fs.existsSync(folder)) return [];
  const files = fs.readdirSync(folder).filter((name) => /^第\d+章-/.test(name) && name.endsWith(".txt"));
  return files
    .map((name) => {
      const number = Number(name.match(/^第(\d+)章/)[1]);
      const title = name.replace(/^第\d+章-/, "").replace(/\.txt$/, "");
      const raw = read(path.join(folder, name)).trim();
      if (!raw || raw.includes("尚未开写")) return null;
      const lines = raw.split(/\r?\n/);
      let body = raw;
      if (lines[0].startsWith("第") && lines[0].includes("章")) {
        body = lines.slice(1).join("\n").replace(/^\s*\n/, "");
      }
      if (body.trim().length < 20) return null;
      return {
        number,
        title: title === "未命名" ? title : title,
        goal: "",
        body: body.trim(),
        word_count: countWords(body),
        accepted: false,
        character_ids: [],
        world_ids: [],
        foreshadow_ids: [],
        created_at: nowIso(),
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.number - b.number);
}

function emptyish(value) {
  const text = String(value || "").trim();
  return !text || text === "书名" || text === "类型" || text === "一句话卖点" || text === "简介" || text === "标题";
}

function readManuscript(dir, folderName) {
  if (!fs.existsSync(setupPath(dir)) && !hasLegacySetup(dir)) return null;
  const idMatch = String(folderName).match(/^(\d+)-/);
  if (!idMatch) return null;
  const setup = fs.existsSync(setupPath(dir)) ? parseSetupMd(read(setupPath(dir))) : gatherSetup(dir);
  return {
    id: Number(idMatch[1]),
    title: setup.title || folderName.replace(/^\d+-/, ""),
    genre: setup.genre || "",
    direction: setup.direction || "",
    pitch: setup.pitch || "",
    characters: parsePeople(setup.people),
    world_entries: parseWorld(setup.world),
    relations: parseWorld(setup.relations),
    places: parseWorld(setup.places),
    items: parseWorld(setup.items),
    beats: parseBeats(setup.outline),
    foreshadows: parseHooks(setup.hooks),
    story: parseStory(setup.story),
    chapters: parseChapters(dir),
  };
}

function fillBook(book, parsed, nextId) {
  const ts = nowIso();
  if (emptyish(book.title)) book.title = parsed.title;
  if (emptyish(book.genre)) book.genre = parsed.genre;
  if (emptyish(book.direction)) book.direction = parsed.direction;
  if (emptyish(book.pitch)) book.pitch = parsed.pitch;
  const frameworkOnly = !(book.chapters || []).length;
  if ((!(book.characters || []).length || frameworkOnly) && parsed.characters.length) {
    book.characters = parsed.characters.map((item) => ({ id: nextId(), tags: "", ...item }));
  }
  if ((!(book.world_entries || []).length || frameworkOnly) && parsed.world_entries.length) {
    book.world_entries = parsed.world_entries.map((item) => ({ id: nextId(), ...item }));
  }
  if (parsed.beats.length) {
    book.beats = book.beats || [];
    for (const beat of parsed.beats) {
      const current = book.beats.find((item) => item.stage === beat.stage);
      if (current && (frameworkOnly || !String(current.summary || "").trim())) {
        current.summary = beat.summary;
        current.title = beat.title || current.title;
      } else if (!current) {
        book.beats.push({ id: nextId(), closed: false, ...beat });
      }
    }
  }
  if ((!(book.foreshadows || []).length || frameworkOnly) && parsed.foreshadows.length) {
    book.foreshadows = parsed.foreshadows.map((item) => ({ id: nextId(), ...item }));
  }
  if (frameworkOnly && !["drafting", "closing", "observing", "stopped"].includes(book.status)) {
    book.status = "candidate";
  }
  if (frameworkOnly && book.status === "drafting") {
    // leave as-is if user already set drafting; import will not demote
  }
  const storyEmpty = !String(book.story?.summary || "").trim() || book.story?.summary?.includes("800 字内");
  if (storyEmpty && parsed.story.summary) {
    book.story = { ...(book.story || {}), ...parsed.story };
  }
  const existingNumbers = new Set((book.chapters || []).map((item) => item.number));
  for (const chapter of parsed.chapters) {
    if (existingNumbers.has(chapter.number)) continue;
    (book.chapters || (book.chapters = [])).push({ id: nextId(), ...chapter });
  }
  book.chapters = (book.chapters || []).sort((a, b) => a.number - b.number);
  book.updated_at = ts;
  return book;
}

function blankBook(parsed, nextId) {
  const ts = nowIso();
  return {
    id: parsed.id,
    title: parsed.title,
    genre: parsed.genre,
    pitch: parsed.pitch,
    status: parsed.chapters.length ? "drafting" : "candidate",
    word_cap: WORD_CAP,
    cost_cap_yuan: COST_CAP_YUAN,
    api_cost_yuan: 0,
    recommendation: "",
    decision_note: "",
    direction: parsed.direction,
    nightly: false,
    story: { ...emptyStory(), ...(parsed.story || {}) },
    prompt_state: { step: "", revision: 0, prepared_at: "" },
    created_at: ts,
    updated_at: ts,
    characters: parsed.characters.map((item) => ({ id: nextId(), tags: "", ...item })),
    world_entries: parsed.world_entries.map((item) => ({ id: nextId(), ...item })),
    foreshadows: parsed.foreshadows.map((item) => ({ id: nextId(), ...item })),
    relations: parsed.relations.map((item) => ({ id: nextId(), ...item })),
    places: parsed.places.map((item) => ({ id: nextId(), ...item })),
    items: parsed.items.map((item) => ({ id: nextId(), ...item })),
    pending_cards: [],
    segments: [],
    decisions: [],
    beats: ensureSixBeats(
      {
        beats: parsed.beats.map((item) => ({
          id: nextId(),
          closed: false,
          ...item,
          milestones: (item.milestones || []).map((row) => ({ id: nextId(), ...row })),
        })),
      },
      nextId,
    ).beats,
    chapters: parsed.chapters.map((item) => ({ id: nextId(), digest: "", dirty: false, card_suggestions: [], stage: "", ...item })),
    metrics: [],
  };
}

export function importManuscripts() {
  consolidateManuscripts();
  if (!fs.existsSync(MANUSCRIPT_ROOT)) return [];
  const folders = fs.readdirSync(MANUSCRIPT_ROOT, { withFileTypes: true }).filter((item) => item.isDirectory());
  const byId = new Map();
  for (const item of folders) {
    const parsedOne = readManuscript(path.join(MANUSCRIPT_ROOT, item.name), item.name);
    if (!parsedOne) continue;
    if (!byId.has(parsedOne.id)) byId.set(parsedOne.id, parsedOne);
  }
  const parsed = [...byId.values()];
  if (!parsed.length) return [];
  let importedIds = [];
  store.mutate((data) => {
    const nextId = () => {
      const id = data.childSeq;
      data.childSeq += 1;
      return id;
    };
    const added = [];
    for (const item of parsed) {
      const existing = data.books.find((book) => book.id === item.id);
      if (existing) continue;
      const book = blankBook(item, nextId);
      ensureSixBeats(book, nextId);
      data.books.push(book);
      added.push(item.id);
    }
    const maxId = data.books.reduce((max, book) => Math.max(max, book.id), 0);
    if (data.seq <= maxId) data.seq = maxId + 1;
    importedIds = added;
  });
  return importedIds;
}

export function writeBookFiles(book) {
  const dir = bookDir(book);
  const folder = path.join(dir, "正文");
  fs.mkdirSync(folder, { recursive: true });
  const keep = new Set();
  const parts = [`${book.title || "未命名"}`, book.pitch || "", ""];
  for (const chapter of book.chapters || []) {
    const filename = `第${String(chapter.number).padStart(3, "0")}章-${safeName(chapter.title)}.txt`;
    const text = `第${chapter.number}章 ${chapter.title || ""}\n\n${chapter.body || ""}`;
    const prefix = `第${String(chapter.number).padStart(3, "0")}章-`;
    for (const name of fs.existsSync(folder) ? fs.readdirSync(folder) : []) {
      if (name.startsWith(prefix) && name.endsWith(".txt") && name !== filename) {
        fs.unlinkSync(path.join(folder, name));
      }
    }
    writeFile(path.join(folder, filename), text);
    keep.add(filename);
    parts.push(text, "");
  }
  for (const name of fs.readdirSync(folder)) {
    if (/^第\d+章-/.test(name) && name.endsWith(".txt") && !keep.has(name)) {
      fs.unlinkSync(path.join(folder, name));
    }
  }
  const allFile = path.join(folder, "全书.txt");
  const realChapters = (book.chapters || []).filter((chapter) => countWords(chapter.body) >= 20);
  if (realChapters.length) writeFile(allFile, parts.join("\n"));
  else writeFile(allFile, `${book.title || "未命名"}\n${book.pitch || ""}\n\n（正文尚未开写）\n`);
  writeSetupMd(dir, book);
  return dir;
}

export function openBookFolder(book) {
  const dir = writeBookFiles(book);
  spawn("explorer.exe", [dir], { detached: true, stdio: "ignore" }).unref();
  return dir;
}

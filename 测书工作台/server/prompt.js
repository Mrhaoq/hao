import {
  CHAPTER_MAX_WORDS,
  CHAPTER_MIN_WORDS,
  SHORT_CLOSE_CHAPTERS_MAX,
  STAGES,
  STORY_MAX_CHARS,
  closureMode,
  countWords,
  hasBasics,
  hasCompleteSetup,
  missingBeatKeys,
  needsOutlineRepair,
  needsSegmentOutline,
  parsePayoffWords,
  pitchLengthMessage,
  segmentClosing,
  segmentFor,
  stageForWords,
} from "./playbook.js";
import { addPendingCards } from "./cards.js";
import * as store from "./store.js";
import { emptyStory, nowIso } from "./store.js";
import {
  changeListPrompt,
  chapterPrompt as formatChapterPrompt,
  memoryPrompt,
  outlineRepairPrompt,
  parseChanges,
  parseChapter,
  parseMemory,
  parseSegmentOutline,
  parseSetup,
  redoPrompt,
  segmentOutlinePrompt,
  setupPrompt,
  splitChapterCards,
} from "./setup-text.js";

const LABELS = {
  setup: "把下面这段贴进豆包，再把豆包的设定原文贴回来。完整设定齐了才能写第 1 章。",
  outline_repair: "旧大纲还缺阶段。把下面这段贴进豆包，再把补齐后的六阶段原文贴回来。",
  segment_outline: "已决定续写。把下面这段贴进豆包，再把续写段大纲贴回来。",
  redo: "有章节改过稿。把下面这段贴进豆包，再把重整结果贴回来。",
  chapter: "把下面这段贴进豆包，再把这一章正文贴回来。",
  changes: "已经写满 3 章。把下面这段贴进豆包，再把变化清单贴回来（不要整篇重写前情）。",
  memory: "已经写满 6 章或遇到重大转折。把下面这段贴进豆包，再把更新后的完整前情和伏笔贴回来。",
};

export { hasCompleteSetup, needsOutlineRepair, missingBeatKeys };

export function decideStep(book) {
  const count = (book.chapters || []).length;
  const through = Math.min(Number(book.story?.through) || 0, count);
  if (!count) {
    if (!hasCompleteSetup(book)) {
      return hasBasics(book) && needsOutlineRepair(book) ? "outline_repair" : "setup";
    }
    return "chapter";
  }
  if (needsOutlineRepair(book)) return "outline_repair";
  if (needsSegmentOutline(book)) return "segment_outline";
  if ((book.chapters || []).some((item) => item.dirty)) return "redo";
  if (book.story?.force_memory) return "memory";
  if (count % 6 === 0 && through < count) return "memory";
  if (count % 3 === 0 && through < count) return "changes";
  return "chapter";
}

export function rankForeshadows(items, wordCount) {
  return [...(items || [])].sort((a, b) => {
    const kindA = a.kind === "drop" ? 1 : 0;
    const kindB = b.kind === "drop" ? 1 : 0;
    if (kindA !== kindB) return kindA - kindB;
    const da = Math.abs(parsePayoffWords(a.payoff_at) - wordCount);
    const db = Math.abs(parsePayoffWords(b.payoff_at) - wordCount);
    return da - db;
  });
}

function mentions(row, names) {
  const text = `${row.name || ""}${row.card || ""}`;
  return names.some((name) => name && text.includes(name));
}

export function pickCards(book, ids = {}) {
  const limit = (list, picked, fallback, n) => {
    if (picked && picked.length) {
      const set = new Set(picked.map(Number));
      return list.filter((item) => set.has(item.id)).slice(0, n);
    }
    return fallback().slice(0, n);
  };
  const characters = book.characters || [];
  const worlds = book.world_entries || [];
  const openHooks = (book.foreshadows || []).filter((item) => item.status !== "closed");
  const ranked = rankForeshadows(openHooks.length ? openHooks : book.foreshadows || [], book.word_count || 0);
  const autoChars = () => {
    const lead = characters.filter((item) => /主/.test(item.role || ""));
    return (lead.length ? lead : characters).slice(0, 4);
  };
  const pickedChars = limit(characters, ids.character_ids, autoChars, 4);
  const names = pickedChars.map((item) => String(item.name || "").trim()).filter(Boolean);
  const byMention = (list) => () => list.filter((row) => mentions(row, names));
  return {
    characters: pickedChars,
    worlds: limit(worlds, ids.world_ids, () => worlds.slice(0, 2), 3),
    foreshadows: limit(ranked, ids.foreshadow_ids, () => ranked, 4),
    relations: limit(book.relations || [], ids.relation_ids, byMention(book.relations || []), 2),
    places: limit(book.places || [], ids.place_ids, byMention(book.places || []), 2),
    items: limit(book.items || [], ids.item_ids, byMention(book.items || []), 2),
  };
}

export function cardIds(cards) {
  return {
    character_ids: cards.characters.map((item) => item.id),
    world_ids: cards.worlds.map((item) => item.id),
    foreshadow_ids: cards.foreshadows.map((item) => item.id),
    relation_ids: cards.relations.map((item) => item.id),
    place_ids: cards.places.map((item) => item.id),
    item_ids: cards.items.map((item) => item.id),
  };
}

export function currentPlan(book) {
  const segment = segmentFor(book);
  if (segment) {
    return {
      kind: "segment",
      key: "segment",
      label: `续写段 ${Math.round(segment.start_words / 10000)}–${Math.round(segment.end_words / 10000)} 万`,
      summary: segment.goal || "",
      close: segment.summary || "",
      closing: segmentClosing(book),
      milestones: (segment.milestones || []).filter((item) => !item.done),
      segment,
    };
  }
  const key = stageForWords(book.word_count || 0);
  const beat = (book.beats || []).find((item) => item.stage === key) || book.beats?.[0];
  const meta = STAGES.find((item) => item.key === key);
  return {
    kind: "stage",
    key,
    label: `${beat?.title || meta?.title || key}（${meta?.range || ""}）`,
    summary: beat?.summary || "",
    closing: Boolean(closureMode(book.word_count || 0)),
    milestones: (beat?.milestones || []).filter((item) => !item.done),
    beat,
  };
}

export function chapterGoal(book) {
  const plan = currentPlan(book);
  const due = rankForeshadows(
    (book.foreshadows || []).filter((item) => item.kind !== "drop" && item.status !== "closed"),
    book.word_count || 0,
  );
  const next = plan.milestones[0];
  const nextText = next ? `下一个里程碑：${next.text}。` : "";
  if (plan.kind === "segment") {
    if (plan.closing) {
      const hook = due[0] ? `必须收掉这个坑：${due[0].setup}。` : "";
      return `${hook}段末收束：${plan.close || plan.summary || "收束本段核心冲突"}`;
    }
    return `${plan.summary || "推进续写段目标"}。${nextText}`.trim();
  }
  if (plan.closing && due[0]) return `必须收掉这个坑：${due[0].setup}。阶段：${plan.summary}`;
  return `${plan.summary || "推进当前简介，章末留钩子。"}${nextText ? `\n${nextText}` : ""}`;
}

export function applyForeshadowUpdates(book, items, nextId, source = "") {
  if (!book.foreshadows) book.foreshadows = [];
  const fresh = [];
  for (const item of items || []) {
    const found = book.foreshadows.find((entry) => entry.setup === item.setup);
    if (found) {
      found.status = item.status;
      if (item.note) found.note = item.note;
    } else if (item.status !== "closed") {
      fresh.push({ kind: "foreshadow", name: item.setup, card: item.note || "", payoff_at: item.payoff_at || "30万" });
    }
  }
  addPendingCards(book, fresh, nextId, source);
}

function clipStory(text) {
  return String(text || "").trim().slice(0, STORY_MAX_CHARS);
}

export function stampThrough(book) {
  const story = { ...emptyStory(), ...(book.story || {}) };
  story.through = (book.chapters || []).length;
  story.updated_at = nowIso();
  book.story = story;
}

function stampPrompt(book, step) {
  const prev = book.prompt_state || { step: "", revision: 0, prepared_at: "" };
  book.prompt_state = {
    step,
    revision: (Number(prev.revision) || 0) + 1,
    prepared_at: nowIso(),
  };
  return book.prompt_state;
}

function acceptanceWarning(book) {
  const last = (book.chapters || []).at(-1);
  if (last && !last.accepted) {
    return `第 ${last.number} 章还没验收。可以继续准备下一章，但未验收章不能当成已发布。`;
  }
  return "";
}

function stepReason(book, step) {
  const count = (book.chapters || []).length;
  const plan = currentPlan(book);
  if (step === "setup") return "还没有完整设定。";
  if (step === "outline_repair") {
    const missing = missingBeatKeys(book).map((key) => STAGES.find((item) => item.key === key)?.title || key);
    return `缺大纲：${missing.join("、")}`;
  }
  if (step === "segment_outline") return `${plan.label} 还没有大纲。`;
  if (step === "redo") {
    const nums = (book.chapters || []).filter((item) => item.dirty).map((item) => item.number);
    return `第 ${nums.join("、")} 章改过稿，先重整。`;
  }
  if (step === "memory") {
    return book.story?.force_memory ? "重大转折，重写完整前情。" : `已写满 ${count} 章，重写完整前情。`;
  }
  if (step === "changes") return `已写满 ${count} 章，先整理变化清单。`;
  return `准备第 ${(book.chapters?.at?.(-1)?.number || 0) + 1} 章 · ${plan.label}${plan.closing ? " · 收束中" : ""}`;
}

export function buildPrompt(book, ids = {}) {
  const step = decideStep(book);
  const cards = pickCards(book, ids);
  const plan = currentPlan(book);
  let text = "";
  if (step === "setup") text = setupPrompt(book.direction || book.pitch || "（还没有方向）");
  else if (step === "outline_repair") text = outlineRepairPrompt(book);
  else if (step === "segment_outline") text = segmentOutlinePrompt(book, segmentFor(book));
  else if (step === "redo") text = redoPrompt(book);
  else if (step === "memory") text = memoryPrompt(book);
  else if (step === "changes") text = changeListPrompt(book);
  else text = formatChapterPrompt(book, chapterGoal(book), cards, plan);
  const state = store.mutate((data) => {
    const raw = data.books.find((item) => item.id === book.id);
    if (!raw) return { step: "", revision: 0, prepared_at: "" };
    return stampPrompt(raw, step);
  });
  const warning = step === "chapter" ? acceptanceWarning(book) : "";
  return {
    book_id: book.id,
    step,
    label: LABELS[step],
    text,
    revision: state.revision,
    warning,
    stage: plan.key,
    stage_label: plan.label,
    chapter_number: (book.chapters?.at?.(-1)?.number || 0) + (step === "chapter" ? 1 : 0),
    reason: stepReason(book, step),
    can_undo: Boolean(book.undo || book.can_undo),
    cards: cardIds(cards),
  };
}

function libraryRows(list, data) {
  return list.map((item) => ({ id: data.childSeq++, ...item }));
}

function mergeMilestones(owner, list, data, { replace }) {
  if (!list?.length) return;
  if (!replace && (owner.milestones || []).length) return;
  owner.milestones = list.map((item) => ({ id: data.childSeq++, ...item }));
}

export function applySetup(bookId, parsed) {
  return store.mutate((data) => {
    const book = data.books.find((item) => item.id === bookId);
    if (!book) return null;
    if (parsed.title) book.title = parsed.title;
    if (parsed.genre) book.genre = parsed.genre;
    if (parsed.direction) book.direction = parsed.direction;
    if (parsed.pitch) book.pitch = parsed.pitch;
    if (parsed.characters.length) {
      book.characters = parsed.characters.map((item) => ({ id: data.childSeq++, tags: "", ...item }));
    }
    if (parsed.worlds.length) book.world_entries = libraryRows(parsed.worlds, data);
    if (parsed.foreshadows.length) {
      book.foreshadows = parsed.foreshadows.map((item) => ({ id: data.childSeq++, note: "", ...item }));
    }
    if (parsed.relations?.length) book.relations = libraryRows(parsed.relations, data);
    if (parsed.places?.length) book.places = libraryRows(parsed.places, data);
    if (parsed.items?.length) book.items = libraryRows(parsed.items, data);
    for (const beat of book.beats || []) {
      if (parsed.beats[beat.stage]) beat.summary = parsed.beats[beat.stage];
      mergeMilestones(beat, parsed.milestones?.[beat.stage], data, { replace: true });
    }
    stampThrough(book);
    book.story.setup_done = hasCompleteSetup(book);
    book.updated_at = nowIso();
    return book;
  });
}

export function applyOutlineRepair(bookId, parsed) {
  return store.mutate((data) => {
    const book = data.books.find((item) => item.id === bookId);
    if (!book) return null;
    for (const beat of book.beats || []) {
      if (parsed.beats[beat.stage]) beat.summary = parsed.beats[beat.stage];
      mergeMilestones(beat, parsed.milestones?.[beat.stage], data, { replace: false });
    }
    stampThrough(book);
    book.story.setup_done = hasCompleteSetup(book);
    book.updated_at = nowIso();
    return book;
  });
}

export function applySegmentOutline(bookId, segmentId, parsed) {
  return store.mutate((data) => {
    const book = data.books.find((item) => item.id === bookId);
    const segment = (book?.segments || []).find((item) => item.id === segmentId);
    if (!segment) return null;
    segment.goal = parsed.goal;
    segment.summary = parsed.summary;
    segment.milestones = parsed.milestones.map((item) => ({ id: data.childSeq++, ...item }));
    segment.outlined = true;
    book.updated_at = nowIso();
    return segment;
  });
}

export function applyMemory(bookId, parsed) {
  store.mutate((data) => {
    const book = data.books.find((item) => item.id === bookId);
    if (!book) return;
    book.story = {
      ...emptyStory(),
      ...(book.story || {}),
      summary: clipStory(parsed.summary),
      facts: clipStory(parsed.facts || parsed.summary),
      character_state: clipStory(parsed.character_state),
      recent: clipStory(parsed.recent || book.story?.recent || ""),
      force_memory: false,
      setup_done: true,
    };
    stampThrough(book);
    const nextId = () => data.childSeq++;
    applyForeshadowUpdates(book, parsed.foreshadows, nextId, "完整前情");
    addPendingCards(book, parsed.cards, nextId, "完整前情");
    book.updated_at = nowIso();
  });
}

export function applyChanges(bookId, parsed, { redo = false } = {}) {
  store.mutate((data) => {
    const book = data.books.find((item) => item.id === bookId);
    if (!book) return;
    const story = { ...emptyStory(), ...(book.story || {}) };
    if (parsed.changes && parsed.changes !== "无") {
      story.facts = clipStory(`${story.facts || ""}\n${parsed.changes}`.trim());
      story.summary = clipStory(`${story.summary || ""}\n${parsed.changes}`.trim());
    }
    if (parsed.people && parsed.people !== "无") story.character_state = clipStory(parsed.people);
    if (parsed.recent && !redo) story.recent = clipStory(parsed.recent);
    book.story = story;
    if (!redo) stampThrough(book);
    else story.updated_at = nowIso();
    const source = redo ? "改稿重整" : "变化清单";
    const nextId = () => data.childSeq++;
    applyForeshadowUpdates(book, parsed.foreshadows, nextId, source);
    addPendingCards(book, parsed.cards, nextId, source);
    const byNumber = new Map((parsed.digests || []).map((item) => [item.number, item.digest]));
    for (const chapter of book.chapters || []) {
      if (byNumber.has(chapter.number)) chapter.digest = byNumber.get(chapter.number);
      if (redo) chapter.dirty = false;
    }
    book.updated_at = nowIso();
  });
}

function canAddChapter(book, words) {
  if (book.status === "closing") {
    if ((book.close_chapters_done || 0) >= SHORT_CLOSE_CHAPTERS_MAX) {
      return "短收尾已写满上限，不能再加章。";
    }
    return null;
  }
  if (book.word_count + words > book.word_cap) {
    return "加上这一章会超过本段字数上限。";
  }
  return null;
}

export function assertCanWriteChapter(book) {
  let message = "";
  if (book.status === "stopped") message = "已停更。若要短收尾，先把状态改成「短收尾」。";
  else if (book.status === "candidate") message = "候选书还没进入在产。先点「开始写正文」占槽，再写正文。";
  else if (book.status === "observing" || book.status === "watch") message = "观察期内不加更。先录入数据并裁决。";
  else if (book.status === "closing") {
    if ((book.close_chapters_done || 0) >= SHORT_CLOSE_CHAPTERS_MAX) message = "短收尾已写满上限，请标为已停更。";
  } else if (book.status === "drafting" && book.word_count >= book.word_cap) {
    message = "字数已到本段上限，进入观察，不能再写章。";
  } else if (book.status !== "drafting" && book.status !== "closing") {
    message = "只有在产或短收尾状态可以写章节。";
  }
  if (message) {
    const err = new Error(message);
    err.status = 409;
    throw err;
  }
}

export function forceMemory(bookId) {
  store.mutate((data) => {
    const book = data.books.find((item) => item.id === Number(bookId));
    if (!book) return;
    book.story = { ...emptyStory(), ...(book.story || {}), force_memory: true };
    book.updated_at = nowIso();
  });
  return buildPrompt(store.getBook(bookId));
}

function bad(message, status = 400) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function acceptPaste(bookId, text, expected = {}) {
  const book = store.getBook(bookId);
  if (!book) throw bad("找不到这本书。", 404);
  const raw = String(text || "").trim();
  if (!raw) throw bad("先把豆包的回复贴进来。");
  const step = decideStep(book);
  if (expected.step && expected.step !== step) {
    throw bad("提示词已过期。请先点「准备下一段提示词」，再贴回对应回复。", 409);
  }
  if (expected.revision != null && Number(expected.revision) !== Number(book.prompt_state?.revision || 0)) {
    throw bad("提示词已过期。请先点「准备下一段提示词」，再贴回对应回复。", 409);
  }
  let warning = "";
  if (step === "setup") {
    const parsed = parseSetup(raw);
    if (!parsed.pitch && !parsed.title) throw bad("这不像设定。请贴豆包按提示词原样返回的内容，不要改格式。");
    const pitchErr = pitchLengthMessage(parsed.pitch, { required: true });
    if (pitchErr) throw bad(pitchErr);
    store.snapshotBook(bookId);
    applySetup(bookId, parsed);
    if (!hasCompleteSetup(store.getBook(bookId))) {
      warning = "设定还没写齐（人物、世界、六阶段大纲、伏笔都要有）。下一段会继续要设定或补大纲。";
    }
  } else if (step === "outline_repair") {
    const parsed = parseSetup(raw);
    const preview = {
      ...book,
      beats: (book.beats || []).map((item) => ({ ...item, summary: parsed.beats[item.stage] || item.summary })),
    };
    if (needsOutlineRepair(preview)) {
      throw bad(`大纲仍缺：${missingBeatKeys(preview).join("、")}。请按六阶段格式贴回。`);
    }
    store.snapshotBook(bookId);
    applyOutlineRepair(bookId, parsed);
  } else if (step === "segment_outline") {
    const parsed = parseSegmentOutline(raw);
    if (!parsed.goal) throw bad("这不像续写段大纲。请贴豆包按 GOAL / MILESTONE / CLOSE 格式返回的内容。");
    store.snapshotBook(bookId);
    applySegmentOutline(bookId, segmentFor(book).id, parsed);
  } else if (step === "redo") {
    if (!/CHAPTERS:/i.test(raw) && !/CHANGES:/i.test(raw)) throw bad("这不像重整结果。请贴豆包按提示词原样返回的内容。");
    store.snapshotBook(bookId);
    applyChanges(bookId, parseChanges(raw), { redo: true });
  } else if (step === "memory") {
    const parsed = parseMemory(raw);
    if (!parsed.summary && !parsed.character_state) throw bad("这不像前情更新。请贴豆包按提示词原样返回的内容。");
    store.snapshotBook(bookId);
    applyMemory(bookId, parsed);
  } else if (step === "changes") {
    if (!/CHANGES:/i.test(raw) && !/FORESHADOW:/i.test(raw) && !/CHAPTERS:/i.test(raw)) {
      throw bad("这不像变化清单。请贴豆包按提示词原样返回的内容。");
    }
    store.snapshotBook(bookId);
    applyChanges(bookId, parseChanges(raw));
  } else {
    assertCanWriteChapter(book);
    const [title, body] = parseChapter(raw);
    const { cards: suggestions } = splitChapterCards(raw);
    const words = countWords(body);
    if (words < CHAPTER_MIN_WORDS || words > CHAPTER_MAX_WORDS) {
      warning = `本章 ${words} 字，建议 ${CHAPTER_MIN_WORDS}～${CHAPTER_MAX_WORDS} 字。已照常贴回。`;
    }
    const blocked = canAddChapter(book, words);
    if (blocked) throw bad(blocked, 409);
    store.snapshotBook(bookId);
    const number = (book.chapters.at(-1)?.number || 0) + 1;
    const plan = currentPlan(book);
    const used = cardIds(pickCards(book, expected));
    store.addChild(bookId, "chapters", {
      number,
      title,
      goal: chapterGoal(book),
      stage: plan.label,
      body,
      digest: "",
      dirty: false,
      card_suggestions: suggestions.map((item) => ({ ...item, chapter_number: number })),
      word_count: words,
      accepted: false,
      ...used,
      created_at: nowIso(),
    });
    if (suggestions.length) {
      warning = `${warning ? `${warning} ` : ""}本章带了 ${suggestions.length} 条新卡片建议，验收时会进待确认。`;
    }
    if (book.status === "closing") {
      store.updateBook(bookId, { close_chapters_done: (book.close_chapters_done || 0) + 1 });
    } else {
      store.maybeObserve(bookId);
    }
  }
  const fresh = store.getBook(bookId);
  return { book: fresh, next: buildPrompt(fresh), applied: step, warning };
}

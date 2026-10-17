import { STAGES, STORY_MAX_CHARS } from "./playbook.js";
import { parseCardLines } from "./cards.js";

export const CARD_BLOCK = "===卡片===";
const CARD_BLOCK_RE = /^\s*={2,}\s*卡片\s*={2,}\s*$/m;

export function chapterExcerpt(body, head = 200, tail = 400) {
  const text = String(body || "");
  if (text.length <= head + tail + 10) return text;
  return `${text.slice(0, head)}\n……\n${text.slice(-tail)}`;
}

function formatCards(items, nameKey, bodyKey) {
  if (!items?.length) return "（无）";
  return items.map((item) => `- ${item[nameKey] || ""}：${item[bodyKey] || item.card || item.note || ""}`).join("\n");
}

function formatMilestones(list) {
  if (!list?.length) return "（无）";
  return list.map((item) => `- ${item.text}${item.target_words ? `（约 ${Math.round(item.target_words / 10000)} 万字）` : ""}`).join("\n");
}

export function chapterPrompt(book, goal, cards = {}, plan = {}) {
  const story = book.story || {};
  const people = cards.characters?.length
    ? formatCards(cards.characters, "name", "card")
    : (book.characters || [])
        .slice(0, 4)
        .map((item) => `- ${item.name}（${item.role || "人物"}）：${item.card || ""}`)
        .join("\n");
  const worlds = formatCards(cards.worlds || (book.world_entries || []).slice(0, 2), "name", "card");
  const hooks = (cards.foreshadows || []).length
    ? formatCards(cards.foreshadows, "setup", "note")
    : (book.foreshadows || [])
        .filter((item) => item.status !== "closed" && item.kind !== "drop")
        .slice(0, 4)
        .map((item) => `- ${item.setup}（最晚 ${item.payoff_at || "30万字"}）`)
        .join("\n");
  const extras = [
    cards.relations?.length ? `本章关系：\n${formatCards(cards.relations, "name", "card")}` : "",
    cards.places?.length ? `本章地点势力：\n${formatCards(cards.places, "name", "card")}` : "",
    cards.items?.length ? `本章道具：\n${formatCards(cards.items, "name", "card")}` : "",
  ]
    .filter(Boolean)
    .join("\n");
  const tail = book.chapters?.at?.(-1)?.body?.slice(-500) || "（这是第一章）";
  const number = (book.chapters?.at?.(-1)?.number || 0) + 1;
  const close = String(goal || "").includes("必须收") ? "这一章要收掉上面点名的坑，不要再开更大的坑。\n" : "";
  const recent =
    story.recent ||
    (book.chapters || [])
      .slice(-3)
      .map((item) => `第${item.number}章 ${item.title || ""}：${item.digest || chapterExcerpt(item.body, 80, 80)}`)
      .join("\n") ||
    "（尚无）";
  return `你在写中文网文测书的第 ${number} 章。只写这一章，1800 到 2500 字。不要写作说明。
${close}
简介：${book.pitch || book.direction || ""}
当前累计字数：${book.word_count || 0}
当前阶段：${plan.label || ""}
本章必须推进：${goal}
本阶段未完成的里程碑：
${formatMilestones(plan.milestones)}

硬事实（只信这份）：
${story.facts || story.summary || "（尚无）"}
前情：
${story.summary || "（尚无）"}
人物状态：
${story.character_state || people || "（尚无）"}
最近三章：
${recent}
本章人物：
${people || "（无）"}
本章世界规则：
${worlds}
本章要收或避开的伏笔：
${hooks || "（无）"}
${extras}

上一章结尾：
${tail}

第一行写「标题：xxxx」，从第二行起写正文。
正文写完后，另起一行写「${CARD_BLOCK}」，下面列本章新出现、上面卡片里没有的内容，每行一条，没有就写「无」：
人物｜名字｜身份｜一句话卡片
规则｜名字｜说明
伏笔｜埋设内容｜预计回收字数
关系｜A—B｜关系与变化
地点｜名字｜说明
道具｜名字｜说明与代价`;
}

const CARD_SECTIONS = `WORLD:
（新出现的规则，每行：规则名｜说明；无写「无」）
RELATION:
（新的或变化的关系，每行：A—B｜关系；无写「无」）
PLACE:
（新地点或势力，每行：名字｜说明；无写「无」）
ITEM:
（新道具或金手指，每行：名字｜说明；无写「无」）`;

export function changeListPrompt(book) {
  const recent = (book.chapters || [])
    .slice(-3)
    .map((item) => `第${item.number}章 ${item.title}\n${chapterExcerpt(item.body)}`)
    .join("\n\n");
  return `根据最近三章，只列变化清单。不要写正文，不要整篇重写前情。严格用下面格式：

CHAPTERS:
（每行：第n章｜80到120字摘要，写清章末变化）
CHANGES:
（新增事实，每行一条；无变化写「无」）
PEOPLE:
（每人一行：名字｜现在在哪、要什么、关系变化；无变化写「无」）
FORESHADOW:
（每行：open或closed｜伏笔原文｜备注；无变化写「无」）
${CARD_SECTIONS}

最近章节：
${recent}`;
}

export function redoPrompt(book) {
  const dirty = (book.chapters || []).filter((item) => item.dirty);
  const text = dirty.map((item) => `第${item.number}章 ${item.title}\n${chapterExcerpt(item.body, 400, 600)}`).join("\n\n");
  return `下面这些章节被作者改过稿。只根据改后的正文重新整理，不要写正文。严格用下面格式：

CHAPTERS:
（每行：第n章｜80到120字摘要，写清章末变化）
CHANGES:
（改稿后新增或推翻的事实，每行一条；推翻的写「推翻：原事实」；无变化写「无」）
PEOPLE:
（每人一行：名字｜现在在哪、要什么、关系变化；无变化写「无」）
FORESHADOW:
（每行：open或closed｜伏笔原文｜备注；无变化写「无」）
${CARD_SECTIONS}

已有前情：
${book.story?.summary || "（无）"}
改过的章节：
${text}`;
}

export function memoryPrompt(book) {
  const recent = (book.chapters || [])
    .slice(-3)
    .map((item) => `第${item.number}章 ${item.title}\n${chapterExcerpt(item.body)}`)
    .join("\n\n");
  const openHooks = (book.foreshadows || []).filter((item) => item.status !== "closed");
  return `根据已有结构化前情和最近三章，重写完整故事状态。不要写正文。严格用下面格式：

FACTS:
（仍有效的硬事实，条目化）
SUMMARY:
（叙述前情，总共控制在 ${STORY_MAX_CHARS} 字内）
PEOPLE:
（每人一行：名字｜现在在哪、要什么、关系变化）
FORESHADOW:
（每行：open或closed｜伏笔原文｜备注）
RECENT:
（最近三章各一行摘要）
${CARD_SECTIONS}

已有前情：
${book.story?.summary || "（无）"}
已有硬事实：
${book.story?.facts || "（无）"}
已有伏笔：
${openHooks.map((item) => `${item.status}|${item.setup}`).join("\n") || "（无）"}
最近章节：
${recent}`;
}

function stageBlock() {
  return STAGES.map(
    (item) => `STAGE:${item.key}
SUMMARY:${item.range}必须交付：${item.must}
MILESTONE:本阶段关键事件｜目标字数（如 50000，可写 1～3 行）`,
  ).join("\n");
}

export function setupPrompt(direction) {
  return `根据这个方向，生成一本中文网文测书设定：30 万字是首轮裁决点，核心事件必须闭环，但不是强制完本。不要写正文。严格按格式输出。PITCH 必须约 60 字（50～70 字）。必须写出全部六阶段，每阶段写 1～3 个里程碑。

方向：${direction}

TITLE:书名
TAGS:标签（类型，如都市脑洞）
THEME:主题（一句话方向）
PITCH:简介（约60字，写清谁、处境、要什么、阻碍）
CHARACTER:名字｜主角或对手｜欲望、把柄、不能做的事
CHARACTER:名字｜对手｜欲望、把柄、不能做的事
WORLD:规则名｜本章会用到的规则
FORESHADOW:must｜本卷必收的坑｜10万或30万
FORESHADOW:drop｜可弃的坑｜无
RELATION:A—B｜关系（可省略）
PLACE:地点或势力｜说明（可省略）
ITEM:道具或金手指｜说明与代价（可省略）
${stageBlock()}`;
}

export function outlineRepairPrompt(book) {
  const existing = (book.beats || [])
    .map((item) => `${item.stage}｜${item.title}｜${item.summary || "（缺）"}`)
    .join("\n");
  return `这本书已有部分大纲，请补齐六阶段。已有内容可润色但不要推翻。不要写正文。严格按格式输出每一段 STAGE、SUMMARY，每阶段写 1～3 个 MILESTONE。

已有大纲：
${existing || "（无）"}

简介：${book.pitch || ""}

${stageBlock()}`;
}

export function segmentOutlinePrompt(book, segment) {
  const words = segment ? segment.end_words - segment.start_words : 0;
  return `这本书数据好，决定续写约 ${Math.round(words / 10000)} 万字（从 ${segment?.start_words || 0} 字写到 ${segment?.end_words || 0} 字）。请给这一段写大纲，不要写正文。最后 2 万字必须收束本段核心冲突，可以留更高层的谜。严格按格式：

GOAL:本段目标（一句话）
MILESTONE:关键事件｜目标累计字数
MILESTONE:关键事件｜目标累计字数
CLOSE:段末如何收束；数据好怎么再续，数据差怎么短收尾

简介：${book.pitch || ""}
已有前情：
${book.story?.summary || "（无）"}
本卷结局：
${(book.beats || []).find((item) => item.stage === "volume_end")?.summary || "（无）"}`;
}

export function parseMilestoneLine(text) {
  const [label, target] = String(text || "").split(/[｜|]/).map((item) => (item || "").trim());
  if (!label || label === "无") return null;
  const digits = String(target || "").match(/(\d+(?:\.\d+)?)\s*万/);
  const plain = String(target || "").match(/(\d{4,})/);
  const targetWords = digits ? Math.round(Number(digits[1]) * 10000) : plain ? Number(plain[1]) : 0;
  return { text: label, target_words: targetWords, done: false };
}

export function parseSetup(raw) {
  const lines = String(raw).replaceAll("\r\n", "\n").split("\n");
  const out = {
    title: "",
    genre: "",
    direction: "",
    pitch: "",
    characters: [],
    worlds: [],
    foreshadows: [],
    relations: [],
    places: [],
    items: [],
    beats: {},
    milestones: {},
  };
  let stage = "";
  const pair = (text, size) => text.slice(size).split(/[｜|]/).map((item) => (item || "").trim());
  for (const line of lines) {
    const text = line.trim();
    if (!text) continue;
    const upper = text.toUpperCase();
    if (upper.startsWith("TITLE:") && !out.title) out.title = text.slice(6).trim();
    else if (upper.startsWith("TAGS:") || upper.startsWith("GENRE:")) out.genre = text.slice(text.indexOf(":") + 1).trim();
    else if (upper.startsWith("THEME:")) out.direction = text.slice(6).trim();
    else if (upper.startsWith("PITCH:")) out.pitch = text.slice(6).trim();
    else if (upper.startsWith("CHARACTER:")) {
      const [name, role, card] = pair(text, 10);
      if (name) out.characters.push({ name, role: role || "", card: card || "" });
    } else if (upper.startsWith("WORLD:")) {
      const [name, card] = pair(text, 6);
      if (name) out.worlds.push({ name, card: card || "" });
    } else if (upper.startsWith("RELATION:")) {
      const [name, card] = pair(text, 9);
      if (name && name !== "无") out.relations.push({ name, card: card || "" });
    } else if (upper.startsWith("PLACE:")) {
      const [name, card] = pair(text, 6);
      if (name && name !== "无") out.places.push({ name, card: card || "" });
    } else if (upper.startsWith("ITEM:")) {
      const [name, card] = pair(text, 5);
      if (name && name !== "无") out.items.push({ name, card: card || "" });
    } else if (upper.startsWith("FORESHADOW:")) {
      const [kind, setup, payoff] = pair(text, 11);
      if (setup) {
        out.foreshadows.push({
          kind: kind === "drop" ? "drop" : "must",
          setup,
          payoff_at: payoff || "30万",
          status: "open",
        });
      }
    } else if (upper.startsWith("STAGE:")) {
      stage = text.slice(6).trim().toLowerCase();
      out.beats[stage] = out.beats[stage] || "";
    } else if (upper.startsWith("MILESTONE:") && stage) {
      const milestone = parseMilestoneLine(text.slice(10));
      if (milestone) (out.milestones[stage] ||= []).push(milestone);
    } else if (upper.startsWith("SUMMARY:") && stage) {
      out.beats[stage] = text.slice(8).trim();
    } else if (stage) {
      out.beats[stage] = `${out.beats[stage] || ""}\n${text}`.trim();
    }
  }
  return out;
}

export function parseSegmentOutline(raw) {
  const bags = sectionLines(raw, ["GOAL", "MILESTONE", "CLOSE"]);
  return {
    goal: bags.GOAL.join("\n").trim(),
    milestones: bags.MILESTONE.map(parseMilestoneLine).filter(Boolean),
    summary: bags.CLOSE.join("\n").trim(),
  };
}

function sectionLines(raw, names) {
  const lines = String(raw).replaceAll("\r\n", "\n").split("\n");
  let mode = "";
  const bags = Object.fromEntries(names.map((name) => [name, []]));
  for (const line of lines) {
    const text = line.trim();
    const upper = text.toUpperCase();
    const hit = names.find((name) => upper.startsWith(`${name}:`));
    if (hit) {
      mode = hit;
      const rest = text.slice(hit.length + 1).trim();
      if (rest) bags[hit].push(rest);
      continue;
    }
    if (!text || !mode) continue;
    bags[mode].push(text);
  }
  return bags;
}

function parseForeshadowLines(lines) {
  return lines
    .map((text) => {
      if (text === "无") return null;
      const [status, setup, note] = text.split(/[｜|]/).map((item) => (item || "").trim());
      if (!setup) return null;
      return { status: status === "closed" ? "closed" : "open", setup, note: note || "" };
    })
    .filter(Boolean);
}

function cardSuggestionsFrom(bags) {
  const pairLines = (lines, label) =>
    lines.filter((line) => line !== "无").map((line) => `${label}｜${line}`);
  const people = (bags.PEOPLE || [])
    .filter((line) => line !== "无")
    .map((line) => {
      const [name, ...rest] = line.split(/[｜|]/).map((item) => item.trim());
      return `人物｜${name}｜｜${rest.join("｜")}`;
    });
  return parseCardLines([
    ...people,
    ...pairLines(bags.WORLD || [], "规则"),
    ...pairLines(bags.RELATION || [], "关系"),
    ...pairLines(bags.PLACE || [], "地点"),
    ...pairLines(bags.ITEM || [], "道具"),
  ]);
}

const CARD_NAMES = ["WORLD", "RELATION", "PLACE", "ITEM"];

export function parseMemory(raw) {
  const bags = sectionLines(raw, ["FACTS", "SUMMARY", "PEOPLE", "FORESHADOW", "RECENT", ...CARD_NAMES]);
  const summary = bags.SUMMARY.join("\n").trim() || bags.FACTS.join("\n").trim();
  return {
    facts: bags.FACTS.join("\n").trim().slice(0, STORY_MAX_CHARS),
    summary: summary.slice(0, STORY_MAX_CHARS),
    character_state: bags.PEOPLE.join("\n").trim().slice(0, STORY_MAX_CHARS),
    recent: bags.RECENT.join("\n").trim().slice(0, STORY_MAX_CHARS),
    foreshadows: parseForeshadowLines(bags.FORESHADOW),
    cards: cardSuggestionsFrom(bags),
  };
}

export function parseChanges(raw) {
  const bags = sectionLines(raw, ["CHAPTERS", "CHANGES", "PEOPLE", "FORESHADOW", ...CARD_NAMES]);
  const digests = bags.CHAPTERS.map((line) => {
    const match = line.match(/第\s*(\d+)\s*章[｜|](.*)/);
    if (!match) return null;
    return { number: Number(match[1]), digest: match[2].trim() };
  }).filter(Boolean);
  return {
    recent: bags.CHAPTERS.join("\n").trim(),
    changes: bags.CHANGES.join("\n").trim(),
    people: bags.PEOPLE.join("\n").trim(),
    foreshadows: parseForeshadowLines(bags.FORESHADOW),
    cards: cardSuggestionsFrom(bags),
    digests,
  };
}

export function splitChapterCards(raw) {
  const text = String(raw || "").replaceAll("\r\n", "\n");
  const match = text.match(CARD_BLOCK_RE);
  if (!match) return { text: text.trim(), cards: [] };
  const body = text.slice(0, match.index).trim();
  const rest = text.slice(match.index + match[0].length);
  return { text: body, cards: parseCardLines(rest.split("\n")) };
}

export function parseChapter(raw) {
  const { text } = splitChapterCards(raw);
  const lines = text.split("\n");
  const first = (lines[0] || "").trim();
  if (first.startsWith("标题：") || first.startsWith("标题:")) {
    return [first.split(/[:：]/).slice(1).join("：").trim() || "未命名", lines.slice(1).join("\n").trim()];
  }
  return ["未命名", text.trim()];
}

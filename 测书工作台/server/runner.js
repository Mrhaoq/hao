import { countWords, hasCompleteSetup, needsOutlineRepair, pitchLengthMessage } from "./playbook.js";
import { NIGHTLY_CHAPTERS, SITES, inWindow, nextSite, nightId } from "./nightly.js";
import {
  applyChanges,
  applyMemory,
  applySetup,
  cardIds,
  chapterGoal,
  currentPlan,
  decideStep,
  pickCards,
} from "./prompt.js";
import {
  changeListPrompt,
  chapterPrompt,
  memoryPrompt,
  parseChanges,
  parseChapter,
  parseMemory,
  parseSetup,
  redoPrompt,
  setupPrompt,
  splitChapterCards,
} from "./setup-text.js";
import * as store from "./store.js";
import { SiteBlocked, ask } from "./webchat.js";

let running = false;
let stopRequested = false;
let timer = null;

function blankJob() {
  return {
    nightId: "",
    bookId: null,
    chaptersTonight: 0,
    status: "idle",
    message: "还没开始。",
    blocked: [],
  };
}

export function nightlyStatus() {
  const saved = store.getSettings().nightlyJob || blankJob();
  return { ...blankJob(), ...saved, running };
}

function saveJob(patch) {
  const current = nightlyStatus();
  store.setSettings({ nightlyJob: { ...current, ...patch, running: undefined } });
}

export function requestStop() {
  stopRequested = true;
  saveJob({ status: "stopped", message: "已请求停止，当前这一章结束后停下。" });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function gap() {
  return 120_000 + Math.floor(Math.random() * 60_000);
}

export async function generateSetup(bookId, direction) {
  const book = store.getBook(bookId);
  if (!book) throw new Error("找不到这本书。");
  const text = direction || book.direction || book.pitch;
  if (!String(text || "").trim()) throw new Error("先写一句方向。");
  if (direction) store.updateBook(bookId, { direction });
  const setup = await askChain(nightlyStatus(), setupPrompt(text));
  if (!setup) throw new Error("三家网页都没能生成设定。请先登录，或等明天再试。");
  const parsed = parseSetup(setup.text);
  if (!parsed.pitch && !parsed.title) throw new Error("网页没有按设定格式返回。");
  applySetup(bookId, parsed);
  saveJob({ blocked: setup.blocked, message: `设定来自 ${setup.site}。` });
  return store.getBook(bookId);
}

async function askChain(job, prompt) {
  const blocked = new Set(job.blocked || []);
  let index = nextSite(job.chaptersTonight % SITES.length, blocked);
  while (index >= 0) {
    const site = SITES[index];
    try {
      const text = await ask(site, prompt);
      return { text, site, blocked: [...blocked] };
    } catch (err) {
      if (!(err instanceof SiteBlocked) && !err.blocked) throw err;
      blocked.add(site);
      saveJob({ blocked: [...blocked], message: err.message });
      index = nextSite(index + 1, blocked);
    }
  }
  return null;
}

export async function runNight(reason = "schedule") {
  if (running) return nightlyStatus();
  if (!inWindow() && reason === "schedule") return nightlyStatus();
  const books = store.listBooks().filter((b) => b.nightly && b.status === "drafting");
  const book = books[0];
  if (!book) return nightlyStatus();
  if (book.word_count >= book.word_cap) {
    store.maybeObserve(book.id);
    saveJob({ status: "done", message: "字数已到本卷上限，进入观察。" });
    return nightlyStatus();
  }
  const id = nightId();
  const previous = nightlyStatus();
  const sameNight = previous.nightId === id && previous.bookId === book.id;
  if (sameNight && (previous.status === "done" || previous.status === "stopped")) return nightlyStatus();
  const chaptersTonight = sameNight ? previous.chaptersTonight || 0 : 0;
  const blocked = sameNight ? previous.blocked || [] : [];
  running = true;
  stopRequested = false;
  saveJob({
    nightId: id,
    bookId: book.id,
    chaptersTonight,
    status: "running",
    message: `开始写，原因：${reason}`,
    blocked,
  });
  try {
    let current = store.getBook(book.id);
    if (!hasCompleteSetup(current) || needsOutlineRepair(current)) {
      saveJob({ status: "error", message: "先贴回完整设定并补齐六阶段大纲，夜间才写正文。" });
      return nightlyStatus();
    }
    while (nightlyStatus().chaptersTonight < NIGHTLY_CHAPTERS) {
      if (stopRequested || (reason === "schedule" && !inWindow())) {
        saveJob({ status: "stopped", message: stopRequested ? "你停下了。" : "已经离开低峰时段。" });
        break;
      }
      current = store.getBook(book.id);
      if (current.word_count >= current.word_cap) {
        store.maybeObserve(book.id);
        saveJob({ status: "done", message: "写到本卷字数上限。" });
        break;
      }
      const pending = decideStep(current);
      if (pending === "changes" || pending === "memory" || pending === "redo") {
        const prompt =
          pending === "memory" ? memoryPrompt(current) : pending === "redo" ? redoPrompt(current) : changeListPrompt(current);
        const maintain = await askChain(nightlyStatus(), prompt);
        if (maintain) {
          if (pending === "memory") applyMemory(book.id, parseMemory(maintain.text));
          else applyChanges(book.id, parseChanges(maintain.text), { redo: pending === "redo" });
        } else {
          saveJob({ status: "stopped", message: "变化清单、前情或改稿重整没写上，今晚停笔，避免跳过维护。" });
          break;
        }
        continue;
      }
      if (pending !== "chapter") {
        saveJob({ status: "error", message: "先补设定、六阶段大纲或续写段大纲，再夜间写章。" });
        break;
      }
      const goal = chapterGoal(current);
      const cards = pickCards(current);
      const plan = currentPlan(current);
      const result = await askChain(nightlyStatus(), chapterPrompt(current, goal, cards, plan));
      if (!result) {
        saveJob({ status: "stopped", message: "三家网页都撞墙或需要验证，今晚停笔。明天再试。" });
        break;
      }
      const [title, body] = parseChapter(result.text);
      const { cards: suggestions } = splitChapterCards(result.text);
      const words = countWords(body);
      const number = (current.chapters.at(-1)?.number || 0) + 1;
      store.addChild(book.id, "chapters", {
        number,
        title,
        goal,
        stage: plan.label,
        body,
        digest: "",
        dirty: false,
        card_suggestions: suggestions.map((item) => ({ ...item, chapter_number: number })),
        word_count: words,
        accepted: false,
        ...cardIds(cards),
        created_at: new Date().toISOString(),
      });
      const done = nightlyStatus().chaptersTonight + 1;
      saveJob({
        chaptersTonight: done,
        blocked: result.blocked,
        message: `第 ${done} / ${NIGHTLY_CHAPTERS} 章，来自 ${result.site}。`,
      });
      store.maybeObserve(book.id);
      if (done < NIGHTLY_CHAPTERS) await sleep(gap());
    }
    if (nightlyStatus().status === "running" && nightlyStatus().chaptersTonight >= NIGHTLY_CHAPTERS) {
      saveJob({ status: "done", message: `今晚 ${NIGHTLY_CHAPTERS} 章写完。` });
    }
  } catch (err) {
    saveJob({ status: "error", message: err.message || "夜间任务失败。" });
  } finally {
    running = false;
  }
  return nightlyStatus();
}

export function startScheduler() {
  if (timer) return;
  const saved = store.getSettings().nightlyJob;
  if (saved?.status === "running") {
    store.setSettings({
      nightlyJob: { ...saved, status: "error", message: "工作台重启过，今晚若还在低峰会自动接着写。" },
    });
  }
  timer = setInterval(() => {
    runNight("schedule").catch((err) => console.error(err));
  }, 60_000);
  runNight("schedule").catch((err) => console.error(err));
}

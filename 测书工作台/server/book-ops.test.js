import fs from "node:fs";
import path from "node:path";
import { acceptPaste, buildPrompt, chapterGoal, decideStep } from "./prompt.js";
import { confirmCards, continueBook, patchChapter, addMilestone, patchMilestone } from "./book-ops.js";
import { parseChapter, parseSetup, splitChapterCards } from "./setup-text.js";
import { segmentClosing, segmentFor } from "./playbook.js";
import * as store from "./store.js";

function assert(cond, label) {
  if (!cond) throw new Error(label);
}

function throwsStatus(fn, status, label) {
  try {
    fn();
  } catch (err) {
    assert(err.status === status, `${label}: expected ${status}, got ${err.status} ${err.message}`);
    return;
  }
  throw new Error(`${label}: expected throw`);
}

// Migration: an old schema-2 book gains every new field and keeps its beats.
const dataFile = path.join(process.env.CESHU_DATA_DIR, "store.json");
fs.writeFileSync(
  dataFile,
  JSON.stringify({
    schemaVersion: 2,
    seq: 2,
    childSeq: 10,
    settings: {},
    books: [
      {
        id: 1,
        title: "旧书",
        pitch: "",
        status: "drafting",
        word_cap: 300000,
        beats: [{ id: 1, stage: "promise", title: "读者承诺", summary: "旧承诺", target_words: 30000 }],
        chapters: [{ id: 2, number: 1, title: "一", body: "正文", word_count: 2 }],
        characters: [],
        world_entries: [],
        foreshadows: [],
        metrics: [],
      },
    ],
  }),
  "utf8",
);
const migrated = store.getBook(1);
assert(migrated.beats.length === 6, "six beats after migration");
assert(migrated.beats.find((b) => b.stage === "promise").summary === "旧承诺", "old beat kept");
assert(migrated.beats.every((b) => Array.isArray(b.milestones)), "milestones array");
for (const key of ["relations", "places", "items", "pending_cards", "segments", "decisions"]) {
  assert(Array.isArray(migrated[key]), `migrated ${key}`);
}
assert(migrated.chapters[0].dirty === false && Array.isArray(migrated.chapters[0].card_suggestions), "chapter fields");
assert(JSON.parse(fs.readFileSync(dataFile, "utf8")).schemaVersion === 3, "schema saved as 3");

// Chapter card block is stripped from the body and parsed.
const raw = `标题：夜单\n${"他把单子送到了门口。".repeat(40)}\n===卡片===\n人物｜老周｜门卫｜知道下单人长相\n道具｜旧手机｜能看到超时记录\n关系｜陈野—老周｜互相提防\n无`;
const [, chapterBody] = parseChapter(raw);
assert(!chapterBody.includes("卡片") && !chapterBody.includes("老周"), "card block stripped");
const { cards } = splitChapterCards(raw);
assert(cards.length === 3 && cards[0].kind === "character" && cards[1].kind === "item", "cards parsed");

// Setup milestones parse.
const setupParsed = parseSetup(`STAGE:promise\nSUMMARY:承诺\nMILESTONE:亮出规则｜2万\nMILESTONE:第一次受祸｜30000`);
assert(setupParsed.milestones.promise.length === 2 && setupParsed.milestones.promise[0].target_words === 20000, "milestones parse");

const pitch =
  "夜班骑手陈野每单超时一分钟，就要替收货人承受一次即将发生的祸。他必须在妹妹那一单截止前，找到那个专门下单转嫁灾祸的人。";
const stages = ["promise", "buildup", "payoff", "pressure", "lock", "volume_end"];
const setupText = `TITLE:卡片测试
PITCH:${pitch}
CHARACTER:陈野｜主角｜想救妹妹
WORLD:超时受祸｜超时一分钟受一次祸
FORESHADOW:must｜下单人身份｜12万
${stages.map((s) => `STAGE:${s}\nSUMMARY:${s} 摘要\nMILESTONE:${s} 事件｜1万`).join("\n")}`;
const book = store.createBook({ title: "卡片测试", pitch });
acceptPaste(book.id, setupText);
let fresh = store.getBook(book.id);
assert(fresh.beats.every((b) => b.milestones.length === 1), "setup milestones applied");
store.updateBook(book.id, { status: "drafting" });

acceptPaste(book.id, raw);
fresh = store.getBook(book.id);
const ch1 = fresh.chapters[0];
assert(ch1.card_suggestions.length === 3, "suggestions stored on chapter");
assert(ch1.stage, "chapter stage recorded");
assert(ch1.character_ids.length >= 1, "used cards recorded");
assert(fresh.pending_cards.length === 0, "nothing pending before acceptance");

const accepted = patchChapter(book.id, ch1.id, { accepted: true });
assert(accepted.promoted === 3, "acceptance promotes suggestions");
fresh = store.getBook(book.id);
assert(fresh.pending_cards.length === 3, "pending after acceptance");
assert(fresh.relations.length === 0, "not in library until confirmed");
confirmCards(book.id, "all");
fresh = store.getBook(book.id);
assert(fresh.pending_cards.length === 0 && fresh.relations.length === 1 && fresh.items.length === 1, "confirm moves to library");
assert(fresh.characters.some((c) => c.name === "老周"), "pending character confirmed");

// Editing the body marks dirty and forces a redo step before anything else.
patchChapter(book.id, ch1.id, { body: `${ch1.body}改了一句。` });
fresh = store.getBook(book.id);
assert(fresh.chapters[0].dirty, "body edit marks dirty");
assert(decideStep(fresh) === "redo", "dirty chapter wants redo");
const redoPrompt = buildPrompt(fresh);
assert(redoPrompt.step === "redo" && redoPrompt.text.includes("改过稿"), "redo prompt");
acceptPaste(book.id, `CHAPTERS:\n第1章｜改稿后摘要\nCHANGES:\n无\nPEOPLE:\n无\nFORESHADOW:\n无\nPLACE:\n夜市｜摊位一条街`);
fresh = store.getBook(book.id);
assert(!fresh.chapters[0].dirty, "redo clears dirty");
assert(fresh.chapters[0].digest === "改稿后摘要", "redo digest");
assert(fresh.story.through === 0, "redo does not bump through");
assert(fresh.pending_cards.some((p) => p.kind === "place" && p.name === "夜市"), "redo cards pending");

// Milestones feed the chapter goal.
const ms = addMilestone(book.id, { beat_id: fresh.beats[0].id, text: "手动里程碑", target_words: 15000 });
patchMilestone(book.id, fresh.beats[0].milestones[0].id, { done: true });
fresh = store.getBook(book.id);
assert(chapterGoal(fresh).includes("手动里程碑"), "next undone milestone in goal");
assert(ms.id, "milestone id");

// Continue: min 5万, default 10万, cost cap unchanged, segment outline required.
throwsStatus(() => continueBook(book.id, { words: 30000 }), 400, "continue below 5万");
const before = store.getBook(book.id);
const cont = continueBook(book.id, { words: undefined, note: "数据好" });
assert(cont.word_cap === before.word_cap + 100000, "default 10万");
assert(cont.cost_cap_yuan === before.cost_cap_yuan, "cost cap unchanged");
assert(cont.segments.length === 1 && cont.decisions.at(-1).words === 100000, "segment and decision recorded");

const seg = {
  word_count: 310000,
  segments: [{ id: 1, start_words: 300000, end_words: 400000, outlined: false, milestones: [] }],
};
assert(segmentFor(seg).id === 1, "segment found");
assert(!segmentClosing(seg), "not closing early");
assert(segmentClosing({ ...seg, word_count: 385000 }), "closing in last 2万");
assert(decideStep({ ...fresh, ...seg, chapters: fresh.chapters, story: { through: 1 } }) === "segment_outline", "segment outline step");

console.log("ok");

import { chapterGoal, decideStep, pickCards, rankForeshadows } from "./prompt.js";
import { acceptPaste, buildPrompt } from "./prompt.js";
import { parseChanges, parseSetup } from "./setup-text.js";
import * as store from "./store.js";

function assert(cond, label) {
  if (!cond) throw new Error(label);
}

const pitch =
  "夜班骑手陈野每单超时一分钟，就要替收货人承受一次即将发生的祸。他必须在妹妹那一单截止前，找到那个专门下单转嫁灾祸的人。";

const setupText = `TITLE:超时一分钟
TAGS:都市脑洞
THEME:外卖骑手超时受祸
PITCH:${pitch}
CHARACTER:陈野｜主角｜想救妹妹，把柄是超时
CHARACTER:下单人｜对手｜转嫁灾祸
WORLD:超时受祸｜超时一分钟受一次祸
FORESHADOW:must｜下单人身份｜12万
FORESHADOW:drop｜可弃支线｜无
STAGE:promise
SUMMARY:三万字内亮出超时规则
STAGE:buildup
SUMMARY:压力升级，为第一次兑现蓄力
STAGE:payoff
SUMMARY:八到十二万字当面兑现
STAGE:pressure
SUMMARY:确认转嫁灾祸的对手
STAGE:lock
SUMMARY:锁定结局路径，停止新must
STAGE:volume_end
SUMMARY:三十万字前抓住下单人；数据好则续，数据差则短收尾
`;

const parsed = parseSetup(setupText);
assert(parsed.title === "超时一分钟", "setup title");
assert(parsed.beats.buildup.includes("蓄力"), "six-stage setup");
assert(parsed.beats.lock.includes("must"), "lock stage");

const changes = parseChanges(`CHAPTERS:
第1章｜开头立规则
第2章｜妹妹订单出现
第3章｜章末看见下单人背影
CHANGES:
发现超时会受祸
PEOPLE:
陈野｜还在夜班｜要救妹妹
FORESHADOW:
open｜下单人身份｜未收
closed｜可弃支线｜丢掉
`);
assert(changes.digests[2].number === 3, "chapter digest");
assert(changes.foreshadows[0].status === "open", "parse change foreshadow");

const ranked = rankForeshadows(
  [
    { setup: "远", kind: "must", payoff_at: "30万" },
    { setup: "近", kind: "must", payoff_at: "10万" },
    { setup: "弃", kind: "drop", payoff_at: "8万" },
  ],
  90000,
);
assert(ranked[0].setup === "近", "due soon first");
assert(ranked.at(-1).setup === "弃", "drop last");

const book = store.createBook({ title: "超时一分钟", pitch, direction: "外卖骑手超时受祸" });
assert(book.status === "candidate", "new book is candidate");
assert(book.beats.length === 6, "six beats");
assert(decideStep(book) === "setup", "new book wants setup");

const setupResult = acceptPaste(book.id, setupText);
assert(setupResult.applied === "setup", "applied setup");
assert(setupResult.book.characters.length >= 2, "people saved");
assert(setupResult.book.foreshadows.length >= 1, "hooks saved");
assert(setupResult.book.beats.every((item) => item.summary), "all beats filled");
assert(decideStep(setupResult.book) === "chapter", "ready for chapter");

try {
  acceptPaste(book.id, "标题：试\n短正文");
  throw new Error("candidate should not accept chapter");
} catch (err) {
  assert(err.status === 409, "candidate chapter blocked");
}

store.updateBook(book.id, { status: "drafting" });
const ch1 = acceptPaste(book.id, "标题：超时\n" + "祸从这一单开始。".repeat(80));
assert(ch1.applied === "chapter", "chapter pasted");
assert(ch1.warning.includes("字"), "word warning");
const undid = store.undoBook(book.id);
assert(undid.chapters.length === 0, "undo removes chapter");

acceptPaste(book.id, "标题：超时\n" + "祸从这一单开始。".repeat(80));
acceptPaste(book.id, "标题：第二单\n" + "妹妹的订单还没到。".repeat(80));
acceptPaste(book.id, "标题：背影\n" + "章末看见下单人背影。".repeat(80));
const after3 = store.getBook(book.id);
assert(decideStep(after3) === "changes", "3 chapters want changes");
const changeResult = acceptPaste(
  book.id,
  `CHAPTERS:
第1章｜立规则
第2章｜妹妹单
第3章｜看见背影
CHANGES:
看见下单人背影
PEOPLE:
陈野｜夜班｜要拦住那人
FORESHADOW:
open｜下单人身份｜更近了
`,
);
assert(changeResult.applied === "changes", "applied changes");
assert(changeResult.book.story.through === 3, "through catches up");
assert(changeResult.book.foreshadows.some((item) => item.setup === "下单人身份"), "foreshadow kept");
assert(decideStep(changeResult.book) === "chapter", "after changes write next chapter");

const stale = buildPrompt(store.getBook(book.id));
try {
  acceptPaste(book.id, "标题：错\n" + "正文".repeat(80), { step: "setup", revision: stale.revision });
  throw new Error("expired step should fail");
} catch (err) {
  assert(err.status === 409, "expired prompt blocked");
}

const goalBook = {
  word_count: 90000,
  beats: changeResult.book.beats,
  foreshadows: [
    { setup: "该收的坑", kind: "must", status: "open", payoff_at: "12万" },
    { setup: "更远的坑", kind: "must", status: "open", payoff_at: "30万" },
  ],
};
assert(chapterGoal(goalBook).includes("该收的坑"), "closure picks due hook");

const cards = pickCards({
  word_count: 90000,
  characters: [
    { id: 1, name: "陈野", role: "主角" },
    { id: 2, name: "路人", role: "路人" },
  ],
  world_entries: [{ id: 3, name: "规则" }],
  foreshadows: [{ id: 4, setup: "坑", status: "open", kind: "must", payoff_at: "12万" }],
}, { character_ids: [2] });
assert(cards.characters[0].id === 2, "manual card wins");

console.log("ok");

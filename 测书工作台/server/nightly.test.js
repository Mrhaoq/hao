import { decideStep } from "./paste.js";
import { closureMode, inWindow, nextSite, nightId, shouldUpdateStory } from "./nightly.js";
import { parseChapter, parseMemory, parseSetup } from "./setup-text.js";

function assert(cond, label) {
  if (!cond) throw new Error(label);
}

const evening = new Date("2026-10-16T12:00:00Z");
assert(inWindow(evening), "friday 20:00 beijing is in window");
assert(nightId(evening) === "2026-10-16", "friday night id");

const dawn = new Date("2026-10-16T22:30:00Z");
assert(nightId(dawn) === "2026-10-16", "saturday 06:30 still friday night");

const noon = new Date("2026-10-16T04:00:00Z");
assert(!inWindow(noon), "friday noon is outside window");

assert(nextSite(0, new Set(["deepseek"])) === 1, "skip blocked deepseek");
assert(nextSite(0, new Set(["deepseek", "doubao", "qianwen"])) === -1, "all blocked");
assert(shouldUpdateStory(3) && !shouldUpdateStory(2), "update every third chapter");
assert(closureMode(270_000) === "volume_end", "late closure");

const setup = parseSetup(`TITLE:夜市
GENRE:悬疑
PITCH:摊主要在天亮前找到凶手
CHARACTER:林三｜主角｜想活过今晚
WORLD:铜钱｜报出死者名字
FORESHADOW:must｜铜钱来历｜30万
STAGE:promise
SUMMARY:三万字内亮出铜钱
`);
assert(setup.title === "夜市" && setup.characters[0].name === "林三", "parse setup");
assert(setup.beats.promise.includes("铜钱"), "parse beat");

const memory = parseMemory(`SUMMARY:
摊主拿到铜钱
PEOPLE:
林三｜还在夜市
FORESHADOW:
open｜铜钱来历｜未收
`);
assert(memory.summary.includes("铜钱") && memory.foreshadows[0].status === "open", "parse memory");

const [title, body] = parseChapter("标题：开口\n正文第一段");
assert(title === "开口" && body.includes("正文"), "parse chapter");

const pitch =
  "夜班骑手陈野每单超时一分钟，就要替收货人承受一次即将发生的祸。他必须在妹妹那一单截止前，找到那个专门下单转嫁灾祸的人。";
const ready = {
  pitch,
  characters: [{ name: "陈野", role: "主角" }],
  world_entries: [{ name: "超时受祸" }],
  foreshadows: [{ setup: "下单人", kind: "must", status: "open" }],
  beats: [
    { stage: "promise", summary: "承诺" },
    { stage: "buildup", summary: "蓄力" },
    { stage: "payoff", summary: "兑现" },
    { stage: "pressure", summary: "加压" },
    { stage: "lock", summary: "锁定" },
    { stage: "volume_end", summary: "闭环" },
  ],
};

assert(decideStep({ pitch: "", beats: [], chapters: [], story: {} }) === "setup", "empty book wants setup");
assert(decideStep({ ...ready, chapters: [] }) === "chapter", "complete setup can write chapter one");
assert(decideStep({ ...ready, chapters: [{}, {}, {}], story: { through: 0 } }) === "changes", "every third chapter wants changes");
assert(decideStep({ ...ready, chapters: [{}, {}, {}, {}, {}, {}], story: { through: 0 } }) === "memory", "every sixth chapter wants memory");
assert(decideStep({ ...ready, chapters: [{}, {}, {}], story: { through: 3 } }) === "chapter", "through gate skips changes");
assert(decideStep({ ...ready, chapters: [{}, {}], story: { through: 0 } }) === "chapter", "other counts want a chapter");
assert(
  decideStep({
    ...ready,
    beats: [{ stage: "promise", summary: "承诺" }, { stage: "payoff", summary: "兑现" }, { stage: "volume_end", summary: "闭环" }],
    chapters: [{}],
  }) === "outline_repair",
  "old three-stage book must repair outline",
);
assert(decideStep({ ...ready, chapters: [{}], story: { force_memory: true } }) === "memory", "major turn forces memory");

console.log("ok");

import fs from "node:fs";
import path from "node:path";
import { importManuscripts, writeBookFiles } from "./files.js";
import * as store from "./store.js";

function assert(cond, label) {
  if (!cond) throw new Error(label);
}

const pitch =
  "夜班骑手陈野每单超时一分钟，就要替收货人承受一次即将发生的祸。他必须在妹妹那一单截止前，找到那个专门下单转嫁灾祸的人。";
const book = store.createBook({ title: "覆盖测试", pitch, direction: "超时受祸" });
store.updateBook(book.id, {
  characters: [{ id: 1, name: "陈野", role: "主角", card: "想救妹妹", tags: "" }],
  world_entries: [{ id: 2, name: "超时", card: "超时受祸" }],
});
store.addChild(book.id, "chapters", {
  number: 1,
  title: "旧标题",
  body: "这是工作台里的正文，应当覆盖磁盘。",
  word_count: 16,
  accepted: false,
  goal: "",
  character_ids: [],
  world_ids: [],
  foreshadow_ids: [],
  created_at: new Date().toISOString(),
});
const fresh = store.getBook(book.id);
const dir = writeBookFiles(fresh);
const setupFile = path.join(dir, "设定.md");
const chapterFile = path.join(dir, "正文", "第001章-旧标题.txt");
assert(fs.existsSync(setupFile), "setup written");
assert(fs.readFileSync(setupFile, "utf8").includes("陈野"), "setup from store");
assert(fs.readFileSync(chapterFile, "utf8").includes("工作台里的正文"), "chapter from store");

fs.writeFileSync(chapterFile, "磁盘上的旧稿，不该留下来。", "utf8");
fs.writeFileSync(setupFile, "# 标题\n磁盘旧设定\n", "utf8");
writeBookFiles(store.getBook(book.id));
assert(fs.readFileSync(chapterFile, "utf8").includes("工作台里的正文"), "store overwrites chapter");
assert(fs.readFileSync(setupFile, "utf8").includes("陈野"), "store overwrites setup");

store.patchChild(book.id, "chapters", fresh.chapters[0].id, { title: "新标题", body: "改名后的正文应该换文件。" });
writeBookFiles(store.getBook(book.id));
assert(!fs.existsSync(chapterFile), "old chapter file removed");
assert(fs.existsSync(path.join(dir, "正文", "第001章-新标题.txt")), "renamed chapter written");

store.addChild(book.id, "relations", { name: "陈野—妹妹", card: "相依为命" });
store.mutate((data) => {
  const raw = data.books.find((item) => item.id === book.id);
  raw.beats[0].milestones = [{ id: 999, text: "亮出规则", target_words: 20000, done: true }];
});
writeBookFiles(store.getBook(book.id));
const md = fs.readFileSync(setupFile, "utf8");
assert(md.includes("# 关系") && md.includes("陈野—妹妹"), "relations heading written");
assert(md.includes("# 地点势力") && md.includes("# 道具"), "new headings written");
assert(md.includes("- [x] 亮出规则｜20000字"), "milestone written");

const beforePitch = store.getBook(book.id).pitch;
const other = path.join(process.env.CESHU_MANUSCRIPT_ROOT, `${book.id}-覆盖测试`, "设定.md");
fs.writeFileSync(other, "# 标题\n覆盖测试\n\n# 简介\n磁盘想反向覆盖工作台，这不行。\n", "utf8");
importManuscripts();
assert(store.getBook(book.id).pitch === beforePitch, "existing book not overwritten by import");

console.log("ok");

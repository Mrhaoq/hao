import { formatCover, formatSetupMd, parseCover, parseSetupMd } from "./cover-text.js";

function assertEq(actual, expected, label) {
  if (actual !== expected) throw new Error(`${label}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
}

const sample = formatCover({
  title: "超时一分钟",
  genre: "都市脑洞",
  direction: "外卖骑手超时受祸",
  pitch: "夜班骑手陈野每单超时一分钟，就要替收货人承受一次即将发生的祸。他必须在妹妹那一单截止前，找到那个专门下单转嫁灾祸的人。",
});
const parsed = parseCover(sample);
assertEq(parsed.title, "超时一分钟", "titled title");
assertEq(parsed.genre, "都市脑洞", "titled tags");
assertEq(parsed.direction, "外卖骑手超时受祸", "titled theme");
assertEq(parsed.pitch.startsWith("夜班骑手"), true, "titled pitch");

const legacy = parseCover(`书名：焊命
类型：玄幻
方向：矿奴焊寿命

边城矿奴沈砧挖到的不是矿。`);
assertEq(legacy.title, "焊命", "legacy title");
assertEq(legacy.genre, "玄幻", "legacy genre");
assertEq(legacy.direction, "矿奴焊寿命", "legacy theme");
assertEq(legacy.pitch, "边城矿奴沈砧挖到的不是矿。", "legacy pitch");

const setup = formatSetupMd({
  title: "超时一分钟",
  genre: "都市脑洞",
  direction: "外卖骑手超时受祸",
  pitch: "夜班骑手陈野每单超时一分钟。",
  people: "陈野｜主角",
  outline: "0 到 3 万字｜读者承诺",
});
const full = parseSetupMd(setup);
assertEq(full.title, "超时一分钟", "setup title");
assertEq(full.people, "陈野｜主角", "setup people");
assertEq(full.outline, "0 到 3 万字｜读者承诺", "setup outline");
assertEq(parseCover(setup).pitch, "夜班骑手陈野每单超时一分钟。", "outline not in pitch");
console.log("ok");

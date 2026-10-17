import { evaluate, pitchLengthMessage, stageForWords, closureMode } from "./playbook.js";

function days(n, extra = {}) {
  return Array.from({ length: n }, (_, i) => ({
    recorded_on: `2026-10-${String(i + 1).padStart(2, "0")}`,
    readers: 800,
    follow_readers: 280,
    shelves: 160,
    readthrough_10w: 16.0,
    readthrough_30w: 13.0,
    minutes_per_10k: 22.0,
    ...extra,
  }));
}

function assertEq(actual, expected, label) {
  if (actual !== expected) {
    throw new Error(`${label}: expected ${expected}, got ${actual}`);
  }
}

assertEq(evaluate(10000, days(7)).recommendation, "watch", "not enough words");
assertEq(evaluate(300000, days(7)).recommendation, "continue", "continue");
assertEq(
  evaluate(300000, days(7, { readthrough_10w: 8, readthrough_30w: 6, readers: 600, follow_readers: 200 })).recommendation,
  "stop",
  "stop by 30w readthrough",
);
assertEq(
  evaluate(300000, days(7, { readers: 20, follow_readers: 10, shelves: 2 })).recommendation,
  "watch",
  "tiny sample",
);
assertEq(
  evaluate(200000, days(7, { readthrough_10w: 7, follow_readers: 50, readers: 600 })).recommendation,
  "stop",
  "20w severe fail needs low rt10 and low follow",
);
assertEq(
  evaluate(200000, days(7, { readthrough_10w: 7, follow_readers: 200, readers: 600 })).recommendation,
  "watch",
  "20w low rt10 alone is not hard stop",
);
assertEq(
  evaluate(300000, days(7, { readers: 150, follow_readers: 40, shelves: 20, readthrough_10w: 16, readthrough_30w: 13 })).recommendation,
  "watch",
  "soft readers no growth is watch not stop",
);
assertEq(pitchLengthMessage(""), null, "empty pitch allowed unless required");
if (!pitchLengthMessage("", { required: true })) {
  throw new Error("empty required pitch should fail");
}
if (pitchLengthMessage("夜班骑手陈野每单超时一分钟，就要替收货人承受一次即将发生的祸。他必须在妹妹那一单截止前，找到那个专门下单转嫁灾祸的人。")) {
  throw new Error("59-char pitch should pass");
}
if (!pitchLengthMessage("太短了。")) {
  throw new Error("short pitch should fail");
}
assertEq(stageForWords(0), "promise", "0 is promise");
assertEq(stageForWords(29999), "promise", "under 3w is promise");
assertEq(stageForWords(30000), "buildup", "3w is buildup");
assertEq(stageForWords(79999), "buildup", "under 8w is buildup");
assertEq(stageForWords(80000), "payoff", "8w is payoff");
assertEq(stageForWords(119999), "payoff", "under 12w is payoff");
assertEq(stageForWords(120000), "pressure", "12w is pressure");
assertEq(stageForWords(199999), "pressure", "under 20w is pressure");
assertEq(stageForWords(200000), "lock", "20w is lock");
assertEq(stageForWords(259999), "lock", "under 26w is lock");
assertEq(stageForWords(260000), "volume_end", "26w is volume_end");
assertEq(closureMode(90000), "payoff", "payoff window");
assertEq(closureMode(270000), "volume_end", "late closure");
assertEq(closureMode(10000), "", "no early closure");
console.log("ok");

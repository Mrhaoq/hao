export const SITES = ["deepseek", "doubao", "qianwen"];
export const NIGHTLY_CHAPTERS = 20;

export function beijingParts(date = new Date()) {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Shanghai",
    hourCycle: "h23",
    weekday: "short",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
  });
  const bag = Object.fromEntries(fmt.formatToParts(date).map((p) => [p.type, p.value]));
  return {
    hour: Number(bag.hour),
    ymd: `${bag.year}-${bag.month}-${bag.day}`,
    weekend: bag.weekday === "Sat" || bag.weekday === "Sun",
  };
}

function shiftYmd(ymd, days) {
  const [y, m, d] = ymd.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  dt.setUTCDate(dt.getUTCDate() + days);
  return dt.toISOString().slice(0, 10);
}

export function nightId(date = new Date()) {
  const p = beijingParts(date);
  if (p.hour < 8) return shiftYmd(p.ymd, -1);
  return p.ymd;
}

export function inWindow(date = new Date()) {
  const p = beijingParts(date);
  if (p.hour >= 19 || p.hour < 8) return true;
  return p.weekend;
}

export function nextSite(fromIndex, blocked) {
  for (let step = 0; step < SITES.length; step += 1) {
    const index = (fromIndex + step) % SITES.length;
    if (!blocked.has(SITES[index])) return index;
  }
  return -1;
}

export function shouldUpdateStory(chapterCount) {
  return chapterCount > 0 && chapterCount % 3 === 0;
}

export { closureMode } from "./playbook.js";

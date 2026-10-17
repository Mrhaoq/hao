import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PROFILE = path.join(ROOT, "data", "browser-profile");

export const SITE_PAGES = [
  { id: "deepseek", label: "DeepSeek", url: "https://chat.deepseek.com/" },
  { id: "doubao", label: "豆包", url: "https://www.doubao.com/chat/" },
  { id: "qianwen", label: "千问", url: "https://www.qianwen.com/" },
];

const WALL = /验证码|人机验证|安全验证|请登录|扫码登录|过于频繁|操作太频繁|访问太频繁|稍后再试|服务繁忙|系统繁忙|请求过多|次数已用|额度已用/;

export class SiteBlocked extends Error {
  constructor(site, message) {
    super(message);
    this.site = site;
    this.blocked = true;
  }
}

let context = null;

function remember(ctx) {
  context = ctx;
  ctx.on("close", () => {
    if (context === ctx) context = null;
  });
}

function contextAlive(ctx) {
  if (!ctx) return false;
  try {
    const browser = ctx.browser();
    if (browser && !browser.isConnected()) return false;
    return true;
  } catch {
    return false;
  }
}

async function browser() {
  if (!contextAlive(context)) context = null;
  if (context) return context;
  let chromium;
  try {
    ({ chromium } = await import("playwright"));
  } catch {
    throw new Error("还没安装网页组件。在项目目录执行 npm install，然后 npx playwright install chromium。");
  }
  const ctx = await chromium.launchPersistentContext(PROFILE, {
    headless: false,
    viewport: { width: 1280, height: 900 },
    locale: "zh-CN",
  });
  remember(ctx);
  return ctx;
}

async function openPage() {
  const ctx = await browser();
  try {
    return await ctx.newPage();
  } catch (err) {
    const closed = /has been closed|Target closed/i.test(err.message || "");
    if (!closed) throw err;
    if (context === ctx) context = null;
    const fresh = await browser();
    return fresh.newPage();
  }
}

export async function openLogin() {
  for (const site of SITE_PAGES) {
    const page = await openPage();
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60000 });
  }
  return { opened: SITE_PAGES.map((s) => s.label) };
}

export async function closeBrowser() {
  if (!context) return;
  await context.close().catch(() => {});
  context = null;
}

function siteById(id) {
  return SITE_PAGES.find((s) => s.id === id);
}

async function pageText(page) {
  return page.locator("body").innerText({ timeout: 5000 }).catch(() => "");
}

async function findComposer(page) {
  const textarea = page.locator("textarea:visible");
  if (await textarea.count()) return textarea.last();
  const box = page.locator("[contenteditable='true']:visible");
  if (await box.count()) return box.last();
  return null;
}

export async function ask(siteId, prompt) {
  const site = siteById(siteId);
  if (!site) throw new SiteBlocked(siteId, "未知网站。");
  const page = await openPage();
  try {
    await page.goto(site.url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForTimeout(1500);
    const opening = await pageText(page);
    if (WALL.test(opening) && /登录|验证码/.test(opening)) {
      throw new SiteBlocked(site.id, `${site.label} 需要重新登录或出现验证码，这一家今晚停用。`);
    }
    const fresh = page.getByText(/新对话|新建对话|开启新对话/).first();
    if (await fresh.count().catch(() => 0)) {
      await fresh.click({ timeout: 3000 }).catch(() => {});
    }
    const composer = await findComposer(page);
    if (!composer) {
      throw new SiteBlocked(site.id, `${site.label} 页面上找不到输入框。可能没登录，或页面改版了。`);
    }
    await composer.click();
    await composer.fill(prompt.slice(0, 8000));
    await composer.press("Enter");
    const reply = await waitReply(page, prompt);
    if (WALL.test(reply)) {
      throw new SiteBlocked(site.id, `${site.label} 返回了繁忙、额度或验证码提示，这一家今晚停用。`);
    }
    if (reply.trim().length < 40) {
      throw new SiteBlocked(site.id, `${site.label} 没有返回足够的正文。`);
    }
    return reply.trim();
  } finally {
    await page.close().catch(() => {});
  }
}

async function waitReply(page, prompt) {
  let last = "";
  let stable = 0;
  for (let i = 0; i < 90; i += 1) {
    await page.waitForTimeout(2000);
    const text = await pageText(page);
    const chunk = text.split(prompt.slice(0, 40)).pop() || text;
    const clipped = chunk.slice(-4000);
    if (clipped === last && clipped.length > 80) {
      stable += 1;
      if (stable >= 2) return clipped;
    } else {
      stable = 0;
      last = clipped;
    }
  }
  return last;
}

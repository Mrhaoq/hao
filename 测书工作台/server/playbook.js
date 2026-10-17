/** Locked rules. Keep numbers in sync with docs/PLAYBOOK.md. */

export const PLATFORM = "fanqie";
export const PLATFORM_LABEL = "番茄小说";
export const WORD_CAP = 300000;
export const COST_CAP_YUAN = 30;
export const MAX_DRAFTING = 3;
export const OBSERVE_DAYS = 7;
export const CHAPTER_MIN_WORDS = 1800;
export const CHAPTER_MAX_WORDS = 2500;
export const CHAPTER_TARGET_WORDS = 2200;
export const PITCH_TARGET_WORDS = 60;
export const PITCH_MIN_WORDS = 50;
export const PITCH_MAX_WORDS = 70;
export const SHORT_CLOSE_CHAPTERS_MIN = 6;
export const SHORT_CLOSE_CHAPTERS_MAX = 10;
export const COST_WARN_AT = [
  { words: 100000, yuan: 10 },
  { words: 200000, yuan: 20 },
  { words: 300000, yuan: 30 },
];
export const DEFAULT_MODEL = "deepseek-flash";
export const DEFAULT_API_BASE = "https://api.deepseek.com";
export const RATE_INPUT_MISS = 1.0;
export const RATE_OUTPUT = 4.0;
export const STORY_MAX_CHARS = 1500;
export const SCHEMA_VERSION = 3;
export const CONTINUE_MIN_WORDS = 50000;
export const CONTINUE_DEFAULT_WORDS = 100000;
export const CONTINUE_PRESETS = [50000, 100000, 200000, 300000];
export const SEGMENT_CLOSE_WORDS = 20000;
export const REQUEST_LOG_MAX = 500;

export const STAGES = [
  { key: "promise", target_words: 30000, title: "读者承诺", range: "0–3万", must: "主角要什么、最大阻碍、失败代价；至少一次规则验证" },
  { key: "buildup", target_words: 80000, title: "加压蓄力", range: "3–8万", must: "压力升级，为第一次兑现蓄力，不把高潮提前写完" },
  { key: "payoff", target_words: 120000, title: "第一次回报", range: "8–12万", must: "一次明确兑现：升级、反转、关系落地或仇人当面" },
  { key: "pressure", target_words: 200000, title: "加压对质", range: "12–20万", must: "确认本卷对手与因果链，冲突加码" },
  { key: "lock", target_words: 260000, title: "锁定结局", range: "20–26万", must: "锁定结局路径，停止新增 must 伏笔" },
  { key: "volume_end", target_words: 300000, title: "30万裁决", range: "26–30万", must: "核心事件闭环、本卷对手有结果；文末写数据好则续、数据差则短收尾" },
];

/** Severe fail at 20w needs BOTH low 10w readthrough and low follow rate. */
export const STOP = {
  readthrough_10w_severe_lt: 8.0,
  follow_rate_severe_lt: 0.12,
  readthrough_30w_lt: 10.0,
  follow_rate_lt: 0.15,
  tiny_sample_readers: 50,
  skip_minutes_per_10k: 12.0,
  soft_readers_lt: 200,
};

export const CONTINUE = {
  readthrough_10w_gte: 15.0,
  readthrough_30w_gte: 12.0,
  follow_rate_gte: 0.25,
  readers_gte: 500,
  readers_growth: 1.2,
  shelf_to_reader: 0.15,
};

export function publicRules() {
  return {
    platform: PLATFORM,
    platform_label: PLATFORM_LABEL,
    word_cap: WORD_CAP,
    cost_cap_yuan: COST_CAP_YUAN,
    max_drafting: MAX_DRAFTING,
    observe_days: OBSERVE_DAYS,
    chapter_min_words: CHAPTER_MIN_WORDS,
    chapter_max_words: CHAPTER_MAX_WORDS,
    chapter_target_words: CHAPTER_TARGET_WORDS,
    pitch_target_words: PITCH_TARGET_WORDS,
    pitch_min_words: PITCH_MIN_WORDS,
    pitch_max_words: PITCH_MAX_WORDS,
    short_close_chapters_min: SHORT_CLOSE_CHAPTERS_MIN,
    short_close_chapters_max: SHORT_CLOSE_CHAPTERS_MAX,
    cost_warn_at: COST_WARN_AT,
    default_model: DEFAULT_MODEL,
    stop: STOP,
    continue_all: CONTINUE,
    story_max_chars: STORY_MAX_CHARS,
    continue_min_words: CONTINUE_MIN_WORDS,
    continue_default_words: CONTINUE_DEFAULT_WORDS,
    continue_presets: CONTINUE_PRESETS,
    segment_close_words: SEGMENT_CLOSE_WORDS,
    stages: STAGES.map((item) => ({
      key: item.key,
      target_words: item.target_words,
      title: item.title,
      range: item.range,
      must: item.must,
    })),
  };
}

export function countWords(text) {
  if (!text) return 0;
  return Array.from(String(text).replace(/\s+/g, "")).length;
}

export function pitchLengthMessage(text, { required = false } = {}) {
  const value = String(text || "").trim();
  if (!value) {
    return required
      ? `简介不能空，须约 ${PITCH_TARGET_WORDS} 字（${PITCH_MIN_WORDS}～${PITCH_MAX_WORDS}）。`
      : null;
  }
  const n = countWords(value);
  if (n >= PITCH_MIN_WORDS && n <= PITCH_MAX_WORDS) return null;
  return `简介现在 ${n} 字，须约 ${PITCH_TARGET_WORDS} 字（${PITCH_MIN_WORDS}～${PITCH_MAX_WORDS}）。`;
}

export function stageForWords(total) {
  const n = Number(total) || 0;
  if (n < 30000) return "promise";
  if (n < 80000) return "buildup";
  if (n < 120000) return "payoff";
  if (n < 200000) return "pressure";
  if (n < 260000) return "lock";
  return "volume_end";
}

export function closureMode(wordCount) {
  const n = Number(wordCount) || 0;
  if (n >= 260000) return "volume_end";
  if (n >= 80000 && n < 120000) return "payoff";
  return "";
}

export function parsePayoffWords(text) {
  const raw = String(text || "");
  const wan = raw.match(/(\d+(?:\.\d+)?)\s*万/);
  if (wan) return Math.round(Number(wan[1]) * 10000);
  const digits = raw.match(/(\d{4,})/);
  if (digits) return Number(digits[1]);
  return WORD_CAP;
}

export function defaultBeats(nextId) {
  return STAGES.map((item) => ({
    id: typeof nextId === "function" ? nextId() : undefined,
    stage: item.key,
    target_words: item.target_words,
    title: item.title,
    summary: "",
    closed: false,
    milestones: [],
  }));
}

export function ensureSixBeats(book, nextId) {
  const byStage = new Map((book.beats || []).map((item) => [item.stage, item]));
  book.beats = STAGES.map((item) => {
    const current = byStage.get(item.key);
    if (current) {
      return {
        ...current,
        stage: item.key,
        target_words: item.target_words,
        title: current.title || item.title,
        summary: current.summary || "",
        closed: Boolean(current.closed),
        milestones: Array.isArray(current.milestones) ? current.milestones : [],
      };
    }
    return {
      id: typeof nextId === "function" ? nextId() : undefined,
      stage: item.key,
      target_words: item.target_words,
      title: item.title,
      summary: "",
      closed: false,
      milestones: [],
    };
  });
  return book;
}

export function missingBeatKeys(book) {
  return STAGES.filter((item) => {
    const beat = (book.beats || []).find((row) => row.stage === item.key);
    return !beat || !String(beat.summary || "").trim();
  }).map((item) => item.key);
}

export function needsOutlineRepair(book) {
  return missingBeatKeys(book).length > 0;
}

export function segmentFor(book) {
  const segments = book?.segments || [];
  if (!segments.length) return null;
  const words = Number(book.word_count) || 0;
  const firstStart = Number(segments[0].start_words) || WORD_CAP;
  if (words < firstStart) return null;
  return segments.find((item) => words < item.end_words) || segments.at(-1);
}

export function needsSegmentOutline(book) {
  const segment = segmentFor(book);
  return Boolean(segment && !segment.outlined);
}

export function segmentClosing(book) {
  const segment = segmentFor(book);
  if (!segment) return false;
  return segment.end_words - (Number(book.word_count) || 0) <= SEGMENT_CLOSE_WORDS;
}

export function continueWordsMessage(words) {
  const n = Number(words);
  if (!Number.isFinite(n) || n < CONTINUE_MIN_WORDS) {
    return `继续加的字数至少 ${CONTINUE_MIN_WORDS / 10000} 万。`;
  }
  return null;
}

export function hasBasics(book) {
  if (pitchLengthMessage(book?.pitch, { required: true })) return false;
  return (book?.characters || []).some((item) => String(item.name || "").trim());
}

export function hasCompleteSetup(book) {
  if (!hasBasics(book)) return false;
  if (!(book.world_entries || []).some((item) => String(item.name || "").trim())) return false;
  if (!(book.foreshadows || []).some((item) => String(item.setup || "").trim())) return false;
  return !needsOutlineRepair(book);
}

export function costWarnMessage(wordCount, apiCostYuan) {
  const cost = Number(apiCostYuan) || 0;
  for (const row of COST_WARN_AT) {
    if (wordCount >= row.words && cost >= row.yuan) {
      return `累计约 ${row.words} 字时 API 已达 ${cost.toFixed(1)} 元（预警线 ${row.yuan} 元）。停生成或改上限。`;
    }
  }
  return null;
}

function avg(values) {
  const nums = values.filter((v) => v != null).map(Number);
  if (!nums.length) return null;
  return nums.reduce((a, b) => a + b, 0) / nums.length;
}

function followRate(row) {
  const readers = row.readers;
  const follow = row.follow_readers;
  if (readers == null || follow == null || readers <= 0) return null;
  return follow / readers;
}

function averages(readers, follow, rt10, rt30, minutes) {
  return {
    readers,
    follow_rate: follow,
    readthrough_10w: rt10,
    readthrough_30w: rt30,
    minutes_per_10k: minutes,
  };
}

export function evaluate(wordCount, rows) {
  const window = (rows || []).slice(-OBSERVE_DAYS);
  if (wordCount < 200000) {
    return {
      recommendation: "watch",
      label: "再观察",
      reasons: [`累计 ${wordCount} 字，未到 20 万字止损线，也未到首轮裁决字数 ${WORD_CAP} 字。不能判继续。`],
      window_days: window.length,
    };
  }
  if (window.length < 3) {
    return {
      recommendation: "watch",
      label: "再观察",
      reasons: ["至少录入 3 天数据，满 7 天再裁决。现在样本不够。"],
      window_days: window.length,
    };
  }

  const readers = window.map((r) => r.readers);
  const follows = window.map(followRate);
  const shelves = window.map((r) => r.shelves);
  const rt10 = window.map((r) => r.readthrough_10w);
  const rt30 = window.map((r) => r.readthrough_30w);
  const minutes = window.map((r) => r.minutes_per_10k);

  const avgReaders = avg(readers);
  const avgFollow = avg(follows);
  const avgRt10 = avg(rt10);
  const avgRt30 = avg(rt30);
  const avgMinutes = avg(minutes);
  const rt10Days = rt10.filter((v) => v != null).length;
  const rt30Days = rt30.filter((v) => v != null).length;

  const first = window.slice(0, 3);
  const last = window.slice(-3);
  const firstReaders = avg(first.map((r) => r.readers));
  const lastReaders = avg(last.map((r) => r.readers));
  const firstShelves = avg(first.map((r) => r.shelves));
  const lastShelves = avg(last.map((r) => r.shelves));
  const shelfSum = shelves.reduce((a, s) => a + (s || 0), 0);
  const readerSum = readers.reduce((a, s) => a + (s || 0), 0);

  const growing =
    firstReaders != null &&
    lastReaders != null &&
    lastReaders >= firstReaders * CONTINUE.readers_growth;
  const shelfStable =
    firstShelves != null &&
    lastShelves != null &&
    lastShelves >= firstShelves &&
    readerSum > 0 &&
    shelfSum >= readerSum * CONTINUE.shelf_to_reader;

  if (avgReaders != null && avgReaders < STOP.tiny_sample_readers) {
    return {
      recommendation: "watch",
      label: "再观察",
      reasons: [
        `7 日均阅读人数 ${avgReaders.toFixed(0)}，低于 ${STOP.tiny_sample_readers}。未验证：不证明内容成败，也不允许开下一阶段。`,
      ],
      window_days: window.length,
      averages: averages(avgReaders, avgFollow, avgRt10, avgRt30, avgMinutes),
    };
  }

  const reasons = [];
  let stop = false;

  // 20 万严重失败：10 万读完率与追读率同时过低
  if (
    wordCount >= 200000 &&
    avgRt10 != null &&
    rt10Days >= 3 &&
    avgRt10 < STOP.readthrough_10w_severe_lt &&
    avgFollow != null &&
    avgFollow < STOP.follow_rate_severe_lt
  ) {
    stop = true;
    reasons.push(
      `20 万字严重失败：10 万字读完率 ${avgRt10.toFixed(1)}% < ${STOP.readthrough_10w_severe_lt}% 且追读率 ${(avgFollow * 100).toFixed(1)}% < ${STOP.follow_rate_severe_lt * 100}%。`,
    );
  }

  if (wordCount >= 300000 && avgRt30 != null && rt30Days >= 3 && avgRt30 < STOP.readthrough_30w_lt) {
    stop = true;
    reasons.push(`30 万字读完率 ${avgRt30.toFixed(1)}% < ${STOP.readthrough_30w_lt}%，停更。`);
  }
  if (
    avgReaders != null &&
    avgReaders > STOP.tiny_sample_readers &&
    avgFollow != null &&
    avgFollow < STOP.follow_rate_lt
  ) {
    stop = true;
    reasons.push(`有效样本下追读率 ${(avgFollow * 100).toFixed(1)}% < ${STOP.follow_rate_lt * 100}%，停更。`);
  }

  if (stop) {
    return {
      recommendation: "stop",
      label: "停更",
      reasons: [
        ...reasons,
        `停更后可用 ${SHORT_CLOSE_CHAPTERS_MIN}～${SHORT_CLOSE_CHAPTERS_MAX} 章短收尾（后果、关系、去向），不再揭新真凶。`,
      ],
      window_days: window.length,
      averages: averages(avgReaders, avgFollow, avgRt10, avgRt30, avgMinutes),
    };
  }

  // 未到 30 万：只允许严重止损或再观察，不能判继续
  if (wordCount < WORD_CAP) {
    return {
      recommendation: "watch",
      label: "再观察",
      reasons: [
        `累计 ${wordCount} 字，未到首轮裁决字数 ${WORD_CAP} 字。不能判继续。`,
        "未触发 20 万严重失败组合条件，继续写到 30 万再裁决。",
      ],
      window_days: window.length,
      averages: averages(avgReaders, avgFollow, avgRt10, avgRt30, avgMinutes),
    };
  }

  const missing = [];
  let ok = true;
  if (avgRt10 == null) {
    ok = false;
    missing.push("还没有 10 万字读完率，不能判继续。");
  } else if (avgRt10 < CONTINUE.readthrough_10w_gte) {
    ok = false;
    missing.push(`10 万字读完率 ${avgRt10.toFixed(1)}% < ${CONTINUE.readthrough_10w_gte}%。`);
  }
  if (avgRt30 == null) {
    ok = false;
    missing.push("30 万字读完率尚未展示，维持观察，不准开下一阶段。");
  } else if (avgRt30 < CONTINUE.readthrough_30w_gte) {
    ok = false;
    missing.push(`30 万字读完率 ${avgRt30.toFixed(1)}% < ${CONTINUE.readthrough_30w_gte}%。`);
  }

  const followOk = avgFollow != null && avgFollow >= CONTINUE.follow_rate_gte;
  if (!followOk && !shelfStable) {
    ok = false;
    missing.push("追读率未到 25%，书架也没有形成稳定占比。");
  }
  const readersOk = avgReaders != null && avgReaders >= CONTINUE.readers_gte;
  if (!readersOk && !growing) {
    ok = false;
    missing.push("日均阅读未到 500，且后 3 日没有 1.2 倍抬头。");
  }
  if (avgMinutes != null && avgMinutes < STOP.skip_minutes_per_10k) {
    ok = false;
    missing.push(`万字时长 ${avgMinutes.toFixed(1)} 分钟 < ${STOP.skip_minutes_per_10k}，疑似跳读。`);
  }

  // 阅读人数偏低且无抬头：只作再观察/商业信号，不当内容硬停
  if (
    avgReaders != null &&
    avgReaders < STOP.soft_readers_lt &&
    firstReaders != null &&
    lastReaders != null &&
    lastReaders <= firstReaders
  ) {
    ok = false;
    missing.push(
      `日均阅读 ${avgReaders.toFixed(0)} < ${STOP.soft_readers_lt} 且后 3 日没有抬头：商业未吃到量，再观察，不当内容失败硬停。`,
    );
  }

  if (ok) {
    return {
      recommendation: "continue",
      label: "继续",
      reasons: [
        "10 万 / 30 万字读完率、追读或书架、阅读人数均达到继续线。",
        `只准从本设定开下一段，按需加字数上限（默认 ${CONTINUE_DEFAULT_WORDS / 10000} 万、最少 ${CONTINUE_MIN_WORDS / 10000} 万），不是无限连载许可。`,
      ],
      window_days: window.length,
      averages: averages(avgReaders, avgFollow, avgRt10, avgRt30, avgMinutes),
    };
  }

  return {
    recommendation: "watch",
    label: "再观察",
    reasons: missing.length ? missing : ["未触发停更，也未凑齐继续条件。观察期内不加下一个 30 万字。"],
    window_days: window.length,
    averages: averages(avgReaders, avgFollow, avgRt10, avgRt30, avgMinutes),
  };
}

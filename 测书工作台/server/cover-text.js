const HEADING_TO_FIELD = {
  标题: "title",
  书名: "title",
  标签: "genre",
  类型: "genre",
  主题: "direction",
  方向: "direction",
  简介: "pitch",
  卖点: "pitch",
  一句话卖点: "pitch",
  人物: "people",
  世界: "world",
  大纲: "outline",
  伏笔: "hooks",
  关系: "relations",
  地点势力: "places",
  道具: "items",
  前情: "story",
  时间线: "timeline",
  续写段: "segments",
};

const HEADING_NAMES = Object.keys(HEADING_TO_FIELD).join("|");
const HEADING_RE = new RegExp(
  `^(?:#{1,3}\\s*|【)\\s*(${HEADING_NAMES})\\s*(?:】)?\\s*[：:]?\\s*(.*)$`,
);
const LABEL_RE = /^(书名|类型|方向|标签|主题|简介|卖点|一句话卖点)[：:]\s*(.*)$/;

const EMPTY = {
  title: "",
  genre: "",
  direction: "",
  pitch: "",
  people: "",
  world: "",
  outline: "",
  hooks: "",
  relations: "",
  places: "",
  items: "",
  story: "",
  timeline: "",
  segments: "",
};

export function formatCover(fields = {}) {
  return formatSetupMd(fields);
}

export function formatSetupMd({
  title = "",
  genre = "",
  direction = "",
  pitch = "",
  people = "",
  world = "",
  outline = "",
  hooks = "",
  relations = "",
  places = "",
  items = "",
  story = "",
  timeline = "",
  segments = "",
} = {}) {
  const blocks = [
    `# 标题\n${title}`,
    `# 标签\n${genre}`,
    `# 主题\n${direction}`,
    `# 简介\n${pitch}`,
    `# 人物\n${people || "（还没有人物）"}`,
    `# 世界\n${world || "（还没有世界规则）"}`,
    `# 大纲\n${outline || "（还没有大纲）"}`,
    `# 伏笔\n${hooks || "（还没有伏笔）"}`,
    `# 关系\n${relations || "（无）"}`,
    `# 地点势力\n${places || "（无）"}`,
    `# 道具\n${items || "（无）"}`,
    `# 前情\n${story || "（无）"}`,
  ];
  if (timeline) blocks.push(`# 时间线\n${timeline}`);
  if (segments) blocks.push(`# 续写段\n${segments}`);
  return blocks.join("\n\n") + "\n";
}

export function parseCover(text) {
  const all = parseSetupMd(text);
  return {
    title: all.title,
    genre: all.genre,
    direction: all.direction,
    pitch: all.pitch,
  };
}

export function parseSetupMd(text) {
  const raw = String(text || "").replaceAll("\r\n", "\n");
  if (new RegExp(`^(?:#{1,3}\\s*|【)\\s*(标题|书名|标签|主题|简介|卖点|人物|世界|大纲)`, "m").test(raw)) {
    return parseTitled(raw);
  }
  const legacy = parseLegacy(raw);
  return { ...EMPTY, ...legacy };
}

function parseTitled(raw) {
  const buf = {
    title: [],
    genre: [],
    direction: [],
    pitch: [],
    people: [],
    world: [],
    outline: [],
    hooks: [],
    relations: [],
    places: [],
    items: [],
    story: [],
    timeline: [],
    segments: [],
  };
  let key = "";
  for (const line of raw.split("\n")) {
    const heading = line.trim().match(HEADING_RE);
    if (heading) {
      key = HEADING_TO_FIELD[heading[1]];
      if (heading[2]) buf[key].push(heading[2]);
      continue;
    }
    if (key) buf[key].push(line);
  }
  const out = { ...EMPTY };
  for (const field of Object.keys(buf)) out[field] = buf[field].join("\n").trim();
  return out;
}

function parseLegacy(raw) {
  const out = { title: "", genre: "", direction: "", pitch: "" };
  const rest = [];
  for (const line of raw.split("\n")) {
    const labeled = line.match(LABEL_RE);
    if (labeled) {
      const field = HEADING_TO_FIELD[labeled[1]];
      if (field && !out[field]) out[field] = labeled[2].trim();
      continue;
    }
    rest.push(line);
  }
  if (!out.pitch) out.pitch = rest.join("\n").trim();
  return out;
}

---
name: ce-shu-lian-dong
description: 测书口径、目录、字数、简介、设定.md、阈值、在产槽的关联清单。改需求时按本技能列出的文件同步改 C/D 两份，不必重新全库扫描。在用户说改需求、改口径、改字数、改目录、改简介、漏改、关联、同步规则或更新测书思路时使用。
---

# 测书关联清单

改需求时只走这份清单，不要重新全库扫描。新增了关联文件，先改本技能，再改那些文件。

口径以 `测书思路.md` 为准。文稿只写 D 盘。不自动打开网页，不替用户向豆包发送。不擅自改《铜钱开口》正文。

## 双根目录

每改一个文件，C 和 D 写同一份（文稿除外）：

| 角色 | 路径 |
| --- | --- |
| Cursor 仓库 | `C:\Users\94916\ceshu-workbench\` |
| 运行中的工作台 | `D:\A-work\hao\测书工作台\` |
| 文稿（只 D） | `D:\A-work\hao\测书工作台\文稿\<编号-书名>\` |

C 盘 `文稿/` 是旧草稿，不要当正式稿。

改代码或页面后：在 D 盘重启 `node server/index.js`（默认 8787）。

## 改法

1. 先改两份 `测书思路.md`，文末补修订记录。
2. 按下表只打开相关文件，C/D 一起改。
3. 用文末「旧叫法」做一次核对，不是再扫全库。
4. 数字类跑 `npm test`（`playbook` / `nightly` / `cover-text` / `paste` / `files` / `book-ops` / `requests`）。

## 按改什么找文件

| 改什么 | 改这些（C/D 各一份，文稿只 D） |
| --- | --- |
| 改需求的流程本身 | `测书思路.md` §开篇+§9；本技能；`.cursor/rules/ceshu-kai-shu.mdc`；`README.md`；`docs/PLAYBOOK.md` 开篇 |
| 开书步骤、设定必须有什么 | `测书思路.md` §2；`.cursor/rules/ceshu-kai-shu.mdc`；`.cursor/skills/kai-shu/SKILL.md`；`docs/PLAYBOOK.md` §7 |
| 文稿目录：一份 `设定.md` + `正文/` | 上列开书文件；`README.md`；`server/files.js`；`server/cover-text.js`；`server/cover-text.test.js`；已有书的 `文稿/*/设定.md` |
| 封面字段：标题/标签/主题/简介 | `测书思路.md` §2；规则；开书技能；`docs/PLAYBOOK.md` §7；`server/cover-text.js`；`server/setup-text.js`（`TITLE/TAGS/THEME/PITCH`）；`server/paste.js`；`server/runner.js`；`server/index.js`；`static/index.html`；`static/app.js` |
| 简介约 60 字（50～70） | `测书思路.md`；规则；开书技能；`docs/PLAYBOOK.md`；`server/playbook.js`（`PITCH_*` + `pitchLengthMessage`）；`server/playbook.test.js`；`server/setup-text.js`；`server/paste.js`；`server/runner.js`；`server/index.js`；`static/index.html`；`static/app.js` |
| 每章 1800～2500 | `测书思路.md`；规则；开书技能；`docs/PLAYBOOK.md`；`server/playbook.js`（`CHAPTER_*`）；`server/setup-text.js` `chapterPrompt`；`server/index.js` 系统提示与写章提示；`static/index.html`。贴回：建议提示、默认不因字数拦提交（见总纲修订记录）→ `server/paste.js`、`docs/PLAYBOOK.md` §8 |
| 30 万裁决 / 六阶段 0–3·3–8·8–12·12–20·20–26·26–30 万 | `测书思路.md` §3；开书技能；`docs/PLAYBOOK.md` §3；`server/playbook.js`（`WORD_CAP`、`STAGES`）；`server/files.js` `parseBeats`；`server/setup-text.js` `STAGE:*`；`server/index.js` 生成大纲提示；`server/store.js` 迁移 |
| 继续/停/再观察阈值 | `测书思路.md` §5；`docs/PLAYBOOK.md` §5；`server/playbook.js`（`STOP`/`CONTINUE`/`evaluate`）；`server/playbook.test.js`；`server/index.js` 录入指标；`static/index.html` 指标表；`static/app.js` |
| 在产最多 3 本、候选不占槽 | `测书思路.md` §4；规则；开书技能；`docs/PLAYBOOK.md` §4；`server/playbook.js` `MAX_DRAFTING`；`server/index.js`；`server/store.js`；`static/index.html`（开始写正文 / 收尾完成）；`static/app.js`。创建书默认候选，不占槽 |
| 短收尾 6～10 章 | `测书思路.md`；`docs/PLAYBOOK.md`；`server/playbook.js` `SHORT_CLOSE_*`；`server/paste.js`；`static/index.html`；`static/app.js` |
| 费用 30 元、预警 10/20/30 | `测书思路.md` §6；`docs/PLAYBOOK.md` §6；`server/playbook.js` `COST_CAP_YUAN`/`COST_WARN_AT` |
| 贴豆包、不自动开网页 | `测书思路.md`；规则；开书技能；`docs/PLAYBOOK.md` §8；`server/paste.js`；`static/index.html`；`static/app.js`。`server/webchat.js` 只作站点名单，不要改成自动发送 |
| 每 3 章变化清单 / 每 6 章前情 | `测书思路.md` §4；`docs/PLAYBOOK.md` §8；`server/prompt.js` `decideStep`；`server/paste.js`；`server/setup-text.js`；`server/nightly.test.js`；`server/paste.test.js`；`server/nightly.js`；`server/runner.js` |
| 继续加字数 / 续写段 | `测书思路.md` §3；`docs/PLAYBOOK.md` §5.5 §8；`server/playbook.js`（`CONTINUE_*`、`segmentFor`）；`server/index.js` 裁决；`server/prompt.js` `segment_outline`；`static/app.js` 裁决页 |
| 卡片类型 / 待确认 / 里程碑 / 改稿重整 | `测书思路.md` §2 §4；开书技能；`docs/PLAYBOOK.md` §7；`server/store.js`；`server/cards.js`；`server/book-ops.js`；`server/prompt.js`；`server/setup-text.js`；`server/cover-text.js`；`server/files.js`；`static/*` |
| 模型调用反馈 / 请求记录 | `docs/PLAYBOOK.md` §8；`server/requests.js`；`server/llm.js`；`server/index.js`；`static/app.js`；`static/index.html` |
| 工作台覆盖文稿 / 只导入新书 | `测书思路.md` §7；`server/files.js` `writeBookFiles` / `importManuscripts`；`server/files.test.js` |
| 当前书单 | `测书思路.md` §8；`文稿/` 各书文件夹（只 D） |
| 读写 `设定.md` 的解析/写出 | `server/cover-text.js`；`server/cover-text.test.js`；`server/files.js`（`gatherSetup`/`writeSetupMd`/`consolidateManuscripts`） |

## 文件各管什么

相对工作台根目录。C/D 各有一份，除非标明只 D。

| 文件 | 管什么 |
| --- | --- |
| `测书思路.md` | 人读总纲。改需求的第一处。§9 修订记录 |
| `.cursor/skills/ce-shu-lian-dong/SKILL.md` | 本清单。关联文件增减先改这里 |
| `.cursor/rules/ceshu-kai-shu.mdc` | 每次对话都生效的硬约束 |
| `.cursor/skills/kai-shu/SKILL.md` | 开一本新书时怎么写 `设定.md` |
| `docs/PLAYBOOK.md` | 生产线说明，数字必须等于 `playbook.js` |
| `README.md` | 对外一句话 |
| `server/playbook.js` | 锁定数字、六阶段和 `evaluate()` |
| `server/playbook.test.js` | 阈值、简介长度、阶段边界 |
| `server/prompt.js` | 提示词步骤、阶段目标、卡片选择、伏笔合并、迁移 beats |
| `server/cover-text.js` | `设定.md` 标题解析/写出 |
| `server/cover-text.test.js` | 封面与大纲不得漏进简介 |
| `server/files.js` | 文稿读写；store 权威覆盖 `设定.md`/章节；只导入 store 里没有的新书 |
| `server/files.test.js` | store 覆盖文稿、不反向覆盖已有书 |
| `server/setup-text.js` | 豆包提示词和贴回解析（设定/补大纲/章/变化/前情） |
| `server/paste.js` | 手动贴回、过期校验、单次撤销；简介硬拦；章节字数见总纲 |
| `server/paste.test.js` | `decideStep`、贴回解析、伏笔、撤销 |
| `server/runner.js` | API 自动生成（费用上限仍有效） |
| `server/index.js` | HTTP、在产槽、保存封面、生成大纲/章 |
| `server/store.js` | `store.json`；新建书默认候选；六阶段迁移；撤销快照 |
| `server/nightly.js` | 夜间步进 |
| `server/nightly.test.js` | `decideStep` 3/6 章 |
| `server/llm.js` | 模型调用（可取消）。超时毫秒不是章节字数 |
| `server/cards.js` | 卡片类型、待确认去重与确认、卡片块解析、时间线 |
| `server/book-ops.js` | 章节改稿标记与验收回填、里程碑、待确认、继续加字数 |
| `server/book-ops.test.js` | 迁移、卡片块、待确认、改稿重整、里程碑、继续与续写段 |
| `server/requests.js` | 请求记录（最近 500 条，不存 Key 和提示词） |
| `server/requests.test.js` | 请求记录上限与脱敏 |
| `server/webchat.js` | 站点 URL 名单 |
| `static/index.html` | 页面文案、标签/主题/简介、按钮 |
| `static/app.js` | 保存封面、状态切换、复制提示词 |
| `文稿/<编号-书名>/设定.md` | 该书全部设定（只 D） |
| `文稿/<编号-书名>/正文/` | 章节和 `全书.txt`（只 D） |

## 旧叫法（改完核对用）

搜到就改成现行叫法，或确认是「读旧稿」注释：

```text
设定/封面.txt
设定/卖点.txt
设定/人物.txt
大纲/三阶段.txt
伏笔/伏笔.txt
伏笔/前情.txt
一句话卖点
书名：
类型：
卖点
```

现行：一份 `设定.md`，标题为 标题 / 标签 / 主题 / 简介 / 人物 / 世界 / 大纲 / 伏笔 / 关系 / 地点势力 / 道具 / 前情；工作台另写只读的 时间线 / 续写段。旧叫法还有「再加约 30 万字」「+30 万」（现为可选加字数）。

## 不要做的事

- 不把 C 盘 `文稿/` 当正式稿
- 不把旧拆分 txt 再写回去（`files.js` 只许读旧稿并删）
- 不改正文《铜钱开口》（`文稿/1-书名/正文/`）
- 不自动打开豆包、不替用户发送

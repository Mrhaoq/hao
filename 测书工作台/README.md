# 测书工作台

本地工具，用来批量测书：每本先写到约 30 万字，把番茄后台数字抄进来，按打法决定继续、再观察或停更。

思路与完整口径见根目录 [测书思路.md](测书思路.md)。改需求先改总纲，再按 [.cursor/skills/ce-shu-lian-dong/SKILL.md](.cursor/skills/ce-shu-lian-dong/SKILL.md) 列出的关联文件改齐。生产线数字见 [docs/PLAYBOOK.md](docs/PLAYBOOK.md)，与 `server/playbook.js` 锁定为同一套；冲突以总纲为准。

## 做什么

- 一本一个项目：一份 `设定.md`（标题、标签、主题、简介、人物、世界、六阶段大纲、伏笔、前情），加 `正文/`、字数、API 费用。
- 同时在产不超过 3 本。新书默认候选；完整设定贴回后才能写第 1 章。字数或费用到上限后进入观察期，观察期不能加更到下一卷。
- 正式路径是手动贴豆包：工作台只准备提示词。每 3 章变化清单，每 6 章或重大转折重写结构化前情。勾选卡片优先，未勾选则自动挑。
- 卡片：人物、世界、伏笔、关系、地点势力、道具；新发现的先进待确认。六阶段内可加里程碑。改稿后先重整该章。
- 裁决「继续」可选加 5 / 10 / 20 / 30 万字（默认 10 万）。
- 工作台数据覆盖文稿。流量手工录入，不对接番茄后台。API 生成仍走你自己的 API Key；请求有计时、可取消，记录在「请求记录」页。

## 运行

需要本机 Node.js 18+（零额外依赖）。

```powershell
cd $env:USERPROFILE\ceshu-workbench
copy .env.example .env
npm start
```

在 `.env` 里填 `CESHU_API_KEY`，或启动后在页面「设置 API」里填。默认模型 `deepseek-flash`，接口 `https://api.deepseek.com`。

浏览器打开 http://127.0.0.1:8787

数据存在 `data/store.json`，不要提交这个目录。正文可在章节页导出为 txt。

```powershell
npm test
```

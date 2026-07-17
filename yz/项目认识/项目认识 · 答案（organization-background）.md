# 项目认识 · 答案（organization-background）

> 依据：仓库代码与配置调研。每题含「结论 + 关键路径」。不确定处标明「未从代码确认」。  
> 调研日期：2026-07-17。不改业务代码。
>
> **源文件：** `D:/A-work/yz/organization-background/docs/项目认识-答案.md`  
> **系列索引：** [项目认识 · 索引](./项目认识%20·%20索引.md) · [公司业务流程](./公司业务流程.md)  
> **姊妹文档：** [yishou-mobile](./项目认识%20·%20答案（yishou-mobile）.md) · [crm](./项目认识%20·%20答案（crm）.md) · [nurse-mini](./新项目认识%20·%20答案（nurse-mini）.md)

---

## 一、项目定位与业务

### 1. 这个项目是做什么的？面向谁？核心业务一句话？

**结论：** 医疗机构 / 陪护机构的 **B 端运营后台（PC Web）**，面向机构运营人员（照护师管理、订单、排班、财务、审批等）。核心：管陪护业务从人、单、班到钱、审的运营闭环。

**路径：**
- `README.md`（标题「机构后台」）
- `index.html`（`<title>陪护后台</title>`）
- `src/views/`（业务模块目录）

---

### 2. 产品名 / 品牌在代码里叫什么？和仓库名是否一致？

**结论：** 不一致。
| 名称 | 出处 |
|---|---|
| 仓库 / 包名 | `organization-background` |
| README | 「机构后台」 |
| 页面标题 | 「陪护后台」（`document.title` 后缀也是「陪护后台」） |
| Favicon / 品牌 | 颐挚科技 logo（静态资源） |

**路径：**
- `package.json`（`"name": "organization-background"`）
- `README.md`
- `index.html`
- `src/router/filterRouter.ts`（`陪护后台`）

---

### 3. 是纯前端 / 纯后端 / 全栈？配套仓库线索？

**结论：** **纯前端 SPA**，无服务端 / DB 代码。配套系统从 URL 配置可推断（非本仓）：

| 线索 | 域名模式 |
|---|---|
| 网关 | `gateway-*.yza.cn` |
| 登录中心 | `login-*.yza.cn` |
| 审批 / 流程 | `wflow-web-*.yza.cn` |
| 移动端 | `mobile-*.yza.cn` |
| AI 大屏 | `ai-screen-*.yza.cn` |
| CRM | `work-crm-*.yza.cn` |
| 挚护通 H5 | `fe-static.yza.cn/.../nurse-mini/` |
| 接口文档 | `yapi.yza.cn` |
| Git 组 | `gitlab.yza.cn:yilife-web/...` |

**路径：**
- `src/utils/getCurrentUrl.ts`
- `git remote` → `git@gitlab.yza.cn:yilife-web/organization-background.git`

完整配套仓库清单：**未从代码确认**（需问同事）。

---

### 4. 主要业务域有哪些？各自大致负责什么？

**结论：** 按 `src/views/` 一级目录归纳（推断自目录名 + 路由 meta.title）：

| 业务域 | 目录 | 大致职责 |
|---|---|---|
| 照护师 | `nurseManage` | 照护师信息、编辑、能力模型、服务小组 |
| 住院订单 | `inpatientCare` | 住院陪护订单等 |
| 免陪 | `noEscortCare` / `noEscortCareCompare` | 免陪订单与数据对比 |
| 业务配置 | `businessManagement` | 套餐/站点/医院项目等配置 |
| 排班 | `workforceManage` / `scheduling` | 排班 |
| 财务（旧目录名） | `financialManagement` | 薪资、对账、开票等 |
| 财务统计（新） | `financesManageNew` | 订单/护工支出等统计 |
| 审批 | `approvalManagment` / `todo` | 审批流、待办、发票袋等 |
| 智能表单 | `smartForm` | 智能表单 |
| AI 督导 | `aiSupervisor` | AI 督导报告等 |
| 面试 / 体检 / 考核 | `interview` / `physicalExamination` / `examinationManage` | 人事相关 |
| 组织权限 | `org` / `roleManage` / `role-manage` / `authManage` | 机构、角色、数据权限 |
| 评价 / 巡检 | `evaluation` / `serviceInspectionManage` / `nurseFeedback` | 质量 |
| 营销 / 系统 | `marketingCenter` / `system` / `preference` | 运营与配置 |
| 其它 | `insurance`、`dataEaseManage`、`iframe`、`pdf-view` 等 | 保险、BI、嵌入页等 |

**路径：** `src/views/`、`src/router/modules/`

---

### 5. 从登录到完成一件核心任务的主流程路径？

**结论（以「照护师管理」为例，从代码启动链路还原）：**

1. 用户在登录中心登录 → Cookie `yilifeToken`（或 URL `token`）
2. 打开本系统 → `index.html` → `src/main.js` `init()`
3. 拉用户 `api16003`、机构列表 `api14371`、菜单 `api14379`，写入 Pinia
4. `App.vue` 有 `userInfo.id` 才渲染路由
5. `Home.vue`：Header + Sidebar（菜单来自后端）+ 内容区
6. 进入 `/nurseManage/index` → 列表操作 → `/nurseManage/edit` 编辑
7. 接口经 `src/utils/http.ts` 自动带 Token / orgId

**路径：**
- `src/main.js`
- `src/App.vue`
- `src/views/Home.vue`
- `src/router/modules/nurseManage.js`
- `src/utils/http.ts`、`src/utils/noLoginJump.js`

---

### 6. 哪些模块看起来已废弃或双轨并存？

**结论：**

| 迹象 | 说明 |
|---|---|
| 照护师新旧页 | `/nurseManage/new` → `oldIndex.vue`，meta 标题「照护师基本信息**老**」；正式列表为 `/nurseManage/index` |
| 角色管理两套 | `roleManage`（`/roleManage`）与 `role-manage`（`/role-manage/data` 数据权限）并存 |
| 财务两套目录 | `financialManagement`（薪资/对账/开票）与 `financesManageNew`（财务统计类，路由仍挂 `/financesManage/*`） |
| API 字段废弃标记 | 生成接口注释中大量「已废弃」字段（YApi 同步，不代表整模块废弃） |

是否业务上已下线旧页：**未从代码确认**。

**路径：**
- `src/router/modules/nurseManage.js`
- `src/views/nurseManage/oldIndex.vue`
- `src/router/modules/userManage.js`、`authManage.js`
- `src/router/modules/salaryManagement.js`、`financesManage.js`

---

## 二、技术栈与运行

### 7. 技术栈？

**结论：**

| 类别 | 技术 | 版本线索 |
|---|---|---|
| 框架 | Vue | `^3.2.37` |
| 路由 | vue-router | `^4.0.10` |
| 状态 | Pinia + pinia-plugin-persist | `^2.0.14` / `^1.0.0` |
| UI | Element Plus、`@yza-fe/element-plus`、部分 ant-design-vue、vxe-table | EP `2.11.0` 等 |
| 请求 | Axios | `^0.21.1` |
| 构建 | Vite | `^3.0.0` |
| 语言 | TypeScript + JS 混用 | TS `4.7.4` |
| 样式 | Less | `^4.1.3` |
| 其它 | vue-i18n、ECharts、WangEditor、dayjs/moment 等 | — |

**路径：** `package.json`、`README.md`

---

### 8. 支持哪些端？

**结论：** **PC 管理后台（Web）**。非小程序主工程；无 `pages.json`。会嵌 iframe（wflow 等）、链到 mobile / nurse-mini H5，但本仓本身是后台。

**路径：** `index.html`、`src/views/Home.vue`、`src/utils/getCurrentUrl.ts`

---

### 9. 本地如何安装与启动？各环境命令？访问地址？

**结论：**

```bash
# Hosts
127.0.0.1 local.yza.cn

# 安装（见第 10 题，以 yarn 为准）
yarn install

# 改联调环境
# src/utils/env.ts → devEnv = 'dev' | 'sit' | ...

yarn dev          # 或 yarn serve
yarn dev:uat
yarn dev:prd
yarn build:dev|sit|uat|prd|demo
yarn preview
```

访问：Vite 配 `host: 'local.yza.cn'` + HTTPS（证书 `cert/`），具体端口以启动日志为准（**未在配置写死 port**，默认多为 5173）。

**路径：**
- `README.md`
- `package.json` → `scripts`
- `vite.config.ts` → `server`
- `src/utils/env.ts`

---

### 10. Node / 包管理器要求？lock？私有包？

**结论：**
- Lock 文件：**`yarn.lock` 存在**；无 `package-lock.json` / `pnpm-lock.yaml` → **以 Yarn 为准**
- `.yarnrc`：淘宝镜像；`.npmrc`：`registry=npmmirror`，且 `@yza-fe` 指向火山制品库私服
- `package.json` 有 `pnpm.overrides` 段，但无 pnpm lock → 以 yarn 为主
- `engines` 字段：**未声明** → Node 最低版本 **未从代码确认**

**路径：** `yarn.lock`、`.yarnrc`、`.npmrc`、`package.json`

---

### 11. 构建产物在哪？预览工具？

**结论：** Vite 未自定义 `build.outDir`，默认输出 **`dist/`**。预览用 `yarn preview`（浏览器），**不是**微信开发者工具。

**路径：** `vite.config.ts`、`package.json` → `"preview"`

---

### 12. 环境怎么切换？

**结论：**
1. **本地 serve**：改 `src/utils/env.ts` 的 `devEnv`
2. **构建**：`vite build --mode <dev|sit|uat|prd|demo>`，`import.meta.env.MODE` → `envByMode`
3. 无 `.env*` 文件；网关/登录 URL 写在 `getCurrentUrl.ts`

**路径：** `src/utils/env.ts`、`src/utils/getCurrentUrl.ts`、`package.json` scripts

---

## 三、目录与架构

### 13. `src` 下一级目录职责？

| 目录 | 职责 |
|---|---|
| `apis/` | yapi-magic 生成的接口（`api{id}.ts`） |
| `api-ytt/` | yapi-to-typescript / ytt 生成的另一套 API |
| `assets/` | 样式、静态资源 |
| `components/` | 跨业务公共组件（布局、表格、上传等） |
| `directive/` | 自定义指令（如 permission） |
| `hooks/` | 组合式 hooks |
| `libs/` | 第三方/本地库（pdf、高拍仪 cam 等） |
| `plugins/` | Element Plus / 内部 UI 注册 |
| `router/` | 路由实例、守卫、按模块拆分的 routes |
| `store/` | Pinia stores |
| `utils/` | 请求、环境、权限、上传等工具 |
| `views/` | 业务页面 |

**路径：** `src/`

---

### 14. 入口文件是哪些？

**结论：**
1. `index.html` → `#app` + `./src/main.js`
2. `src/main.js` → 创建应用、拉权限、挂 router
3. `src/App.vue` → 条件渲染 `<router-view />`
4. 布局：`src/views/Home.vue`

**路径：** 同上

---

### 15. 页面怎么组织？主包 / 分包？

**结论：** **非小程序**，无主包/分包/`pages.json`。页面按业务在 `src/views/<模块>/`，路由按模块在 `src/router/modules/*.js`，由 `src/router/index.js` 聚合 `addRoute`。Vite 用动态 `import()` 做代码分割（注释里仍见 `webpackChunkName`，历史遗留）。

**路径：** `src/views/`、`src/router/index.js`、`src/router/modules/`

---

### 16. 公共组件、业务组件放哪？约定？

**结论：**
- **公共：** `src/components/`（如 `Header.vue`、`Sidebar.vue`、`advanced-table/`、`ez-page/`、`uploadSingle.vue` 等）
- **业务：** 各 `src/views/<模块>/components/`
- 命名：**未从代码确认**统一强制规范；ESLint 关闭了 `vue/multi-word-component-names`

**路径：** `src/components/`、`src/views/nurseManage/components/`、`.eslintrc.cjs`

---

### 17. 接口层怎么分层？手写还是生成？

**结论：** 两套生成 + 统一走 `service`：
1. **`src/apis/api*.ts`**：`yarn yapi` / `yapiMagic`（`yapiMagic.config.ts`）
2. **`src/api-ytt/`**：`yarn ytt`（`ytt.config.ts`）
3. 底层：`src/utils/http.ts` 的 `service` / `instance`

手写业务接口较少见，多为生成文件内 `export default` 调 `service`。

**路径：** `src/apis/api16003.ts`、`yapiMagic.config.ts`、`ytt.config.ts`、`package.json` scripts

---

### 18. 横切能力放在哪？

| 能力 | 位置 |
|---|---|
| HTTP / 鉴权跳转 | `src/utils/http.ts`、`noLoginJump.js`、`token.js` |
| 环境 / URL | `env.ts`、`getCurrentUrl.ts` |
| systemCode | `config.js` |
| 权限 | `utils/permissions.js`、`directive/permission/` |
| 上传 | `utils/fileUpload.js`、组件 `uploadSingle.vue` |
| 枚举工具 | `utils/enum/`、各业务 `constants.ts` |
| 全局指令 | `directive/`，在 `main.js` 注册 |

**路径：** `src/utils/`、`src/directive/`

---

### 19. TS / JS 混用？规范？

**结论：** **混用**（`allowJs: true`，`strict: false`）。大量 `@ts-nocheck`。ESLint（Vue3 + TS，规则较松）+ Prettier（4 空格、无分号、`printWidth: 1000`）。无 Husky。

**路径：** `tsconfig.json`、`.eslintrc.cjs`、`.prettierrc`

---

## 四、路由、导航与入口

### 20. 路由配置在哪？TabBar？

**结论：** 路由在 `src/router/`（`index.js` 聚合 + `modules/*`）。**无 TabBar**（非小程序）。侧边栏菜单由后端 `api14379` 返回，前端 `Sidebar.vue` 渲染。

**路径：**
- `src/router/index.js`
- `src/router/createRouter.js`
- `src/router/modules/*`
- `src/components/Sidebar.vue`
- `src/store/sidebar.js`

---

### 21. 自定义导航 / 自定义 TabBar？

**结论：** 自定义 **顶栏 + 侧栏**：`Header.vue` + `Sidebar.vue`，在 `Home.vue` 组装。iframe 场景可隐藏头侧栏（`isInIframe` / `onlyContent`）。无自定义 TabBar。

**路径：** `src/views/Home.vue`、`src/components/Header.vue`、`src/components/Sidebar.vue`

---

## 五、数据、请求与鉴权

### 22. HTTP 封装在哪？如何挂到实例？

**结论：** `src/utils/http.ts` 创建 axios `instance`，导出 `service`。生成 API 直接 `import { service } from '@/utils/http'`，**未**挂到 `app.config.globalProperties.$request`（全局挂的是 `$hasPermission`）。

**路径：** `src/utils/http.ts`、`src/main.js`、`src/apis/api16003.ts`

---

### 23. baseURL / 网关怎么按环境切换？

**结论：** 每个生成 API 用 `getCurrentUrl(yapiProjectId, path)` 拼完整 URL；按 `currentEnv` 选网关：

- mock → `https://yapi.yza.cn/mock/{projectId}`
- dev/sit/uat/prd/demo → `https://gateway-*.yza.cn` + path

**路径：** `src/utils/getCurrentUrl.ts`、`src/utils/env.ts`

---

### 24. Token、用户、机构存在哪？请求如何带上？

**结论：**

| 数据 | 存储 |
|---|---|
| Token | Cookie `yilifeToken`；也可 URL `token` / `localStorage.token` |
| 用户信息 | Pinia `userStore.userInfo`（内存，启动时 `api16003`） |
| 机构 | Pinia `userStore.org`，**persist 到 localStorage key=`org`** |
| systemCode | URL / sessionStorage / 默认 `100002` |
| resourceid | `localStorage.resourceid` → 请求头 |

请求自动带：`Authorization`、`systemCode`、`reqChannel`、`tenantId`/`orgId`（来自当前机构）、`resourceid`。

**路径：**
- `src/utils/token.js`、`http.ts`、`config.js`
- `src/store/userStore.js`
- `src/main.js`

---

### 25. 401 / 未登录如何处理？

**结论：**
- HTTP 401 → `noLoginJump()`
- 路由守卫无 Cookie → `noLoginJump()`
- `noLoginJump`：提示后清 `localStorage.org`，跳转 `login-*.yza.cn/login`（本地 `local` 域名用 `window.open`）

**路径：** `src/utils/http.ts`、`src/router/filterRouter.ts`、`src/utils/noLoginJump.js`

---

### 26. 上传、WebSocket、推送等特殊通道？

**结论：**
- **上传：** 走网关路径如 `/oss-web/oss/upload/file`（`fileUpload.js`）；页面也用上传组件；`index.html` 引入火山 TOS SDK（CDN）
- **WebSocket：** 主要在 `src/libs/cam/`（高拍仪本地 `ws://ip:9002`），非业务推送通道
- **推送服务独立域名：** **未从代码确认**业务推送；审批待办数量用 HTTP `wflowWflowFlowDataTodosGetAll`

**路径：** `src/utils/fileUpload.js`、`index.html`、`src/libs/cam/`、`src/router/filterRouter.ts`

---

### 27. 权限模型？

**结论：**
| 类型 | 实现 |
|---|---|
| 菜单权限 | 后端菜单 `api14379`；生产环境路由守卫按二级 path 校验；**开发环境 `isDev` 绕过菜单校验** |
| 按钮权限 | `v-permission` / `hasBtnPermission` / `$hasPermission`，对照当前菜单 `childrenButton.resourceCode`；**开发环境默认放行** |
| 数据权限 | 页面 `/role-manage/data`（陪护管理范围 / AI 督导查看范围）配置；具体接口过滤逻辑在后端，前端配置页在 `views/role-manage` |

白名单路由、`bypassAuth`、iframe 内可跳过守卫。

**路径：**
- `src/router/filterRouter.ts`
- `src/directive/permission/permission.ts`
- `src/utils/permissions.js`
- `src/views/role-manage/data/index.vue`
- `src/router/modules/authManage.js`

---

## 六、状态与全局能力

### 28. 状态管理？模块怎么拆？

**结论：** Pinia。可见模块：
- `userStore` — 用户 / 机构
- `sidebar` — 菜单 / 折叠
- `countStore` — 待办数等
- `smartFormStore` — 智能表单
- `loading.js`、`useCatchQueryParams.js` 等

入口聚合：`src/store/index.js`

**路径：** `src/store/`

---

### 29. 哪些状态会持久化？

**结论：**
- Pinia persist：`userStore.org` → **localStorage `org`**
- Cookie：`yilifeToken`
- localStorage：`token`、`resourceid`、`bypassAuth`、iframe 布局 `initX`/`initY` 等
- sessionStorage：`systemCode`

**路径：** `src/store/userStore.js`、`src/utils/http.ts`、`src/utils/config.js`、`src/main.js`

---

### 30. 全局方法 / 原型扩展？

**结论：**
- `app.config.globalProperties.$hasPermission = permissions`
- 指令：`permission`、以及 `main.js` 内联 `v-drag`、`v-loadMore`
- **无** `$request` 全局挂载
- 埋点 SDK：**未从代码确认**（未搜到典型 sensors/sentry 接入）

**路径：** `src/main.js`、`src/utils/permissions.js`、`src/directive/`

---

### 31. JSBridge / App 内嵌 H5？

**结论：** **无典型 JSBridge**。有 **iframe 父子 `postMessage`**（布局 rect、面包屑、smartForm、wflow iframe 等），属 Web 嵌套，不是 Native Bridge。

**路径：** `src/main.js`、`src/views/Home.vue`、`src/components/iframePage.vue`、`src/router/iframeBreadcrumb.js`

---

## 七、后端 / 服务端（如适用）

### 32～35.

**结论：** 本仓库为纯前端，以下均 **不适用 / 未从本仓代码确认**：
- 32. API 为 REST 风格（YApi 生成 GET/POST）；契约在 **YApi**（生成文件头注释带链接，如 `https://yapi.yza.cn/project/29/interface/api/16003`）
- 33. 无数据库 / ORM / 迁移
- 34. 无缓存 / MQ / 定时任务配置
- 35. 前端经 **gateway** 调后端；登录走 **login 中心**；是否微服务属后端范畴

**路径（契约线索）：** `src/apis/*.ts` 文件头注释、`yapiMagic.config.ts`、`ytt.config.ts`、`src/utils/getCurrentUrl.ts`

---

## 八、业务地图与危险区

### 36. 核心业务模块？（同第 4 题，按路由侧重点）

**结论：** 从路由模块体量与侧栏逻辑看，高频核心包括：照护师、住院/免陪订单、业务配置、排班、财务（薪资/对账/开票 + 财务统计）、审批待办、组织权限。其余为督导、面试体检、营销等扩展域。

**路径：** `src/router/modules/`、`src/views/`

---

### 37. 模块间关键链路？

**结论（从页面引用与路由交叉推断，非官方业务文档）：**
- 对账详情可跳到住院订单详情（`salaryManagement` 路由引用 `inpatientCare/orderDetail`）
- 财务统计菜单可新开页（`Sidebar` 对 `/financesManage` 特殊处理）
- 审批待办数全局拉取，侧栏角标展示
- 照护师 ↔ 排班 / 财务分佣相关配置（业务常量如小组分佣规则在 nurseManage）

完整链路文档：**未从代码确认**。

**路径：**
- `src/router/modules/salaryManagement.js`
- `src/components/Sidebar.vue`
- `src/router/filterRouter.ts`
- `src/views/nurseManage/constants.ts`

---

### 38. 「危险区」迹象？

**结论：** 代码中有明确财务/开票/对账/税金/数据权限等模块，改动需谨慎：
- `financialManagement`（薪资、对账、开票、云账户发票等）
- `financesManageNew`（收入/结算差异、税金）
- `approvalManagment`（审批、印章、发票袋）
- `role-manage` / `roleManage` / `authManage`（权限）
- `http.ts` 中 orgId 注入逻辑（注释「大坑」）

**路径：** 上述目录 + `src/utils/http.ts`

---

### 39. 关键枚举、状态机怎么定义？

**结论：** **分散在各业务模块**，多为 `constants.ts` / `options.ts` / `enum` 目录下的数组或 enum，无统一全局状态机框架。例：照护师证书类型 `mediaCertificateType`。

**路径：**
- `src/views/nurseManage/constants.ts`
- `src/views/inpatientCare/options.ts`
- `src/utils/enum/`
- 其它模块各自 `constants.*`

---

### 40. 「改动时要小心」的注释？

**结论：**
- `src/utils/http.ts`：`// 此处大坑，...params不能写在后面老代码取得orgId不对`
- `src/utils/http.ts`：`// TODO 上线后删除`（reqChannel 相关）
- `src/utils/term.js`：有「注意」类注释
- 生成 API 中大量「已废弃」字段注释
- `nurseManage` 路由显式保留「老」页面

**路径：** 同上

---

## 九、工程与协作

### 41. ESLint / Prettier / Husky / lint-staged？

**结论：**
- ESLint + Prettier：**有**（`.eslintrc.cjs`、`.prettierrc`）；Vite 插件 `vite-plugin-eslint`
- 脚本：`yarn lint` = `vue-tsc --noEmit && eslint --fix ...`
- **Husky / lint-staged：未启用**（无 `.husky`，package.json 无相关依赖）

**路径：** `.eslintrc.cjs`、`.prettierrc`、`package.json`、`vite.config.ts`

---

### 42. 环境变量约定？

**结论：** **不是** `VUE_APP_*` / `VITE_APP_*` 业务配置模式。主要用：
- `import.meta.env.MODE`（Vite mode）
- 手写 `devEnv` / `currentEnv`
- URL query：`systemCode`、`token`、`orgId`、`bypassAuth` 等

**路径：** `src/utils/env.ts`、`src/utils/config.js`

---

### 43. 文档现状？

**结论：** `README.md` 覆盖技术栈、hosts、env、Git-flow、yapi 用法，但仍有重复条目、未写 yarn/私服细节、未列业务模块地图。本目录另有：
- `docs/01-认识新项目如何提问.md`
- `docs/02-organization-background项目认识.md`
- 本文 `docs/项目认识-答案.md`

仍缺：配套仓库清单、模块负责人、账号申请流程等（需问人）。

**路径：** `README.md`、`docs/`

---

### 44. 已知技术债迹象？

**结论：**
- TS/JS 混用 + 大量 `@ts-nocheck` / `any`
- 双套 API 生成（apis vs api-ytt）
- 模块命名并存（roleManage / role-manage；financial vs financesManageNew）
- 照护师 old 页面仍挂路由
- Axios 版本较旧（0.21）
- dayjs 与 moment 并存
- `printWidth: 1000`、lint 规则大量关闭
- README 与页面产品名不一致

**路径：** 见上文各节引用

---

### 45. 部署相关配置？

**结论：** 仓库内 **无 Dockerfile / K8s / GitHub Actions yml**。README 写明由 **Jenkins** 按分支环境打包部署。CI 配置不在本仓。

**路径：** `README.md`（Git-flow / Jenkins 说明）

---

### 46. 监控、日志、埋点？

**结论：** 未见 Sentry / 神策等统一埋点封装；多为 `console.log/error`。监控接入方式 **未从代码确认**。

**路径：** 全库检索未见典型监控 SDK 接入文件

---

## 十、上手行动清单

### 47. 新人第一天建议阅读顺序

1. `README.md`
2. `package.json`
3. `src/utils/env.ts`、`getCurrentUrl.ts`
4. `src/main.js` → `App.vue` → `views/Home.vue`
5. `src/utils/http.ts`、`noLoginJump.js`、`token.js`
6. `src/router/index.js` + `filterRouter.ts` + 一个 `modules/*.js`
7. `src/store/userStore.js`、`sidebar.js`
8. `src/directive/permission/permission.ts`
9. 认领模块：如 `src/views/nurseManage/` + `src/router/modules/nurseManage.js`

---

### 48. 改一个普通列表页，通常动哪几层？

**结论（以照护师列表为例）：**
1. 页面：`src/views/<模块>/index.vue`（及同目录 components）
2. 常量/列配置：同目录 `constants.ts` 等
3. 接口：`src/apis/apiXXXX.ts`（一般不手改生成文件，缺接口先 yapi 生成）
4. 权限：按钮 `v-permission` / `resourceCode`（若需）
5. 路由：通常已有；仅改 path/meta 时动 `src/router/modules/<模块>.js`

**路径示例：** `src/views/nurseManage/index.vue`、`src/router/modules/nurseManage.js`

---

### 49. 加一个新页面的标准步骤？

**结论：**
1. 在 `src/views/<模块>/` 新建 `.vue`
2. 在 `src/router/modules/<模块>.js` 增加 route（`path` / `name` / `meta.title` / 懒加载 component）
3. 确认该 module 已在 `src/router/index.js` 引入并 `addRoute`
4. **菜单入口**：需后端菜单配置 path 与前端一致（前端 Sidebar 读后端菜单）
5. 若需按钮权限：与后端约定 `resourceCode`，模板用 `v-permission`

无「分包」步骤（非小程序）。

**路径：** `src/router/index.js`、`src/router/modules/`、`src/store/sidebar.js`

---

### 50. 加一个新接口的标准步骤？

**结论：**
1. 在 YApi 建好接口
2. **优先** `yarn yapi`（写入 `src/apis/`）或 `yarn ytt`（写入 `src/api-ytt/`，看所属 YApi 项目是否已在对应 config）
3. 页面 `import apiXXXX from '@/apis/apiXXXX'` 调用
4. 一般 **不要手改**生成文件；两套生成以哪个为准：**未从代码确认统一规范**（审批/费控等可见 ytt 使用较多）

**路径：** `yapiMagic.config.ts`、`ytt.config.ts`、`package.json`

---

### 51. 只熟悉「某模块」从哪切入？（以 nurseManage 为例）

**结论：四条线并行：**

| 线 | 路径 |
|---|---|
| 路由 | `src/router/modules/nurseManage.js` |
| 页面入口 | `src/views/nurseManage/index.vue`、`nurseEdit.vue`、`oldIndex.vue` |
| 业务组件 | `src/views/nurseManage/components/`（含 `nurse-info/cert-info.vue` 等） |
| 常量枚举 | `src/views/nurseManage/constants.ts`、`utils.js` |
| 接口 | 列表页 import 的 `apis/api*`（从页面追） |
| 权限 | 页面内 `v-permission` / `hasBtnPermission` |

换其它模块时：用同名 `views/<模块>` + `router/modules/<相近名>.js` 替换即可。

---

## 附：仍需问同事的缺口（代码未覆盖）

1. 完整配套仓库与负责人表  
2. 开发账号 / 私服 `.npmrc` 申请流程  
3. yapi vs ytt 团队默认约定  
4. 照护师 `oldIndex`、旧财务页是否仍在生产使用  
5. Jenkins Job 名与发布值班  
6. 监控 / 埋点是否另有 SDK 注入（CDN 或运维层）
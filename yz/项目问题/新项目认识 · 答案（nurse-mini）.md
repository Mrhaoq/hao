# 新项目认识 · 答案（nurse-mini）

> 对应提问清单（用户本轮题单）  
> 调研范围：本仓库代码与配置；不改业务代码  
> 生成日期：2026-07-17  
> 约定：每题「结论 + 关联路径」；不确定处标明「未从代码确认」
>
> **源文件：** `D:/A-work/yz/nurse-mini/docs/项目认识-答案.md`  
> **系列索引：** [项目认识 · 索引](./项目认识%20·%20索引.md)  
> **姊妹文档：** [yishou-mobile](./项目认识%20·%20答案（yishou-mobile）.md) · [crm](./项目认识%20·%20答案（crm）.md) · [organization-background](./项目认识%20·%20答案（organization-background）.md)

---

## 一、项目定位与业务

### 1. 这个项目是做什么的？面向谁？核心业务一句话？

**结论：** 挚护通业务侧移动端（uni-app），面向机构/门店工作人员（管家、护理员/护工相关角色等），核心是「在工作台完成人员、订单、审批、学习等日常运营」。

**关键路径：**
- [`src/pages.json`](src/pages.json)（Tab：工作台/订单/消息/学习/我的）
- [`src/pages/index/index.vue`](src/pages/index/index.vue)（工作台菜单）

### 2. 产品名 / 品牌在代码里叫什么？和仓库名是否一致？

**结论：** 产品展示名多为「挚护通」；仓库 / npm 名为 `nurse-mini`，不一致。

**关键路径：**
- [`package.json`](package.json)（`"name": "nurse-mini"`）
- [`src/pages.json`](src/pages.json)（`navigationBarTitleText: "挚护通"`）
- [`src/pages/index/index.vue`](src/pages/index/index.vue)（无机构时标题「挚护通」）

### 3. 是纯前端 / 纯后端 / 全栈？有没有配套仓库线索？

**结论：** 纯前端（uni-app 客户端）。通过网关域名 `*.yza.cn` 调后端；H5 静态资源路径含 `nurse-mini/web`；另有 mobile 站、chat wss、push 域名。本仓库无后端代码。配套仓库具体名「未从代码确认」（仅见域名与路径约定）。

**关键路径：**
- [`src/common/env.js`](src/common/env.js)（gateway / mobile / wss / fe-static 路径）
- [`package.json`](package.json)（仅前端脚本与依赖）

### 4. 主要业务域有哪些？各自大致负责什么？

**结论：** 按主包 Tab + 分包划分：

| 区域 | 大致职责 |
|------|----------|
| 主包 `pages/*` | Tab 壳：工作台、订单跳转、消息跳转、学习、我的 |
| `subPackagesIndex` | 服务人员/护工、报名、审批、合同、授权等首页扩展 |
| `subPackagesOrder` | 订单列表/详情、开票、结算等 |
| `subPackagesMenu` | 部分角色订单（如 nurseOrder、待办） |
| `subPackagesMy` | 个人中心、收入等 |
| `subPackagesMessage` | 消息中心实体页 |
| `subPackagesTraining` | 培训/学习 |
| `subPackagesMotherHealth` | 母婴健康订单 |
| `subPackagesOA` | OA / 审批流 |
| `subPackagesSchedule` / `Calendar` | 排班、日历、工作日志相关 |
| `subPackagesService` | 服务（如巡检） |
| `subPackagesCharts` / `DailyChart` / `Log` | 报表、日报、运营分析 |
| `subPackagesForm` | 智能表单 |
| `subPackagesAi` / `Home` / `CustomerResource` | AI、随手记/首页能力、客资 |

**关键路径：** [`src/pages.json`](src/pages.json)（`subpackages[].root`）

### 5. 从登录到完成一件核心任务的主流程路径是什么？

**结论（微信小程序侧可确认的主路径）：**

1. 启动 [`src/App.vue`](src/App.vue) `onLaunch`：可从 query 灌入 token/userId/orgId；拉菜单资源  
2. 无 token 时跳转授权页 [`src/subPackagesIndex/pages/index/authorization/index.vue`](src/subPackagesIndex/pages/index/authorization/index.vue)（`custom-authorization`）  
3. 请求层 401 时可 [`src/common/request.js`](src/common/request.js) `silentLogin`（`user-web-2/wemini/silentLogin`）  
4. 进入工作台 [`src/pages/index/index.vue`](src/pages/index/index.vue)，拉取 `workTableMenu`  
5. 点菜单进入分包业务（例：服务人员 [`src/subPackagesIndex/pages/index/nursingWorker/index.vue`](src/subPackagesIndex/pages/index/nursingWorker/index.vue)）  
6. 订单 Tab 壳页按角色 `reLaunch` 到真实订单页（见下题双轨）

**H5：** 未登录走 `jsBridge.toLogin`（[`src/common/jsBridge.js`](src/common/jsBridge.js)），依赖宿主 App。

### 6. 哪些模块看起来已废弃或双轨并存？

**结论（有代码迹象）：**

| 迹象 | 说明 |
|------|------|
| Tab 壳 + 分包实页 | `pages/order`、`pages/message` 几乎空壳，再跳分包 |
| `IssueInvoice-old.vue` | 开票旧文件仍在仓库 |
| `reqChannel` | 请求头标注废弃兼容 |
| 接口注释切换 | 如星级列表旧接口注释、新接口启用 |
| `@deprecated` | 订单工具函数标注废弃 |
| README vs scripts | README 的 `serve`/`build` 与现行脚本不一致 |
| 双 custom-tabbar | 全局与 My 分包各一份 |

**关键路径：**
- [`src/pages/order/index.vue`](src/pages/order/index.vue)
- [`src/pages/message/index.vue`](src/pages/message/index.vue)
- [`src/subPackagesOrder/pages/order/IssueInvoice/IssueInvoice-old.vue`](src/subPackagesOrder/pages/order/IssueInvoice/IssueInvoice-old.vue)
- [`src/common/request.js`](src/common/request.js)（`reqChannel` 注释）
- [`src/apis/nurse.js`](src/apis/nurse.js)（旧 get 注释）
- [`src/subPackagesOrder/pages/order/utils.js`](src/subPackagesOrder/pages/order/utils.js)
- [`README.md`](README.md) vs [`package.json`](package.json)
- [`src/components/custom-tabbar/custom-tabbar.vue`](src/components/custom-tabbar/custom-tabbar.vue)
- [`src/subPackagesMy/components/custom-tabbar/index.vue`](src/subPackagesMy/components/custom-tabbar/index.vue)

---

## 二、技术栈与运行

### 7. 技术栈是什么？

**结论：**
- 框架：Vue **2.6.11** + uni-app（`@dcloudio/*` **2.0.1-339…**）
- UI：`@dcloudio/uni-ui`；README 写 uView，但 **`package.json` 未声明 uview**，工作区也未见 uview 目录 → README 可能过时
- 状态：代码使用 **Vuex** + `vuex-persistedstate`；**`package.json` 未显式声明 `vuex`**，当前 `node_modules/vuex` 不存在（需确认安装是否完整）
- 构建：Vue CLI 4 + `@dcloudio/vue-cli-plugin-uni`；Sass；ESLint + Prettier

**关键路径：** [`package.json`](package.json)、[`src/store/index.js`](src/store/index.js)、[`src/main.js`](src/main.js)、[`README.md`](README.md)

### 8. 支持哪些端？

**结论：** 脚本明确支持 **H5**、**微信小程序**。依赖含多端 uni 包与 `uni-app-plus`，但日常 npm scripts 未覆盖其它端打包。App 能力主要通过 H5 + JSBridge 嵌入宿主。

**关键路径：** [`package.json`](package.json)（`dev:h5*` / `dev:mp-weixin*`）、[`src/common/jsBridge.js`](src/common/jsBridge.js)

### 9. 本地如何安装与启动？开发 / UAT / 生产命令？访问地址？

**结论：**

```bash
npm install   # 或 yarn（双 lock 并存，见题 10）
```

| 环境 | H5 | 微信小程序 |
|------|----|------------|
| develop | `npm run dev:h5` / `build:h5` | `npm run dev:mp-weixin` / `build:mp-weixin` |
| uat | `dev:h5-uat` / `build:h5-uat` | `dev:mp-weixin-uat` / `build:mp-weixin-uat` |
| release | `dev:h5-prd` / `build:h5-prd` | `dev:mp-weixin-prd` / `build:mp-weixin-prd` |

**访问地址：**
- H5：`vue.config.js` **未配置 port**，一般为 uni/vue-cli 默认（常见 `http://localhost:8080`）→ **未从代码确认确切端口**
- 小程序：微信开发者工具打开产物目录（见题 11）
- 线上 H5 静态：`getMiniWebDomain()` → `https://fe-static.yza.cn/{env}/nurse-mini/web/index.html`

**关键路径：** [`package.json`](package.json)、[`vue.config.js`](vue.config.js)、[`src/common/env.js`](src/common/env.js)

### 10. Node / 包管理器要求？lock 以谁为准？私有包怎么装？

**结论：**
- `package.json` **无 `engines` 字段** → Node 版本未从代码确认
- 同时存在 [`yarn.lock`](yarn.lock)（较新修改痕迹）与 [`package-lock.json`](package-lock.json) → **未约定以谁为准**，建议团队统一
- **无 `.npmrc`** → 私有包安装方式未从代码确认

### 11. 构建产物在哪？用什么工具预览？

**结论：**
- 开发 watch：`dist/dev/mp-weixin`（惯例，与 README 一致）
- 生产构建：`dist/build/mp-weixin`
- H5 产物：`dist/build/h5` 或 `dist/dev/h5`（uni 惯例）→ 精确子路径以本地构建结果为准
- 预览：微信开发者工具打开 mp-weixin 目录；H5 用浏览器

**关键路径：** [`README.md`](README.md)、[`package.json`](package.json)

### 12. 环境怎么切换？改哪个文件 / 变量？

**结论：** 主要通过 npm script 注入 `VUE_APP_ENV_BUILD`（`develop` / `uat` / `release`），读取于 [`src/common/env.js`](src/common/env.js) 的 `currentEnv`，据此选 gateway / push / mobile / wss。一般**不必手改 env.js 域名表**，换 script 即可。小程序还有 `miniProgram.envVersion`（`envVersion`）参与部分判断。

**关键路径：** [`package.json`](package.json)、[`src/common/env.js`](src/common/env.js)

---

## 三、目录与架构

### 13. `src` 下一级目录各自职责？

| 路径 | 职责 |
|------|------|
| `pages/` | 主包 Tab 页（部分为跳转壳） |
| `subPackages*` / `subPackageCustomerResource` | 业务分包 |
| `apis/` | 全局接口方法 |
| `common/` | 请求、环境、工具、权限、跳转、JSBridge 等 |
| `components/` | 全局组件 |
| `store/` | Vuex |
| `static/` | 静态资源 |
| `uni_modules/` | uni 插件 |
| `App.vue` / `main.js` / `pages.json` / `manifest.json` / `uni.scss` | 入口与全局配置 |

**关键路径：** `src/` 目录本身

### 14. 入口文件是哪些？

**结论：** [`src/main.js`](src/main.js)（创建 Vue、挂 store/原型）、[`src/App.vue`](src/App.vue)（生命周期、globalData、登录/菜单）、[`src/pages.json`](src/pages.json)、[`src/manifest.json`](src/manifest.json)

### 15. 页面怎么组织？主包 / 分包？分包 root 对应业务？

**结论：** 主包仅 Tab + 少量页；业务在 `subpackages`。root 与业务对应：

| root | 业务（据标题/目录） |
|------|---------------------|
| `subPackagesIndex` | 人员/护工、报名、审批、授权等 |
| `subPackagesCharts` | 一览表、考核、流失报表等 |
| `subPackagesOrder` | 订单主流程 |
| `subPackagesMy` | 我的 |
| `subPackagesMenu` | 菜单/角色向订单能力 |
| `subPackagesMotherHealth` | 母婴健康 |
| `subPackagesMessage` | 消息 |
| `subPackagesDailyChart` | 日常数据图 |
| `subPackagesLog` | 运营/工作日志分析 |
| `subPackageCustomerResource` | 客资 |
| `subPackagesService` | 服务（巡检等） |
| `subPackagesAi` | AI |
| `subPackagesCalendar` | 服务日历等 |
| `subPackagesTraining` | 培训 |
| `subPackagesHome` | 随手记等 |
| `subPackagesOA` | OA 审批 |
| `subPackagesSchedule` | 排班/日程 |
| `subPackagesForm` | 智能表单 |

**关键路径：** [`src/pages.json`](src/pages.json)

### 16. 公共组件、业务组件分别放在哪？命名约定？

**结论：**
- 全局：[`src/components/`](src/components/)（常见前缀 `custom-`、`diy-`、`navbar` 等）
- 分包内：`src/subPackagesXxx/components/`
- 插件：[`src/uni_modules/`](src/uni_modules/)
- ESLint：模板组件名倾向 **kebab-case**（`vue/component-name-in-template-casing`）
- easycom：`uni-*` 映射 `@dcloudio/uni-ui`

**关键路径：** [`src/components/`](src/components/)、[`.eslintrc.js`](.eslintrc.js)、[`src/pages.json`](src/pages.json) `easycom`

### 17. 接口层怎么分层？API 手写还是生成？

**结论：**
1. 传输：[`src/common/request.js`](src/common/request.js)（`get`/`post`/`request`）
2. API 模块：[`src/apis/*.js`](src/apis/)；部分分包另有 `subPackagesXxx/apis/`
3. **手写 REST 风格路径字符串**（如 `carer-platform/...`）；仓库内**无** openapi/swagger/codegen 脚本 → **非生成**

**关键路径：** [`src/apis/nurse.js`](src/apis/nurse.js)、[`src/common/request.js`](src/common/request.js)、[`package.json`](package.json)

### 18. 工具函数、常量、权限、跳转等横切能力放在哪？

**结论：** 集中在 [`src/common/`](src/common/)：
- 常量：[`constants.js`](src/common/constants.js)、[`config.js`](src/common/config.js)
- 权限：[`utils.js`](src/common/utils.js)（`hasPermission` 等）、[`role.js`](src/common/role.js)
- 跳转：[`jump.js`](src/common/jump.js)
- 环境/请求/上传/JSBridge：`env.js` / `request.js` / `upload.js` / `jsBridge.js`

### 19. TS / JS 混用吗？代码规范与格式化？

**结论：** 业务代码以 **JS + Vue SFC** 为主；`src` 下几乎无业务 `.ts`（仅见 uni_modules 插件内 type.ts）。规范：ESLint + Prettier（tab、单引号、无分号、printWidth 120）。

**关键路径：** [`.eslintrc.js`](.eslintrc.js)、[`.prettierrc.js`](.prettierrc.js)、[`.lintstagedrc.json`](.lintstagedrc.json)

---

## 四、路由、导航与入口

### 20. 路由配置在哪？TabBar 有哪些项？

**结论：** 路由在 [`src/pages.json`](src/pages.json)。原生 tabBar（`custom: true`）五项：

1. 工作台 → `pages/index/index`
2. 订单 → `pages/order/index`
3. 消息 → `pages/message/index`
4. 学习 → `pages/study/index`
5. 我的 → `pages/my/index`

**关键路径：** [`src/pages.json`](src/pages.json) `tabBar.list`

### 21. 有没有自定义导航 / 自定义 TabBar？怎么接的？

**结论：** 有。
- 自定义导航：[`src/components/custom-nav`](src/components/)（工作台等使用）；部分页 `navigationStyle: "custom"`
- 自定义 TabBar：[`src/components/custom-tabbar/custom-tabbar.vue`](src/components/custom-tabbar/custom-tabbar.vue)，页面内引用并常 `uni.hideTabBar()`；另有 My 分包副本
- `pages.json` 声明 `"custom": true`，**未发现**微信原生 `custom-tab-bar` 目录 → 走组件方案而非小程序官方自定义 tabBar 目录

**关键路径：** 上述组件；[`src/subPackagesSchedule/pages/index/index.vue`](src/subPackagesSchedule/pages/index/index.vue)（`hideTabBar` 示例）

---

## 五、数据、请求与鉴权

### 22. HTTP 请求封装在哪？如何挂到实例上？

**结论：** [`src/common/request.js`](src/common/request.js)；[`src/main.js`](src/main.js) 中 `Vue.prototype.$request = request`。API 文件也可直接 `import { get, post } from '@/common/request.js'`。

### 23. baseURL / 网关怎么按环境切换？

**结论：** [`src/common/env.js`](src/common/env.js) `env` 表 + `baseUrl()`；相对路径拼到 `gateway-*.yza.cn`。绝对 URL 则原样请求。

| `VUE_APP_ENV_BUILD` | gateway |
|---------------------|---------|
| develop | `https://gateway-dev.yza.cn/` |
| uat | `https://gateway-uat.yza.cn/` |
| release / trial | `https://gateway.yza.cn/` |

### 24. Token、用户信息、机构 / 租户 ID 存在哪？如何自动带上？

**结论：**
- 存储：`uni.storage` + Cookie（`yilifeToken` / `token` / `orgId` / `userId` 等），见 [`src/common/common.js`](src/common/common.js)
- 登录用户：`loginUser` 等 storage（`silentLogin` 写入）
- 请求头自动带：`Authorization`、`orgId`、`userId`、`tenantId`（=orgId）、`systemCode`、`resourceId`、经纬度等（[`getRequestHeader`](src/common/request.js)）

### 25. 401 / 未登录如何处理？

**结论：**
- H5：`jsBridge.toLogin`
- 微信：尝试 `silentLogin`，成功则 `goPageBack` 刷新当前页；失败清 token 并弹窗引导授权
- 其它错误弹窗；部分无权限 `status === 4` 跳转录入/报名
- App 层事件 `toLoginPage` → 授权页或 Bridge

**关键路径：** [`src/common/request.js`](src/common/request.js)、[`src/App.vue`](src/App.vue)

### 26. 上传、WebSocket、推送等特殊通道有没有单独域名？

**结论：** 有。
- 上传域名常与 gateway 同步到 `globalData.uploadDomain`（`baseUrl()`）
- 推送：`pushEnv` / `pushBaseUrl()`
- WSS：`wssDomain` / `getWssDomain()`
- Mobile H5：`mobileDomain` / `getMobileDomain()`
- 小程序内嵌 web：`getMiniWebDomain()`（fe-static）

**关键路径：** [`src/common/env.js`](src/common/env.js)

### 27. 权限模型：菜单 / 按钮 / 数据权限怎么做？

**结论：**
- **菜单：** 后端 `getUserResourceOfMini` 返回 `workbench` 等，存 `workTableMenu`，工作台渲染入口（[`src/pages/index/index.vue`](src/pages/index/index.vue)、[`src/apis/authorization.js`](src/apis/authorization.js)）
- **按钮：** `hasPermission(menuKey, permissionKey)` 读 `workTableMenu[].childrenButton`；另有 `hasBtnPermission` 读 `manageMenu`（[`src/common/utils.js`](src/common/utils.js)）；全局 `$hasPermission`
- **字段级：** `hasKeyPermission` + `tagKeyType`（hidden/read/edit）基于 `manageMenu.permissionCodeList`
- **数据权限：** 请求头带 `resourceId`（菜单 id）供后端判断；`findMenuId` 辅助
- **角色：** `rolesId` storage，多处分支（如订单壳页）
- **无** 统一 `v-permission` 指令（未见）；订单模块另有局部 `permission.js`

**关键路径：** [`src/common/utils.js`](src/common/utils.js)、[`src/common/request.js`](src/common/request.js)、[`src/main.js`](src/main.js)

---

## 六、状态与全局能力

### 28. 用什么状态管理？模块怎么拆？

**结论：** Vuex。[`src/store/index.js`](src/store/index.js) 注册 modules.`index`（[`src/store/modules/index.js`](src/store/modules/index.js)）；大量表单/发票/审批字段直接挂在 **root state**（偏 OA/表单）。

### 29. 哪些状态会持久化？

**结论：**
- Vuex 插件仅配置持久化路径 `device.deviceState`（[`src/store/index.js`](src/store/index.js)），但当前 modules **未见 `device` 模块** → 该配置可能失效/遗留
- 业务大量直接用 `uni.setStorageSync` / Cookie（token、org、菜单、roles 等），这才是主持久化方式

### 30. 全局方法 / 原型扩展有哪些？

**结论（[`src/main.js`](src/main.js)）：**
- `$request`、`$noMultipleClicks`、`$isNotEmpty`
- `$scrollError`、`$hasPermission`、`$getDisplayName`
- 包装 `uni.$on`（默认先 `$off` 再绑，防重复）
- H5 非 release（或调试计数）挂 VConsole

埋点 SDK：**未从代码确认**（未见 sensors/umeng/sentry 等接入）。

### 31. 有没有 JSBridge / App 内嵌 H5 相关逻辑？

**结论：** 有，较完整。[`src/common/jsBridge.js`](src/common/jsBridge.js)（登录、支付、选图、分享、打开原生页等）；[`src/App.vue`](src/App.vue) H5 注入 jweixin；401/登录走 Bridge。

---

## 七、后端 / 服务端（如适用）

### 32. API 风格、版本、契约在哪？

**结论：** 前端调用表现为 **REST-ish HTTP JSON**（路径形如 `user-web-2/...`、`carer-platform/...`）。版本体现在路径服务名前缀。本仓库**无** OpenAPI 契约文件。接口契约「未从代码确认」（应在后端/网关仓库）。

### 33–35. 数据库 / 缓存 MQ / 微服务？

**结论：** 本仓库为纯前端，**不适用**。仅能从域名推断存在网关（`gateway*.yza.cn`）、推送、聊天 WSS、mobile 站等独立服务；服务发现与鉴权中心细节「未从代码确认」。

---

## 八、业务地图与危险区

### 36. 核心业务模块有哪些？

**结论：** 工作台与权限菜单、服务人员/护工管理、订单（含母婴/培训等）、审批/OA、收入与结算、开票、排班日历、培训学习、消息、报表/日报。见题 4 分包表。

### 37. 模块间关键链路？

**结论（从前端跳转与命名可推断，非完整状态机）：**

```text
授权/登录 → 工作台菜单(workTableMenu)
  → 服务人员(nursingWorker) → 派单/选人(apis/nurse) → 订单
  → 订单详情 → 审批(退款/改单等) / 开票 / 结算方式
  → 排班/日历/工作日志 ↔ 订单
  → 培训订单 webview(mobile 站)
```

**关键路径：** [`src/pages/index/index.vue`](src/pages/index/index.vue)、[`src/apis/nurse.js`](src/apis/nurse.js)、[`src/subPackagesOrder/`](src/subPackagesOrder/)、[`src/common/env.js`](src/common/env.js) `getTrainOrderUrl`

### 38. 有没有明显「危险区」迹象？

**结论：** 有——涉及资金与合规：
- 开票：`subPackagesOrder/.../IssueInvoice*`
- 退款审批：`Napproval` 中 `refund`
- 结算方式审批：`settlementMethod`
- 收入/云账户：`apis/yunzhanghu.js`、`subPackagesMy/.../income`
- 权限与 `resourceId` 数据权限
- 合同/签署相关页

**关键路径：** 上述目录与 [`src/apis/yunzhanghu.js`](src/apis/yunzhanghu.js)、[`src/subPackagesIndex/pages/index/Napproval/`](src/subPackagesIndex/pages/index/Napproval/)

### 39. 关键枚举、状态机怎么定义？

**结论：** 多为前端对象/数组常量，分散在：
- 全局：[`src/common/constants.js`](src/common/constants.js)（服务类型、学历、订单服务类型等）
- 模块内：如 [`src/subPackagesOrder/pages/order/IssueInvoice/config.js`](src/subPackagesOrder/pages/order/IssueInvoice/config.js)（开票状态文案）
- 页面 `data` 内联 status 映射（审批页等）

未见统一状态机库（如 xstate）。

### 40. 有没有「改动时要小心」的区域 / 注释提示？

**结论：**
- `reqChannel` 废弃兼容（[`request.js`](src/common/request.js)）
- `@deprecated`（[`order/utils.js`](src/subPackagesOrder/pages/order/utils.js)）
- 大量 `TODO`（会议、客服等未完成）
- Tab 壳页角色分支（改订单入口易踩坑）
- `pages.json` 体量巨大、条件编译 `#ifdef H5`
- App.vue 合并 `uni`→`wx` 时跳过「危险字段」`__proto__` 等

---

## 九、工程与协作

### 41. ESLint / Prettier / Husky / lint-staged？

**结论：**
- ESLint、Prettier、lint-staged **有配置**
- lint-staged：对 `*.{ts,vue}` 跑 eslint + prettier（注意扩展名未含 `js`）
- **当前仓库无 `.husky` 目录** → husky 钩子是否启用「未从代码确认」（README 提及但目录缺失）

**关键路径：** [`.eslintrc.js`](.eslintrc.js)、[`.prettierrc.js`](.prettierrc.js)、[`.lintstagedrc.json`](.lintstagedrc.json)、[`README.md`](README.md)

### 42. 环境变量约定？

**结论：** 核心 `VUE_APP_ENV_BUILD`；另有 `NODE_ENV`、`UNI_PLATFORM`、`ANALYZE`。无 Vite 风格 `VITE_APP_*`。

**关键路径：** [`package.json`](package.json)、[`src/common/env.js`](src/common/env.js)

### 43. 文档现状？README 是否过时？

**结论：** README 偏模板，脚本名（`serve`/`build`/`lint-fix`）与现行不符；目录说明过简；缺业务地图。本答案文件与既有提问清单用于补位。

**关键路径：** [`README.md`](README.md)、[`docs/项目认识-提问清单.md`](docs/项目认识-提问清单.md)

### 44. 已知技术债迹象？

**结论：** 双 lock；README 过时；声明但缺失的依赖（vuex/uview/husky）；Tab 双轨与双 tabbar；`-old` 文件；persisted path 指向不存在的 `device`；ESLint extends 含 `plugin:vue/vue3-essential` 却是 Vue2 项目；主包壳跳转；条件编译增多。

### 45. 部署相关配置在哪？

**结论：** 本仓库**未见** Dockerfile、`.github/workflows`、Jenkinsfile、K8s 清单。部署可能在外部 CI；前端产物静态托管线索见 `fe-static.yza.cn/.../nurse-mini/web/`。细节「未从代码确认」。

### 46. 监控、日志、埋点怎么接？

**结论：**
- 开发调试：H5 VConsole（[`main.js`](src/main.js)）
- 生产小程序构建会 `drop_console`（[`vue.config.js`](vue.config.js)）
- 专业 APM/埋点 SDK：**未从代码确认**

---

## 十、上手行动清单

### 47. 新人第一天建议阅读顺序（关键路径）

1. [`package.json`](package.json) — 正确启动命令  
2. [`src/main.js`](src/main.js)、[`src/App.vue`](src/App.vue) — 启动与登录事件  
3. [`src/pages.json`](src/pages.json) — Tab + 你负责的分包  
4. [`src/common/env.js`](src/common/env.js)、[`src/common/request.js`](src/common/request.js)、[`src/common/common.js`](src/common/common.js)  
5. [`src/common/utils.js`](src/common/utils.js) — 权限  
6. [`src/pages/index/index.vue`](src/pages/index/index.vue) — 工作台  
7. 目标业务页（例：[`src/subPackagesIndex/pages/index/nursingWorker/index.vue`](src/subPackagesIndex/pages/index/nursingWorker/index.vue)）+ 对应 [`src/apis/`](src/apis/)

### 48. 改一个普通列表页通常动哪几层？

1. 页面：`src/subPackagesXxx/pages/.../*.vue`  
2. 接口：`src/apis/xxx.js` 或分包 `apis/`  
3. 如需权限按钮：`hasPermission` / 菜单 resourceCode  
4. 一般不必改 `pages.json`（已有路由时）

### 49. 加一个新页面 / 新分包页面的标准步骤？

1. 在目标分包下新建 `pages/.../index.vue`  
2. 在 [`src/pages.json`](src/pages.json) 对应 `subpackages` 的 `pages` 注册 path + style  
3. 需要则加 API、components  
4. 从工作台菜单或 `uni.navigateTo` 进入（菜单若走后端配置，还需后端资源码）  
5. 注意主包体积：新业务优先分包

### 50. 加一个新接口的标准步骤？

1. 在 [`src/apis/`](src/apis/)（或分包 apis）新增函数，调用 `get`/`post`  
2. 路径写成网关后相对路径（如 `carer-platform/...`）  
3. 页面 `import` 或 `this.$request`  
4. **无代码生成步骤**（手写）

示例参考：[`src/apis/nurse.js`](src/apis/nurse.js)

### 51. 若只想熟悉「某模块」，从哪几个路径切入？

| 目标 | 切入路径 |
|------|----------|
| 工作台 / 菜单权限 | [`src/pages/index/index.vue`](src/pages/index/index.vue)、[`src/apis/authorization.js`](src/apis/authorization.js)、[`src/common/utils.js`](src/common/utils.js) |
| 护工 / 服务人员 | [`src/subPackagesIndex/pages/index/nursingWorker/index.vue`](src/subPackagesIndex/pages/index/nursingWorker/index.vue)、[`src/apis/nurse.js`](src/apis/nurse.js)、[`src/apis/carer.js`](src/apis/carer.js)、详情编辑 [`src/subPackagesIndex/pages/index/manage/`](src/subPackagesIndex/pages/index/manage/) |
| 订单 | [`src/pages/order/index.vue`](src/pages/order/index.vue)（角色分流）→ [`src/subPackagesOrder/pages/order/`](src/subPackagesOrder/pages/order/)、[`src/apis/order.js`](src/apis/order.js) |
| 审批 / OA | [`src/subPackagesIndex/pages/index/Napproval/`](src/subPackagesIndex/pages/index/Napproval/)、[`src/subPackagesOA/`](src/subPackagesOA/) |
| 请求与环境 | [`src/common/request.js`](src/common/request.js)、[`src/common/env.js`](src/common/env.js) |

---

## 附录：与旧答案文档关系

- 本文件为题单完整作答：[`docs/项目认识-答案.md`](docs/项目认识-答案.md)  
- 此前摘要版可参考：[`docs/项目认识-答案-nurse-mini.md`](docs/项目认识-答案-nurse-mini.md)（若仍保留）  
- 提问模板：[`docs/项目认识-提问清单.md`](docs/项目认识-提问清单.md)
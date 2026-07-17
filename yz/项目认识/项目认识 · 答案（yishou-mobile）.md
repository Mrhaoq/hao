# 项目认识 · 答案（yishou-mobile）

> 调研范围：本仓库代码与配置（截至调研日）。不确定处标注「未从代码确认」，不编造。
>
> **源文件：** `D:/A-work/yz/yishou-mobile/docs/项目认识-答案.md`  
> **系列索引：** [项目认识 · 索引](./项目认识%20·%20索引.md) · [公司业务流程](./公司业务流程.md)  
> **姊妹文档：** [crm](./项目认识%20·%20答案（crm）.md) · [organization-background](./项目认识%20·%20答案（organization-background）.md) · [nurse-mini](./新项目认识%20·%20答案（nurse-mini）.md)

---

## 一、项目定位与业务

### 1. 这个项目是做什么的？面向谁（角色）？核心业务一句话？

**结论：** 颐挚（yza）体系下的 **移动端 H5 聚合仓库**：把支付、订单/抢单、守护/设备、督导、培训、CRM、AI 聊天、签约认证、保险/内容等大量业务页集中在同一 Vue 工程，主要给 **App WebView、微信/企微小程序 webview、微信 H5** 打开；默认落地页是访客 WiFi 相关。一句话：**多端嵌入的业务 H5 容器，而非单一 App 主站。**

**关键路径：**
- [README.md](../README.md)
- [src/router/index.js](../src/router/index.js)
- [index.html](../index.html)（标题「颐挚科技」）
- [src/utils/platform.js](../src/utils/platform.js)（App / 小程序 / 浏览器环境）

### 2. 产品名 / 品牌在代码里叫什么？和仓库名是否一致？

**结论：**
- 仓库 / 描述：`yishou-mobile`（GitLab：`yilife-web/yishou-mobile`）
- `package.json` 的 `name` 为 `build-vite`，与仓库名不一致
- 页面默认 title：`颐挚科技`；登录协议主体写「上海颐寿健康科技有限公司」
- 域名/品牌线索：`yza.cn`、`yilife`、`yilifeToken`；另有产品线「挚护到家 / 挚护通 / 挚护阿姨」等

**关键路径：**
- [package.json](../package.json)
- [README.md](../README.md)
- [index.html](../index.html)
- [src/views/login.vue](../src/views/login.vue)
- [src/utils/domain.ts](../src/utils/domain.ts)
- [src/constants.ts](../src/constants.ts)

### 3. 是纯前端 / 纯后端 / 全栈？代码里有没有配套仓库的线索？

**结论：** **纯前端（Vue H5）**。无服务端代码、无 ORM/迁移。配套线索：
- API：`https://gateway-*.yza.cn`、`https://yapi.yza.cn`
- 相关前端域：`home-service*.yza.cn`（挚护到家）、`nurse-mini` 静态站、`aunt*.yza.cn`、`mobile-customer*.yza.cn`、`chat*.yza.cn`（WS）
- Git 远程：`http://gitlab.yza.cn/yilife-web/yishou-mobile.git`

**关键路径：**
- [src/utils/getCurrentUrl.ts](../src/utils/getCurrentUrl.ts)
- [src/utils/domain.ts](../src/utils/domain.ts)
- [yapiMagic.config.ts](../yapiMagic.config.ts)
- [package.json](../package.json) `repository.url`

### 4. 主要业务域有哪些？各自大致负责什么？

**结论：** 按路由模块 / `views` 粗分（非官方产品文档）：

| 业务域 | 大致职责 |
|--------|----------|
| 支付 `pay` | H5 微信支付/支付宝等 |
| 订单 `order` / 抢单 `grabOrder` | 订单详情、CRM 下单、护士/员工接派单 |
| 守护 `guard` / 家庭 `family` / 设备报告 | 家人守护、设备数据、告警、报告 |
| 督导 `supervisor` | 健康日志、日报、AI 小结、服务反馈 |
| 培训 `train` / 学习 `learning` | 课程、讲师工作台、考试学习 |
| CRM / 简历 `crm` `curriculumVitae` | 客户需求、阿姨简历/位置/排班 |
| AI `ai` `aiChat` `homeAI` `chat` | AI 推荐、聊天、分身、货仓助手等 |
| 签约认证 `sign` `faceAuth` `agreement` `officeSoftware` | 电子签、人脸、协议、海报办公 |
| 保险/内容 `insurance` `article` | 保险 H5、内容库、文章创作 |
| 物流/售后 `logistic` `afterSaleLogistic` | 物流轨迹等 |
| 其它 | 访客 WiFi、考勤、声纹、云账户、PCN、RaaS、RPA、健康套餐等 |

**关键路径：**
- [src/router/index.js](../src/router/index.js)
- [src/router/modules/](../src/router/modules/)
- [src/views/](../src/views/)

### 5. 从登录到完成一件核心任务的主流程路径是什么？

**结论：** 本仓 **不是典型「登录 → 首页 Tab → 办完一件事」的单体 App**。常见路径是：

1. **宿主（App / 小程序）带 token 打开 H5**（URL 参数 `_token` / `accessToken` / `token` 等）→ `App.vue` 写入 Cookie `yilifeToken` / `userId` / `orgId`
2. 进入具体业务路由（如抢单、支付、订单详情）
3. 请求经 `http.ts` 自动带 `Authorization` 等头，调网关完成业务

示例（抢单护士侧）：宿主打开 `/grabOrder/nurse/order` → 接单池 / 我的订单 → 详情（可到 `/order/grabDetail`）。  
站内也有 `/login`、扫码登录，但多数页面依赖外链 token。

**关键路径：**
- [src/App.vue](../src/App.vue)
- [src/utils/http.ts](../src/utils/http.ts)
- [src/router/modules/login.js](../src/router/modules/login.js)
- [src/router/modules/grabOrder.js](../src/router/modules/grabOrder.js)
- [src/views/grabOrder/nurse/order.vue](../src/views/grabOrder/nurse/order.vue)
- [src/utils/platform.js](../src/utils/platform.js)

### 6. 哪些模块看起来已废弃或双轨并存？

**结论（代码迹象，非产品确认）：**
- **请求封装双轨：** `utils/http.ts`（主流，yapi 生成接口用）+ `utils/request.js` + `utils/request2.js` + `uploadRequest.js`
- **API 目录双轨：** `src/apis/`（yapi 生成，量大）+ `src/api/`（少量手写）+ 部分业务自建 `views/*/apis`
- **入口双轨：** `index.html` 用 `main.js`；另有精简的 `main.ts`（未作主入口）
- **UI 双库：** Vant + Ant Design Vue 同时接入
- **简历相关：** `curriculumVitae` / `curriculumVitaeSimple` / `cv` 并存
- **抢单：** nurse 与 staff 两套页面
- **接口注释「已废弃」：** 如部分 `apis/api*.ts` 标题含「废弃」；`guard` 内有「旧版」注释接口

**关键路径：**
- [src/utils/http.ts](../src/utils/http.ts)、[src/utils/request.js](../src/utils/request.js)、[src/utils/request2.js](../src/utils/request2.js)
- [src/apis/](../src/apis/)、[src/api/](../src/api/)
- [src/main.js](../src/main.js)、[src/main.ts](../src/main.ts)
- [src/views/guard/historyList/index.vue](../src/views/guard/historyList/index.vue)（注释旧版接口）
- 例：[src/apis/api10115.ts](../src/apis/api10115.ts)（标题「已废弃」）

---

## 二、技术栈与运行

### 7. 技术栈是什么？框架版本、UI 库、状态管理、构建工具？

**结论：**
- Vue `^3.2.37` + Vue Router `^4.0.10` + Pinia `2.0.11`
- UI：Vant `^4.1.0`、Ant Design Vue `4.x`（另有 `@element-plus/icons-vue`，element-plus 本体未在 dependencies 中完整确认）
- 构建：Vite `^3.0.0` + TypeScript `4.7.4` + Less/Sass
- 请求：Axios `^0.21.1`
- 其它常见：dayjs、echarts、微信 jssdk、火山 RTC/TOS、vue-i18n 等

**关键路径：** [package.json](../package.json)、[vite.config.ts](../vite.config.ts)

### 8. 支持哪些端？（H5 / 小程序 / App / PC 后台）

**结论：** **本仓产出是 H5（浏览器可直接访问）**，并设计为：
- **App 内嵌 WebView**（`JsNativeBridge`）
- **微信小程序 / 企微 webview**（`wx.miniProgram`、`weixin-js-sdk`、`@wecom/jssdk`）
- **微信 H5**
- 部分页面可在 PC 浏览器打开（`isPC` 判断存在），但 **不是独立 PC 后台工程**；小程序本体不在本仓（仅有跳转/嵌入逻辑）

**关键路径：**
- [src/utils/platform.js](../src/utils/platform.js)
- [src/utils/jsBridge.ts](../src/utils/jsBridge.ts)
- [src/utils/detect.ts](../src/utils/detect.ts)
- [index.html](../index.html)

### 9. 本地如何安装与启动？开发 / UAT / 生产命令分别是什么？访问地址？

**结论：**
- 安装：仓库未写死包管理器；存在 `package-lock.json` 与 `yarn.lock`；`package.json` 有 `pnpm.overrides`。README **未给出安装步骤**（仍为 GitLab 模板）。
- 开发：`npm run dev` / `yarn dev` / `pnpm dev` → `vite`；另有 `dev:uat`（`--mode uat`）、`serve`（同 `vite`）
- 构建：`build:dev` / `build:sit` / `build:uat` / `build:prd` / `build:demo`
- 预览：`preview` → `vite preview`
- 本地服务：`vite.config.ts` 配置 `host: 'local.yza.cn'` + HTTPS（需 `cert/` 证书），浏览器一般访问 `https://local.yza.cn:5173`（**端口以 Vite 实际打印为准，未从代码写死 5173 以外端口**）

**关键路径：**
- [package.json](../package.json) `scripts`
- [vite.config.ts](../vite.config.ts)
- [cert/](../cert/)
- [README.md](../README.md)（过时，无真实启动说明）

### 10. Node / 包管理器有什么要求？lock 文件以谁为准？私有包怎么装？

**结论：**
- `package.json` **无 `engines` / `packageManager` 字段** → Node 版本 **未从代码确认**
- 同时存在 `package-lock.json`、`yarn.lock`；`.gitignore` 忽略 `*-lock.json` 与 `pnpm-lock.yaml` → **以哪个 lock 为准未从代码确认**（需问团队）
- 私有源：`.npmrc` 仅配置 `registry=https://registry.npmmirror.com/`，**未见私有 registry / token 配置**；依赖多为公开包 + 公司域名静态资源

**关键路径：** [package.json](../package.json)、[.npmrc](../.npmrc)、[.gitignore](../.gitignore)

### 11. 构建产物在哪？用什么工具预览（如微信开发者工具）？

**结论：** Vite 默认产物目录 `dist/`（`.gitignore` 已忽略）。本地用 `vite preview`；微信侧是 **打开已部署的 H5 URL**，本仓 **没有** 小程序工程 / 微信开发者工具工程配置。

**关键路径：** [.gitignore](../.gitignore)、[package.json](../package.json) `preview`、[vite.config.ts](../vite.config.ts)（未自定义 `outDir`）

### 12. 环境怎么切换？改哪个文件 / 变量？

**结论：**
- **本地开发调哪套网关：** 改 [src/utils/env.ts](../src/utils/env.ts) 中 `devEnv`（`mock|dev|sit|uat|prd|demo`）；`development` 模式下用 `devEnv`，构建用 `import.meta.env.MODE`
- **构建环境：** `vite build --mode xxx`（对应 scripts：`build:sit` 等）
- **运行时可覆盖：** `getCurrentUrl` 支持 URL query `?env=` 覆盖网关环境
- **仓库内无 `.env*` 文件**

**关键路径：**
- [src/utils/env.ts](../src/utils/env.ts)
- [src/utils/getCurrentUrl.ts](../src/utils/getCurrentUrl.ts)
- [package.json](../package.json) scripts

---

## 三、目录与架构

### 13. `src` 下一级目录各自职责是什么？

**结论：**

| 目录 | 职责 |
|------|------|
| `api/` | 少量手写接口 |
| `apis/` | yapi-magic 生成的接口（主体） |
| `assets/` | 样式、图标字体等静态资源 |
| `components/` | 跨业务公共组件（navbar、upload、录音等） |
| `hooks/` | 少量组合式 hooks |
| `libs/` | 第三方/vendored 库（pdf、interact 等） |
| `plugins/` | Vue 插件（如 element 安装脚本） |
| `request/` | 少量请求相关业务封装 |
| `router/` | 路由创建、模块路由、守卫 |
| `store/` | Pinia |
| `types/` | 类型 |
| `utils/` | 请求、环境、JSBridge、权限、工具函数等 |
| `views/` | 按业务域划分的页面 |

另有根级 `App.vue`、`main.js`、`constants.ts`、`wx.js`。

**关键路径：** [src/](../src/)

### 14. 入口文件是哪些？

**结论：**
- HTML：`index.html` → 脚本入口 `./src/main.js`
- 应用根组件：`src/App.vue`
- 路由：`src/router/index.js` → `createRouter.js`
- `src/main.ts` 存在但 **不是** `index.html` 引用的入口

**关键路径：** [index.html](../index.html)、[src/main.js](../src/main.js)、[src/App.vue](../src/App.vue)

### 15. 页面怎么组织？主包 / 分包结构如何？分包 `root` 各对应什么业务？

**结论：** **非 uni-app / 非微信原生分包**，无 `pages.json`。页面用 **Vue Router 模块化路由 + 视图目录懒加载**；路由按业务拆在 `src/router/modules/*.js|ts`，页面在 `src/views/<业务>/`。所谓「分包」仅体现在 webpackChunkName 注释式 chunk 名，**没有小程序式 `root` 分包配置**。

**关键路径：** [src/router/index.js](../src/router/index.js)、[src/router/modules/](../src/router/modules/)、[src/views/](../src/views/)

### 16. 公共组件、业务组件分别放在哪？有什么命名 / 约定？

**结论：**
- 公共：`src/components/`（如 `navbar`、`diy-*`、`yz-upload`、`ys-tab`）
- 业务：多在 `src/views/<域>/components/` 或同级 `modules/`
- ESLint 关闭了 `vue/multi-word-component-names`；命名以业务可读为主，**未见严格统一前缀规范文档**

**关键路径：** [src/components/](../src/components/)、例 [src/views/grabOrder/nurse/modules/](../src/views/grabOrder/nurse/modules/)、[.eslintrc.cjs](../.eslintrc.cjs)

### 17. 接口层怎么分层？API 是手写还是生成？生成命令是什么？

**结论：**
- **主流：YApi 生成** → `src/apis/api{id}.ts`，内部调用 `@/utils/http` 的 `service`
- 生成：`npm run yapi` → `yapiMagic`，配置 [yapiMagic.config.ts](../yapiMagic.config.ts)；按分支 tag 或 [src/apis/@api-id-using.ts](../src/apis/@api-id-using.ts) 白名单过滤
- 少量手写：`src/api/`、部分 `views/*/apis`
- 另有旧式 `request.js` / `request2.js` 直接拼 URL

**关键路径：**
- [yapiMagic.config.ts](../yapiMagic.config.ts)
- [package.json](../package.json) `"yapi": "yapiMagic"`
- [src/apis/](../src/apis/)
- [src/utils/http.ts](../src/utils/http.ts)

### 18. 工具函数、常量、权限、跳转等横切能力放在哪？

**结论：**
- 工具 / 环境 / 域名 / 存储：`src/utils/`
- 全局常量：`src/constants.ts`、各业务 `constants.ts|js`
- 按钮权限：`src/utils/permissions.ts` 的 `hasPermission`
- 跨端跳转：`src/utils/platform.js`、`src/utils/jsBridge.ts`
- 主题：`src/utils/theme/`

**关键路径：** 见上列路径

### 19. TS / JS 混用吗？代码规范与格式化规则？

**结论：** **混用**（约几百个 `.js` + 大量 `.ts` / `.vue`）。`tsconfig` `allowJs: true`。规范：ESLint（vue3 + typescript + prettier）+ Prettier（4 空格、单引号、无分号等）。`npm run lint` 可对 `src` 做 eslint `--fix`。

**关键路径：** [tsconfig.json](../tsconfig.json)、[.eslintrc.cjs](../.eslintrc.cjs)、[.prettierrc](../.prettierrc)、[package.json](../package.json) `lint`

---

## 四、路由、导航与入口

### 20. 路由配置在哪？TabBar 有哪些项？

**结论：**
- 配置：`src/router/createRouter.js` 创建空路由 → `src/router/index.js` 聚合 modules → `filterRouter.ts` 设 document.title
- 默认 `/` → `/visitorWifi`
- **无全局应用级 TabBar**；局部业务有自定义 Tab，例如培训讲师：`工作台` / `我的`（`views/train/components/tabbar`）；守护设备页有底部 tab 样式等

**关键路径：**
- [src/router/index.js](../src/router/index.js)
- [src/router/createRouter.js](../src/router/createRouter.js)
- [src/router/filterRouter.ts](../src/router/filterRouter.ts)
- [src/views/train/components/tabbar/index.vue](../src/views/train/components/tabbar/index.vue)

### 21. 有没有自定义导航 / 自定义 TabBar？怎么接的？

**结论：**
- 自定义导航栏组件：`src/components/navbar/`（返回走 `yza` / history）
- 自定义 TabBar：业务内嵌（如 train 的 `van-tabbar`），**不是路由级全局 Tab**
- App / 小程序导航更多依赖宿主或 `JSBridge.toFinish` / `wx.miniProgram.navigateBack`（`platform.navigateBack`）
- URL `showNavBar` 会写入 `sessionStorage._showNavBar`

**关键路径：**
- [src/components/navbar/index.vue](../src/components/navbar/index.vue)
- [src/App.vue](../src/App.vue)
- [src/utils/platform.js](../src/utils/platform.js)

---

## 五、数据、请求与鉴权

### 22. HTTP 请求封装在哪？如何挂到实例上？

**结论：** 主流在 `src/utils/http.ts`：创建 axios instance + 拦截器，导出 `service` / `get` / `post`。**未挂到 `app.config.globalProperties`**；生成 API 与业务代码直接 `import { service } from '@/utils/http'`。全局只挂了 `$noMultipleClicks`。

**关键路径：** [src/utils/http.ts](../src/utils/http.ts)、[src/main.js](../src/main.js)、例 [src/apis/api46389.ts](../src/apis/api46389.ts)

### 23. baseURL / 网关地址怎么按环境切换？

**结论：** `getCurrentUrl(yapiProjectId, path)` 按 `currentEnv`（及可选 `?env=`）拼接：

| env | gateway |
|-----|---------|
| mock | `https://yapi.yza.cn/mock/{projectId}` |
| dev | `https://gateway-dev.yza.cn` |
| sit | `https://gateway-sit.yza.cn` |
| uat | `https://gateway-uat.yza.cn` |
| prd | `https://gateway.yza.cn` |
| demo | `https://gateway-demo.yza.cn` |

特殊：projectId `132` 加前缀 `/yilife-model`。另有 `getHomeServiceUrl` 走 home-service 域。

**关键路径：** [src/utils/getCurrentUrl.ts](../src/utils/getCurrentUrl.ts)、[src/utils/env.ts](../src/utils/env.ts)

### 24. Token、用户信息、机构 / 租户 ID 存在哪？请求如何自动带上？

**结论：**
- 存储：Cookie（`yilifeToken`、`userId`、`orgId`、`systemCode`、`currentFamilyId` 等）+ URL query；部分 sessionStorage
- 请求头自动带：`Authorization`（getToken）、`systemCode`/`reqChannel`、`tenantId`/`orgId`、`userId`；并对 body/params 做 MD5 签名头（`md5Hash`）
- 启动时 `App.vue` 从 URL 同步 token/orgId/userId 到 Cookie

**关键路径：** [src/App.vue](../src/App.vue)、[src/utils/http.ts](../src/utils/http.ts)、[src/utils/index.js](../src/utils/index.js)（写 Cookie 工具）

### 25. 401 / 未登录如何处理？

**结论：** `http.ts` 响应错误 `status === 401`：提示「登录已过期，请重新登录」，并在 App 环境调用 `JSBridge.toLogin()`（`yza.runByEnv`）。浏览器/小程序侧 **未从该拦截器看到统一跳转登录页逻辑**。

**关键路径：** [src/utils/http.ts](../src/utils/http.ts)（约 149–155 行）、[src/utils/jsBridge.ts](../src/utils/jsBridge.ts)

### 26. 上传、WebSocket、推送等特殊通道有没有单独域名？

**结论：**
- 上传：走网关路径如 `/oss-web/oss/upload/file`（`fileUpload.js`）；另有火山 TOS SDK 依赖
- WebSocket：`wss://chat-{env}.yza.cn` / 生产 `wss://chat.yza.cn`（`webSocketUrl` / `BASE_WS_URL`）
- 推送：本仓未见独立推送服务配置；埋点走火山 `collectEvent`（见第 46 题）
- **独立推送域名：未从代码确认**

**关键路径：**
- [src/utils/index.js](../src/utils/index.js) `webSocketUrl`
- [src/utils/http.ts](../src/utils/http.ts) `wsUrl`
- [src/utils/fileUpload.js](../src/utils/fileUpload.js)
- [src/utils/webSocketClient.ts](../src/utils/webSocketClient.ts)

### 27. 权限模型：菜单权限 / 按钮权限 / 数据权限怎么做？用什么指令或方法？

**结论：**
- 按钮权限工具：`hasPermission(allMenu, menuKey, permissionKey)`，按 `resourceCode` / `path` 找菜单，再看 `childrenButton`
- 业务内另有 composable，如文章 `usePermission`
- 请求头可带 `resourceId`（`request.js` 注释：菜单 id，给后端做 **数据权限**）
- **未见全局 `v-permission` 指令**；无完整菜单权限中心页面（本仓多为嵌入页，菜单多由宿主提供）

**关键路径：**
- [src/utils/permissions.ts](../src/utils/permissions.ts)
- [src/views/article/composables/usePermission.ts](../src/views/article/composables/usePermission.ts)
- [src/utils/request.js](../src/utils/request.js)
- [src/views/rpa/aiAccount/index.vue](../src/views/rpa/aiAccount/index.vue)（使用示例）

---

## 六、状态与全局能力

### 28. 用什么状态管理？模块怎么拆？

**结论：** Pinia。模块：`main`（服务端时差）、`order`（CRM 下单草稿）、`family`、`homeAI`。体量小，多数页面本地 state / 接口直取。

**关键路径：** [src/store/index.ts](../src/store/index.ts)、[src/store/modules/](../src/store/modules/)

### 29. 哪些状态会持久化（localStorage / persistedstate / cookie）？

**结论：**
- **Cookie：** token、userId、orgId 等（跨页核心）
- **localStorage：** 如抢单筛选/位置/已访问订单 id（`App.vue` 挂载时会清理部分 grab_order_*）；`utils/storage.ts` 封装 JSON 存取
- **sessionStorage：** `source`、`_showNavBar`、部分 token 兼容
- **未见 pinia-plugin-persistedstate**

**关键路径：** [src/App.vue](../src/App.vue)、[src/utils/storage.ts](../src/utils/storage.ts)

### 30. 全局方法 / 原型扩展有哪些？（如 `$request`、权限判断、埋点）？

**结论：**
- `app.config.globalProperties.$noMultipleClicks`
- 指令：`v-longpress`
- 无 `$request` 原型
- 埋点：`window.collectEvent`（index.html 注入）
- 权限：函数导入，非全局原型

**关键路径：** [src/main.js](../src/main.js)、[index.html](../index.html)、[src/utils/permissions.ts](../src/utils/permissions.ts)

### 31. 有没有 JSBridge / App 内嵌 H5 相关逻辑？

**结论：** **有，且较完整。** `src/utils/jsBridge.ts` 封装 `JsNativeBridge`（登录、关页、打开原生/H5、打电话、AI 指令等）；`platform.js` 按 App/小程序/浏览器分流；`index.html` 内嵌 uni webview bridge 片段。

**关键路径：** [src/utils/jsBridge.ts](../src/utils/jsBridge.ts)、[src/utils/platform.js](../src/utils/platform.js)、[index.html](../index.html)

---

## 七、后端 / 服务端（如适用）

### 32. API 风格（REST / GraphQL / RPC）、版本管理、接口契约在哪？

**结论：** 以 **HTTP REST 风格** 为主（YApi 文档生成）；契约在 **YApi**（`https://yapi.yza.cn/project/{id}/interface/api/{apiId}`），本地生成物在 `src/apis/`。未见 GraphQL。版本管理体现在多 YApi projectId / 路径前缀，**统一 API version 字段未从代码确认**。

**关键路径：** [yapiMagic.config.ts](../yapiMagic.config.ts)、[src/apis/](../src/apis/)

### 33. 数据库类型、ORM / 查询层、迁移脚本怎么跑？

**结论：** **不适用（纯前端）。未从代码确认。**

### 34. 缓存、消息队列、定时任务分别用什么？在哪配置？

**结论：** **不适用服务端配置。** 前端仅有本地存储、轮询工具（如 `utils/polling.js`）等。消息队列 / 服务端定时任务 **未从代码确认**。

### 35. 微服务 / 单体？服务发现、网关、鉴权中心怎么走？

**结论（从前端视角）：** 统一走 **API 网关** `gateway-*.yza.cn`；后端是否微服务 **未从本仓确认**。鉴权依赖 Cookie/URL Token + 请求头；401 回调 App 登录。服务发现配置 **无**。

**关键路径：** [src/utils/getCurrentUrl.ts](../src/utils/getCurrentUrl.ts)、[src/utils/http.ts](../src/utils/http.ts)

---

## 八、业务地图与危险区

### 36. 核心业务模块有哪些？各自大致负责什么？

**结论：** 与第 4 题一致，体量较大的包括：支付、订单/抢单、守护与设备、督导、培训学习、CRM/阿姨、AI 聊天、签约认证、保险内容、物流售后等。以 `views/` + `router/modules/` 为准。

**关键路径：** [src/views/](../src/views/)、[src/router/modules/](../src/router/modules/)

### 37. 模块间关键链路？（如：订单 → 排班 → 财务）

**结论（代码可见链路示例，非完整产线）：**
- CRM 下单：`/order/create-crm` → addition → preview → result，状态在 Pinia `order`
- 抢单：`grabOrder/*` ↔ `/order/grabDetail`（小程序条件下可 redirect 到小程序分包页）
- 培训订单：可跳转 `home-service*.yza.cn`
- CRM 阿姨：简历 / 位置 / 排班页面同域路由串联
- 支付页独立路由，被各业务打开完成收款

更完整的「订单→排班→财务」后端链路 **未从本仓完整确认**。

**关键路径：**
- [src/router/modules/order.js](../src/router/modules/order.js)
- [src/store/modules/order.ts](../src/store/modules/order.ts)
- [src/router/modules/grabOrder.js](../src/router/modules/grabOrder.js)
- [src/router/modules/crm.ts](../src/router/modules/crm.ts)

### 38. 代码里有没有明显的「危险区」迹象？（财务、权限、审批、开票、退款）

**结论：**
- **支付 / 退款文案与支付通道：** `src/views/pay/*`（微信/支付宝、退款说明）
- **权限：** `permissions.ts`、部分管理页按钮控制
- **签约 / 人脸 / 实名：** `sign`、`faceAuth`、`yunzhanghu`
- **开票 / 完整财务审批流：** 本仓未见独立「开票中心」模块；审批 chunk 名历史注释存在，**完整审批系统未从代码确认**

**关键路径：** [src/views/pay/](../src/views/pay/)、[src/views/sign/](../src/views/sign/)、[src/views/faceAuth/](../src/views/faceAuth/)

### 39. 关键枚举、状态机在代码里怎么定义？

**结论：** **分散在各业务**，无统一全局状态机框架。常见写法：
- `const` / `enum` / `Map` 在模块内 constants（如 `supervisor/constants.js`、`grabOrder/.../myOrdersService.js`、`todo/constant.js`）
- 部分枚举来自 YApi 生成的 interface 注释

**关键路径：**
- [src/views/supervisor/constants.js](../src/views/supervisor/constants.js)
- [src/views/grabOrder/nurse/modules/myOrdersService.js](../src/views/grabOrder/nurse/modules/myOrdersService.js)
- [src/views/todo/constant.js](../src/views/todo/constant.js)

### 40. 有没有「改动时要小心」的区域 / 注释提示？

**结论（迹象）：**
- `http.ts`：`TODO 上线后删除`（默认 reqChannel/systemCode）
- 支付页真假支付分支注释
- 签名密钥明文在 `utils/index.js`（`SECRET_KEY`）——改签名/时差逻辑影响全站请求
- 环境切换依赖 `env.ts` 的 `devEnv`，改错会打到错误网关
- `order.js` 中小程序抢单 redirect 条件逻辑较脆
- 多套 request 封装并存，改鉴权需确认调用链

**关键路径：** [src/utils/http.ts](../src/utils/http.ts)、[src/utils/index.js](../src/utils/index.js)、[src/utils/env.ts](../src/utils/env.ts)、[src/router/modules/order.js](../src/router/modules/order.js)

---

## 九、工程与协作（能从代码 / 配置看出的部分）

### 41. ESLint / Prettier / Husky / lint-staged 是否启用？提交前检查什么？

**结论：**
- ESLint + Prettier：**有**（`.eslintrc.cjs`、`.prettierrc`；`lint` script）
- Vite 内 eslint 插件在配置里 **被注释掉**
- **无 `.husky`、无 lint-staged 配置** → 提交前自动检查 **未从代码确认 / 基本未启用**

**关键路径：** [.eslintrc.cjs](../.eslintrc.cjs)、[.prettierrc](../.prettierrc)、[vite.config.ts](../vite.config.ts)、[package.json](../package.json)

### 42. 环境变量约定是什么？（如 `VUE_APP_ENV_BUILD` / `VITE_APP_*`）

**结论：** 主要用 Vite `import.meta.env.MODE` + 自研 `currentEnv` / `devEnv`。**仓库无 `.env*`，未见成体系的 `VITE_APP_*` 约定。**

**关键路径：** [src/utils/env.ts](../src/utils/env.ts)

### 43. 文档现状？README 是否过时？还缺什么？

**结论：** README 仍是 **GitLab 默认模板**，仅一句「移动端项目都放在这开发」，**严重过时**。缺：安装与 Node 版本、包管理器约定、环境切换说明、业务模块地图、联调/Token 获取方式、部署说明。本文件为新人调研答案补齐入口。

**关键路径：** [README.md](../README.md)、[docs/项目认识-答案.md](./项目认识-答案.md)

### 44. 已知技术债在代码里有哪些迹象？

**结论：** 双请求封装、双入口、Vant+Antd 混用、JS/TS 混用、1500+ 生成 API 堆积、废弃接口未清理、README/文档缺失、lock 文件与 gitignore 策略不一致、密钥写在前端、`http.ts` 仍引用 `element-plus` 的 `ElMessage`（可能死代码/历史残留）等。

**关键路径：** 见第 6、19、41、43 题相关路径

### 45. 部署相关配置在哪？（CI/CD、Dockerfile、容器、K8s）

**结论：** 本仓库 **未发现** `.gitlab-ci.yml`、Dockerfile、K8s manifests。部署流水线可能在 GitLab 组级或其它仓，**未从本仓确认**。产物为静态 `dist`，线上域线索见 `domain.ts`（如 `mobile.yza.cn`）。

**关键路径：** [src/utils/domain.ts](../src/utils/domain.ts)、[.gitignore](../.gitignore)（`dist`）

### 46. 监控、日志、埋点在代码里怎么接的？

**结论：**
- 埋点：火山引擎 Rangers `collectEvent`（`index.html` init `app_id: 560567`），业务页按需 `window.collectEvent(...)`
- 调试：非生产 host / App 内可开 VConsole；`main.js` 在 `currentEnv === 'dev'` 时 `new VConsole()`
- 另引入 `fe-static.../_log.min.js`
- APM/错误监控平台（Sentry 等）**未从代码确认**

**关键路径：** [index.html](../index.html)、例 [src/views/insurance/h5-content-library/index.vue](../src/views/insurance/h5-content-library/index.vue)、[src/main.js](../src/main.js)

---

## 十、上手行动清单

### 47. 新人第一天建议按什么顺序读哪些文件？给出关键文件路径。

**结论（建议顺序）：**
1. [package.json](../package.json) — scripts / 依赖
2. [src/utils/env.ts](../src/utils/env.ts) + [src/utils/getCurrentUrl.ts](../src/utils/getCurrentUrl.ts) + [src/utils/domain.ts](../src/utils/domain.ts) — 环境与域名
3. [index.html](../index.html) + [src/main.js](../src/main.js) + [src/App.vue](../src/App.vue) — 启动与 token
4. [src/utils/http.ts](../src/utils/http.ts) + [yapiMagic.config.ts](../yapiMagic.config.ts) — 请求与 API 生成
5. [src/router/index.js](../src/router/index.js) — 业务地图入口
6. [src/utils/platform.js](../src/utils/platform.js) + [src/utils/jsBridge.ts](../src/utils/jsBridge.ts) — 多端嵌入
7. 再读自己负责的 `src/router/modules/xxx` + `src/views/xxx`

### 48. 改一个普通列表页，通常要动哪几层文件？

**结论：**
1. 页面：`src/views/<业务>/...vue`
2. 如需新接口：生成或手写 `src/apis/api*.ts`（及必要时 `@api-id-using.ts`）
3. 列表常量/枚举：同目录 `constants` / `modules`
4. 一般 **不必** 改 store；路由已存在则不动 router

### 49. 加一个新页面 / 新分包页面的标准步骤？

**结论：**
1. 在 `src/views/<业务>/` 新建页面组件
2. 在对应 `src/router/modules/<业务>.js|ts` 增加 `path` / `meta.title` / 懒加载 `component`
3. 若新业务域：新建 module 文件并在 [src/router/index.js](../src/router/index.js) `import` + 展开进 `routes`
4. （本仓无小程序分包 root）如需被 App/小程序打开，与宿主约定完整 H5 URL 与 query token 参数

### 50. 加一个新接口的标准步骤？（手写 / 生成）

**结论（生成，推荐）：**
1. 在 YApi 把接口打上 **当前 Git 分支 tag**，或把 api id 写入 [src/apis/@api-id-using.ts](../src/apis/@api-id-using.ts)
2. 确认 projectId 已在 [yapiMagic.config.ts](../yapiMagic.config.ts) 的 `configs` 中
3. 运行 `npm run yapi`（或等价包管理器命令）
4. 业务中 `import apiXXXX from '@/apis/apiXXXX'` 调用

**手写：** 参考 `src/api/*.js` 或直接 `service({ url: getCurrentUrl(...), ... })`，不推荐与生成目录混用同一 id。

### 51. 我若只想熟悉「某模块」，从哪几个路径切入？

**结论（通用切入法 + 示例）：**

**通用：** `src/router/modules/<模块>.js|ts` → `src/views/<模块>/` → 该目录下 import 的 `@/apis/api*` → 相关 `utils` / `components`。

**示例 — 抢单（与当前改动相关）：**
- [src/router/modules/grabOrder.js](../src/router/modules/grabOrder.js)
- [src/views/grabOrder/](../src/views/grabOrder/)
- [src/views/order/grabDetail/](../src/views/order/grabDetail/)（详情联动）
- [src/App.vue](../src/App.vue)（抢单 localStorage 清理）

**示例 — 支付：**
- [src/router/modules/pay.js](../src/router/modules/pay.js)
- [src/views/pay/](../src/views/pay/)

**示例 — 守护：**
- [src/router/modules/guard.js](../src/router/modules/guard.js)
- [src/views/guard/](../src/views/guard/)

---

## 附录：快速对照

| 项 | 值 |
|----|-----|
| 仓库 | yishou-mobile |
| package name | build-vite |
| 主入口 | `src/main.js` |
| 默认路由 | `/` → `/visitorWifi` |
| 本地 host | `https://local.yza.cn`（需证书） |
| 网关 prd | `https://gateway.yza.cn` |
| H5 域 prd | `https://mobile.yza.cn` |
| Token Cookie | `yilifeToken` |
| API 生成 | `npm run yapi` |

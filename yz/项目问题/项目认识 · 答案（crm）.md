# 项目认识 · 答案（crm / workcrm-web）

> 本文档基于代码库调研生成，按题号顺序作答。每题给「结论 + 关键文件路径」。
> 不确定项标注「未从代码确认」，未编造。调研未改动任何业务代码。
>
> **源文件：** `D:/A-work/yz/workcrm-web/docs/项目认识-答案.md`  
> **系列索引：** [项目认识 · 索引](./项目认识%20·%20索引.md)  
> **姊妹文档：** [yishou-mobile](./项目认识%20·%20答案（yishou-mobile）.md) · [organization-background](./项目认识%20·%20答案（organization-background）.md) · [nurse-mini](./新项目认识%20·%20答案（nurse-mini）.md)

## 一、项目定位与业务

### 1. 这个项目是做什么的？面向谁？核心业务一句话？

**结论**：这是「颐挚科技」公司的 CRM（客户关系管理）Web 后台系统，面向公司内部销售/管理角色（内部用户、机构用户、医院用户，见 `userType` 枚举）。核心业务一句话：围绕家政/护工/月嫂/陪诊等服务业，管理线索→客户→订单→跟进→工作手机风控的全链路客户关系与销售管理。

关键文件路径：
- `package.json`（name: `crm_web`）
- `src/main.ts`
- `src/stores/userStore.js`（`userType` 枚举：1 内部/2 机构/3 医院/4 C 端）
- `src/views/order/detail/enum/index.js`（订单类型：院内护工/居家月嫂/居家护工/陪诊）

### 2. 产品名 / 品牌在代码里叫什么？和仓库名是否一致？

**结论**：品牌名为「颐挚科技」，在页面标题、侧边栏 Logo、header、`index.html` 的 `<title>` 中均出现。仓库名为 `workcrm-web`（package.json name 为 `crm_web`），与品牌名不一致；域名统一用 `yza.cn`（如 `gateway.yza.cn`、`login.yza.cn`）。

关键文件路径：
- `index.html`（`<title>颐挚科技</title>`）
- `src/components/header/index.vue`（logo 与「颐挚科技」字样）
- `src/layout/side-bar/index.vue`（`<h3>颐挚科技</h3>`）
- `src/router/filterRouter.ts`（`document.title = ... | 颐挚科技`）
- `package.json`（`"name": "crm_web"`）

### 3. 是纯前端 / 纯后端 / 全栈？有没有配套仓库线索？

**结论**：纯前端项目（Vue 3 + Vite SPA）。后端通过 HTTP 网关（`gateway-*.yza.cn`）调用，前端代码内无后端实现。配套仓库线索：工作手机模块通过 iframe 嵌入独立子系统（`work-phone-*.yza.cn`，见 `workPhoneUrl`），登录走独立登录中心（`login-*.yza.cn`），表单走 `survey-form-*.yza.cn`，说明存在多个独立前后端仓库（后端、work-phone 子系统、登录中心、表单系统等）。

关键文件路径：
- `src/utils/getCurrentUrl.ts`（各子系统域名映射：gateway/login/work-phone/survey-form/mobile/passport/home-service）
- `src/components/iframe-page/iframe-page.vue`（iframe 嵌入 work-phone 子系统）
- `src/views/iframe/index.vue`（通用外部 URL iframe 嵌入）

### 4. 主要业务域有哪些？各自大致负责什么？

**结论**：主要业务域（对应 `src/views` 一级目录）：
- `customer-manage` 客户管理：潜客/我的线索/线索池/客户/客户公海/用户画像/客户群组/订单列表/内容访客/客资录入/抖音客户
- `order` 订单管理：院内护工/居家月嫂/居家护工/陪诊订单及详情
- `grabOrder` 抢单：接单池
- `sales-manage` 销售管理：跟进记录/目标管理/审批/工作汇报/任务/云盘
- `system-manage` CRM 设置：标签/线索池/业务设置/客户公海/客资跟进/星级配置
- `device-manage` 设备管理（工作手机）：手机激活/微信绑定/风控/位置/license/敏感词
- `call-manage` 通话管理：通话记录/短信/通讯录/工作记录/总览
- `record-manage` 敏感词记录：通话/短信/微信敏感词与敏感操作、财务敏感
- `marketing-center` 营销中心：落地页/文章/音视频/文件夹/小程序/海报/短信/智能外呼/微表单/个人名片/短链
- `data-center` 数据中心：客户分析/线索分析/营销分析
- `dataEaseManage` 数据大屏
- `admin-manage` 团队管理：公司组织/角色权限
- `work-phone` 工作手机（iframe 嵌入子系统）
- `interview` 面试、`wechat-share-market` 微信分享、`wechat-manage`、`douyin-customer-manage` 抖音客户

关键文件路径：
- `src/router/menuRoutes.ts`（菜单路由聚合，体现业务域划分）
- `src/views/`（各业务目录）

### 5. 从登录到完成一件核心任务的主流程路径是什么？

**结论**：核心任务以「线索→客户→订单」为例：
1. 用户打开页面 → `filterRouter.ts` 的 `beforeEach` 检查 Cookie `yilifeToken`，未登录则 `noLoginJump` 跳转 `login-*.yza.cn/login`
2. 登录后回跳，`main.ts` 的 `init()` 执行 `getUserPermission()`：拉取用户信息（`api16003`）、租户列表（`api14371`）、菜单（`api14379`）、枚举（`api22931`），写入 `userStore`/`sidebarStore`
3. `App.vue` 在 `user.userInfo.id` 有值后渲染 `Home.vue`（header + sidebar + RouterView）
4. 进入「客户管理→我的线索」（`/aicrm/my-customer-lead`）→ 创建/跟进线索 → 转客户
5. 进入「客户管理→客户管理」→ 下单 → 「订单管理」查看/派单/续约

关键文件路径：
- `src/main.ts`（`init()` 与 `getUserPermission`）
- `src/router/filterRouter.ts`（登录拦截）
- `src/utils/noLoginJump.js`（未登录跳转）
- `src/App.vue`、`src/views/Home.vue`
- `src/views/customer-manage/customer-lead-manage/my-clue/index.vue`
- `src/views/order/index.vue`、`src/views/order/detail/index.vue`

### 6. 哪些模块看起来已废弃或双轨并存？

**结论**：
- 双轨并存：`advanced-table`（v1）与 `advanced-table-v2` 两套表格组件并存，新页面多用 v2。
- 占位/废弃：`src/views/smart-page/index.vue` 是「敬请期待」占位页，被大量路由（智慧外呼/线上商城/裂变/直播/挚护系列等）复用，说明这些功能在前端未实现。
- 注释掉的路由：`menuRoutes.ts` 中 `approval`（审批）、`report`（工作汇报）、`intelligent-task`（任务）、`file-library`（云盘）、`organization-role`（权限管理）均被注释，但对应视图目录仍在。
- 备份文件：`marketing-center/article-manage/index.bak.vue` 等存在 `.bak` 备份。
- `layout/index.vue` 与 `views/Home.vue` 功能重复（Home.vue 实际在用，layout/index.vue 似为旧版）。
- `request/api/depart-manage.ts` 中 `getUserPermission` 大段注释，实际权限逻辑已迁到 `main.ts`。

关键文件路径：
- `src/components/advanced-table/` 与 `src/components/advanced-table-v2/`
- `src/views/smart-page/index.vue`
- `src/router/menuRoutes.ts`（注释段）
- `src/views/marketing-center/article-manage/index.bak.vue`
- `src/layout/index.vue`（疑似旧版布局）

## 二、技术栈与运行

### 7. 技术栈是什么？框架版本、UI 库、状态管理、构建工具？

**结论**：
- 框架：Vue `^3.2.45`（Composition API + `<script setup>`）
- 语言：TypeScript `4.7.4`（与 JS 混用）
- 构建：Vite `^3.2.7`，压缩用 `terser`
- 路由：vue-router `4.0.12`
- 状态管理：Pinia `2.0.11` + `pinia-plugin-persist`
- HTTP：axios `1.3.4`
- UI 库：Element Plus `2.11.0` + 内部封装 `@yza-fe/element-plus` `2.11.7-beta.20` + ant-design-vue `^3.1.0-rc.2` + vxe-table `^4.3.12`
- 图表：echarts `5.4.1`、vue-echarts `6.2.3`、@antv/g2plot `^2.4.31`
- 工具：lodash `4.17.21`、dayjs `1.11.9`、moment `2.29.4`（与 dayjs 并存）、js-cookie `3.0.5`、ali-oss `6.18.0`、jsencrypt、cropperjs、wangeditor、markdown-it、qrcodejs2、html2canvas、dom-to-image-more
- 自动导入：unplugin-auto-import（vue/vue-router API）、unplugin-vue-components（AntDesignVueResolver）
- 接口生成：yapi-magic `1.2.7`

关键文件路径：
- `package.json`

### 8. 支持哪些端？

**结论**：仅 PC Web 后台（H5 风格 SPA，浏览器访问）。无小程序/App 原生代码，无 `pages.json`/uni-app 配置。部分页面通过 iframe 嵌入其他子系统（工作手机、表单、外部 URL）。移动端域名 `mobile-*.yza.cn` 在 `getMobileCurrentUrl` 中出现，但属于外部独立移动端项目，非本仓库。

关键文件路径：
- `vite.config.ts`（无小程序/App 构建配置）
- `src/utils/getCurrentUrl.ts`（`getMobileCurrentUrl` 指向外部移动端域名）

### 9. 本地如何安装与启动？开发/UAT/生产命令分别是什么？访问地址？

**结论**：
- 安装：`npm install`（私有包 `@yza-fe` 走 volces 私有仓库，见 `.npmrc`）
- 开发启动：`npm run dev`（即 `vite`），访问 `https://local.yza.cn`（需配 hosts 指向 127.0.0.1，并信任 `cert/` 下证书）
- 构建：
  - `npm run build-dev`（`vite build`，mode 默认）
  - `npm run build-test`（`--mode=test`）
  - `npm run build-prod`（`--mode=prod`）
  - 另有 `build:dev/sit/uat/demo/prd` 系列（`--mode xxx`）
- 预览：`npm run preview`（`vite preview --port 5050`）
- 类型检查：`npm run typecheck`（`vue-tsc --noEmit`）
- Lint：`npm run eslint`、`npm run lint`（README 中提到但 package.json 未定义 `lint`，实际只有 `eslint`）

关键文件路径：
- `package.json`（scripts）
- `README.md`
- `vite.config.ts`（server.host=`local.yza.cn`，https 用 `cert/` 证书）
- `.npmrc`

### 10. Node / 包管理器有什么要求？lock 文件以谁为准？私有包怎么装？

**结论**：包管理器为 npm（存在 `package-lock.json`，以它为准；`.gitignore` 忽略 `yarn.lock`）。私有包 `@yza-fe/element-plus` 通过 `.npmrc` 配置的 volces 私有仓库（`artifacts-cn-shanghai.volces.com/repository/yza-biz-components/`）拉取，已内置 `_auth`。Node 版本未在代码中显式声明（无 `.nvmrc`/`engines` 字段），但依赖 TS 4.7/Vite 3，建议 Node 16+。

关键文件路径：
- `package-lock.json`
- `.npmrc`
- `.gitignore`（忽略 `yarn.lock`）

### 11. 构建产物在哪？用什么工具预览？

**结论**：构建产物在 `dist/`（已被 `.gitignore` 忽略，但仓库内仍存有一份）。预览用 `vite preview --port 5050`。无微信开发者工具相关配置（非小程序项目）。

关键文件路径：
- `dist/`（`index.html`、`assets/`、`crm-logo.png`、`favicon.ico`）
- `vite.config.ts`（`build.minify: terser`，生产 `drop_console`/`drop_debugger`）
- `.gitignore`（`/dist`）

### 12. 环境怎么切换？改哪个文件 / 变量？

**结论**：环境通过 Vite mode + `.env.*` 文件切换，核心变量：
- `VITE_NODE_ENV`（dev/test/sit/demo/prod）
- `VITE_BASE`（部署基路径，如 `/`、`/crm_web/`）
- `VITE_BASE_URL`（注：此变量在 `.env` 中定义但实际 baseURL 由 `getCurrentUrl()` 运行时计算，未直接使用 `VITE_BASE_URL`）

实际 baseURL 由 `src/utils/getCurrentUrl.ts` 根据 `currentEnv`（来自 `src/utils/env.ts`）映射到网关域名：`gateway-dev/sit/uat/demo.yza.cn`、生产 `gateway.yza.cn`、mock 走 `yapi.yza.cn`。本地开发固定 `devEnv="dev"`（`env.ts` 顶部硬编码），可改该常量切换本地调用的后端环境；URL 上加 `?env=sit` 也可临时覆盖。

关键文件路径：
- `.env.dev`、`.env.test`、`.env.sit`、`.env.demo`、`.env.prod`
- `src/utils/env.ts`（`devEnv` 常量、`currentEnv`）
- `src/utils/getCurrentUrl.ts`（各环境网关/子系统域名映射）

## 三、目录与架构

### 13. `src` 下一级目录各自职责是什么？

**结论**：
- `apis/` — yapi-magic 自动生成的接口文件（`apiXXXX.ts`，按 yapi 接口 id 命名）+ `@api-id-using.js`（手动登记需生成的接口 id）
- `assets/` — 静态资源（样式 `reset.scss`、`element-plus.scss`、`ant-design.scss`，图片）
- `common/` — 通用工具与常量（`constant.ts` 枚举、`jsencrypt.ts` RSA 加密、`format.ts`、`download.ts`、`WxStaff.ts`、`depart.ts` 等）
- `components/` — 公共/业务组件（`advanced-table-v2`、`header`、`sidebar`、`iframe-page`、`oss-upload-file`、`customer-info-drawer`、`depart-personnel-tree` 等）
- `directive/` — 全局指令（`permission` 按钮权限指令）
- `hooks/` — 组合式函数（`useSaasTenant` 判断 SaaS 租户）
- `layout/` — 旧版布局组件（疑似未使用，实际用 `views/Home.vue`）
- `plugins/` — 第三方插件初始化（`yza-fe-element.js` 内部 UI 库、`txMap.js` 高德地图）
- `request/` — HTTP 封装（`http.ts` axios 实例、`request.ts` 请求工厂、`base.ts` get/post 工厂、`token.ts`、`config.js` systemCode、`api/` 手写接口层）
- `router/` — 路由（`index.ts`、`menuRoutes.ts` 主菜单、`filterRouter.ts` 守卫、`modules/` 分模块路由）
- `stores/` — Pinia 状态（`userStore`、`sidebar`、`cluePanel`、`index`、`type`）
- `types/` — 全局类型声明（`global.d.ts`）
- `utils/` — 工具函数（`env.ts`、`getCurrentUrl.ts`、`index.js`、`permissions.js`、`noLoginJump.js`、`useCommon.js`、`validator.ts`、`regex.ts`、`money.js`、`time.js` 等）
- `views/` — 业务页面（按业务域分目录）
- `App.vue`、`main.ts` — 应用入口

关键文件路径：
- `src/main.ts`、`src/App.vue`
- `src/` 下各一级目录

### 14. 入口文件是哪些？

**结论**：
- 构建/HTML 入口：`index.html`（加载 `/src/main.ts`）
- JS 入口：`src/main.ts`（创建 app、注册 Element Plus / VXETable / Pinia / 路由 / 指令 / 图标，执行 `getUserPermission` 拉权限后 `mount`）
- 根组件：`src/App.vue`（等 `user.userInfo.id` 就绪后渲染 `Home`）
- 布局入口：`src/views/Home.vue`（header + sidebar + RouterView，支持 iframe 嵌入模式）

关键文件路径：
- `index.html`
- `src/main.ts`
- `src/App.vue`
- `src/views/Home.vue`

### 15. 页面怎么组织？主包 / 分包结构如何？分包 `root` 各对应什么业务？

**结论**：本项目为 SPA 单包应用（非小程序，无 `pages.json`、无分包 `root` 概念）。页面组织方式：`src/views/<业务域>/<功能>/index.vue`，路由在 `src/router/menuRoutes.ts` + `src/router/modules/*.js` 中静态声明，菜单由后端接口 `api14379` 返回并在 `sidebarStore` 中动态渲染。路由层级与菜单层级对应（一级菜单→二级/三级页面）。

关键文件路径：
- `src/router/menuRoutes.ts`
- `src/router/modules/`（`customer.js`、`clue.js`、`order.js`、`marketing-center.js`、`dataEaseManage.js`、`iframeRoutes.js`）
- `src/views/`

### 16. 公共组件、业务组件分别放在哪？有什么命名 / 约定？

**结论**：组件统一放 `src/components/`，未严格区分公共/业务，按功能目录组织（每个目录一个组件，`index.vue` 为入口）。命名约定：
- 目录名 kebab-case（如 `advanced-table-v2`、`customer-info-drawer`、`depart-personnel-tree`）
- 业务组件多带业务前缀（`customer-`、`depart-`、`wechat-`、`record-`）
- `custom-svg-icon/svg/` 下放自定义 SVG 图标组件（如 `CustomerManageIcon.vue`、`SalesManageIcon.vue`、`FinanceIcon.vue`）
- 视图内「局部业务组件」放在 `src/views/<业务域>/component/` 或页面同级 `component/` 目录

关键文件路径：
- `src/components/`（全局组件）
- `src/components/custom-svg-icon/svg/`（业务图标）
- `src/views/order/component/`、`src/views/customer-manage/component/`（页面局部组件）

### 17. 接口层怎么分层？API 是手写还是生成？生成命令是什么？

**结论**：接口层分两套并存：
1. **生成层（yapi-magic）**：`src/apis/apiXXXX.ts`，由 yapi-magic 从 `yapi.yza.cn` 拉取接口定义自动生成（每个文件对应一个 yapi 接口 id，含请求/响应 TS 类型）。生成命令：`npm run yapi`（即 `yapiMagic`），配置在 `yapiMagic.config.ts`（关联 12 个 yapi 项目 id：119/301/317/29/124/128/59/41/282/71/111/333）。辅助脚本 `bin/yapi.sh` 支持传入 yapi 接口 URL 批量生成；`src/apis/@api-id-using.js` 手动登记需生成的接口 id（防止 yapi tag 丢失）。
2. **手写层**：`src/request/api/*.ts`（如 `customer-manage.ts`、`order-manage.ts`、`depart-manage.ts` 等），手写封装，基于 `src/request/base.ts` 的 `get/post/post2/importFile` 工厂。

两套均最终走 `src/request/http.ts` 的 axios 实例与 `src/request/request.ts` 的请求工厂（统一注入 token/orgId/tenantId/resourceId 头）。

关键文件路径：
- `yapiMagic.config.ts`、`bin/yapi.sh`、`src/apis/`、`src/apis/@api-id-using.js`
- `src/request/base.ts`、`src/request/request.ts`、`src/request/http.ts`
- `src/request/api/`（手写接口层）

### 18. 工具函数、常量、权限、跳转等横切能力放在哪？

**结论**：
- 工具函数：`src/utils/`（`index.js` 通用工具、`time.js`、`money.js`、`validator.ts`、`regex.ts`、`useCommon.js`、`getDistrict.js`、`scroll-to.js`、`shortcuts.js` 等）
- 常量与枚举：`src/common/constant.ts`（业务枚举：客户类型/来源/阶段/性别/规模/敏感词/微信类型等）、各业务目录内 `enum/`、`constants.ts`、`config.js`
- 环境与域名：`src/utils/env.ts`、`src/utils/getCurrentUrl.ts`
- 权限：`src/utils/permissions.js`（`permissions`/`hasBtnPermission`）、`src/directive/permission/permission.ts`（`v-permission` 指令）
- 跳转：`src/utils/noLoginJump.js`（未登录跳登录）
- 加密：`src/common/jsencrypt.ts`（RSA）
- 格式化：`src/common/format.ts`
- SaaS 判断：`src/hooks/useSaasTenant.ts`、`src/utils/useSaasInfo.js`

关键文件路径：
- `src/utils/`、`src/common/`、`src/directive/`、`src/hooks/`

### 19. TS / JS 混用吗？代码规范与格式化规则？

**结论**：TS 与 JS 混用——`main.ts`、`request/`、`router/index.ts`、`apis/`、`utils/*.ts`、`common/*.ts` 等用 TS；`stores/userStore.js`、`sidebar.js`、`router/modules/*.js`、`request/config.js`、`utils/*.js`、大量 `views/**/*.js` 用 JS。Vue 文件混用 `<script lang="ts">` 与 `<script setup lang="ts">` 与无 lang。

代码规范：
- ESLint：`.eslintrc.js`（extends `eslint:recommended` + vue/essential + @typescript-eslint/recommended + auto-import），规则：2 空格缩进、双引号、必须分号、unix 换行、`prefer-const` off、`ban-ts-comment` off、`no-unused-vars` off
- Prettier：`.prettierrc`（2 空格、`printWidth: 1000`、双引号、`trailingComma: all`、分号、`arrowParens: always`）
- Stylelint：`.stylelintrc.js` + `.stylelintignore`
- TSConfig：`tsconfig.json`（`@/*` 别名、`noUnusedLocals/Parameters: true`）

关键文件路径：
- `.eslintrc.js`、`.prettierrc`、`.stylelintrc.js`、`tsconfig.json`、`tslint.json`

## 四、路由、导航与入口

### 20. 路由配置在哪？TabBar 有哪些项？

**结论**：路由配置在 `src/router/`，主入口 `index.ts`（`createRouter` + `createWebHistory` + 动态 `addRoute`），主菜单路由表 `menuRoutes.ts`，分模块在 `modules/`。本项目是 PC 后台，**无 TabBar**（无 `tabBar` 配置，非小程序/移动端）。导航形式为左侧菜单栏（`src/components/sidebar/index.vue` + `src/layout/side-bar/index.vue`），菜单项由后端接口 `api14379` 返回 + 前端 `menuRoutes` 静态路由共同决定。

关键文件路径：
- `src/router/index.ts`、`src/router/menuRoutes.ts`、`src/router/modules/`
- `src/components/sidebar/index.vue`、`src/layout/side-bar/index.vue`

### 21. 有没有自定义导航 / 自定义 TabBar？怎么接的？

**结论**：无自定义 TabBar。自定义导航为左侧折叠菜单：`src/components/sidebar/index.vue`（实际在用）渲染 `sidebarStore.menuList`（getter 将后端 `dataList` 转成 `{icon,index,title,subs,resourceId}` 树），用 `el-menu` + `el-sub-menu`/`el-menu-item` 实现，支持折叠（`sidebar.collapse`）。`src/layout/side-bar/index.vue` 是另一套（疑似旧版，含「颐挚科技」标题）。顶部 header（`src/components/header/index.vue`）含 Logo、折叠按钮、切换租户（`change-org`）、用户头像（`user-name`）、切换系统（`change-system`）。

关键文件路径：
- `src/components/sidebar/index.vue`、`src/components/header/index.vue`
- `src/components/header/change-org/index.vue`、`change-system/index.vue`、`user-name/index.vue`
- `src/stores/sidebar.js`（`getMenuByChildren` 转 menuList）

## 五、数据、请求与鉴权

### 22. HTTP 请求封装在哪？如何挂到实例上？

**结论**：HTTP 封装在 `src/request/`：
- `http.ts`：创建 axios 实例 `service`（`withCredentials:true`、超时 30s、默认头含 `reqChannel`/`systemCode`/`Authorization`），配置 request/response 拦截器（response 中按 `status===200`+`result.status===200||code===0` 判定成功，error 中 401→`noLoginJump`、403→提示、网络/超时提示）
- `request.ts`：`request(options)` 工厂，返回 axios 回调；按 `requestType`（json/urlencode/file）设置 Content-Type 与包装 data；get 走 params、post 走 data；统一注入头 `X-AUTH-UID`(userId)、`orgId`、`tenantId`(=orgId)、`resourceId`（根据当前路由匹配菜单 resourceId）
- `base.ts`：基于 `request` 导出 `get/get2/post/post2/postFile/importFile` 工厂，`baseURL` 来自 `getCurrentUrl()`
- 未通过 `app.config.globalProperties.$request` 挂到 Vue 实例，业务代码直接 import 调用

关键文件路径：
- `src/request/http.ts`、`src/request/request.ts`、`src/request/base.ts`

### 23. baseURL / 网关地址怎么按环境切换？

**结论**：`baseURL` 由 `src/utils/getCurrentUrl.ts` 运行时计算，按 `currentEnv`（`src/utils/env.ts`：开发取 `devEnv` 常量，构建取 `import.meta.env.MODE`）映射网关域名：
- mock: `https://yapi.yza.cn/mock/<projectId>`
- dev: `https://gateway-dev.yza.cn`
- sit: `https://gateway-sit.yza.cn`
- uat: `https://gateway-uat.yza.cn`
- demo: `https://gateway-demo.yza.cn`
- prd: `https://gateway.yza.cn`

URL 上 `?env=xxx` 可临时覆盖。`.env.*` 里的 `VITE_BASE_URL` 仅用于 `vite.config.ts` 的 `base` 部分场景，实际接口 baseURL 不读它。生成接口 `apiXXXX.ts` 中 `baseURL: getCurrentUrl(<projectId>)` 按 yapi 项目 id 拼接（多项目共用同一网关）。

关键文件路径：
- `src/utils/getCurrentUrl.ts`、`src/utils/env.ts`、`src/request/base.ts`

### 24. Token、用户信息、机构 / 租户 ID 存在哪？请求如何自动带上？

**结论**：
- Token：Cookie `yilifeToken`（`src/request/token.ts` 的 `getToken` 优先取 URL `?token=`，否则取 Cookie）。`http.ts` 启动时还会把 URL 上的 `_token/token/_orgId/orgId` 写入 Cookie。
- 用户信息：Pinia `userStore.userInfo`（运行态）+ `localStorage.AuthorizationInfo`（`src/request/api/depart-manage.ts` 的 `saveUserInfo`/`delUserInfo`）
- 机构/租户：Pinia `userStore.org`（`{orgId,orgName,...}`），通过 `pinia-plugin-persist` 持久化到 `localStorage` key=`org`（仅持久化 `org` 字段）
- 请求自动带头：`request.ts` 在每次请求注入 `X-AUTH-UID`(=userInfo.userId)、`orgId`、`tenantId`(=orgId)、`resourceId`；`http.ts` 实例默认头含 `Authorization`(getToken)、`reqChannel`、`systemCode`

关键文件路径：
- `src/request/token.ts`、`src/request/http.ts`、`src/request/request.ts`
- `src/stores/userStore.js`（persist 配置）、`src/request/api/depart-manage.ts`

### 25. 401 / 未登录如何处理？

**结论**：两处处理：
1. `src/request/http.ts` response error 拦截器：HTTP `status===401` → 调用 `noLoginJump()`
2. `src/router/filterRouter.ts` `beforeEach`：无 Cookie `yilifeToken` → 调用 `noLoginJump()`

`noLoginJump`（`src/utils/noLoginJump.js`）：弹 `ElMessage`「您还未登录，请先登录」，1s 后 `localStorage.removeItem('org')` 并跳转 `callbackCurrentLoginUrl`（即 `https://login-*.yza.cn/login`，按环境映射）。另有白名单（401/404/user-center/iframe/createInterview 等不拦截）、iframe 内不拦截、`?bypassAuth` 或 `localStorage.bypassAuth` 可绕过鉴权。

关键文件路径：
- `src/utils/noLoginJump.js`
- `src/request/http.ts`、`src/router/filterRouter.ts`
- `src/utils/getCurrentUrl.ts`（`callbackCurrentLoginUrl`）

### 26. 上传、WebSocket、推送等特殊通道有没有单独域名？

**结论**：
- 上传：走 OSS（依赖 `ali-oss`）。`src/apis/apiUpload.ts`（实为 `/crm-server/sts/token`）获取 STS token 后前端直传 OSS；`src/components/oss-upload-file/index.vue`、`uploadMultipleSimple.vue` 封装上传。另有火山引擎 TOS SDK（`index.html` 引入 `tos.umd.production.min.js`）。上传通道与网关同域（STS token 接口走网关），文件存储在 OSS/TOS。
- WebSocket：代码中未发现独立 WebSocket 通道配置（无 `ws://` 域名、无 socket.io）。
- 推送：未从代码确认独立推送域名。
- 地图：高德地图 `webapi.amap.com`（`index.html` 引入，含 securityJsCode）。

关键文件路径：
- `src/apis/apiUpload.ts`、`src/components/oss-upload-file/index.vue`
- `index.html`（高德地图、TOS SDK）

### 27. 权限模型：菜单权限 / 按钮权限 / 数据权限怎么做？用什么指令或方法？

**结论**：
- **菜单权限**：后端接口 `api14379`（`/user-web-2/...`，按 `orgId`+`systemCode`）返回菜单树，存 `sidebarStore.dataList`，getter `menuList` 转树形渲染左侧菜单。`filterRouter.ts` 的 `beforeEach` 做二级菜单 path 校验（`hasPermissionList`），但实际多数情况直接 `next()` 放行，权限控制偏弱。`menuRoutes.ts` 的 `filterMenuRoutes` 按 `routePermission` 过滤（但 `routePermission` 多为空）。
- **按钮权限**：`sidebarStore` getter `btnPermission`（扁平化菜单收集所有 `childrenButton[].resourceCode`）。使用方式：
  - 指令：`v-permission="'code'"`（`src/directive/permission/permission.ts`，匹配则 `display:inherit` 否则 `none`）
  - 方法：`hasBtnPermission(code)`（`src/utils/permissions.js`，返回 boolean）
- **数据权限**：未从代码确认有前端数据权限控制；多租户数据隔离通过请求头 `orgId`/`tenantId` 由后端控制。

关键文件路径：
- `src/main.ts`（`getUserPermission` 拉菜单）、`src/stores/sidebar.js`
- `src/directive/permission/permission.ts`、`src/utils/permissions.js`
- `src/router/filterRouter.ts`

## 六、状态与全局能力

### 28. 用什么状态管理？模块怎么拆？

**结论**：用 Pinia（`createPinia` + `pinia-plugin-persist`，见 `main.ts`）。模块拆分（`src/stores/`）：
- `userStore.js` — `userStore`：userInfo、org、loginOrgId、leadSourceOptions、followOptions、clueStatusOptions
- `sidebar.js` — `sidebar`：collapse、dataList，getter `menuList`/`btnPermission`
- `index.ts` — `store`（默认导出）：userInfo、routePermission、btnPermission（疑似旧版/备份，与 userStore 重复）
- `cluePanel.js` — 线索面板状态
- `type.ts` — 类型定义

关键文件路径：
- `src/stores/userStore.js`、`src/stores/sidebar.js`、`src/stores/index.ts`、`src/stores/cluePanel.js`
- `src/main.ts`（pinia 初始化）

### 29. 哪些状态会持久化？

**结论**：
- `userStore.org` → `localStorage` key=`org`（`pinia-plugin-persist`，仅持久化 `org` 字段）
- `AuthorizationInfo` → `localStorage`（手动 `localStorage.setItem`，`depart-manage.ts`）
- Token → Cookie `yilifeToken`（`js-cookie`，跨子域共享，domain 取主域名）
- `bypassAuth` → `localStorage`（调试用绕过鉴权）
- `initX`/`initY` → `localStorage`（iframe 嵌入坐标）
- `windowOpen` → `sessionStorage`（路由白名单标记）

关键文件路径：
- `src/stores/userStore.js`（persist strategies）、`src/request/http.ts`（Cookie 写入）、`src/request/api/depart-manage.ts`、`src/router/filterRouter.ts`

### 30. 全局方法 / 原型扩展有哪些？

**结论**：全局挂载较少，主要：
- `app.config.globalProperties.$defaultAvatar` = 默认头像（`main.ts`）
- 全局组件：`VTitle`（`src/components/Title/index.vue`）、所有 Element Plus 图标、所有 `custom-svg-icon` 下图标
- 全局指令：`v-permission`（`src/directive/`）
- 自动注入：`vue`/`vue-router` API（`unplugin-auto-import`，无需 import 即用 `ref/computed/useRoute` 等）
- 未发现 `$request`、埋点等全局原型扩展

关键文件路径：
- `src/main.ts`、`auto-imports.d.ts`、`components.d.ts`、`src/directive/directives.ts`

### 31. 有没有 JSBridge / App 内嵌 H5 相关逻辑？

**结论**：有较明显的「被嵌入 iframe」逻辑（非 App JSBridge，而是 PC 端 iframe 嵌套）：
- `src/views/Home.vue`：检测 `window.self !== window.top`（isInIframe），iframe 模式下隐藏 header/sidebar，监听 `message` 获取父页面传入的 `rect`（x/y 坐标）调整定位，并通过 `postMessage` 向 `window.parent` 发 `mouseenter`/`mouseleave`
- `src/components/iframe-page/iframe-page.vue`：本系统作为父，嵌入 work-phone 子系统，通过 `postMessage` 传 `userParams`(orgId/token/systemCode 等) + `userInfo`，监听子页面 `status:401` 跳登录
- `src/views/iframe/index.vue`：通用外部 URL iframe 嵌入，自动追加 `orgId`/`systemCode` 参数
- `main.ts` 顶层也监听 `message` 写 `initX/initY`
- URL 参数支持 `hideHeader`/`hideSidebar`/`noSpace`/`fullIframe`/`bypassAuth` 控制嵌入展示

关键文件路径：
- `src/views/Home.vue`、`src/components/iframe-page/iframe-page.vue`、`src/views/iframe/index.vue`、`src/main.ts`

## 七、后端 / 服务端（如适用）

### 32. API 风格、版本管理、接口契约在哪？

**结论**：REST 风格（POST 为主，少量 GET），无 GraphQL/RPC。接口契约（请求/响应 TS 类型）由 yapi-magic 从内部 yapi 平台（`yapi.yza.cn`）自动生成到 `src/apis/apiXXXX.ts`。版本管理通过 yapi 项目 id（`yapiMagic.config.ts` 关联 12 个 project）+ yapi 接口 id（文件名 `api<id>.ts`）。手写接口在 `src/request/api/*.ts`。路径前缀体现服务划分：`/crm-server/`、`/user-web-2/`、`/organization-admin/` 等。

关键文件路径：
- `yapiMagic.config.ts`、`src/apis/`、`src/request/api/`

### 33. 数据库类型、ORM / 查询层、迁移脚本怎么跑？

**结论**：**未从代码确认**。本项目为纯前端，无数据库/ORM/迁移脚本代码。后端服务（`/crm-server/`、`/user-web-2/` 等）实现细节不在本仓库。

### 34. 缓存、消息队列、定时任务分别用什么？在哪配置？

**结论**：**未从代码确认**。前端无缓存/MQ/定时任务相关代码（仅有浏览器 localStorage/sessionStorage/Cookie 作为本地缓存）。后端相关配置不在本仓库。

### 35. 微服务 / 单体？服务发现、网关、鉴权中心怎么走？

**结论**：从域名与接口路径推断后端为微服务架构：
- 网关：`gateway-*.yza.cn`（统一入口，前端所有请求经此）
- 鉴权中心/登录：`login-*.yza.cn`（独立登录中心，`callbackCurrentLoginUrl`）
- 用户中心：接口前缀 `/user-web-2/`（用户/部门/角色/资源）
- CRM 服务：`/crm-server/`（客户/线索/订单/跟进等核心业务）
- 组织管理：`/organization-admin/`（医院/科室）
- 其他独立子系统：work-phone（`work-phone-*.yza.cn`）、表单（`survey-form-*.yza.cn`）、移动端（`mobile-*.yza.cn`）、passport（`passport-*.yza.cn`）、home-service（`home-service-*.yza.cn`）

服务发现未从前端代码确认（前端只感知网关域名）。

关键文件路径：
- `src/utils/getCurrentUrl.ts`（各服务域名映射）、`src/utils/noLoginJump.js`（登录中心）

## 八、业务地图与危险区

### 36. 核心业务模块有哪些？各自大致负责什么？

**结论**：
- **客户管理**（`views/customer-manage`）：潜客管理、我的线索/线索池（含简版）、客户管理（我的客户/客户公海/按来源分）、用户画像、客户群组、订单列表、内容访客、客资录入、抖音客户
- **订单管理**（`views/order`）：订单列表 + 详情（院内护工/居家月嫂/居家护工/陪诊），含改总价、修改订单、派单、续约、联系管理员/护理员、回归接单池、转接单池
- **抢单**（`views/grabOrder`）：接单池
- **销售管理**（`views/sales-manage`）：跟进记录（含评论/跟进 tab）、目标管理（Excel 导入）、审批/工作汇报/任务/云盘（部分注释）
- **CRM 设置**（`views/system-manage`）：自定义标签、线索和线索池管理、业务设置、客户和公海管理、客资跟进、星级配置
- **工作手机/设备管理**（`views/device-manage`）：手机激活、微信绑定、风控设置、位置记录、license、敏感词、人脸核验、班次/考勤/巡检/围栏等
- **通话管理**（`views/call-manage`）：通话/短信/通讯录/工作记录/总览
- **敏感词记录**（`views/record-manage`）：通话/短信/微信敏感词、手机/微信敏感操作、财务敏感
- **营销中心**（`views/marketing-center`）：落地页、文章、音视频、文件夹、小程序、海报、短信模板/记录/群发、智能外呼、微表单、个人名片、短链
- **数据中心**（`views/data-center`）：客户分析（数量/标签/阶段/员工/行业/来源/区域/大屏）、线索分析（总量/漏斗/跟进/渠道转化）、营销分析
- **团队管理**（`views/admin-manage`）：公司组织、角色权限
- **数据大屏**（`views/dataEaseManage`）：嵌入 DataEase 大屏
- **工作手机 iframe**（`views/work-phone`）：嵌入 work-phone 子系统

关键文件路径：
- `src/router/menuRoutes.ts`、`src/views/`

### 37. 模块间关键链路？

**结论**：核心链路（从代码路由与组件引用推断）：
- **线索链路**：营销中心（落地页/文章/外呼/短信）→ 内容访客/客资录入 → 潜客管理（我的线索/线索池）→ 跟进记录 → 转客户 → 客户管理（我的客户/公海）
- **客户→订单链路**：客户管理 → 下单（`place-order-dialog`）→ 订单管理 → 订单详情（派单/改总价/修改订单/续约）→ 抢单池（grabOrder）
- **工作手机链路**：设备激活/微信绑定 → 通话/微信记录 → 敏感词/敏感操作记录 → 风控设置
- **数据链路**：各业务模块 → 数据中心分析（客户/线索/营销）→ 数据大屏
- **设置链路**：CRM 设置（标签/线索池/公海规则/星级）→ 影响客户管理与潜客管理的选项与规则

关键文件路径：
- `src/views/customer-manage/component/place-order-dialog/`、`src/views/order/detail/index.vue`
- `src/views/sales-manage/follow-record/`、`src/views/data-center/`

### 38. 代码里有没有明显的「危险区」迹象？

**结论**：有，主要集中在：
- **财务/支付**：`views/order/detail/` 改总价（`edit-price-btn`）、修改订单（`edit-combo-btn`）、支付渠道/状态枚举（`payChannelMap`/`payStatusMap` 含「现金支付」「公对公打款」「团购券支付」等）、`payTypeMap`（支付/退款）
- **敏感财务记录**：`views/record-manage/finance-sensitive/`（员工财务统计）、`wx-sensitive-operation` 含「收转账/发转账/收红包/发红包」
- **权限/审批**：`views/admin-manage/company-organization/role-action-drawer/`（角色资源配置）、`v-permission` 按钮权限、菜单权限
- **派单/接单池**：`views/order/detail/` 派单、回归接单池、转接单池（涉及订单归属变更）
- **风控**：`views/device-manage/wechat-control-setting/`（手机风控设置）、`phone-active/risk-control-dialog/`、敏感词设置
- **离职解绑**：`views/device-manage/we-chat-bind/` 离职流程解绑

关键文件路径：
- `src/views/order/detail/index.vue`、`src/views/order/detail/enum/index.js`
- `src/views/record-manage/finance-sensitive/index.vue`
- `src/views/admin-manage/company-organization/role-action-drawer/`
- `src/views/device-manage/wechat-control-setting/`、`src/views/device-manage/phone-active/risk-control-dialog/`

### 39. 关键枚举、状态机在代码里怎么定义？

**结论**：以 `Record<number/string, string>` 对象 map + `getMapToOptions` 转 options 为主，分散在各业务目录的 `enum/`、`constants.ts`、`constant.ts`、`config.js`：
- `src/common/constant.ts`：客户类型/来源/阶段/性别/规模/线索阶段/敏感词/微信类型/通话类型等
- `src/views/order/detail/enum/index.js`：订单类型（`orderTypeMap`：院内护工/居家月嫂/居家护工/陪诊）、订单状态（`orderStatusMap`：待支付→待派单→待服务→服务中→已完成/已取消）、来源（`leaderSourceMap`）、支付类型/渠道/状态
- `src/views/system-manage/customer-follow/constants.ts`、`src/views/dataEaseManage/constants.ts` 等业务内常量
- 状态机多为「map 查表 + 文本展示」，无显式状态机库（如 xstate）

关键文件路径：
- `src/common/constant.ts`、`src/views/order/detail/enum/index.js`、各 `constants.ts`/`config.js`

### 40. 有没有「改动时要小心」的区域 / 注释提示？

**结论**：
- `src/request/http.ts`：`// TODO 上线后删除`（`reqChannel` 头注释）、`//todo:mock`（response 拦截器直接 resolve，存在绕过错误处理风险）
- `src/request/config.js`：`DEFAULT_CODE = 100020`（systemCode 默认值，改动影响鉴权与菜单）
- `src/utils/env.ts`：`devEnv` 硬编码为 `"dev"`，本地切换后端环境改这里
- `src/router/filterRouter.ts`：权限校验多处 `next()` 直接放行（注释 `// next("/401")`），改权限逻辑要小心
- `src/request/api/depart-manage.ts`：`getUserLogin` 内置测试账号密码（明文 RSA 加密），`post3` 硬编码 `tenantId:34`/`reqChannel:"100002"`
- `src/common/jsencrypt.ts`：RSA 公钥硬编码
- `index.html`：高德地图 `securityJsCode` 明文
- `.npmrc`：私有仓库 `_auth` 明文（凭证泄露风险）
- `QA.md`：列出自测遗留问题（通话/微信敏感词搜索、聊天记录无数据等）

关键文件路径：
- `src/request/http.ts`、`src/request/config.js`、`src/utils/env.ts`、`src/router/filterRouter.ts`
- `src/request/api/depart-manage.ts`、`src/common/jsencrypt.ts`、`index.html`、`.npmrc`、`QA.md`

## 九、工程与协作（能从代码 / 配置看出的部分）

### 41. ESLint / Prettier / Husky / lint-staged 是否启用？提交前检查什么？

**结论**：
- ESLint：启用（`.eslintrc.js` + `.eslintignore` + `.eslintrc-auto-import.json`），命令 `npm run eslint`（`eslint --ext .js,.ts ./ --fix`）。`vite-plugin-eslint` 已在 `vite.config.ts` 注释掉（未在构建时强制）
- Prettier：启用（`.prettierrc` + `.prettierignore`），作为 VSCode 默认格式化器（`.prettierrc` 内含 `editor.defaultFormatter` 配置）
- Stylelint：启用（`.stylelintrc.js` + `.stylelintignore`）
- **Husky / lint-staged：未启用**（无 `.husky/` 目录、`package.json` 无 `husky`/`lint-staged`/`prepare` 字段、无 `.git/hooks` 自定义）
- 提交前检查：**未从代码确认有自动检查**（无 pre-commit hook 配置）

关键文件路径：
- `.eslintrc.js`、`.prettierrc`、`.stylelintrc.js`、`package.json`（无 husky/lint-staged）

### 42. 环境变量约定是什么？

**结论**：使用 Vite 环境变量，约定前缀 `VITE_`：
- `.env.dev/.env.test/.env.sit/.env.demo/.env.prod` 各定义：
  - `VITE_NODE_ENV`（dev/test/sit/demo/prod）
  - `VITE_BASE`（部署基路径，如 `/`、`/crm_web/`）
  - `VITE_BASE_URL`（定义但实际 baseURL 走 `getCurrentUrl()` 运行时计算，未直接使用）
- 运行时通过 `import.meta.env.MODE` 获取构建 mode（`src/utils/env.ts`）
- 注：`env.ts` 顶部 `devEnv` 硬编码 `"dev"` 决定本地调用的后端环境
- 无 `VUE_APP_*`（非 Vue CLI）也无 `VITE_APP_*` 前缀

关键文件路径：
- `.env.*`、`src/utils/env.ts`、`vite.config.ts`（`loadEnv`、`base: env.VITE_BASE`）

### 43. 文档现状？README 是否过时？还缺什么？

**结论**：文档现状较弱：
- `README.md`：极简（仅安装/启动/构建/lint 命令），无架构、业务、环境切换、域名、私有包说明，**已过时/不完整**（如未提 `local.yza.cn` hosts/证书、未提 yapi 生成、未提多环境切换细节）
- `QA.md`：自测遗留问题清单（通话/微信敏感词搜索、聊天记录无数据等），非正式文档
- `docs/`：仅有 `testcases/` 一个测试用例 CSV（`create-order-*.csv`），无架构/接口/业务文档
- `src/views/order/detail/components/dynamic-form/README.md`：动态表单局部说明
- `src/components/advanced-table-v2/READMD.md`：表格组件说明（文件名拼写错误 READMD）
- 缺：架构图、接口约定、环境/域名说明、部署文档、新人上手指南、模块负责人

关键文件路径：
- `README.md`、`QA.md`、`docs/`、`src/views/order/detail/components/dynamic-form/README.md`、`src/components/advanced-table-v2/READMD.md`

### 44. 已知技术债在代码里有哪些迹象？

**结论**：
- **TS/JS 混用**且大量 `// @ts-nocheck`（`apiXXXX.ts` 全量、多个 vue 文件）
- **两套表格组件并存**（`advanced-table` v1 与 `advanced-table-v2`）
- **两套布局并存**（`layout/index.vue` 与 `views/Home.vue`）
- **两套 store 并存**（`stores/index.ts` 的 `store` 与 `userStore.js` 功能重复）
- **两套权限获取逻辑**（`main.ts` 的 `getUserPermission` 与 `depart-manage.ts` 中注释掉的旧版）
- **moment 与 dayjs 并存**
- **Element Plus + ant-design-vue + vxe-table + @yza-fe/element-plus 多 UI 库并存**
- **`.bak` 备份文件**入库（`index.bak.vue`）
- **大量注释代码**未清理（`menuRoutes.ts` 多个路由、`http.ts` `todo:mock`）
- **硬编码**：测试账号密码、`tenantId:34`、`reqChannel:"100002"`、RSA 公钥、高德 securityJsCode、`.npmrc` _auth
- **`printWidth: 1000`**（Prettier 行宽过大，不利阅读）
- **`getUserLogin` 内置测试登录**（`depart-manage.ts`，`getDepartList` 失败时自动登录刷新）

关键文件路径：
- `src/apis/api807.ts`（`@ts-nocheck` 代表）、`src/components/advanced-table*`、`src/stores/index.ts`、`src/request/api/depart-manage.ts`、`.prettierrc`

### 45. 部署相关配置在哪？（CI/CD、Dockerfile、容器、K8s）

**结论**：**未从代码确认**。仓库内无 `Dockerfile`、无 `.github/`、无 `.gitlab-ci.yml`、无 `Jenkinsfile`、无 `k8s/`/`deploy/` 目录、无 `nginx.conf`。仅有构建产物 `dist/` 与 `vite.config.ts` 的 `base` 配置（支持 `/crm_web/` 子路径部署）。CI/CD 与容器化配置应在仓库外（运维侧）管理。

关键文件路径：
- `vite.config.ts`（`base: env.VITE_BASE`）、`.env.prod`（`VITE_BASE=/`）、`.env.test`（`VITE_BASE=/crm_web/`）

### 46. 监控、日志、埋点在代码里怎么接的？

**结论**：
- **日志**：大量 `console.log`/`console.error`（如 `main.ts`、`http.ts`、`permissions.js`、`sidebar` 等），生产构建 `vite.config.ts` 配置 `drop_console:true`/`drop_debugger:true` 移除。无统一日志库（无 sentry/loglevel 等）。
- **监控**：未从代码确认接入 APM/错误监控（无 Sentry/Datadog/阿里 ARMS 等 SDK 引用）。
- **埋点**：未从代码确认接入埋点系统（无神策/友盟/Google Analytics 等）。
- 仅 `index.html` 引入高德地图 SDK 与火山 TOS SDK（非监控）。

关键文件路径：
- `vite.config.ts`（`drop_console`）、`src/request/http.ts`、`src/utils/permissions.js`

## 十、上手行动清单（可落地步骤）

### 47. 新人第一天建议按什么顺序读哪些文件？

**结论**：建议顺序：
1. `README.md` — 安装/启动命令（虽简但先看）
2. `package.json` — 依赖与 scripts，了解技术栈
3. `.npmrc` + `.env.dev` + `src/utils/env.ts` + `src/utils/getCurrentUrl.ts` — 私有包安装、环境与域名映射
4. `vite.config.ts` — 本地 `local.yza.cn` + https 证书，配 hosts
5. `index.html` + `src/main.ts` — 入口与启动流程（`init`/`getUserPermission`）
6. `src/App.vue` + `src/views/Home.vue` — 根组件与布局（含 iframe 嵌入）
7. `src/router/index.ts` + `src/router/menuRoutes.ts` + `src/router/filterRouter.ts` — 路由与鉴权
8. `src/request/http.ts` + `src/request/request.ts` + `src/request/base.ts` + `src/request/token.ts` — 请求封装与 token
9. `src/stores/userStore.js` + `src/stores/sidebar.js` — 状态与权限
10. `src/utils/permissions.js` + `src/directive/permission/permission.ts` — 权限指令
11. `yapiMagic.config.ts` + `src/apis/api807.ts`（任一生成文件） — 接口生成机制
12. 对应业务模块 `src/views/<你负责的域>/index.vue`

关键文件路径：见上述各路径。

### 48. 改一个普通列表页，通常要动哪几层文件？

**结论**：以基于 `advanced-table-v2` 的列表页为例，通常动这几层：
1. **页面层**：`src/views/<业务域>/<功能>/index.vue`（模板用 `<advanced-table>` + `columns` + `searchConfig` + `refreshData`）
2. **接口层**：在 `src/apis/` 用 yapi 生成新接口（`npm run yapi` 或 `bin/yapi.sh`），或在 `src/request/api/<模块>.ts` 手写
3. **枚举/常量层**：`src/common/constant.ts` 或页面内 `enum/`/`constants.ts`/`config.js`
4. **局部组件层**：页面同级 `component/`（自定义列渲染、弹窗、抽屉）
5. **路由层**（若新页面）：`src/router/menuRoutes.ts` 或 `modules/*.js`
6. **状态层**（若跨页共享）：`src/stores/`

关键文件路径：
- `src/components/advanced-table-v2/index.vue`、`src/views/order/index.vue`（参考样板）

### 49. 加一个新页面 / 新分包页面的标准步骤？

**结论**（本项目无分包概念，为 SPA 单包）：
1. 在 `src/views/<业务域>/` 下新建目录与 `index.vue`（可参考同域已有页面）
2. 在 `src/router/menuRoutes.ts` 或 `src/router/modules/<域>.js` 添加路由项（`path`/`name`/`meta.title`/`component` 懒加载）
3. 若需菜单显示：后端在权限系统配置对应菜单资源（`api14379` 返回），前端 `sidebarStore.menuList` 自动渲染；若仅前端静态，可在 `menuRoutes` 的某 `children` 下挂
4. 若需按钮权限：后端配 `childrenButton.resourceCode`，前端用 `v-permission="'code'"` 或 `hasBtnPermission('code')`
5. 接口：yapi 生成或手写（见题 50）
6. 跑 `npm run dev` 验证，访问 `https://local.yza.cn/<path>`

关键文件路径：
- `src/router/menuRoutes.ts`、`src/router/modules/`、`src/views/`

### 50. 加一个新接口的标准步骤？（手写 / 生成）

**结论**：两种方式：
**A. 生成（推荐，规范）**：
1. 在 yapi 平台（`yapi.yza.cn`）确认接口所属 project id 与接口 id
2. 在 `src/apis/@api-id-using.js` 对应 project 的 `ids` 数组中追加接口 id（防止 yapi tag 丢失）
3. 单个接口：`bash bin/yapi.sh "<yapi 接口 URL>"`；或临时改 `yapiMagic.config.ts` 的 `customizeFilter` return true 全量生成
4. 运行 `npm run yapi`，生成 `src/apis/api<id>.ts`
5. 业务代码 `import apiXXXX from "@/apis/apiXXXX"` 直接调用

**B. 手写**：
1. 在 `src/request/api/<模块>.ts`（如 `customer-manage.ts`）添加方法，用 `src/request/base.ts` 的 `get/post/post2/postFile/importFile`
2. 指定 `url`（如 `/crm-server/xxx`）、`data`/`params`
3. 业务代码 import 该方法调用

关键文件路径：
- `yapiMagic.config.ts`、`src/apis/@api-id-using.js`、`bin/yapi.sh`、`src/request/base.ts`、`src/request/api/`

### 51. 我若只想熟悉「某模块」，从哪几个路径切入？

**结论**：通用切入路径（以「订单管理」为例）：
1. **路由**：`src/router/modules/order.js` + `src/router/menuRoutes.ts` 中对应段（找到 path 与组件）
2. **列表页**：`src/views/order/index.vue`（看 `columns`/`searchConfig`/`refreshData`/接口调用）
3. **详情页**：`src/views/order/detail/index.vue` + `detail/enum/index.js`（状态机/枚举）+ `detail/components/`（子组件）+ `detail/config/`
4. **接口**：`src/request/api/order-manage.ts`（手写）+ `src/apis/` 中被引用的 `apiXXXX.ts`（生成，按 import 反查）
5. **局部组件**：`src/views/order/component/`（如 `send-order.vue`/`edit-price-btn.vue`/`renewal.vue`）
6. **共享组件**：`src/components/` 中被引用的（如 `advanced-table-v2`、`customer-info-drawer`、`depart-personnel-tree`）
7. **状态**：`src/stores/` 中被引用的 store
8. **枚举/常量**：`src/common/constant.ts` + 模块内 `enum/`/`constants.ts`

其他模块同理：把 `order` 换成 `customer-manage`/`sales-manage`/`device-manage`/`marketing-center` 等。

关键文件路径：
- `src/router/modules/`、`src/views/<模块>/index.vue`、`src/views/<模块>/detail/`、`src/request/api/`、`src/apis/`、`src/common/constant.ts`

---

## 附：关键路径速查表

| 关注点 | 路径 |
| --- | --- |
| 入口 | `index.html` → `src/main.ts` → `src/App.vue` → `src/views/Home.vue` |
| 路由 | `src/router/index.ts`、`menuRoutes.ts`、`modules/`、`filterRouter.ts` |
| 请求 | `src/request/http.ts`、`request.ts`、`base.ts`、`token.ts`、`config.js`、`api/` |
| 生成接口 | `yapiMagic.config.ts`、`bin/yapi.sh`、`src/apis/`、`src/apis/@api-id-using.js` |
| 状态 | `src/stores/userStore.js`、`sidebar.js`、`index.ts` |
| 权限 | `src/directive/permission/`、`src/utils/permissions.js`、`src/router/filterRouter.ts` |
| 环境/域名 | `.env.*`、`src/utils/env.ts`、`src/utils/getCurrentUrl.ts` |
| 常量/枚举 | `src/common/constant.ts`、各 `enum/`/`constants.ts`/`config.js` |
| 公共组件 | `src/components/`（`advanced-table-v2`、`header`、`sidebar`、`iframe-page` 等） |
| iframe 嵌入 | `src/views/Home.vue`、`src/components/iframe-page/iframe-page.vue`、`src/views/iframe/index.vue` |
| 工程规范 | `.eslintrc.js`、`.prettierrc`、`.stylelintrc.js`、`tsconfig.json` |
| 私有包 | `.npmrc`（`@yza-fe` 走 volces 私有仓库） |
| 本地证书 | `cert/local.yza.cn.pem`、`cert/local.yza.cn-key.pem` |

> 调研说明：本答案基于对代码库的静态阅读生成，未运行项目、未调用接口。涉及后端实现、CI/CD、监控埋点等前端仓库不可见部分，均标注「未从代码确认」。

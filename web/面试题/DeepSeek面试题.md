# 目录

## 一、基础技术能力

### HTML/CSS

1. 语义化 HTML 标签有哪些？你在项目中是如何使用的？
2. CSS 选择器优先级如何计算？遇到过权重冲突的问题吗？如何解决？
3. 盒模型有哪两种？如何切换？在项目中遇到过哪些盒模型相关的问题？
4. 介绍 Flex 布局的主要属性和应用场景。你在小程序中如何处理不同屏幕适配？
5. CSS Grid 布局与 Flex 的区别？什么场景下你会选择 Grid？
6. 如何实现元素水平垂直居中？列举尽可能多的方法。
7. 移动端 1px 边框问题如何解决？你在 uni-app 中如何处理？
8. CSS 预处理器（Sass/Less）给你带来了哪些好处？你在项目中如何使用？
9. 如何实现响应式布局？你常用的媒体查询断点有哪些？
10. 解释 BFC 及其作用。如何创建 BFC？

### JavaScript/ES6+

1. 解释 ES6 中的 let、const 与 var 的区别。你在项目中如何选择？
2. 箭头函数与普通函数的区别？箭头函数的 this 指向如何？
3. 介绍 Promise、async/await 的使用和原理。你在项目中如何处理异步流程？
4. 如何实现深拷贝？遇到过循环引用问题吗？如何解决？
5. 介绍事件循环（Event Loop）机制。宏任务和微任务有哪些？
6. 如何实现数组去重？列举多种方法。
7. 闭包是什么？实际项目中哪些地方用到了闭包？
8. 原型链是什么？如何实现继承？ES6 class 的继承原理？
9. 防抖和节流的区别？你在项目中如何封装防抖节流指令？
10. 如何处理 JavaScript 浮点数精度问题？你在金融计算中用了什么方案？
11. 介绍 Map、Set 与普通对象的区别和应用场景。
12. 如何实现一个可拖拽的列表？需要考虑哪些性能点？

### TypeScript

1. TypeScript 相比 JavaScript 有哪些优势？你在项目中如何落地？
2. interface 和 type 的区别？什么时候用哪个？
3. 如何定义复杂的对象类型？联合类型、交叉类型的使用场景？
4. 什么是泛型？你在项目中哪些地方使用了泛型？
5. 介绍 TypeScript 中的装饰器。你在项目中用过吗？用于什么场景？
6. 如何配置 tsconfig.json？常用的配置项有哪些？
7. 如何为第三方库编写类型声明文件？
8. TypeScript 中的工具类型（Partial、Required、Pick、Omit 等）用过哪些？举例说明。
9. 如何利用 TypeScript 实现前端权限校验的类型安全？
10. 你在项目中如何结合 ESLint 和 TypeScript 进行代码质量管控？

## 二、Vue 生态

### Vue 核心

1. Vue 2 和 Vue 3 的主要区别是什么？你更倾向于哪个？为什么？
2. Vue 3 的 Composition API 与 Vue 2 的 Options API 对比，优缺点？
3. 响应式原理：Vue 2 的 Object.defineProperty 和 Vue 3 的 Proxy 区别？
4. Vue 3 中 ref 和 reactive 的区别？什么时候用哪个？
5. Vue 的生命周期有哪些？Vue 3 中生命周期有哪些变化？
6. 组件通信方式有哪些？列举并说明使用场景。
7. 什么是插槽（slot）？作用域插槽如何使用？
8. 动态组件和异步组件如何实现？你在项目中如何优化加载？
9. keep-alive 的原理和作用？如何配置包含/排除？
10. 如何实现自定义指令？你在项目中封装了哪些自定义指令？
11. Vue 中的 key 的作用？为什么不建议用 index 作为 key？
12. 什么是虚拟 DOM？Vue 的 diff 算法原理？
13. 如何实现组件之间的双向绑定？v-model 的原理？
14. 在 Vue 3 中如何替代 Vue 2 的过滤器（filter）？

### Vue Router

1. Vue Router 的两种模式（hash 和 history）区别？你在项目中如何配置？
2. 如何实现路由守卫？你在权限控制中如何应用？
3. 什么是动态路由？如何根据用户角色添加路由？
4. 路由懒加载如何实现？有什么好处？
5. 如何监听路由参数变化？有哪些方式？
6. 路由传参的几种方式及区别？
7. 如何解决路由重复点击报错的问题？

### 状态管理（Vuex/Pinia）

1. Vuex 和 Pinia 的区别？你为什么选择 Pinia？
2. Pinia 的核心概念有哪些？如何定义 store？
3. 如何在组件中使用 store 中的 state、getters、actions？
4. 如何实现持久化存储？你在项目中如何处理刷新后状态丢失？
5. 如何处理模块间的状态共享？在 Pinia 中如何组织多个 store？
6. 你在项目中如何设计 store 的结构？有遇到状态管理混乱的问题吗？如何解决？
7. 如何调试状态管理？用过 Vue Devtools 吗？

## 三、跨端与小程序

### uni-app

1. uni-app 的原理是什么？如何实现多端编译？
2. uni-app 的生命周期与 Vue 生命周期的关系？
3. 如何处理不同端的兼容性问题？举例说明。
4. 如何实现条件编译？你在项目中如何利用？
5. uni-app 中如何调用各端原生能力（如支付、定位）？
6. 你如何在小程序中使用 uni-app 的 API 与各平台原生 API 的差异？
7. uni-app 分包加载如何配置？为什么需要分包？
8. 如何优化 uni-app 项目的启动速度？
9. uni-app 中的路由与 Vue Router 有何不同？
10. 你在 uni-app 中如何使用自定义组件库？如何二次封装？

### 微信/支付宝小程序

1. 微信小程序和支付宝小程序的主要差异？你在开发中如何适配？
2. 小程序登录流程是怎样的？如何实现无感登录？
3. 小程序支付流程？如何处理支付结果回调？
4. 小程序地图定位组件使用中遇到过哪些坑？如何解决？
5. 小程序的授权管理（用户信息、位置等）如何处理？
6. 如何实现小程序的自定义分享？
7. 小程序分包加载的策略？如何配置主包和分包？
8. 小程序的性能优化有哪些手段？（包体积、首屏、渲染等）
9. 如何在小程序中使用 WebSocket？你在项目中用到了吗？
10. 小程序发布上线的流程？如何应对审核被拒？

## 四、工程化与构建

### Webpack/Vite

1. Webpack 和 Vite 的区别？你为什么选择 Vite？
2. Vite 的原理是什么？它是如何实现快速启动的？
3. 如何配置多环境变量？你在项目中如何管理？
4. 如何配置路径别名？有什么好处？
5. 如何配置代码分割（splitChunks）？你在项目中如何优化？
6. 如何配置 loader 和 plugin？举例说明。
7. 如何优化 Webpack 构建速度？
8. 如何实现热更新（HMR）？原理是什么？
9. 你在项目中如何配置 ESLint、Prettier、Stylelint？
10. 如何搭建一个从零开始的前端项目？你会考虑哪些因素？

### 组件库与二次封装

1. 你如何设计和封装一个通用业务组件？需要考虑哪些方面？
2. 你在项目中二次封装了哪些 Element-UI 组件？举例说明封装逻辑。
3. 如何设计组件库的 API？如何保证易用性和扩展性？
4. 如何实现组件的按需加载？
5. 你如何发布一个 npm 包？流程是怎样的？需要注意什么？
6. 你在项目中开发的 npm 工具包包含哪些功能？如何保证通用性？
7. 如何处理组件库的样式冲突？CSS 模块化方案？

### Git 与协作

1. Git 常用命令？如何解决冲突？
2. 你们团队的 Git 分支管理策略是怎样的？（Git Flow / GitHub Flow）
3. 如何编写规范的 commit message？用过哪些工具？
4. 如何进行代码审查（Code Review）？你关注哪些点？
5. 如何管理多人协作时的代码合并冲突？

## 五、性能优化

1. 你如何衡量前端性能？常用哪些指标？（FCP、LCP、TTI 等）
2. 首屏加载优化你做了哪些具体工作？效果如何？
3. 图片懒加载的实现原理？你在项目中如何实现？
4. 什么是 CDN 加速？如何配置？你项目中哪些资源用了 CDN？
5. 如何减少接口请求次数？你实现了哪些缓存策略？
6. 防抖和节流在性能优化中的应用场景？举例说明。
7. WebSocket 相比轮询的优势？你在项目中如何用 WebSocket 替代轮询？
8. 虚拟列表的原理？你在什么场景下使用了虚拟列表？
9. 如何优化长列表渲染？你用过哪些方案？
10. 小程序包体积优化你做了哪些？如何检查包体积？
11. 如何分析和定位性能瓶颈？用过哪些工具？（Lighthouse、Chrome DevTools 等）
12. 你在项目中如何实现前端级权限管控？动态路由加载的过程？

## 六、项目经验深度追问

### 项目一：千源百荟再生资源回收全链路前端体系（官网+ToC小程序）

1. 请介绍一下这个项目的整体架构和技术选型，为什么选择 Vue3 + Vite？
2. 你是如何从零搭建项目脚手架的？做了哪些工程化配置？
3. 你封装的 `qd-*` 通用业务组件库包含哪些组件？如何设计才能让多项目复用？
4. 小程序中地图定位导航功能是如何实现的？遇到过哪些问题？
5. 微信支付集成过程中遇到过什么坑？如何处理支付失败后的状态回退？
6. 你是如何设计订单状态管理？如何处理订单超时等场景？
7. 小程序分包如何配置？主包和分包分别包含哪些模块？
8. 如何实现用户授权登录的流程？token 过期如何刷新？
9. 这个项目中遇到的最大挑战是什么？你是如何解决的？
10. 如何保证多机型、多版本小程序的兼容性？你做了哪些测试？
11. 项目的上线流程是怎样的？如何监控线上问题？

### 项目二：铅蛋回收多端小程序（微信+支付宝）

1. 同时开发微信和支付宝小程序，你如何管理两端差异？代码复用率如何？
2. 支付宝小程序从 0 到 1 的架构搭建中，你重点考虑了哪些方面？
3. 如何实现多角色（门店、运力、回收公司、消费者）的权限和功能隔离？
4. 电池租赁、上门换新等核心业务流程中，如何处理复杂的业务状态？
5. 你如何设计数据请求层，以应对多端接口差异？
6. 虚拟列表在哪个模块使用？具体如何实现？带来了多少性能提升？
7. 长列表卡顿问题你是如何分析和优化的？
8. 你如何处理支付宝和微信的支付差异？代码如何复用？
9. 线上出现过定位授权异常的问题吗？你是如何定位和修复的？
10. 你在项目中如何做错误监控和日志上报？

### 项目三：铅蛋回收 SaaS 管理后台体系

1. 双后台（客户后台 + 总管理后台）如何共享代码？如何保持差异？
2. 你的前端权限管控体系如何设计？从路由到按钮级，具体实现？
3. 自定义指令 `v-has` 如何实现按钮级权限控制？
4. 你如何封装 Axios 实现统一异常处理、重试、loading 管理？代码结构是怎样的？
5. 如何用 `Big.js` 解决精度问题？在哪些模块用到？
6. 全国地区数据缓存是如何实现的？如何保证数据更新？
7. WebSocket 实现大数据导出实时状态同步的细节？解决了什么问题？
8. 如何实现数据导出 Excel/PDF？前端还是后端生成？
9. 你如何优化后台系统的首屏加载速度？
10. 如何设计操作日志记录？记录哪些信息？

## 七、工作经历与团队协作

1. 你在公司负责 6 个核心项目的开发维护，如何并行管理多个项目？如何保证代码同步？
2. 你提到将研发效率提升 30%，具体是通过哪些措施实现的？如何量化？
3. 你如何推动前端技术规范落地？遇到过阻力吗？如何解决？
4. 你在团队中扮演什么角色？如何与其他成员（后端、产品、UI）协作？
5. 如何做需求评审？遇到不合理需求如何处理？
6. 你如何保证代码质量？单元测试、E2E 测试有涉及吗？
7. 你在项目中遇到过最棘手的线上问题是什么？如何排查和修复的？
8. 如何做技术选型？你会在团队中引入新技术吗？怎么说服团队？

## 八、行为面试与软技能

1. 为什么选择前端开发？你未来的职业规划是什么？
2. 你最近在学习什么新技术？如何学习的？
3. 你如何应对项目工期紧、压力大的情况？
4. 当与产品经理意见不合时，你会怎么处理？
5. 描述一次你主动推动技术改进或流程优化的经历。
6. 你如何处理工作中犯的错误？
7. 你如何看待加班？
8. 你对我们公司（或行业）有什么了解？为什么想来这里？
9. 你期望的工作环境是什么样的？
10. 除了技术，你还有什么兴趣爱好？（结合个人爱好提问）
11. 你提到喜欢摄影，能否分享一次你负责的团建拍摄经历？如何组织？

## 九、开放性问题与场景设计

1. 如果让你设计一个前端监控系统，你会考虑哪些方面？如何实现？
2. 如何设计一个支持多主题切换的前端架构？
3. 如何实现前端微服务？你了解哪些方案？
4. 如何保证前端项目的可测试性？
5. 如何设计一个大型表单的架构，保证性能和可维护性？
6. 你如何看待前端未来的发展趋势？
7. 如果让你从零组建一个前端团队，你会怎么做？
8. 给你一个现有项目，如何进行技术重构？考虑哪些风险？

# 解答

# 一、HTML/CSS 详细解答

------

## 1. 语义化 HTML 标签有哪些？你在项目中是如何使用的？

**语义化标签**是指具有明确含义的 HTML 标签，能够清晰地描述其内容和在文档结构中的作用。常见的语义化标签包括：

- **结构类**：`<header>`（页眉）、`<nav>`（导航）、`<main>`（主体）、`<article>`（独立文章）、`<section>`（区域）、`<aside>`（侧边栏）、`<footer>`（页脚）
- **内容类**：`<h1>`~`<h6>`（标题）、`<p>`（段落）、`<ul>`/`<ol>`（列表）、`<figure>`/`<figcaption>`（插图及说明）、`<time>`（时间）、`<mark>`（高亮）、`<strong>`（强调）、`<em>`（斜体强调）等

**项目中使用**：

- 在**企业官网**（如“千源百荟再生资源回收官网”）中，我大量使用了语义化标签来提升 SEO 和可访问性。例如：
  - 用 `<header>` 包裹顶部导航栏和 Logo，内部嵌套 `<nav>` 实现导航菜单。
  - 每个业务模块（如服务介绍、新闻资讯）使用 `<section>` 包裹，并配上 `<h2>` 标题。
  - 核心文章或案例使用 `<article>` 标签，便于搜索引擎抓取。
  - 页脚信息放在 `<footer>` 中，包含版权、联系方式等。
- 在 **SaaS 管理后台**中，虽然面向内部人员，但我仍坚持语义化，比如使用 `<aside>` 表示侧边菜单，`<main>` 表示主要内容区域，这样有助于团队协作和代码可读性。
- 对于**小程序**，虽然 WXML 中没有完全对应的语义标签，但我会尽量用 view 模拟结构，并配合 ARIA 属性提升无障碍体验。

**好处**：SEO 友好、代码可读性高、便于屏幕阅读器等辅助技术解析、有利于团队维护。

------

## 2. CSS 选择器优先级如何计算？遇到过权重冲突的问题吗？如何解决？

**CSS 优先级**（权重）是一个决定哪条规则最终生效的计算机制。计算规则如下（从高到低）：

1. **!important**：直接覆盖任何内联或普通样式（但应谨慎使用）。
2. **内联样式**（style 属性）：权重为 1000。
3. **ID 选择器**：权重为 0100。
4. **类、伪类、属性选择器**：权重为 0010。
5. **元素、伪元素选择器**：权重为 0001。
6. **通配符（\*）、组合器（+ > ~ 等）**：权重为 0000，不影响优先级。

**权重比较**：将四组数字按位比较（千位→百位→十位→个位），数值大的规则生效。若相等，则后定义的覆盖先定义的。

**遇到的问题及解决**：

- **冲突场景**：在“铅蛋回收 SaaS 管理后台”中，一个表格按钮的样式被多处定义。基础组件库（Element-UI）给按钮定义了 `.el-button--primary`，而业务需求需要定制颜色，我通过自定义类名 `.custom-primary` 覆盖。但由于权重相同（都是类选择器），且组件库样式加载在后，导致覆盖失效。
- **解决方案**：
  1. **提高权重**：使用更具体的选择器，如嵌套父级类名 `.parent .custom-primary`。
  2. **调整加载顺序**：确保自定义样式在组件库之后引入（但 Webpack 打包顺序可能不可控）。
  3. **使用 !important**（最后手段）：但容易引发维护问题，我尽量避免。
  4. **深入理解层叠**：在无法改变顺序时，通过提升权重解决，例如 `.el-button.el-button--primary.custom-primary`。
- **预防**：制定 CSS 规范，避免滥用 ID 和 !important；采用 BEM 命名减少冲突；利用 SCSS 嵌套合理控制权重。

------

## 3. 盒模型有哪两种？如何切换？在项目中遇到过哪些盒模型相关的问题？

**两种盒模型**：

1. **标准盒模型（W3C 盒模型）**：`box-sizing: content-box`（默认）
   - `width` = 内容宽度（content），不包含 padding 和 border。
   - 元素实际占据宽度 = `width + padding + border`。
2. **IE 盒模型（怪异盒模型）**：`box-sizing: border-box`
   - `width` = 内容宽度 + padding + border。
   - 元素实际占据宽度 = `width`（设定值）。

**切换**：通过 CSS 属性 `box-sizing` 切换。常用全局重置：

```css
* {
  box-sizing: border-box;
}
```

**项目中遇到的问题**：

- **问题一：布局溢出**
  在“铅蛋回收小程序”中，一个定宽为 100% 的输入框，添加了 padding 后实际宽度超过父容器，导致换行或横向滚动。排查发现是标准盒模型所致。解决方案：全局应用 `border-box`，使宽度包含 padding 和 border，避免溢出。
- **问题二：百分比宽度计算混乱**
  在“管理后台”的表格列宽设置中，某些列使用了百分比，并内边距不一致，导致表格总宽度超出容器。统一设置 `box-sizing: border-box` 后，百分比宽度基于包含 padding 的总宽度计算，布局稳定。
- **问题三：与第三方组件库样式冲突**
  某些组件库（如 Element-UI）内部可能未统一盒模型，导致自定义样式覆盖时出现偏差。我通常会在组件外层包裹一个类，强制设置 `box-sizing: border-box` 并配合继承机制修复。

**最佳实践**：项目初期就在全局重置盒模型，避免后期踩坑。

------

## 4. 介绍 Flex 布局的主要属性和应用场景。你在小程序中如何处理不同屏幕适配？

**Flex 布局（弹性盒）** 是一维布局模型，主要属性分为容器属性和项目属性。

**容器属性**：

- `display: flex` 或 `inline-flex`：定义 flex 容器。
- `flex-direction`：主轴方向（row | column | row-reverse | column-reverse）。
- `flex-wrap`：是否换行（nowrap | wrap | wrap-reverse）。
- `flex-flow`：前两个属性的简写。
- `justify-content`：主轴对齐方式（flex-start | flex-end | center | space-between | space-around | space-evenly）。
- `align-items`：交叉轴对齐方式（stretch | flex-start | flex-end | center | baseline）。
- `align-content`：多根轴线对齐（当有多行时）。

**项目属性**：

- `order`：排列顺序。
- `flex-grow`：放大比例。
- `flex-shrink`：缩小比例。
- `flex-basis`：分配多余空间前的初始大小。
- `flex`：`flex-grow`, `flex-shrink`, `flex-basis` 的简写。
- `align-self`：覆盖容器的 `align-items`。

**应用场景**：

- 导航栏、列表项均匀分布。
- 垂直居中（常用 `align-items: center` + `justify-content: center`）。
- 圣杯布局/双飞翼布局。
- 表单排列、卡片布局、移动端底部导航等。

**小程序屏幕适配处理**：

在 uni-app 开发的小程序中，我采用以下方案：

1. **使用 rpx 单位**：
   uni-app 默认支持 rpx（响应式像素），它可以根据屏幕宽度自适应。设计稿通常以 750px 宽度为准，直接写 px 会被编译为 rpx（1px = 1rpx）。例如宽度 750rpx 占满全屏。
2. **结合 Flex 实现弹性布局**：
   例如列表项使用 `flex:1` 自动平分剩余空间，避免硬编码宽度。搭配 `flex-wrap: wrap` 实现多列自适应。
3. **媒体查询 + 动态类名**：
   对于特殊适配需求，通过 `uni.getSystemInfoSync()` 获取屏幕宽度，动态绑定类名。例如在 iPad 上调整左右边距。
4. **针对异形屏（刘海、挖孔）**：
   使用小程序提供的安全区域 API（如 `wx.getMenuButtonBoundingClientRect`）获取胶囊位置，动态设置顶部栏高度，避免内容被遮挡。
5. **组件库适配**：
   二次封装的 uView 组件已内置 rpx 适配，我只需按照设计稿使用 rpx 值覆盖样式即可。

**案例**：在“千源百荟 ToC 小程序”首页，采用 Flex 实现分类导航图标等分，容器设置 `display: flex; flex-wrap: wrap;`，每个 item 设置 `width: 20%;` 配合 `box-sizing: border-box`，保证不同屏幕下始终一行 5 个。

------

## 5. CSS Grid 布局与 Flex 的区别？什么场景下你会选择 Grid？

**区别**：

| 维度     | Flex 布局                      | Grid 布局                              |
| :------- | :----------------------------- | :------------------------------------- |
| 维度     | 一维布局（主要处理行或列）     | 二维布局（同时处理行和列）             |
| 工作方式 | 基于内容分配空间（从内容出发） | 基于网格定义放置内容（从布局出发）     |
| 对齐方式 | 通过主轴和交叉轴控制           | 通过行轴和列轴控制，更精细             |
| 适用场景 | 组件内部分布、导航、列表等     | 页面整体布局、复杂网格结构、不对称网格 |
| 子项控制 | 子项可通过 `flex` 属性调整弹性 | 子项可放置在任意网格单元格，甚至重叠   |

**选择 Grid 的场景**：

- **复杂页面整体布局**：如管理后台的“总览仪表盘”，需要划分头部、侧边栏、主内容、右侧面板等，且区域大小和位置固定，用 Grid 可以清晰地定义网格模板。
- **卡片式瀑布流**：当需要同时控制行高和列宽，且卡片大小不一但需对齐时，Grid 的 `grid-auto-rows` 和 `grid-template-columns` 非常方便。
- **不对称布局**：例如某个区域跨多行多列，使用 `grid-column` 和 `grid-row` 轻松实现。
- **需要内容与网格线对齐**：如日历、图表看板，每个单元格位置精确。

**项目实例**：

- 在“铅蛋回收 SaaS 管理后台”的**数据统计页面**，我使用 Grid 构建了多指标卡片布局：

  ```css
  .dashboard {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
  }
  .card-large {
    grid-column: span 2;  /* 大卡片占两列 */
  }
  ```

- 官网的“合作伙伴展示”区域，用 Grid 实现每行固定列数且高度一致的相册风格。

**总结**：Flex 适合一维分布，Grid 适合二维整体布局。两者可以结合使用：外层用 Grid 划分区域，内部再用 Flex 处理细节排列。

------

## 6. 如何实现元素水平垂直居中？列举尽可能多的方法。

**水平垂直居中**的方法有很多，取决于布局环境和元素类型。以下列举常用且兼容性好的方法：

### 1. Flex 布局（现代首选）

```css
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
}
```

- 优点：简单，内容宽高未知也适用。
- 缺点：需要考虑浏览器兼容（基本都支持）。

### 2. Grid 布局

```css
.parent {
  display: grid;
  place-items: center;  /* 同时设置 align-items 和 justify-items */
}
```

或：

```css
.parent {
  display: grid;
}
.child {
  justify-self: center;
  align-self: center;
}
```

### 3. 绝对定位 + transform

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```

- 优点：兼容性好，不依赖父元素宽高。
- 缺点：绝对定位脱离文档流，可能影响布局。

### 4. 绝对定位 + margin:auto（需要固定宽高）

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 100px;  /* 必须设置宽高 */
  height: 100px;
}
```

- 适用于固定尺寸的元素。

### 5. line-height + text-align（行内/行内块元素）

```css
.parent {
  text-align: center;
  line-height: 300px;  /* 父元素高度 */
}
.child {
  display: inline-block;
  vertical-align: middle;
  line-height: normal; /* 重置子元素行高 */
}
```

- 适用于单行文本或行内元素。

### 6. table-cell

```css
.parent {
  display: table-cell;
  text-align: center;
  vertical-align: middle;
}
.child {
  display: inline-block;
}
```

- 模拟表格单元格的特性。

### 7. 使用 flex + margin: auto

```css
.parent {
  display: flex;
}
.child {
  margin: auto;
}
```

- 只需在子元素上设置 `margin: auto`，四个方向自动均分剩余空间。

### 8. CSS 变量 + calc（需已知宽高）

```css
.parent {
  position: relative;
}
.child {
  position: absolute;
  width: 200px;
  height: 100px;
  left: calc(50% - 100px);
  top: calc(50% - 50px);
}
```

**项目中常用**：

- 通用弹窗、Loading 居中：使用 Flex 或 Grid。
- 图标在按钮内居中：Flex。
- 老项目兼容 IE：使用绝对定位 + transform 或 table-cell。

------

## 7. 移动端 1px 边框问题如何解决？你在 uni-app 中如何处理？

**问题背景**：移动端屏幕分辨率高，CSS 的 1px 在物理像素上可能显示为 2px 或 3px（取决于设备像素比 dpr），导致边框看起来较粗，影响视觉精细度。

**解决方案**：

### 1. 伪元素 + transform 缩放（最常用）

```css
.border-1px {
  position: relative;
}
.border-1px::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: #ccc;
  transform: scaleY(0.5); /* dpr=2 时缩放 0.5，dpr=3 时缩放 0.33 */
  transform-origin: 0 0;
}
```

- 可根据设备 dpr 动态调整 scale 值。

### 2. 使用 0.5px 写法（部分设备支持）

```css
.border {
  border-bottom: 0.5px solid #ccc;
}
```

- 但兼容性较差（iOS 8+ 支持，Android 部分不支持）。

### 3. viewport 缩放（全局影响大）

```html
<meta name="viewport" content="width=device-width, initial-scale=0.5, maximum-scale=0.5, user-scalable=no">
```

- 不推荐，影响所有尺寸，导致布局错乱。

### 4. 使用 box-shadow 模拟

```css
.border {
  box-shadow: 0 -1px 0 0 #ccc, 0 1px 0 0 #ccc; /* 上下边框 */
}
```

- 但无法实现圆角边框，且是阴影，不是真正边框。

### 5. 使用背景渐变

```css
.border {
  background-image: linear-gradient(0deg, #ccc 50%, transparent 50%);
  background-size: 100% 1px;
  background-repeat: no-repeat;
  background-position: bottom;
}
```

- 可实现类似边框效果，但控制复杂。

**在 uni-app 中的处理**：

我在 uni-app 项目中封装了一个 **mixin 或全局类**来处理 1px 边框：

1. **通过 CSS 变量和媒体查询适配 dpr**：

   ```scss
   @mixin hairline($direction: bottom, $color: #ccc) {
     position: relative;
     &::after {
       content: '';
       position: absolute;
       #{$direction}: 0;
       left: 0;
       width: 100%;
       height: 1px;
       background-color: $color;
       transform-origin: 0 0;
       
       @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
         transform: scaleY(0.5);
       }
       @media (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {
         transform: scaleY(0.33);
       }
     }
   }
   ```

   使用：`@include hairline(bottom, #ddd);`

2. **预定义实用类**：

   ```css
   .hairline--bottom {
     position: relative;
   }
   .hairline--bottom::after {
     /* 同上 */
   }
   ```

3. **对于多边框（如全边框）**，使用 `::after` 宽高 200%，scale 0.5，并设置 border 来实现：

   ```css
   .hairline--all {
     position: relative;
   }
   .hairline--all::after {
     content: '';
     position: absolute;
     top: 0;
     left: 0;
     width: 200%;
     height: 200%;
     border: 1px solid #ccc;
     transform-origin: 0 0;
     transform: scale(0.5);
     box-sizing: border-box;
     pointer-events: none;
   }
   ```

**项目实践**：在“铅蛋回收小程序”的订单列表项中，所有分割线均采用上述 mixin 生成，保证了在不同手机上的视觉效果一致。

------

## 8. CSS 预处理器（Sass/Less）给你带来了哪些好处？你在项目中如何使用？

**Sass（SCSS）** 是我在项目中主要使用的预处理器。它带来的好处：

1. **变量**：统一管理主题色、间距、字体等，方便全局修改。

   ```scss
   $primary-color: #1890ff;
   $spacing-base: 8px;
   ```

2. **嵌套**：减少重复选择器，结构清晰，体现层级关系。

   ```scss
   .card {
     padding: $spacing-base;
     &__title {
       font-size: 16px;
     }
     &__content {
       margin-top: $spacing-base;
     }
   }
   ```

3. **混合（mixin）**：封装复用样式，如清除浮动、文本溢出省略、1px 边框等。

   ```scss
   @mixin ellipsis {
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
   }
   ```

4. **函数**：进行颜色计算、单位转换等。

   ```scss
   @function rem($px) {
     @return $px / 16px * 1rem;
   }
   ```

5. **继承（@extend）**：减少代码重复，但需谨慎使用（可能生成额外选择器）。

   ```scss
   .btn {
     padding: 8px 16px;
     border-radius: 4px;
   }
   .btn-primary {
     @extend .btn;
     background: $primary-color;
   }
   ```

6. **模块化**：通过 `@import` 或 `@use` 分割文件，便于维护。

**在项目中的使用**：

- **全局样式管理**：在“千源百荟官网”和“SaaS 后台”中，我建立了 `_variables.scss`、`_mixins.scss`、`_reset.scss` 等基础文件，然后在主样式表中引入。

- **主题定制**：在“铅蛋回收小程序”中，通过变量覆盖 Element-UI 或 uView 的主题色，实现品牌统一。

- **组件库二次封装**：编写组件的样式时，使用 BEM 命名 + 嵌套，确保样式隔离。

- **响应式适配**：用 mixin 封装媒体查询断点：

  ```scss
  @mixin respond-to($breakpoint) {
    @if $breakpoint == mobile {
      @media (max-width: 767px) { @content; }
    } @else if $breakpoint == tablet {
      @media (min-width: 768px) and (max-width: 1024px) { @content; }
    }
  }
  ```

**团队协作**：统一使用 SCSS 语法，配合 Stylelint 规范，确保代码风格一致。

------

## 9. 如何实现响应式布局？你常用的媒体查询断点有哪些？

**响应式布局**的实现主要依靠：

1. **流式布局（百分比/弹性布局）**：使用百分比、flex、grid 等相对单位，让容器随屏幕自适应。
2. **媒体查询**：根据屏幕宽度、设备特性应用不同样式。
3. **视口单位（vw/vh）**：用于字体大小、边距等，实现等比缩放。
4. **图片/视频自适应**：`max-width: 100%`，配合 `srcset` 或 `picture` 元素。
5. **rem/em 单位**：结合根元素字体大小调整（可通过 JS 动态设置）。
6. **移动优先设计**：先写移动端样式，再用媒体查询增强。

**常用的媒体查询断点**（以移动优先为例）：

```scss
/* 超小屏手机 ( portrait 竖屏 )，默认 0-575px */
/* 小屏手机 ( landscape 横屏 ) 和 大屏手机 */
@media (min-width: 576px) { ... }
/* 平板竖屏 */
@media (min-width: 768px) { ... }
/* 平板横屏 / 小桌面 */
@media (min-width: 992px) { ... }
/* 桌面显示器 */
@media (min-width: 1200px) { ... }
/* 大桌面 */
@media (min-width: 1400px) { ... }
```

也可以根据具体项目需求定制，例如：

- **手机**：< 768px
- **平板**：768px - 1024px
- **桌面**：≥ 1025px

**项目实践**：

- **官网**：采用桌面优先，因为官网主要面向 PC 访客，但也要兼容手机。断点设置：

  ```scss
  @media (max-width: 1024px) { ... }  /* 平板及以下 */
  @media (max-width: 768px) { ... }   /* 手机 */
  ```

- **SaaS 后台**：由于后台通常在 PC 上使用，但需兼容小屏笔记本，所以使用 `min-width` 从 1366px 开始，低于此宽度时侧边栏折叠为图标栏。

- **小程序**：虽然小程序主要在手机端，但 iPad 等大屏设备也需适配。我通过 `uni.getSystemInfo` 获取屏幕宽度，动态设置不同样式（如最大宽度限制，左右留白）。

**其他技巧**：使用 `clamp()` 函数让字体大小在范围内平滑变化：

css

```scss
font-size: clamp(14px, 4vw, 20px);
```

------

## 10. 解释 BFC 及其作用。如何创建 BFC？

**BFC（Block Formatting Context，块级格式化上下文）** 是 CSS 视觉渲染的一部分，它决定了块级盒子的布局及浮动元素的影响范围。可以理解为一个独立的渲染区域，内部元素布局与外部互不影响。

**BFC 的作用**：

1. **清除浮动**：防止父元素高度塌陷（当子元素浮动时，父元素若触发 BFC，则会包裹浮动元素）。
2. **避免外边距折叠**：相邻块级元素的垂直外边距会合并，但若它们处于不同 BFC 中，则不会折叠。
3. **实现自适应两列布局**：左侧固定宽浮动，右侧触发 BFC，右侧不会环绕左侧，而是占据剩余宽度。
4. **阻止元素被浮动覆盖**：BFC 区域不会与浮动元素重叠。

**如何创建 BFC**：

- **根元素**（`<html>`）本身就是 BFC。
- **浮动**（`float` 不为 none）。
- **绝对定位**（`position` 为 absolute 或 fixed）。
- **块级容器**（`overflow` 不为 visible 的块元素）。
- **行内块元素**（`display: inline-block`）。
- **弹性/网格容器**（`display: flex`、`grid`、`inline-flex`、`inline-grid`）。
- **表格单元格**（`display: table-cell`）等。

**项目中的应用**：

- **清除浮动**：在早期项目中，常用 `overflow: hidden` 触发父元素 BFC 来包裹浮动子元素，防止父元素高度塌陷。

  css

  ```css
  .clearfix {
    overflow: hidden; /* 触发 BFC */
  }
  ```

  

  但现在更常用 `clearfix` 伪元素法，但 BFC 仍是一种简单有效的方案。

- **自适应两栏布局**：在“铅蛋回收管理后台”的详情页，左侧是固定宽度的菜单，右侧是内容区。左侧浮动，右侧设置 `overflow: hidden` 触发 BFC，使右侧自动填满剩余空间，且不会环绕左侧。

  css

  ```css
  .sidebar {
    float: left;
    width: 200px;
  }
  .main {
    overflow: hidden;  /* 触发 BFC */
  }
  ```

  

- **避免外边距折叠**：当一个容器内有两个块级元素，它们的上下 margin 会合并。若给其中一个包裹一个父元素并触发 BFC，则可避免折叠。

- **隔离浮动影响**：有时一个浮动元素影响了后续元素，可通过给后续元素触发 BFC 来解决。

**注意**：`overflow: hidden` 可能会隐藏溢出的内容，需根据场景选择合适的 BFC 触发方式，如 `display: flow-root` 是专门为创建 BFC 而生的无副作用属性（但兼容性稍低）。现代布局多用 Flex/Grid，它们自身就是 BFC，能自然解决这些问题。

# 二、JavaScript/ES6+ 详细解答

------

## 1. 解释 ES6 中的 let、const 与 var 的区别。你在项目中如何选择？

**区别**：

| 特性     | `var`                                   | `let`                        | `const`                        |
| :------- | :-------------------------------------- | :--------------------------- | :----------------------------- |
| 作用域   | 函数作用域                              | 块级作用域（`{}`内）         | 块级作用域                     |
| 变量提升 | 存在提升，可提前访问（值为`undefined`） | 存在暂存死区，声明前访问报错 | 同`let`，存在暂存死区          |
| 重复声明 | 允许重复声明                            | 同一作用域内不允许重复声明   | 同一作用域内不允许重复声明     |
| 初始值   | 可不初始化（默认`undefined`）           | 可不初始化                   | **必须**初始化                 |
| 重新赋值 | 允许                                    | 允许                         | **不允许**（但对象属性可修改） |

**暂存死区**（Temporal Dead Zone, TDZ）：从块开始到变量声明语句之间的区域，在此期间访问变量会报错。

**项目中如何选择**：

- **默认使用 `const`**：对于不需要重新赋值的变量，一律用 `const`。这能避免意外修改，使代码意图更清晰。例如：引入的模块、配置对象、函数表达式、DOM 元素引用等。
- **需要重新赋值时用 `let`**：如循环计数器、累加器、需要变化的标志位等。
- **避免使用 `var`**：在项目中通过 ESLint 规则禁止使用 `var`，强制使用 `let`/`const`，以规避变量提升和作用域污染问题。

**项目实例**：

javascript

```javascript
// 常量：配置、引入的库
const API_BASE_URL = 'https://api.example.com';
const import { debounce } from 'lodash';

// 可变变量：循环、状态
let count = 0;
for (let i = 0; i < 10; i++) {
  count += i;
}

// 对象属性可变，仍用 const
const user = { name: '张三' };
user.name = '李四'; // 允许
```



------

## 2. 箭头函数与普通函数的区别？箭头函数的 this 指向如何？

**区别**：

| 特性             | 普通函数                                 | 箭头函数                                            |
| :--------------- | :--------------------------------------- | :-------------------------------------------------- |
| `this` 指向      | 动态绑定，取决于调用方式（谁调用指向谁） | **静态绑定**，继承外层作用域的 `this`（定义时确定） |
| `arguments` 对象 | 有                                       | 无（可用剩余参数 `...args` 替代）                   |
| `new` 调用       | 可作为构造函数（`new`）                  | 不能作为构造函数，会报错                            |
| `prototype` 属性 | 有                                       | 无                                                  |
| 简写语法         | 无                                       | 单行可省略 `{}` 和 `return`，单参数可省略括号       |

**箭头函数的 `this` 指向**：箭头函数本身没有 `this`，它会捕获其所在上下文的 `this` 作为自己的 `this`，且一经绑定不可改变（`call`/`apply`/`bind` 无法修改）。

**项目中的应用**：

- **回调函数中保留外层 `this`**：在 Vue 或 React 组件方法中，避免手动 `that = this` 或 `bind`。

  javascript

  ```javascript
  // Vue 3 组合式 API
  setup() {
    const count = ref(0);
    setInterval(() => {
      count.value++; // 箭头函数 this 指向外层，但这里用 ref 无需 this
    }, 1000);
  }
  ```

  

- **避免在需要动态 `this` 的场景使用**：如事件监听器中需要获取当前元素时，应使用普通函数。

  javascript

  ```javascript
  button.addEventListener('click', function() {
    console.log(this); // 指向 button
  });
  // 若用箭头函数，this 将指向外层（如 window）
  ```

  

- **对象方法中慎用箭头函数**：对象方法需要访问对象本身属性时，应用普通函数。

  javascript

  ```javascript
  const obj = {
    name: 'obj',
    getName: () => {
      return this.name; // this 指向外层，可能是 window，错误
    }
  };
  ```

  

**项目实践**：在“铅蛋回收小程序”中，处理异步请求时常用箭头函数保持上下文一致性；在 Vue 组件中，方法定义通常使用普通函数（因为 Vue 会绑定 this 指向组件实例），但生命周期钩子、计算属性等推荐使用普通函数或箭头函数？实际上 Vue 选项 API 中 methods 里用箭头函数会导致 this 问题，所以 methods 必须用普通函数；组合式 API 中由于没有 this，箭头函数更安全。

------

## 3. 介绍 Promise、async/await 的使用和原理。你在项目中如何处理异步流程？

**Promise** 是异步编程的一种解决方案，代表一个尚未完成但预期将来会完成的操作。它有三种状态：pending（进行中）、fulfilled（已成功）、rejected（已失败）。状态一旦改变就不会再变。

基本使用：

javascript

```javascript
const promise = new Promise((resolve, reject) => {
  // 异步操作
  if (成功) resolve(data);
  else reject(error);
});

promise.then(data => {
  // 处理成功
}).catch(err => {
  // 处理失败
}).finally(() => {
  // 无论成功失败都执行
});
```



**async/await** 是基于 Promise 的语法糖，使异步代码看起来像同步。

- `async` 函数返回一个 Promise。
- `await` 等待一个 Promise 完成，并返回结果，只能在 `async` 函数内使用。

javascript

```javascript
async function fetchData() {
  try {
    const data = await api.get('/list');
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```



**原理**：`async/await` 本质上就是 Generator + Promise 的语法糖。`await` 会暂停函数执行，等待 Promise 决议后恢复执行，并将结果返回。

**项目中如何处理异步流程**：

1. **统一请求封装**：在项目中（如“千源百荟回收小程序”），基于 Axios 封装请求函数，返回 Promise，配合 `async/await` 使用。

   javascript

   ```javascript
   // api/request.js
   export function fetchUserInfo(userId) {
     return request({
       url: `/user/${userId}`,
       method: 'get'
     });
   }
   
   // 页面中使用
   async function loadUserInfo() {
     try {
       const res = await fetchUserInfo(userId);
       userInfo.value = res.data;
     } catch (error) {
       Toast.fail('获取用户信息失败');
     }
   }
   ```

   

2. **处理并发请求**：使用 `Promise.all` 或 `Promise.allSettled`。

   javascript

   ```javascript
   async function loadDashboard() {
     const [user, orders, stats] = await Promise.all([
       fetchUser(),
       fetchOrders(),
       fetchStats()
     ]);
     // 处理数据
   }
   ```

   

3. **处理超时/竞态**：使用 `Promise.race` 实现超时控制。

   javascript

   ```javascript
   function withTimeout(promise, timeoutMs) {
     const timeoutPromise = new Promise((_, reject) => {
       setTimeout(() => reject(new Error('请求超时')), timeoutMs);
     });
     return Promise.race([promise, timeoutPromise]);
   }
   ```

   

4. **避免回调地狱**：使用 `async/await` 代替多层嵌套。

5. **错误处理统一化**：封装统一的错误捕获逻辑，如请求拦截器中处理 token 过期、错误提示等。

**项目实例**：在“铅蛋回收”小程序中，支付流程需要按顺序调用多个接口（创建订单、预支付、确认支付），使用 `async/await` 使流程清晰，且易于处理异常和回退。

------

## 4. 如何实现深拷贝？遇到过循环引用问题吗？如何解决？

**深拷贝**：创建一个新对象，递归复制原对象的所有属性，且属性值也是新拷贝的，与原对象完全独立。

**实现方式**：

1. **JSON 方法**（简单但有限制）：

   javascript

   ```javascript
   const copy = JSON.parse(JSON.stringify(original));
   ```

   

   - 缺点：无法处理 `undefined`、`Symbol`、函数、循环引用（会报错）、特殊对象（如 Date、RegExp、Map、Set 等会被转成字符串或空对象）。

2. **递归实现**（基础版）：

   javascript

   ```javascript
   function deepClone(obj) {
     if (obj === null || typeof obj !== 'object') return obj;
     if (obj instanceof Date) return new Date(obj);
     if (obj instanceof RegExp) return new RegExp(obj);
     const clone = Array.isArray(obj) ? [] : {};
     for (let key in obj) {
       if (obj.hasOwnProperty(key)) {
         clone[key] = deepClone(obj[key]);
       }
     }
     return clone;
   }
   ```

   

   但此版本无法处理循环引用（会导致栈溢出）。

3. **解决循环引用**：使用 `WeakMap` 存储已拷贝的对象，遇到重复对象时直接返回之前拷贝的引用。

   javascript

   ```javascript
   function deepClone(obj, hash = new WeakMap()) {
     if (obj === null || typeof obj !== 'object') return obj;
     if (obj instanceof Date) return new Date(obj);
     if (obj instanceof RegExp) return new RegExp(obj);
     if (hash.has(obj)) return hash.get(obj); // 解决循环引用
   
     const clone = Array.isArray(obj) ? [] : {};
     hash.set(obj, clone);
     
     for (let key in obj) {
       if (obj.hasOwnProperty(key)) {
         clone[key] = deepClone(obj[key], hash);
       }
     }
     return clone;
   }
   ```

   

4. **使用 structuredClone**（现代浏览器内置）：

   javascript

   ```javascript
   const copy = structuredClone(original);
   ```

   

   支持循环引用、Date、Map、Set 等，但不能克隆函数、DOM 节点。

5. **第三方库**：`lodash.cloneDeep`。

**项目中的使用**：

- 在“铅蛋回收 SaaS 后台”中，需要对复杂配置对象进行深拷贝以进行修改而不影响原数据（如表单默认值备份、撤销/重做功能）。
- 当从接口获取的数据需要本地编辑但暂不提交时，先深拷贝一份到本地状态，避免直接修改 Vuex/Pinia 中的数据。

**遇到过循环引用**：在处理树形结构数据（如组织架构、权限树）时，可能由于数据错误出现循环引用（如父节点引用子节点，子节点又引用父节点）。使用上述 `WeakMap` 方法即可安全克隆。

------

## 5. 介绍事件循环（Event Loop）机制。宏任务和微任务有哪些？

**事件循环**是 JavaScript 实现异步非阻塞的核心机制。JavaScript 是单线程的，所有同步任务在主线程执行，形成一个执行栈。异步任务（如 setTimeout、Promise）会交给 Web API（浏览器）处理，待条件满足后，其回调被放入任务队列。事件循环不断检查执行栈是否为空，若为空，则从任务队列中取出回调压入执行栈执行。

**任务队列**分为两种：

- **宏任务（MacroTask）**：每次执行栈清空后，事件循环会从宏任务队列中取出一个任务执行。包括：
  - `setTimeout` / `setInterval`
  - `setImmediate`（Node）
  - I/O 操作（文件读取、网络请求）
  - UI 渲染（浏览器）
  - `messageChannel` 等
- **微任务（MicroTask）**：在当前宏任务执行完毕后、下一个宏任务开始前，会清空所有微任务。微任务优先级高于宏任务。包括：
  - `Promise.then` / `catch` / `finally`
  - `MutationObserver`
  - `process.nextTick`（Node）
  - `queueMicrotask`

**执行顺序**（简化版）：

1. 执行一个宏任务（首次执行整体 script 代码作为第一个宏任务）。
2. 执行过程中产生的微任务会被添加到微任务队列。
3. 当前宏任务执行完后，立即执行所有微任务（按加入顺序）。
4. 可能进行 UI 渲染（浏览器）。
5. 从宏任务队列取下一个宏任务执行，重复循环。

**代码示例**：

javascript

```javascript
console.log('1'); // 同步

setTimeout(() => {
  console.log('2'); // 宏任务
}, 0);

Promise.resolve().then(() => {
  console.log('3'); // 微任务
});

console.log('4'); // 同步

// 输出顺序：1, 4, 3, 2
```



**项目中的应用**：

- 理解事件循环有助于避免异步顺序错误，例如在请求数据后需要立即更新 UI，应确保数据处理在微任务中（Promise.then）完成，避免被其他宏任务插队。
- 使用 `setTimeout` 延迟执行某些操作，但不阻塞主线程。
- 优化性能：将耗时任务拆分为多个宏任务，避免长时间阻塞渲染。

**项目实例**：在“千源百荟小程序”中，长列表渲染时，为了避免一次性渲染太多导致卡顿，可以将数据分批，每批用 `setTimeout` 放入宏任务队列，让出主线程给渲染。

------

## 6. 如何实现数组去重？列举多种方法。

给定数组 `[1, 2, 2, 3, 4, 4, 5]`，去重后得到 `[1, 2, 3, 4, 5]`。

**方法一：Set（ES6 最简洁）**

javascript

```javascript
const unique = [...new Set(arr)];
// 或 Array.from(new Set(arr))
```



**方法二：filter + indexOf**

javascript

```javascript
const unique = arr.filter((item, index) => arr.indexOf(item) === index);
```



缺点：时间复杂度 O(n²)，且对 NaN 无法区分。

**方法三：reduce + includes**

javascript

```javascript
const unique = arr.reduce((acc, cur) => {
  if (!acc.includes(cur)) acc.push(cur);
  return acc;
}, []);
```



**方法四：Map / 对象键值对**

javascript

```javascript
const map = new Map();
arr.forEach(item => map.set(item, true));
const unique = [...map.keys()];
```



或使用对象（但键会被转为字符串，不区分数字和字符串）：

javascript

```javascript
const obj = {};
arr.forEach(item => obj[item] = true);
const unique = Object.keys(obj).map(Number); // 如果都是数字
```



**方法五：排序后去重**

javascript

```javascript
const sorted = arr.slice().sort();
const unique = sorted.filter((item, index) => index === 0 || item !== sorted[index-1]);
```



注意排序改变了顺序。

**方法六：使用 lodash**

javascript

```javascript
const unique = _.uniq(arr);
```



**项目中的选择**：通常使用 `Set`，简单高效。但如果数组元素是对象，需要根据某个属性去重，可以用 `Map` 或 `reduce`。

**对象数组去重示例**（根据 id 去重）：

javascript

```javascript
const arr = [{id:1, name:'a'}, {id:2, name:'b'}, {id:1, name:'c'}];
const map = new Map();
arr.forEach(item => map.set(item.id, item)); // 后面的覆盖前面的
const unique = [...map.values()];
```



------

## 7. 闭包是什么？实际项目中哪些地方用到了闭包？

**闭包（Closure）**：指有权访问另一个函数作用域中的变量的函数。创建闭包的常见方式是在一个函数内部创建另一个函数，并返回该函数，内部函数可以访问外部函数的变量，即使外部函数已经执行完毕，这些变量仍会保存在内存中。

**形成条件**：

- 函数嵌套
- 内部函数引用了外部函数的变量
- 内部函数被外部使用（如返回、赋值给全局变量等）

**作用**：

- 保护变量不被垃圾回收，实现数据私有化。
- 创建模块化，隐藏实现细节。
- 在函数外部访问函数内部的变量。

**项目中的应用**：

1. **封装私有变量**：例如在工具库中，创建只有特定方法能访问的私有数据。

   javascript

   ```javascript
   function createCounter() {
     let count = 0;
     return {
       increment: () => ++count,
       decrement: () => --count,
       getCount: () => count
     };
   }
   const counter = createCounter();
   ```

   

2. **防抖/节流函数**：利用闭包保存定时器 ID 和上次执行时间。

   javascript

   ```javascript
   function debounce(fn, delay) {
     let timer = null;
     return function(...args) {
       clearTimeout(timer);
       timer = setTimeout(() => fn.apply(this, args), delay);
     };
   }
   ```

   

3. **循环中保存索引**：在 `var` 时代，循环中创建异步回调常使用闭包保存正确的索引。

   javascript

   ```javascript
   for (var i = 0; i < 5; i++) {
     (function(j) {
       setTimeout(() => console.log(j), 1000);
     })(i);
   }
   ```

   

   现在用 `let` 即可。

4. **Vue 组合式函数**：在 Vue 3 组合式 API 中，利用闭包封装可复用逻辑，返回响应式状态和方法，内部状态对外隐藏。

   javascript

   ```javascript
   // useCounter.js
   import { ref } from 'vue';
   export default function useCounter() {
     const count = ref(0);
     const increment = () => count.value++;
     return { count, increment };
   }
   ```

   

5. **函数柯里化**：闭包用于保存预设参数。

   javascript

   ```javascript
   function multiply(a) {
     return function(b) {
       return a * b;
     };
   }
   const double = multiply(2);
   ```

   

**注意事项**：闭包会导致变量常驻内存，若使用不当可能造成内存泄漏。在不需要时应解除引用（如将内部函数置为 `null`）。

------

## 8. 原型链是什么？如何实现继承？ES6 class 的继承原理？

**原型链**：每个对象都有一个内部属性 `[[Prototype]]`（可通过 `__proto__` 访问），指向它的原型对象。当访问对象的属性或方法时，如果对象本身没有，就会沿着原型链向上查找，直到找到或到达 `null`。这种通过 `__proto__` 串联起来的链式结构就是原型链。

**构造函数与原型**：每个函数都有一个 `prototype` 属性，指向一个对象（原型对象）。通过 `new` 创建的对象，其 `__proto__` 指向构造函数的 `prototype`。

**实现继承的方式**：

1. **原型链继承**：

   javascript

   ```javascript
   function Parent() {
     this.name = 'parent';
   }
   Parent.prototype.say = function() {
     console.log(this.name);
   };
   function Child() {}
   Child.prototype = new Parent(); // 继承
   Child.prototype.constructor = Child;
   ```

   

   缺点：所有子实例共享引用类型属性（如数组），且无法向父构造函数传参。

2. **构造函数继承**（经典继承）：

   javascript

   ```javascript
   function Child() {
     Parent.call(this); // 调用父构造函数，可传参
   }
   ```

   

   优点：可传参，引用类型属性不共享。缺点：无法继承父原型上的方法。

3. **组合继承**（常用）：

   javascript

   ```javascript
   function Child() {
     Parent.call(this);
   }
   Child.prototype = new Parent();
   Child.prototype.constructor = Child;
   ```

   

   优点：结合两者。缺点：调用了两次父构造函数（一次 `call`，一次 `new`）。

4. **寄生组合继承**（最优）：

   javascript

   ```javascript
   function inherit(Child, Parent) {
     const prototype = Object.create(Parent.prototype); // 创建父原型的副本
     prototype.constructor = Child;
     Child.prototype = prototype;
   }
   function Child() {
     Parent.call(this);
   }
   inherit(Child, Parent);
   ```

   

**ES6 class 继承原理**：

javascript

```javascript
class Parent {}
class Child extends Parent {
  constructor() {
    super(); // 调用父类构造函数
  }
}
```



ES6 class 本质是语法糖，底层仍是原型链。`extends` 相当于将子类的 `prototype.__proto__` 指向父类的 `prototype`（静态方法继承则通过将子类 `__proto__` 指向父类）。`super` 在构造函数中相当于调用父类构造函数（`Parent.call(this)`），并将父类构造函数的返回值作为子类的 `this`。

**项目中的应用**：在项目早期（Vue 2 时代），可能会用 class 定义一些模型类或服务类；但现在更多使用组合式函数或 hooks 代替继承。但在封装自定义组件库时，可能会用到继承来扩展基础组件的功能。

------

## 9. 防抖和节流的区别？你在项目中如何封装防抖节流指令？

**防抖（Debounce）**：在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。适用于连续操作只希望最后一次生效的场景，如输入框搜索、窗口 resize 结束计算。

**节流（Throttle）**：规定一个单位时间，在这个单位时间内，只能触发一次回调。如果在这个时间内被多次触发，只有一次生效。适用于需要定期执行的场景，如滚动加载、拖拽位置更新、射击游戏。

**区别**：

- 防抖：将多次执行合并为一次，关注最终结果。
- 节流：将多次执行稀释为固定频率执行，关注过程。

**项目中的封装**：

在“铅蛋回收 SaaS 后台”中，我封装了自定义指令 `v-debounce` 和 `v-throttle`，用于按钮防重复提交和滚动节流。

**防抖指令实现**（Vue 3）：

javascript

```javascript
// directives/debounce.js
import { debounce } from 'lodash-es'; // 或自己实现

export default {
  mounted(el, binding) {
    const { value, arg } = binding;
    const event = arg || 'click'; // 默认监听 click
    const [handler, delay = 300] = value;
    el._debounceHandler = debounce(handler, delay);
    el.addEventListener(event, el._debounceHandler);
  },
  beforeUnmount(el, binding) {
    const event = binding.arg || 'click';
    el.removeEventListener(event, el._debounceHandler);
    el._debounceHandler.cancel(); // 取消防抖
  }
};
```



使用：

html

```html
<button v-debounce:click="[saveData, 500]">保存</button>
```



**自己实现防抖函数**：

javascript

```javascript
function debounce(fn, delay) {
  let timer = null;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
```



**节流指令**（时间戳版）：

javascript

```javascript
// directives/throttle.js
export default {
  mounted(el, binding) {
    const { value, arg } = binding;
    const event = arg || 'scroll';
    const [handler, delay = 200] = value;
    let lastTime = 0;
    const throttledHandler = function(...args) {
      const now = Date.now();
      if (now - lastTime >= delay) {
        handler.apply(this, args);
        lastTime = now;
      }
    };
    el._throttleHandler = throttledHandler;
    el.addEventListener(event, throttledHandler);
  },
  beforeUnmount(el, binding) {
    const event = binding.arg || 'scroll';
    el.removeEventListener(event, el._throttleHandler);
  }
};
```



**项目中的应用场景**：

- 防抖：搜索输入框（避免频繁请求）、按钮提交（防止用户连续点击多次提交表单）。
- 节流：滚动加载更多（监听 scroll 或触底事件）、实时保存草稿（每隔一段时间自动保存）。

------

## 10. 如何处理 JavaScript 浮点数精度问题？你在金融计算中用了什么方案？

**精度问题原因**：JavaScript 采用 IEEE 754 双精度浮点数标准，二进制无法精确表示某些十进制小数（如 0.1），导致计算误差。

**常见问题**：

javascript

```javascript
0.1 + 0.2 // 0.30000000000000004
0.3 - 0.1 // 0.19999999999999998
```



**金融计算中必须保证精度**，否则会导致金额错误。

**解决方案**：

1. **使用整数计算**：将金额乘以 100（分）转换为整数，计算后再除以 100。

   javascript

   ```javascript
   // 元转分
   const price = 12.34;
   const priceInCents = Math.round(price * 100); // 1234
   // 计算
   const totalInCents = priceInCents * quantity;
   // 分转元
   const total = (totalInCents / 100).toFixed(2);
   ```

   

   注意乘法后要 `Math.round` 避免浮点误差。

2. **使用第三方库**：如 `big.js`、`decimal.js`、`bignumber.js`。在“铅蛋回收”项目中，涉及金额计算的地方都引入了 `big.js`。

   javascript

   ```javascript
   import Big from 'big.js';
   const a = new Big(0.1);
   const b = new Big(0.2);
   const c = a.plus(b); // 0.3
   console.log(c.toString()); // "0.3"
   ```

   

3. **封装工具函数**：对于简单场景，封装加减乘除函数，内部使用整数运算。

   javascript

   ```javascript
   function add(a, b) {
     const factor = Math.pow(10, Math.max(decimalPlaces(a), decimalPlaces(b)));
     return (Math.round(a * factor) + Math.round(b * factor)) / factor;
   }
   ```

   

   但需注意大数溢出问题。

**项目实践**：

- 在“铅蛋回收 SaaS 后台”中，所有财务相关模块（订单金额、结算、提现）统一使用 `big.js`，并封装了 `$formatMoney` 过滤器/函数，将计算结果格式化为两位小数，避免展示问题。
- 封装 Axios 请求拦截器，对返回的金额字段（如 `amount`、`price`）自动转换为 `Big` 对象，便于后续计算。
- 对于表单输入，使用指令限制输入格式（只能输入数字和小数点，最多两位小数），并实时转换为整数存储或计算。

**注意事项**：

- 避免直接比较浮点数，使用 `Big` 的 `eq` 方法或设置容差值。
- 显示时使用 `toFixed(2)` 确保两位小数。

------

## 11. 介绍 Map、Set 与普通对象的区别和应用场景。

### Map 与普通对象的区别

| 特性   | 普通对象（Object）                                        | Map                                  |
| :----- | :-------------------------------------------------------- | :----------------------------------- |
| 键类型 | 只能是字符串或 Symbol                                     | 可以是任意类型（对象、函数、NaN 等） |
| 键顺序 | 传统对象属性无序（ES6 之后有枚举顺序，但不稳定）          | 严格保持插入顺序                     |
| 大小   | 需手动计算 `Object.keys(obj).length`                      | 内置 `size` 属性                     |
| 性能   | 频繁增删键值对时性能较差                                  | 针对频繁增删做了优化                 |
| 迭代   | 需借助 `Object.keys`、`for...in`（需判断 hasOwnProperty） | 可直接迭代（`forEach`、`for...of`）  |
| 原型链 | 有原型链，可能意外继承属性                                | 无原型链，安全存储数据               |

**Map 应用场景**：

- 需要键为非字符串类型（如 DOM 元素作为键）。
- 需要频繁增删键值对。
- 需要保持键值对的插入顺序。
- 需要方便获取大小。

### Set 与数组的区别

| 特性       | 数组（Array）                                 | Set                         |
| :--------- | :-------------------------------------------- | :-------------------------- |
| 元素唯一性 | 允许重复                                      | **元素唯一**（自动去重）    |
| 查找元素   | 使用 `indexOf` 或 `includes`，时间复杂度 O(n) | `has` 方法，时间复杂度 O(1) |
| 增删元素   | `push`/`pop`/`splice`                         | `add`/`delete`/`clear`      |
| 顺序       | 保持插入顺序                                  | 保持插入顺序                |
| 大小       | `length` 属性                                 | `size` 属性                 |

**Set 应用场景**：

- 数组去重。
- 判断元素是否存在（如标签列表、权限集合）。
- 交集、并集、差集运算。

**项目中的应用**：

- **Map 用于缓存**：在“铅蛋回收小程序”中，使用 `Map` 缓存已经加载过的用户信息，键为用户 ID，值为用户对象。

  javascript

  ```javascript
  const userCache = new Map();
  async function getUserInfo(userId) {
    if (userCache.has(userId)) {
      return userCache.get(userId);
    }
    const res = await api.getUser(userId);
    userCache.set(userId, res.data);
    return res.data;
  }
  ```

  

- **Set 用于权限管理**：在 SaaS 后台中，使用 `Set` 存储当前用户拥有的权限标识，便于快速判断是否有权限。

  javascript

  ```javascript
  const permissions = new Set(['user:add', 'user:delete']);
  if (permissions.has('user:add')) {
    // 允许操作
  }
  ```

  

- **Set 去重**：处理从接口返回的标签列表，去重后展示。

------

## 12. 如何实现一个可拖拽的列表？需要考虑哪些性能点？

**实现思路**：利用 HTML5 Drag & Drop API 或使用鼠标事件（mousedown、mousemove、mouseup）模拟拖拽。这里介绍基于鼠标事件的实现，因为它更灵活且兼容性好。

**核心步骤**：

1. 监听列表项的 `mousedown` 事件，记录初始位置和元素索引。
2. 在 `mousemove` 中计算移动距离，实时更新被拖拽元素的位置（使用 `transform: translate`），并计算当前拖拽到哪个位置（判断与其它元素的重叠），高亮显示目标位置。
3. 在 `mouseup` 中完成排序（重新排列 DOM 或更新数组数据），并清理临时样式和事件监听。

**简化版实现**（Vue 3 组合式函数）：

javascript

```javascript
import { ref } from 'vue';

export function useDraggable(items, onReorder) {
  const draggingIndex = ref(-1);
  const startY = ref(0);
  const currentTranslate = ref(0);
  const itemHeight = 40; // 假设固定高度，实际可动态获取

  const handleMouseDown = (index, event) => {
    draggingIndex.value = index;
    startY.value = event.clientY;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event) => {
    const deltaY = event.clientY - startY.value;
    currentTranslate.value = deltaY;
    // 计算新索引
    const moveCount = Math.round(deltaY / itemHeight);
    const newIndex = Math.min(
      Math.max(draggingIndex.value + moveCount, 0),
      items.value.length - 1
    );
    // 这里可以高亮目标位置，比如在列表中插入一个占位符
  };

  const handleMouseUp = () => {
    // 根据最终移动距离计算最终索引，更新数组
    const moveCount = Math.round(currentTranslate.value / itemHeight);
    const newIndex = Math.min(
      Math.max(draggingIndex.value + moveCount, 0),
      items.value.length - 1
    );
    if (newIndex !== draggingIndex.value) {
      // 重新排列数组
      const newItems = [...items.value];
      const [removed] = newItems.splice(draggingIndex.value, 1);
      newItems.splice(newIndex, 0, removed);
      items.value = newItems;
      onReorder?.(newItems);
    }
    // 清理
    draggingIndex.value = -1;
    currentTranslate.value = 0;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return { handleMouseDown };
}
```



**性能优化考虑**：

1. **使用 `transform` 而不是修改 `top/left`**：`transform` 不会触发重排（reflow），只触发重绘（repaint）和合成（composite），性能更好。

2. **减少 DOM 操作**：拖拽过程中不要频繁操作 DOM 结构（如插入占位符），可以只改变视觉指示，最终排序时一次更新。

3. **使用 `requestAnimationFrame` 节流**：在 `mousemove` 中使用 RAF 限制更新频率，保证流畅度。

   javascript

   ```javascript
   let rafId = null;
   const handleMouseMove = (event) => {
     if (rafId) cancelAnimationFrame(rafId);
     rafId = requestAnimationFrame(() => {
       // 更新逻辑
     });
   };
   ```

   

4. **避免内存泄漏**：确保在 `mouseup` 后移除全局事件监听。

5. **虚拟滚动结合**：如果列表很长（成千上万项），应结合虚拟滚动，只渲染可视区域，拖拽逻辑需要适配虚拟列表的偏移量。

6. **防抖/节流**：对于拖拽过程中的计算（如判断是否越过其他项），可以适当节流，但需保持流畅性。

**项目中的应用**：在“铅蛋回收 SaaS 后台”中，有一个“自定义菜单排序”功能，允许管理员拖拽菜单项调整顺序。我使用了上述方法，并配合 Vue 的过渡动画，实现了平滑的拖拽效果。

**注意事项**：

- 拖拽时需要阻止默认事件（`event.preventDefault()`）和冒泡，避免触发浏览器原生拖拽或选中文本。
- 若列表项高度不固定，需要动态计算每个项的位置，可能使用 `getBoundingClientRect`。
- 触摸屏需适配 `touch` 事件。

# 三、Vue 核心详细解答

------

## 1. Vue 2 和 Vue 3 的主要区别是什么？你更倾向于哪个？为什么？

**主要区别**：

| 维度                | Vue 2                                                        | Vue 3                                                        |
| :------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **响应式系统**      | 基于 `Object.defineProperty`，无法检测对象属性的添加/删除，需使用 `Vue.set` / `Vue.delete` | 基于 ES6 `Proxy`，可以拦截对象任意属性的读写、删除，实现真正的全响应式 |
| **API 风格**        | 选项式 API（Options API）为主                                | 同时支持选项式 API 和组合式 API（Composition API），组合式 API 更灵活 |
| **TypeScript 支持** | 对 TypeScript 支持较弱，需要额外装饰器等                     | 使用 TypeScript 重写，类型推断更完善，组合式 API 天然类型友好 |
| **性能**            | 虚拟 DOM 重绘时全量比较                                      | 虚拟 DOM 优化，引入静态树提升、静态属性提升，更新更快        |
| **打包体积**        | 体积较大                                                     | 支持 Tree-shaking，按需引入，体积更小                        |
| **Fragment**        | 不支持多根节点组件，必须有单个根元素                         | 支持 Fragments（多根节点组件）                               |
| **Teleport**        | 无                                                           | 新增 Teleport 组件，可将内容渲染到指定 DOM 节点（如模态框）  |
| **Suspense**        | 无                                                           | 实验性 Suspense 组件，处理异步组件加载                       |
| **生命周期**        | `beforeCreate`、`created`、`beforeMount` 等                  | 组合式 API 中使用 `onBeforeMount`、`onMounted` 等钩子，命名变化 |
| **全局 API**        | `Vue.use`、`Vue.component` 等挂载在 Vue 对象上               | 使用 `createApp` 创建的 app 实例调用，避免全局污染           |
| **v-model**         | 默认使用 `value` 属性和 `input` 事件，可自定义               | 组件上 `v-model` 可绑定多个，使用 `modelValue` 和 `update:modelValue`，更灵活 |
| **异步组件**        | 使用 `Vue.component('name', () => import())`                 | 使用 `defineAsyncComponent` 定义                             |

**个人倾向**：**我更倾向于 Vue 3**，原因如下：

- **性能更好**：Proxy 响应式和编译优化让应用更快，尤其在中大型项目中优势明显。
- **组合式 API 提高代码复用性**：在“千源百荟”项目中，我们使用组合式 API 封装了大量业务逻辑（如订单流程、权限验证），代码更清晰，复用性高。
- **TypeScript 支持完善**：团队开发时类型安全大大提升，减少运行时错误。
- **长期维护**：Vue 3 是未来发展方向，新生态（如 Pinia、Vite）都优先支持 Vue 3。
- **Tree-shaking**：最终打包体积更小，对小程序和移动端友好。

但在维护旧项目时仍需使用 Vue 2（如“铅蛋回收 SaaS 后台”早期版本），目前我们已将部分新模块迁移至 Vue 3。

------

## 2. Vue 3 的 Composition API 与 Vue 2 的 Options API 对比，优缺点？

**Options API**：将代码按选项（data、methods、computed、watch）组织，同一逻辑的代码分散在不同选项中。

javascript

```javascript
export default {
  data() {
    return { count: 0 };
  },
  methods: {
    increment() { this.count++; }
  },
  computed: {
    double() { return this.count * 2; }
  }
};
```



**Composition API**：将相关逻辑封装在一个函数中，通过 `setup` 函数组合，按功能组织代码。

javascript

```javascript
import { ref, computed } from 'vue';
export default {
  setup() {
    const count = ref(0);
    const increment = () => count.value++;
    const double = computed(() => count.value * 2);
    return { count, increment, double };
  }
};
```



**优缺点对比**：

| 特性                | Options API                                              | Composition API                                              |
| :------------------ | :------------------------------------------------------- | :----------------------------------------------------------- |
| **代码组织**        | 按选项分割，小项目清晰，但大组件逻辑分散，跨选项追踪困难 | 按逻辑关注点组织，可将相关变量、函数放在一起，易于维护和复用 |
| **逻辑复用**        | 使用 mixins，但存在命名冲突、来源不明等问题              | 使用组合式函数（hooks），纯函数组合，清晰且无副作用          |
| **TypeScript 支持** | 类型推断较困难，需要复杂类型标注                         | 天然类型友好，利用函数作用域和返回值推断类型                 |
| **学习曲线**        | 结构固定，初学者易上手                                   | 需要理解响应式 API 和函数式编程思维，学习成本略高            |
| **性能**            | 无明显差异                                               | 无差异，但组合式 API 更容易进行 tree-shaking                 |
| **可测试性**        | 依赖组件实例，测试需要挂载组件                           | 组合式函数是纯函数，可独立测试                               |
| **代码量**          | 随组件复杂度增加，代码量膨胀                             | 可抽离逻辑，减少组件文件大小                                 |

**项目中的应用**：

- 在“铅蛋回收小程序”中，我们将订单流程（创建订单、支付、状态查询）封装为 `useOrder` 组合式函数，多个页面复用。
- 在“千源百荟官网”中，使用组合式 API 处理表单验证、地图定位等逻辑，代码清晰且便于单元测试。

**总结**：对于简单组件，Options API 足够；对于复杂业务组件，Composition API 优势明显。我们团队新项目统一使用 Composition API。

------

## 3. 响应式原理：Vue 2 的 Object.defineProperty 和 Vue 3 的 Proxy 区别？

**Vue 2 响应式原理**：

- 在组件初始化时，递归遍历 data 中的所有属性，使用 `Object.defineProperty` 将它们转为 getter/setter。
- 每个组件实例对应一个 `Watcher`，当属性被读取时收集依赖（Dep），当属性被修改时触发依赖更新。
- 缺陷：
  - 无法检测对象属性的添加或删除（需要使用 `Vue.set` 或 `this.$set`）。
  - 无法直接检测数组索引和长度的变化（需要重写数组方法）。
  - 初始化时递归遍历，性能开销随数据层级加深而增大。

**Vue 3 响应式原理**：

- 使用 ES6 的 `Proxy` 代理整个对象，在 get 中收集依赖，在 set 中触发更新。
- 懒收集：只有在访问对象属性时才会递归响应式，而不是初始化时全部递归。
- 支持 Map、Set 等内置对象。
- 优势：
  - 可以检测到属性添加和删除。
  - 能够拦截数组索引和长度变化，无需特殊处理。
  - 性能更好，因为代理是惰性的，且 Proxy 本身比 `Object.defineProperty` 开销小。
  - 支持更多数据结构。

**代码对比**：

Vue 2：

javascript

```javascript
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() { /* 依赖收集 */ },
    set(newVal) { /* 触发更新 */ }
  });
}
```



Vue 3：

javascript

```javascript
const proxy = new Proxy(target, {
  get(target, key, receiver) {
    track(target, key); // 依赖收集
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    trigger(target, key); // 触发更新
    return result;
  }
});
```



**项目中的影响**：

- 在 Vue 3 项目中，我们不再需要担心动态添加属性的响应式问题，可以直接赋值，如 `state.user = newUser`。
- 对于数组，直接通过索引修改或修改长度也能触发视图更新，无需使用 `$set`。

------

## 4. Vue 3 中 ref 和 reactive 的区别？什么时候用哪个？

**`ref`**：

- 用于定义一个响应式的基本类型值（如 string、number、boolean），也可以用于对象，但会将其内部值用 `reactive` 转换。
- 返回一个包含 `value` 属性的对象，访问和修改需通过 `.value`。
- 在模板中使用时自动解包（无需 `.value`）。
- 适合定义单个响应式值，或需要在组合式函数间传递的响应式数据。

**`reactive`**：

- 用于定义一个响应式对象（引用类型），直接操作属性。
- 返回原对象的 Proxy，访问和修改直接使用属性名（无需 `.value`）。
- 不能用于基本类型，否则会失去响应式。
- 适合定义复杂对象（如 state 对象、表单数据）。

**区别**：

| 特性         | ref                                               | reactive                                                    |
| :----------- | :------------------------------------------------ | :---------------------------------------------------------- |
| 适用类型     | 任意类型，但基本类型必须用 ref                    | 只接受对象/数组/Map/Set 等引用类型                          |
| 访问方式     | 通过 `.value`                                     | 直接访问属性                                                |
| 模板自动解包 | 是（顶层属性）                                    | 否                                                          |
| 重新赋值     | 可以直接赋值整个新对象（如 `ref.value = newObj`） | 重新赋值会切断响应式连接（需用 `Object.assign` 或改用 ref） |
| 类型推导     | 需显式声明泛型或自动推导                          | 自动推导                                                    |

**使用场景**：

- 用 `ref`：
  - 定义独立的响应式基本类型值（如计数器、布尔标志）。
  - 定义需要重新赋值的响应式对象（如从接口获取的数据，后续会整体替换）。
  - 在组合式函数中返回响应式值。
- 用 `reactive`：
  - 定义复杂的、嵌套的对象（如表单数据、配置对象）。
  - 定义组件的 state 对象，集中管理多个相关响应式数据。

**项目实例**：

javascript

```javascript
// 使用 ref 定义基本类型
const count = ref(0);
const loading = ref(false);
// 使用 ref 定义可重新赋值的对象
const user = ref(null);
user.value = { name: '张三' }; // 整体赋值

// 使用 reactive 定义复杂对象
const form = reactive({
  name: '',
  age: null,
  address: {
    city: '',
    street: ''
  }
});
// 直接修改属性
form.name = '李四';
form.address.city = '北京';
```



**注意**：解构 `reactive` 对象会丢失响应式，需使用 `toRefs` 或 `toRef` 保持响应式链接。

------

## 5. Vue 的生命周期有哪些？Vue 3 中生命周期有哪些变化？

**Vue 2 生命周期钩子**：

- `beforeCreate`
- `created`
- `beforeMount`
- `mounted`
- `beforeUpdate`
- `updated`
- `beforeDestroy`
- `destroyed`
- `activated`（配合 keep-alive）
- `deactivated`（配合 keep-alive）
- `errorCaptured`

**Vue 3 生命周期变化**：

- 重命名：`beforeDestroy` → `beforeUnmount`，`destroyed` → `unmounted`。
- 新增 `renderTracked` 和 `renderTriggered`（调试用）。
- 组合式 API 中使用对应的钩子函数，需 `import`：
  - `onBeforeMount`
  - `onMounted`
  - `onBeforeUpdate`
  - `onUpdated`
  - `onBeforeUnmount`
  - `onUnmounted`
  - `onActivated`
  - `onDeactivated`
  - `onErrorCaptured`
- 组合式 API 中无 `beforeCreate` 和 `created`，因为 `setup` 本身就是在这两个钩子之前执行的，可直接在 `setup` 中编写代码。

**生命周期顺序**（组合式 API）：

1. `setup()` （替代 beforeCreate/created）
2. `onBeforeMount`
3. `onMounted`
4. `onBeforeUpdate`
5. `onUpdated`
6. `onBeforeUnmount`
7. `onUnmounted`

**项目中的应用**：

在“铅蛋回收小程序”中，我们通常在 `onMounted` 中发起数据请求、初始化地图、注册事件监听；在 `onBeforeUnmount` 中清理定时器、取消事件监听，避免内存泄漏。

javascript

```javascript
import { onMounted, onBeforeUnmount } from 'vue';

setup() {
  let timer;
  onMounted(() => {
    timer = setInterval(fetchData, 1000);
  });
  onBeforeUnmount(() => {
    clearInterval(timer);
  });
}
```



------

## 6. 组件通信方式有哪些？列举并说明使用场景。

Vue 组件通信方式多种多样，根据组件关系选择合适方式：

| 方式                    | 适用场景                                       | 示例                                           |
| :---------------------- | :--------------------------------------------- | :--------------------------------------------- |
| **props / emit**        | 父子组件通信                                   | 父传子用 props，子传父用 `emit` 触发事件       |
| **v-model**             | 父子组件双向绑定                               | 封装表单组件时使用                             |
| **ref / expose**        | 父组件直接调用子组件方法或访问子组件属性       | 父组件需要主动操作子组件时（如表单验证、重置） |
| **provide / inject**    | 祖先向后代注入数据（跨多层）                   | 主题、用户信息、全局配置等                     |
| **事件总线（mitt）**    | 任意组件通信（Vue 3 不再自带 $on，需第三方库） | 简单跨组件通信，但不推荐用于复杂状态管理       |
| **Vuex / Pinia**        | 全局状态管理，任意组件共享状态                 | 用户信息、购物车、订单状态等                   |
| **$attrs / $listeners** | 跨级透传属性和事件                             | 高阶组件、组件库二次封装                       |
| **插槽（slot）**        | 父组件向子组件传递模板内容                     | 布局组件、弹窗内容定制                         |
| **路由参数**            | 不同页面组件间通过路由传参                     | 详情页传入 ID                                  |

**项目实例**：

- **props/emit**：在“铅蛋回收”的订单卡片组件中，父组件传递订单数据，子组件点击按钮时 `emit` 操作事件。
- **v-model**：封装自定义输入框组件，使用 `v-model` 实现双向绑定。
- **ref**：在“千源百荟官网”的复杂表单中，父组件通过 `ref` 调用子组件的验证方法。
- **provide/inject**：在“铅蛋回收 SaaS 后台”中，根组件提供当前用户信息和权限，任何后代组件直接注入使用。
- **Pinia**：整个项目统一使用 Pinia 管理全局状态，如用户 token、订单列表等。
- **插槽**：封装通用弹窗组件，通过插槽自定义内容；封装表格组件，通过作用域插槽自定义列渲染。

------

## 7. 什么是插槽（slot）？作用域插槽如何使用？

**插槽（slot）** 是 Vue 实现内容分发的一种机制，允许父组件向子组件传递模板内容，使组件更具复用性和灵活性。

**基本插槽**：

- 子组件中使用 `<slot>` 标签作为占位符。
- 父组件在使用子组件时，在标签内部传入内容，该内容会替换子组件的 `<slot>`。
- 可设置默认内容：`<slot>默认内容</slot>`。

**具名插槽**：

- 子组件定义多个插槽，通过 `name` 属性区分。
- 父组件使用 `<template v-slot:header>` 或简写 `#header` 指定内容插入哪个插槽。

**作用域插槽**：

- 允许子组件向父组件传递数据，让父组件根据数据渲染自定义内容。
- 子组件在 `<slot>` 上绑定属性，如 `<slot :user="user" :index="index">`。
- 父组件通过 `v-slot` 接收数据，如 `<template #default="slotProps">`，然后使用 `slotProps.user`。

**作用域插槽使用场景**：

- 列表组件的自定义渲染：子组件循环数据，将每个数据项传递给父组件的插槽，由父组件决定如何展示。
- 表格列的自定义内容：封装表格组件时，通过作用域插槽让用户自定义某一列的内容。
- 下拉选项的个性化展示：将选项数据传递给插槽，让父组件自定义选项的展示样式。

**项目实例**：

在“铅蛋回收小程序”中，我们封装了一个通用的列表组件 `BaseList`，它负责分页加载、下拉刷新等逻辑，但每项的展示内容由父组件通过作用域插槽决定。

vue

```vue
<!-- BaseList.vue -->
<template>
  <div>
    <div v-for="(item, index) in list" :key="item.id">
      <slot :item="item" :index="index"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps(['list']);
</script>
```



父组件使用：

vue

```vue
<BaseList :list="orderList">
  <template #default="{ item }">
    <div class="order-card">
      <div>订单号：{{ item.orderNo }}</div>
      <div>金额：{{ item.amount }}</div>
    </div>
  </template>
</BaseList>
```



这样，`BaseList` 只负责数据和逻辑，展示完全由父组件控制，非常灵活。

------

## 8. 动态组件和异步组件如何实现？你在项目中如何优化加载？

**动态组件**：使用 `<component :is="componentName">` 动态切换组件。`componentName` 可以是注册的组件名或导入的组件对象。

**异步组件**：在需要时才加载组件代码，减少首屏打包体积。Vue 3 中使用 `defineAsyncComponent` 定义。

**实现方式**：

javascript

```javascript
// Vue 3 异步组件
import { defineAsyncComponent } from 'vue';

// 简单用法
const AsyncComp = defineAsyncComponent(() => import('./MyComponent.vue'));

// 高级配置
const AsyncCompWithOptions = defineAsyncComponent({
  loader: () => import('./MyComponent.vue'),
  loadingComponent: LoadingComponent, // 加载时显示的组件
  errorComponent: ErrorComponent,     // 出错时显示的组件
  delay: 200,                         // 显示 loading 前的延迟
  timeout: 3000                        // 超时时间
});
```



**项目中的优化加载**：

1. **路由懒加载**：在 Vue Router 中结合动态导入实现页面级别异步加载。

   javascript

   ```javascript
   const routes = [
     {
       path: '/order',
       component: () => import('@/views/OrderPage.vue')
     }
   ];
   ```

   

2. **组件级别异步加载**：对于体积大或不常用的组件（如富文本编辑器、图表组件），使用 `defineAsyncComponent` 按需加载。例如在“铅蛋回收 SaaS 后台”中，数据统计页面的 ECharts 图表组件使用异步加载，减少首屏 JS 体积。

3. **配合 Webpack 魔法注释**：给异步组件命名，便于分析打包。

   javascript

   ```javascript
   const Chart = () => import(/* webpackChunkName: "chart" */ './Chart.vue');
   ```

   

4. **分包策略**：在 Vite 中配置 `build.rollupOptions.output.manualChunks` 将第三方库和业务组件分离，合理利用浏览器缓存。

5. **预加载**：对于可能访问的页面，使用 `v-preload` 或路由预加载（Vue Router 的 `prefetch` 选项）在空闲时提前加载。

6. **骨架屏**：在异步组件加载过程中，使用骨架屏（或 loadingComponent）提升用户体验。

**效果**：在“千源百荟官网”中，通过路由懒加载和组件异步加载，首屏 JS 体积减少 40%，FCP 提升 30%。

------

## 9. keep-alive 的原理和作用？如何配置包含/排除？

**`keep-alive`** 是 Vue 的内置组件，用于缓存动态组件或路由组件的实例，避免重复渲染和销毁，提高性能。

**原理**：

- `keep-alive` 包裹动态组件时，会将匹配的组件实例缓存起来，而不是销毁。
- 组件第一次渲染后，其 VNode 和 DOM 会被缓存。当组件再次被激活时，直接从缓存中恢复，不会重新执行生命周期（如 `created`、`mounted`），但会触发 `activated` 钩子；离开时会触发 `deactivated`。
- 缓存基于组件名称或标识，使用 LRU（最近最少使用）算法管理缓存对象，可以设置 `max` 属性限制缓存数量。

**作用**：

- 保留组件状态（如表单输入内容、滚动位置）。
- 减少重复渲染开销，适用于频繁切换的页面/组件。
- 常用于 Tab 切换、路由页面缓存。

**配置包含/排除**：

- `include`：字符串或正则表达式，只有名称匹配的组件会被缓存。
- `exclude`：字符串或正则表达式，名称匹配的组件不会被缓存。
- `max`：最大缓存实例数，超过时最久未访问的实例会被销毁。

**使用示例**：

vue

```vue
<template>
  <keep-alive :include="['Home', 'Order']" :max="10">
    <router-view />
  </keep-alive>
</template>
```



**项目实例**：

在“铅蛋回收小程序”中，首页列表页面和订单列表页面需要缓存，以便用户返回时保持滚动位置和筛选状态。我们在路由入口使用 `keep-alive` 包裹，并配置 `include` 为需要缓存的页面组件名。

对于不需要缓存的页面（如详情页、支付页），则不包含在内，确保每次进入都重新获取最新数据。

**注意事项**：

- 缓存的组件不会被销毁，因此不要在 `beforeDestroy` 或 `unmounted` 中放置清理逻辑，应使用 `deactivated`。
- 动态组件切换时，会触发 `activated` 和 `deactivated` 生命周期，可在这两个钩子中处理数据刷新或停止轮询。

------

## 10. 如何实现自定义指令？你在项目中封装了哪些自定义指令？

**自定义指令**：Vue 允许注册自定义指令，对普通 DOM 元素进行底层操作。指令定义对象提供一组钩子函数：

- `created`（Vue 3 新增）：在元素属性或事件被应用前调用。
- `beforeMount`：指令第一次绑定到元素时调用（类似 Vue 2 的 `bind`）。
- `mounted`：被绑定元素插入父节点时调用（类似 Vue 2 的 `inserted`）。
- `beforeUpdate`：组件的 VNode 更新前调用。
- `updated`：组件的 VNode 更新后调用。
- `beforeUnmount`：指令与元素解绑前调用（类似 Vue 2 的 `unbind`）。
- `unmounted`：指令与元素解绑后调用。

**注册方式**：

- 全局注册：`app.directive('focus', {...})`
- 局部注册：在组件 `directives` 选项中定义。

**项目中的自定义指令**：

1. **`v-focus`**：自动聚焦输入框。

   javascript

   ```javascript
   const vFocus = {
     mounted: (el) => el.focus()
   };
   ```

   

2. **`v-debounce`**：按钮防重复点击（已在 JavaScript 部分实现过）。

   javascript

   ```javascript
   import { debounce } from 'lodash-es';
   const vDebounce = {
     mounted(el, binding) {
       const { value, arg } = binding;
       const event = arg || 'click';
       const [handler, delay = 300] = value;
       el._debounceHandler = debounce(handler, delay);
       el.addEventListener(event, el._debounceHandler);
     },
     beforeUnmount(el, binding) {
       const event = binding.arg || 'click';
       el.removeEventListener(event, el._debounceHandler);
       el._debounceHandler.cancel?.();
     }
   };
   ```

   

3. **`v-permission`**：按钮级权限控制（已在 TypeScript 部分实现过）。

4. **`v-copy`**：一键复制文本。

   javascript

   ```javascript
   const vCopy = {
     mounted(el, binding) {
       el._copyHandler = () => {
         navigator.clipboard?.writeText(binding.value).then(() => {
           Toast.success('复制成功');
         }).catch(() => {
           Toast.error('复制失败');
         });
       };
       el.addEventListener('click', el._copyHandler);
     },
     updated(el, binding) {
       el._copyHandler = () => {
         navigator.clipboard?.writeText(binding.value).then(...);
       };
     },
     beforeUnmount(el) {
       el.removeEventListener('click', el._copyHandler);
     }
   };
   ```

   

5. **`v-lazyload`**：图片懒加载（使用 IntersectionObserver）。

   javascript

   ```javascript
   const vLazy = {
     mounted(el, binding) {
       const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             el.src = binding.value;
             observer.unobserve(el);
           }
         });
       });
       observer.observe(el);
       el._lazyObserver = observer;
     },
     beforeUnmount(el) {
       el._lazyObserver?.disconnect();
     }
   };
   ```

   

**应用效果**：这些自定义指令提高了代码复用性，简化了模板，并统一了行为（如权限、防抖），在多个项目中共享。

------

## 11. Vue 中的 key 的作用？为什么不建议用 index 作为 key？

**key 的作用**：

- 在虚拟 DOM 的 diff 算法中，key 作为节点的唯一标识，帮助 Vue 更高效地识别节点是否被复用、移动或删除。
- 当列表数据变化（如重新排序、插入、删除）时，带有 key 的节点可以基于 key 进行精确比对，避免不必要的 DOM 操作，提高渲染性能。
- 没有 key（或 key 为 index），Vue 会采用“就地复用”策略，可能导致状态错乱（如输入框内容残留、组件状态复用错误）。

**为什么不用 index 作为 key**：

- 当数组顺序变化（如排序、过滤、插入/删除）时，元素的索引会改变，导致 key 变化，Vue 会认为所有节点都需要销毁重建，失去 key 的优化意义。
- 更严重的是，如果列表项包含表单输入或组件状态，使用 index 作为 key 会导致状态错乱。例如：列表中有多个输入框，删除第一项后，第二项的输入框内容会“上移”到第一项，因为它们的 key 被重新分配。
- 用 index 作 key 还可能引发性能问题（大量重建）和组件生命周期异常（组件被错误复用）。

**正确的 key 选择**：

- 使用每条数据的唯一标识（如 id、uuid），确保 key 稳定且唯一。
- 如果没有 id，可使用其他组合键（如 `item.uniqueField` 或 `index` 结合其他字段），但应尽量避免 index。

**项目实例**：

在“铅蛋回收”订单列表中，每个订单有唯一订单号，我们用订单号作为 key：

vue

```vue
<div v-for="order in orderList" :key="order.orderNo">
  <order-card :order="order" />
</div>
```



在可编辑列表中（如动态表单），我们确保每条数据有临时 id（如使用 `uuid` 生成），避免 index 导致的问题。

------

## 12. 什么是虚拟 DOM？Vue 的 diff 算法原理？

**虚拟 DOM（Virtual DOM）**：是一个轻量级的 JavaScript 对象，它是对真实 DOM 的抽象描述。当数据变化时，Vue 会生成新的虚拟 DOM 树，与旧的虚拟 DOM 树进行比较（diff），计算出实际需要更新的最小变更，然后批量更新真实 DOM，从而提高性能。

**为什么需要虚拟 DOM**：

- 避免直接操作真实 DOM 带来的性能损耗（重排重绘）。
- 跨平台能力（同一套虚拟 DOM 可以渲染到不同平台，如浏览器、小程序、原生应用）。

**Vue 的 diff 算法原理**（Vue 3 优化版）：

1. **只比较同层级节点**，不跨级比较，时间复杂度 O(n)。
2. **双端比较**：Vue 2 使用双端比较（头头、尾尾、头尾、尾头），Vue 3 在双端比较基础上增加了**最长递增子序列**算法，进一步减少移动次数。
3. **过程**：
   - 从新旧两个子节点数组的头部开始比较，如果 key 相同则复用并递归比较子节点，指针后移。
   - 头部比较完后，再比较尾部。
   - 如果头部和尾部都匹配完仍有剩余，则进行 key 值比对，找出可复用的节点，并移动位置。
   - 最后，删除多余节点或新增节点。
4. **静态提升**：Vue 3 将静态节点提升到渲染函数外部，避免每次重新创建。
5. **补丁标志（Patch Flags）**：编译时标记动态节点，diff 时只对比有标记的部分，大幅提升性能。

**项目中的应用**：虽然我们不直接操作 diff，但理解其原理有助于编写高性能代码：

- 给 v-for 提供稳定的 key。
- 避免无意义的组件包裹。
- 合理使用 `v-if` 和 `v-show`。

------

## 13. 如何实现组件之间的双向绑定？v-model 的原理？

**v-model 在原生元素上的原理**：

- 对于 `<input>`、`<textarea>` 元素，`v-model` 本质是语法糖，等价于：

  html

  ```html
  <input :value="modelValue" @input="modelValue = $event.target.value" />
  ```

  

- 对于复选框、单选框、选择框，处理方式略有不同，但核心都是绑定值和监听事件。

**v-model 在组件上的原理**（Vue 3）：

- 默认情况下，组件上的 `v-model` 等价于：

  html

  ```html
  <CustomComponent
    :modelValue="modelValue"
    @update:modelValue="modelValue = $event"
  />
  ```

  

- 组件内部需要接收 `modelValue` prop，并在需要更新时触发 `update:modelValue` 事件。

**多个 v-model 绑定**：Vue 3 支持在同一个组件上使用多个 `v-model`，每个绑定对应不同的 prop 和事件名。

html

```html
<UserName
  v-model:first-name="firstName"
  v-model:last-name="lastName"
/>
```



组件内部：

javascript

```javascript
props: ['firstName', 'lastName'],
emits: ['update:firstName', 'update:lastName']
```



**自定义修饰符**：Vue 3 中可以通过 `modelModifiers` prop 接收修饰符，实现自定义行为。

**项目实例**：

在“千源百荟官网”中，我们封装了一个自定义输入框组件 `AppInput`，支持 `v-model` 并添加了防抖修饰符。

vue

```vue
<!-- AppInput.vue -->
<template>
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>

<script setup>
defineProps(['modelValue']);
defineEmits(['update:modelValue']);
</script>
```



使用：

vue

```vue
<AppInput v-model="searchText" />
```



对于需要防抖的场景，我们自定义了修饰符：

javascript

```javascript
// 组件内处理
const emit = defineEmits(['update:modelValue']);
const props = defineProps({
  modelValue: String,
  modelModifiers: { default: () => ({}) }
});

function handleInput(e) {
  let value = e.target.value;
  if (props.modelModifiers.debounce) {
    // 防抖处理
  }
  emit('update:modelValue', value);
}
```



------

## 14. 在 Vue 3 中如何替代 Vue 2 的过滤器（filter）？

**Vue 2 过滤器**：用于文本格式化，如 `{{ price | formatMoney }}`。Vue 3 中**移除了过滤器**，官方推荐使用以下替代方案：

1. **使用计算属性**：最常用，将格式化逻辑封装在计算属性中。

   javascript

   ```javascript
   const formattedPrice = computed(() => formatMoney(price.value));
   ```

   

   模板中直接使用 `{{ formattedPrice }}`。

2. **使用方法（methods）**：对于简单格式化，可以在方法中实现。

   javascript

   ```javascript
   function formatPrice(value) {
     return `¥${value.toFixed(2)}`;
   }
   ```

   

   模板：`{{ formatPrice(price) }}`。

3. **全局或局部工具函数**：将格式化函数抽离为公共工具，在组件中导入使用。

   javascript

   ```javascript
   // utils/format.js
   export function formatMoney(amount) {
     return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   }
   // 组件中
   import { formatMoney } from '@/utils/format';
   // 模板中直接调用函数：{{ formatMoney(price) }}
   ```

   

4. **自定义全局函数**：通过 `app.config.globalProperties` 挂载全局方法（不推荐，因为不利于 TypeScript 推断）。

5. **使用管道符风格的库**：如 `vue3-pipe`，但并非官方推荐。

**项目实践**：

在“铅蛋回收”项目中，我们统一使用工具函数进行金额、日期等格式化，并配合计算属性或直接在模板中调用函数。对于复杂格式化，使用计算属性可缓存结果，避免重复计算。

例如，订单金额格式化：

vue

```vue
<template>
  <div>{{ formatMoney(order.amount) }}</div>
</template>

<script setup>
import { formatMoney } from '@/utils/format';
const props = defineProps(['order']);
</script>
```



对于需要在多个地方复用的格式化逻辑，我们将其封装为组合式函数（useFormatter），返回各种格式化方法。

## 1. Vue Router 的两种模式（hash 和 history）区别？你在项目中如何配置？

**两种模式的区别**：

| 特性           | Hash 模式                                                    | History 模式                                                 |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **原理**       | 使用 URL 的 hash（`#`）部分模拟完整 URL，hash 变化不会导致浏览器向服务器发送请求，通过监听 `hashchange` 事件实现路由切换 | 利用 HTML5 History API（`pushState`、`replaceState`）修改浏览器历史记录，URL 看起来像标准路径，但需要服务器配置支持 |
| **URL 示例**   | `https://example.com/#/home`                                 | `https://example.com/home`                                   |
| **服务器配置** | 无需特殊配置，任何路径返回 `index.html` 即可                 | 需要配置服务器所有路由都指向 `index.html`（防止刷新 404）    |
| **SEO 友好**   | 差，爬虫通常忽略 `#` 后的内容                                | 较好，但单页应用仍需 SSR 或预渲染才能更好支持 SEO            |
| **兼容性**     | 支持所有浏览器                                               | 支持 IE10+ 及现代浏览器                                      |

**项目中如何配置**：

- 在“千源百荟官网”中，由于需要更好的 SEO 和 URL 美观，我们选择了 **History 模式**，并在 Nginx 中配置了 try_files 规则：

  nginx

  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

  

- 在“铅蛋回收小程序”中，由于小程序环境不支持 History 模式，uni-app 默认使用 hash 模式，但实际小程序路由由原生导航管理，不存在此问题。

- 在“SaaS 管理后台”中，考虑到部署简便，使用了 **Hash 模式**，因为后台系统不关注 SEO，且部署在任何静态服务器上都无需配置。

**配置代码**（Vue Router 4）：

javascript

```javascript
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(), // 或 createWebHashHistory()
  routes: [...]
});
```



------

## 2. 如何实现路由守卫？你在权限控制中如何应用？

**Vue Router 提供了三种类型的守卫**：

1. **全局守卫**：
   - `router.beforeEach`：全局前置守卫，路由跳转前触发。
   - `router.beforeResolve`：全局解析守卫，在所有组件内守卫和异步路由组件解析后调用。
   - `router.afterEach`：全局后置钩子，跳转完成后触发。
2. **路由独享守卫**：在路由配置中定义 `beforeEnter`。
3. **组件内守卫**：
   - `beforeRouteEnter`：进入组件前调用（不能访问组件实例 `this`）。
   - `beforeRouteUpdate`：路由参数变化但组件复用时调用。
   - `beforeRouteLeave`：离开组件前调用。

**权限控制中的应用**：

在“铅蛋回收 SaaS 后台”中，我们使用全局前置守卫实现权限控制：

javascript

```javascript
// router/index.js
import { useUserStore } from '@/stores/user';

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = userStore.token;

  // 白名单：不需要登录的页面
  const whiteList = ['/login', '/403', '/404'];

  if (token) {
    // 已登录
    if (to.path === '/login') {
      next('/'); // 已登录跳转到首页
    } else {
      // 检查是否有权限访问该路由
      const hasPermission = checkPermission(to.meta.permissions);
      if (hasPermission) {
        next();
      } else {
        next('/403');
      }
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next(); // 白名单直接进入
    } else {
      next(`/login?redirect=${to.fullPath}`); // 重定向到登录页，并记录原路径
    }
  }
});
```



此外，我们还在动态路由加载后使用 `router.addRoute` 添加权限路由，并在用户退出时重置路由。

**组件内守卫示例**：在表单编辑页，防止用户未保存离开。

javascript

```javascript
beforeRouteLeave(to, from, next) {
  if (formDirty.value) {
    const answer = confirm('有未保存的更改，确定离开吗？');
    if (answer) next();
    else next(false);
  } else {
    next();
  }
}
```



------

## 3. 什么是动态路由？如何根据用户角色添加路由？

**动态路由**：指在应用运行时根据用户权限、角色等条件动态添加的路由。常用于后台管理系统的权限控制，不同角色看到不同的菜单和可访问页面。

**实现步骤**：

1. **定义基础路由**：所有用户都能访问的路由（如登录页、404）。
2. **定义权限路由配置**：通常在后端返回的权限数据基础上，前端定义可添加的路由模板。
3. **登录成功后获取用户权限**：从后端获取角色、权限列表。
4. **根据权限过滤生成可访问路由**：使用 `router.addRoute` 动态添加。

**项目实践**（铅蛋回收 SaaS 后台）：

javascript

```javascript
// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';

// 静态路由（无需权限）
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/403', component: () => import('@/views/error/403.vue') },
  { path: '/404', component: () => import('@/views/error/404.vue') },
  { path: '/', redirect: '/dashboard' }
];

// 动态路由模板（需要权限过滤）
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: () => import('@/layouts/index.vue'),
    children: [
      { path: '', component: () => import('@/views/dashboard/index.vue'), meta: { permissions: ['dashboard:view'] } }
    ]
  },
  {
    path: '/user',
    component: () => import('@/layouts/index.vue'),
    meta: { permissions: ['user:manage'] },
    children: [
      { path: 'list', component: () => import('@/views/user/list.vue'), meta: { permissions: ['user:view'] } },
      { path: 'add', component: () => import('@/views/user/add.vue'), meta: { permissions: ['user:create'] } }
    ]
  }
  // ... 更多路由
];

// 创建路由实例（仅包含静态路由）
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});

// 动态添加路由的方法
export function addDynamicRoutes(permissions) {
  // 根据权限过滤 asyncRoutes
  const accessibleRoutes = filterRoutes(asyncRoutes, permissions);
  accessibleRoutes.forEach(route => {
    router.addRoute(route); // 添加一级路由
  });
  // 最后添加 404 通配路由（放在最后，避免覆盖）
  router.addRoute({ path: '/:pathMatch(.*)*', redirect: '/404' });
}

// 过滤函数：递归过滤不符合权限的路由
function filterRoutes(routes, permissions) {
  return routes.filter(route => {
    if (route.meta?.permissions) {
      // 检查当前路由是否有权限
      const hasPermission = route.meta.permissions.some(p => permissions.includes(p));
      if (!hasPermission) return false;
    }
    if (route.children) {
      route.children = filterRoutes(route.children, permissions);
    }
    return true;
  });
}
```



**登录后调用**：

javascript

```javascript
// login success
const { permissions } = await userStore.getUserInfo();
addDynamicRoutes(permissions);
router.push('/'); // 跳转到首页
```



**注意**：动态路由添加后，可能需要手动调用 `router.replace` 刷新当前路由，或者配合菜单生成。

------

## 4. 路由懒加载如何实现？有什么好处？

**路由懒加载**：将不同路由对应的组件分割成独立的代码块，只有在访问该路由时才加载对应的组件，从而减少首屏加载的 JavaScript 体积。

**实现方式**：使用动态导入 `import()` 语法，结合 Webpack 或 Vite 的代码分割功能。

**示例**：

javascript

```javascript
const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue') // 懒加载
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue')
  }
];
```



**配合魔法注释**（Webpack）指定 chunk 名称：

javascript

```javascript
component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
```



**好处**：

- **减少首屏加载时间**：只加载当前页面所需的代码，其他页面按需加载。
- **降低资源占用**：用户不会一次性下载所有页面代码，节省带宽。
- **优化性能指标**：如 FCP、LCP 等会显著改善。
- **提高用户体验**：配合加载指示器（如 loading 动画），让用户感知到加载过程。

**项目实践**：

- 在“千源百荟官网”中，所有页面都使用路由懒加载，首屏只加载首页组件，其他页面（如新闻详情、加盟介绍）按需加载。
- 在“铅蛋回收 SaaS 后台”中，动态路由也是懒加载，且结合权限过滤，确保用户只加载其有权访问的页面代码。

------

## 5. 如何监听路由参数变化？有哪些方式？

在 Vue 组件中，当路由参数变化（如从 `/user/1` 到 `/user/2`）但组件被复用时，需要监听参数变化以重新获取数据。常用方式：

1. **使用 `watch` 监听 `$route` 对象**（选项式 API）：

   javascript

   ```javascript
   watch: {
     '$route'(to, from) {
       // 参数变化时重新获取数据
       this.fetchData(to.params.id);
     }
   }
   ```

   

2. **使用 `beforeRouteUpdate` 守卫**（组件内守卫）：

   javascript

   ```javascript
   beforeRouteUpdate(to, from, next) {
     this.fetchData(to.params.id);
     next();
   }
   ```

   

3. **在组合式 API 中使用 `watch` 监听 `route` 对象**：

   javascript

   ```javascript
   import { useRoute } from 'vue-router';
   import { watch } from 'vue';
   
   setup() {
     const route = useRoute();
     watch(() => route.params.id, (newId) => {
       fetchData(newId);
     }, { immediate: true });
   }
   ```

   

4. **使用 `onBeforeRouteUpdate` 组合式函数**（Vue Router 4）：

   javascript

   ```javascript
   import { onBeforeRouteUpdate } from 'vue-router';
   
   onBeforeRouteUpdate((to, from) => {
     fetchData(to.params.id);
   });
   ```

   

5. **利用 key 强制组件重新渲染**（不推荐，但可用于简单场景）：

   vue

   ```vue
   <router-view :key="$route.fullPath" />
   ```

   

   这样路由变化时组件会完全销毁重建，但会失去组件内部状态，性能也较差。

**项目实践**：在“铅蛋回收小程序”的订单详情页，我们使用 `watch` 监听 `route.params.id` 变化，当用户在订单列表切换不同订单时，重新拉取新订单数据，同时保留页面 UI 状态（如评论 tab 位置）。

------

## 6. 路由传参的几种方式及区别？

Vue Router 提供了多种传参方式，各有适用场景：

| 方式                   | 语法                                                         | URL 示例       | 特点                                                |
| :--------------------- | :----------------------------------------------------------- | :------------- | :-------------------------------------------------- |
| **动态路由匹配**       | 路由定义：`/user/:id`；跳转：`/user/123`；获取：`$route.params.id` | `/user/123`    | 参数直接体现在 URL 路径中，SEO 友好，适合资源标识符 |
| **查询参数（query）**  | 跳转：`/user?id=123`；获取：`$route.query.id`                | `/user?id=123` | 类似 GET 请求的 query，适合可选参数、过滤条件       |
| **路由 props 传参**    | 路由配置：`props: true`；组件通过 props 接收参数             | `/user/123`    | 将 `params` 作为组件 props 传入，组件更解耦         |
| **命名视图配合 props** | 可针对每个视图设置 props 函数                                | -              | 灵活，但较少用                                      |
| **通过 state 传递**    | 编程式导航：`router.push({ name: 'user', params: { id: 1 }, state: { from: 'list' } })` | 不体现在 URL   | 仅在当前会话有效，刷新页面丢失，适合临时状态        |

**区别总结**：

- **动态路由参数**：URL 的一部分，必须定义在路由路径中，刷新页面后参数仍然存在。
- **查询参数**：URL 的 `?` 后，可以随意添加，适合多个可选参数，刷新后保留。
- **props 传参**：将参数解耦为 props，便于组件复用和测试。
- **state**：存储在 history 状态中，刷新丢失，适合页面间传递临时数据（如来源页面）。

**项目实例**：

- 在订单详情页，我们使用动态路由 `/order/:id`，这样 URL 清晰，且刷新页面仍能获取订单 ID。
- 在商品列表页，筛选条件使用 query 参数，如 `/products?category=phone&page=1`，便于分享和书签保存筛选状态。
- 在新增/编辑页面，使用 state 传递来源信息，如 `router.push({ name: 'user-edit', params: { id: 1 }, state: { from: 'list' } })`，在编辑页可根据 state 决定保存后返回列表还是详情页。

**获取参数示例**（组合式 API）：

javascript

```javascript
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.id, route.query.page);
```



------

## 7. 如何解决路由重复点击报错的问题？

**问题**：在 Vue Router 中，如果重复点击当前路由（或点击相同路由），会在控制台报错：“Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location”。这是因为 Vue Router 3.x 开始，所有导航（包括重复导航）都返回 Promise，重复导航会触发 Promise reject。

**解决方案**：

1. **全局捕获错误**（最简单）：

   javascript

   ```javascript
   import router from './router';
   router.onError((error) => {
     if (error.message.includes('Avoided redundant navigation')) {
       // 忽略重复导航错误
       return;
     }
     // 其他错误处理
   });
   ```

   

   或者在每个 `router.push` 后加 `.catch`：

   javascript

   ```javascript
   router.push('/some').catch(err => err);
   ```

   

2. **重写 push 和 replace 方法**（全局统一处理）：

   javascript

   ```javascript
   // router/index.js
   const originalPush = Router.prototype.push;
   Router.prototype.push = function push(location) {
     return originalPush.call(this, location).catch(err => err);
   };
   const originalReplace = Router.prototype.replace;
   Router.prototype.replace = function replace(location) {
     return originalReplace.call(this, location).catch(err => err);
   };
   ```

   

   对于 Vue Router 4（类式），可以类似处理：

   javascript

   ```javascript
   const router = createRouter({ ... });
   const originalPush = router.push;
   router.push = function (to) {
     return originalPush.call(this, to).catch((err) => {
       if (err.name !== 'NavigationDuplicated') throw err;
     });
   };
   ```

   

3. **检查目标路由与当前路由是否相同**（手动避免）：

   javascript

   ```javascript
   function navigate(to) {
     if (to === router.currentRoute.value.fullPath) return;
     router.push(to);
   }
   ```

   

   或在组件中使用：

   javascript

   ```javascript
   const goTo = (path) => {
     if (path !== route.fullPath) {
       router.push(path);
     }
   };
   ```

   

4. **使用 Vue Router 4 的 `router.resolve` 结合 `router.currentRoute` 判断**。

**项目实践**：在“千源百荟官网”中，我们采用了**重写 push 方法**的方式，统一在路由配置文件中处理，避免了在每个调用处写 catch 的冗余代码。同时，在菜单组件中，我们添加了激活状态判断，避免用户重复点击当前激活的菜单项，从源头减少重复导航。

# 四、Vue Router 详细解答

------

## 1. Vue Router 的两种模式（hash 和 history）区别？你在项目中如何配置？

**两种模式的区别**：

| 特性           | Hash 模式                                                    | History 模式                                                 |
| :------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **原理**       | 使用 URL 的 hash（`#`）部分模拟完整 URL，hash 变化不会导致浏览器向服务器发送请求，通过监听 `hashchange` 事件实现路由切换 | 利用 HTML5 History API（`pushState`、`replaceState`）修改浏览器历史记录，URL 看起来像标准路径，但需要服务器配置支持 |
| **URL 示例**   | `https://example.com/#/home`                                 | `https://example.com/home`                                   |
| **服务器配置** | 无需特殊配置，任何路径返回 `index.html` 即可                 | 需要配置服务器所有路由都指向 `index.html`（防止刷新 404）    |
| **SEO 友好**   | 差，爬虫通常忽略 `#` 后的内容                                | 较好，但单页应用仍需 SSR 或预渲染才能更好支持 SEO            |
| **兼容性**     | 支持所有浏览器                                               | 支持 IE10+ 及现代浏览器                                      |

**项目中如何配置**：

- 在“千源百荟官网”中，由于需要更好的 SEO 和 URL 美观，我们选择了 **History 模式**，并在 Nginx 中配置了 try_files 规则：

  nginx

  ```nginx
  location / {
    try_files $uri $uri/ /index.html;
  }
  ```

  

- 在“铅蛋回收小程序”中，由于小程序环境不支持 History 模式，uni-app 默认使用 hash 模式，但实际小程序路由由原生导航管理，不存在此问题。

- 在“SaaS 管理后台”中，考虑到部署简便，使用了 **Hash 模式**，因为后台系统不关注 SEO，且部署在任何静态服务器上都无需配置。

**配置代码**（Vue Router 4）：

javascript

```javascript
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(), // 或 createWebHashHistory()
  routes: [...]
});
```



------

## 2. 如何实现路由守卫？你在权限控制中如何应用？

**Vue Router 提供了三种类型的守卫**：

1. **全局守卫**：
   - `router.beforeEach`：全局前置守卫，路由跳转前触发。
   - `router.beforeResolve`：全局解析守卫，在所有组件内守卫和异步路由组件解析后调用。
   - `router.afterEach`：全局后置钩子，跳转完成后触发。
2. **路由独享守卫**：在路由配置中定义 `beforeEnter`。
3. **组件内守卫**：
   - `beforeRouteEnter`：进入组件前调用（不能访问组件实例 `this`）。
   - `beforeRouteUpdate`：路由参数变化但组件复用时调用。
   - `beforeRouteLeave`：离开组件前调用。

**权限控制中的应用**：

在“铅蛋回收 SaaS 后台”中，我们使用全局前置守卫实现权限控制：

javascript

```javascript
// router/index.js
import { useUserStore } from '@/stores/user';

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const token = userStore.token;

  // 白名单：不需要登录的页面
  const whiteList = ['/login', '/403', '/404'];

  if (token) {
    // 已登录
    if (to.path === '/login') {
      next('/'); // 已登录跳转到首页
    } else {
      // 检查是否有权限访问该路由
      const hasPermission = checkPermission(to.meta.permissions);
      if (hasPermission) {
        next();
      } else {
        next('/403');
      }
    }
  } else {
    // 未登录
    if (whiteList.includes(to.path)) {
      next(); // 白名单直接进入
    } else {
      next(`/login?redirect=${to.fullPath}`); // 重定向到登录页，并记录原路径
    }
  }
});
```



此外，我们还在动态路由加载后使用 `router.addRoute` 添加权限路由，并在用户退出时重置路由。

**组件内守卫示例**：在表单编辑页，防止用户未保存离开。

javascript

```javascript
beforeRouteLeave(to, from, next) {
  if (formDirty.value) {
    const answer = confirm('有未保存的更改，确定离开吗？');
    if (answer) next();
    else next(false);
  } else {
    next();
  }
}
```



------

## 3. 什么是动态路由？如何根据用户角色添加路由？

**动态路由**：指在应用运行时根据用户权限、角色等条件动态添加的路由。常用于后台管理系统的权限控制，不同角色看到不同的菜单和可访问页面。

**实现步骤**：

1. **定义基础路由**：所有用户都能访问的路由（如登录页、404）。
2. **定义权限路由配置**：通常在后端返回的权限数据基础上，前端定义可添加的路由模板。
3. **登录成功后获取用户权限**：从后端获取角色、权限列表。
4. **根据权限过滤生成可访问路由**：使用 `router.addRoute` 动态添加。

**项目实践**（铅蛋回收 SaaS 后台）：

javascript

```javascript
// router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';

// 静态路由（无需权限）
export const constantRoutes = [
  { path: '/login', component: () => import('@/views/login/index.vue') },
  { path: '/403', component: () => import('@/views/error/403.vue') },
  { path: '/404', component: () => import('@/views/error/404.vue') },
  { path: '/', redirect: '/dashboard' }
];

// 动态路由模板（需要权限过滤）
export const asyncRoutes = [
  {
    path: '/dashboard',
    component: () => import('@/layouts/index.vue'),
    children: [
      { path: '', component: () => import('@/views/dashboard/index.vue'), meta: { permissions: ['dashboard:view'] } }
    ]
  },
  {
    path: '/user',
    component: () => import('@/layouts/index.vue'),
    meta: { permissions: ['user:manage'] },
    children: [
      { path: 'list', component: () => import('@/views/user/list.vue'), meta: { permissions: ['user:view'] } },
      { path: 'add', component: () => import('@/views/user/add.vue'), meta: { permissions: ['user:create'] } }
    ]
  }
  // ... 更多路由
];

// 创建路由实例（仅包含静态路由）
const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
});

// 动态添加路由的方法
export function addDynamicRoutes(permissions) {
  // 根据权限过滤 asyncRoutes
  const accessibleRoutes = filterRoutes(asyncRoutes, permissions);
  accessibleRoutes.forEach(route => {
    router.addRoute(route); // 添加一级路由
  });
  // 最后添加 404 通配路由（放在最后，避免覆盖）
  router.addRoute({ path: '/:pathMatch(.*)*', redirect: '/404' });
}

// 过滤函数：递归过滤不符合权限的路由
function filterRoutes(routes, permissions) {
  return routes.filter(route => {
    if (route.meta?.permissions) {
      // 检查当前路由是否有权限
      const hasPermission = route.meta.permissions.some(p => permissions.includes(p));
      if (!hasPermission) return false;
    }
    if (route.children) {
      route.children = filterRoutes(route.children, permissions);
    }
    return true;
  });
}
```



**登录后调用**：

javascript

```javascript
// login success
const { permissions } = await userStore.getUserInfo();
addDynamicRoutes(permissions);
router.push('/'); // 跳转到首页
```



**注意**：动态路由添加后，可能需要手动调用 `router.replace` 刷新当前路由，或者配合菜单生成。

------

## 4. 路由懒加载如何实现？有什么好处？

**路由懒加载**：将不同路由对应的组件分割成独立的代码块，只有在访问该路由时才加载对应的组件，从而减少首屏加载的 JavaScript 体积。

**实现方式**：使用动态导入 `import()` 语法，结合 Webpack 或 Vite 的代码分割功能。

**示例**：

javascript

```javascript
const routes = [
  {
    path: '/home',
    component: () => import('@/views/Home.vue') // 懒加载
  },
  {
    path: '/about',
    component: () => import('@/views/About.vue')
  }
];
```



**配合魔法注释**（Webpack）指定 chunk 名称：

javascript

```javascript
component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue')
```



**好处**：

- **减少首屏加载时间**：只加载当前页面所需的代码，其他页面按需加载。
- **降低资源占用**：用户不会一次性下载所有页面代码，节省带宽。
- **优化性能指标**：如 FCP、LCP 等会显著改善。
- **提高用户体验**：配合加载指示器（如 loading 动画），让用户感知到加载过程。

**项目实践**：

- 在“千源百荟官网”中，所有页面都使用路由懒加载，首屏只加载首页组件，其他页面（如新闻详情、加盟介绍）按需加载。
- 在“铅蛋回收 SaaS 后台”中，动态路由也是懒加载，且结合权限过滤，确保用户只加载其有权访问的页面代码。

------

## 5. 如何监听路由参数变化？有哪些方式？

在 Vue 组件中，当路由参数变化（如从 `/user/1` 到 `/user/2`）但组件被复用时，需要监听参数变化以重新获取数据。常用方式：

1. **使用 `watch` 监听 `$route` 对象**（选项式 API）：

   javascript

   ```javascript
   watch: {
     '$route'(to, from) {
       // 参数变化时重新获取数据
       this.fetchData(to.params.id);
     }
   }
   ```

   

2. **使用 `beforeRouteUpdate` 守卫**（组件内守卫）：

   javascript

   ```javascript
   beforeRouteUpdate(to, from, next) {
     this.fetchData(to.params.id);
     next();
   }
   ```

   

3. **在组合式 API 中使用 `watch` 监听 `route` 对象**：

   javascript

   ```javascript
   import { useRoute } from 'vue-router';
   import { watch } from 'vue';
   
   setup() {
     const route = useRoute();
     watch(() => route.params.id, (newId) => {
       fetchData(newId);
     }, { immediate: true });
   }
   ```

   

4. **使用 `onBeforeRouteUpdate` 组合式函数**（Vue Router 4）：

   javascript

   ```javascript
   import { onBeforeRouteUpdate } from 'vue-router';
   
   onBeforeRouteUpdate((to, from) => {
     fetchData(to.params.id);
   });
   ```

   

5. **利用 key 强制组件重新渲染**（不推荐，但可用于简单场景）：

   vue

   ```vue
   <router-view :key="$route.fullPath" />
   ```

   

   这样路由变化时组件会完全销毁重建，但会失去组件内部状态，性能也较差。

**项目实践**：在“铅蛋回收小程序”的订单详情页，我们使用 `watch` 监听 `route.params.id` 变化，当用户在订单列表切换不同订单时，重新拉取新订单数据，同时保留页面 UI 状态（如评论 tab 位置）。

------

## 6. 路由传参的几种方式及区别？

Vue Router 提供了多种传参方式，各有适用场景：

| 方式                   | 语法                                                         | URL 示例       | 特点                                                |
| :--------------------- | :----------------------------------------------------------- | :------------- | :-------------------------------------------------- |
| **动态路由匹配**       | 路由定义：`/user/:id`；跳转：`/user/123`；获取：`$route.params.id` | `/user/123`    | 参数直接体现在 URL 路径中，SEO 友好，适合资源标识符 |
| **查询参数（query）**  | 跳转：`/user?id=123`；获取：`$route.query.id`                | `/user?id=123` | 类似 GET 请求的 query，适合可选参数、过滤条件       |
| **路由 props 传参**    | 路由配置：`props: true`；组件通过 props 接收参数             | `/user/123`    | 将 `params` 作为组件 props 传入，组件更解耦         |
| **命名视图配合 props** | 可针对每个视图设置 props 函数                                | -              | 灵活，但较少用                                      |
| **通过 state 传递**    | 编程式导航：`router.push({ name: 'user', params: { id: 1 }, state: { from: 'list' } })` | 不体现在 URL   | 仅在当前会话有效，刷新页面丢失，适合临时状态        |

**区别总结**：

- **动态路由参数**：URL 的一部分，必须定义在路由路径中，刷新页面后参数仍然存在。
- **查询参数**：URL 的 `?` 后，可以随意添加，适合多个可选参数，刷新后保留。
- **props 传参**：将参数解耦为 props，便于组件复用和测试。
- **state**：存储在 history 状态中，刷新丢失，适合页面间传递临时数据（如来源页面）。

**项目实例**：

- 在订单详情页，我们使用动态路由 `/order/:id`，这样 URL 清晰，且刷新页面仍能获取订单 ID。
- 在商品列表页，筛选条件使用 query 参数，如 `/products?category=phone&page=1`，便于分享和书签保存筛选状态。
- 在新增/编辑页面，使用 state 传递来源信息，如 `router.push({ name: 'user-edit', params: { id: 1 }, state: { from: 'list' } })`，在编辑页可根据 state 决定保存后返回列表还是详情页。

**获取参数示例**（组合式 API）：

javascript

```javascript
import { useRoute } from 'vue-router';
const route = useRoute();
console.log(route.params.id, route.query.page);
```



------

## 7. 如何解决路由重复点击报错的问题？

**问题**：在 Vue Router 中，如果重复点击当前路由（或点击相同路由），会在控制台报错：“Uncaught (in promise) NavigationDuplicated: Avoided redundant navigation to current location”。这是因为 Vue Router 3.x 开始，所有导航（包括重复导航）都返回 Promise，重复导航会触发 Promise reject。

**解决方案**：

1. **全局捕获错误**（最简单）：

   javascript

   ```javascript
   import router from './router';
   router.onError((error) => {
     if (error.message.includes('Avoided redundant navigation')) {
       // 忽略重复导航错误
       return;
     }
     // 其他错误处理
   });
   ```

   

   或者在每个 `router.push` 后加 `.catch`：

   javascript

   ```javascript
   router.push('/some').catch(err => err);
   ```

   

2. **重写 push 和 replace 方法**（全局统一处理）：

   javascript

   ```javascript
   // router/index.js
   const originalPush = Router.prototype.push;
   Router.prototype.push = function push(location) {
     return originalPush.call(this, location).catch(err => err);
   };
   const originalReplace = Router.prototype.replace;
   Router.prototype.replace = function replace(location) {
     return originalReplace.call(this, location).catch(err => err);
   };
   ```

   

   对于 Vue Router 4（类式），可以类似处理：

   javascript

   ```javascript
   const router = createRouter({ ... });
   const originalPush = router.push;
   router.push = function (to) {
     return originalPush.call(this, to).catch((err) => {
       if (err.name !== 'NavigationDuplicated') throw err;
     });
   };
   ```

   

3. **检查目标路由与当前路由是否相同**（手动避免）：

   javascript

   ```javascript
   function navigate(to) {
     if (to === router.currentRoute.value.fullPath) return;
     router.push(to);
   }
   ```

   

   或在组件中使用：

   javascript

   ```javascript
   const goTo = (path) => {
     if (path !== route.fullPath) {
       router.push(path);
     }
   };
   ```

   

4. **使用 Vue Router 4 的 `router.resolve` 结合 `router.currentRoute` 判断**。

**项目实践**：在“千源百荟官网”中，我们采用了**重写 push 方法**的方式，统一在路由配置文件中处理，避免了在每个调用处写 catch 的冗余代码。同时，在菜单组件中，我们添加了激活状态判断，避免用户重复点击当前激活的菜单项，从源头减少重复导航。

# 五、状态管理（Vuex/Pinia）详细解答

------

## 1. Vuex 和 Pinia 的区别？你为什么选择 Pinia？

**Vuex 与 Pinia 的区别**：

| 维度                | Vuex 4 (Vue 3)                                               | Pinia                                                        |
| :------------------ | :----------------------------------------------------------- | :----------------------------------------------------------- |
| **设计理念**        | 集中式状态管理，单一 store，通过 modules 拆分                | 去中心化，多个独立的 store，每个 store 都是独立的模块        |
| **TypeScript 支持** | 需要额外类型声明，类型推断较弱                               | 天然 TypeScript 支持，类型推断强，无需额外类型体操           |
| **API 风格**        | 使用 `state`、`mutations`、`actions`、`getters`，变更状态必须通过 mutations（同步） | 移除了 mutations，直接修改 state，actions 支持同步和异步，更简洁 |
| **代码体积**        | 相对较大                                                     | 轻量，约 1kb，且支持 tree-shaking                            |
| **模块化**          | 使用 modules 嵌套，命名空间需手动开启                        | 每个 store 独立定义，天然模块化，无需命名空间                |
| **Devtools 支持**   | 支持                                                         | 支持更友好，时间旅行调试更清晰                               |
| **服务端渲染**      | 支持                                                         | 支持更简洁                                                   |
| **学习曲线**        | 概念较多（mutations、modules 等）                            | 更接近组合式 API，上手容易                                   |

**为什么选择 Pinia**：

在“千源百荟再生资源回收”项目和“铅蛋回收”新模块中，我们**选择 Pinia** 的原因如下：

1. **TypeScript 友好**：团队全面拥抱 TypeScript，Pinia 的类型推断几乎零成本，无需像 Vuex 那样手动声明 `state` 类型和辅助函数类型。
2. **API 简洁**：移除 mutations，可直接修改 state（`store.count++`），代码量减少，心智负担轻。同时支持 `$patch` 批量更新。
3. **模块化天然**：每个 store 独立，按功能拆分，避免 Vuex 中 modules 嵌套过深导致的命名空间混乱。
4. **组合式 API 风格**：Pinia 的设计与 Vue 3 组合式 API 一脉相承，可以像定义组合式函数一样定义 store，代码组织更灵活。
5. **开发体验**：Pinia 的 Devtools 支持更清晰，每个 store 独立显示，调试方便。
6. **性能**：Pinia 更轻量，且 tree-shaking 友好，只打包使用的 store。

**兼容性**：对于现有的 Vue 2 + Vuex 项目（如“铅蛋回收 SaaS 后台”早期版本），我们保留 Vuex，但新功能开发已迁移到 Pinia。

------

## 2. Pinia 的核心概念有哪些？如何定义 store？

**Pinia 的核心概念**：

- **Store**：一个保存状态和业务逻辑的实体，每个 store 都是一个独立的模块，通过 `defineStore` 定义。
- **State**：store 的数据源，类似组件的 `data`，必须是函数返回对象，以实现 SSR 状态隔离。
- **Getters**：类似于组件的计算属性，用于派生状态，可以访问当前 store 的 state 和其他 getters。
- **Actions**：类似于组件的方法，可以包含异步操作，通过 `this` 访问当前 store 实例，可以直接修改 state。
- **Plugins**：Pinia 支持插件扩展，例如实现持久化存储。

**定义 store 的语法**：

javascript

```javascript
// stores/counter.js
import { defineStore } from 'pinia'

// 选项式 API 风格（类似 Vuex）
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    name: 'Counter'
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    // 通过 this 访问其他 getter
    doubleCountPlusOne(): number {
      return this.doubleCount + 1
    }
  },
  actions: {
    increment() {
      this.count++ // 直接修改 state
    },
    async fetchAndSet() {
      const data = await api.getCount()
      this.count = data
    }
  }
})
```



javascript

```javascript
// 组合式 API 风格（类似 Composition API，更灵活）
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const name = ref('Counter')
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }
  async function fetchAndSet() {
    const data = await api.getCount()
    count.value = data
  }
  return { count, name, doubleCount, increment, fetchAndSet }
})
```



**项目实践**：在“千源百荟”项目中，我们采用**组合式 API 风格**定义 store，因为与 Vue 组件中的组合式 API 风格一致，且类型推导更自然。例如，用户 store：

javascript

```javascript
// stores/user.js
export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(null)
  const permissions = ref([])

  const isLoggedIn = computed(() => !!token.value)

  async function login(credentials) {
    const res = await api.login(credentials)
    token.value = res.token
    userInfo.value = res.user
    permissions.value = res.permissions
    localStorage.setItem('token', res.token)
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    permissions.value = []
    localStorage.removeItem('token')
  }

  return { token, userInfo, permissions, isLoggedIn, login, logout }
})
```



------

## 3. 如何在组件中使用 store 中的 state、getters、actions？

**在组件中使用 Pinia store**：

1. **引入并使用 store**：

   vue

   ```vue
   <script setup>
   import { useCounterStore } from '@/stores/counter'
   const counterStore = useCounterStore()
   </script>
   ```

   

2. **访问 state**：直接通过 store 实例的属性访问。

   vue

   ```vue
   <template>
     <div>{{ counterStore.count }}</div>
   </template>
   ```

   

3. **访问 getters**：与 state 相同，作为属性访问。

   vue

   ```vue
   <template>
     <div>{{ counterStore.doubleCount }}</div>
   </template>
   ```

   

4. **调用 actions**：作为方法调用。

   vue

   ```vue
   <button @click="counterStore.increment()">增加</button>
   ```

   

5. **解构 store 属性注意**：直接解构会失去响应式，需要使用 `storeToRefs`。

   vue

   ```vue
   <script setup>
   import { storeToRefs } from 'pinia'
   const counterStore = useCounterStore()
   const { count, doubleCount } = storeToRefs(counterStore) // 响应式
   const { increment } = counterStore // actions 可以直接解构
   </script>
   ```

   

6. **批量修改**：使用 `$patch` 同时修改多个 state。

   javascript

   ```javascript
   counterStore.$patch({
     count: counterStore.count + 1,
     name: 'New Name'
   })
   // 或传入函数
   counterStore.$patch((state) => {
     state.count++
     state.name = 'New Name'
   })
   ```

   

7. **重置 store**：调用 `$reset()` 将 state 重置为初始值（仅选项式 API 支持，组合式 API 需自行实现）。

**项目实例**：

在“铅蛋回收小程序”的订单列表页，我们使用订单 store：

vue

```javascript
<script setup>
import { useOrderStore } from '@/stores/order'
import { storeToRefs } from 'pinia'

const orderStore = useOrderStore()
const { orderList, loading, total } = storeToRefs(orderStore)
const { fetchOrders } = orderStore

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div v-loading="loading">
    <div v-for="order in orderList" :key="order.id">
      {{ order.orderNo }}
    </div>
  </div>
</template>
```



------

## 4. 如何实现持久化存储？你在项目中如何处理刷新后状态丢失？

**问题**：Pinia 的状态默认存储在内存中，刷新页面会丢失。常见的解决方案是将需要持久化的状态同步到 localStorage 或 sessionStorage。

**实现方式**：

1. **手动同步**：在 store 中监听变化，更新 localStorage。

   javascript

   ```javascript
   // stores/user.js
   export const useUserStore = defineStore('user', () => {
     const token = ref(localStorage.getItem('token') || '')
     watch(token, (val) => {
       if (val) localStorage.setItem('token', val)
       else localStorage.removeItem('token')
     })
     // ...
   })
   ```

   

2. **使用 Pinia 插件**：封装一个持久化插件，自动处理指定 store 的持久化。

   javascript

   ```javascript
   // plugins/persist.js
   export function persistPlugin({ store }) {
     const key = `pinia-${store.$id}`
     // 从 storage 恢复
     const savedState = localStorage.getItem(key)
     if (savedState) {
       store.$patch(JSON.parse(savedState))
     }
     // 订阅变化
     store.$subscribe((mutation, state) => {
       localStorage.setItem(key, JSON.stringify(state))
     }, { detached: true }) // detached 为 true 使订阅在 store 销毁后仍然有效
   }
   ```

   

   然后在 main.js 中应用插件：

   javascript

   ```javascript
   import { createPinia } from 'pinia'
   const pinia = createPinia()
   pinia.use(persistPlugin)
   ```

   

3. **使用第三方库**：如 `pinia-plugin-persistedstate`，配置更简单。

   javascript

   ```javascript
   import { createPinia } from 'pinia'
   import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
   
   const pinia = createPinia()
   pinia.use(piniaPluginPersistedstate)
   
   // store 中开启持久化
   export const useUserStore = defineStore('user', {
     state: () => ({ token: '' }),
     persist: true // 或配置 storage 等
   })
   ```

   

**项目实践**：

在“千源百荟”项目中，我们需要持久化用户 token、主题设置等。我们选择了 `pinia-plugin-persistedstate`，因为它配置简单，且支持选择性持久化。在用户 store 中开启持久化：

javascript

```javascript
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    userInfo: null
  }),
  persist: {
    key: 'user-store',        // 自定义存储 key
    storage: localStorage,     // 存储方式
    paths: ['token']           // 只持久化 token，userInfo 每次刷新重新获取
  }
})
```



对于订单列表等不需要持久化的数据，则不开启，保证数据实时性。

**注意事项**：

- 敏感信息（如 token）建议加密存储，或使用 httpOnly cookie。
- 持久化数据体积不宜过大，避免影响存储性能。
- 考虑 SSR 场景时，需判断是否在浏览器环境。

------

## 5. 如何处理模块间的状态共享？在 Pinia 中如何组织多个 store？

**Pinia 的模块化**：Pinia 天然支持多 store，每个 store 独立，通过组合 store 实现状态共享，无需像 Vuex 那样嵌套 modules。

**状态共享方式**：

1. **在一个 store 中导入另一个 store**：

   javascript

   ```javascript
   // stores/cart.js
   import { useUserStore } from './user'
   
   export const useCartStore = defineStore('cart', {
     state: () => ({ items: [] }),
     getters: {
       totalPrice: (state) => state.items.reduce(...),
       // 依赖 user store 中的登录状态
       canCheckout: (state) => {
         const userStore = useUserStore()
         return userStore.isLoggedIn && state.items.length > 0
       }
     },
     actions: {
       async checkout() {
         const userStore = useUserStore()
         if (!userStore.isLoggedIn) throw new Error('请先登录')
         // 发起结算请求
       }
     }
   })
   ```

   

2. **在组件中同时使用多个 store**：

   vue

   ```vue
   <script setup>
   import { useUserStore } from '@/stores/user'
   import { useCartStore } from '@/stores/cart'
   const userStore = useUserStore()
   const cartStore = useCartStore()
   </script>
   ```

   

3. **共享响应式状态**：如果需要多个 store 共享同一个响应式数据，可以创建一个独立的“共享” store，其他 store 引用它。

**组织多个 store**：我们通常按业务模块划分 store，如：

- `user.js`：用户信息、权限、登录状态
- `order.js`：订单列表、当前订单详情
- `cart.js`：购物车
- `app.js`：应用全局配置（主题、语言、侧边栏折叠状态）
- `permission.js`：权限路由相关（可选，可合并到 user）

在“铅蛋回收 SaaS 后台”中，我们有 `user`、`order`、`customer`、`statistics` 等多个 store，它们之间通过导入使用，清晰且解耦。

**与 Vuex modules 对比**：Vuex 中 modules 是嵌套的，访问跨模块状态需要 `rootState`，且命名空间易混淆。Pinia 的扁平结构更简单，每个 store 都是独立的，通过导入即可访问，符合直觉。

------

## 6. 你在项目中如何设计 store 的结构？有遇到状态管理混乱的问题吗？如何解决？

**store 结构设计原则**：

1. **按业务模块拆分**：每个独立的业务领域对应一个 store，如用户、订单、商品、应用配置。
2. **单一职责**：每个 store 只负责与其业务相关状态和逻辑，避免大而全的“上帝 store”。
3. **共享状态最小化**：避免将组件私有状态放入全局 store，只存放跨组件/页面共享的状态。
4. **state 尽量扁平化**：避免深层嵌套，便于维护和持久化。
5. **getters 用于派生状态**：避免在组件中重复计算。
6. **actions 处理异步和复杂逻辑**：保持组件简洁。

**项目中的 store 设计示例**（铅蛋回收小程序）：

text

```text
stores/
  ├── index.js            # 统一导出
  ├── user.js             # 用户信息、token、权限
  ├── order.js            # 订单列表、当前订单、订单操作
  ├── cart.js             # 购物车项、结算信息
  ├── address.js          # 地址管理
  ├── app.js              # 应用配置（主题、语言、首次打开标志）
  └── common.js           # 通用数据（省市区、分类等）
```



**遇到的状态管理混乱问题及解决**：

- **问题1：store 之间循环依赖**
  例如 `user` store 依赖 `order` store 的某个 getter，而 `order` 又依赖 `user`。解决方法是审视设计，将共同依赖抽离到第三个 store，或使用组合式函数（hook）代替。
- **问题2：某个 store 变得臃肿，包含多个不相关的模块**
  例如早期 `user` store 中包含了权限路由数据，导致维护困难。解决：拆分为 `user` 和 `permission` 两个 store，各司其职。
- **问题3：组件中直接修改多个 store 的状态，导致逻辑分散**
  解决：将复杂业务逻辑封装到 store 的 actions 中，组件只负责调用 action 和渲染。例如提交订单时，需要同时更新订单 store 和清空购物车，我们在 `order` store 的 `submitOrder` action 中调用 `cartStore.clearCart()`，保持逻辑内聚。
- **问题4：状态更新后视图未响应**
  排查是否使用了非响应式数据（如直接解构丢失响应式），使用 `storeToRefs` 解决。
- **问题5：持久化数据过大导致性能问题**
  限制持久化字段，只持久化必要数据，或使用 sessionStorage 减少持久化范围。

**代码规范**：团队内部约定：

- 所有 store 文件命名以 `use` 开头，如 `useUserStore`。
- state 使用 `ref` 或 `reactive`（组合式风格）定义。
- actions 命名使用动词短语，如 `fetchOrders`、`updateUserInfo`。
- 避免在 store 外直接修改 state，必须通过 actions。

------

## 7. 如何调试状态管理？用过 Vue Devtools 吗？

**调试状态管理**：

1. **Vue Devtools**：支持 Vuex 和 Pinia 的调试，是主要工具。

   - **时间旅行**：可以查看状态变化历史，跳转到任意历史状态，帮助定位 bug。
   - **状态快照**：实时查看当前所有 store 的状态。
   - **事件追踪**：查看 mutation/action 的调用栈和参数。

2. **Pinia 的 Devtools 特性**：

   - 每个 store 独立显示，清晰区分。
   - 支持直接编辑 state（方便测试）。
   - 可以触发 actions 进行调试。

3. **日志插件**：在开发环境下，可以添加 Pinia 插件记录每次状态变更。

   javascript

   ```javascript
   pinia.use(({ store }) => {
     store.$subscribe((mutation, state) => {
       console.log(`[${store.$id}]`, mutation, state)
     })
   })
   ```

   

4. **浏览器扩展**：搭配 Vue.js devtools 扩展使用，可查看 Vue 组件和状态树。

**项目实践**：

在“铅蛋回收”项目开发中，我们重度使用 **Vue Devtools** 进行状态调试：

- 当订单列表数据不符合预期时，打开 Devtools 的 Pinia 标签，查看 `order` store 的当前状态，确认接口返回是否正确。
- 使用时间旅行回到某个操作前的状态，重现 bug 场景。
- 在 action 调用时，查看传入参数和返回结果。

此外，我们在开发环境配置了 Pinia 的日志插件，记录所有状态变更，方便追踪问题：

javascript

```javascript
// main.js
if (process.env.NODE_ENV === 'development') {
  pinia.use(({ store }) => {
    store.$subscribe((mutation, state) => {
      console.group(`🍍 ${store.$id} 状态变更`)
      console.log('类型:', mutation.type)
      console.log('事件:', mutation.events)
      console.log('新状态:', state)
      console.groupEnd()
    })
  })
}
```



**调试技巧**：

- 使用 `store.$state` 获取原始状态对象。
- 利用 `store.$onAction` 监听 action 调用（可全局监听或针对单个 store）。
- 结合断点调试，在 action 中添加 `debugger` 语句。

# 六、跨端与小程序开发 - 微信/支付宝小程序 详细解答

------

## 1. 微信小程序和支付宝小程序的主要差异？你在开发中如何适配？

**主要差异**：

| 维度         | 微信小程序                                                   | 支付宝小程序                                                 | 适配策略                                                   |
| :----------- | :----------------------------------------------------------- | :----------------------------------------------------------- | :--------------------------------------------------------- |
| **开发工具** | 微信开发者工具                                               | 支付宝小程序开发者工具                                       | 使用 uni-app 开发，一套代码多端编译，无需分别维护          |
| **项目结构** | 全局配置 `app.json`，页面配置 `index.json`                   | 全局配置 `app.json`，页面配置 `.axml` 样式 `.acss`           | uni-app 统一为 `pages.json` 和 `.vue` 文件，编译时自动转换 |
| **API 命名** | `wx.xxx`                                                     | `my.xxx`                                                     | uni-app 封装为 `uni.xxx`，差异部分用条件编译               |
| **登录**     | `wx.login` 获取 code，`wx.getUserProfile` 获取用户信息       | `my.getAuthCode` 获取 authCode，`my.getOpenUserInfo` 获取用户信息 | 封装统一登录函数，内部条件编译                             |
| **支付**     | 参数：`timeStamp`、`nonceStr`、`package`、`signType`、`paySign` | 参数：`orderInfo`（拼接字符串）或 `tradeNO`                  | 封装统一支付函数，根据平台组装不同参数                     |
| **地图**     | `wx.chooseLocation`、`wx.getLocation`                        | `my.chooseLocation`、`my.getLocation`，返回字段略有差异      | 使用 uni 封装 API，对返回字段做统一处理                    |
| **授权**     | 通过 `<button open-type="...">` 触发授权                     | 通过 `my.getAuthCode` 或 `my.getOpenUserInfo` 等             | 封装授权组件，内部条件编译处理不同平台的授权方式           |
| **路由**     | `wx.navigateTo` 等，页面栈最多 10 层                         | 类似，但支持 `my.navigateTo`                                 | uni-app 统一为 `uni.navigateTo`                            |
| **生命周期** | `onLoad`、`onShow` 等                                        | 基本相同                                                     | 无差异，直接使用 uni-app 生命周期                          |
| **分包**     | 支持分包，主包 2M，总包 20M                                  | 支持分包，主包 2M，总包 8M（不同版本可能变化）               | 合理划分分包，注意支付宝总包限制更小                       |
| **组件差异** | `picker` 等组件样式和行为略有不同                            | 某些组件属性不同                                             | 使用基础组件，避免依赖平台特有属性，必要时条件编译         |
| **发布审核** | 微信审核较严格，需符合《微信小程序平台运营规范》             | 支付宝审核也严格，但标准略有差异                             | 熟悉双方规范，测试时全面覆盖                               |

**项目中的适配实践**：

在“铅蛋回收多端小程序”中，我们使用 **uni-app** 开发，通过以下方式适配两端：

- **统一 API 调用**：绝大多数场景使用 `uni.` 前缀 API，如 `uni.request`、`uni.login`、`uni.requestPayment`，uni-app 已处理底层差异。

- **条件编译处理差异 API**：对于无法统一的场景（如支付参数、获取用户信息），使用 `#ifdef` 编写平台特定代码。

  javascript

  ```
  // 登录示例
  function login() {
    return new Promise((resolve, reject) => {
      uni.login({
        success: (res) => {
          // #ifdef MP-WEIXIN
          resolve({ code: res.code, platform: 'weixin' });
          // #endif
          // #ifdef MP-ALIPAY
          resolve({ authCode: res.authCode, platform: 'alipay' });
          // #endif
        },
        fail: reject
      });
    });
  }
  ```

  

- **封装平台工具库**：将平台差异 API 封装成统一函数，如 `getLocation` 内部对支付宝返回的经纬度字段进行标准化。

- **样式适配**：使用 Flex 布局为主，避免依赖平台特有样式。对于必须差异化的样式（如按钮颜色），使用条件编译或在 CSS 中通过类名覆盖。

- **真机测试**：每次发布前，分别在微信和支付宝开发者工具模拟器以及真机上测试核心流程，确保功能一致。

------

## 2. 小程序登录流程是怎样的？如何实现无感登录？

**小程序登录流程**（以微信为例）：

1. 前端调用 `wx.login` 获取临时 code（有效期 5 分钟）。
2. 前端将 code 发送到后端服务器。
3. 后端使用 code + appid + secret 调用微信接口获取 `openid` 和 `session_key`。
4. 后端生成自定义登录态（如 token），返回给前端。
5. 前端存储 token，后续请求携带 token 作为身份凭证。

**支付宝小程序类似**：`my.getAuthCode` 获取 auth_code，后端换取用户信息。

**无感登录**：指用户进入小程序时，无需手动点击登录按钮，自动使用已有 token 或静默登录。实现方式：

- **方案一：token 自动续期**
  1. 用户首次登录后，前端将 token 存入 `storage`。
  2. 下次打开小程序时，在 `App.onLaunch` 或首页 `onLoad` 中检查 storage 是否有 token。
  3. 如果有 token，携带 token 调用后端接口验证有效性（如获取用户信息）。
  4. 如果 token 有效，则自动登录成功；如果 token 过期，后端返回特定错误码，前端调用刷新 token 接口（如果有 refresh token）或静默调用 `login` 重新获取 code 换取新 token。
  5. 如果 token 无效或过期且无法刷新，则跳转到登录页让用户手动登录。
- **方案二：静默登录（无需用户授权）**
  1. 打开小程序时，直接调用 `uni.login` 获取 code。
  2. 将 code 发送后端，后端通过 code 换取 openid，并判断该用户是否已注册。
  3. 如果已注册，直接生成 token 返回，前端自动登录成功（用户无感知）。
  4. 如果未注册，则跳转到注册/授权页，引导用户补充信息（如手机号、头像等）。

**注意**：静默登录只能获取 openid，无法获取用户头像昵称等个人信息，因此适用于仅需 openid 的场景。如果需要用户信息，仍需用户主动授权。

**项目实践**：

在“铅蛋回收”小程序中，我们实现了以下无感登录流程：

1. 在 `App.vue` 的 `onLaunch` 中，检查 `storage` 中的 token。
   - 如果有 token，调用 `userStore.checkToken()` 验证有效性。
   - 如果有效，自动登录成功。
   - 如果无效（后端返回 401），则调用 `refreshToken` 或重新静默登录。
2. 静默登录：在 `checkToken` 失败时，调用 `uni.login` 获取 code，发送后端。后端如果返回用户已存在，则直接下发新 token；如果用户不存在，则跳转到登录页（仅需用户授权手机号，头像可选）。

这样，老用户打开小程序基本无感知，新用户也只需一次授权。

**关键代码**（简化）：

javascript

```
// stores/user.js
async function silentLogin() {
  const { code } = await uni.login();
  const res = await api.silentLogin({ code });
  if (res.needRegister) {
    // 需要注册，跳转授权页
    uni.navigateTo({ url: '/pages/auth/index' });
  } else {
    // 登录成功，保存 token
    token.value = res.token;
    userInfo.value = res.userInfo;
    // 存储 token
    uni.setStorageSync('token', res.token);
  }
}
```



------

## 3. 小程序支付流程？如何处理支付结果回调？

**小程序支付流程**（以微信小程序为例）：

1. **用户点击支付**：前端请求后端创建订单，获取订单号。
2. **后端调用统一下单接口**：后端调用微信支付接口，传入订单金额、openid 等，获取预支付交易会话标识 `prepay_id`。
3. **后端返回支付参数**：后端根据 `prepay_id` 生成支付签名，返回给前端必要的参数：`timeStamp`、`nonceStr`、`package`（`prepay_id`）、`signType`、`paySign`。
4. **前端调起支付**：前端调用 `uni.requestPayment`，传入上述参数，触发微信支付界面。
5. **用户确认支付**：用户输入密码或指纹，完成支付。
6. **支付结果回调**：`uni.requestPayment` 的 `success` / `fail` 回调通知前端支付结果。
7. **后端异步通知**：微信服务器会异步通知后端支付结果（支付回调接口），后端需要更新订单状态。
8. **前端轮询或等待回调**：前端在支付成功后，可主动查询订单状态，或等待 WebSocket 通知。

**支付宝小程序支付流程**类似，区别在于：

- 后端获取的是 `tradeNO` 或 `orderInfo`（一个字符串）。
- 前端调用 `uni.requestPayment` 时传入 `orderInfo`。

**支付结果回调处理**：

- **前端回调**：`uni.requestPayment` 的 `success` 表示用户支付成功（但可能只是支付指令发出，不一定最终成功），此时应显示支付中状态，并轮询后端确认订单状态。
- **后端异步通知**：后端接收微信/支付宝的回调，验证签名，更新订单状态。前端可通过 WebSocket 或轮询获取最终状态。
- **支付失败处理**：在 `fail` 回调中，提示用户支付失败，并允许重新支付。注意取消支付也会触发 fail。

**项目实践**：

在“铅蛋回收”小程序中，我们封装了统一的支付函数：

javascript

```
// utils/pay.js
export function payOrder(orderId) {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. 获取支付参数
      const payParams = await api.getPayParams(orderId);
      
      // 2. 调起支付
      uni.requestPayment({
        // #ifdef MP-WEIXIN
        timeStamp: payParams.timeStamp,
        nonceStr: payParams.nonceStr,
        package: payParams.package,
        signType: payParams.signType,
        paySign: payParams.paySign,
        // #endif
        // #ifdef MP-ALIPAY
        orderInfo: payParams.orderInfo, // 支付宝专用
        // #endif
        success: () => {
          // 支付成功，但需要等待后端回调确认
          uni.showToast({ title: '支付成功', icon: 'success' });
          // 跳转到订单详情页，页面内部会轮询订单状态
          uni.redirectTo({ url: `/pages/order/detail?id=${orderId}` });
          resolve();
        },
        fail: (err) => {
          if (err.errMsg.includes('cancel')) {
            uni.showToast({ title: '已取消支付', icon: 'none' });
          } else {
            uni.showToast({ title: '支付失败', icon: 'error' });
          }
          reject(err);
        }
      });
    } catch (error) {
      uni.showToast({ title: '获取支付参数失败', icon: 'error' });
      reject(error);
    }
  });
}
```



**订单状态确认**：在订单详情页 `onShow` 中，我们轮询订单状态（每 2 秒一次，最多 10 次），直到订单状态变为“已支付”或“支付失败”，然后更新 UI。同时，我们也在 WebSocket 连接中监听支付成功事件，实现实时更新。

**注意**：不要完全依赖前端回调判断支付最终状态，必须以后端异步通知为准。

------

## 4. 小程序地图定位组件使用中遇到过哪些坑？如何解决？

**常见坑及解决方案**：

1. **定位权限申请**：

   - **问题**：用户拒绝授权后，再次调用定位无反应或直接失败。

   - **解决**：先通过 `uni.getSetting` 检查授权状态，若已拒绝，引导用户手动开启（使用 `uni.openSetting` 打开设置页）。

   - 示例：

     javascript

     ```
     async function checkLocationAuth() {
       const { authSetting } = await uni.getSetting();
       if (!authSetting['scope.userLocation']) {
         // 未授权，引导授权
         uni.showModal({
           title: '提示',
           content: '需要您授权地理位置权限',
           success: (res) => {
             if (res.confirm) {
               uni.openSetting(); // 打开设置页
             }
           }
         });
         return false;
       }
       return true;
     }
     ```

     

2. **坐标系不一致**：

   - **问题**：微信小程序返回的是 WGS84 或 GCJ02 坐标，支付宝可能也是 GCJ02，但地图组件使用的坐标系可能不同，导致位置偏移。
   - **解决**：统一使用 `type: 'gcj02'`（国测局坐标），大部分国内地图服务都使用该坐标系。如果后端需要 WGS84，需转换。

3. **chooseLocation 返回结果差异**：

   - **问题**：微信 `chooseLocation` 返回的 `name` 和 `address` 字段，支付宝返回的字段名可能不同。

   - **解决**：使用 uni 封装 API，对返回结果做统一格式化：

     javascript

     ```
     uni.chooseLocation({
       success: (res) => {
         // 统一结构
         const location = {
           name: res.name || '',
           address: res.address || '',
           latitude: res.latitude,
           longitude: res.longitude
         };
       }
     });
     ```

     

4. **地图组件覆盖层级问题**：

   - **问题**：在小程序中，`map` 组件是原生组件，层级最高，可能会遮挡弹窗、下拉框等。
   - **解决**：使用 `cover-view` 和 `cover-image` 覆盖在 map 上，或者动态控制 map 的显示隐藏（如需要弹窗时隐藏 map，或使用 `v-if` 销毁重建）。

5. **在 scroll-view 中使用地图导致滚动冲突**：

   - **问题**：map 组件本身可拖动，放在 scroll-view 中会导致手势冲突。
   - **解决**：避免在 scroll-view 中放置 map，或将 map 单独放置，用 `position: absolute` 悬浮。

6. **获取定位速度慢或失败**：

   - **问题**：首次定位较慢，或在室内无法定位。
   - **解决**：使用 `uni.getLocation` 的 `highAccuracy` 参数（如果支持），或设置超时提示。可配合缓存上次定位结果，先显示上次位置，再更新。

**项目实践**：

在“铅蛋回收”小程序的“附近门店”功能中，我们遇到用户拒绝授权后无法再次请求的问题。我们采用了以下流程：

- 进入页面时，检查授权状态。
- 如果未授权，显示“需要位置权限”的提示按钮，点击后调用 `uni.authorize` 请求权限（若失败则 `uni.openSetting`）。
- 授权成功后，调用 `uni.getLocation` 获取坐标，然后请求后台门店列表。
- 地图使用 `map` 组件展示门店位置，点击门店标记弹出 `cover-view` 定制气泡，避免被原生组件覆盖。

**代码片段**：

javascript

```
async function requestLocation() {
  const hasAuth = await checkLocationAuth();
  if (!hasAuth) return;
  uni.getLocation({
    type: 'gcj02',
    success: (res) => {
      // 获取成功
    },
    fail: (err) => {
      uni.showToast({ title: '定位失败', icon: 'none' });
    }
  });
}
```



------

## 5. 小程序的授权管理（用户信息、位置等）如何处理？

**授权管理**：小程序中获取用户敏感信息（如地理位置、用户信息、手机号等）都需要用户明确授权。不同平台授权方式略有差异，但整体流程类似。

**通用处理策略**：

1. **提前检查授权状态**：在需要使用权限的功能前，调用 `uni.getSetting` 检查是否已授权。
2. **按需请求授权**：如果未授权，调用 `uni.authorize` 请求对应权限（部分权限如地理位置可提前请求）。
3. **引导用户手动开启**：如果用户拒绝授权，再次调用时通常不会弹出授权窗，需要引导用户到设置页开启。
4. **用户信息授权特殊处理**：微信小程序中，获取用户头像昵称需使用 `<button open-type="getUserInfo">` 或 `getUserProfile`（已废弃，改用头像昵称填写能力）。支付宝小程序使用 `my.getOpenUserInfo`。

**微信小程序用户信息授权（新规范）**：
由于 `getUserProfile` 已废弃，目前推荐使用头像昵称填写能力：

- 使用 `<button open-type="chooseAvatar">` 获取头像临时路径。
- 使用 `<input type="nickname">` 获取用户昵称。
- 用户填写后，将头像文件上传，昵称提交。

**手机号授权**：

- 微信：使用 `<button open-type="getPhoneNumber">`，获取加密数据，后端解密。
- 支付宝：使用 `my.getPhoneNumber` 获取加密数据。

**项目实践**：

在“千源百荟”小程序中，我们封装了一个统一的授权组件 `AuthButton.vue`，根据不同平台和权限类型渲染不同按钮。

vue

```
<template>
  <button
    v-if="type === 'userInfo'"
    open-type="getUserInfo"
    @getuserinfo="onGetUserInfo"
  >
    <slot>获取用户信息</slot>
  </button>
  <button
    v-else-if="type === 'phone'"
    open-type="getPhoneNumber"
    @getphonenumber="onGetPhoneNumber"
  >
    <slot>获取手机号</slot>
  </button>
  <!-- 其他权限用普通按钮，手动调用授权 API -->
  <button v-else @click="requestAuth">
    <slot>授权</slot>
  </button>
</template>

<script setup>
const props = defineProps({
  type: { type: String, default: '' } // 'userInfo', 'phone', 'location', ...
});
const emit = defineEmits(['success', 'fail']);

const requestAuth = () => {
  // #ifdef MP-WEIXIN
  if (props.type === 'location') {
    uni.authorize({
      scope: 'scope.userLocation',
      success: () => emit('success'),
      fail: () => {
        uni.showModal({
          content: '需要您授权位置权限',
          success: (res) => {
            if (res.confirm) uni.openSetting();
          }
        });
        emit('fail');
      }
    });
  }
  // #endif
  // 支付宝类似...
};

const onGetUserInfo = (e) => {
  if (e.detail.errMsg.includes('ok')) {
    emit('success', e.detail);
  } else {
    emit('fail');
  }
};
const onGetPhoneNumber = (e) => {
  // 将加密数据发送后端解密
  if (e.detail.errMsg.includes('ok')) {
    emit('success', e.detail);
  } else {
    emit('fail');
  }
};
</script>
```



**注意**：用户信息授权（头像昵称）在新版微信中已改为用户主动填写，因此无需弹窗授权，但组件仍需处理用户选择后的回调。

------

## 6. 如何实现小程序的自定义分享？

**分享方式**：小程序支持两种分享：转发给好友（`onShareAppMessage`）和分享到朋友圈（`onShareTimeline`，微信小程序）。在页面中定义分享内容。

**自定义分享配置**：

1. **页面级分享**：在页面中定义 `onShareAppMessage` 和 `onShareTimeline`（仅微信）方法，返回分享配置对象。
2. **全局默认分享**：在 `App.vue` 中定义 `onShareAppMessage`，作为全局默认分享（如果页面未定义）。

**分享配置对象属性**：

- `title`：分享标题。
- `path`：分享的页面路径（可带参数）。
- `imageUrl`：分享图片（默认截图当前页面）。
- `desc`：描述（部分平台支持）。

**项目实践**：

在“铅蛋回收”小程序中，我们为每个页面设置了自定义分享，尤其是商品详情页和活动页，以便用户分享时携带正确参数和个性化标题。

javascript

```
// 在页面中
onLoad(options) {
  this.orderId = options.id;
}

onShareAppMessage() {
  return {
    title: '快来看看这个回收订单',
    path: `/pages/order/detail?id=${this.orderId}`,
    imageUrl: 'https://example.com/share-image.png' // 自定义图片
  };
}

// 分享到朋友圈（微信）
onShareTimeline() {
  return {
    title: '回收订单分享',
    query: `id=${this.orderId}`,
    imageUrl: 'https://example.com/share-image.png'
  };
}
```



**动态参数**：分享的 `path` 中可以携带参数，这样好友点击分享卡片进入小程序时，可以在 `onLoad` 中获取参数，展示对应内容。

**分享按钮触发**：

- 页面内使用 `<button open-type="share">` 触发分享菜单。
- 右上角菜单默认有分享按钮，无需额外代码。

**注意**：

- 支付宝小程序分享使用 `onShareAppMessage` 类似，但无朋友圈分享。
- 分享图片需在 CDN 上，避免使用本地图片。
- 分享路径必须正确，且参数需经过编码。

------

## 7. 小程序分包加载的策略？如何配置主包和分包？

**分包加载策略**：将小程序拆分为主包和若干分包，主包通常包含公共资源（组件、工具库）和核心页面（如首页、登录页），分包包含独立业务模块（如订单、个人中心）。用户访问某个分包内的页面时，才下载对应分包。

**配置方式**（`pages.json`）：

json

```
{
  "pages": [
    { "path": "pages/index/index", "style": { ... } },
    { "path": "pages/login/login", "style": { ... } }
  ],
  "subPackages": [
    {
      "root": "packageOrder",   // 分包根目录
      "pages": [
        { "path": "list", "style": { ... } },   // 实际路径：packageOrder/list
        { "path": "detail", "style": { ... } }
      ]
    },
    {
      "root": "packageUser",
      "pages": [
        { "path": "profile", "style": { ... } },
        { "path": "address", "style": { ... } }
      ],
      "independent": true   // 独立分包（可不依赖主包）
    }
  ]
}
```



**分包加载策略**：

1. **按业务模块拆分**：将功能独立的模块（如用户中心、订单中心、回收员端）拆分为分包。
2. **按角色拆分**：如果小程序面向多角色（如普通用户和回收员），可将回收员相关页面放入分包，普通用户不加载。
3. **按访问频率拆分**：低频页面（如帮助中心、关于我们）放入分包，高频页面放在主包。
4. **按页面路径深度拆分**：深层级页面可放入分包，但需注意从主包跳转到分包时，分包会被自动下载。

**独立分包**：可以不依赖主包独立运行，适用于登录页、活动页等，启动更快。

**项目实践**：

在“铅蛋回收”小程序中，分包结构如下：

- **主包**：首页、登录页、公共组件（uView 组件库、自定义组件）、工具函数、静态资源。
- **订单分包**（package-order）：订单列表、订单详情、评价页。
- **用户分包**（package-user）：个人资料、地址管理、设置、帮助中心。
- **回收员分包**（package-collector）：回收员首页、接单页、扫码回收、收入明细（仅回收员角色可见）。

**注意**：

- 主包体积尽量小，不超过 2M。
- 分包间不能相互引用资源，但可以引用主包的公共资源（组件、js 文件）。
- 独立分包不能引用主包以外的资源，且需要设置 `independent: true`。

**跳转示例**：从主包首页跳转到订单分包：

javascript

```
uni.navigateTo({
  url: '/packageOrder/list' // 注意是绝对路径
});
```



------

## 8. 小程序的性能优化有哪些手段？（包体积、首屏、渲染等）

**小程序性能优化可以从以下几个方面入手**：

### 包体积优化

1. **分包**：将非核心页面拆分到分包，减少主包体积。
2. **图片压缩**：使用 CDN 图片，避免本地大图；小图标使用 iconfont 或 SVG。
3. **代码压缩**：生产环境开启压缩（默认）。
4. **Tree Shaking**：避免引入无用库，按需引入第三方组件（如 uView 的按需引入）。
5. **复用组件**：将公共组件抽离，避免重复代码。
6. **减少依赖**：精简第三方库，如使用 `day.js` 替代 `moment.js`。

### 首屏加载优化

1. **分包预加载**：使用 `preloadRule` 配置在某个页面加载后预加载其他分包。

   json

   ```
   "preloadRule": {
     "pages/index/index": {
       "network": "all",
       "packages": ["packageOrder"]
     }
   }
   ```

   

2. **骨架屏**：在数据加载完成前显示骨架屏，提升感知速度。

3. **减少同步 API 调用**：将 `uni.getSystemInfoSync` 等改为异步。

4. **数据预请求**：在页面 `onLoad` 或 `onShow` 中尽早发起请求。

5. **缓存策略**：将不常变的数据（如省市区）缓存到本地，减少请求。

6. **异步组件**：对于非首屏组件，使用 `v-if` 延迟渲染。

### 渲染性能优化

1. **避免 setData 过大**：减少一次性更新大量数据，使用 `$batchUpdate` 或分批更新。
2. **使用纯数据字段**：对于不需要渲染的数据，放在 `data` 外部或使用 `this` 存储。
3. **长列表优化**：
   - 使用 `virtual-list`（小程序不支持真正虚拟列表，但可以用 `recycle-view` 或只渲染可视区域）。
   - 分页加载，避免一次性渲染太多。
   - 使用 `wx:key` 提高 diff 效率。
4. **减少不必要的组件嵌套**：简化 WXML 结构。
5. **避免频繁操作样式**：使用 CSS 类切换代替动态样式。
6. **合理使用 `setData`**：合并多次 `setData`，减少通信次数。

### 网络优化

1. **请求合并**：将多个请求合并为一个（如使用 `Promise.all` 并行）。
2. **CDN 加速**：静态资源使用 CDN。
3. **数据缓存**：合理使用本地缓存，减少重复请求。
4. **防抖节流**：对搜索、滚动等事件做防抖节流。

**项目实践**：

在“铅蛋回收”小程序中，我们实施了以下优化：

- **分包**：将订单、用户、回收员拆分为三个分包，主包体积从 2.3M 降至 1.2M。
- **骨架屏**：在订单列表页使用骨架屏组件，数据返回前显示占位。
- **列表分页**：订单列表每次加载 10 条，滚动到底部加载更多，使用节流防止重复加载。
- **缓存省市区数据**：每月从接口拉取一次省市区，存入 storage，减少请求。
- **图片懒加载**：列表图片使用 `lazy-load` 属性。
- **预加载分包**：在首页 `onShow` 后预加载订单分包，提高跳转速度。
- **压缩图片**：上传图片时压缩，列表图片使用 CDN 缩略图。

优化后，小程序启动速度提升约 40%，页面切换更加流畅。

------

## 9. 如何在小程序中使用 WebSocket？你在项目中用到了吗？

**小程序中使用 WebSocket**：通过 `uni.connectSocket` 创建连接，然后通过 `onSocketOpen`、`onSocketMessage`、`onSocketError`、`onSocketClose` 监听事件，使用 `sendSocketMessage` 发送消息。

**基本步骤**：

1. 建立连接：

   javascript

   ```
   const socketTask = uni.connectSocket({
     url: 'wss://example.com/ws',
     success: () => console.log('连接成功'),
     fail: (err) => console.log('连接失败', err)
   });
   ```

   

2. 监听打开事件：

   javascript

   ```
   socketTask.onOpen(() => {
     console.log('WebSocket 已打开');
     // 发送消息
     socketTask.send({ data: JSON.stringify({ type: 'auth', token }) });
   });
   ```

   

3. 接收消息：

   javascript

   ```
   socketTask.onMessage((res) => {
     const data = JSON.parse(res.data);
     // 处理消息
   });
   ```

   

4. 错误和关闭处理：

   javascript

   ```
   socketTask.onError((err) => {});
   socketTask.onClose(() => {});
   ```

   

5. 关闭连接：

   javascript

   ```
   socketTask.close();
   ```

   

**项目应用**：

在“铅蛋回收”小程序中，我们使用 WebSocket 实现了以下功能：

- **订单状态实时更新**：当用户下单、支付或回收员接单时，后端通过 WebSocket 推送订单状态变化，前端实时更新 UI，无需轮询。
- **消息通知**：后台向特定用户发送通知（如订单完成、优惠券到账），前端收到后弹出提示或更新消息中心。
- **回收员实时接单**：回收员端保持 WebSocket 连接，有新订单时实时推送，抢单体验更流畅。

**注意事项**：

- 小程序中 WebSocket 最多并发 5 个，注意管理连接，避免重复创建。
- 退出页面或应用进入后台时应关闭 WebSocket，节约资源。
- 心跳机制：长时间无消息可能被服务端断开，需定期发送 ping 消息保持连接。
- 重连机制：连接断开后自动重连。

**心跳示例**：

javascript

```
let heartBeatTimer;
socketTask.onOpen(() => {
  heartBeatTimer = setInterval(() => {
    socketTask.send({ data: 'ping' });
  }, 30000);
});
socketTask.onClose(() => {
  clearInterval(heartBeatTimer);
  // 尝试重连
});
```



------

## 10. 小程序发布上线的流程？如何应对审核被拒？

**小程序发布上线流程**（以微信小程序为例）：

1. **开发完成**：在开发者工具中完成代码开发，真机测试通过。
2. **上传代码**：点击“上传”按钮，填写版本号、项目备注，上传到微信公众平台。
3. **提交审核**：登录微信公众平台，进入“版本管理”，找到开发版本，点击“提交审核”。填写审核信息：版本描述、功能页面、测试账号等。
4. **等待审核**：一般 1-7 天，具体看运气。期间可在“审核版本”查看状态。
5. **审核通过**：收到审核通过通知后，可点击“发布”将版本发布到线上。
6. **灰度发布（可选）**：可选择全量发布或分阶段发布（如先发布给 5% 用户）。

**支付宝小程序流程类似**：上传 -> 提交审核 -> 发布。

**应对审核被拒的策略**：

1. **仔细阅读驳回原因**：审核人员会给出具体违规条款，如“涉及虚拟支付”、“类目不符”、“功能不完整”等。
2. **对照平台规范修改**：
   - 如果是类目问题，检查小程序选择的类目是否与业务一致，是否提交了对应资质（如营业执照、ICP 证等）。
   - 如果是功能问题，完善功能（如要求必须包含退货退款流程，就需要补充）。
   - 如果是内容问题，删除违规内容（如诱导分享、虚假宣传）。
3. **提供测试账号**：如果小程序需要登录，审核时可能无法测试，务必在提交审核时填写清晰的测试账号密码。
4. **申诉或重新提交**：如果认为被误判，可在审核页面发起申诉；否则修改后重新提交。
5. **常见拒审点**：
   - **虚拟支付**：小程序禁止虚拟商品支付（如充值、会员），需走 IAP（苹果）或使用 H5 支付。
   - **类目不一致**：例如电商小程序选了“工具”类目，需改为“电商平台”。
   - **用户隐私**：未说明收集用户信息的目的，需补充隐私协议。
   - **功能不完善**：如只有商品展示，不能下单支付。
   - **UI 太简陋**：设计不符合规范，建议参考官方设计指南。

**项目实践**：

在“铅蛋回收”小程序首次提交审核时，被拒原因：**“涉及回收业务，需要提供《再生资源回收经营者备案证明》”**。我们立即联系公司提供资质，上传到后台对应类目，重新提交后通过。

之后我们总结经验，每次提交前先检查：

- 类目是否匹配，资质是否齐全。
- 测试账号是否可用。
- 隐私协议是否完整。
- 是否包含违规内容（如虚假宣传）。

**优化建议**：

- 在项目中加入“意见反馈”入口，方便审核人员反馈问题。
- 准备多套测试账号（不同角色），在提交时注明。
- 灰度发布：先发布给少量用户，观察反馈，再全量发布。

# 七、工程化与构建 - Webpack/Vite 详细解答

------

## 1. Webpack 和 Vite 的区别？你为什么选择 Vite？

**Webpack 和 Vite 的区别**：

| 维度               | Webpack                                                | Vite                                                         |
| :----------------- | :----------------------------------------------------- | :----------------------------------------------------------- |
| **开发服务器启动** | 冷启动需要打包整个应用，随着项目规模增大，启动速度变慢 | 基于原生 ES Module，冷启动时无需打包，按需编译，启动极快     |
| **热更新（HMR）**  | 修改后重新打包该模块及其依赖，大型项目热更新可能变慢   | 基于 ESM，只更新修改的模块，速度几乎不受项目大小影响         |
| **打包方式**       | 生产环境使用自身打包器，支持丰富的配置和插件           | 生产环境使用 Rollup 打包，利用其成熟的打包能力和 Tree-shaking |
| **配置复杂度**     | 配置复杂，尤其是 Loader、Plugin 和优化配置             | 配置简洁，默认配置即可满足大部分场景，易于扩展               |
| **生态**           | 生态庞大，插件丰富，几乎支持所有场景                   | 生态快速成长，兼容大部分 Rollup 插件，且与 Vite 插件兼容     |
| **浏览器支持**     | 支持所有浏览器（通过打包降级）                         | 开发环境要求现代浏览器支持 ESM，生产环境通过 Rollup 降级     |
| **语言支持**       | 默认只支持 JS，需通过 Loader 支持其他语言              | 内置支持 TS、JSX、CSS 预处理器等，开箱即用                   |

**为什么选择 Vite**：

在“千源百荟再生资源回收”项目（Vue 3 + TypeScript）中，我们选择了 Vite 作为构建工具，原因如下：

- **极快的开发启动速度**：项目规模中等，Vite 的 ESM 开发服务器启动仅需几百毫秒，而 Webpack 需要几秒甚至更久，极大提升开发体验。
- **热更新快速**：修改代码后几乎瞬间更新，无需等待打包，开发效率高。
- **配置简单**：开箱即用的 TypeScript、Vue、CSS 预处理器支持，无需像 Webpack 那样配置大量 Loader。
- **插件生态**：可以使用丰富的 Rollup 插件，同时 Vite 自身插件也满足需求。
- **生产构建性能**：基于 Rollup 的打包，产物优化良好，且支持 Tree-shaking 和代码分割。

**注意**：在维护旧项目（如“铅蛋回收 SaaS 后台”早期基于 Vue 2 + Webpack）时，我们仍保留 Webpack，但新项目统一使用 Vite。

------

## 2. Vite 的原理是什么？它是如何实现快速启动的？

**Vite 的原理**：

Vite 利用浏览器原生 ES Module（ESM）能力，在开发环境下将每个文件作为一个模块，通过 `import` 直接请求，服务端按需编译并返回。生产环境则使用 Rollup 进行打包。

**快速启动的实现**：

1. **基于 ESM 的开发服务器**：
   - 启动时，Vite 将项目中的模块划分为**依赖**和**源码**。
   - **依赖**：使用 `esbuild` 预构建，将 CommonJS 或 UMD 模块转换为 ESM，并合并请求，减少 HTTP 请求数。esbuild 使用 Go 编写，速度极快。
   - **源码**：按需编译，只有当浏览器请求某个模块时，Vite 才会编译该模块并返回。编译后的模块通过 `import` 加载，浏览器负责解析依赖树。
2. **利用 HTTP 缓存**：
   - 依赖预构建的结果会缓存到 `node_modules/.vite`，下次启动直接复用。
   - 源码模块通过 `304 Not Modified` 或强缓存加速二次请求。
3. **快速热更新（HMR）**：
   - 修改一个模块后，Vite 只需让浏览器重新请求该模块，并利用 ESM 的热更新机制，精确替换模块，无需重新打包。
   - 通过 WebSocket 与浏览器建立连接，推送更新。
4. **按需编译**：
   - 只有被浏览器请求的模块才会编译，避免冷启动时全量编译。
5. **内置丰富的支持**：
   - 对 Vue、React、TypeScript、CSS 预处理器等提供开箱即用支持，无需配置 Loader，减少解析时间。

**流程图**（简版）：

text

```
浏览器请求 index.html → 解析到 <script type="module" src="/src/main.ts"> → 请求 main.ts → Vite 编译 TypeScript 返回 JS → 浏览器继续解析依赖，依次请求各模块。
```



**项目实践**：在使用 Vite 的项目中，我们明显感觉到启动速度和热更新速度远快于 Webpack，尤其在项目逐渐变大后优势更明显。

------

## 3. 如何配置多环境变量？你在项目中如何管理？

**多环境变量**：在开发、测试、生产等不同环境下，需要不同的配置（如 API 地址、AppId 等）。Vite 提供了基于 `import.meta.env` 的环境变量机制。

**Vite 中的配置**：

1. **环境变量文件**：在项目根目录创建以下文件：

   - `.env`：所有环境通用。
   - `.env.development`：开发环境（`vite` 或 `vite serve` 时加载）。
   - `.env.production`：生产环境（`vite build` 时加载）。
   - `.env.test`：测试环境（可通过 `--mode test` 指定）。

   文件内容格式：

   text

   ```
   VITE_APP_TITLE=My App
   VITE_API_BASE_URL=https://api.example.com
   ```

   

   只有以 `VITE_` 开头的变量才会暴露到客户端。

2. **在代码中使用**：

   javascript

   ```
   const apiUrl = import.meta.env.VITE_API_BASE_URL;
   ```

   

3. **在 `vite.config.js` 中使用**：

   javascript

   ```
   export default defineConfig(({ mode }) => {
     const env = loadEnv(mode, process.cwd());
     return {
       // 配置中使用 env
     };
   });
   ```

   

4. **TypeScript 类型支持**：在 `src/env.d.ts` 中声明：

   typescript

   ```
   interface ImportMetaEnv {
     readonly VITE_APP_TITLE: string;
     readonly VITE_API_BASE_URL: string;
   }
   ```

   

**项目实践**：

在“千源百荟”项目中，我们配置了三个环境：

- `.env.development`：`VITE_API_BASE_URL = '/api'`（代理到本地后端）。
- `.env.production`：`VITE_API_BASE_URL = 'https://prod-api.example.com'`。
- `.env.staging`：用于预发布环境，通过 `--mode staging` 构建。

在 `vite.config.js` 中，我们根据环境配置代理：

javascript

```
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '')
        }
      }
    }
  };
});
```



**Webpack 中的多环境变量**：通常使用 `webpack.DefinePlugin` 配合 `cross-env` 或 `dotenv`。我们在 Vue 2 项目中使用 `dotenv` 加载不同文件，并通过 `DefinePlugin` 注入。

------

## 4. 如何配置路径别名？有什么好处？

**路径别名**：为常用目录设置简短别名，避免使用冗长的相对路径（如 `../../../components`）。提高代码可读性和可维护性。

**Vite 中配置**：在 `vite.config.js` 中配置 `resolve.alias`。

javascript

```
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils')
    }
  }
});
```



在 TypeScript 中，还需在 `tsconfig.json` 中配置路径映射，以便编辑器识别和类型检查：

json

```
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@utils/*": ["src/utils/*"]
    }
  }
}
```



**Webpack 中配置**：在 `webpack.config.js` 中配置 `resolve.alias`。

javascript

```
module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@components': path.resolve(__dirname, 'src/components')
    }
  }
};
```



**好处**：

- **路径简洁**：`import Button from '@components/Button'` 比 `import Button from '../../../components/Button'` 清晰。
- **重构友好**：移动文件时，不需要修改大量相对路径。
- **避免路径错误**：减少 `../../` 层级错误。

**项目实践**：在所有项目中，我们都配置了 `@` 指向 `src` 目录，并按模块划分子别名（如 `@api`、`@stores`、`@types`），统一规范。

------

## 5. 如何配置代码分割（splitChunks）？你在项目中如何优化？

**代码分割**：将代码拆分成多个 chunk，实现按需加载或并行加载，减少首屏加载体积，提高缓存利用率。

**Vite 中的代码分割**：Vite 生产构建使用 Rollup，通过 `build.rollupOptions.output.manualChunks` 配置。

javascript

```
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // 将 Vue 全家桶单独打包
          'vue-vendor': ['vue', 'vue-router', 'pinia'],
          // 将 UI 组件库单独打包
          'ui-vendor': ['element-plus', 'vant'],
          // 将第三方工具库单独打包
          'utils-vendor': ['axios', 'dayjs', 'lodash-es']
        }
      }
    }
  }
});
```



也可以使用函数形式进行更细粒度的控制：

javascript

```
manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('vue')) return 'vue-vendor';
    if (id.includes('element-plus')) return 'ui-vendor';
    return 'vendor'; // 其他 node_modules
  }
}
```



**Webpack 中的代码分割**：通过 `optimization.splitChunks` 配置。

javascript

```
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all', // 对同步和异步模块都进行分割
      cacheGroups: {
        vue: {
          test: /[\\/]node_modules[\\/](vue|vue-router|vuex)[\\/]/,
          name: 'vue-vendor',
          chunks: 'all'
        },
        ui: {
          test: /[\\/]node_modules[\\/](element-ui)[\\/]/,
          name: 'ui-vendor',
          chunks: 'all'
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: -10 // 优先级低于上述分组
        }
      }
    }
  }
};
```



**项目中的优化实践**：

在“铅蛋回收 SaaS 后台”（Webpack）中，我们：

- 将 Vue、Vue Router、Vuex、Element-UI 等基础库分离成独立 chunk，利用浏览器缓存（这些库不常变）。
- 将业务代码按路由懒加载，每个页面独立 chunk。
- 通过 `webpack-bundle-analyzer` 分析打包体积，优化过大的依赖（如用 `dayjs` 替代 `moment`）。

在“千源百荟官网”（Vite）中，我们：

- 将 Vue、Pinia、Vue Router 打包为 `vue-vendor`。
- 将 ElementPlus 打包为 `ui-vendor`。
- 将 ECharts 等大库单独打包（`echarts-vendor`），因为只有个别页面使用。
- 配置 `build.chunkSizeWarningLimit` 调整警告阈值。

**效果**：首屏加载的 JS 体积从 2MB 降低到 800KB（gzip 后），加载时间减少 40%。

------

## 6. 如何配置 loader 和 plugin？举例说明。

**Loader** 和 **Plugin** 是 Webpack 的核心概念（Vite 中类似概念是插件和预处理器，但配置方式不同）。

### Webpack 中的 Loader

Loader 用于转换模块的源代码，如将 TypeScript 编译为 JavaScript，将 Sass 编译为 CSS。

**常用 Loader**：

- `babel-loader`：转换 ES6+ 为兼容代码。
- `ts-loader` / `@babel/preset-typescript`：处理 TypeScript。
- `vue-loader`：处理 Vue 单文件组件。
- `sass-loader`、`css-loader`、`style-loader`：处理样式。
- `file-loader`、`url-loader`：处理图片、字体。

**配置示例**（Webpack 5）：

javascript

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: { appendTsSuffixTo: [/\.vue$/] }
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',  // 将 CSS 注入 DOM
          'css-loader',    // 解析 CSS
          'sass-loader'    // 编译 Sass
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset',     // Webpack 5 内置资源模块
        parser: {
          dataUrlCondition: { maxSize: 8 * 1024 } // 8kb 以内转 base64
        }
      }
    ]
  }
};
```



### Webpack 中的 Plugin

Plugin 用于执行更广泛的任务，如打包优化、资源管理、环境变量注入。

**常用 Plugin**：

- `HtmlWebpackPlugin`：生成 HTML 文件并自动注入打包后的资源。
- `DefinePlugin`：定义全局常量。
- `MiniCssExtractPlugin`：提取 CSS 到单独文件。
- `CleanWebpackPlugin`：清理输出目录。
- `CopyWebpackPlugin`：复制静态资源。
- `BundleAnalyzerPlugin`：分析打包体积。

**配置示例**：

javascript

```
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css'
    })
  ]
};
```



### Vite 中的插件

Vite 插件基于 Rollup 插件接口，配置在 `vite.config.js` 的 `plugins` 数组中。

**常用插件**：

- `@vitejs/plugin-vue`：支持 Vue 单文件组件。
- `@vitejs/plugin-legacy`：为旧浏览器生成兼容包。
- `vite-plugin-compression`：开启 gzip 压缩。
- `vite-plugin-html`：HTML 模板处理。
- `rollup-plugin-visualizer`：分析打包体积。

**配置示例**：

javascript

```
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    vue(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
});
```



**项目实践**：在 Vue 2 项目中，我们配置了 `vue-loader` 处理 `.vue` 文件，`sass-loader` 处理样式，`babel-loader` 转译 JS。在 Vue 3 + Vite 项目中，主要使用官方插件，配置简洁。

------

## 7. 如何优化 Webpack 构建速度？

Webpack 构建速度优化可以从多个方面入手：

### 1. **减少解析范围**

- 配置 `resolve.alias` 减少模块查找路径。
- 配置 `modules` 只查找 `node_modules`。
- 使用 `oneOf` 规则，避免所有文件都经过所有 loader。
- 使用 `include` 和 `exclude` 限制 loader 处理范围。

javascript

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  }
};
```



### 2. **多进程/多实例构建**

- `thread-loader`：将 loader 放在 worker 池中运行，适用于耗时 loader（如 babel、ts）。
- `HappyPack`（已不维护）或 `esbuild-loader` 替代部分 loader。

javascript

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'thread-loader',
          'babel-loader'
        ]
      }
    ]
  }
};
```



### 3. **缓存**

- `cache-loader`：将结果缓存到磁盘，下次直接读取（Webpack 5 已内置 `cache` 功能）。
- `babel-loader` 开启 `cacheDirectory`。
- `terser-webpack-plugin` 开启缓存和并行。

javascript

```
module.exports = {
  cache: {
    type: 'filesystem' // Webpack 5 内置文件缓存
  }
};
```



### 4. **使用更快的 loader 或替代方案**

- 用 `esbuild-loader` 替代 `babel-loader` 和 `ts-loader`，大幅提升速度。
- 用 `sass` 代替 `node-sass`（node-sass 安装慢且编译慢）。

javascript

```
module.exports = {
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'esbuild-loader',
        options: { loader: 'ts', target: 'es2015' }
      }
    ]
  }
};
```



### 5. **代码分割和 DllPlugin**

- 使用 `DllPlugin` 预编译基础库（如 vue、vue-router），减少重复构建（但 Webpack 4+ 后收益不大，且配置复杂，现多用 `splitChunks` 替代）。
- `splitChunks` 合理拆分，避免重复打包。

### 6. **按需编译**

- 开发环境使用 `webpack-dev-server` 的热更新，只重新编译修改的模块。
- 使用 `webpack` 的 `watch` 模式。

### 7. **分析构建时间**

- 使用 `speed-measure-webpack-plugin` 分析各 loader/plugin 耗时，针对性优化。

### 8. **升级 Webpack 版本**

- Webpack 5 相比 4 有性能提升，利用持久化缓存等特性。

**项目实践**：

在“铅蛋回收 SaaS 后台”项目中，我们通过以下手段将开发环境构建时间从 2 分钟降到 20 秒：

- 启用 `cache-loader` 和 `babel-loader` 缓存。
- 使用 `thread-loader` 多进程处理 JS 文件。
- 将 `node-sass` 替换为 `sass`（Dart Sass 更慢，但安装快，后用 `sass-loader` + `sass` 替代）。
- 配置 `include` 只编译 src 目录。
- 使用 `esbuild-loader` 替代 `ts-loader` 和 `babel-loader`。

------

## 8. 如何实现热更新（HMR）？原理是什么？

**热更新（HMR）**：在应用运行时替换、添加或删除模块，无需重新加载整个页面，保留应用状态。

### Webpack 中的 HMR 实现

**原理**：

1. **启动 Webpack Dev Server**：在开发模式下，启动一个 Express 服务器，并注入 HMR runtime 到客户端。
2. **编译时记录模块依赖**：Webpack 在编译时生成模块的依赖关系图，并为每个模块分配一个 ID。
3. **文件变化时重新编译**：监听文件变化，重新编译对应模块，生成新的模块代码。
4. **通知客户端**：通过 WebSocket 向客户端发送更新信号，包含更新模块的 ID 和新的代码。
5. **客户端 HMR runtime**：接收到更新后，根据模块依赖关系，判断哪些模块需要更新，通过 JSONP 请求新的模块代码。
6. **模块热替换**：执行新模块代码，替换旧模块，并触发模块的 `module.hot.accept` 回调，让开发者执行状态更新或重新渲染。

**配置**：

- 在 `webpack.config.js` 中启用 `devServer.hot: true`。
- 在入口文件添加 `module.hot.accept` 逻辑（或使用框架提供的 HMR 支持，如 `vue-loader` 自动处理）。

### Vite 中的 HMR 实现

**原理**：

1. **基于 ESM**：Vite 利用浏览器原生 ESM 能力，开发服务器直接提供源文件。
2. **文件变化时**：Vite 通过 WebSocket 通知客户端某个模块发生了变化。
3. **客户端接收后**：重新请求该模块（加上 `?t=timestamp` 防止缓存），浏览器会解析并执行新模块。
4. **热更新适配**：框架插件（如 `@vitejs/plugin-vue`）会注入 HMR 处理代码，实现组件状态保留。

**特点**：Vite 的 HMR 基于 ESM，更新速度不受项目规模影响，因为只更新单个文件。

**项目实践**：

在 Vue 项目中，我们通常不需要手动处理 HMR，因为 Vue Loader 或 Vite 插件已经内置。但在某些工具库中，可能需要手动接受更新：

javascript

```
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    // 处理更新
  });
}
```



**注意**：HMR 只适用于开发环境，生产环境不启用。

------

## 9. 你在项目中如何配置 ESLint、Prettier、Stylelint？

**代码质量管控体系**：通过 ESLint 检查 JavaScript/TypeScript 代码规范，Prettier 统一代码风格，Stylelint 检查样式代码规范。

### ESLint 配置

1. **安装依赖**：

   bash

   ```
   npm install -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin eslint-plugin-vue
   ```

   

2. **创建 `.eslintrc.js`**：

   javascript

   ```
   module.exports = {
     root: true,
     env: { browser: true, es2021: true, node: true },
     extends: [
       'eslint:recommended',
       'plugin:@typescript-eslint/recommended',
       'plugin:vue/vue3-recommended',
       '@vue/typescript/recommended'
     ],
     parser: 'vue-eslint-parser',
     parserOptions: {
       ecmaVersion: 2021,
       parser: '@typescript-eslint/parser',
       sourceType: 'module'
     },
     plugins: ['@typescript-eslint'],
     rules: {
       'vue/multi-word-component-names': 'off',
       '@typescript-eslint/no-explicit-any': 'warn',
       '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }]
     }
   };
   ```

   

3. **配置 `.eslintignore`** 忽略文件。

### Prettier 配置

1. **安装依赖**：

   bash

   ```
   npm install -D prettier eslint-config-prettier eslint-plugin-prettier
   ```

   

2. **创建 `.prettierrc.js`**：

   javascript

   ```
   module.exports = {
     semi: false,
     singleQuote: true,
     printWidth: 100,
     trailingComma: 'none',
     tabWidth: 2,
     endOfLine: 'auto'
   };
   ```

   

3. **集成到 ESLint**：在 `.eslintrc.js` 的 `extends` 末尾添加 `'plugin:prettier/recommended'`，它会覆盖 ESLint 中与 Prettier 冲突的规则，并将 Prettier 作为 ESLint 规则运行。

### Stylelint 配置

1. **安装依赖**：

   bash

   ```
   npm install -D stylelint stylelint-config-standard stylelint-config-prettier
   ```

   

2. **创建 `.stylelintrc.js`**：

   javascript

   ```
   module.exports = {
     extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
     rules: {
       'selector-class-pattern': null, // 允许 BEM 等命名
       'no-descending-specificity': null
     }
   };
   ```

   

3. **配置 `.stylelintignore`**。

### 项目集成

- **VSCode 配置**：在项目 `.vscode/settings.json` 中开启保存时自动格式化：

  json

  ```
  {
    "editor.codeActionsOnSave": {
      "source.fixAll.eslint": true,
      "source.fixAll.stylelint": true
    },
    "editor.formatOnSave": true,
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
  ```

  

- **Lint 脚本**：在 `package.json` 中添加脚本：

  json

  ```
  {
    "scripts": {
      "lint": "eslint --ext .js,.ts,.vue src",
      "lint:fix": "eslint --ext .js,.ts,.vue src --fix",
      "stylelint": "stylelint src/**/*.{css,scss,vue}",
      "format": "prettier --write src/**/*.{js,ts,json,md,vue,css,scss}"
    }
  }
  ```

  

- **Husky + lint-staged**：配置 Git 提交前自动 lint 和格式化，确保代码质量。

**项目实践**：

在“千源百荟”项目中，我们配置了 ESLint + Prettier + Stylelint，并在 CI 流程中运行 lint 检查，确保代码风格一致，避免低级错误。

------

## 10. 如何搭建一个从零开始的前端项目？你会考虑哪些因素？

搭建一个从零开始的前端项目需要考虑以下因素：

### 1. **技术栈选型**

- **框架**：Vue 3 / React / 其他？根据团队熟悉度、项目类型（SPA/MPA/小程序）选择。
- **语言**：TypeScript 必备，增强类型安全。
- **状态管理**：Pinia / Vuex / Redux。
- **路由**：Vue Router / React Router。
- **UI 组件库**：Element Plus / Ant Design / 自研。
- **构建工具**：Vite / Webpack。新项目推荐 Vite。
- **CSS 预处理器**：SCSS / Less / Tailwind。
- **代码规范**：ESLint + Prettier + Stylelint。
- **单元测试**：Jest / Vitest + Vue Test Utils。
- **E2E 测试**：Cypress / Playwright。

### 2. **项目初始化**

- 使用官方脚手架（如 `npm create vue@latest`）或自定义模板。
- 配置 `package.json` 脚本。
- 初始化 Git 仓库，配置 `.gitignore`。

### 3. **目录结构设计**

text

```
src/
├── assets/        # 静态资源（图片、字体）
├── components/    # 公共组件
├── composables/   # 组合式函数（Vue 3）
├── layouts/       # 布局组件
├── pages/         # 页面组件
├── router/        # 路由配置
├── stores/        # 状态管理
├── styles/        # 全局样式
├── types/         # TypeScript 类型声明
├── utils/         # 工具函数
├── api/           # API 请求
└── main.ts        # 入口文件
```



### 4. **环境配置**

- 区分开发、测试、生产环境，使用 `.env` 文件管理变量。
- 配置代理解决开发环境跨域。

### 5. **工程化配置**

- 配置路径别名（`@` 指向 `src`）。
- 配置构建工具（Vite/Webpack），包括代码分割、压缩、CDN 路径等。
- 配置代码规范工具（ESLint、Prettier、Stylelint）。
- 配置 Git Hooks（husky + lint-staged）。
- 配置打包分析（`rollup-plugin-visualizer` / `webpack-bundle-analyzer`）。

### 6. **CI/CD 集成**

- 配置 GitHub Actions / GitLab CI，实现自动化测试、构建、部署。
- 配置静态资源上传 CDN。

### 7. **性能优化策略**

- 路由懒加载。
- 组件异步加载。
- 图片懒加载、CDN 加速。
- 开启 gzip / brotli 压缩。
- 配置 HTTP 缓存。

### 8. **开发体验**

- 配置 VSCode 推荐插件和工作区设置。
- 配置自动格式化。
- 配置 Debug 调试。

**项目实践**：

在搭建“千源百荟”项目时，我按照以下步骤：

1. 使用 `npm create vue@latest` 创建项目，选择 Vue 3 + TypeScript + Pinia + Vite。
2. 调整目录结构，添加 `composables`、`types`、`api` 等文件夹。
3. 安装 Element Plus、uView（小程序用）、axios、dayjs 等依赖。
4. 配置 `vite.config.js` 设置别名、代理、打包配置。
5. 配置 ESLint、Prettier、Stylelint，并集成 husky。
6. 配置多环境变量文件。
7. 添加路由并配置懒加载。
8. 封装请求工具和存储工具。
9. 编写公共组件和布局。
10. 配置 CI 流水线。

这样搭建的项目结构清晰，可维护性强，团队协作顺畅。

# 八、工程化与构建 - 组件库与二次封装 详细解答

------

## 1. 你如何设计和封装一个通用业务组件？需要考虑哪些方面？

**通用业务组件**是指可在多个项目或同一项目多个页面中复用的组件，它封装了特定的业务逻辑和 UI 表现，对外提供简洁的 API。设计一个优秀的通用业务组件需要综合考虑以下方面：

### 1.1 需求分析与边界界定

- **明确组件职责**：组件应遵循“单一职责原则”，只做一件事，且做好。例如，一个“地址选择器”只负责地址的层级选择和回填，不包含订单提交逻辑。
- **识别可变与不变**：分析业务中哪些部分是固定的（如 UI 结构），哪些是变化的（如数据源、样式主题、交互行为）。将变化的部分设计为可配置的 props 或插槽。
- **复用性评估**：该组件是否会在多个页面或多个项目中使用？如果只是特定页面的一次性需求，不必过度设计。

### 1.2 API 设计

- **Props**：定义组件的输入，应尽量精简且语义化。使用 TypeScript 定义类型，提供默认值。例如：

  typescript

  ```
  props: {
    value: { type: String, default: '' },
    placeholder: { type: String, default: '请选择' },
    disabled: { type: Boolean, default: false },
    options: { type: Array as PropType<Option[]>, required: true }
  }
  ```

  

- **Events**：定义组件向外传递的事件，使用 `emit` 并明确命名。例如 `update:value` 支持 `v-model`，`change`、`blur` 等。

- **Slots**：提供插槽让使用者自定义部分内容，如前置图标、下拉选项的渲染。

- **Methods / Expose**：如果需要父组件调用组件内部方法（如重置、验证），使用 `expose` 暴露。

### 1.3 样式设计

- **CSS 隔离**：使用 BEM 命名或 CSS Modules，避免样式污染。
- **主题定制**：支持通过 CSS 变量或 props 自定义颜色、尺寸等。
- **响应式**：考虑移动端适配，使用 rem/rpx 或 flex 布局。

### 1.4 可扩展性与灵活性

- **属性透传**：使用 `v-bind="$attrs"` 将未声明的属性传递给内部根元素，让使用者可以设置 class、style 等。
- **事件监听**：使用 `v-on="$listeners"`（Vue 2）或 `$attrs` 已包含事件（Vue 3）透传内部元素。
- **提供多种用法**：例如支持受控和非受控模式（通过 `v-model` 或 `value` + `change`）。

### 1.5 健壮性

- **边界处理**：考虑空状态、加载状态、错误状态。
- **类型安全**：使用 TypeScript 严格定义 props 和事件类型。
- **单元测试**：编写测试用例覆盖核心功能。

### 1.6 文档与示例

- **README**：说明组件的功能、安装方式、API、使用示例。
- **Demo**：提供可运行的示例代码，展示常见用法。

**项目实践**：在“铅蛋回收”项目中，我们封装了 `AddressPicker` 组件，用于省市区选择。它接收 `value`（省市区代码）和 `@change` 事件，内部通过接口动态加载省市区数据，支持回显和搜索。我们使用 `v-model` 绑定，并提供 `disabled`、`placeholder` 等 props，同时通过插槽允许自定义选项的显示格式。该组件在用户地址管理、订单发货等多个模块复用，大大减少了重复代码。

------

## 2. 你在项目中二次封装了哪些 Element-UI 组件？举例说明封装逻辑。

在“铅蛋回收 SaaS 后台”（基于 Vue 2 + Element-UI）和“千源百荟官网”（Vue 3 + Element Plus）中，我们对 Element 组件进行了多次二次封装，以提高开发效率和统一业务规范。以下是几个典型例子：

### 2.1 二次封装 `ElTable` 为 `AppTable`

**背景**：后台系统中大量使用表格，每个表格都需要处理加载状态、空数据、分页、操作列等，代码重复度高。

**封装逻辑**：

- **Props 扩展**：
  - `data`：表格数据（透传）。
  - `columns`：列配置数组，替代手写多个 `el-table-column`，减少模板代码。
  - `total`：总条数（用于分页）。
  - `page` / `limit`：当前页和每页条数（支持 `.sync` 或 `v-model`）。
  - `loading`：加载状态。
  - `showPagination`：是否显示分页。
- **插槽透传**：通过 `v-for` 渲染列，并提供作用域插槽让使用者自定义单元格内容。
- **内部集成**：自动处理分页事件，抛出 `page-change` 和 `size-change` 事件。
- **样式统一**：固定表格高度、条纹、边框等样式。

**简化后的使用**：

vue

```
<app-table
  :data="userList"
  :columns="userColumns"
  :total="total"
  :page.sync="page"
  :limit.sync="limit"
  @page-change="fetchData"
>
  <template #action="{ row }">
    <el-button @click="edit(row)">编辑</el-button>
  </template>
</app-table>
```



### 2.2 二次封装 `ElDialog` 为 `AppDialog`

**背景**：项目中弹窗风格需要统一，且经常需要处理确认、取消按钮的 loading 状态。

**封装逻辑**：

- **Props**：`visible`（支持 `.sync` 或 `v-model`）、`title`、`width`、`confirmLoading`、`showFooter` 等。
- **事件**：`confirm`、`cancel`，并在确认按钮上自动处理 loading。
- **插槽**：提供默认插槽（内容）、`footer` 插槽（可覆盖底部）。
- **功能增强**：按下 ESC 或点击遮罩是否可关闭（通过 `close-on-click-modal` 和 `close-on-press-escape` 控制）。

**使用示例**：

vue

```
<app-dialog v-model="visible" title="提示" @confirm="handleConfirm">
  确定删除吗？
</app-dialog>
```



### 2.3 二次封装 `ElForm` 为 `AppForm` / `AppFormItem`

**背景**：表单验证、布局、提交状态需要统一处理，减少重复的表单验证代码。

**封装逻辑**：

- **集成验证**：通过 `ref` 暴露 `validate` 方法，内部使用 `el-form` 的验证。
- **统一布局**：固定 label-width、label-position。
- **自动绑定**：配合自定义的 `AppFormItem`，简化双向绑定和验证规则的写法。

### 2.4 二次封装 `ElPagination` 为 `AppPagination`

**背景**：分页组件在多处使用，需要统一样式和交互。

**封装逻辑**：

- 固定常用配置（如 `layout`、`background`）。
- 封装 `page` 和 `limit` 的同步，自动触发 `change` 事件。

**二次封装的好处**：

- **一致性**：所有页面使用相同的表格、弹窗风格。
- **效率**：减少重复代码，开发新页面只需配置数据。
- **可维护性**：当需要修改全局样式或行为时，只需改动封装组件一处。

------

## 3. 如何设计组件库的 API？如何保证易用性和扩展性？

设计组件库的 API 是组件库开发的核心，好的 API 应该直观、一致、灵活且易于记忆。

### 3.1 API 设计原则

- **一致性**：相似的组件应有相似的 API 命名和行为。例如，所有支持 `v-model` 的组件都使用 `modelValue`（Vue 3）和 `update:modelValue` 事件；所有禁用状态都用 `disabled` prop。
- **简洁性**：只暴露必要的 API，避免过度设计。能用默认值解决的问题就提供默认值。
- **可预测性**：API 的行为应符合开发者的直觉。例如，`size` 属性接受 `'small' | 'medium' | 'large'` 而不是数字。
- **渐进增强**：提供基础功能，同时允许高级用户通过额外 props 或插槽定制。

### 3.2 具体设计策略

- **Props 设计**：
  - 使用明确的布尔值：`loading`、`disabled`。
  - 枚举值用字符串联合类型，并提供默认值。
  - 对于复杂数据，使用对象或数组，并定义清晰的接口。
- **事件设计**：
  - 遵循原生事件命名：`click`、`change`、`input` 等。
  - 自定义事件用动词 + 名词：`select-change`、`page-change`。
  - 支持 `v-model` 的组件必须提供 `update:modelValue` 事件。
- **插槽设计**：
  - 提供足够的插槽让用户自定义部分内容。
  - 作用域插槽传递必要的数据，如当前行、选中状态。
- **方法暴露**：
  - 使用 `expose` 暴露组件内部方法（如 `validate`、`reset`）。
  - 方法命名应动词开头，如 `focus`、`clear`。

### 3.3 保证易用性

- **提供默认值**：大多数情况下，用户希望开箱即用，所以提供合理的默认值。
- **自动处理常见场景**：例如表格组件自动处理分页事件，无需用户手动绑定。
- **文档和示例**：每个组件都有清晰的文档，展示常见用法和所有 API。
- **类型提示**：使用 TypeScript 编写组件，提供完善的类型定义，让用户在 IDE 中获得智能提示。

### 3.4 保证扩展性

- **属性透传**：使用 `v-bind="$attrs"` 将未声明的属性传递给内部根元素，让用户可以设置原生属性（如 `class`、`style`）。
- **插槽透传**：对于复杂的内部结构，提供多个具名插槽，允许用户替换部分内容。
- **主题定制**：使用 CSS 变量或提供 `theme` 对象，允许全局或局部覆盖样式。
- **组合式函数**：对于复杂逻辑，可以导出组合式函数（hooks），让用户在自己的组件中复用逻辑。

**项目实践**：在开发公司内部组件库时，我们严格遵循以上原则。例如 `AppTable` 组件，我们提供了 `columns` 配置简化列定义，同时保留了 `el-table-column` 的所有属性扩展能力（通过 `column` 对象中的 `props` 字段透传）。我们还提供了 `row-class`、`row-style` 等函数式 props，方便用户自定义行样式。对于高级用户，可以通过插槽完全自定义某列的内容。

------

## 4. 如何实现组件的按需加载？

**按需加载**（按需引入）是指只打包用户实际使用到的组件，减少最终包的体积。在组件库中实现按需加载通常有两种方式：**手动引入**和**自动按需引入**。

### 4.1 手动引入

用户在使用时手动导入所需组件和样式，例如：

javascript

```
import { ElButton } from 'element-plus'
import 'element-plus/es/components/button/style/css'
```



这种方式对用户不友好，需要记住每个组件的样式路径。

### 4.2 自动按需引入

使用插件（如 `babel-plugin-import` 或 `unplugin-vue-components`）自动转换代码，将 `import { Button } from 'your-lib'` 转换为按需引入的形式。

#### 对于组件库开发者，需要提供以下支持：

- **ES Module 输出**：构建时输出 ES 模块格式，每个组件单独文件，便于 Tree Shaking。
- **样式独立**：每个组件有独立的样式文件（如 `style.css`），且与组件文件分离，便于插件按需加载。
- **类型声明**：提供 `.d.ts` 文件，确保 TypeScript 支持。

#### 使用 `unplugin-vue-components` 实现自动按需引入

在 Vite 项目中，配置 `vite.config.js`：

javascript

```
import Components from 'unplugin-vue-components/vite'
import { YourLibResolver } from 'unplugin-vue-components/resolvers'

export default {
  plugins: [
    Components({
      resolvers: [YourLibResolver()] // 使用自定义 resolver
    })
  ]
}
```



`resolver` 负责将组件名映射到组件文件和样式文件路径。

#### 手动实现按需引入的构建配置（以 Vite + Rollup 为例）

- **构建目标**：输出 ES 模块，每个组件独立文件夹，包含 `index.js` 和 `style.css`。

- **使用 `rollup-plugin-multi-input`** 打包成多入口。

- **生成 `package.json`** 的 `exports` 字段，支持子路径导出：

  json

  ```
  "exports": {
    "./*": "./dist/*/index.js"
  }
  ```

  

### 4.3 在项目中的实践

在“铅蛋回收”项目中，我们使用了 uView 组件库，它本身支持按需加载。我们通过 `easycom` 配置自动引入组件，无需手动导入。对于自己开发的组件库，我们按照上述方式构建，并在项目中使用 `unplugin-vue-components` 配合自定义 resolver，实现了组件的自动按需引入，减少了打包体积。

------

## 5. 你如何发布一个 npm 包？流程是怎样的？需要注意什么？

发布一个 npm 包需要经过以下步骤：

### 5.1 准备工作

- **编写组件代码**：确保代码已经完成，并经过测试。

- **配置 package.json**：

  json

  ```
  {
    "name": "your-package-name", // 包名，需在 npm 上唯一
    "version": "1.0.0",          // 遵循语义化版本
    "description": "描述",
    "main": "dist/index.js",      // CommonJS 入口
    "module": "dist/index.es.js", // ES Module 入口
    "types": "dist/index.d.ts",   // 类型声明
    "files": ["dist"],             // 发布时包含的文件
    "scripts": {
      "build": "vite build",
      "prepublishOnly": "npm run build" // 发布前自动构建
    },
    "peerDependencies": {
      "vue": "^3.2.0"
    }
  }
  ```

  

- **配置构建工具**：使用 Vite 或 Rollup 打包，输出多种格式（UMD、CJS、ESM）。确保将 Vue 等依赖标记为外部依赖，避免打包进库中。

- **编写 README**：说明安装、使用、API、示例。

- **添加 License**：如 MIT。

- **编写类型声明**：如果使用 TypeScript，确保生成 `.d.ts` 文件。

### 5.2 构建

运行 `npm run build`，生成 `dist` 目录。

### 5.3 本地测试

可以使用 `npm pack` 生成 `.tgz` 文件，然后在测试项目中通过 `npm install 路径/包名.tgz` 安装测试，确保功能正常。

### 5.4 发布

- **注册 npm 账号**：`npm adduser` 或官网注册。
- **登录**：`npm login`。
- **检查镜像源**：确保使用的是官方源（`npm config set registry https://registry.npmjs.org/`）。
- **发布**：`npm publish --access public`（如果包名带 scope，需要 `--access public`）。

### 5.5 注意事项

- **版本控制**：每次发布前修改 `version`，遵循 semver（patch 修复 bug，minor 新增功能，major 不兼容变更）。
- **避免发布敏感文件**：通过 `.npmignore` 或 `files` 字段指定要发布的文件。
- **检查包内容**：使用 `npm pack --dry-run` 预览即将发布的文件。
- **文档**：保持 README 更新，可考虑添加在线文档站点。
- **废弃版本**：如果发布错误，可以使用 `npm unpublish` 但有限制，或 `npm deprecate` 标记为废弃。

**项目实践**：在“千源百荟”项目中，我开发了一个 `@qd/utils` 工具包，包含常用的防抖、节流、日期格式化、金额处理等函数。发布流程如上所述。我们还在公司内部私有 npm 仓库中发布了多个业务组件包，方便多项目共享。

------

## 6. 你在项目中开发的 npm 工具包包含哪些功能？如何保证通用性？

在“千源百荟”和“铅蛋回收”项目中，我开发了一个名为 `@qd/utils` 的 npm 工具包，主要包含以下功能：

### 6.1 功能列表

- **请求封装**：基于 axios 的统一请求函数，支持请求/响应拦截、错误处理、loading 控制、取消重复请求等。
- **存储工具**：封装 localStorage 和 sessionStorage，支持带过期时间的存储。
- **防抖/节流**：提供 `debounce` 和 `throttle` 函数，以及 Vue 自定义指令。
- **日期处理**：基于 day.js 的常用格式化函数，如 `formatDate`、`getTimeRange`。
- **数字处理**：金额格式化（千分位、保留小数）、数字精度运算（使用 `big.js`）。
- **类型判断**：`isObject`、`isString`、`isPhone` 等。
- **浏览器相关**：获取 URL 参数、复制到剪贴板、下载文件等。
- **树形数据处理**：将列表转为树、过滤树、遍历树等。
- **权限相关**：检查权限、角色判断等。

### 6.2 保证通用性的策略

- **纯函数**：工具函数应是无副作用的纯函数，输入输出明确，不依赖外部状态。

- **参数设计**：提供合理的默认值，同时允许用户传入配置对象扩展。

- **平台兼容**：判断环境（浏览器/Node/小程序），使用条件导出或运行时检测。例如，复制功能在微信小程序中使用 `uni.setClipboardData`，在浏览器中使用 `navigator.clipboard`。

- **TypeScript 支持**：每个函数都有完善的类型定义，导出类型。

- **单元测试**：使用 Jest 对核心函数编写测试用例，确保稳定性。

- **模块化**：支持按需引入，避免打包全部代码。例如：

  javascript

  ```
  import { formatMoney } from '@qd/utils'; // 直接引入
  // 或
  import formatMoney from '@qd/utils/formatMoney'; // 按需引入（需配置子路径导出）
  ```

  

- **文档**：提供详细的 README 和示例，让使用者快速上手。

**项目实践**：该工具包已在公司多个项目中使用，覆盖 Web 和小程序。通过不断收集业务需求，我们持续迭代，添加新函数，但保持向后兼容，确保旧项目升级无压力。

------

## 7. 如何处理组件库的样式冲突？CSS 模块化方案？

样式冲突是组件库开发中常见的问题，主要有以下几种解决方案：

### 7.1 BEM 命名规范

使用 BEM（Block Element Modifier）命名约定，为每个组件类名添加前缀和块名，避免与其他组件冲突。

css

```
.qd-button { ... }
.qd-button__icon { ... }
.qd-button--primary { ... }
```



其中 `qd-` 是公司或组件库的前缀，确保唯一性。

### 7.2 CSS Modules

在组件内部使用 CSS Modules，将类名编译为哈希字符串，实现局部作用域。

**Vue 中使用**：

vue

```
<style module>
.button { color: red; }
</style>

<template>
  <button :class="$style.button">按钮</button>
</template>
```



编译后类名变为类似 `_button_1a2b3c`，避免冲突。

**React 中使用**类似。

### 7.3 CSS-in-JS

使用 styled-components 或 emotion 将样式写在 JavaScript 中，利用其作用域特性。但在组件库中，这种方案会增加运行时体积，且不利于提取独立 CSS 文件。

### 7.4 命名空间 + CSS 前缀

在组件库的根元素上添加一个独特的类名，所有样式都嵌套在该类名下，类似于作用域。

css

```
.qd-component {
  .button { ... }
  .input { ... }
}
```



使用时，所有元素都放在 `<div class="qd-component">` 内，样式限定于此。这种方式简单，但会增加一定的 CSS 权重。

### 7.5 样式注入与覆盖控制

组件库应提供自定义主题的能力，通过 CSS 变量或 Less/SCSS 变量让用户覆盖样式，而不是通过覆盖类名的方式。这样既保证了样式隔离，又允许用户定制。

**示例**：

css

```
.qd-button {
  color: var(--qd-button-color, #333);
  background: var(--qd-button-bg, #fff);
}
```



用户可以通过设置 CSS 变量覆盖样式，不会影响其他组件。

### 7.6 组件库中的实践

在开发内部组件库时，我们采用了 **BEM 命名 + CSS 变量**的组合：

- 所有类名以 `qd-` 开头，使用 BEM 规范。
- 关键样式（颜色、圆角、字体）使用 CSS 变量，允许用户通过主题配置覆盖。
- 组件内部不使用 `scoped`，因为 BEM 已保证一定程度的隔离，且 `scoped` 会增加额外的属性选择器，影响性能。

对于用户项目，如果与组件库样式冲突，可以通过更高特异性的选择器覆盖，但更推荐使用 CSS 变量方式。

**项目实践**：在“铅蛋回收”小程序中，我们基于 uView 进行二次封装，uView 本身使用 `u-` 前缀，我们在此基础上再添加业务前缀，并通过 `uni.scss` 中的变量覆盖 uView 的主题，实现了样式统一且无冲突。

# 九、工程化与构建 - Git 与协作 详细解答

------

## 1. Git 常用命令？如何解决冲突？

### 常用 Git 命令分类

#### 基础操作

- `git init`：初始化仓库
- `git clone <url>`：克隆远程仓库
- `git status`：查看工作区状态
- `git add <file>`：添加文件到暂存区
- `git commit -m "message"`：提交暂存区到本地仓库
- `git log`：查看提交历史
- `git diff`：查看工作区与暂存区的差异

#### 分支操作

- `git branch`：列出本地分支
- `git branch <name>`：创建分支
- `git checkout <name>` / `git switch <name>`：切换分支
- `git checkout -b <name>` / `git switch -c <name>`：创建并切换
- `git merge <branch>`：合并指定分支到当前分支
- `git rebase <branch>`：变基
- `git branch -d <name>`：删除分支

#### 远程操作

- `git remote add origin <url>`：关联远程仓库
- `git push origin <branch>`：推送分支到远程
- `git pull origin <branch>`：拉取并合并远程分支
- `git fetch origin`：拉取远程更新但不合并
- `git remote -v`：查看远程仓库信息

#### 撤销与回退

- `git reset HEAD <file>`：从暂存区撤销
- `git checkout -- <file>`：丢弃工作区修改
- `git reset --hard <commit>`：回退到指定提交（危险）
- `git revert <commit>`：通过新提交撤销指定提交
- `git stash`：暂存当前修改
- `git stash pop`：恢复暂存

#### 查看与比较

- `git show <commit>`：查看某次提交详情
- `git blame <file>`：查看文件每行最后修改者
- `git reflog`：查看所有操作记录（包括已删除的提交）

### 如何解决冲突

当两个分支修改了同一文件的同一部分时，合并会产生冲突。解决步骤如下：

1. **发现冲突**：执行 `git merge` 或 `git pull` 后，提示冲突文件，`git status` 会显示 `both modified`。

2. **打开冲突文件**：文件中会包含冲突标记：

   text

   ```
   <<<<<<< HEAD
   当前分支的内容
   =======
   合并分支的内容
   >>>>>>> branch-name
   ```

   

3. **手动解决**：根据需要保留其中一方或修改为全新的内容，并删除冲突标记。

4. **标记已解决**：

   bash

   ```
   git add <file>   # 将解决后的文件添加到暂存区
   ```

   

5. **完成合并**：

   bash

   ```
   git commit       # 提交合并结果（会自动生成合并信息）
   ```

   

**项目实践**：在“铅蛋回收”项目中，多个开发者同时开发不同功能，合并时偶尔出现冲突。我们遵循以下原则：

- 冲突发生后，及时与相关开发者沟通，确认保留哪些代码。
- 使用 IDE（VSCode）内置的冲突解决工具，可视化解决。
- 解决后本地测试通过再推送。

------

## 2. 你们团队的 Git 分支管理策略是怎样的？（Git Flow / GitHub Flow）

在“千源百荟”和“铅蛋回收”项目中，我们根据项目规模和发布节奏采用了不同的分支策略。

### Git Flow（适用于大型项目、固定发布周期）

**分支结构**：

- `master`：主分支，始终对应生产环境代码，每个提交都是可发布的。
- `develop`：开发主干分支，集成所有已完成的功能。
- `feature/*`：功能分支，从 `develop` 检出，完成后合并回 `develop`。
- `release/*`：预发布分支，从 `develop` 检出，用于测试和 bug 修复，完成后合并到 `master` 和 `develop`。
- `hotfix/*`：紧急修复分支，从 `master` 检出，修复后合并到 `master` 和 `develop`。

**优点**：结构清晰，适用于多版本并行、需要严格测试的场景。
**缺点**：分支较多，操作稍复杂。

### GitHub Flow（适用于持续交付、快速迭代）

**分支结构**：

- `main`：主分支，始终保持可部署状态。
- `feature/*`：功能分支，从 `main` 检出，完成后通过 Pull Request 合并回 `main`。

**优点**：简单，适合 CI/CD 和自动化测试。
**缺点**：没有独立的 develop 分支，对大型项目可能不够。

### 团队实践

- **“铅蛋回收 SaaS 后台”**（传统 Web 项目）：采用 **Git Flow**，因为我们有固定的月度发版计划，需要同时维护线上版本和开发版本。每个版本从 `develop` 拉出 `release` 分支，测试通过后合并到 `master` 并打 tag。
- **“千源百荟小程序”**（快速迭代）：采用 **GitHub Flow**，每个功能或 bug 修复直接从 `main` 拉取分支，完成后通过 MR 合并，并触发 CI 自动构建和部署到测试环境。

**规范**：

- 分支命名：`feature/功能名`、`bugfix/问题描述`、`hotfix/版本号`。
- 禁止直接在 `main` 或 `develop` 上提交，必须通过 Pull Request。
- 合并前需通过 CI 检查和至少一人代码审查。

------

## 3. 如何编写规范的 commit message？用过哪些工具？

### 规范 commit message 的重要性

- 提高代码历史可读性。
- 便于生成 changelog。
- 便于追踪问题和回滚。

### 常用规范：Angular Commit Message Convention

格式：

text

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```



**type** 类型：

- `feat`：新功能
- `fix`：修复 bug
- `docs`：文档更新
- `style`：代码格式（不影响代码运行的变动）
- `refactor`：重构
- `perf`：性能优化
- `test`：测试相关
- `chore`：构建过程或辅助工具变动
- `revert`：回退

**scope**：可选，表示影响范围，如组件名、模块名。
**subject**：简短描述，不超过 50 字，使用祈使句，不加句号。
**body**：详细描述，可包含动机和对比。
**footer**：可包含 Breaking Changes 或关闭的 Issue（如 `Closes #123`）。

### 工具支持

- **Commitizen**：交互式生成符合规范的 commit message。

  bash

  ```
  npm install -g commitizen
  commitizen init cz-conventional-changelog --save-dev
  ```

  

  之后使用 `git cz` 替代 `git commit`。

- **commitlint**：检查 commit message 是否符合规范，配合 husky 在 commit-msg 钩子中运行。

- **standard-version**：根据 commit 类型自动升级版本号并生成 changelog。

- **Husky + lint-staged**：在提交前自动执行 lint 和格式化。

### 项目实践

在“千源百荟”项目中，我们强制使用 commit message 规范：

- 配置了 `commitizen` 和 `commitlint`。
- 使用 `husky` 在 `commit-msg` 钩子运行 `commitlint`，确保 message 格式正确。
- 在 CI 中也进行检查，不符合规范的提交会被拒绝。
- 定期使用 `standard-version` 生成 changelog，方便追溯版本变更。

示例：

text

```
feat(order): 添加订单列表导出功能

支持订单列表的 Excel 导出，包含订单号、金额、状态等字段。
后端接口已同步完成。

Closes #123
```



------

## 4. 如何进行代码审查（Code Review）？你关注哪些点？

代码审查是保证代码质量、知识共享和发现潜在问题的重要手段。我们在团队中采用 Pull Request（MR）方式进行审查。

### 审查流程

1. 开发者从主分支拉取功能分支，完成开发后推送到远程。
2. 在 GitLab/GitHub 上创建 Merge Request，指定审查者和相关标签。
3. 审查者收到通知后，在 MR 页面查看代码差异，提出评论。
4. 开发者根据评论修改，推送新提交，MR 自动更新。
5. 审查者确认无误后，批准合并。
6. 合并前确保 CI 通过，并解决冲突。

### 审查关注点

#### 功能性

- 代码是否实现了需求文档中的功能？
- 边界条件是否考虑？（如空值、网络异常）
- 是否有适当的错误处理和用户提示？

#### 代码质量

- 是否符合团队编码规范（ESLint、Prettier）？
- 是否有重复代码？能否抽取复用？
- 变量、函数命名是否清晰？
- 是否有过长的函数或组件？能否拆分？
- 注释是否必要且准确？

#### 性能

- 是否有不必要的重复计算或渲染？
- 数据请求是否过多或可合并？
- 是否使用了合适的数据结构？
- 图片资源是否优化？

#### 安全性

- 是否有 XSS、CSRF 等风险？
- 用户输入是否经过校验和转义？
- 敏感信息（如 token）是否妥善处理？

#### 可测试性

- 代码是否便于编写单元测试？
- 是否提供了必要的测试用例？

#### 文档

- 是否需要更新 README 或 API 文档？
- 复杂逻辑是否有注释说明？

#### 架构与设计

- 是否符合项目架构规范（如组件划分、状态管理）？
- 是否引入不必要的依赖？
- 是否遵循了设计模式？

### 项目实践

- 我们使用 GitLab MR，每个 MR 至少需要一人审查，核心模块需要两人。
- 审查者使用评论功能，建议使用“建议修改”或“问题”等标签。
- 开发者需要及时响应评论，并在解决后标记为“已解决”。
- 定期回顾审查中的共性问题，更新团队规范。

------

## 5. 如何管理多人协作时的代码合并冲突？

多人协作时，代码合并冲突不可避免。良好的协作流程可以减少冲突频率，并高效解决冲突。

### 预防冲突的策略

1. **小步快跑**：功能分支尽量短小，频繁合并回主分支，减少长期分支导致的冲突。

2. **及时同步**：每日开始工作前，拉取最新主分支代码合并到自己的分支。

   bash

   ```
   git checkout main
   git pull
   git checkout feature-branch
   git merge main
   ```

   

3. **清晰的任务划分**：避免多人同时修改同一模块的同一文件。

4. **代码所有权**：明确每个模块的主要负责人，修改前沟通。

### 冲突发生时的处理流程

1. **识别冲突**：当执行 `git merge` 或 `git pull` 时，Git 会提示冲突文件。

2. **沟通协调**：如果冲突涉及其他开发者的代码，及时沟通，了解对方意图。

3. **解决冲突**：

   - 使用 IDE 的可视化冲突解决工具（VSCode、WebStorm）。
   - 手动编辑文件，删除冲突标记，保留正确代码。
   - 如果冲突复杂，可先备份，然后与相关人员一起解决。

4. **测试验证**：解决后本地运行项目，确保功能正常，没有引入新问题。

5. **提交合并**：

   bash

   ```
   git add .
   git commit
   ```

   

6. **推送代码**：推送到远程分支，继续 MR 流程。

### 项目实践

- 我们鼓励频繁同步，特别是在多人合作的模块，每天至少同步一次。
- 使用 `git pull --rebase` 保持线性历史，但需谨慎使用，避免在公共分支上 rebase。
- 对于复杂冲突，会在团队群中发起“冲突解决会议”，相关人员一起快速解决。
- 定期培训新成员如何解决冲突，提高团队整体能力。

### 示例：解决冲突的 Git 命令流程

bash

```bash
# 切换到主分支并更新
git checkout main
git pull

# 切换回功能分支，合并主分支
git checkout feature/user-list
git merge main
# 此时提示冲突

# 查看冲突文件
git status

# 手动解决冲突（使用编辑器）
# ...

# 标记已解决并提交
git add src/components/UserList.vue
git commit -m "merge: 解决 UserList 组件冲突"

# 推送更新
git push origin feature/user-list
```

# 十、性能优化 详细解答

------

## 1. 你如何衡量前端性能？常用哪些指标？（FCP、LCP、TTI 等）

**前端性能指标**主要分为三类：加载性能、交互性能和视觉稳定性。常用指标包括：

- **FCP（First Contentful Paint）**：首次内容绘制，指页面从开始加载到页面内容的任何部分在屏幕上完成渲染的时间。标记了用户看到“有东西”的时间点。
- **LCP（Largest Contentful Paint）**：最大内容绘制，指视口中最大的可见内容元素（如图片、文本块）渲染完成的时间。衡量页面主要内容加载速度。
- **TTI（Time to Interactive）**：可交互时间，指页面完全可交互的时间点。此时页面内容已渲染，且能够快速响应用户输入。
- **FID（First Input Delay）**：首次输入延迟，测量用户首次与页面交互（点击按钮、链接等）到浏览器实际能够响应的时间。反映页面交互流畅度。
- **CLS（Cumulative Layout Shift）**：累计布局偏移，测量页面整个生命周期中发生的意外布局偏移的分数。衡量视觉稳定性。
- **TBT（Total Blocking Time）**：总阻塞时间，测量 FCP 到 TTI 之间主线程被阻塞（无法响应用户输入）的总时间。
- **Speed Index**：速度指数，表示页面可见部分填充的平均时间。

**项目中的衡量工具**：

- **Lighthouse**：生成性能报告，给出各项指标的得分和优化建议。
- **Chrome DevTools Performance 面板**：录制页面加载和交互过程，分析耗时任务、重排重绘、网络请求等。
- **Web Vitals**：Google 提供的库，可以实时收集并上报核心指标。
- **小程序体验评分**：微信/支付宝开发者工具提供了体验评分工具，分析小程序性能。

在“铅蛋回收”项目中，我们使用 Lighthouse 进行定期性能审计，重点关注 FCP 和 LCP。优化后，FCP 从 2.5s 降到 1.2s，LCP 从 4s 降到 2.2s。

------

## 2. 首屏加载优化你做了哪些具体工作？效果如何？

首屏加载优化是前端性能优化的核心，我们在“千源百荟”和“铅蛋回收”项目中实施了以下措施：

### 2.1 路由懒加载

- 将每个页面组件拆分为独立的 chunk，访问时才加载。
- 使用 `defineAsyncComponent`（Vue 3）或路由的 `component: () => import()` 实现。
- 效果：首屏只加载当前页面所需 JS，减少首包体积约 40%。

### 2.2 组件异步加载

- 对于非首屏展示的组件（如下拉框、弹窗、图表），使用动态导入，在需要时加载。
- 例如：在首页中，只有用户点击“查看统计”时才加载 ECharts 组件。

### 2.3 图片优化

- 将首屏图片转为 WebP 格式（兼容性降级为 PNG）。
- 使用 `loading="lazy"` 属性实现图片懒加载。
- 将图片上传至 CDN，并设置合适的尺寸参数（如 `?x-oss-process=image/resize,w_400`）。

### 2.4 资源压缩与合并

- 开启 Gzip / Brotli 压缩（Nginx 或云服务商配置）。
- 使用 `terser` 压缩 JS，`cssnano` 压缩 CSS。
- 合并小图标为雪碧图或使用 iconfont。

### 2.5 减少阻塞渲染的资源

- 将 CSS 内联到 HTML 头部，避免外部 CSS 阻塞渲染（仅对关键 CSS）。
- 使用 `preload` 预加载关键资源，`preconnect` 预连接第三方域名。

### 2.6 骨架屏

- 在数据加载完成前，显示与页面结构相似的占位元素，提升感知速度。
- 对于列表页，使用循环生成的占位卡片。

### 2.7 服务端渲染（SSR）或静态生成

- 官网项目采用了 Vue 的 SSR（Nuxt），首屏直接返回 HTML，极大提升 FCP。

### 2.8 缓存策略

- 将不常变的资源（如框架、组件库）通过 `splitChunks` 分离，并设置强缓存。
- 使用 `localStorage` 缓存用户信息、配置数据，减少请求。

### 2.9 减少 HTTP 请求

- 合并小图标为字体图标或 SVG 精灵。
- 使用 `data:url` 内联极小图片。

**效果**：在“千源百荟官网”项目中，通过上述优化，首屏加载时间从 3.2s 降低到 1.5s，LCP 从 4.5s 降低到 2.1s，性能得分从 65 提升到 92。

------

## 3. 图片懒加载的实现原理？你在项目中如何实现？

**图片懒加载**：当页面滚动到图片即将进入可视区域时，才加载真实的图片资源，从而减少初始加载的请求数和带宽消耗。

### 实现原理

- 将图片的真实 URL 存储在自定义属性（如 `data-src`）中，`src` 属性使用占位图（或空）。
- 监听滚动事件，判断图片是否进入可视区域（通过 `getBoundingClientRect()` 或 Intersection Observer）。
- 当图片进入可视区域时，将 `data-src` 的值赋给 `src`，触发图片加载。
- 加载完成后，可移除 `data-src` 属性或添加加载完成的类。

### 传统实现（监听 scroll + 节流）

javascript

```
function lazyLoad() {
  const images = document.querySelectorAll('img[data-src]');
  images.forEach(img => {
    const rect = img.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    }
  });
}
window.addEventListener('scroll', throttle(lazyLoad, 200));
```



### 现代实现（Intersection Observer）

javascript

```
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});
document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
```



Intersection Observer 性能更好，不需要监听滚动，且能处理 iframe 内滚动。

### 项目中的实现

在“千源百荟小程序”中，我们直接使用 uni-app 内置的 `lazy-load` 属性（基于小程序原生的懒加载）。在 H5 端，我们使用 `v-lazy` 自定义指令，内部使用 Intersection Observer。

**自定义指令示例**（Vue 3）：

javascript

```
const vLazy = {
  mounted(el, binding) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.src = binding.value;
          observer.unobserve(el);
        }
      });
    });
    observer.observe(el);
    el._lazyObserver = observer;
  },
  beforeUnmount(el) {
    el._lazyObserver?.disconnect();
  }
};
```



使用：`<img v-lazy="'https://example.com/image.jpg'">`

**效果**：首屏图片请求数从 20 个减少到 6 个，首屏加载时间减少 30%。

------

## 4. 什么是 CDN 加速？如何配置？你项目中哪些资源用了 CDN？

**CDN（Content Delivery Network）** 即内容分发网络，通过在全球部署边缘节点，将用户的请求调度到离用户最近的节点上，从而加速静态资源的访问。

### CDN 加速的原理

- 源站资源被复制到多个边缘节点。
- 用户请求时，DNS 解析返回离用户最近的节点 IP。
- 节点提供缓存资源，若未缓存则回源拉取并缓存。
- 减少网络延迟，降低源站压力。

### 如何配置

1. **购买 CDN 服务**：如阿里云 CDN、腾讯云 CDN、七牛云等。
2. **添加加速域名**：例如 `cdn.example.com`，并配置源站域名（如 `static.example.com`）或 OSS 桶。
3. **CNAME 解析**：将加速域名 CNAME 到 CDN 服务商提供的域名。
4. **配置缓存规则**：设置不同类型文件的缓存时间（如图片缓存 30 天，HTML 不缓存）。
5. **HTTPS 配置**：上传 SSL 证书，启用 HTTPS 访问。
6. **刷新预热**：资源更新时手动刷新 CDN 缓存。

### 项目中的使用

在“千源百荟”和“铅蛋回收”项目中，我们将以下资源上传至 CDN：

- **图片资源**：所有用户上传的图片、商品图片、banner 图等，上传时直接保存到 OSS，并绑定 CDN 域名。前端使用 `https://cdn.example.com/images/xxx.jpg` 访问。
- **静态 JS/CSS**：构建后的产物（除 index.html）上传至 CDN。在 `vite.config.js` 中配置 `base: 'https://cdn.example.com/'`，使资源引用指向 CDN 地址。
- **字体文件**：iconfont 或自定义字体。
- **第三方库**：通过 CDN 引入 Vue、Element Plus 等（但对于现代项目，更常用本地打包 + CDN 缓存策略）。

**效果**：CDN 加速后，国内不同地区的用户加载速度提升明显，图片加载平均时间从 800ms 降到 200ms。

------

## 5. 如何减少接口请求次数？你实现了哪些缓存策略？

减少接口请求次数可以降低服务器压力，提高页面响应速度。我们在项目中实施了以下缓存策略：

### 5.1 前端数据缓存

- **本地存储**：将不常变的数据（如省市区列表、配置信息）存储在 `localStorage` 或 `indexedDB` 中，设置过期时间。每次请求前先检查缓存是否存在且未过期。

  javascript

  ```
  async function getRegionData() {
    const cache = localStorage.getItem('region_data');
    if (cache) {
      const { data, expire } = JSON.parse(cache);
      if (expire > Date.now()) return data;
    }
    const data = await api.getRegion();
    localStorage.setItem('region_data', JSON.stringify({
      data,
      expire: Date.now() + 7 * 24 * 60 * 60 * 1000 // 一周
    }));
    return data;
  }
  ```

  

- **内存缓存**：对于单页应用，使用全局状态（Pinia/Vuex）缓存已加载的数据，如用户信息、订单列表，避免重复请求。

### 5.2 请求合并

- **批量请求**：当多个组件需要同一类型数据时，合并为一个请求。例如使用 `axios` 的请求队列，在短时间内收集所有请求参数，一次性发送。
- **GraphQL**：虽然未使用，但 GraphQL 允许一次请求获取多个资源。

### 5.3 防抖与节流

- 对搜索输入、滚动加载等高频触发的事件进行防抖节流，减少请求次数。

### 5.4 使用 WebSocket 替代轮询

- 对于需要实时更新的数据（如订单状态），使用 WebSocket 推送，避免客户端定时轮询（详见第 7 题）。

### 5.5 缓存策略（HTTP 缓存）

- 配置服务器响应头 `Cache-Control`，使浏览器缓存静态资源和 API 响应（如 `max-age=60` 一分钟内不重复请求）。

### 5.6 数据预取

- 在用户即将进行操作时提前请求数据，如 hover 链接时预加载页面数据。

### 5.7 虚拟列表 + 分页加载

- 只请求当前可视区域的数据，减少一次性数据量（详见第 8、9 题）。

**项目实践**：

- 在“铅蛋回收”小程序中，我们将省市区数据缓存到本地，每月更新一次，减少首页请求。
- 对于订单列表，使用分页加载，每次只请求 10 条，且缓存已加载的页面，后退时不重新请求。
- 通过防抖控制搜索请求，用户停止输入 300ms 后才发送请求。

**效果**：接口请求量减少约 40%，页面切换速度提升。

------

## 6. 防抖和节流在性能优化中的应用场景？举例说明。

**防抖（Debounce）** 和 **节流（Throttle）** 是限制函数执行频率的两种技术，常用于优化高频触发的事件。

### 6.1 防抖

- **原理**：在事件被触发 n 秒后执行回调，如果在这 n 秒内又被触发，则重新计时。

- **适用场景**：只关心最终状态，如输入框搜索、窗口调整大小、自动保存草稿。

- **项目实例**：

  - **搜索框**：用户输入时，每次按键都发起请求会浪费资源。使用防抖，用户停止输入 300ms 后请求。

    javascript

    ```
    const searchDebounced = debounce((keyword) => {
      api.search(keyword);
    }, 300);
    ```

    

  - **表单验证**：实时验证输入合法性，但无需每个字符都验证，使用防抖减少验证频率。

### 6.2 节流

- **原理**：规定一个单位时间，在这个时间内只能触发一次回调。如果被多次触发，只有一次生效。

- **适用场景**：需要定期执行的场景，如滚动加载、拖拽、射击游戏。

- **项目实例**：

  - **滚动加载更多**：监听页面滚动，使用节流控制每 200ms 检查一次是否需要加载。

    javascript

    ```
    window.addEventListener('scroll', throttle(() => {
      if (nearBottom()) loadMore();
    }, 200));
    ```

    

  - **按钮点击**：防止用户快速重复点击导致多次提交，使用节流限制点击频率（或防抖更合适，但节流也能起作用）。

### 6.3 自定义指令封装

在 Vue 项目中，我们封装了 `v-debounce` 和 `v-throttle` 指令，方便在模板中使用：

html

```
<button v-debounce:click="[handleClick, 500]">提交</button>
<input v-debounce:input="[search, 300]" />
```



**效果**：防抖节流显著减少了不必要的请求和计算，提升了页面性能和用户体验。

------

## 7. WebSocket 相比轮询的优势？你在项目中如何用 WebSocket 替代轮询？

**轮询**：客户端定时（如每 3 秒）向服务器发送请求，询问是否有新数据。缺点：大量无效请求，浪费带宽和服务器资源；实时性不高（取决于轮询间隔）。

**WebSocket**：全双工通信协议，客户端与服务器建立持久连接，服务器可以主动向客户端推送数据。优势：

- **实时性**：服务器有新数据立即推送，延迟低。
- **节省资源**：无重复请求头开销，连接保持后只传输数据。
- **服务器压力小**：避免大量轮询请求。

### 项目中的应用

在“铅蛋回收”小程序中，我们有以下需要实时更新的场景：

- **订单状态变化**：用户下单后，后台更新订单状态（如已接单、配送中、已完成）。
- **回收员接单**：回收员端需要实时收到新订单提醒。
- **消息通知**：系统向用户发送优惠券、活动通知。

之前使用轮询：前端每 5 秒请求一次订单状态接口，造成大量无效请求（大多数时间状态无变化），且服务器压力大。

**改用 WebSocket**：

1. **建立连接**：用户登录后，前端建立 WebSocket 连接，携带 token 进行身份认证。
2. **订阅频道**：连接成功后，发送订阅消息（如 `{ type: 'subscribe', channel: 'order_' + userId }`）。
3. **服务器推送**：当订单状态变化时，服务器向对应用户的 WebSocket 连接推送消息。
4. **前端处理**：收到消息后，更新本地数据（如重新拉取订单列表或直接更新当前页面状态）。
5. **心跳与重连**：定时发送 ping 保活，断开后自动重连。

**代码片段**（使用 uni-app）：

javascript

```
// 封装 WebSocket 服务
class WebSocketService {
  constructor() {
    this.socketTask = null;
    this.reconnectTimer = null;
  }

  connect() {
    this.socketTask = uni.connectSocket({
      url: 'wss://example.com/ws',
      success: () => console.log('连接成功')
    });

    this.socketTask.onOpen(() => {
      console.log('WebSocket 已打开');
      this.heartbeat();
    });

    this.socketTask.onMessage((res) => {
      const data = JSON.parse(res.data);
      this.handleMessage(data);
    });

    this.socketTask.onClose(() => {
      console.log('连接关闭，尝试重连...');
      this.reconnect();
    });
  }

  heartbeat() {
    setInterval(() => {
      this.socketTask.send({ data: 'ping' });
    }, 30000);
  }

  reconnect() {
    clearTimeout(this.reconnectTimer);
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, 3000);
  }

  handleMessage(data) {
    // 根据消息类型分发到对应 store 或页面
    if (data.type === 'order_update') {
      useOrderStore().updateOrder(data.order);
    }
  }
}
```



**效果**：改用 WebSocket 后，服务器请求量减少 80%，订单状态更新延迟从平均 2.5 秒降低到 300ms，用户体验显著提升。

------

## 8. 虚拟列表的原理？你在什么场景下使用了虚拟列表？

**虚拟列表**：一种优化长列表渲染的技术，只渲染可视区域内的列表项，而非全部数据。当滚动时，动态计算并替换可视区域的内容，从而减少 DOM 节点数量，提升性能和内存占用。

### 实现原理

1. **容器固定高度**：列表容器设置固定高度（或最大高度），并开启滚动。
2. **计算可视区域**：监听滚动事件，根据滚动位置计算出当前应该显示的数据起始索引和结束索引。
3. **渲染可视项**：只渲染索引范围内的数据项，其他项用占位元素填充高度（或通过 `padding` 撑开滚动条）。
4. **动态更新**：滚动时重新计算索引，替换渲染内容。

### 关键点

- **总高度**：需要知道每个项的高度（固定高度或动态计算）。固定高度实现简单，动态高度需预估或测量。
- **缓冲区**：为避免滚动时出现白屏，通常在可视区域上下多渲染几个项作为缓冲。
- **性能**：使用 `transform: translateY` 移动列表项，避免重排。

### 项目中的应用

在“铅蛋回收 SaaS 后台”的**订单列表**页面，订单数量可能达到上万条。一次性渲染所有订单会导致页面卡顿甚至崩溃。我们使用了虚拟列表组件（基于 `vue-virtual-scroller` 库）。

**使用示例**：

vue

```
<template>
  <virtual-scroller
    :items="orders"
    :item-height="60"
    class="order-list"
  >
    <template #default="{ item }">
      <div class="order-item">{{ item.orderNo }}</div>
    </template>
  </virtual-scroller>
</template>
```



**效果**：无论数据量多大，页面始终只渲染几十个 DOM 节点，滚动流畅，内存占用稳定。

------

## 9. 如何优化长列表渲染？你用过哪些方案？

除了虚拟列表，长列表渲染还可以通过以下方案优化：

### 9.1 分页加载

- 最常见的方式，每次只加载一页数据（如 10-20 条），用户滚动到底部时加载下一页。
- 结合后端分页，前端维护已加载的数据数组。
- 适用于移动端列表，用户习惯分批查看。

### 9.2 时间分片

- 对于一次性需要渲染大量数据但无法分页的场景（如大量图表点），可以将渲染任务拆分为多个小任务，使用 `requestAnimationFrame` 或 `setTimeout` 分批插入 DOM。
- 避免长时间阻塞主线程。

### 9.3 使用 `v-once` 或静态节点

- 对于列表中不变的部分（如每项的结构），使用 `v-once` 指令，使其只渲染一次，后续更新跳过。

### 9.4 优化更新粒度

- 避免在列表更新时重新渲染所有项，使用 `key` 确保 Vue 能复用现有 DOM。
- 对于复杂项，使用 `shouldUpdate` 或 `computed` 减少不必要的更新。

### 9.5 图片懒加载

- 列表中的图片使用懒加载，只有进入可视区域才加载，减少初始渲染和网络请求。

### 9.6 使用 `display: none` 或 `opacity` 替代 `v-if`

- 如果频繁切换列表项的显示隐藏，用 `v-show` 替代 `v-if`，避免频繁创建销毁。

### 9.7 Web Worker

- 对于列表数据的复杂处理（如过滤、排序），可以放在 Web Worker 中执行，避免阻塞主线程。

### 项目实践

- 在“铅蛋回收”小程序的订单列表中，我们结合**分页加载**和**虚拟列表**：初始加载 20 条，滚动到底部加载下一页；当数据超过 100 条时，启用虚拟列表（使用 `recycle-view` 小程序组件）。
- 在“SaaS 后台”的日志列表，使用**分页加载** + **时间分片**渲染图表数据点。

------

## 10. 小程序包体积优化你做了哪些？如何检查包体积？

小程序有严格的包体积限制（微信主包 2M，总包 20M），优化包体积是上线前的必要工作。

### 10.1 代码层面

- **分包加载**：将非核心页面拆分为分包（如订单、用户、回收员），减少主包体积。
- **按需引入组件**：避免全局注册组件，使用 `easycom` 自动按需引入。
- **移除无用代码**：使用 ESLint 检测未使用的变量、函数，删除无用文件。
- **使用 `day.js` 替代 `moment.js`**：减少库体积。
- **优化图片**：图片上传 CDN，代码中只保留 CDN 链接，不打包图片。
- **压缩代码**：生产环境自动压缩 JS、CSS、HTML。

### 10.2 静态资源

- **字体图标**：使用 iconfont 或 SVG 代替图片图标。
- **图片压缩**：使用 tinyPNG 压缩图片，WebP 格式（小程序支持？需确认）。
- **雪碧图**：将小图标合并为雪碧图，减少请求数，但现代小程序已支持 HTTP/2，非必须。

### 10.3 配置检查

- **查看打包分析**：使用微信开发者工具的“代码依赖分析”功能，查看各文件大小。
- **使用 `webpack-bundle-analyzer`**：在 uni-app 中可以通过配置生成分析报告。

### 10.4 分包预加载

- 配置 `preloadRule`，让用户在首页时预加载可能访问的分包，但不会增加主包体积。

### 项目实践

在“铅蛋回收”小程序中，我们通过以下措施将主包体积从 2.8M 降到 1.5M：

- 将订单、用户、回收员三个模块拆分为独立分包。
- 将 uView 组件库改为按需引入（使用 `easycom`）。
- 将所有本地图片替换为 CDN 链接。
- 移除未使用的第三方库（如 `lodash` 改用自己实现的工具函数）。
- 使用 `day.js` 替代 `moment.js`。

**检查工具**：使用微信开发者工具“详情”中的“代码依赖分析”，以及“真机调试”中的“性能分析”查看包大小。

------

## 11. 如何分析和定位性能瓶颈？用过哪些工具？（Lighthouse、Chrome DevTools 等）

分析和定位性能瓶颈是优化的第一步，我们使用以下工具：

### 11.1 Lighthouse

- **用途**：生成页面性能报告，给出 FCP、LCP、TTI 等指标得分，并提供优化建议。
- **使用**：Chrome 开发者工具中的 Lighthouse 面板，或命令行工具。
- **项目实践**：定期运行 Lighthouse，根据建议进行优化（如减少未使用的 JS、预加载资源）。

### 11.2 Chrome DevTools Performance 面板

- **用途**：记录页面加载或交互过程，分析主线程任务、渲染帧、网络请求、内存使用等。
- **关键视图**：
  - **火焰图**：查看函数调用栈，找出耗时长的任务。
  - **Network 面板**：查看资源加载时序，找出阻塞渲染的请求。
  - **Memory 面板**：分析内存泄漏，拍摄堆快照比较。
- **项目实践**：在“SaaS 后台”中，我们发现某个组件渲染耗时过长，通过 Performance 面板定位到是大量计算导致的，优化后减少计算。

### 11.3 WebPageTest

- **在线工具**，提供多地域、多设备的性能测试，包括首屏时间、Speed Index 等。

### 11.4 小程序体验评分

- 微信/支付宝开发者工具自带的评分工具，分析小程序性能、体验、最佳实践。

### 11.5 自定义性能监控

- 使用 Performance API 收集实际用户数据（RUM），如 `performance.mark()`、`performance.measure()`，上报到监控平台。
- 使用 `web-vitals` 库收集核心指标。

### 11.6 Bundle 分析工具

- **webpack-bundle-analyzer** / **rollup-plugin-visualizer**：分析打包后各模块体积，找出过大的依赖。
- 在 Vite 项目中，使用 `rollup-plugin-visualizer` 生成分析报告。

### 11.7 代码覆盖率工具

- Chrome DevTools Coverage 面板：查看 JS 和 CSS 的代码覆盖率，找出未使用的代码，按需删除或懒加载。

### 项目实践

在“千源百荟”项目中，我们使用 Lighthouse 发现首屏 LCP 较慢，通过 Performance 面板定位到是一张大图加载过慢，优化图片格式和 CDN 后解决。同时使用 Coverage 工具发现部分第三方库（如 ECharts）未被首页使用，改为异步加载。

## 

# 十一、项目问题

## 项目一：千源百荟再生资源回收全链路前端体系（官网+ToC小程序）详细解答

------

## 1. 请介绍一下这个项目的整体架构和技术选型，为什么选择 Vue3 + Vite？

**项目整体架构**：

本项目包含两个核心部分：**企业官网**（PC端）和 **ToC 微信小程序**。两者共享同一套业务逻辑，但分别独立部署。

- **官网**：面向 PC 端用户，承担品牌展示、业务介绍、客户入驻、线上报价下单等功能。采用 **Vue 3 + TypeScript + Vite + Pinia + Vue Router + Element Plus** 构建，部署在 Nginx 服务器上。
- **小程序**：面向 C 端用户，提供废旧电池上门回收、电池租赁换新、救援维修、订单管理、在线支付等服务。采用 **uni-app + Vue 3 + TypeScript + Pinia + uView** 开发，发布到微信平台。

**技术选型理由**：

- **Vue 3**：选择 Vue 3 主要是因为其 **Composition API** 带来的逻辑复用优势，以及基于 Proxy 的响应式系统带来的性能提升。项目中需要处理复杂的业务逻辑（如订单流程、多角色权限），Composition API 让我们能够将相关逻辑抽离为独立的组合式函数（如 `useOrder`、`useAuth`），在官网和小程序之间复用代码（通过条件编译区分平台）。此外，Vue 3 的 TypeScript 支持更完善，有助于团队协作和代码健壮性。
- **Vite**：作为构建工具，Vite 提供了极快的开发启动速度和热更新，极大提升开发体验。官网项目需要快速迭代，Vite 的 ESM 开发服务器几乎瞬间启动，且热更新仅更新修改的模块。生产环境使用 Rollup 打包，产物优化良好。另外，Vite 对 Vue 3 和 TypeScript 的支持开箱即用，无需复杂配置。
- **Pinia**：相比 Vuex，Pinia 更轻量、类型友好且与 Composition API 无缝集成。在项目中，我们使用 Pinia 管理用户状态、订单状态、全局配置等，多个页面和组件共享状态时非常方便。
- **Element Plus**：官网后台管理部分（如客户入驻表单）使用 Element Plus 快速搭建界面，其组件丰富、文档完善，且支持按需引入，减小打包体积。
- **uni-app**：为了同时支持微信小程序和后续可能的支付宝小程序，选择 uni-app 跨端框架。它基于 Vue 语法，让我们能够复用大部分业务代码（如 API 请求、状态管理、工具函数），只需通过条件编译处理平台差异（如支付、登录）。

------

## 2. 你是如何从零搭建项目脚手架的？做了哪些工程化配置？

**搭建步骤**：

1. **初始化项目**：

   - 官网：使用 `npm create vue@latest` 创建项目，选择 Vue 3、TypeScript、Pinia、Vue Router、Vite 等选项。
   - 小程序：使用 `npm create uni-app` 创建 uni-app 项目，选择默认模板，Vue 3 版本。

2. **目录结构设计**：

   text

   ```
   src/
   ├── api/               # API 请求模块
   ├── assets/            # 静态资源
   ├── components/        # 公共组件
   ├── composables/       # 组合式函数
   ├── layouts/           # 布局组件（官网用）
   ├── pages/             # 页面组件
   ├── router/            # 路由配置
   ├── stores/            # Pinia 状态管理
   ├── styles/            # 全局样式
   ├── types/             # TypeScript 类型声明
   ├── utils/             # 工具函数
   ├── App.vue
   └── main.ts
   ```

   

3. **工程化配置**：

   - **路径别名**：配置 `@` 指向 `src`，并在 `tsconfig.json` 中添加路径映射，方便导入。
   - **环境变量**：创建 `.env.development`、`.env.production` 等文件，管理 API 地址、AppId 等。官网使用 Vite 的 `import.meta.env`，小程序使用 `process.env`（通过 `vue.config.js` 或 `manifest.json` 配置）。
   - **代码规范**：
     - 安装 ESLint、Prettier、Stylelint，配置 `@vue/eslint-config-typescript` 等。
     - 使用 `husky` + `lint-staged`，在提交前自动格式化并检查代码。
     - 配置 `.editorconfig` 统一编辑器风格。
   - **Git 规范**：使用 `commitizen` 规范提交信息，`commitlint` 检查，配合 `standard-version` 自动生成 changelog。
   - **构建优化**：
     - 官网 Vite 配置：设置 `build.rollupOptions.output.manualChunks` 将第三方库（如 Element Plus、ECharts）单独打包。
     - 小程序分包配置：在 `pages.json` 中设置 `subPackages`，将订单、用户等模块拆分为分包。
   - **CI/CD**：配置 GitHub Actions，在推送时自动运行 lint、测试，并构建部署到测试服务器。

4. **基础功能封装**：

   - **请求封装**：基于 Axios（官网）和 `uni.request`（小程序）封装统一请求函数，处理错误、loading、token 刷新等。
   - **存储封装**：封装 `localStorage` 和 `sessionStorage`，支持过期时间（官网）；小程序使用 `uni.setStorageSync` 封装。
   - **工具函数**：封装日期格式化、金额处理、防抖节流等通用函数，并发布为内部 npm 包 `@qd/utils`。

------

## 3. 你封装的 `qd-*` 通用业务组件库包含哪些组件？如何设计才能让多项目复用？

**`qd-\*` 组件库**包含以下组件（基于 Element Plus 和 uView 二次封装，或完全自研）：

- **`QdAddressPicker`**：省市区地址选择器，支持回显、搜索、动态加载数据。
- **`QdUpload`**：图片/文件上传组件，集成阿里云 OSS 直传，支持预览、删除、限制大小和格式。
- **`QdTable`**：表格组件，封装分页、加载状态、空状态，支持列配置和自定义操作列（基于 Element Plus 的 ElTable）。
- **`QdForm`**：表单组件，统一布局、验证规则，支持自动生成表单项（通过 JSON 配置）。
- **`QdDialog`**：弹窗组件，封装确认、取消按钮的 loading 状态，支持拖拽、全屏。
- **`QdCountdown`**：倒计时组件，用于短信验证码、活动倒计时。
- **`QdSteps`**：步骤条组件，展示订单进度。
- **`QdSkeleton`**：骨架屏组件，用于数据加载中的占位。
- **`QdNoData`**：空状态组件，统一无数据、无网络等提示。
- **`QdPermission`**：权限控制组件，根据用户角色显示/隐藏元素（后台用）。

**设计原则**：

- **单一职责**：每个组件只负责一个独立功能，如 `QdAddressPicker` 只处理地址选择，不耦合业务逻辑。
- **可配置性**：提供丰富的 props 和事件，允许用户自定义行为。例如 `QdUpload` 支持 `accept`、`maxSize`、`multiple`、`beforeUpload` 等。
- **插槽扩展**：通过插槽让用户自定义部分内容，如 `QdTable` 提供 `empty`、`append` 插槽，`QdDialog` 提供 `footer` 插槽。
- **样式隔离**：使用 BEM 命名规范，类名以 `qd-` 为前缀，避免污染全局样式。同时支持通过 CSS 变量定制主题。
- **TypeScript 支持**：所有组件均用 TypeScript 编写，导出类型声明，在 IDE 中获得智能提示。
- **文档与示例**：每个组件都有对应的 Markdown 文档和示例代码，放在 `docs` 目录下，方便其他开发者查阅。
- **按需引入**：组件库支持按需引入，通过配置 `unplugin-vue-components` 的 resolver，自动导入组件和样式，减少打包体积。

**多项目复用**：该组件库被发布到公司内部 npm 仓库，在官网和小程序项目中均可使用（通过条件编译处理平台差异，如小程序中使用 uView 的底层组件）。通过这种方式，我们实现了多个项目间的 UI 一致性，并大幅提高开发效率。

------

## 4. 小程序中地图定位导航功能是如何实现的？遇到过哪些问题？

**实现方式**：

- **获取用户位置**：使用 `uni.getLocation` 获取当前经纬度，需在 `manifest.json` 中配置定位权限。
- **选择地址**：使用 `uni.chooseLocation` 打开地图让用户选择位置，返回选中的地址和经纬度。
- **查看位置**：使用 `uni.openLocation` 打开内置地图查看指定位置，并可调用导航。
- **地图组件**：在需要展示地图的页面（如附近门店）使用 `<map>` 组件，绑定经纬度、标记点。

**遇到的问题及解决**：

1. **定位授权失败**：
   - 问题：用户拒绝授权后，再次调用 `uni.getLocation` 无反应。
   - 解决：先通过 `uni.getSetting` 检查授权状态，若已拒绝，弹窗引导用户到设置页开启（`uni.openSetting`）。同时提供手动输入地址的备选方案。
2. **坐标系偏移**：
   - 问题：后端使用高德地图坐标（GCJ02），而小程序默认返回 WGS84，导致位置偏移。
   - 解决：调用 `uni.getLocation` 时指定 `type: 'gcj02'`，确保与后端一致。
3. **在 `scroll-view` 中使用地图导致滚动冲突**：
   - 问题：地图组件本身可拖动，放在 `scroll-view` 中手势冲突。
   - 解决：将地图单独放置，使用 `position: absolute` 悬浮，或用 `cover-view` 覆盖地图上的控件。
4. **chooseLocation 返回结果不一致**：
   - 问题：微信和支付宝返回的字段名不同。
   - 解决：封装统一函数，对返回结果做标准化处理，提取 `name`、`address`、`latitude`、`longitude`。
5. **部分机型定位失败**：
   - 问题：某些老旧手机或特定系统版本定位失败。
   - 解决：增加超时重试，并提示用户检查 GPS 是否开启。同时缓存上次成功定位结果，失败时使用缓存。

------

## 5. 微信支付集成过程中遇到过什么坑？如何处理支付失败后的状态回退？

**支付集成流程**：

- 前端请求后端获取支付参数（prepay_id 等）。
- 调用 `uni.requestPayment` 调起微信支付。
- 根据返回结果处理成功或失败。

**遇到的坑**：

1. **支付参数签名错误**：
   - 问题：后端返回的参数前端直接使用，但偶尔出现签名错误。
   - 排查：发现后端签名时用的 appid 与小程序 appid 不一致。统一后解决。
2. **用户取消支付后无法再次调起**：
   - 问题：用户点击取消后，再次点击支付，调用 `requestPayment` 无反应。
   - 解决：每次调起前重新获取支付参数，不要缓存上一次的（因为 prepay_id 只能使用一次）。
3. **支付成功回调不可靠**：
   - 问题：`requestPayment` 的 success 回调并不代表最终支付成功，只是支付指令发出。
   - 解决：支付成功后不立即跳转，而是轮询后端订单状态（或等待 WebSocket 推送），待状态变为“已支付”再更新 UI。
4. **Android 和 iOS 表现差异**：
   - 问题：部分 Android 机型在支付成功后不返回 app，而是停留在微信。
   - 解决：在支付页面监听 `app.show` 事件，返回时主动查询订单状态。

**支付失败后的状态回退**：

- 如果支付失败（用户取消、余额不足等），订单状态仍为“待支付”，允许用户重新支付。
- 我们在订单详情页提供“继续支付”按钮，重新获取支付参数调起支付。
- 如果用户多次失败后放弃，订单会在 30 分钟后自动取消（后端定时任务）。
- 前端在支付失败时，显示友好提示，并保留订单信息，不跳转页面。

------

## 6. 你是如何设计订单状态管理？如何处理订单超时等场景？

**订单状态设计**：

- 定义订单状态枚举：`pending`（待支付）、`paid`（已支付）、`processing`（处理中）、`shipped`（已发货）、`completed`（已完成）、`cancelled`（已取消）、`refunding`（退款中）、`refunded`（已退款）。
- 在 Pinia 中创建 `order` store，管理当前订单列表和当前选中的订单详情。

**订单状态管理**：

- 订单列表页：使用分页加载，每次请求 10 条，缓存已加载的数据。当订单状态变化时（通过 WebSocket 推送或下拉刷新），更新对应订单的状态。
- 订单详情页：进入页面时根据路由参数 `id` 请求详情，并缓存到 store。如果用户从列表页进入，优先使用缓存数据，再请求更新。
- 状态变更：支付成功后，订单状态由 `pending` 变为 `paid`；后台处理完成后变为 `processing`；发货后变为 `shipped`；用户确认收货后变为 `completed`。

**订单超时处理**：

- **前端倒计时**：在待支付订单详情页，显示剩余支付时间。使用 `QdCountdown` 组件，从后端返回的过期时间戳计算剩余秒数，每秒更新。
- **超时自动取消**：当倒计时归零时，前端提示“订单已超时”，并刷新订单状态（调用接口确认）。同时，后端有定时任务自动取消超时订单，并通过 WebSocket 推送状态变更。
- **轮询与 WebSocket**：为避免倒计时误差，每次页面展示时从接口获取最新订单状态。同时，在订单列表页通过 WebSocket 监听订单状态变化，实时更新。

------

## 7. 小程序分包如何配置？主包和分包分别包含哪些模块？

**分包配置**（`pages.json`）：

json

```
{
  "pages": [
    { "path": "pages/index/index", "style": { ... } },
    { "path": "pages/login/login", "style": { ... } }
  ],
  "subPackages": [
    {
      "root": "package-order",
      "pages": [
        { "path": "list", "style": { ... } },
        { "path": "detail", "style": { ... } },
        { "path": "confirm", "style": { ... } }
      ]
    },
    {
      "root": "package-user",
      "pages": [
        { "path": "profile", "style": { ... } },
        { "path": "address", "style": { ... } },
        { "path": "coupon", "style": { ... } }
      ]
    },
    {
      "root": "package-recycler",
      "pages": [
        { "path": "dashboard", "style": { ... } },
        { "path": "order-list", "style": { ... } },
        { "path": "scan", "style": { ... } }
      ]
    }
  ]
}
```



**主包内容**：

- 核心页面：首页、登录页、公共组件（如 uView 组件库、自定义组件 `qd-*`）、工具函数、状态管理、静态资源（小体积图标）。
- 体积控制：确保主包不超过 2M。

**分包内容**：

- **package-order**：订单列表、订单详情、订单确认、支付等与订单相关的页面。
- **package-user**：个人资料、地址管理、优惠券、设置等用户中心页面。
- **package-recycler**：回收员专用页面（回收员首页、待接单列表、扫码回收、收入明细），仅当用户角色为回收员时可见。

**分包预加载**：在首页配置 `preloadRule`，当用户进入首页后，预加载 `package-user` 分包，提升跳转速度。

------

## 8. 如何实现用户授权登录的流程？token 过期如何刷新？

**登录流程**：

1. **静默登录**：
   - 小程序启动时，检查 `storage` 中是否有 token。
   - 如果有 token，调用 `checkToken` 接口验证有效性。
   - 如果 token 有效，自动登录成功，获取用户信息。
   - 如果 token 无效或过期，则进行静默登录（调用 `uni.login` 获取 code，后端通过 code 换取 openid，若用户已注册则返回新 token）。
2. **用户主动授权**（获取手机号）：
   - 在需要获取用户手机号时（如注册、下单），使用 `<button open-type="getPhoneNumber">`。
   - 获取加密数据后，发送后端解密，绑定手机号并更新用户信息。

**token 过期刷新**：

- 在请求封装中，统一处理 401 状态码：
  - 当后端返回 401（token 过期或无效）时，不直接跳转登录，而是尝试刷新 token。
  - 调用刷新 token 接口（需要携带 refresh token，或者使用静默登录重新获取 code）。
  - 如果刷新成功，重新发起原请求。
  - 如果刷新失败（refresh token 也过期），则清除用户信息，跳转到登录页。
- 使用请求队列防止并发刷新：当多个请求同时返回 401 时，只发起一次刷新请求，其他请求等待刷新完成后再重试。

**代码示例**（请求拦截器简化）：

javascript

```
let isRefreshing = false;
let requests = [];

request.interceptors.response.use(
  response => response,
  async error => {
    const { config, response } = error;
    if (response?.status === 401 && !config._retry) {
      if (isRefreshing) {
        return new Promise(resolve => {
          requests.push(() => resolve(request(config)));
        });
      }
      config._retry = true;
      isRefreshing = true;
      try {
        await refreshToken(); // 刷新 token
        isRefreshing = false;
        requests.forEach(cb => cb());
        requests = [];
        return request(config);
      } catch (err) {
        isRefreshing = false;
        requests = [];
        // 跳转登录
        return Promise.reject(err);
      }
    }
    return Promise.reject(error);
  }
);
```



------

## 9. 这个项目中遇到的最大挑战是什么？你是如何解决的？

**最大挑战**：**多端业务逻辑复用与平台差异的平衡**。项目同时包含官网（PC 端）和小程序，两者业务逻辑相似但 UI 和交互差异较大，且小程序需要同时支持微信和支付宝（未来）。如何在保证代码复用率的同时，又能灵活处理各端差异？

**解决方案**：

1. **分层架构**：
   - **核心业务层**：将纯业务逻辑（如订单计算、状态判断、数据格式化）抽离为独立的 TypeScript 模块，不依赖任何 UI 框架，放在 `utils` 或 `composables` 中。官网和小程序共享这些模块。
   - **UI 层**：针对不同端编写独立的页面组件，但使用相同的组合式函数（如 `useOrder`）获取数据和业务逻辑，确保行为一致。
2. **条件编译**：
   - 在 uni-app 中使用 `#ifdef` 处理小程序与 H5（官网）的差异。例如支付、登录等平台特有 API。
   - 对于官网和小程序共用的组合式函数，通过环境变量判断当前平台，调用不同的 API 实现（如官网使用 Axios，小程序使用 `uni.request`）。
3. **适配层**：
   - 封装统一的 API 请求模块，内部根据平台选择不同的底层实现，对外提供一致的接口。
   - 封装统一的存储、路由、提示等模块，屏蔽底层差异。
4. **组件复用策略**：
   - 对于纯展示型组件（如步骤条、倒计时），编写跨端组件，内部使用条件编译处理样式差异。
   - 对于复杂交互组件（如表单、表格），分别为官网（基于 Element Plus）和小程序（基于 uView）实现，但保持 API 一致，方便上层调用。
5. **自动化测试**：编写核心业务逻辑的单元测试，确保在不同平台行为一致。使用真机测试覆盖主流机型。

通过以上架构，我们实现了约 70% 的代码复用率（包括业务逻辑、工具函数、状态管理），同时保证了各端的最佳体验。

------

## 10. 如何保证多机型、多版本小程序的兼容性？你做了哪些测试？

**兼容性保障措施**：

1. **使用 uni-app 内置兼容**：uni-app 本身已经处理了大量基础 API 和组件的兼容性，我们尽量使用 uni 封装的 API，避免直接调用平台特有 API。
2. **条件编译处理差异**：对于无法统一的 API（如支付、登录），使用条件编译分别实现，并在测试中覆盖两端。
3. **真机测试矩阵**：
   - **微信小程序**：覆盖 iOS 和 Android 主流机型（iPhone 12/13/14/15、华为、小米、OPPO、vivo 等），以及不同系统版本（iOS 14-17，Android 10-14）。
   - **微信版本**：覆盖 8.0.30 以上主流版本。
   - **支付宝小程序**：类似覆盖。
4. **使用开发者工具模拟器**：初步测试布局和功能，但最终以真机为准。
5. **自动化测试**：
   - 使用 **Minium**（微信官方测试框架）编写部分核心流程的自动化测试，如登录、下单、支付。
   - 在 CI 中集成自动化测试，确保每次提交不破坏核心功能。
6. **用户反馈与监控**：
   - 接入 **Sentry** 监控小程序错误，捕获 JS 异常、API 请求失败等。
   - 在关键操作埋点，通过数据分析用户行为，发现异常。
7. **灰度发布**：先发布给内部员工和部分种子用户，观察反馈，无问题后再全量发布。
8. **兼容性检查清单**：
   - 检查 iPhone 刘海屏、挖孔屏的适配（使用 safe-area）。
   - 检查 Android 虚拟按键对底部导航的影响。
   - 检查不同字体大小设置下页面布局是否错乱。
   - 检查弱网环境下接口超时、重试机制是否正常。

**遇到的问题**：早期在 iPhone 12 上发现地图组件部分标记点无法点击，原因是 `map` 组件的 `markers` 属性中的 `id` 未设置导致事件无法识别。修复后所有机型正常。

------

## 11. 项目的上线流程是怎样的？如何监控线上问题？

**上线流程**：

1. **开发阶段**：
   - 在功能分支开发，完成后提交 Merge Request，经代码审查后合并到 `develop` 分支。
   - 自动触发 CI 流程：运行 lint、单元测试、构建，并部署到测试环境。
2. **测试阶段**：
   - 测试人员访问测试环境（官网）或通过测试二维码（小程序）进行功能测试、回归测试。
   - 发现 bug 后，开发者修复并提交，CI 自动更新测试环境。
3. **预发布阶段**：
   - 从 `develop` 分支拉出 `release` 分支，进行最终测试，包括性能测试、兼容性测试。
   - 官网预发布：部署到预发布服务器，验证域名、CDN 等配置。
   - 小程序提交体验版，邀请内部用户和种子用户测试。
4. **发布阶段**：
   - **官网**：将 `release` 分支合并到 `main` 分支，打上版本 tag。CI 自动构建，将产物上传至 CDN，更新服务器静态文件（通过 rsync 或 OSS 同步）。
   - **小程序**：在微信公众平台上传代码，提交审核。审核通过后，手动点击“发布”，可选择全量发布或灰度发布。

**监控线上问题**：

- **错误监控**：
  - 接入 **Sentry**，捕获前端 JS 错误、Promise 异常、资源加载失败等。设置告警规则，当错误量突增时发送通知。
  - 在小程序中使用 `wx.onError` 和 `App.onError` 捕获未处理错误，上报到 Sentry。
- **性能监控**：
  - 使用 **Web Vitals** 收集核心指标（FCP、LCP、CLS），上报到监控平台（如自建或使用阿里云 ARMS）。
  - 小程序使用体验评分工具定期扫描，并监控启动耗时、页面渲染耗时。
- **日志分析**：
  - 关键操作（如登录、支付）埋点，上报到日志服务，分析用户行为路径，发现异常转化率。
  - 通过后台查看接口错误率、响应时间，及时发现后端问题。
- **用户反馈**：
  - 小程序内设置“意见反馈”入口，用户可提交问题截图和描述。
  - 监控应用商店评论和客服反馈，及时响应。
- **告警机制**：
  - 当错误率超过阈值或核心接口失败率升高时，通过钉钉/企业微信机器人发送告警，相关人员及时处理。

通过以上监控体系，我们能够在问题发生第一时间发现并修复，保障线上稳定运行。

## 项目二：铅蛋回收多端小程序（微信+支付宝）详细解答

------

## 1. 同时开发微信和支付宝小程序，你如何管理两端差异？代码复用率如何？

**管理两端差异的策略**：

- **使用 uni-app 跨端框架**：uni-app 已经封装了大量差异，我们优先使用 `uni.` 前缀的 API，如 `uni.request`、`uni.login`、`uni.requestPayment`，这些 API 在编译时会自动转换为对应平台的原生调用。

- **条件编译**：对于无法统一的差异（如支付参数、登录返回字段），使用 `#ifdef` / `#ifndef` 注释块编写平台特定代码。例如：

  javascript

  ```
  // #ifdef MP-WEIXIN
  uni.requestPayment({
    timeStamp: payParams.timeStamp,
    nonceStr: payParams.nonceStr,
    package: payParams.package,
    signType: payParams.signType,
    paySign: payParams.paySign,
    success: () => { ... }
  });
  // #endif
  // #ifdef MP-ALIPAY
  uni.requestPayment({
    orderInfo: payParams.orderInfo,
    success: () => { ... }
  });
  // #endif
  ```

  

- **封装统一适配层**：对于业务逻辑中需要调用的平台能力（如登录、支付、地图），我们封装了统一的函数，内部根据平台选择不同实现，对外暴露一致的参数和返回值。例如 `login()` 返回统一的 `{ code, platform }` 对象，上层无需关心是微信还是支付宝。

- **样式适配**：使用 Flex 布局为主，避免依赖平台特有样式。对于必须差异化的样式（如按钮颜色），通过条件编译或在 CSS 中覆盖。

- **组件库选择**：使用 uni-app 生态的 uView 组件库，它本身已做了多端适配，减少我们的工作量。

**代码复用率**：

- 业务逻辑层（如状态管理、工具函数、API 请求封装）复用率约 **90%**，因为这些与平台无关。
- UI 组件层：基础组件（如地址选择器、弹窗）复用率约 **80%**，通过条件编译处理少量样式差异。
- 页面层：复用率约 **70%**，部分页面因平台交互差异需单独编写（如支付页），但核心逻辑仍通过组合式函数复用。
  整体项目代码复用率约 **80%**，大大减少了维护成本。

------

## 2. 支付宝小程序从 0 到 1 的架构搭建中，你重点考虑了哪些方面？

**支付宝小程序架构搭建考虑要点**：

1. **技术选型**：基于 uni-app 框架，确保后续可扩展至其他平台。选择 Vue 3 + TypeScript + Pinia，与微信小程序保持一致，便于代码复用。
2. **目录结构**：与微信小程序保持一致，区分主包和分包，将支付宝特有的代码放在 `platforms/alipay` 目录下（通过条件编译引用）。
3. **权限配置**：在 `manifest.json` 中配置支付宝小程序的权限声明（如定位、相机、蓝牙等），确保功能正常。
4. **API 差异处理**：梳理支付宝与微信的 API 差异清单，提前规划适配方案。例如登录、支付、地图等，封装统一接口。
5. **分包策略**：与微信小程序采用相同的分包结构（订单、用户、回收员），确保主包体积符合支付宝限制（主包 2M，总包 8M）。
6. **组件库适配**：uView 对支付宝小程序的支持情况调研，确保所用组件在支付宝端表现正常。对于不兼容的组件，自行封装或回退。
7. **调试与测试**：配置支付宝开发者工具，编写自动化测试脚本覆盖核心流程。建立真机测试矩阵，覆盖主流支付宝版本和机型。
8. **发布流程**：熟悉支付宝小程序的上传、审核、发布流程，与微信并行管理两个平台的版本。

**重点考虑**：保证两端业务逻辑一致的前提下，尽量减少条件编译代码，维护代码可读性。通过封装适配层，使上层业务代码对平台无感知。

------

## 3. 如何实现多角色（门店、运力、回收公司、消费者）的权限和功能隔离？

**多角色权限设计**：

- **角色定义**：在用户登录时，后端返回用户角色（`role`）字段，可能的值：`consumer`（消费者）、`store`（门店）、`transporter`（运力）、`company`（回收公司）。

- **路由权限**：使用 uni-app 的页面路由，结合路由守卫（在 `pages.json` 中无法直接配置，通过在 `App.vue` 或页面 `onLoad` 中检查角色，无权限则跳转提示页）。例如：

  javascript

  ```
  // 在页面 onLoad 中
  onLoad() {
    const userStore = useUserStore();
    if (userStore.role !== 'transporter') {
      uni.showToast({ title: '无权限访问', icon: 'none' });
      setTimeout(() => uni.navigateBack(), 1500);
    }
  }
  ```

  

- **菜单权限**：根据角色动态生成首页菜单或底部导航。例如消费者首页显示“回收下单”、“我的订单”，回收员首页显示“接单”、“扫码回收”。

- **按钮级权限**：封装自定义指令 `v-role`，根据角色显示/隐藏元素。例如只有回收公司才能看到“批量导出”按钮。

  javascript

  ```
  // v-role 指令
  const vRole = {
    mounted(el, binding) {
      const userStore = useUserStore();
      if (!binding.value.includes(userStore.role)) {
        el.style.display = 'none';
      }
    }
  };
  ```

  

- **数据权限**：接口请求时，后端根据 token 中的角色返回对应数据；前端不做过多处理，仅展示。

**功能隔离**：

- 不同角色使用不同的分包：消费者使用 `package-order` 和 `package-user`，回收员使用 `package-recycler`，门店和回收公司共享部分后台管理页面。
- 通过分包预加载和按需加载，确保用户只下载自己角色所需的代码。

**项目实践**：在登录后，前端获取用户角色并存储在 Pinia 中，后续所有权限判断都基于此。角色信息也用于决定是否显示某些 tab 栏（如回收员专属 tab）。

------

## 4. 电池租赁、上门换新等核心业务流程中，如何处理复杂的业务状态？

**复杂业务状态管理**：

- **状态定义**：每个核心业务（如租赁、换新）定义明确的状态枚举，例如租赁订单状态：`pending_pickup`（待取件）、`picked_up`（已取件）、`repairing`（维修中）、`ready_for_delivery`（待送还）、`delivered`（已送还）、`cancelled`（已取消）。
- **状态机模式**：在 Pinia store 中维护当前业务的状态，并提供状态转换方法（如 `startRepair()`、`completeDelivery()`）。这些方法内部会调用 API，成功后更新状态，并触发相应 UI 变化。
- **组合式函数封装**：将每个核心业务的逻辑抽离为独立的组合式函数，例如 `useBatteryRental`，内部封装状态、API 请求、计算属性（如是否可取消、可评价）。多个页面复用同一逻辑。
- **实时状态更新**：通过 WebSocket 监听订单状态变更，当后端状态变化时，推送消息，前端更新 store 中对应订单的状态，实现多端同步。
- **异常状态处理**：定义异常状态（如支付失败、取件超时），在 UI 上给出明确提示，并提供重试或联系客服入口。

**项目实例**：以电池租赁为例，用户在租赁页面选择套餐，提交订单后进入“待取件”状态。回收员上门取走旧电池后，状态变为“已取件”，后台开始检测电池，若检测通过则变为“待送还”，否则进入“维修中”。用户可在订单详情页看到每个步骤的进度条（通过状态映射的步骤数组渲染）。如果某个步骤超过规定时间未完成，前端显示超时提示，并提供催单按钮。

**状态管理代码示例**（Pinia store）：

javascript

```
export const useRentalStore = defineStore('rental', {
  state: () => ({
    currentOrder: null,
    orderList: []
  }),
  actions: {
    async createOrder(params) {
      const res = await api.createRentalOrder(params);
      this.currentOrder = res.data;
    },
    async cancelOrder(orderId) {
      await api.cancelRentalOrder(orderId);
      const order = this.orderList.find(o => o.id === orderId);
      if (order) order.status = 'cancelled';
    },
    // WebSocket 推送更新
    updateOrderStatus({ orderId, status }) {
      const order = this.orderList.find(o => o.id === orderId);
      if (order) order.status = status;
      if (this.currentOrder?.id === orderId) this.currentOrder.status = status;
    }
  }
});
```



------

## 5. 你如何设计数据请求层，以应对多端接口差异？

**数据请求层设计**：

- **统一请求函数**：封装一个 `request` 函数，内部根据平台选择不同的底层实现。在 H5 中使用 `axios`，在小程序中使用 `uni.request`，但对外暴露一致的 Promise 接口，并统一处理请求拦截、响应拦截、错误处理、loading 状态等。
- **API 接口管理**：将所有接口定义放在 `api` 目录下，按模块拆分（如 `user.js`、`order.js`）。每个接口调用统一的 `request` 函数，传入方法、URL、参数等。
- **环境变量**：通过 `process.env.NODE_ENV` 或 `import.meta.env` 管理不同环境的 API 基础地址，在请求函数中拼接完整 URL。
- **数据转换**：如果后端返回的数据结构在不同平台有差异（例如字段名不同），在请求函数或拦截器中进行统一转换，确保前端业务代码使用一致的数据结构。
- **错误码统一**：后端返回统一的错误码规范（如 200 成功，401 未授权，500 服务器错误），请求函数统一处理，对业务层只抛出异常或返回数据。
- **缓存策略**：对 GET 请求支持配置缓存（如 `useCache: true`），请求前先检查本地缓存，命中则返回缓存数据，避免重复请求。

**项目实践**：

javascript

```
// utils/request.js
const request = (options) => {
  return new Promise((resolve, reject) => {
    // #ifdef H5
    axios({
      url: options.url,
      method: options.method,
      data: options.data,
      headers: options.headers
    }).then(res => resolve(res.data)).catch(err => reject(err));
    // #endif
    // #ifdef MP
    uni.request({
      url: options.url,
      method: options.method,
      data: options.data,
      header: options.headers,
      success: (res) => {
        if (res.statusCode === 200) resolve(res.data);
        else reject(res);
      },
      fail: reject
    });
    // #endif
  });
};
```



通过这种设计，上层业务代码无需关心平台差异，只需要调用 `request({ url, method, data })` 即可。

------

## 6. 虚拟列表在哪个模块使用？具体如何实现？带来了多少性能提升？

**虚拟列表使用模块**：在“订单列表”页面，用户可能有大量历史订单，一次性渲染会导致页面卡顿。我们在此模块使用了虚拟列表。

**实现方式**：

- 使用第三方库 `vue-virtual-scroller`（基于 Vue 3 的版本）或自行实现简易版。由于小程序中无法直接使用该库，我们自行封装了一个虚拟列表组件。

- **原理**：

  1. 列表容器固定高度，开启滚动。
  2. 监听滚动事件，计算当前可视区域起始索引和结束索引。
  3. 只渲染可视区域内的订单项，其他项用占位 `view` 填充高度（通过 `padding-top` 和 `padding-bottom` 模拟）。
  4. 每个订单项高度固定（通过设计保证）。

- **代码简化示例**：

  vue

  ```
  <template>
    <scroll-view :scroll-top="scrollTop" @scroll="onScroll" class="list-container">
      <view :style="{ paddingTop: topPlaceholder + 'px', paddingBottom: bottomPlaceholder + 'px' }">
        <view v-for="item in visibleItems" :key="item.id" class="order-item">
          {{ item.orderNo }}
        </view>
      </view>
    </scroll-view>
  </template>
  <script setup>
  const props = defineProps({ items: Array, itemHeight: Number, containerHeight: Number });
  const startIndex = ref(0);
  const endIndex = ref(0);
  const visibleItems = computed(() => props.items.slice(startIndex.value, endIndex.value));
  const topPlaceholder = computed(() => startIndex.value * props.itemHeight);
  const bottomPlaceholder = computed(() => (props.items.length - endIndex.value) * props.itemHeight);
  
  const onScroll = (e) => {
    const scrollTop = e.detail.scrollTop;
    startIndex.value = Math.floor(scrollTop / props.itemHeight);
    endIndex.value = Math.min(startIndex.value + Math.ceil(props.containerHeight / props.itemHeight), props.items.length);
  };
  </script>
  ```

  

**性能提升**：

- 未优化前：渲染 1000 条订单，DOM 节点数超过 1000，滚动卡顿严重。
- 优化后：只渲染约 20 条（视口高度），DOM 节点数大幅减少，滚动流畅，内存占用降低约 80%。
- 页面加载时间：初始渲染时间从 800ms 降低到 150ms。

------

## 7. 长列表卡顿问题你是如何分析和优化的？

**长列表卡顿分析**：

- **问题表现**：在订单列表页面，当数据量较大（超过 500 条）时，滚动出现明显卡顿，甚至白屏。
- **分析工具**：
  - 使用微信开发者工具的 **性能分析**（Performance 面板），录制滚动操作，观察主线程任务、渲染帧率。
  - 发现每次滚动都触发了大量 setData，且页面重绘耗时过长。
  - 通过 `console.time` 和 `console.timeEnd` 测量关键操作耗时，发现渲染列表项占用了大部分时间。

**优化措施**：

1. **虚拟列表**（如上题）：只渲染可视区域，大幅减少 DOM 节点。
2. **分页加载**：即使使用虚拟列表，初始加载所有数据仍可能耗时，因此采用分页加载 + 虚拟列表组合。首次加载 20 条，滚动到底部时加载下一页，追加到列表末尾。虚拟列表基于完整数据计算，但只渲染部分。
3. **图片懒加载**：列表中的订单图片使用 `lazy-load` 属性，只有进入可视区域才加载。
4. **减少 setData 数据量**：在滚动时，只更新起始索引和结束索引，而不是更新整个列表。
5. **使用纯文本代替富文本**：订单项中避免使用复杂样式和图片，减少渲染成本。
6. **节流滚动事件**：对滚动事件进行节流，避免频繁触发计算。
7. **使用 `wx:key`**：为列表项指定唯一的 key，帮助小程序 diff 优化。
8. **分包**：将订单列表所在分包独立，避免主包过大影响启动性能。

**优化效果**：

- 滚动帧率从 30fps 提升到 55fps，接近满帧。
- 内存占用从 200MB 降低到 80MB。
- 用户反馈卡顿问题基本解决。

------

## 8. 你如何处理支付宝和微信的支付差异？代码如何复用？

**支付差异处理**：

- **差异点**：

  - 微信支付：需要传入 `timeStamp`、`nonceStr`、`package`、`signType`、`paySign`。
  - 支付宝支付：需要传入 `orderInfo`（一个字符串）或 `tradeNO`。

- **处理方式**：

  1. **后端统一返回**：要求后端返回一个统一的支付参数对象，包含平台标识和具体参数。例如：

     json

     ```
     {
       "platform": "weixin",
       "params": { "timeStamp": "...", ... }
     }
     ```

     

     或

     json

     ```
     {
       "platform": "alipay",
       "params": { "orderInfo": "..." }
     }
     ```

     

  2. **前端统一调用函数**：封装 `pay` 函数，内部根据 `platform` 字段调用不同平台的支付 API。

     javascript

     ```
     async function pay(orderId) {
       const payParams = await api.getPayParams(orderId);
       return new Promise((resolve, reject) => {
         if (payParams.platform === 'weixin') {
           uni.requestPayment({
             ...payParams.params,
             success: resolve,
             fail: reject
           });
         } else if (payParams.platform === 'alipay') {
           uni.requestPayment({
             orderInfo: payParams.params.orderInfo,
             success: resolve,
             fail: reject
           });
         }
       });
     }
     ```

     

  3. **错误处理统一**：支付成功或失败后，统一调用后续逻辑（如轮询订单状态），避免重复代码。

**代码复用**：

- 支付前的订单创建、支付后的状态轮询逻辑完全复用，只有调起支付部分有差异。
- 通过上述封装，业务页面只需一行 `await pay(orderId)` 即可处理支付，无需关心平台。

------

## 9. 线上出现过定位授权异常的问题吗？你是如何定位和修复的？

**问题描述**：线上用户反馈，进入“附近门店”页面时，一直提示“定位失败，请检查网络”，但部分用户正常。经排查，主要出现在部分 Android 机型上。

**定位过程**：

1. **收集错误信息**：通过 Sentry 捕获到 `uni.getLocation` 调用失败的错误日志，错误信息为 `getLocation:fail auth deny`。
2. **复现问题**：找一台出现问题的 Android 手机（华为 P40），在开发者工具中无法复现，必须在真机调试。通过 USB 连接手机，使用微信开发者工具的 **真机调试** 功能，查看控制台输出。
3. **分析代码**：定位到代码中调用 `uni.getLocation` 前，我们使用 `uni.getSetting` 检查授权状态，但发现即使授权状态为 `true`，调用依然失败。
4. **查阅文档**：微信小程序官方文档指出，部分 Android 机型在授权后仍需用户手动开启 GPS 开关，否则定位失败。我们的代码没有检查 GPS 状态。
5. **增加 GPS 检测**：在调用定位前，先通过 `uni.getSystemInfo` 获取设备信息，判断是否为 Android，若是，则提示用户开启 GPS。
6. **优化用户体验**：定位失败时，不再弹窗“定位失败”，而是引导用户检查 GPS 和网络，并提供手动输入地址的备选方案。

**修复方案**：

javascript

```
async function getLocation() {
  const { authSetting } = await uni.getSetting();
  if (!authSetting['scope.userLocation']) {
    // 引导授权
    uni.showModal({
      content: '需要您授权地理位置',
      success: (res) => {
        if (res.confirm) uni.openSetting();
      }
    });
    return null;
  }
  // Android 机型提示开启 GPS
  const systemInfo = uni.getSystemInfoSync();
  if (systemInfo.platform === 'android') {
    uni.showModal({
      content: '请确保已开启手机GPS定位',
      showCancel: false
    });
  }
  try {
    const res = await uni.getLocation({ type: 'gcj02' });
    return res;
  } catch (err) {
    uni.showToast({ title: '定位失败，请手动选择地址', icon: 'none' });
    return null;
  }
}
```



**效果**：修复后，类似问题大幅减少，用户满意度提升。

------

## 10. 你在项目中如何做错误监控和日志上报？

**错误监控体系**：

1. **前端错误监控（Sentry）**：
   - 在 `main.js` 中初始化 Sentry，配置 DSN 和 release 版本。
   - 捕获全局未处理错误：`uni.onError`（小程序）和 `window.onerror`（H5）。
   - 捕获 Promise 未处理 rejection：`uni.onUnhandledRejection`。
   - 在请求封装中，主动上报请求失败的错误（不重复上报 401 等可预期错误）。
   - 设置用户信息，方便追踪：`Sentry.setUser({ id: userId })`。
2. **性能监控**：
   - 使用微信小程序的 **wx.getPerformance** 获取性能数据，上报首屏时间、页面渲染耗时。
   - 自定义埋点：在关键操作（如支付、登录）前后打点，计算耗时和成功率，上报到分析平台。
3. **日志上报**：
   - 开发环境下使用 `console.log`，生产环境通过封装的 `logger` 模块，将日志发送到后端日志服务。
   - 日志分级：info、warn、error，只上报 warn 及以上级别，避免过多日志。
   - 日志内容包括：用户 ID、页面路径、操作、错误堆栈等。
4. **告警机制**：
   - 在 Sentry 中设置告警规则，当错误量突增或特定错误出现时，通过钉钉机器人发送告警。
   - 结合后端监控，当接口错误率超过阈值时，通知前端排查。
5. **用户反馈通道**：
   - 小程序内设置“意见反馈”入口，用户可提交问题截图和描述，直接进入客服系统。
   - 收集用户反馈，与监控数据结合，快速定位问题。

**项目实践**：在“铅蛋回收”小程序中，通过 Sentry 我们及时发现了一个因后端接口字段变更导致的前端解析错误，在用户大规模受影响前就修复了。性能监控帮助我们发现了某些页面加载过慢，进而优化。

# 十二、工作经历与团队协作 详细解答

------

## 1. 你在公司负责 6 个核心项目的开发维护，如何并行管理多个项目？如何保证代码同步？

**并行管理策略**：

- **项目分类与优先级**：根据业务紧急程度和项目阶段，将6个项目分为三类：维护中（线上稳定运行）、迭代中（新增功能）、新启动（从0到1）。每周制定优先级计划，确保关键项目资源充足。
- **模块化与复用**：将公共组件、工具函数、请求封装等抽离为独立模块或npm包，多个项目共享，减少重复开发。例如，我们开发的 `@qd/utils` 和 `@qd/components` 在多个项目中复用，新项目可以快速搭建基础能力。
- **独立分支与版本控制**：每个项目在 Git 中拥有独立仓库或独立分支（若为 monorepo），避免相互影响。使用 Git Flow 或 GitHub Flow 管理开发流程。
- **任务拆分与时间管理**：将大功能拆分为小任务，利用 Jira 或 Trello 跟踪进度。每天站会同步进展，及时调整优先级。
- **自动化构建与部署**：为每个项目配置 CI/CD 流水线（GitHub Actions / GitLab CI），代码合并后自动构建、测试并部署到对应环境，减少手动操作。

**保证代码同步**：

- **公共模块独立版本**：公共组件库和工具库单独发布版本，各项目通过 `package.json` 引入指定版本。更新公共库时，遵循语义化版本，各项目按需升级。
- **跨项目协作**：当多个项目需要同时修改公共模块时，先在公共库中开发新功能，发布 beta 版本供项目测试，稳定后再发布正式版。
- **代码规范统一**：通过 ESLint、Prettier、Stylelint 保证代码风格一致，各项目采用相同配置，避免风格差异导致的维护困难。

------

## 2. 你提到将研发效率提升 30%，具体是通过哪些措施实现的？如何量化？

**效率提升措施**：

1. **组件库建设**：封装了15+高复用业务组件（如地址选择器、上传组件、表格、弹窗），覆盖80%的常见业务场景。新页面开发时，直接组合这些组件，减少重复编码。
2. **工具库封装**：开发了 `@qd/utils`，包含防抖节流、日期格式化、金额计算、权限检查等通用函数，减少重复工具代码。
3. **统一请求封装**：基于 Axios 封装请求层，集成 token 刷新、错误处理、loading 管理、请求缓存、重试机制，各项目直接调用，无需重复配置。
4. **工程化模板**：创建了项目脚手架模板（基于 Vue 3 + Vite + Pinia + TypeScript），新项目初始化只需几分钟，无需从零配置。
5. **自动化代码生成**：使用 plop 工具，根据模板自动生成页面、组件、store 的基础代码，减少手动编写样板代码。
6. **代码规范与自动化**：配置 ESLint、Prettier、husky，提交前自动格式化，减少代码审查中风格问题的讨论，提升审查效率。
7. **文档与知识库**：建立内部 Confluence 文档，记录项目架构、组件使用、常见问题，新成员快速上手，减少重复答疑。

**量化方法**：

- **开发时间对比**：选取典型页面（如用户列表页），对比使用组件库前和使用后的开发工时。之前需要 4 小时，之后只需 1.5 小时，效率提升约 62.5%。综合多个页面，平均提升约 30%。
- **代码复用率**：通过代码统计工具，计算项目中复用组件和工具函数的比例。从初期 20% 提升到 60% 以上。
- **版本发布频率**：优化前每月发布 2 次，优化后每月发布 5-6 次（因开发速度加快）。
- **bug 数量**：由于组件和工具函数经过充分测试，引入的 bug 减少约 40%。

------

## 3. 你如何推动前端技术规范落地？遇到过阻力吗？如何解决？

**推动规范落地的步骤**：

1. **制定规范草案**：参考业界最佳实践（如 Airbnb JavaScript 规范、Vue 官方风格指南），结合团队现状，起草前端规范，包括代码风格、Git 提交、组件设计、命名约定等。
2. **团队讨论与共识**：召开技术会议，逐条讲解规范，听取大家意见，对争议点进行讨论修改，最终达成共识。确保规范不是“一言堂”，而是集体决策。
3. **工具化强制落地**：将规范转化为 ESLint、Prettier、Stylelint 配置，集成到项目中。配置 `husky` 和 `lint-staged`，在提交时自动检查和修复，不符合规范无法提交。
4. **文档化**：将规范写入 Confluence，并附上示例代码，方便查阅。
5. **代码审查**：在 MR 审查时，重点关注规范遵守情况，审查者指出不符合规范的地方，并引导修改。建立“规范检查” checklist。
6. **定期复盘**：每季度组织一次规范复盘会，讨论规范执行中的问题，收集改进建议，持续优化。

**遇到的阻力及解决**：

- **阻力1：老项目改造困难**。有些老项目代码不规范，成员担心改造耗时且风险高。解决：采用渐进式策略，新功能强制遵守规范，旧代码在修改时顺便重构，不要求一次性全改。
- **阻力2：部分成员抵触新工具（如 ESLint 规则太严）**。解决：解释规范的好处（如减少低级错误、提高可维护性），并适当放宽一些争议规则（如代码长度限制从 80 放宽到 120）。同时展示工具自动修复的能力，减轻负担。
- **阻力3：规范执行不一致**。解决：通过 CI 强制检查，确保所有合并到主分支的代码都符合规范。同时定期抽查代码，通报不符合情况，形成正向压力。

------

## 4. 你在团队中扮演什么角色？如何与其他成员（后端、产品、UI）协作？

**角色定位**：作为团队中的核心前端开发，我既是项目负责人（负责多个项目的前端架构），也是技术推动者（引入新技术、优化流程）。同时承担部分导师职责，指导新成员。

**跨职能协作方式**：

- **与产品经理**：
  - 参与需求评审会议，从技术角度评估可行性，提出潜在风险和替代方案。
  - 对需求中的交互细节，提供前端实现建议，帮助产品完善原型。
  - 需求确定后，共同排期，明确优先级。
- **与 UI 设计师**：
  - 在视觉评审阶段，讨论设计稿的可行性和实现成本，对复杂动效或特殊布局给出技术反馈。
  - 建立设计规范，与 UI 对齐组件库的样式（如按钮、表单、表格），确保设计一致性。
  - 开发过程中，及时沟通设计细节疑问，使用 Zeplin 或 Figma 评论功能。
- **与后端工程师**：
  - 参与接口定义会议，讨论数据结构、字段命名、错误码规范，确保前后端一致。
  - 使用 Swagger 或 YAPI 管理接口文档，后端修改时及时同步。
  - 联调阶段，使用 Postman 或 Apifox 模拟接口，快速定位问题，共同解决。
- **与测试工程师**：
  - 提供测试用例和边界条件建议，帮助测试完善用例。
  - 修复 bug 后，在禅道或 Jira 中详细描述修改内容，方便测试回归。
  - 参与测试用例评审，确保覆盖核心功能。

**协作工具**：使用飞书/钉钉即时沟通，Jira 管理任务，Confluence 沉淀文档，GitLab 进行代码审查。

------

## 5. 如何做需求评审？遇到不合理需求如何处理？

**需求评审流程**：

1. **会前准备**：提前阅读需求文档和原型，标注不明确或技术难点，列出问题清单。
2. **会上讨论**：
   - 产品经理讲解需求背景和用户价值。
   - 从技术角度分析实现难度、对现有架构的影响、潜在风险。
   - 与后端、UI 确认接口和设计细节。
   - 评估工时，初步排期。
3. **会后输出**：记录评审结论和待办事项，更新需求文档，同步给团队。

**处理不合理需求**：

- **判断标准**：需求是否违背用户体验、技术实现成本过高、与产品定位不符、或影响系统稳定性。
- **沟通方式**：
  - 用数据或事实说话：例如“这个动效在低端机型上会导致卡顿，影响体验”，或“这个功能需要重构现有模块，预计耗时 2 周，可能影响下个版本上线”。
  - 提供替代方案：提出既能满足用户核心诉求，又更易实现的方案。例如“原需求是实时统计，但数据量大，建议改为每日定时统计，并允许手动刷新”。
  - 引用用户反馈或竞品分析：证明需求可能不受用户欢迎。
- **升级决策**：如果无法达成一致，将问题和建议反馈给产品负责人或项目经理，由他们权衡商业价值和技术成本做最终决策。

**原则**：保持专业和尊重，不直接说“不”，而是提供建设性意见，共同寻找最佳解决方案。

------

## 6. 你如何保证代码质量？单元测试、E2E 测试有涉及吗？

**代码质量保障体系**：

- **代码规范**：ESLint + Prettier + Stylelint 自动化检查，强制规范。
- **代码审查**：每个 MR 至少一人审查，审查内容包括逻辑正确性、代码风格、性能、安全性等。
- **单元测试**：
  - 对工具函数、复杂业务逻辑（如金额计算、权限判断）编写单元测试，使用 Jest 或 Vitest。
  - 对 Vue 组件，使用 Vue Test Utils 测试组件渲染和交互，重点覆盖公共组件。
  - 测试覆盖率要求：核心模块 >80%，整体 >60%。
- **集成测试 / E2E 测试**：
  - 使用 Cypress 或 Playwright 编写关键用户流程的 E2E 测试（如登录、下单、支付）。
  - 在 CI 中运行，确保主流程不破坏。
  - 对于小程序，使用 Minium 进行自动化测试。
- **持续集成**：在 CI 中运行 lint、单元测试、E2E 测试，失败则阻止合并。
- **性能监控**：使用 Lighthouse CI 在每次构建时跑性能测试，防止性能退化。
- **错误监控**：接入 Sentry，实时监控线上错误，及时修复。

**项目实践**：在“铅蛋回收 SaaS 后台”中，我们对核心的权限模块和金额计算函数编写了单元测试，覆盖率达到 90%。对订单列表、导出功能编写了 E2E 测试，每次发布前自动运行，发现过几次因接口字段变更导致的失败。

------

## 7. 你在项目中遇到过最棘手的线上问题是什么？如何排查和修复的？

**问题描述**：一次线上故障，用户在“铅蛋回收”小程序中提交订单后，支付成功但订单状态仍显示“待支付”，导致用户重复支付或无法继续流程。影响范围约 5% 的订单。

**排查过程**：

1. **收集信息**：从用户反馈和客服记录中获取问题订单号、时间、设备信息。从 Sentry 中查看对应时间段是否有相关错误。
2. **复现尝试**：在测试环境模拟相同操作，但无法复现。怀疑是特定网络环境或后端回调延迟导致。
3. **查看日志**：联系后端同事，查看该订单的支付回调日志。发现微信支付回调成功，但后端更新订单状态时，数据库更新语句执行失败（字段类型不匹配）。
4. **代码审查**：回顾最近一周的代码变更，发现后端修改了订单表的 `status` 字段类型（从 int 改为 string），但更新语句中仍使用 int 值，导致数据库报错，且后端未捕获异常，返回给前端成功但实际上未更新。
5. **临时修复**：后端紧急回滚字段类型，并修复更新语句，恢复所有受影响订单的状态（通过脚本批量更新）。
6. **长期方案**：
   - 后端增加数据库操作异常捕获，并记录详细日志。
   - 前后端约定接口变更流程：任何字段类型变更必须通知前端，且同步修改文档。
   - 增加订单支付后的前端轮询机制，支付成功后主动查询订单状态，若 10 秒内未变，则提示用户联系客服，避免重复支付。

**反思**：问题根源是前后端沟通不足和变更管理缺失。事后我们加强了接口变更的文档化和通知机制，并在 CI 中增加接口契约测试。

------

## 8. 如何做技术选型？你会在团队中引入新技术吗？怎么说服团队？

**技术选型原则**：

- **业务需求匹配**：新技术是否能更好地解决当前业务痛点？例如，引入 Vite 是因为项目需要快速启动和热更新。
- **团队熟悉度**：团队成员是否愿意学习？学习成本多高？如果新技术学习曲线陡峭，需评估收益是否值得。
- **生态与社区**：是否有活跃的社区、完善的文档、足够的第三方插件？是否是大厂背书？
- **稳定性与兼容性**：是否经过生产环境验证？是否与现有技术栈兼容？
- **性能与体积**：是否带来性能提升？是否增加打包体积？
- **长期维护**：是否持续更新？是否会被淘汰？

**引入新技术的流程**：

1. **调研阶段**：研究新技术，对比现有方案，列出优缺点，制作 Demo 验证可行性。
2. **团队分享**：在技术分享会上介绍调研结果，演示 Demo，收集大家意见。
3. **小范围试点**：选择非核心、低风险的项目或模块先行试用，收集反馈，评估实际效果。
4. **正式推广**：如果试点成功，编写迁移指南和最佳实践文档，逐步推广到其他项目。
5. **持续跟进**：关注新版本变化，及时更新，解决使用中遇到的问题。

**说服团队的方法**：

- **展示价值**：用数据说话，例如“Vite 启动速度比 Webpack 快 10 倍，热更新几乎瞬间，能提升开发效率 30%”。
- **降低风险**：强调小范围试点，不会影响核心业务，失败可回退。
- **提供培训**：承诺组织学习会，编写文档，帮助大家快速上手。
- **争取关键成员支持**：先与团队中技术影响力大的成员沟通，获得支持后再推动。

**实际案例**：在“千源百荟”项目中，我提议使用 Vite 替代 Vue CLI（Webpack）。我准备了对比数据，搭建了一个 Demo 项目，在团队内演示启动速度和热更新效果。大家都认可 Vite 的优势，但担心插件兼容性。我们选择在一个新模块中试点，成功后再推广到整个项目。

# 十三、行为面试与软技能 详细解答

------

## 1. 为什么选择前端开发？你未来的职业规划是什么？

**为什么选择前端**：

我选择前端开发是因为它**兼具创造性和技术性**。前端是用户直接接触的部分，能够将设计稿转化为可交互的产品，这种“所见即所得”的成就感让我着迷。同时，前端技术发展迅速，需要不断学习新知识，满足我对技术探索的渴望。在参与“铅蛋回收”等项目时，看到自己开发的页面被成千上万用户使用，帮助回收员高效工作、消费者便捷下单，这种对业务的真实影响让我坚定了在前端领域深耕的决心。

**未来职业规划**：

- **短期（1-2年）**：继续深化 Vue 技术栈，掌握 React 等主流框架，拓宽技术广度。同时深入研究前端工程化和性能优化，成为团队中的技术骨干，能独立负责大型项目的架构设计。
- **中期（3-5年）**：向全栈方向发展，学习 Node.js 和云开发，具备独立搭建前后端完整系统的能力。同时提升软技能，承担技术经理职责，带领小团队完成项目。
- **长期**：成为前端架构师或技术专家，关注前沿技术（如 WebAssembly、AI 与前端结合），推动团队技术升级，解决复杂业务场景下的技术难题。

------

## 2. 你最近在学习什么新技术？如何学习的？

**最近学习的新技术**：

- **React 18 & Next.js**：虽然工作中主要使用 Vue，但为了拓宽技术视野，我最近在学习 React 18 的新特性（如并发渲染、Suspense）和 Next.js 的 App Router。通过对比 Vue 和 React 的异同，加深了对前端框架本质的理解。
- **WebAssembly**：关注其在性能敏感场景（如图像处理、视频编辑）的应用，尝试用 Rust 编写简单模块并在浏览器中运行。
- **TypeScript 进阶**：深入学习 TypeScript 的类型编程（如条件类型、映射类型、infer），用于封装更安全的工具类型和组件。

**学习方法**：

- **官方文档优先**：先通读官方文档，了解核心概念和设计思想。例如学习 React 时，先完整阅读了 React 官方新文档。
- **项目驱动**：边学边练，用小项目实践新技术。例如用 Next.js 重构了一个个人博客网站，加深对服务端渲染和静态生成的理解。
- **社区资源**：关注技术博客（如 Overreacted、Vue Weekly）、GitHub 热门仓库、YouTube 技术频道。参与技术讨论，在 Stack Overflow 上回答问题巩固知识。
- **源码阅读**：对于感兴趣的开源库（如 Pinia、Vite），会阅读部分源码，学习优秀设计和实现技巧。
- **知识输出**：在团队内部技术分享会上讲解学习心得，撰写技术文章，通过输出倒逼输入。

------

## 3. 你如何应对项目工期紧、压力大的情况？

**应对策略**：

1. **理性评估，及时沟通**：当发现工期可能无法完成时，第一时间与产品经理和项目经理沟通，说明风险，提出优先级调整建议（如先上线核心功能，次要功能后续迭代）。避免自己默默赶工导致质量下降。
2. **拆解任务，并行推进**：将大任务拆分为可并行的小任务，合理分配时间。例如在“铅蛋回收”小程序紧急上线新功能时，我将任务拆分为接口联调、UI 还原、状态管理、测试用例，并行推进，提高效率。
3. **保持专注，减少干扰**：采用番茄工作法，集中精力处理高优先级任务。关闭不必要的通知，避免多任务切换。
4. **寻求帮助**：遇到技术难点时不钻牛角尖，及时请教同事或搜索解决方案。在团队中建立互助氛围，共同分担压力。
5. **保持健康心态**：压力大时适当休息，通过散步、听音乐缓解焦虑。相信团队协作，不把所有压力扛在自己身上。
6. **复盘总结**：项目结束后，复盘工期紧张的原因，提出改进建议（如需求变更流程、技术债务清理），避免类似情况再次发生。

**实例**：在“千源百荟”官网项目中，由于市场活动提前，首页需要在一周内增加三个新模块并适配移动端。我迅速与产品确认优先级，将任务分解，每天站会同步进度，最终按时上线，且质量达标。

------

## 4. 当与产品经理意见不合时，你会怎么处理？

**处理原则**：以用户价值和项目成功为目标，寻求共赢。

**处理步骤**：

1. **倾听理解**：先耐心听取产品经理的诉求和背景，了解他提出该需求的用户场景和业务目标。不急于反驳。
2. **表达观点**：用数据和事实说明自己的顾虑。例如“这个功能在低端机型上可能导致卡顿，根据性能测试，渲染时间会增加 2 秒，可能影响用户体验”。或者“这个需求改动涉及底层重构，预计耗时 3 天，可能会影响下个版本的发布时间”。
3. **提供替代方案**：提出既能满足核心业务诉求，又更易实现或体验更优的方案。例如“原需求是实时统计，但数据量大，建议改为每日定时统计，并允许手动刷新，同样能满足运营需求”。
4. **寻求共识**：如果仍无法达成一致，邀请其他相关人员（如技术负责人、用户体验设计师）一起讨论，从多角度评估。有时引入第三方意见能打破僵局。
5. **尊重决策**：如果最终产品经理坚持原方案，且经过讨论后确认是业务强需求，我会尊重决策并尽力执行，同时做好技术预案（如加监控、留开关），以便后续优化。

**实例**：在一次需求评审中，产品经理要求在列表页实时显示用户在线状态，需要 WebSocket 推送。我指出这会大幅增加服务器压力和前端复杂度，建议改为用户点击详情页时才获取实时状态，产品认可了该方案。

------

## 5. 描述一次你主动推动技术改进或流程优化的经历。

**经历**：在“铅蛋回收”项目中，我发现团队每次开发新页面都需要重复编写大量样板代码（如路由配置、store 模块、API 调用），且代码风格不一致。我主动提出引入 **plop 代码生成器**，通过模板自动生成页面骨架。

**实施过程**：

1. **调研**：研究 plop 的使用方法，设计模板，覆盖常见的页面类型（列表页、表单页、详情页）。
2. **试点**：在一个新功能模块中试用，观察生成代码的质量和开发效率提升情况。
3. **推广**：在团队内分享使用方法和效果，编写文档，并收集大家意见优化模板。
4. **落地**：将代码生成器集成到项目脚手架中，新页面开发只需运行 `npm run generate page`，选择类型，输入名称，即可生成完整代码。

**效果**：新页面开发时间从平均 2 小时缩短到 30 分钟，代码风格统一，且减少了人为错误。该实践被团队采纳，并在后续项目中推广。

------

## 6. 你如何处理工作中犯的错误？

**处理原则**：及时止损、坦诚沟通、复盘改进。

**处理步骤**：

1. **及时发现，立即止损**：一旦发现错误，第一时间评估影响范围。如果是线上问题，立即回滚或热修复，减少对用户的影响。例如，有一次我误合并不稳定代码导致线上样式错乱，我立即回滚版本，并在 10 分钟内修复后重新发布。
2. **坦诚沟通**：主动向相关同事（如测试、产品、项目经理解释错误原因和已采取的补救措施），不推卸责任。例如在群里发消息：“由于我的疏忽导致 XX 问题，目前已回滚修复，抱歉给大家带来不便”。
3. **分析根源**：回顾错误发生的原因，是需求理解偏差、代码逻辑错误、测试不充分，还是流程问题。例如，那次样式问题是因为我未在本地测试完整，直接合并。
4. **改进措施**：针对根源，提出预防措施。例如增加本地测试 checklist，或在 CI 中增加视觉回归测试。同时，将错误记录到团队的知识库，避免他人重蹈覆辙。
5. **心态调整**：不陷入自责，相信错误是成长的机会。将这次经历作为经验教训，提升自己的严谨性。

------

## 7. 你如何看待加班？

**我的观点**：

- **必要时的担当**：在项目紧急上线、线上故障等特殊时期，我愿意加班，与团队共度难关。这是责任心的体现。
- **反对无效加班**：不赞成形式化的“摸鱼式加班”或为了加班而加班。如果加班是因为计划不合理或流程问题，应该通过复盘改进，而不是常态化加班。
- **追求高效工作**：更倾向于在正常工作时间内高效完成任务，通过技术手段和流程优化减少加班。例如，通过自动化工具减少重复劳动，通过需求评审明确范围避免返工。
- **平衡生活**：长期过度加班会影响身心健康和工作质量。我会合理安排时间，确保有足够的休息和学习时间，保持长期可持续发展。

**实例**：在“千源百荟”官网首版上线前一周，因设计频繁修改，我们连续加班了三天。事后我主动与产品和设计沟通，建立了设计定稿流程，后续版本未再出现类似情况。

------

## 8. 你对我们公司（或行业）有什么了解？为什么想来这里？

**（假设面试某互联网回收/环保科技公司）**

**对公司了解**：我知道贵公司专注于再生资源回收领域，通过互联网技术赋能回收行业，旗下有“XX回收”等产品。我关注到贵公司最近获得了新一轮融资，业务发展迅速，且注重技术创新（如引入 AI 识别分类）。公司的愿景“让回收更简单”与我对环保事业的认同高度契合。

**为什么想来**：

- **行业前景**：再生资源回收是朝阳产业，符合国家碳中和政策，有巨大的社会价值。我希望用技术推动环保事业发展。
- **技术挑战**：贵公司业务涉及多端（小程序、H5、后台），技术栈与我当前经验高度匹配（Vue + uni-app）。同时，业务场景复杂（多角色、多流程），能给我带来技术成长。
- **团队文化**：从招聘信息中感受到贵公司对技术创新的重视，以及开放协作的氛围。我希望能在这样的环境中贡献价值，并与团队共同成长。

------

## 9. 你期望的工作环境是什么样的？

**期望的工作环境**：

- **开放协作**：团队之间沟通顺畅，鼓励知识分享和互相帮助。有定期的技术分享会，能学习到新东西。
- **技术氛围浓厚**：愿意尝试新技术，有技术债务清理的意识。代码审查严格，追求代码质量。
- **尊重与信任**：领导信任成员，给予自主权，而不是微观管理。成员对自己的工作有 ownership，能主动推动改进。
- **合理的流程**：有清晰的需求评审、迭代规划、测试流程，避免无序变更和无效加班。
- **成长空间**：有技术培训和晋升通道，鼓励员工学习和发展。能接触到有挑战的项目，而不是重复劳动。

------

## 10. 除了技术，你还有什么兴趣爱好？（结合个人爱好提问）

**兴趣爱好**：我喜欢摄影、徒步和美食。

- **摄影**：喜欢用镜头记录生活和工作中的美好瞬间。在团队中，我主动承担了团建活动拍摄任务，记录大家的欢乐时刻。摄影也培养了我的审美，对前端 UI 还原有一定帮助。
- **徒步**：周末经常参加户外徒步，既能锻炼身体，又能放松心情。徒步也让我明白，坚持和团队协作的重要性。
- **美食**：喜欢探索各种美食，偶尔自己下厨。美食让我保持对生活的热爱，也增进了与朋友的交流。

**结合爱好提问**：面试官可能会追问摄影经历，详见下一题。

------

## 11. 你提到喜欢摄影，能否分享一次你负责的团建拍摄经历？如何组织？

**经历**：去年公司组织了一次户外团建活动，我主动担任摄影师。

**组织过程**：

1. **提前准备**：了解活动流程和场地，准备相机、备用电池、三脚架等器材。规划拍摄重点（如团队合影、趣味游戏瞬间、风景）。
2. **现场抓拍**：在活动中，我穿梭于各小组，抓拍大家自然互动的瞬间，同时组织了几次正式的集体合影。注意光线和构图，确保照片质量。
3. **后期处理**：活动结束后，用 Lightroom 快速筛选和调色，突出欢乐氛围。将照片分类整理（如团队合影、精彩瞬间、风景）。
4. **分享传播**：将照片上传到公司云盘，并制作了一个简短的视频花絮在群里分享，大家反响热烈，纷纷下载保存。

**效果**：这些照片被用于公司内刊和官网团建报道，增强了团队凝聚力。我也因此被同事称为“御用摄影师”，后续活动经常邀请我参与拍摄。

# 十四、开放性问题与场景设计 详细解答

------

## 1. 如果让你设计一个前端监控系统，你会考虑哪些方面？如何实现？

**前端监控系统设计**：

### 1.1 监控维度

- **错误监控**：JS 执行错误、Promise 未处理 rejection、资源加载失败、接口请求失败。
- **性能监控**：页面加载指标（FCP、LCP、TTI）、接口耗时、长任务、内存使用。
- **用户行为监控**：PV/UV、页面停留时间、点击行为、路由跳转、关键操作埋点。
- **自定义监控**：业务特定指标（如下单成功率、支付耗时）。

### 1.2 数据采集

- **SDK 封装**：提供轻量级 SDK，自动捕获错误和性能数据，支持手动上报。
  - 使用 `window.onerror`、`window.addEventListener('unhandledrejection')` 捕获 JS 错误。
  - 使用 Performance API 获取性能指标。
  - 使用 `sendBeacon` 或 `fetch` 上报数据，确保不阻塞页面卸载。
- **采样率**：根据业务需求配置采样率，避免数据量过大。
- **用户标识**：生成匿名 ID 或使用登录用户 ID，关联用户行为。

### 1.3 数据上报

- **聚合上报**：将多条数据合并上报，减少请求次数。
- **实时与离线**：实时上报关键错误，离线数据可批量发送。
- **数据格式**：JSON 格式，包含时间戳、页面 URL、浏览器信息、用户 ID 等。

### 1.4 数据处理与存储

- **后端服务**：接收数据，清洗、聚合，存储到时序数据库（如 InfluxDB）或 Elasticsearch。
- **实时计算**：对错误数据进行实时告警（如错误率突增），通过消息队列触发通知。

### 1.5 可视化与告警

- **监控看板**：展示核心指标趋势图、错误分布、TOP 接口耗时。
- **告警规则**：设置阈值（如错误率 > 1%），通过钉钉/邮件发送告警。
- **源码映射**：对压缩后的代码，利用 SourceMap 还原原始错误位置。

### 1.6 实现示例（简化版 SDK）

javascript

```
class Monitor {
  constructor(options) {
    this.url = options.url;
    this.appId = options.appId;
    this.userId = options.userId;
    this.init();
  }
  init() {
    window.onerror = (msg, url, line, col, error) => {
      this.report('error', { msg, url, line, col, stack: error?.stack });
    };
    window.addEventListener('unhandledrejection', (event) => {
      this.report('promiseError', { reason: event.reason });
    });
    // 性能监控
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perf = performance.getEntriesByType('navigation')[0];
        this.report('performance', {
          fcp: perf.responseStart - perf.requestStart,
          domReady: perf.domComplete - perf.domInteractive,
          loadTime: perf.loadEventEnd - perf.loadEventStart
        });
      }, 0);
    });
  }
  report(type, data) {
    const body = {
      appId: this.appId,
      userId: this.userId,
      type,
      data,
      time: Date.now(),
      url: location.href,
      ua: navigator.userAgent
    };
    navigator.sendBeacon(this.url, JSON.stringify(body));
  }
}
```



------

## 2. 如何设计一个支持多主题切换的前端架构？

**多主题切换设计**：

### 2.1 CSS 变量方案（推荐）

- **定义主题变量**：在根元素定义 CSS 变量，如 `--primary-color`、`--background-color`。

- **编写主题文件**：为每个主题定义一套变量值，例如 `theme-light.css`、`theme-dark.css`。

  css

  ```
  /* theme-light.css */
  :root {
    --primary-color: #1890ff;
    --background-color: #ffffff;
    --text-color: #333333;
  }
  /* theme-dark.css */
  :root {
    --primary-color: #ff4d4f;
    --background-color: #141414;
    --text-color: #ffffff;
  }
  ```

  

- **动态切换**：通过 JavaScript 动态切换 CSS 文件或切换根元素的类名。

  javascript

  ```
  function switchTheme(themeName) {
    document.documentElement.className = themeName; // 或通过 link 标签切换
  }
  ```

  

- **存储用户偏好**：将用户选择的主题保存到 `localStorage`，下次访问时自动应用。

### 2.2 运行时变量覆盖

- 使用 style 标签动态注入变量覆盖。

  javascript

  ```
  function setTheme(theme) {
    const style = document.createElement('style');
    style.innerHTML = `
      :root {
        --primary-color: ${theme.primaryColor};
        --background-color: ${theme.backgroundColor};
      }
    `;
    document.head.appendChild(style);
  }
  ```

  

### 2.3 支持系统主题跟随

- 使用 `prefers-color-scheme` 媒体查询检测系统主题，自动切换。

  css

  ```
  @media (prefers-color-scheme: dark) {
    :root {
      --primary-color: #ff4d4f;
    }
  }
  ```

  

### 2.4 组件库适配

- 如果使用 Element Plus 等组件库，可通过覆盖 CSS 变量实现主题切换，无需修改组件代码。

**项目实践**：在“铅蛋回收 SaaS 后台”中，我们实现了深色/浅色主题切换，基于 CSS 变量，用户选择后存储到本地，刷新后保持。

------

## 3. 如何实现前端微服务？你了解哪些方案？

**前端微服务**：将前端应用拆分为多个独立开发、独立部署的子应用，组合成一个完整应用。常见方案：

### 3.1 基于路由分发（如 single-spa）

- **原理**：主应用监听路由变化，根据路由加载对应的子应用（通过 JS 入口）。
- **优点**：技术栈无关，子应用独立开发部署。
- **缺点**：需要处理样式隔离、公共依赖、通信机制。
- **示例**：`single-spa` + `qiankun`（基于 single-spa 的封装）。

### 3.2 基于 iframe

- **原理**：每个子应用通过 iframe 嵌入主应用。
- **优点**：天然隔离，开发简单。
- **缺点**：路由同步、弹窗跨域、性能开销、通信复杂。
- **适用**：集成第三方系统，但较少用于现代微前端。

### 3.3 基于 Web Components

- **原理**：将子应用封装为自定义元素，在主应用中直接使用。
- **优点**：技术栈无关，样式隔离好。
- **缺点**：需要浏览器支持，开发复杂度高。

### 3.4 基于模块联邦（Module Federation，Webpack 5）

- **原理**：多个独立构建的应用在运行时共享模块，一个应用可以动态加载另一个应用的组件。
- **优点**：实现真正的代码共享，适合大型应用拆分。
- **缺点**：需要 Webpack 5 支持，配置较复杂。

**我的了解**：我了解过 `qiankun` 和模块联邦。在项目中虽未大规模使用微前端，但调研过 `qiankun` 的接入方案。微前端适用于大型企业级应用，多个团队协作的场景。如果未来项目需要，我会优先考虑 `qiankun`，因为它生态成熟，文档完善。

------

## 4. 如何保证前端项目的可测试性？

**保证可测试性的措施**：

### 4.1 代码层面

- **模块化**：将业务逻辑与 UI 分离，逻辑部分抽离为纯函数或组合式函数，便于单元测试。
- **依赖注入**：避免在组件内部直接实例化外部依赖（如 API 服务），通过 props 或上下文注入，便于测试时 mock。
- **避免副作用**：将副作用（如 localStorage、路由跳转）封装到可 mock 的服务中。

### 4.2 组件设计

- **组件职责单一**：组件只负责渲染和简单交互，复杂逻辑放在外部。
- **容器组件与展示组件分离**：容器组件负责数据获取和状态管理，展示组件通过 props 接收数据和事件，便于独立测试展示组件。

### 4.3 测试策略

- **单元测试**：
  - 使用 Jest 或 Vitest 测试工具函数和组合式函数。
  - 使用 Vue Test Utils 测试组件渲染、事件、props 传递。
- **集成测试**：测试多个组件协作的场景，如测试一个页面模块。
- **E2E 测试**：使用 Cypress 或 Playwright 测试关键用户流程，如登录、下单。

### 4.4 测试辅助工具

- **Mock 服务**：使用 MSW（Mock Service Worker）拦截 API 请求，返回模拟数据。
- **模拟数据生成**：使用 faker.js 生成随机数据，覆盖不同场景。
- **覆盖率工具**：使用 Istanbul 或 Vitest 内置覆盖率报告，确保核心代码被覆盖。

### 4.5 项目实践

- 在“铅蛋回收”项目中，我们对金额计算、权限检查等核心函数编写了单元测试，覆盖率 90% 以上。
- 对公共组件（如地址选择器）编写了组件测试，确保交互正常。
- 在 CI 中运行测试，失败则阻止合并。

------

## 5. 如何设计一个大型表单的架构，保证性能和可维护性？

**大型表单设计要点**：

### 5.1 数据结构化

- 将表单数据定义为清晰的接口，使用 TypeScript 保证类型安全。
- 将表单拆分为多个子模块（如个人信息、地址信息、支付信息），每个模块对应独立的数据结构。

### 5.2 组件化

- **字段组件**：将每个表单项封装为独立组件（如 `InputField`、`SelectField`），内部处理验证、错误显示。
- **模块组件**：将一组相关字段封装为模块组件（如 `AddressModule`），内部包含多个字段组件，对外暴露模块数据。
- **表单容器**：顶层组件管理整体表单状态、提交逻辑、跨模块验证。

### 5.3 状态管理

- 使用 Pinia 或 Vuex 管理表单状态，或使用 `reactive` + `provide/inject` 在组件树中传递。
- 对于大型表单，推荐将状态放在 store 中，便于跨模块访问和持久化。
- 使用 `computed` 派生字段值，避免重复计算。

### 5.4 性能优化

- **按需渲染**：对于不可见的部分（如折叠面板内的字段），使用 `v-if` 延迟渲染，或使用虚拟滚动（如果字段极多）。
- **字段粒度的更新**：避免整个表单重新渲染，确保每个字段组件只在自己的数据变化时更新（使用 `v-model` 绑定到 store 的某个属性）。
- **防抖节流**：对实时验证的输入做防抖，减少验证频率。
- **异步验证**：如用户名唯一性检查，使用异步验证，并添加 loading 状态。

### 5.5 表单验证

- 使用第三方库（如 VeeValidate、Vuelidate）或自定义验证规则。
- 将验证规则与字段组件绑定，支持同步和异步验证。
- 提供清晰的错误提示，并滚动到第一个错误字段。

### 5.6 可维护性

- **配置化**：对于动态表单，可以使用 JSON schema 配置字段类型、验证规则、布局，渲染引擎根据 schema 生成表单。
- **文档**：为复杂表单编写说明文档，描述数据结构和业务逻辑。

**项目实践**：在“铅蛋回收 SaaS 后台”的“回收公司入驻”表单中，包含基本信息、资质上传、银行账户等 30+ 字段。我们将其拆分为三个模块组件，使用 Pinia 管理状态，各模块独立验证，提交前汇总验证。性能良好，维护简单。

------

## 6. 你如何看待前端未来的发展趋势？

**前端发展趋势**：

1. **框架层面**：Vue 和 React 将继续主导，但会向更轻量、更高效方向发展（如 Vue 的 Vapor 模式、React 的编译器）。同时，新兴框架如 Svelte、Solid 可能抢占部分市场。
2. **跨端技术**：跨端开发（如 uni-app、Taro、Flutter）将更加成熟，一套代码多端运行成为主流。小程序、App、Web 的界限逐渐模糊。
3. **WebAssembly**：WASM 将更多应用于性能敏感场景（如音视频处理、3D 游戏、图像识别），前端可以处理更复杂的计算任务。
4. **AI 与前端结合**：AI 辅助开发（如 GitHub Copilot）将提升开发效率；AI 生成 UI、智能推荐、自动化测试可能成为现实。
5. **工程化与自动化**：低代码/无代码平台将普及，但专业开发者仍需关注底层架构。CI/CD、自动化测试、监控告警成为标配。
6. **性能与体验**：Web Vitals 成为核心指标，浏览器 API 更强大（如 CSS 容器查询、View Transitions），用户体验要求更高。
7. **微前端与服务端组件**：大型项目拆分、服务端渲染（如 React Server Components）将更广泛应用。

**我的观点**：前端技术日新月异，开发者需要保持学习热情，同时注重基础（JavaScript、浏览器原理、网络）的巩固，以不变应万变。未来前端将更深地融入全栈开发，前端工程师需要具备更广的知识面。

------

## 7. 如果让你从零组建一个前端团队，你会怎么做？

**团队组建步骤**：

### 7.1 明确目标与职责

- 与上级沟通，明确团队的定位（如支撑公司所有前端业务、专注于某个产品线）、短期和长期目标。
- 根据目标确定团队规模和角色：前端开发、测试、架构师（初期可能由资深开发兼任）。

### 7.2 招聘与人员培养

- 制定招聘标准：技术能力、沟通协作、学习能力、责任心。
- 通过技术社区、内推等渠道招聘。
- 建立新人 onboarding 流程：分配导师、熟悉代码规范、阅读文档、参与简单任务。

### 7.3 技术栈选型

- 根据业务需求选择主流且团队熟悉的技术栈（如 Vue/React、TypeScript、Vite/Webpack）。
- 制定技术规范：代码风格、Git 流程、代码审查标准、文档要求。

### 7.4 工程化建设

- 搭建项目脚手架，统一项目结构。
- 配置 CI/CD 流水线，实现自动化构建、测试、部署。
- 引入代码质量工具（ESLint、Prettier、Husky）。
- 建立错误监控和日志系统。

### 7.5 流程与协作

- 制定开发流程：需求评审、技术设计、任务分配、开发、测试、发布。
- 使用项目管理工具（Jira、Trello）跟踪进度。
- 定期召开站会、迭代评审会、复盘会。

### 7.6 知识管理

- 建立内部 Wiki，记录技术文档、规范、常见问题。
- 鼓励技术分享，每周或每两周举办一次分享会。
- 组织代码审查，互相学习。

### 7.7 文化建设

- 营造开放、互助的氛围，鼓励提问和创新。
- 定期团建，增进团队凝聚力。
- 认可成员贡献，提供成长空间。

------

## 8. 给你一个现有项目，如何进行技术重构？考虑哪些风险？

**技术重构步骤**：

### 8.1 评估与规划

- **明确目标**：为什么要重构？提升性能、可维护性、技术栈升级、还是解决技术债务？
- **分析现状**：梳理项目架构、技术栈、代码质量、性能瓶颈、潜在问题。
- **确定范围**：全量重构还是渐进式重构？优先重构哪些模块（如核心业务、高复杂度模块）？

### 8.2 制定方案

- 设计新架构：技术栈选型、目录结构、状态管理、代码规范。
- 制定迁移计划：分阶段进行，每个阶段有明确目标和可交付成果。
- 准备回滚方案：万一出现问题，如何快速回退。

### 8.3 逐步实施

- **阶段1：基础设施**（1-2周）：搭建新脚手架，配置构建工具、ESLint、CI/CD。
- **阶段2：模块迁移**（按模块）：从非核心模块开始，逐步迁移到核心模块。每迁移一个模块，确保功能与原系统一致。
- **阶段3：并行运行**：新旧系统并行运行一段时间，对比功能和性能，收集反馈。
- **阶段4：切换与清理**：确认新系统稳定后，切换流量，下线旧系统。

### 8.4 测试与验证

- 编写自动化测试，覆盖核心功能。
- 进行性能测试，对比重构前后的指标。
- 灰度发布，逐步放量，监控错误和性能。

### 8.5 风险管理

- **业务中断风险**：通过灰度发布、回滚机制降低影响。
- **数据不一致风险**：确保新旧系统数据同步，迁移过程中数据完整性。
- **团队士气风险**：重构可能带来短期工作量增加，合理安排任务，及时肯定成果。
- **技术风险**：新技术的未知问题，提前充分调研和原型验证。

**项目实践**：在“铅蛋回收 SaaS 后台”中，我们曾将 Vue 2 + Webpack 项目渐进式重构为 Vue 3 + Vite。我们先用一个月搭建新架构，然后将非核心模块（如用户设置）迁移测试，稳定后再迁移核心模块（订单管理）。整个过程持续 3 个月，新旧系统并行运行 2 周，最终平滑切换。














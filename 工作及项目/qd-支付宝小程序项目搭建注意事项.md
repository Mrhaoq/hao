# 项目目录结构

```bash
my-alipay-miniapp/
├── .vscode/                       # VSCode 配置
│   ├── extensions.json            # 推荐扩展
│   └── settings.json              # 项目设置
├── src/
│   ├── api/                       # API 接口管理
│   │   ├── index.ts              # API 统一导出
│   │   ├── user.ts               # 用户相关接口
│   │   └── common.ts             # 公共接口
│   ├── assets/                    # 静态资源
│   │   ├── images/               # 图片资源
│   │   ├── icons/                # 图标资源
│   │   └── styles/               # 样式资源
│   │       ├── variables.scss    # 主题变量
│   │       ├── mixins.scss       # 混入样式
│   │       └── global.scss       # 全局样式
│   ├── components/               # 组件
│   │   ├── base/                # 基础组件
│   │   └── business/            # 业务组件
│   ├── composables/             # 组合式函数
│   │   ├── useAuth.ts          # 认证相关
│   │   ├── useTheme.ts         # 主题相关
│   │   └── useI18n.ts          # 国际化相关
│   ├── config/                  # 配置文件
│   │   ├── constants.ts        # 常量配置
│   │   ├── env.ts             # 环境配置
│   │   └── theme.ts           # 主题配置
│   ├── directives/             # 自定义指令
│   │   └── permission.ts      # 权限指令
│   ├── enums/                  # 枚举定义
│   │   ├── common.ts          # 通用枚举
│   │   └── business.ts        # 业务枚举
│   ├── hooks/                  # 钩子函数
│   │   ├── useList.ts         # 列表处理
│   │   └── useForm.ts         # 表单处理
│   ├── locales/                # 国际化语言包
│   │   ├── en/                # 英文
│   │   ├── zh-CN/             # 简体中文
│   │   └── index.ts           # 语言包入口
│   ├── pages/                  # 页面
│   │   ├── index/             # 首页
│   │   ├── login/             # 登录页
│   │   └── user/              # 用户中心
│   ├── stores/                 # Pinia 状态管理
│   │   ├── modules/           # 状态模块
│   │   │   ├── user.ts        # 用户状态
│   │   │   ├── app.ts         # 应用状态
│   │   │   └── theme.ts       # 主题状态
│   │   └── index.ts           # 状态管理入口
│   ├── types/                  # 类型定义
│   │   ├── global.d.ts        # 全局类型
│   │   ├── components.d.ts    # 组件类型
│   │   └── env.d.ts           # 环境类型
│   ├── utils/                  # 工具函数
│   │   ├── request.ts         # 请求封装
│   │   ├── storage.ts         # 存储工具
│   │   ├── validate.ts        # 验证工具
│   │   └── format.ts          # 格式化工具
│   ├── App.vue                 # 应用入口组件
│   ├── main.ts                 # 应用入口文件
│   ├── manifest.json          # uniapp 配置文件
│   └── pages.json            # 页面配置文件
├── .editorconfig              # 编辑器配置
├── .env                      # 环境变量
├── .env.development         # 开发环境变量
├── .env.production          # 生产环境变量
├── .eslintrc.js            # ESLint 配置
├── .gitignore              # Git 忽略文件
├── .prettierrc             # Prettier 配置
├── commitlint.config.js    # Git 提交规范配置
├── index.html              # 入口 HTML
├── package.json           # 项目依赖配置
├── README.md              # 项目说明文档
├── tsconfig.json          # TypeScript 配置
├── unocss.config.ts       # UnoCSS 配置
└── vite.config.ts         # Vite 配置
```

## 核心功能说明

1. **开发规范**
   - TypeScript 支持
   - ESLint + Prettier 代码规范
   - Husky + Commitlint 提交规范
   - EditorConfig 编辑器规范

2. **状态管理**
   - Pinia 模块化管理
   - 支持持久化存储
   - TypeScript 类型支持

3. **国际化**
   - vue-i18n 多语言支持
   - 按需加载语言包
   - 语言切换持久化

4. **主题系统**
   - 支持明暗主题切换
   - CSS 变量动态切换
   - 主题配置持久化

5. **请求封装**
   - 统一错误处理
   - 请求拦截器
   - 响应拦截器
   - 刷新 Token
   - TypeScript 类型支持

6. **工具函数**
   - 存储工具
   - 格式化工具
   - 验证工具
   - 设备工具

7. **组件系统**
   - 基础组件
   - 业务组件
   - 组件类型声明

8. **构建优化**
   - Vite 配置优化
   - 路由自动生成
   - 组件自动注册
   - 打包优化

9. **其他特性**
   - 权限控制
   - 路由守卫
   - 错误处理
   - 日志记录
   - 单元测试

## 注意事项

1. **支付宝小程序适配**
   - 遵循支付宝小程序规范
   - 使用条件编译
   - 优化包体积

2. **环境配置**
   - 区分开发/生产环境
   - 配置环境变量
   - 跨环境构建

3. **性能优化**
   - 按需加载
   - 资源压缩
   - 缓存优化

4. **安全考虑**
   - 数据加密
   - 敏感信息处理
   - 防刷机制

这个项目结构支持从零到一完整开发一个企业级支付宝小程序。你可以根据实际需求，逐个文件生成具体内容。建议按照以下顺序：

1. 基础配置文件（vite、typescript、eslint等）
2. 工具函数和类型定义
3. 状态管理和接口封装
4. 组件和页面开发
5. 主题和国际化配置
6. 构建和优化配置

project-name/  
├── .husky/                     # Git hooks  
├── .vscode/                    # VS Code 配置  
│   └── settings.json  
├── public/                     # 静态资源  
│   └── favicon.ico  
├── src/  
│   ├── api/                    # API 接口管理  
│   │   ├── index.ts           # API 接口统一导出  
│   │   ├── modules/           # API 模块  
│   │   │   ├── user.ts       # 用户相关接口  
│   │   │   └── system.ts     # 系统相关接口  
│   │   └── request.ts        # Axios 封装  
│   │  
│   ├── assets/                # 资源文件  
│   │   ├── images/           # 图片  
│   │   ├── styles/           # 样式  
│   │   │   ├── index.scss    # 主样式  
│   │   │   ├── variables.scss# 变量  
│   │   │   └── mixins.scss   # 混入  
│   │   └── icons/            # 图标  
│   │  
│   ├── components/            # 公共组件  
│   │   ├── Base/             # 基础组件  
│   │   ├── Business/         # 业务组件  
│   │   └── Layout/           # 布局组件  
│   │  
│   ├── composables/          # 组合式函数  
│   │   ├── useUser.ts  
│   │   └── usePermission.ts  
│   │  
│   ├── config/               # 配置文件  
│   │   ├── index.ts         # 主配置  
│   │   └── routes.ts        # 路由配置  
│   │  
│   ├── constants/            # 常量定义  
│   │   ├── index.ts  
│   │   ├── api.ts           # API 常量  
│   │   └── enum.ts          # 枚举常量  
│   │  
│   ├── directives/          # 自定义指令  
│   │   ├── index.ts  
│   │   └── permission.ts  
│   │  
│   ├── hooks/               # 钩子函数  
│   │   ├── index.ts  
│   │   └── useCache.ts  
│   │  
│   ├── layouts/             # 布局模板  
│   │   ├── default/  
│   │   └── blank/  
│   │  
│   ├── plugins/             # 插件  
│   │   ├── index.ts  
│   │   └── element.ts  
│   │  
│   ├── router/              # 路由  
│   │   ├── index.ts  
│   │   ├── routes.ts  
│   │   └── guard.ts  
│   │  
│   ├── store/               # 状态管理  
│   │   ├── index.ts  
│   │   └── modules/  
│   │       ├── user.ts  
│   │       └── app.ts  
│   │  
│   ├── types/               # 类型定义  
│   │   ├── api.d.ts  
│   │   ├── global.d.ts  
│   │   └── store.d.ts  
│   │  
│   ├── utils/               # 工具函数  
│   │   ├── index.ts  
│   │   ├── validator/  
│   │   ├── format/  
│   │   └── storage/  
│   │  
│   ├── views/               # 页面  
│   │   ├── dashboard/  
│   │   ├── login/  
│   │   └── error/  
│   │  
│   ├── App.vue              # 根组件  
│   ├── main.ts              # 入口文件  
│   └── env.d.ts             # 环境声明  
│  
├── tests/                   # 测试文件  
│   └── unit/  
├── types/                   # 全局类型定义  
├── .env                     # 环境变量  
├── .env.development  
├── .env.production  
├── .eslintrc.js            # ESLint 配置  
├── .prettierrc             # Prettier 配置  
├── .gitignore  
├── index.html  
├── package.json  
├── pnpm-lock.yaml  
├── README.md  
├── tsconfig.json           # TypeScript 配置  
└── vite.config.ts          # Vite 配置
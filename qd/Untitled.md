```js
import Layout from "@/layout";

const qdWallet = [
  {
    path: "/QDWallet",
    component: Layout,
    hidden: true,
    redirect: "noredirect",
    permissions: [
      "hazardouswaste:deliverySlip:detail",
      "invoiceFinance:declare:detail",
      "invoiceAccount:detail",
      "pay:organPay:walletDetailList",
    ],
    children: [
      // {
      //   path: "beforOpen",
      //   component: () => import("../views/QDWallet/beforOpen.vue"),
      //   hidden: true,
      //   name: "WalletBeforOpen",
      //   meta: {
      //     title: "铅蛋钱包",
      //     noCache: true,
      //     activeMenu: "/pay/QDWallet/index",
      //   },
      // },
      // {
      //   path: "bindCard",
      //   component: () => import("../views/QDWallet/bindCard.vue"),
      //   hidden: true,
      //   name: "WalletBindCard",
      //   meta: {
      //     title: "铅蛋钱包",
      //     noCache: true,
      //     activeMenu: "/pay/QDWallet/index",
      //   },
      // },
      // {
      //   path: "resetPassword",
      //   component: () => import("../views/QDWallet/resetPassword.vue"),
      //   hidden: true,
      //   name: "WalletResetPassword",
      //   meta: {
      //     title: "铅蛋钱包",
      //     noCache: true,
      //     activeMenu: "/pay/QDWallet/index",
      //   },
      // },
      // {
      //   path: "setPassword",
      //   component: () => import("../views/QDWallet/setPassword.vue"),
      //   hidden: true,
      //   name: "WalletSetPassword",
      //   meta: {
      //     title: "铅蛋钱包",
      //     noCache: true,
      //     activeMenu: "/pay/QDWallet/index",
      //   },
      // },
      // {
      //   path: "userWalletInfo",
      //   component: () => import("../views/QDWallet/userWalletInfo.vue"),
      //   hidden: true,
      //   name: "WalletUserWalletInfo",
      //   meta: {
      //     title: "铅蛋钱包",
      //     noCache: true,
      //     activeMenu: "/pay/QDWallet/index",
      //   },
      // },
      // {
      //   path: "validPassworld",
      //   component: () => import("../views/QDWallet/components/validPassworld.vue"),
      //   hidden: true,
      //   name: "WalletValidPassworld",
      //   meta: {
      //     title: "铅蛋钱包",
      //     noCache: true,
      //     activeMenu: "/pay/QDWallet/index",
      //   },
      // },
      // {
      //   path: "validPhone",
      //   component: () => import("../views/QDWallet/components/validPhone.vue"),
      //   hidden: true,
      //   name: "WalletValidPhone",
      //   meta: {
      //     title: "铅蛋钱包",
      //     noCache: true,
      //     activeMenu: "/pay/QDWallet/index",
      //   },
      // },
      // {
      //   path: "withdrawDeposit",
      //   component: () => import("../views/QDWallet/components/withdrawDeposit.vue"),
      //   hidden: true,
      //   name: "WalletWithdrawDeposit",
      //   meta: {
      //     title: "铅蛋钱包",
      //     noCache: true,
      //     activeMenu: "/pay/QDWallet/index",
      //   },
      // },
    ],
  },
];

export { qdWallet };

```


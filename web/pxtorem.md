pxtorem

npm i postcss-pxtorem@5.1.1

1.  npm install tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9 -S

2.  创建 vue.config.js
    ``` 
    module.exports = {
    // css 配置
    css: {
    loaderOptions: {
    postcss: {
    plugins: [require('tailwindcss'), require('autoprefixer'), require('postcss-pxtorem')({
    rootValue: 16,
    propList: ['*']
    })]
    }
    }
    }
    }
    ```
    
    
    
3.  创建 postcss.config.js
    ``` 
    module.exports = {
    plugins: {
    'autoprefixer': {
    browsers: ['Android >= 4.0', 'iOS >= 7']
    },
    'postcss-pxtorem': {
    rootValue: 16,　　//结果为：设计稿元素尺寸/16，比如元素宽 320px,最终页面会换算成 20rem
    propList: ['*'],
    　　 selectorBlackList: ['.norem']　　// 过滤掉 .norem 开头的 class，不进行转换
    }
    }
    }
    ```
    
    
    
4.  在 utils/rem.js

    function setRem() {
    const htmlWidth = document.body && document.body.offsetWidth
    const htmlEle = document.getElementsByTagName('html')[0]

        // 默认是在 1920 下 16px，那么对应比例缩放
        htmlEle.style.fontSize = htmlWidth ? (htmlWidth / 1920 * 16 + 'px') : '16px'

    }

    export {
    setRem
    }

5.  main.js

    ``` 
    import { setRem } from './utils/rem'
    
    setRem()
    
    // onresize 回调数组
    window.resizeCallbackList = [setRem]
    window.onresize = () => {
    window.resizeCallbackList.map(callback => {
    callback()
    })
    }
    
    ```
    
    

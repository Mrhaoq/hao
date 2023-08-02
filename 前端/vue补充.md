

[^权限，小程序，小程序地图，app地图]: 



# 																		vue	

​		vue 中$符开头的是给程序员使用的方法



# vue是什么? 

​	一套用于构建用户界面的渐进式jsvascript 框架

​		构建用户界面：收到数据后构建成界面

​		渐进式：Vue 可以自底向上逐层的应用 

​			简单应用：只需一个轻量小巧的核心库

​			复杂应用：可以引入各式各样的Vue 插件



# 	Vue 的特点

​	采用组件化，提高代码复用率、且让代码更好维护

​	声明式编码，让编码人员无需直接操作DOM，提高开发效率

​	使用虚拟DOM +优秀的Diff 算法，尽量复用DOM 节点



- 全局配置：vue.config 是一个对象，可配置全局的配置

- 创建Vue new一个配置对象

- 配置对象：key 不可更改 ，value 类型不可更改

- data 存储数据

- 一个容器只服务第一个 vue 

  

  # 语法

  ​	插值语法用于 标签体内容解析

  ​	指令语法用于 解析标签（包括属性、便桥体内容、绑定事件...）

  ​	相同 key 会向上覆盖，以最后一个为准

  

  # 数据绑定

  ​	单项数据绑定

  ​			v-bind 单项传值

  ​	双向数据绑定

  ​			v-model 双向传值 仅用于表单类元素（非表单类元素无法输入）

  ​	

  # el 于 data的第二种写法

  ​	el ： v.$mount('#root') 可加定时器进行延时

  ​	data：函数式    data中的this 指向Vue 实例对象

  ​			data(){

   				return {

  ​				 }

  ​			}

  

  #  MVVM 模型

  ​	M: Model 模型：对应data 中的**数据** （普通对象(data)）

  ​	V: View 视图：模板 （页面结构(#root)）

  ​	VM:ViewModel 视图模型：Vue 实例对象（数据绑定，DOM数据监听）      data 中所有的数据都出现在vm 身上  vm身上所有的属性及 Vue原型上所有属性，在 Vue 模板中都可以直接使用

  ​		

  # 数据代理

  - 通过vm对象来代理data对象中属性的操作（读/写）
  - Vue 中数据代理的好处
    - 更加方便的操作data中的数据
  - 基本原理
    - 通过Object.defineProerty() 吧dataduixiang中所有属性添加到vm上
    - 为每一个添加到vm上的属性都指定一个getter setter
    - 在getter setter 内部操作data 中对应得属性



# 		事件处理

- methods 

  ​	默认传参为事件对象 event  

  ​	传参时会失去event，在传参后加关键字$event 占位即可使用

  ​	this 指向vm

- 事件修饰符

  ​	修饰符可以连续使用

  ​	.prevent   阻止默认行为

  ​	.stop         阻止事件冒泡

  ​	.once        事件触发一次

  ​	.capture   事件捕获模式

  ​	.self           只有event.target 是当前操作的元素才是触发事件

  ​	.passive     事件默认行为立即停止，无需等待事件回调

- 键盘事件

  ​	多个单词拼接必须使用小写加 - 分隔

  ​	tab 默认事件是更换焦点，不适合使用keyup，必须配合keydown

  ​	系统修饰键：ctrl 、alt、shift、meta

  ​			配合keyup使用：按下修饰键的同事，在按下其他键，随后释放其他键事件才被触发

  ​			配合keydown使用：正常触发事件

-  可定义别名，但不推荐

  

  # 计算属性

  - 计算属性不可以开启异步任务等待返回值

  - 缓存：可以复用

  - 定义：要用的属性不存在，要通过已有属性计算得来

  - 计算属性最终会出现在 vm身上，直接读取即可

  - 如果计算属性要被修改，那必须写set函数响应，且set中要引起计算时依赖的数据发生改变

  - 计算属性简写，只读取不修改的时候可以简写为函数形式

    ​	需要修改需要写成配置对象

    ​	

    

  # 监视属性（侦听属性）

  - 监视属性是一个配置对象

  - handler(newValue,oldValue) {}

    ​	当前属性发生改变时调用

    ​	immediate:ture  初始化时让handler调用

  - 另一种写法 

    vm.$watch(要监视的对象，{immediate:ture                   handler(newValue,oldValue) {
    
    ​         }
    
    ​	 })

## 深度监视

- Vue中的watch 默认不监测对象内部值的改变（一层）
- deep:ture 深度监视，监视深层所有属性的变化（多层）
- Vue自身可以监测对象内部值的改变，但Vue提供的watcch默认不可以
- 使用watch时根据数据的具体结构，决定是否采用深度监视

## 简写

- 不配置深度监视和初始化调用时，可以简写为函数形式



# 列表渲染

- v-for 遍历 

  ​	加 :key 属性，只渲染可以加index ，需要改变顺序加 id

  ​		添加 id 增加节点复用率

  ​		不加key 默认添加 index 作为 key

  ​	遍历指定次数  v-for = (number,index) of number

  ​	遍历字符串 v-for = (char,index) of str （少用） 

  ​	遍历对象 v-for = (value,key) of obj 

  ​	遍历数组 v-for = (value,index) of arr

- 

# Vue数据检测原理-对象

- 响应式：数据变了页面跟着改变

- 通过setter 实现监视，且在new Vue时就传入要监测的数据

- 对象中后添加的属性vue默认不做响应式

  ​	如需添加响应式可以使用

  ​		Vue.set()

  ​		this.$set()



# Vue.set()

- this.$set()

- Vue.set(target,key/index,val)  只能给data的子对象加响应式属性，vm不允许作为tareget

  ​	向响应式对象添加一个property，并确保这个新property同样是响应式的，且触发视图更新，对象不能使vue实例过vue实例的根数据对象



# vue检测数据改变的原理-数组

- 数组没有对应的 setter getter 方法，发生更改时vue检测不到数据变化

- 可以通过调用数组方法使改变的数据变成响应式

- 也可以通过  Vue.set()    vm.$set()

  

# 数据劫持

- 



# 过滤器

- 





# 	脚手架cli

- 创建cli

    vue create  "work"

- 引入vant 

    yran add vant -S

- webpack

    npm i webpack webpack-cli -D


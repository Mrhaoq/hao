# Promise

## 为什么使用 Promise 

### 进程和线程

- 进程
  - 程序运行环境
  
- 线程
  - 进行程序运算

- 同步

  ```javascript
  function sum(a, b) {
  	// 获取当前时间戳
  	const begin = Date.now();
  	// 执行三秒此程序
  	
  	// 同步
    while (Date.now() - begin < 3000) {}
  }
  
  console.log(111);
  
  sum(1, 2);
  
  console.log(222);
  ```

  > - 通常情况下代码都是自上向下一行一行执行
  > - 前边的代码不执行，后边的代码也不会执行
  >   - 阻塞的
  >   - 1. 同步代码会出现阻塞情况
  >
  >     2. 解决方法

  

- 异步

  ``` javascript
  function sum(a, b, cb) {
  	// 获取当前时间戳
  	const begin = Date.now();
  
  	// 五秒后执行此程序
  	// 异步
  	setTimeout(() => cb(a + b), 3000);
  }
  
  console.log(111);
  
  sum(1, 2, result => console.log(result));
  
  console.log(222);
  ```
  
  - 但是异步代码不能通过 return 获取返回值
  
    - 特点
  
      1. 不会阻塞其他代码执行
      2. 需要回调函数来返回值
  
      > 基与回调函数的异步带来的问题
      >
      > ``` javascript
      > function sum(a, b, cb) {
      > 	// 获取当前时间戳
      > 	const begin = Date.now();
      > 
      > 	// 五秒后执行此程序
      > 	// 异步
      > 	setTimeout(() => cb(a + b), 1000);
      > }
      > 
      > console.log(111);
      > 
      > sum(1, 2, result => {
      > 	sum(result, 3, result => {
      > 		sum(result, 4, result => {
      > 			sum(result, 5, result => {
      > 				console.log(result);
      > 			});
      > 		});
      > 	});
      > });
      > 
      > console.log(222);
      > ```
      >
      > - 代码的可读性差
      > - 可调式性差
      >
      > 解决问题
      >
      > - 需要一个东西，可以替代回调函数返回结果
      > - Promise 出现
      
  
  1. 解决回调地狱
  1. 回调函数基本都是匿名函数，可调式性差
     1. 可以链式调用，解决代码的可读性差



##  Promise 是什么

### Promise 是异步编程的一种解决方案

- 他拥有一套特殊的存取数据方式
- 这个方式使得它可以存储异步调用的结果



##resolve , reject 

``` javascript
const promise = new Promise((resolve, reject) => {
	/* 
      resolve 和 reject 是两个函数，通过这两个函数
    可以向 Promise 中存储数据
      resolve 执行正常时存储数据，reject 执行错误时存储数据
      执行过 resolve 或 reject 后程序结束
  */
});
```

   ### then

- 通过 Promise 的实例方法 then 可以来读取 Promise 中存储的数据

  ``` javascript
  promise.then(
  	result => {
  		console.log("result", result);
  	},
  	reason => {
  		console.log("reason", reason);
  	}
  );
  ```
  
  > 1. then 接收两个回调函数作为参数
  > 2. 通过 resolve 存储的数据，会调用第一个函数返回
  > 3. 通过 reject 存储的数据，会调用第二个函数返回
  > 4. throw 可以停止 promise 并返回数据至第二个函数中

### catch

- 用法和 then 相似，但是只要一个回调函数作为参数

  ``` javascript
  const promise2 = new Promise((resolve, reject) => {
  	reject("reject");
  });
  
  promise2.catch(err => {
  	console.log(err);
  });
  ```
  
  > 1. catch 中的回调函数只会在 Promise 被拒绝时才调用
  > 2. catch 就是专门处理 Promise 异常的方法

### finally

- 用法和 then 相似，但是只要一个回调函数作为参数

  ``` javascript
  const promise2 = new Promise((resolve, reject) => {
  	reject("reject");
  });
  
  promise2
  	.catch(err => {
  		console.log(err);
  	})
  	.finally(() => {
  		console.log("finally");
  	});
  ```
  
  > 1. 无论是正常存储或是异常，finally总会执行
  >
  > 2. 但是 finally 的回调函数不会接收到数据
  >
  > 3. finally 通常用来编写一些无论成功与否都要执行的代码

**`这三个方法每次调用的时候都会返回一个新的 Promise，但 finally 中的数据不会存储到新的 Promise 中`**



## Promise 中维护了两个隐藏属性 

### PromiseResult

1. 用来存储数据

### PromiseState

- 记录 Promise 的状态 (三种状态)
  
  - state 无法撤回，只能修改一次
  
  
  > - pending (进行中)
  > - fulfilled (完成)     
  >   - 执行 resolve 时
  > - rejected (拒绝)  
  >   - 执行 reject 时
  
- 流程

  > 当 Promise 创建时，PromiseState 初始值为 pending
  >
  > - 当通过 resolve 存储数据时 PromiseState 变为 fulfilled (完成)
  >
  > - 当通过 reject 存储数据或出错时 PromiseState 变为  rejected (拒绝，出错)
  >
  > 当通过 then 读取数据时，相当于为 Promise 设置了回调函数
  >
  > - 如果 PromiseState 变为 fulfilled，调用 then 的第一个回调函数返回数据
  > - 如果 PromiseState 变为 rejected，调用 then 的第二个回调函数返回数据

  

##Promise 的静态方法

Promise 的静态方法

1. `Promise.reslove()` 创建一个立即完成的 Promise

``` javascript
Promise.reslove(10)
// 等价
const promise = new Promise((resolve, reject) => {
 resolve("resolve");
});
```



2. `Promise.reject()` 创建一个立即拒绝的 Promise

``` js
Promise.reject(10).catch(err => console.log(err));
// 10
```



3. `Promise.all()` 创建一个**同时**返回多个结果的 Promise
   1. 他接收一个可迭代对象（数组）
      1. 数组中只能是 Promise 
   2. 如果有报错，其他的值都不会返回
   3. 返回值以数组形式返回，直接返回成功结果

``` js
function sum(a, b) {
	return new Promise((resolve, reject) => {
		resolve(a + b);
	});
}
Promise.all([sum(1, 2), sum(3, 4), sum(5, 6)]).then(r => {
	console.log(r);
});
// [ 3, 7, 11 ]
```



4. `Promise.allSettled()` 创建一个**同时**返回多个结果的 Promise
   1. 他接收一个可迭代对象（数组）
   2. 返回值也是以数组形式返回
      1. 将成功或失败的结果及状态，以对象方式返回

``` js
function sum(a, b) {
	return new Promise((resolve, reject) => {
		resolve(a + b);
	});
}
Promise.allSettled([sum(1, 2), Promise.reject(1), sum(3, 4), sum(5, 6)]).then(
	r => {
		console.log(r);
	}
);
// [
// 	{ status: "fulfilled", value: 3 },
// 	{ status: "rejected", reason: 1 },
// 	{ status: "fulfilled", value: 7 },
// 	{ status: "fulfilled", value: 11 },
// ];
```



5. `Promise.race()` 创建一个**同时**返回多个结果的 Promise
   1. 他接收一个可迭代对象（数组）
   2. 返回一个执行最快的结果

``` js
function sleep(time, value, state) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (state === "兑现") {
				return resolve(value);
			} else {
				return reject(new Error(value));
			}
		}, time);
	});
}

const p1 = sleep(500, "一", "兑现");
const p2 = sleep(100, "二", "兑现");

Promise.race([p1, p2]).then(value => {
	console.log(value); // “二”
	// 两个都会兑现，但 p2 更快
});

const p3 = sleep(100, "三", "兑现");
const p4 = sleep(500, "四", "拒绝");

Promise.race([p3, p4]).then(
	value => {
		console.log(value); // “三”
		// p3 更快，所以它兑现
	},
	error => {
		// 不会被调用
	}
);

const p5 = sleep(500, "五", "兑现");
const p6 = sleep(100, "六", "拒绝");

Promise.race([p5, p6]).then(
	value => {
		// 不会被调用
	},
	error => {
		console.error(error.message); // “六”
		// p6 更快，所以它拒绝
	}
);
```
















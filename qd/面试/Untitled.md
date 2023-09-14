#郭炳坤

## 项目 

### 登录模块

1. 用户认证和授权：确保只有经过认证的用户能够登录到系统，并且根据用户的权限进行相应的授权操作。
2. 安全性：登录模块需要具备一定的安全性，包括密码加密存储、防止暴力破解、防止跨站脚本攻击（XSS）等。
3. 用户界面设计：登录页面需要友好的用户界面设计，包括输入框、按钮、验证码等元素的布局和样式。
4. 用户输入验证：对用户输入的用户名和密码进行验证，确保输入的合法性和正确性。
5. 记住登录状态：提供记住登录状态的功能，使用户下次访问时无需再次输入用户名和密码。
6. 错误处理：处理登录过程中可能出现的错误情况，例如用户名或密码错误、账号被锁定等。
7. 登录日志：记录用户的登录日志，包括登录时间、IP地址等信息，用于追踪和审计用户行为。
11. 找回密码：提供找回密码的功能，例如通过邮箱或手机号重置密码。

### 员工管理

1. 员工信息管理：包括员工的基本信息（姓名、性别、联系方式等）、部门信息、职位信息等。
2. 员工权限管理：根据员工的角色和职位，设置相应的权限，确保员工只能访问其具备权限的功能和数据。
3. 员工账号管理：管理员工的登录账号和密码，包括添加、修改、删除员工账号等操作。
4. 员工状态管理：管理员工的在职状态，包括添加、离职、调岗等操作。
5. 员工搜索和筛选：提供搜索和筛选功能，方便快速找到需要的员工信息。
6. 员工数据统计：提供员工数据的统计和报表功能，例如员工数量、部门人数、职位分布等。
7. 员工权限审批：对员工权限的申请和审批流程进行管理，确保权限的合理分配和控制。
8. 员工通知和消息：提供给员工发送通知和消息的功能，例如发送工作安排、通知离职流程等。
9. 员工考勤管理：记录员工的考勤信息，包括上下班打卡、请假、加班等操作。
10. 员工培训和发展：提供员工培训和发展计划的管理功能，包括培训计划、学习资源等。

### 密码加密

在前端实现登录功能时，密码加密是非常重要的一步，以确保用户的密码在传输和存储过程中不被轻易泄露。以下是一种常见的前端密码加密方法：

1. 使用哈希算法：哈希算法是一种将任意长度的数据映射为固定长度的数据的算法。在密码加密中，常用的哈希算法有 MD5、SHA-1、SHA-256 等。

2. 添加盐值：为了增加密码的安全性，可以在密码加密过程中添加一个随机的盐值。盐值是一个随机生成的字符串，与用户密码进行混合后再进行哈希运算。这样即使两个用户的密码相同，由于盐值的不同，最终生成的哈希值也会不同。

3. 多次迭代哈希：为了增加破解密码的难度，可以对密码进行多次哈希运算。每次哈希运算的结果作为下一次哈希运算的输入，这样可以增加破解密码所需的时间和计算资源。

示例，使用 SHA-256 哈希算法和随机盐值对密码进行加密：

```javascript
import { createHash } from 'crypto';

function encryptPassword(password) {
  const salt = generateSalt(); // 生成随机盐值
  const hashedPassword = hashPassword(password, salt); // 哈希运算
  return {
    salt,
    hashedPassword
  };
}

function generateSalt() {
  const length = 16; // 盐值的长度
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let salt = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    salt += characters[randomIndex];
  }
  return salt;
}

function hashPassword(password, salt) {
  const hash = createHash('sha256');
  const hashedPassword = hash.update(password + salt).digest('hex');
  return hashedPassword;
}

// 使用示例
const password = 'myPassword';
const encryptedPassword = encryptPassword(password);
console.log(encryptedPassword);
```

以上代码中，`encryptPassword` 函数接收用户的密码作为输入，生成随机盐值，并将密码和盐值混合后进行 SHA-256 哈希运算。最终返回的结果包括盐值和哈希后的密码，可以将这些信息发送到服务器进行存储。

请注意，前端加密只是为了增加密码的安全性，最终的密码验证和存储应该在服务器端进行。服务器端需要使用相同的加密算法和盐值对用户输入的密码进行加密，并与数据库中存储的哈希密码进行比对。 

## 技能

###  机制

### 缓存机制

在项目中使用浏览器缓存机制可以通过设置响应头信息来实现。以下是一些常用的方法：

1. 强缓存：使用`Cache-Control`和`Expires`响应头来设置强缓存。

- `Cache-Control`：可以设置为`public`或`private`，用于指定该资源是否可以被公共缓存或私有缓存。还可以设置`max-age`来指定该资源在缓存中的有效时间，单位为秒。
- `Expires`：用于指定该资源的过期时间，是一个具体的日期和时间。

```javascript
app.get('/static/js/app.js', (req, res) => {
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.setHeader('Expires', new Date(Date.now() + 3600000).toUTCString());
  // 返回静态资源
});
```

2. 协商缓存：使用`ETag`和`Last-Modified`响应头来设置协商缓存。

- `ETag`：是一个唯一标识符，用于表示该资源的内容。服务器可以根据该标识符来判断资源是否发生了变化。
- `Last-Modified`：用于指定该资源的最后修改时间。

```javascript
app.get('/static/css/style.css', (req, res) => {
  const content = fs.readFileSync('path/to/style.css');
  const stats = fs.statSync('path/to/style.css');
  const lastModified = stats.mtime.toUTCString();
  const etag = crypto.createHash('md5').update(content).digest('hex');

  res.setHeader('Last-Modified', lastModified);
  res.setHeader('ETag', etag);

  if (req.headers['if-none-match'] === etag || req.headers['if-modified-since'] === lastModified) {
    res.sendStatus(304);
  } else {
    res.setHeader('Content-Type', 'text/css');
    res.send(content);
  }
});
```

通过合理设置缓存策略，可以提高网页加载速度和减少服务器的负载。需要注意的是，缓存策略可能会影响到资源更新的及时性，因此在开发过程中需要根据实际情况进行调整和更新。

### 垃圾回收

在JavaScript中，垃圾回收是由JavaScript引擎自动处理的，开发者无需手动管理内存。JavaScript引擎使用的是自动垃圾回收机制，通过周期性地检查不再使用的对象，并进行内存回收来释放内存。

然而，开发者可以采取一些措施来帮助垃圾回收机制更有效地工作：

1. 解除对象引用：当一个对象不再被使用时，手动解除对该对象的引用可以帮助垃圾回收机制更早地回收该对象所占用的内存。例如，当一个对象不再需要时，将其赋值为`null`，或者将其属性设置为`null`。

2. 避免循环引用：循环引用是指对象之间形成了相互引用的关系，导致这些对象无法被垃圾回收。为了避免循环引用，可以使用弱引用（WeakMap或WeakSet）来存储对象的引用，这样即使其他地方没有引用该对象，垃圾回收机制也能正确地回收它。

3. 使用适当的作用域和闭包：合理使用函数作用域和闭包可以帮助垃圾回收机制更好地管理内存。确保及时释放不再需要的变量和函数，避免不必要的内存占用。

总之，JavaScript的垃圾回收机制是自动进行的，开发者无需手动管理内存。但通过解除对象引用、避免循环引用和使用适当的作用域和闭包，可以帮助垃圾回收机制更高效地工作，提升程序的性能和内存管理。

### history 和 hash

路由的 Hash 模式和 History 模式是前端常见的两种路由模式，它们的底层原理有所不同。

1. Hash 模式：
   - 在 Hash 模式下，URL 的 hash 部分（即 # 后面的内容）被用作路由的标识符。
   - 当浏览器 URL 的 hash 发生变化时，浏览器不会向服务器发送请求，而是触发 hashchange 事件，JavaScript 可以监听该事件并根据新的 hash 值来更新页面内容。
   - Hash 模式的优点是兼容性好，支持在不同浏览器和服务器环境下使用，不需要服务器配置特殊的规则。
   - 缺点是 URL 中带有 # 符号，不够美观，且不利于 SEO。

2. History 模式：
   - 在 History 模式下，URL 的 path 部分（即域名后面的路径）被用作路由的标识符。
   - 当浏览器 URL 的 path 发生变化时，浏览器会向服务器发送请求，服务器需要配置规则来确保在任何路径下都返回同一个 HTML 页面。
   - 为了实现 History 模式，HTML5 引入了 History API，包括 pushState()、replaceState() 和 popstate 事件。
   - History 模式的优点是 URL 美观，没有 # 符号，利于 SEO。
   - 缺点是需要服务器配置支持，否则在刷新页面或直接访问子路径时会出现 404 错误。

总结：
- Hash 模式适用于简单的单页应用，不需要服务器配置特殊规则，兼容性好。
- History 模式适用于需要更美观的 URL 和更好的 SEO 的应用，但需要服务器配置支持。
- 在实际项目中，根据需求和服务器环境选择适合的路由模式。
const http = require("http");

const url = require("url");

const moduleRender = require("./modules/index.js");

// http
// 	.createServer((req, res) => {
// 		// console.log("server start", req, res);

// 		// res.write("Hello World !!!");
// 		// res.end();

// 		if (req.url == "/favicon.ico") {
// 			return;
// 		}
// 		console.log(req.url);

// 		// 请求头配置
// 		res.writeHead(moduleRender.renderStatus(res.url), {
// 			"Content-Type": "text/html;charset=utf-8",
// 		});
// 		// res.write(
// 		// 	`
// 		//     <h1>首页</h1>
// 		//   `
// 		// );

// 		res.write(moduleRender.renderHTML(req.url));
// 		res.end();
// 	})
// 	.listen(3000, () => {
// 		console.log("server start");
// 	});

const serve = http.createServer();

const urlData = {
	protocol: null,
	slashes: null,
	auth: null,
	host: null,
	port: null,
	hostname: null,
	hash: null,
	search: "?id=123123?name=hao",
	query: "id=123123?name=hao",
	pathname: "/home",
	path: "/home?id=123123?name=hao",
	href: "/home?id=123123?name=hao",
};

serve.on("request", (req, res) => {
	const { pathname } = url.parse(req.url);
	console.log(pathname);

	const { query } = url.parse(req.url, true);
	console.log(query);

	const test = url.format(urlData);
	console.log("test >> ", test);
	// 请求头配置
	res.writeHead(moduleRender.renderStatus(pathname), {
		"Content-Type": "text/html;charset=utf-8",
	});
	res.write(moduleRender.renderHTML(pathname));
	res.end();
});

serve.listen(3000, () => {
	console.log("server start");
});

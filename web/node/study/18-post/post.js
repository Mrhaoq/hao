var http = require("http");
var https = require("https");
var url = require("url");

const server = http
	.createServer((req, res) => {
		const urlobj = url.parse(req.url, true);
		res.writeHead(200, {
			"Content-Type": "application/json;charset=utf-8",
			// cors 头
			"access-control-allow-origin": "*",
		});

		switch (urlobj.pathname) {
			case "/list/aaa":
				httpGet(res);
				break;

			default:
				res.end("404");
				break;
		}
	})
	.listen(3000);

function httpGet(response) {
	let data = "";
	const options = {
		hostname: "https://test.qd.qybh.top/dev-api",
		port: 443,
		path: "/disposal/nameList",
		method: "POST",
		headers: {
			Authorization: getToken(),
			"Content-Type": "application/json",
		},
	};

	const req = https.request(options, res => {
		// data 数据为分批接收
		// res.on("data", chunk => {
		// 	console.log(chunk.toString(), chunk);
		// 	data += chunk;
		// });

		res.on("end", () => {
			console.log("end >>  ", data);
			response.end(data);
		});
	});

	req.on("error", e => {
		console.error(`请求遇到问题: ${e.message}`);
	});

	req.end();
}

server.on("listening", () => {
	console.log("Server listening on port 3000");
});

function getToken(params) {
	return "eyJhbGciOiJIUzUxMiJ9.eyJsb2dpbl91c2VyX2tleSI6ImViNDc3MGI5LTg5MWUtNGNkMS1hZGJiLWJkZWRhOTk0ZjBiNiJ9.X36sx_1HMsTsRe40DC6WzwlO43Ig_mr-xrtDb22cV8yy4NVIdsR6RplD5Z8Dngijf7qTJin9GBEs4gYtBXpGmg";
}

var http = require("http");
var url = require("url");

const server = http
	.createServer((req, res) => {
		console.log("Request received");

		const urlobj = url.parse(req.url, true);
		// console.log(urlobj.query.callback);

		res.writeHead(200, {
			"Content-Type": "application/json;charset=utf-8",
			// cors 头
			"access-control-allow-origin": "*",
		});

		switch (urlobj.pathname) {
			case "/list/aaa":
				const data = {
					code: "200",
					content: { name: "Ethen", age: 18 },
				};
				res.end(`${JSON.stringify(data)}`);
				break;

			default:
				res.end("404");
				break;
		}
	})
	.listen(3000);

server.on("listening", () => {
	console.log("Server listening on port 3000");
});

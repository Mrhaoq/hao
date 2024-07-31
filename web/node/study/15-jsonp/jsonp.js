var http = require("http");
var url = require("url");

const server = http
	.createServer((req, res) => {
		console.log("Request received");

		const urlobj = url.parse(req.url, true);
		console.log(urlobj.query.callback);

		switch (urlobj.pathname) {
			case "/list":
				const data = { name: "Ethen", age: 18 };
				res.end(`${urlobj.query.callback} (${JSON.stringify(data)});`);
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

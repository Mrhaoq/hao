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
	https.get(
		`https://mt-m.maoyan.com/ajax/movieOnInfoList?token=&optimus_uuid=83DBA96018AB11EF981497D74A22C13A51BB27B2F03F44E1AFA25D655A4A27DA&optimus_risk_level=71&optimus_code=10`,
		res => {
			res.on("data", chunk => {
				console.log(chunk.toString(), chunk);
				data += chunk;
			});

			res.on("end", () => {
				console.log("end >>  ", data);
				response.end(data);
			});
		}
	);
}

server.on("listening", () => {
	console.log("Server listening on port 3000");
});

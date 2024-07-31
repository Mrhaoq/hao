const routerUrl = ["/home", "/list", "/api/list"];
function renderStatus(url) {
	if (routerUrl.includes(url)) return 200;
	return 404;

	// res.writeHead(status, { "Content-Type": "text/html;charset=utf-8" });
	// res.end();
}

function renderHTML(url) {
	switch (url) {
		case "/home":
			return `
        <h1>home页面</h1>
      `;
		case "/list":
			return `
        <h1>list页面</h1>
      `;

		default:
			return `
        <h1>test 404 not found</h1>
      `;
	}
}

module.exports = {
	renderStatus,
	renderHTML,
};

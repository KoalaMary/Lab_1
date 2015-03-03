var http = require('http');
var url = require('url');
var hello = require('./hello');

var friends = [];

var requestHandler;
requestHandler = function (request, response) {

	var reqData = url.parse(request.url, true);
	var pathName = reqData.pathname;

	exports.request = request;
	exports.response = response;

	if (pathName === '/') {
		response.writeHead(200, {'Content-type': 'text/html; charset=UTF-8'});
		response.end('<h1>Имя</h1> \
			<form action="/hello" method="POST"> \
				<input name="userName" value="' + 1 + '"/> \
				<input name="age"/> \
				<input type="submit"/> \
			</form>');
	} else if (pathName === '/root') {
		response.writeHead(200);
		response.end('ROOOOT!');
	} else if (pathName === '/hello') {
		if (reqData.query.userName) {
			friends.push(reqData.query.userName);
		}
		response.writeHead(200);
		response.end(JSON.stringify(friends));
	} else {
		response.writeHead(404);
		response.end(request.href);
	}

};

var server = http.createServer(requestHandler);
server.listen(2030);

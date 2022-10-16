const http = require("http");
const fs = require("fs");

// Create the server
const server = http.createServer(function (req, res) {
    console.log(req.url);
    if(req.method === "GET"){
        if(req.url === "/" || req.url === "/index.html"){
			//read the todo.html file and send it back
			fs.readFile("src/index.html", function(err, data){
				if(err){
					res.statusCode = 500;
					res.write("Server Error: Index.html not Found");
					res.end();
					return;
				}
				res.statusCode = 200;
				res.setHeader("Content-Type", "text/html");
				res.write(data);
				res.end();
			});
        } else if(req.url === "/client.js") {
            fs.readFile("client/client.js", function(err, data){
				if(err){
					res.statusCode = 500;
					res.write("Server Error: client.js not Found");
					res.end();
					return;
				}
				res.statusCode = 200;
				res.setHeader("Content-Type", "application/javascript");
				res.write(data);
				res.end();
			});
        } else if(req.url === "/favicon.ico") {
            fs.readFile("resources/weatherIcon.png", function(err, data) {
                if(err) {
                    res.statusCode = 404;
                    res.write("Webpage Icon not Found");
                    res.end();
                }
                res.writeHead(200, "Content-Type", "image/apng")
                res.write(data);
                res.end();
            })
        } else {
			res.statusCode = 404;
			res.write("Unknwn resource.");
			res.end();
		}
    }
});

server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');

const http = require("http");
const fs = require("fs");

const MIME_TYPES = {
	css: "text/css",
	gif: "image/gif",
	htm: "text/html",
	html: "text/html",
	ico: "image/png",
	jpeg: "image/jpeg",
	jpg: "image/jpeg",
	js: "text/javascript",
	json: "application/json",
	png: "image/png",
	svg: "image/svg+xml",
	txt: "text/plain"
  };
  let browserTypes = [MIME_TYPES.html, MIME_TYPES.css, MIME_TYPES.js]

// Create the server
const server = http.createServer(function (req, res) {
    console.log(req.url);
	let mime; 
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
        }
		else if (browserTypes.includes((mime=get_mime(req.url)))) {
            fs.readFile("src"+ req.url, function(err, data){
				if(err){
					res.statusCode = 500;
					res.write("Server Error: " + req.url + "not Found");
					res.end();
					return;
				}
				res.statusCode = 200;
				res.setHeader("Content-Type", mime);
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

function get_mime(filename) {
    for (let ext in MIME_TYPES) {
      if (filename.indexOf(ext, filename.length - ext.length) !== -1) {
        return MIME_TYPES[ext]
      }
    }
    return MIME_TYPES["txt"]
  }
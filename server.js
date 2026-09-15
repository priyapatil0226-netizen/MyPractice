const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {

    if (req.method === "GET" && req.url === "/") {

        fs.readFile("./public/index.html", (err, data) => {
            res.writeHead(200, {
                "Content-Type": "text/html"
            });

            res.end(data);
        });

    }

    else if (req.method === "POST" && req.url === "/user") {

        let body = "";

        req.on("data", chunk => {
            body += chunk;
        });

        req.on("end", () => {

            const user = JSON.parse(body);

            console.log("Name:", user.name);
            console.log("Age:", user.age);
            console.log("Height:", user.height);

            res.writeHead(200, {
                "Content-Type": "text/plain"
            });

            res.end(
                `Hello ${user.name}! Age: ${user.age}, Height: ${user.height} cm`
            );
        });
    }

});

server.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
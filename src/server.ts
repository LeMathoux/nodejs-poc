import {createServer} from "node:http";

const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000;

const server = createServer((request, response) => {
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
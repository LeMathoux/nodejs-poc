import {createServer} from "node:http";
import type {IncomingMessage, ServerResponse} from "node:http";

import defaultController from "./controller/defaultController";
import HealthController from "./controller/healthController";
import ErrorController from "./controller/errorController";

const port = process.env.SERVER_PORT ? parseInt(process.env.SERVER_PORT) : 3000;

const server = createServer((request: IncomingMessage, response: ServerResponse) => {
    const { method, url } = request;

    const { pathname, searchParams } = new URL(url ?? "/", `http://${request.headers.host}`);
    const segments = pathname.split("/").filter(Boolean);

    switch (segments[0]) {
        case "health":
            if (method === "GET") {
                switch (segments[1]) {
                    case undefined:
                        HealthController.getHealth(request, response);
                        break;
                    case "ping":
                        HealthController.getHealthPing(request, response);
                        break;
                    default:
                        ErrorController.getNotFound(request, response);
                        break;
                }
            } else {
                ErrorController.getMethodNotAllowed(request, response);
            }
            break;
        default:
            if (method === "GET" && segments.length === 0) {
                defaultController.getIndex(request, response);
            } else {
                ErrorController.getNotFound(request, response);
            }
            break;
    }

});

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
export default class ErrorController {
    public static getNotFound(req: any, res: any) {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found' }));
    }

    public static getMethodNotAllowed(req: any, res: any) {
        res.writeHead(405, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Method Not Allowed' }));
    }
}
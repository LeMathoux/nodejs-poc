export default class HealthController {
    public static getHealth(req: any, res: any) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ status: 'OK', info: new Date().toISOString() }));
    }

    public static getHealthPing(req: any, res: any) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('pong');
    }
}
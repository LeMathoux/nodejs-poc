export default class DefaultController {
    public static getIndex(req: any, res: any) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ service: 'diagnostic', version: 1 }));
    }
}
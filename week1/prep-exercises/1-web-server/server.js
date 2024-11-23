import http from 'http';
import fs from 'fs/promises';
import path from 'path';

const server = http.createServer(async (req, res) => {
    try {
        const basePath = process.cwd(); 

        if (req.url === '/') {
            const htmlPath = path.join(basePath, 'index.html');
            const html = await fs.readFile(htmlPath, 'utf-8');
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(html);
        } else if (req.url === '/index.js') {
            const jsPath = path.join(basePath, 'index.js');
            const js = await fs.readFile(jsPath, 'utf-8');
            res.writeHead(200, { "Content-Type": "application/javascript" });
            res.end(js);
        } else if (req.url === '/style.css') {
            const stylePath = path.join(basePath, 'style.css'); 
            const style = await fs.readFile(stylePath, 'utf-8'); 
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(style);
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 Not Found");
        }
    } catch (err) {

		res.writeHead(500, { "Content-Type": "text/plain" });
        res.end(`Server Error: ${err.message}`);
    }
});

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'build');
const PREFIX = '/lptemporaria/2';
const PORT = 8090;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png':  'image/png',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
};

http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  if (url === '/' || url === PREFIX || url === PREFIX + '/') {
    url = PREFIX + '/index.html';
  }

  if (!url.startsWith(PREFIX)) {
    res.writeHead(302, { Location: PREFIX + '/' });
    return res.end();
  }

  const rel  = decodeURIComponent(url.slice(PREFIX.length) || '/index.html');
  const file = path.join(ROOT, rel);

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      return res.end('Not found: ' + rel);
    }
    const ext = path.extname(file).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log('Servidor rodando em http://localhost:' + PORT + PREFIX + '/');
});

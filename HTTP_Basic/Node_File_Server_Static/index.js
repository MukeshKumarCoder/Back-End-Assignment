const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {

  const parsedUrl = url.parse(req.url, true);
  let filePath = path.join(__dirname, parsedUrl.pathname);

  if (fs.statSync(filePath).isDirectory()) {
    fs.readdir(filePath, (err, files) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }

      const htmlContent = `
        <html>
          <body>
            <ul>
              ${files.map(file => `<li><a href="${path.join(parsedUrl.pathname, file)}">${file}</a></li>`).join('')}
            </ul>
          </body>
        </html>
      `;

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(htmlContent);
    });
  } else {
    fs.readFile(filePath, (err, data) => {
      if (err) {

        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
        return;
      }

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
  }
});


const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

// Export the server variable
module.exports = server;

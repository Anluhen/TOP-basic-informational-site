const http = require('node:http');
const fs = require('node:fs');
const path = require('path');

const server = http.createServer((req, res) => {

    let filePath 
    
    if (req.url === '/'){
        // Go to index.html if empty
        filePath = 'index.html';
    } else if (req.url === '/about'){
        // Go to correct file if file extension is left out
        filePath = 'about.html';
    } else {
        // Go to 404 page
        filePath = '404.html';
    } 

    // Join the full file path
    const fullPath = path.join(__dirname, filePath);

    fs.readFile(fullPath, (err, data) => {
        if (err) {
            // Write 404 
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            return res.end('404: File Not Found')
        }

        // Return 200 Ok and file content
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);

    });
});

// Check if server is up
server.listen(8080, () => {
    console.log('Server listening on http://localhost:8080');
})
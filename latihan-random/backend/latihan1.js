// import modeul http dari node.js
const http = require('http');

// fungsi untuk menangani request dan response
const requestListener = (req, res) => {
    // mengatur header response menjadi text/plain agar mengirim teks basa 
    res.setHeader('COntent-Type', 'text/plain');

    // memeriksa URL dari request
    if (req.url === '/') {
        res.writeHead(200);
        res.end('welcome to the backend server');
    } else if (req.url === '/about') {
        res.writeHead(200);
        res.end('about page');
    } else {
        res.writeHead(404);
        res.end('page not found');
    }
};
// membuat server menggunakan modul http
const server = http.createServer(requestListener);

// menjalanakan server di port 3000
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
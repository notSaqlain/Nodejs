const http = require('http');
const fs = require('fs');
const path = require('path');

// Funzione per leggere il file dei libri
function getBooksHTML() {
    const data = fs.readFileSync('books.json');
    const books = JSON.parse(data);
    let html = '<ul>';
    books.forEach(book => {
        html += `<li><strong>${book.title}</strong> di ${book.author}</li>`;
    });
    html += '</ul>';
    return html;
}

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        const html = fs.readFileSync('index.html', 'utf8');
        const bookList = getBooksHTML();
        const finalPage = html.replace('<!-- Qui appariranno i libri -->', bookList);
        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(finalPage);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Pagina non trovata');
    }
});

server.listen(3000, () => {
    console.log('Server avviato su http://localhost:3000');
});

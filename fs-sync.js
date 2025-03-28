const { readFileSync, writeFileSync } = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  console.log('Request received');
  const first = readFileSync('index.html', 'utf8');
  
  writeFileSync(
    'result-sync.txt',
    `Here is the result : ${first}`,
    { flag: 'a' }
  );

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(first);

  console.log('Response sent and file written');
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000...');
});
const http = require('http')

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Welcome to our home page')
  } else if (req.url === '/about') {
    res.end('about us')
  } else {
    res.end(`
    <h1>Oops!</h1>
    <p>Non riusciamo a trovare la pagina che stai cercando</p>
    <a href="/">home</a>
    `)
  }
})

server.listen(8080)
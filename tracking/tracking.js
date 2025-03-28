var http = require('http');
var fs = require('fs');

var elenco = null;

http.createServer(

  function (req, res) {

    fs.readFile('tracking.json', 'utf8', function(err, data) {
      if(err) {
        elenco = [];
      } else {
        elenco = JSON.parse(data);
      }
      // prepara l'html da restituire
      res.writeHead(200, {'Content-Type': 'text/html'});
      // res.write(data);
      for(var obj of elenco) {
        res.write("<p>" + obj.msg + "</p>");
      }
      return res.end();
    }
   
/*   fs.readFile('tracking_home.html', 'utf8' function(err, data) {
    if(err) {
      res.writeHead(404, {'Content-Type': 'text/html'});
      return res.end("404 La home di tracking non è stata trovata");
    }
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    return res.end();
  }*/
); 
}).listen(3000);
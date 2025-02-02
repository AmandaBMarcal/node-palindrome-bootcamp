const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
// const figlet = require('figlet')

const server = http.createServer(function(req, res) {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == "/api") {
     if("palindrome" in params){
       let str = params["palindrome"].toLowerCase();
       if( str === str.split('').reverse().join('') ){
         res.writeHead(200, {'Content-Type': 'application/json'});
         var objToJson = {
           palindrome: true
         }
         res.end(JSON.stringify(objToJson));
       }else{
         res.writeHead(200, {'Content-Type': 'application/json'});
         var objToJson = {
           palindrome: false
         }
         res.end(JSON.stringify(objToJson));
       }
     }
   }
  else if (page == '/css/style.css'){
    fs.readFile('css/style.css', function(err, data) {
      res.write(data);
      res.end();
    });
  }else if (page == '/js/main.js'){
    fs.readFile('js/main.js', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);

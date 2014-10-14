var readFile = require('fs').createReadStream;
var server = require('http').createServer().listen(8080);

server.on('request', function (req, res) {
  switch (req.url) {
    case '/dist/ng-sort-set.js':
      readFile('../dist/ng-sort-set.js').pipe(res);
      break;
    case '/':
      readFile('./index.html').pipe(res)
  }
});

'use strict';

let spdy = require('spdy');
let fs = require('fs');

let options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt')
};

spdy.createServer(options, function(req, res) {
    let stream = res
      .push('/main.js', {
        request: {
          accept: '*/\*'
        },
        response: {
          'content-type': 'application/javascript'
        }
      })
      .end('console.log("Hello World");');

    res.writeHead(200);
    res.end('<script src="/main.js"></script>');
}).listen(3000);


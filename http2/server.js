'use strict';

const spdy = require('spdy');
const fs = require('fs');

const options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt')
};

spdy.createServer(options, (req, res) => {
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

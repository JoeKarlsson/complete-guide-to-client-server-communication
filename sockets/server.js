var WebSocketServer = require('ws').Server
var wss = new WebSocketServer({ port: 8081 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  ws.on('end', function() {
    console.log('Connection ended...');
  });

  ws.send('Hello Client');
});
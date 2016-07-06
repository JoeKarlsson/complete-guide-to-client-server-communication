'use strict';

const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', ((ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
  });

  ws.on('end', () => {
    console.log('Connection ended...');
  });

  ws.send('Hello Client');
}));
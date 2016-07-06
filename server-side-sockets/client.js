'use strict'

const net = require('net');

const client = new net.Socket();

client.connect({port: 6969, host: 'localhost'}, (() => {
  console.log('Connected to server');
}));

client.on('data', (data) => {
  console.log('data:', data.toString());
})
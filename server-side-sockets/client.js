'use strict';

// Import Node.js built-in 'net' module for TCP socket functionality
const net = require('net');

// Create a new TCP socket client
// This will connect to the TCP server running on localhost:6969
const client = new net.Socket();

// Connect to the TCP server
// The connection options specify the server's host and port
client.connect({ port: 6969, host: 'localhost' }, (() => {
  console.log('✅ Connected to TCP server');

  // Send a test message to the server after connecting
  client.write('Hello Server from TCP client!');
}));

// Event handler for when the client receives data from the server
client.on('data', (data) => {
  console.log('📥 Received from server:', data.toString());
});

// Event handler for when the connection is closed
client.on('close', () => {
  console.log('🔌 TCP connection closed');
});

// Event handler for TCP connection errors
client.on('error', (error) => {
  console.error('❌ TCP connection error:', error);
});

// Send additional test messages to demonstrate bidirectional communication
setTimeout(() => {
  if (client.writable) {
    console.log('📤 Sending: Test message 1');
    client.write('Test message 1');
  }
}, 2000);

setTimeout(() => {
  if (client.writable) {
    console.log('📤 Sending: Test message 2');
    client.write('Test message 2');
  }
}, 4000);

setTimeout(() => {
  if (client.writable) {
    console.log('📤 Sending: Goodbye');
    client.write('Goodbye');
    client.end(); // Close the connection gracefully
  }
}, 6000);
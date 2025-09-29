'use strict';

// Import Node.js built-in 'net' module for TCP socket functionality
// This provides low-level networking capabilities for custom protocols
const net = require('net');

// Create a TCP server that listens for incoming connections
// This is the lowest-level networking approach - raw TCP sockets
const server = net.createServer((socket) => {
  console.log('🔌 New TCP client connected');

  // Send a welcome message to the newly connected client
  // This demonstrates server-to-client communication over TCP
  socket.write('Hello Client - Welcome to the TCP server!');

  // Event handler for when the server receives data from a client
  socket.on('data', (data) => {
    console.log('📥 Received from client:', data.toString());

    // Echo the received data back to the client
    // This demonstrates bidirectional communication over TCP
    socket.write(`Echo: ${data.toString()}`);
  });

  // Event handler for when the client closes the connection
  socket.on('close', () => {
    console.log('🔌 TCP client disconnected');
  });

  // Event handler for TCP connection errors
  socket.on('error', (error) => {
    console.error('❌ TCP connection error:', error);
  });
});

// Start the server and listen on port 6969
// TCP servers bind to a specific port and wait for connections
server.listen('6969', () => {
  console.log('🚀 TCP server listening on port 6969');
  console.log('📋 Run "node client.js" to test the connection');
});
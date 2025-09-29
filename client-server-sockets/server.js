'use strict';

// Import the 'ws' library for WebSocket server functionality
// This is a popular Node.js WebSocket library that implements the WebSocket protocol
const WebSocketServer = require('ws').Server;

// Create a new WebSocket server that listens on port 8081
// WebSocket servers use the 'ws://' protocol instead of 'http://'
const wss = new WebSocketServer({ port: 8081 });

// Event handler for when a new client connects to the WebSocket server
wss.on('connection', ((ws) => {
  console.log('🔌 New WebSocket client connected');

  // Event handler for when the server receives a message from a client
  ws.on('message', (message) => {
    console.log(`📥 Received from client: ${message}`);

    // Echo the message back to the client (optional)
    // This demonstrates bidirectional communication
    ws.send(`Echo: ${message}`);
  });

  // Event handler for when the client closes the connection
  ws.on('close', () => {
    console.log('🔌 WebSocket client disconnected');
  });

  // Event handler for WebSocket errors
  ws.on('error', (error) => {
    console.error('❌ WebSocket error:', error);
  });

  // Send a welcome message to the newly connected client
  // This demonstrates server-to-client communication
  ws.send('Hello Client - Welcome to the WebSocket server!');

  console.log('🚀 WebSocket server running on ws://localhost:8081');
  console.log('📋 Run "node client.js" to test the connection');
}));
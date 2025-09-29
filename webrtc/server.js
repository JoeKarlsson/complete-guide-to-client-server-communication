'use strict';

// Import required modules
const express = require('express');  // For serving static files
const WebSocket = require('ws');     // For WebSocket signaling server

// Create Express app for serving the HTML page
const app = express();

// Serve static files from the current directory
// This allows the browser to access index.html
app.use(express.static(__dirname));

// Start the HTTP server on port 3000
const server = app.listen(3000, () => {
  console.log('🚀 WebRTC Demo Server running on http://localhost:3000');
  console.log('📋 Open two browser windows to test peer-to-peer connection');
});

// Create WebSocket server for signaling
// WebRTC requires a signaling server to exchange connection information
// This server forwards messages between peers but doesn't handle actual data
const wss = new WebSocket.Server({ port: 8080 });

console.log('🔌 WebRTC Signaling Server running on ws://localhost:8080');

// Handle new WebSocket connections for signaling
wss.on('connection', (ws) => {
  console.log('📡 New signaling client connected');
  
  // Handle incoming signaling messages
  ws.on('message', (message) => {
    try {
      // Parse the signaling message
      const data = JSON.parse(message);
      console.log(`📤 Signaling message: ${data.type}`);
      
      // Forward the message to all other connected clients
      // This allows peers to exchange offers, answers, and ICE candidates
      wss.clients.forEach(client => {
        if (client !== ws && client.readyState === WebSocket.OPEN) {
          client.send(message);
        }
      });
    } catch (error) {
      console.error('❌ Error parsing signaling message:', error);
    }
  });

  // Handle client disconnection
  ws.on('close', () => {
    console.log('📡 Signaling client disconnected');
  });

  // Handle WebSocket errors
  ws.on('error', (error) => {
    console.error('❌ WebSocket signaling error:', error);
  });
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down WebRTC demo server...');
  server.close(() => {
    wss.close(() => {
      console.log('✅ Server closed');
      process.exit(0);
    });
  });
});

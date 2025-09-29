'use strict';

// Import the 'ws' library for WebSocket client functionality
const WebSocket = require('ws');

console.log('🔌 Connecting to WebSocket server...');

// Create a new WebSocket connection to the server
// The URL uses 'ws://' protocol instead of 'http://'
const ws = new WebSocket('ws://localhost:8081');

// Event handler for when the WebSocket connection is successfully established
ws.on('open', function open() {
    console.log('✅ Connected to WebSocket server');
    console.log('📤 Sending message: Hello Server from Node.js client');

    // Send a message to the server immediately after connection
    ws.send('Hello Server from Node.js client');
});

// Event handler for when the client receives a message from the server
ws.on('message', function message(data) {
    console.log('📥 Received:', data.toString());
});

// Event handler for WebSocket connection errors
ws.on('error', function error(err) {
    console.error('❌ WebSocket error:', err.message);
});

// Event handler for when the WebSocket connection is closed
ws.on('close', function close() {
    console.log('🔌 Connection closed');
    process.exit(0); // Exit the Node.js process
});

// Send additional test messages to demonstrate bidirectional communication
// These messages are sent after delays to show the real-time nature of WebSockets

setTimeout(() => {
    if (ws.readyState === WebSocket.OPEN) {
        console.log('📤 Sending: Test message 1');
        ws.send('Test message 1');
    }
}, 2000);

setTimeout(() => {
    if (ws.readyState === WebSocket.OPEN) {
        console.log('📤 Sending: Test message 2');
        ws.send('Test message 2');
    }
}, 4000);

setTimeout(() => {
    if (ws.readyState === WebSocket.OPEN) {
        console.log('📤 Sending: Goodbye');
        ws.send('Goodbye');
        ws.close(); // Close the connection gracefully
    }
}, 6000);

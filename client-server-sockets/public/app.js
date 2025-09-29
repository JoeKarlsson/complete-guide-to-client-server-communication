'use strict';

console.log('WebSocket client starting...');

// Create a new WebSocket connection to the server
// The URL uses 'ws://' protocol instead of 'http://'
const ws = new WebSocket("ws://127.0.0.1:8081");

// Get references to DOM elements for updating the UI
const statusEl = document.getElementById('status');
const statusTextEl = document.getElementById('statusText');
const messagesEl = document.getElementById('messages');
const messageInput = document.getElementById('messageInput');
const sendButton = document.getElementById('sendButton');

let messageCount = 0;

// Function to add a message to the UI with proper styling
function addMessage(content, type) {
  messageCount++;
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${type}`;
  messageDiv.innerHTML = `<strong>${type === 'sent' ? 'Sent' : 'Received'} ${messageCount}:</strong> ${content}`;
  messagesEl.appendChild(messageDiv);

  // Scroll to the bottom to show the latest message
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

// Function to update the connection status in the UI
function updateStatus(text, isConnected) {
  statusTextEl.textContent = text;
  statusEl.className = `status ${isConnected ? 'connected' : 'disconnected'}`;
}

// Event handler for when the WebSocket connection is successfully established
ws.onopen = function (event) {
  console.log('Connection is open ...');
  updateStatus('Connected', true);

  // Enable the input field and send button now that we're connected
  messageInput.disabled = false;
  sendButton.disabled = false;
  messageInput.focus(); // Focus the input field for immediate typing
};

// Event handler for WebSocket connection errors
ws.onerror = function (err) {
  console.log('WebSocket error:', err);
  updateStatus('Connection Error', false);
};

// Event handler for when the client receives a message from the server
ws.onmessage = function (event) {
  console.log('Received:', event.data);
  addMessage(event.data, 'received');
};

// Event handler for when the WebSocket connection is closed
ws.onclose = function () {
  console.log("Connection is closed...");
  updateStatus('Disconnected', false);

  // Disable the input field and send button when disconnected
  messageInput.disabled = true;
  sendButton.disabled = true;
};

// Function to send a message to the server
function sendMessage() {
  const message = messageInput.value.trim();

  // Only send if there's a message and the connection is open
  if (message && ws.readyState === WebSocket.OPEN) {
    ws.send(message);
    addMessage(message, 'sent');
    messageInput.value = ''; // Clear the input field
  }
}

// Set up event listeners for the send button and Enter key
sendButton.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Clean up: Close the WebSocket connection when the page is about to unload
// This prevents memory leaks and unnecessary server connections
window.addEventListener('beforeunload', function () {
  ws.close();
});
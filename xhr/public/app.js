'use strict';

// Track the number of requests made for display purposes
let requestCount = 0;

// Function called when an XMLHttpRequest successfully completes
// 'this' refers to the XMLHttpRequest object that triggered the event
function reqListener() {
  // Increment the request counter
  requestCount++;

  // Get references to DOM elements for updating the UI
  const statusEl = document.getElementById('status');
  const responsesEl = document.getElementById('responses');

  // Update the status display to show connection is working
  statusEl.textContent = `Connected - ${requestCount} requests completed`;
  statusEl.style.color = '#4caf50'; // Green color for success

  // Add the server response to the responses container
  // Each response is displayed in a styled div
  responsesEl.innerHTML += `<div style="margin: 5px 0; padding: 5px; background: #f0f0f0; border-radius: 3px;">${this.responseText}</div>`;
}

// Function called when an XMLHttpRequest fails (network error, timeout, etc.)
function handleError() {
  const statusEl = document.getElementById('status');
  statusEl.textContent = 'Connection Error';
  statusEl.style.color = '#f44336'; // Red color for error
}

// Initialize the status when the page loads
document.addEventListener('DOMContentLoaded', function () {
  const statusEl = document.getElementById('status');
  statusEl.textContent = 'Starting requests...';
});

// Set up a repeating timer to make requests every 3 seconds
// This demonstrates the "polling" pattern - repeatedly asking the server for updates
setInterval(function () {
  // Create a new XMLHttpRequest object for each request
  const oReq = new XMLHttpRequest();

  // Set up event listeners for different outcomes
  oReq.addEventListener("load", reqListener);      // Success
  oReq.addEventListener("error", handleError);     // Network error
  oReq.addEventListener("timeout", handleError);   // Request timeout

  // Set a 5-second timeout to prevent hanging requests
  oReq.timeout = 5000;

  // Configure the request: GET method to the /api endpoint
  oReq.open("GET", "/api");

  // Send the request to the server
  oReq.send();
}, 3000); // Repeat every 3000 milliseconds (3 seconds)
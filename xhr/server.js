'use strict';

// Import Express.js framework for creating HTTP servers
const express = require('express');

// Create an Express application instance
const app = express();

// Serve static files (HTML, CSS, JS) from the 'public' directory
// This allows the browser to access files like index.html and app.js
app.use(express.static(`${__dirname}/public`));

// Define a GET endpoint at '/api' that returns the current server time
// This is the endpoint that the client will request periodically
app.get('/api', function (req, res) {
  // Send the current server time as a response
  // toLocaleTimeString() formats the time in a readable format
  res.send((new Date()).toLocaleTimeString());
});

// Start the server and listen on port 3000
// The server will be accessible at http://localhost:3000
app.listen(3000, () => {
  console.log('🚀 XHR Server running on http://localhost:3000');
  console.log('📋 Open http://localhost:3000 in your browser to see the demo');
});
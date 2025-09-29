'use strict';

// Import Node.js built-in modules
const http = require('http');  // For creating HTTP servers
const fs = require('fs');      // For reading files from the filesystem

// Create an HTTP server that handles incoming requests
http.createServer((req, res) => {
  // Log request details for debugging purposes
  debugHeaders(req);

  // Check if the client is requesting Server-Sent Events
  // The 'Accept' header tells us what content types the client can handle
  if (req.headers.accept && req.headers.accept == 'text/event-stream') {
    // If the URL is '/events', start the SSE stream
    if (req.url == '/events') {
      sendSSE(req, res);
    } else {
      // Return 404 for other SSE requests
      res.writeHead(404);
      res.end();
    }
  } else {
    // For regular HTTP requests (like loading the HTML page)
    res.writeHead(200, { 'Content-Type': 'text/html' });
    // Read and serve the index.html file
    res.write(fs.readFileSync(__dirname + '/index.html'));
    res.end();
  }
}).listen(8000, () => {
  console.log('🚀 SSE Server running on http://localhost:8000');
  console.log('📋 Open http://localhost:8000 in your browser to see the demo');
});

// Function to handle Server-Sent Events streaming
const sendSSE = (req, res) => {
  // Set the required headers for Server-Sent Events
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',  // Tells browser this is an SSE stream
    'Cache-Control': 'no-cache',          // Prevents caching of the stream
    'Connection': 'keep-alive'            // Keeps the connection open
  });

  // Create a unique ID for this connection (using current time)
  const id = (new Date()).toLocaleTimeString();

  // Set up a repeating timer to send data every 5 seconds
  // This simulates real-time data updates from the server
  setInterval(() => {
    // Send a new message with the current time
    constructSSE(res, id, (new Date()).toLocaleTimeString());
  }, 5000);

  // Send the first message immediately when connection is established
  constructSSE(res, id, (new Date()).toLocaleTimeString());

  // Note: We don't call res.end() because we want to keep the connection open
  // for continuous streaming
}

// Function to format and send SSE messages
const constructSSE = (res, id, data) => {
  // SSE message format requires specific structure:
  // - Each message must end with \n\n
  // - 'id:' field helps with reconnection
  // - 'data:' field contains the actual message content
  res.write('id: ' + id + '\n');
  res.write("data: " + data + '\n\n');
}

// Function to log request headers for debugging
const debugHeaders = (req) => {
  console.log('URL: ' + req.url);
  // Loop through all request headers and log them
  for (let key in req.headers) {
    console.log(key + ': ' + req.headers[key]);
  }
  console.log('\n');
}

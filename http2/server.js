'use strict';

// Import Node.js built-in modules
const http2 = require('http2');  // Native HTTP/2 implementation
const fs = require('fs');       // For reading SSL certificate files

// Check if SSL certificates exist before starting the server
// HTTP/2 requires HTTPS in browsers, so we need SSL certificates
if (!fs.existsSync(__dirname + '/server.key') || !fs.existsSync(__dirname + '/server.crt')) {
  console.error('❌ SSL certificates not found!');
  console.log('Please run: npm run generate-certs');
  process.exit(1);
}

// Load SSL certificate files for HTTPS
const options = {
  key: fs.readFileSync(__dirname + '/server.key'),   // Private key
  cert: fs.readFileSync(__dirname + '/server.crt')   // Certificate
};

// Create an HTTP/2 secure server (HTTPS)
// HTTP/2 provides multiplexing, header compression, and other performance improvements
const server = http2.createSecureServer(options, (req, res) => {
  console.log(`📥 Request: ${req.method} ${req.url}`);

  // Handle the main page request
  if (req.url === '/') {
    // Send the main HTML response with interactive demo
    res.writeHead(200, {
      'content-type': 'text/html; charset=utf-8'
    });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>HTTP/2 Demo</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
            .container { background: #f5f5f5; padding: 20px; border-radius: 8px; }
            .success { color: #4caf50; font-weight: bold; }
            .info { background: #e3f2fd; padding: 10px; border-radius: 4px; margin: 10px 0; }
            .feature { margin: 10px 0; padding: 10px; background: #f0f0f0; border-radius: 4px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 HTTP/2 Demo</h1>
            <p class="success">✅ This page was loaded with HTTP/2!</p>
            <div class="info">
              <strong>HTTP/2 Features Demonstrated:</strong>
            </div>
            <div class="feature">
              <strong>1. Binary Framing:</strong> HTTP/2 uses binary protocol instead of text
            </div>
            <div class="feature">
              <strong>2. Multiplexing:</strong> Multiple requests over single connection
            </div>
            <div class="feature">
              <strong>3. Header Compression:</strong> HPACK compression reduces overhead
            </div>
            <div class="feature">
              <strong>4. Stream Prioritization:</strong> Requests can be prioritized
            </div>
            <p>Check the Network tab in DevTools to see HTTP/2 in action!</p>
            <button onclick="loadResources()">Load Multiple Resources</button>
            <div id="results"></div>
          </div>
          <script>
            function loadResources() {
              const results = document.getElementById('results');
              results.innerHTML = '<p>Loading multiple resources...</p>';
              
              // Load multiple resources to demonstrate HTTP/2 multiplexing
              // All these requests will be sent over the same connection simultaneously
              Promise.all([
                fetch('/api/data1'),
                fetch('/api/data2'),
                fetch('/api/data3'),
                fetch('/api/data4')
              ]).then(responses => {
                return Promise.all(responses.map(r => r.text()));
              }).then(data => {
                results.innerHTML = '<p>✅ All resources loaded successfully!</p>' +
                  '<ul>' + data.map((d, i) => '<li>Resource ' + (i+1) + ': ' + d + '</li>').join('') + '</ul>';
              }).catch(err => {
                results.innerHTML = '<p>❌ Error: ' + err.message + '</p>';
              });
            }
          </script>
        </body>
      </html>
    `);
  } else if (req.url.startsWith('/api/data')) {
    // Handle API endpoint requests
    // These simulate different resources that can be loaded simultaneously
    const resourceNum = req.url.split('data')[1];

    res.writeHead(200, {
      'content-type': 'application/json',
      'cache-control': 'public, max-age=3600'  // Cache for 1 hour
    });

    // Return JSON data with resource information
    res.end(JSON.stringify({
      resource: resourceNum,
      timestamp: new Date().toISOString(),
      message: \`This is data from resource \${resourceNum}\`,
      protocol: 'HTTP/2'
    }));
  } else {
    // Return 404 for unknown routes
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the HTTP/2 server on port 3000
server.listen(3000, () => {
  console.log('🚀 HTTP/2 server running on https://localhost:3000');
  console.log('📋 Make sure to accept the self-signed certificate in your browser');
});

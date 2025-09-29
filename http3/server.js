'use strict';

// Import Node.js built-in modules
const http2 = require('http2');  // We'll use HTTP/2 to demonstrate HTTP/3 concepts
const fs = require('fs');       // For reading SSL certificate files

// Check if SSL certificates exist before starting the server
// HTTP/3 requires SSL certificates for security
if (!fs.existsSync(__dirname + '/server.key') || !fs.existsSync(__dirname + '/server.crt')) {
    console.error('❌ SSL certificates not found!');
    console.log('Please run: npm run generate-certs');
    process.exit(1);
}

// Load SSL certificate files
// Note: This example uses HTTP/2 to demonstrate HTTP/3 concepts
// Real HTTP/3 would use QUIC protocol over UDP
const options = {
    key: fs.readFileSync(__dirname + '/server.key'),   // Private key
    cert: fs.readFileSync(__dirname + '/server.crt')   // Certificate
};

// Create an HTTP/2 server to demonstrate HTTP/3 concepts
// In a real HTTP/3 implementation, this would use QUIC over UDP
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
          <title>HTTP/3 Concepts Demo</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 900px; margin: 50px auto; padding: 20px; }
            .container { background: #f5f5f5; padding: 30px; border-radius: 10px; }
            .success { color: #4caf50; font-weight: bold; font-size: 18px; }
            .info { background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .feature { margin: 10px 0; padding: 15px; background: #f0f0f0; border-radius: 6px; }
            .comparison { background: #fff3e0; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .performance { background: #e8f5e8; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .note { background: #ffebee; padding: 15px; border-radius: 8px; margin: 15px 0; }
            button { background: #2196f3; color: white; border: none; padding: 12px 24px; border-radius: 6px; cursor: pointer; margin: 5px; font-size: 14px; }
            button:hover { background: #1976d2; }
            .results { margin: 20px 0; padding: 15px; background: #fafafa; border-radius: 6px; }
            table { width: 100%; border-collapse: collapse; margin: 15px 0; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 HTTP/3 Concepts Demo</h1>
            <p class="success">✅ This demonstrates HTTP/3 concepts using HTTP/2</p>
            
            <div class="note">
              <h3>📝 Important Note</h3>
              <p>This demo uses <strong>HTTP/2</strong> to illustrate HTTP/3 concepts. Real HTTP/3 uses QUIC protocol over UDP, 
              which requires specialized server implementations. This example shows the key differences and benefits of HTTP/3.</p>
            </div>
            
            <div class="info">
              <h3>What is HTTP/3?</h3>
              <p>HTTP/3 is the latest HTTP protocol, built on <strong>QUIC</strong> (Quick UDP Internet Connections). 
              It provides faster, more secure, and more reliable web communication compared to HTTP/2.</p>
            </div>

            <div class="feature">
              <h4>🔑 Key HTTP/3 Features:</h4>
              <ul>
                <li><strong>QUIC Protocol:</strong> Runs over UDP instead of TCP</li>
                <li><strong>Built-in Encryption:</strong> Security is part of the protocol</li>
                <li><strong>0-RTT Connection:</strong> Faster setup for repeat visitors</li>
                <li><strong>No Head-of-Line Blocking:</strong> Lost packets don't block other streams</li>
                <li><strong>Connection Migration:</strong> Survives network changes</li>
                <li><strong>Better Mobile Performance:</strong> Handles network switching gracefully</li>
              </ul>
            </div>

            <div class="comparison">
              <h4>📊 HTTP Protocol Evolution</h4>
              <table>
                <tr><th>Feature</th><th>HTTP/1.1</th><th>HTTP/2</th><th>HTTP/3</th></tr>
                <tr><td>Transport</td><td>TCP</td><td>TCP</td><td>QUIC (UDP)</td></tr>
                <tr><td>Encryption</td><td>Optional</td><td>Optional</td><td>Built-in</td></tr>
                <tr><td>Multiplexing</td><td>No</td><td>Yes</td><td>Yes</td></tr>
                <tr><td>Head-of-Line Blocking</td><td>Yes</td><td>Yes (TCP level)</td><td>No</td></tr>
                <tr><td>Connection Setup</td><td>3 RTT</td><td>2 RTT</td><td>0-1 RTT</td></tr>
                <tr><td>Mobile Performance</td><td>Poor</td><td>Better</td><td>Excellent</td></tr>
                <tr><td>Network Resilience</td><td>Poor</td><td>Medium</td><td>Excellent</td></tr>
              </table>
            </div>

            <div class="performance">
              <h4>⚡ Performance Test</h4>
              <p>Click the button below to test multiplexing capabilities (similar to HTTP/3):</p>
              <button onclick="testPerformance()">Test Multiplexing Performance</button>
              <div id="results" class="results" style="display: none;"></div>
            </div>

            <div class="info">
              <h4>🔍 How to Verify Real HTTP/3</h4>
              <ol>
                <li>Visit a site that supports HTTP/3 (like <a href="https://cloudflare.com" target="_blank">Cloudflare</a>)</li>
                <li>Open Chrome DevTools (F12)</li>
                <li>Go to the <strong>Network</strong> tab</li>
                <li>Refresh the page</li>
                <li>Look for <strong>"h3"</strong> in the Protocol column</li>
                <li>If you see "h3", you're using HTTP/3!</li>
              </ol>
            </div>

            <div class="feature">
              <h4>🌐 Browser Support</h4>
              <p>HTTP/3 is supported in:</p>
              <ul>
                <li>Chrome 88+ (2021)</li>
                <li>Firefox 88+ (2021)</li>
                <li>Safari 15+ (2021)</li>
                <li>Edge 88+ (2021)</li>
              </ul>
            </div>

            <div class="note">
              <h4>🚧 Implementation Challenges</h4>
              <p>HTTP/3 implementation requires:</p>
              <ul>
                <li>QUIC protocol support</li>
                <li>UDP-based transport</li>
                <li>Specialized server software</li>
                <li>Network infrastructure compatibility</li>
              </ul>
              <p>This is why many sites still use HTTP/2, though HTTP/3 adoption is growing rapidly.</p>
            </div>
          </div>
          
          <script>
            // Test multiplexing performance (demonstrating HTTP/3 concepts)
            async function testPerformance() {
              const resultsDiv = document.getElementById('results');
              resultsDiv.style.display = 'block';
              resultsDiv.innerHTML = '<p>🔄 Testing multiplexing performance...</p>';
              
              const startTime = performance.now();
              
              try {
                // Load multiple resources simultaneously to test multiplexing
                // This demonstrates the efficiency that HTTP/3 provides
                const responses = await Promise.all([
                  fetch('/api/data1'),
                  fetch('/api/data2'),
                  fetch('/api/data3'),
                  fetch('/api/data4'),
                  fetch('/api/data5'),
                  fetch('/api/data6')
                ]);
                
                const endTime = performance.now();
                const duration = Math.round(endTime - startTime);
                
                // Parse all responses
                const data = await Promise.all(responses.map(r => r.text()));
                
                resultsDiv.innerHTML = \`
                  <h4>✅ Multiplexing Performance Test Results</h4>
                  <p><strong>Total Time:</strong> \${duration}ms</p>
                  <p><strong>Resources Loaded:</strong> \${responses.length}</p>
                  <p><strong>Average per Resource:</strong> \${Math.round(duration / responses.length)}ms</p>
                  <h5>Loaded Resources:</h5>
                  <ul>
                    \${data.map((d, i) => \`<li>Resource \${i + 1}: \${JSON.parse(d).message}</li>\`).join('')}
                  </ul>
                  <p><em>HTTP/3 would provide even better performance with QUIC's improved multiplexing!</em></p>
                \`;
              } catch (error) {
                resultsDiv.innerHTML = \`<p>❌ Error: \${error.message}</p>\`;
              }
            }
            
            // Display connection information
            document.addEventListener('DOMContentLoaded', function() {
              console.log('HTTP/3 Concepts Demo loaded');
              console.log('This demo shows HTTP/3 concepts using HTTP/2');
            });
          </script>
        </body>
      </html>
    `);
    } else if (req.url.startsWith('/api/data')) {
        // Handle API endpoint requests
        // These simulate different resources that can be loaded simultaneously
        const resourceNum = req.url.split('data')[1];

        // Simulate some processing time to demonstrate multiplexing
        const delay = Math.random() * 100; // Random delay 0-100ms

        setTimeout(() => {
            res.writeHead(200, {
                'content-type': 'application/json',
                'cache-control': 'public, max-age=3600'  // Cache for 1 hour
            });

            // Return JSON data with resource information
            res.end(JSON.stringify({
                resource: resourceNum,
                timestamp: new Date().toISOString(),
                message: `This is data from resource ${resourceNum} (HTTP/3 concepts demo)`,
        protocol: 'HTTP/2 (demonstrating HTTP/3 concepts)',
        delay: Math.round(delay) + 'ms',
        note: 'Real HTTP/3 would use QUIC over UDP for better performance'
      }));
    }, delay);
  } else {
    // Return 404 for unknown routes
    res.writeHead(404);
    res.end('Not Found');
  }
});

// Start the server on port 3000
server.listen(3000, () => {
  console.log('🚀 HTTP/3 Concepts Demo running on https://localhost:3000');
  console.log('📋 Make sure to accept the self-signed certificate in your browser');
  console.log('📝 Note: This demo uses HTTP/2 to illustrate HTTP/3 concepts');
  console.log('⚡ Real HTTP/3 would use QUIC protocol over UDP for better performance!');
});

// Handle server shutdown gracefully
process.on('SIGINT', () => {
  console.log('\n🛑 Shutting down HTTP/3 concepts demo...');
  server.close(() => {
    console.log('✅ Server closed');
    process.exit(0);
  });
});
# HTTP/2 Example

HTTP/2 is the second major version of the HTTP protocol, designed to improve performance and efficiency. It introduces features like multiplexing, server push, header compression, and binary framing while maintaining compatibility with HTTP/1.1 semantics.

## 🎯 What This Example Demonstrates

This example shows how to:

- Set up an HTTP/2 server using Node.js native `http2` module
- Demonstrate HTTP/2 multiplexing with multiple concurrent requests
- Show binary framing and header compression benefits
- Use modern HTTP/2 features without deprecated dependencies

## 🚀 How to Run

**Note**: This example requires SSL certificates. The current setup uses self-signed certificates.

1. **Generate SSL certificates** (if not already present):

   ```bash
   # Generate private key
   openssl genrsa -out server.key 2048
   
   # Generate certificate
   openssl req -new -x509 -key server.key -out server.crt -days 365
   ```

2. **Start the HTTP/2 server**:

   ```bash
   node server.js
   ```

3. **Open your browser** and navigate to:

   ```
   https://localhost:3000
   ```

   (Accept the self-signed certificate warning)

4. **Watch the magic**: Click "Load Multiple Resources" to see HTTP/2 multiplexing in action!

## 📝 Code Explanation

### Server Side (`server.js`)

```javascript
const spdy = require('spdy');
const fs = require('fs');

const options = {
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.crt')
};

spdy.createServer(options, (req, res) => {
    let stream = res
      .push('/main.js', {
        request: {
          accept: '*/*'
        },
        response: {
          'content-type': 'application/javascript'
        }
      })
      .end('console.log("Hello World");');

    res.writeHead(200);
    res.end('<script src="/main.js"></script>');
}).listen(3000);
```

**Key Points**:

- Uses Node.js native `http2` module (no external dependencies)
- Requires SSL certificates for browser compatibility
- Demonstrates multiplexing with multiple API endpoints
- Serves interactive HTML with JavaScript to test concurrent requests

### Multiplexing Demonstration

```javascript
// Multiple API endpoints to demonstrate multiplexing
if (req.url.startsWith('/api/data')) {
  const resourceNum = req.url.split('data')[1];
  res.writeHead(200, {
    'content-type': 'application/json',
    'cache-control': 'public, max-age=3600'
  });
  res.end(JSON.stringify({
    resource: resourceNum,
    timestamp: new Date().toISOString(),
    message: `This is data from resource ${resourceNum}`,
    protocol: 'HTTP/2'
  }));
}
```

**What happens**:

1. Client loads the main page with HTTP/2
2. JavaScript makes 4 concurrent requests to different API endpoints
3. HTTP/2 multiplexes all requests over a single connection
4. All responses arrive efficiently without blocking each other
5. This demonstrates the performance benefits of HTTP/2 over HTTP/1.1

## 🔍 Key Concepts

### HTTP/2 vs HTTP/1.1

| Feature | HTTP/1.1 | HTTP/2 |
|---------|----------|--------|
| **Multiplexing** | ❌ | ✅ |
| **Server Push** | ❌ | ✅ |
| **Header Compression** | ❌ | ✅ (HPACK) |
| **Binary Framing** | ❌ | ✅ |
| **Stream Prioritization** | ❌ | ✅ |
| **Connection Reuse** | Limited | Excellent |

### HTTP/2 Features

#### 1. Multiplexing

- Multiple requests/responses over single connection
- Eliminates head-of-line blocking
- Better resource utilization

#### 2. Server Push

- Server can send resources before client requests them
- Reduces round-trip time
- Improves perceived performance

#### 3. Header Compression (HPACK)

- Compresses HTTP headers
- Reduces overhead significantly
- Maintains state between requests

#### 4. Binary Framing

- Binary protocol instead of text
- More efficient parsing
- Better error handling

#### 5. Stream Prioritization

- Client can prioritize requests
- Server can allocate resources accordingly
- Better user experience

## ⚡ When to Use HTTP/2

### ✅ Perfect For

- **Modern web applications**: Better performance than HTTP/1.1
- **Mobile applications**: Reduced latency and better battery life
- **API services**: Multiplexing improves efficiency
- **Content delivery**: Server push optimizes resource loading
- **Real-time applications**: Lower latency for better responsiveness

### ❌ Considerations

- **Legacy systems**: May not support HTTP/2
- **Proxy compatibility**: Some proxies don't support HTTP/2
- **TLS requirement**: Browsers require HTTPS for HTTP/2
- **Complexity**: More complex than HTTP/1.1

## 🛠️ Advanced Features

### Stream Prioritization

```javascript
// Client-side prioritization
fetch('/api/data', {
  priority: 'high'
});

fetch('/api/stats', {
  priority: 'low'
});
```

### Server Push with Conditions

```javascript
spdy.createServer(options, (req, res) => {
  // Only push if client doesn't have the resource
  if (req.headers['cache-control'] !== 'no-cache') {
    res.push('/main.js', {
      request: { accept: '*/*' },
      response: { 'content-type': 'application/javascript' }
    }).end('console.log("Hello World");');
  }
  
  res.writeHead(200);
  res.end('<script src="/main.js"></script>');
});
```

### HTTP/2 with Express

```javascript
const express = require('express');
const spdy = require('spdy');

const app = express();

app.get('/', (req, res) => {
  // Server push with Express
  res.push('/style.css', {
    request: { accept: 'text/css' },
    response: { 'content-type': 'text/css' }
  }).end('body { background: blue; }');
  
  res.send('<link rel="stylesheet" href="/style.css">');
});

spdy.createServer(options, app).listen(3000);
```

## 🔧 Production Considerations

### Server Configuration

- **TLS/SSL**: Required for browser compatibility
- **Certificate management**: Use Let's Encrypt or proper certificates
- **Load balancing**: Ensure load balancers support HTTP/2
- **Monitoring**: Track HTTP/2 specific metrics

### Client Considerations

- **Browser support**: All modern browsers support HTTP/2
- **Fallback**: Implement HTTP/1.1 fallback for older clients
- **Testing**: Test with different browsers and network conditions
- **Performance**: Measure actual performance improvements

### Security

- **TLS requirements**: HTTP/2 requires HTTPS in browsers
- **Certificate validation**: Proper certificate chain validation
- **Security headers**: Implement security headers
- **Rate limiting**: Consider HTTP/2 specific rate limiting

## 📚 Learning Resources

### Documentation

- [HTTP/2 Specification (RFC 7540)](https://tools.ietf.org/html/rfc7540)
- [Node.js HTTP/2 Module](https://nodejs.org/api/http2.html)
- [Node.js HTTP/2 Server Push](https://nodejs.org/api/http2.html#http2_response_pushstream_headers_options_callback)

### Tutorials

- [HTTP/2 Guide](https://http2.github.io/)
- [Node.js HTTP/2 Tutorial](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
- [Server Push Best Practices](https://developers.google.com/web/fundamentals/performance/http2/)

### Tools

- [HTTP/2 Test](https://http2.pro/)
- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/)
- [nghttp2](https://nghttp2.org/) - HTTP/2 implementation

## 🔗 Navigation

- **Previous**: [Raw TCP Sockets](../server-side-sockets/) - Low-level networking
- **Next**: [Main Guide](../README.md) - Back to overview
- **Related**:
  - [XMLHttpRequest](../xhr/) - HTTP/1.1 requests
  - [Server-Sent Events](../server-side-events/) - HTTP-based streaming
  - [WebSockets](../client-server-sockets/) - Alternative real-time protocol

## 🐛 Troubleshooting

### Common Issues

1. **TLS errors**: Ensure proper SSL certificates
2. **Browser compatibility**: Check browser HTTP/2 support
3. **Proxy issues**: Some proxies don't support HTTP/2
4. **Performance**: Measure actual improvements

### Debug Tips

- Use Chrome DevTools to inspect HTTP/2 frames
- Check server logs for HTTP/2 specific errors
- Test with different browsers and network conditions
- Monitor connection multiplexing and server push

---

**Congratulations!** You've explored all the major client-server communication protocols. Check out the [main guide](../README.md) for a complete overview!

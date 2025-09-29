# Raw TCP Sockets Example

Raw TCP sockets provide the lowest-level networking interface, giving you complete control over the communication protocol. This example demonstrates server-to-server communication using Node.js's built-in `net` module.

## 🎯 What This Example Demonstrates

This example shows how to:

- Create a TCP server using Node.js `net` module
- Connect to a TCP server from a client
- Send and receive raw data over TCP
- Handle connection events and data streams
- Implement custom protocol communication

## 🚀 How to Run

1. **Start the TCP server**:

   ```bash
   node server.js
   ```

   Server will start listening on port 6969

2. **In a new terminal, start the client**:

   ```bash
   node client.js
   ```

3. **Watch the magic**: The client will connect to the server and exchange messages!

## 📝 Code Explanation

### Server Side (`server.js`)

```javascript
const net = require('net');

const server = net.createServer((socket) => {
  console.log('socket connect made');
  socket.write('Hello Client')

  socket.on('data', (data) => {
    console.log('data: ', data.toString());
  })
})

server.listen('6969', () => {
  console.log('Server listening on port 6969')
})
```

**Key Points**:

- Creates a TCP server using `net.createServer()`
- Handles new client connections
- Sends a greeting message to new clients
- Listens for incoming data and logs it
- Server listens on port 6969

### Client Side (`client.js`)

```javascript
const net = require('net');

const client = new net.Socket();

client.connect({port: 6969, host: 'localhost'}, (() => {
  console.log('Connected to server');
}));

client.on('data', (data) => {
  console.log('data:', data.toString());
})
```

**Key Points**:

- Creates a TCP client using `net.Socket()`
- Connects to the server on localhost:6969
- Handles incoming data from the server
- Logs connection and data events

## 🔍 Key Concepts

### TCP vs Higher-Level Protocols

| Feature | Raw TCP | HTTP | WebSocket |
|---------|---------|------|-----------|
| **Protocol** | TCP | HTTP over TCP | WebSocket over TCP |
| **Overhead** | Minimal | High | Medium |
| **Control** | Complete | Limited | High |
| **Complexity** | High | Low | Medium |
| **Custom framing** | ✅ | ❌ | ✅ |
| **Browser support** | ❌ | ✅ | ✅ |

### TCP Connection Lifecycle

1. **Server**: Binds to port and listens for connections
2. **Client**: Initiates connection to server
3. **Handshake**: TCP three-way handshake
4. **Data Exchange**: Bidirectional data flow
5. **Connection Close**: Graceful or abrupt termination

### Data Handling

- **Raw bytes**: TCP sends raw byte streams
- **Framing**: You must implement your own message framing
- **Buffering**: Data may arrive in chunks
- **Encoding**: Handle text encoding (UTF-8, ASCII, etc.)

## ⚡ When to Use Raw TCP Sockets

### ✅ Perfect For

- **Custom protocols**: Implement your own communication protocol
- **IoT devices**: Communicate with embedded systems
- **High-performance**: Minimal overhead for maximum speed
- **Binary protocols**: Efficient binary data exchange
- **Server-to-server**: Backend service communication
- **Legacy systems**: Connect to existing TCP-based systems

### ❌ Not Ideal For

- **Web applications**: Use HTTP or WebSocket instead
- **Browser clients**: TCP sockets don't work in browsers
- **Simple APIs**: HTTP is easier for REST APIs
- **Cross-platform**: May have platform-specific issues

## 🛠️ Advanced Features

### Custom Protocol Implementation

```javascript
// Server with custom protocol
const server = net.createServer((socket) => {
  let buffer = '';
  
  socket.on('data', (data) => {
    buffer += data.toString();
    
    // Process complete messages (ending with \n)
    const lines = buffer.split('\n');
    buffer = lines.pop(); // Keep incomplete line in buffer
    
    lines.forEach(line => {
      if (line.trim()) {
        console.log('Received message:', line);
        socket.write(`Echo: ${line}\n`);
      }
    });
  });
});
```

### Connection Pooling

```javascript
class ConnectionPool {
  constructor(maxConnections = 10) {
    this.connections = [];
    this.maxConnections = maxConnections;
  }
  
  createConnection(port, host) {
    return new Promise((resolve, reject) => {
      const socket = new net.Socket();
      
      socket.connect({port, host}, () => {
        this.connections.push(socket);
        resolve(socket);
      });
      
      socket.on('error', reject);
    });
  }
}
```

### Heartbeat/Keep-Alive

```javascript
const server = net.createServer((socket) => {
  const heartbeat = setInterval(() => {
    if (socket.writable) {
      socket.write('PING\n');
    }
  }, 30000);
  
  socket.on('data', (data) => {
    if (data.toString().trim() === 'PONG') {
      console.log('Received heartbeat response');
    }
  });
  
  socket.on('close', () => {
    clearInterval(heartbeat);
  });
});
```

## 🔧 Production Considerations

### Server-Side

- **Connection limits**: Monitor and limit concurrent connections
- **Memory management**: Clean up closed connections
- **Error handling**: Graceful error recovery
- **Logging**: Comprehensive connection and data logging

### Client-Side

- **Reconnection**: Implement automatic reconnection logic
- **Error handling**: Handle network failures gracefully
- **Timeout**: Set appropriate connection and data timeouts
- **Resource cleanup**: Properly close connections

### Security

- **Authentication**: Implement connection-level authentication
- **Rate limiting**: Prevent connection abuse
- **Input validation**: Sanitize all incoming data
- **Encryption**: Use TLS for secure communication

## 📚 Learning Resources

### Documentation

- [Node.js net module](https://nodejs.org/api/net.html)
- [TCP/IP Protocol Suite](https://tools.ietf.org/html/rfc793)
- [Socket Programming Guide](https://beej.us/guide/bgnet/)

### Tutorials

- [Node.js TCP Server Tutorial](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)
- [Network Programming with Node.js](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction/)

### Books

- "Unix Network Programming" by W. Richard Stevens
- "TCP/IP Illustrated" by W. Richard Stevens
- "Network Programming with Node.js" by Pedro Teixeira

## 🔗 Navigation

- **Previous**: [WebSockets](../client-server-sockets/) - Web-based bidirectional communication
- **Next**: [HTTP/2](../http2/) - Modern HTTP with multiplexing
- **Related**:
  - [XMLHttpRequest](../xhr/) - HTTP-based client communication
  - [Server-Sent Events](../server-side-events/) - HTTP-based server streaming

## 🐛 Troubleshooting

### Common Issues

1. **Connection refused**: Check if server is running and port is available
2. **Port already in use**: Change port or kill existing process
3. **Data corruption**: Implement proper message framing
4. **Connection drops**: Implement heartbeat and reconnection logic

### Debug Tips

- Use `netstat` to check port availability
- Monitor connection state and data flow
- Implement comprehensive logging
- Test with different network conditions

---

**Ready for modern HTTP?** Check out [HTTP/2](../http2/) next!

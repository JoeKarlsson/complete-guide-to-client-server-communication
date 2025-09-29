# WebSockets Example

WebSockets provide full-duplex communication between client and server over a single TCP connection. Unlike HTTP-based protocols, WebSockets allow both client and server to send messages at any time, making them ideal for real-time interactive applications.

## 🎯 What This Example Demonstrates

This example shows how to:

- Establish a WebSocket connection between client and server
- Send messages from client to server
- Send messages from server to client
- Handle connection events (open, close, error)
- Implement bidirectional real-time communication

## 🚀 How to Run

### WebSocket Server (Node.js)

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the WebSocket server**:

   ```bash
   node server.js
   ```

   Server will start on `ws://localhost:8081`

3. **Open the client**:

   ```bash
   node client.js
   ```

### Browser Client

1. **Start the WebSocket server** (same as above)

2. **Open `public/index.html`** in your browser or serve it:

   ```bash
   # If you have a simple HTTP server
   python -m http.server 8000
   # Then open http://localhost:8000/public/index.html
   ```

3. **Watch the magic**: Messages will be exchanged between client and server!

## 📝 Code Explanation

### Server Side (`server.js`)

```javascript
const WebSocketServer = require('ws').Server
const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', ((ws) => {
  ws.on('message', (message) => {
    console.log(`received: ${message}`);
  });

  ws.on('end', () => {
    console.log('Connection ended...');
  });

  ws.send('Hello Client');
}));
```

**Key Points**:

- Creates a WebSocket server on port 8081
- Listens for new connections
- Handles incoming messages from clients
- Sends a greeting message to new clients
- Logs connection events

### Browser Client (`public/app.js`)

```javascript
var ws = new WebSocket("ws://127.0.0.1:8081");

ws.onopen = function (event) {
  console.log('Connection is open ...');
  ws.send("Hello Server");
};

ws.onmessage = function (event) {
  console.log(event.data);
  document.body.innerHTML += event.data + '<br>';
};

ws.onerror = function (err) {
  console.log('err: ', err);
}

ws.onclose = function() {
  console.log("Connection is closed...");
}
```

**Key Points**:

- Connects to WebSocket server
- Sends a message when connection opens
- Displays received messages in the browser
- Handles connection errors and closures

### Node.js Client (`client.js`)

```javascript
const WebSocket = require('ws');
const ws = new WebSocket('ws://localhost:8081');

ws.on('open', function open() {
  ws.send('Hello Server from Node.js client');
});

ws.on('message', function message(data) {
  console.log('received: %s', data);
});
```

**Key Points**:

- Uses the `ws` library for Node.js WebSocket client
- Connects to the same server
- Sends and receives messages

## 🔍 Key Concepts

### WebSocket vs HTTP

| Feature | WebSocket | HTTP |
|---------|-----------|------|
| **Connection** | Persistent | Request/Response |
| **Protocol** | WebSocket | HTTP |
| **Overhead** | Low (after handshake) | High (per request) |
| **Latency** | Very Low | Medium |
| **Bidirectional** | ✅ | ❌ |
| **Real-time** | ✅ | ❌ |

### WebSocket Handshake

1. **Client**: Sends HTTP upgrade request
2. **Server**: Responds with 101 Switching Protocols
3. **Connection**: Upgraded to WebSocket protocol
4. **Communication**: Full-duplex message exchange

### Message Types

- **Text**: UTF-8 encoded strings
- **Binary**: Raw binary data
- **Ping/Pong**: Keep-alive messages

## ⚡ When to Use WebSockets

### ✅ Perfect For

- **Chat applications**: Real-time messaging
- **Live collaboration**: Document editing, whiteboards
- **Gaming**: Multiplayer games, real-time interactions
- **Live trading**: Stock prices, cryptocurrency
- **IoT dashboards**: Real-time sensor data
- **Live streaming**: Real-time video/audio

### ❌ Not Ideal For

- **Simple API calls**: Use HTTP/REST
- **One-way updates**: Use Server-Sent Events
- **Static content**: Use regular HTTP
- **SEO-critical content**: WebSocket content isn't crawlable

## 🛠️ Advanced Features

### Message Broadcasting

```javascript
wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    // Broadcast to all connected clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
```

### Room-based Communication

```javascript
const rooms = new Map();

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    const { room, message } = JSON.parse(data);
    
    if (!rooms.has(room)) {
      rooms.set(room, new Set());
    }
    
    rooms.get(room).forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});
```

### Heartbeat/Ping-Pong

```javascript
ws.on('pong', () => {
  ws.isAlive = true;
});

setInterval(() => {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }
    ws.isAlive = false;
    ws.ping();
  });
}, 30000);
```

## 🔧 Production Considerations

### Server-Side

- **Connection limits**: Monitor concurrent connections
- **Memory management**: Clean up closed connections
- **Load balancing**: Use sticky sessions or Redis
- **Security**: Implement authentication and rate limiting

### Client-Side

- **Reconnection**: Implement automatic reconnection logic
- **Error handling**: Graceful degradation on connection loss
- **Mobile**: Handle background/foreground transitions
- **Battery**: Optimize for mobile battery life

### Security

- **Authentication**: Verify client identity
- **Rate limiting**: Prevent abuse
- **Input validation**: Sanitize all messages
- **CORS**: Configure cross-origin policies

## 📚 Learning Resources

### Documentation

- [MDN WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)
- [RFC 6455 WebSocket Protocol](https://tools.ietf.org/html/rfc6455)
- [ws library documentation](https://github.com/websockets/ws)

### Tutorials

- [WebSocket.org Tutorial](https://www.websocket.org/aboutwebsocket.html)
- [JavaScript.info WebSocket Guide](https://javascript.info/websocket)
- [Socket.io Documentation](https://socket.io/docs/)

### Real-World Examples

- [Slack's real-time messaging](https://slack.engineering/real-time-messaging/)
- [Discord's voice/video chat](https://discord.com/developers/docs/topics/voice-connections)
- [TradingView's live charts](https://www.tradingview.com/)

## 🔗 Navigation

- **Previous**: [Server-Sent Events](../server-side-events/) - One-way real-time updates
- **Next**: [Raw TCP Sockets](../server-side-sockets/) - Low-level networking
- **Related**:
  - [XMLHttpRequest](../xhr/) - Traditional HTTP requests
  - [HTTP/2](../http2/) - Modern HTTP features

## 🐛 Troubleshooting

### Common Issues

1. **Connection refused**: Check if server is running and port is correct
2. **CORS errors**: Configure server CORS settings
3. **Firewall blocking**: WebSockets may be blocked by corporate firewalls
4. **Proxy issues**: Some proxies don't support WebSocket upgrades

### Debug Tips

- Use browser DevTools Network tab to inspect WebSocket frames
- Check server logs for connection events
- Test with different browsers and network conditions
- Monitor connection state and message flow

---

**Ready for low-level networking?** Check out [Raw TCP Sockets](../server-side-sockets/) next!

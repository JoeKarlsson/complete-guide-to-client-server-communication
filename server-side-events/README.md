# Server-Sent Events (SSE) Example

Server-Sent Events (SSE) enable real-time, one-way communication from server to client. Unlike WebSockets, SSE is built on top of HTTP and works through firewalls and proxies that might block WebSocket connections.

## 🎯 What This Example Demonstrates

This example shows how to:

- Set up a Server-Sent Events connection
- Stream real-time data from server to client
- Handle SSE events in the browser
- Implement automatic reconnection
- Use proper SSE headers and formatting

## 🚀 How to Run

1. **Start the server**:

   ```bash
   node server.js
   ```

2. **Open your browser** and navigate to:

   ```
   http://localhost:8000
   ```

3. **Watch the magic**: The page will automatically update every 5 seconds with the current server time!

## 📝 Code Explanation

### Server Side (`server.js`)

#### SSE Headers Setup

```javascript
res.writeHead(200, {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'Connection': 'keep-alive'
});
```

- `text/event-stream`: Tells the browser this is an SSE stream
- `no-cache`: Prevents caching of the stream
- `keep-alive`: Maintains the connection

#### SSE Message Format

```javascript
const constructSSE = (res, id, data) => {
  res.write('id: ' + id + '\n');
  res.write("data: " + data + '\n\n');
}
```

- Each message must end with `\n\n`
- `id:` field helps with reconnection
- `data:` field contains the actual message

#### Streaming Logic

```javascript
setInterval(() => {
  constructSSE(res, id, (new Date()).toLocaleTimeString());
}, 5000);
```

- Sends a new message every 5 seconds
- Uses the same connection for all messages

### Client Side (`index.html`)

```javascript
var source = new EventSource('/events');
source.onmessage = function(e) {
  document.body.innerHTML += e.data + '<br>';
};
```

- `EventSource` handles the SSE connection automatically
- `onmessage` fires when new data arrives
- Automatic reconnection on connection loss

## 🔍 Key Concepts

### SSE vs Other Protocols

| Feature | SSE | XHR Polling | WebSocket |
|---------|-----|-------------|-----------|
| **Direction** | Server → Client | Bidirectional | Bidirectional |
| **Protocol** | HTTP | HTTP | WebSocket |
| **Reconnection** | Automatic | Manual | Manual |
| **Firewall** | Works through | Works through | May be blocked |
| **Complexity** | Simple | Simple | Complex |

### SSE Message Format

```
id: message-id
data: message content
event: event-type
retry: 3000

```

- `id`: Unique identifier for the message
- `data`: The actual data (can be multiple lines)
- `event`: Custom event type (optional)
- `retry`: Reconnection delay in milliseconds (optional)

### Event Types

- `message`: Default event type
- `open`: Connection opened
- `error`: Connection error
- Custom events: You can define your own event types

## ⚡ When to Use SSE

### ✅ Perfect For

- **Live feeds**: Social media updates, news feeds
- **Notifications**: Real-time alerts and notifications
- **Live data**: Stock prices, sports scores, weather
- **Progress updates**: Long-running operations
- **Chat notifications**: New message alerts (not the chat itself)

### ❌ Not Ideal For

- **Bidirectional communication**: Use WebSockets instead
- **Binary data**: SSE only supports text
- **High-frequency updates**: May cause performance issues
- **Complex state management**: Better suited for simple updates

## 🛠️ Advanced Features

### Custom Event Types

```javascript
// Server
res.write('event: custom\n');
res.write('data: custom message\n\n');

// Client
source.addEventListener('custom', function(e) {
  console.log('Custom event:', e.data);
});
```

### Connection State Management

```javascript
source.onopen = function() {
  console.log('SSE connection opened');
};

source.onerror = function() {
  console.log('SSE connection error');
};

source.onclose = function() {
  console.log('SSE connection closed');
};
```

### Manual Reconnection

```javascript
source.close(); // Close current connection
source = new EventSource('/events'); // Create new connection
```

## 🔧 Production Considerations

### Server-Side

- **Connection limits**: Each SSE connection uses a server resource
- **Memory management**: Close connections when clients disconnect
- **Load balancing**: SSE connections are sticky to specific servers
- **Error handling**: Gracefully handle client disconnections

### Client-Side

- **Browser limits**: Most browsers limit concurrent SSE connections
- **Memory leaks**: Close connections when navigating away
- **Error handling**: Implement fallback mechanisms
- **Mobile considerations**: Mobile browsers may suspend SSE connections

## 📚 Learning Resources

### Documentation

- [MDN Server-Sent Events](https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events)
- [W3C Server-Sent Events Specification](https://html.spec.whatwg.org/multipage/server-sent-events.html)

### Tutorials

- [HTML5Rocks SSE Tutorial](https://www.html5rocks.com/en/tutorials/eventsource/basics/)
- [JavaScript.info SSE Guide](https://javascript.info/server-sent-events)

### Real-World Examples

- [Twitter's live feed updates](https://blog.twitter.com/engineering/en_us/a/2010/announcing-snowflake.html)
- [GitHub's real-time notifications](https://github.com/blog/841-github-streams)

## 🔗 Navigation

- **Previous**: [XMLHttpRequest](../xhr/) - Traditional HTTP requests
- **Next**: [WebSockets](../client-server-sockets/) - Bidirectional real-time communication
- **Related**:
  - [Raw TCP Sockets](../server-side-sockets/) - Low-level networking
  - [HTTP/2](../http2/) - Modern HTTP features

## 🐛 Troubleshooting

### Common Issues

1. **Connection not opening**: Check server headers and URL
2. **Messages not received**: Verify SSE message format
3. **Reconnection issues**: Check `retry` field and error handling
4. **Browser compatibility**: SSE works in all modern browsers

### Debug Tips

- Use browser DevTools Network tab to inspect SSE stream
- Check server logs for connection events
- Monitor memory usage for connection leaks
- Test with different browsers and network conditions

---

**Ready for bidirectional communication?** Check out [WebSockets](../client-server-sockets/) next!

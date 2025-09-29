# Complete Guide to Client-Server Communication

A comprehensive collection of examples demonstrating different ways clients and servers communicate in JavaScript and Node.js. This repository covers the most important communication protocols used in modern web applications.

## 🚀 Quick Start

Each example is self-contained and can be run independently:

```bash
# Navigate to any example folder
cd xhr
npm install
node server.js

# Then open http://localhost:3000 in your browser
```

## 📚 Communication Protocols Covered

| Protocol | Use Case | Best For | Example |
|----------|----------|----------|---------|
| **[XMLHttpRequest (XHR)](./xhr/)** | Traditional HTTP requests | API calls, form submissions | `xhr/` |
| **[Server-Sent Events (SSE)](./server-side-events/)** | Real-time server-to-client updates | Live feeds, notifications | `server-side-events/` |
| **[WebSockets](./client-server-sockets/)** | Bidirectional real-time communication | Chat apps, live collaboration | `client-server-sockets/` |
| **[Raw TCP Sockets](./server-side-sockets/)** | Low-level network communication | Custom protocols, IoT | `server-side-sockets/` |
| **[HTTP/2](./http2/)** | Modern HTTP with multiplexing | Performance optimization | `http2/` |

## 🔄 Protocol Comparison

| Feature | XHR | SSE | WebSocket | TCP | HTTP/2 |
|---------|-----|-----|-----------|-----|--------|
| **Request streaming** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Response streaming** | Limited | ✅ | ✅ | ✅ | ✅ |
| **Bidirectional** | ❌ | ❌ | ✅ | ✅ | ✅ |
| **Binary data** | ✅ | ❌ | ✅ | ✅ | ✅ |
| **Browser cache** | ✅ | ❌ | ❌ | ❌ | ✅ |
| **Compression** | ✅ | ✅ | Limited | ❌ | ✅ |
| **Latency** | High | Low | Low | Very Low | Medium |
| **Complexity** | Low | Low | Medium | High | Medium |

## 🎯 When to Use Each Protocol

### XMLHttpRequest (XHR)

- **Best for**: Traditional web applications, REST APIs, form submissions
- **Pros**: Simple, widely supported, works with browser cache
- **Cons**: No real-time capabilities, higher latency
- **Example**: Loading user data, submitting forms

### Server-Sent Events (SSE)

- **Best for**: Live updates, notifications, real-time feeds
- **Pros**: Simple, automatic reconnection, works through firewalls
- **Cons**: Server-to-client only, text data only
- **Example**: Live sports scores, stock prices, chat notifications

### WebSockets

- **Best for**: Interactive applications, real-time collaboration
- **Pros**: Bidirectional, low latency, supports binary data
- **Cons**: More complex, doesn't work through all proxies
- **Example**: Chat applications, live gaming, collaborative editing

### Raw TCP Sockets

- **Best for**: Custom protocols, IoT devices, high-performance applications
- **Pros**: Maximum control, lowest latency, custom framing
- **Cons**: Complex, not web-compatible, requires custom client
- **Example**: IoT sensors, custom network protocols

### HTTP/2

- **Best for**: Modern web applications, performance optimization
- **Pros**: Multiplexing, server push, header compression
- **Cons**: Requires HTTPS, newer protocol
- **Example**: Modern web apps, mobile applications

## 🛠️ Getting Started

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/complete-guide-to-client-server-communication.git
   cd complete-guide-to-client-server-communication
   ```

2. **Install all dependencies**:

   ```bash
   npm run install:all
   ```

3. **Choose an example** and follow its README:
   - Start with [XHR](./xhr/) for basic HTTP communication
   - Try [SSE](./server-side-events/) for real-time updates
   - Explore [WebSockets](./client-server-sockets/) for bidirectional communication

4. **Run the example**:

   ```bash
   npm run start:xhr        # XMLHttpRequest
   npm run start:sse        # Server-Sent Events
   npm run start:websocket   # WebSockets
   npm run start:tcp         # Raw TCP Sockets
   npm run start:http2       # HTTP/2
   ```

## 🔧 Development

### Available Scripts

- `npm run install:all` - Install dependencies for all examples
- `npm run update:deps` - Update all dependencies to latest versions
- `npm run check:outdated` - Check for outdated packages
- `npm run dev` - Show available development commands

### Requirements

- **Node.js**: >= 14.0.0 (see [.nvmrc](.nvmrc) for recommended version)
- **npm**: >= 6.0.0

## 📖 Learning Path

### Beginner

1. **[XHR](./xhr/)** - Start here to understand basic HTTP communication
2. **[SSE](./server-side-events/)** - Learn about server-to-client streaming

### Intermediate

3. **[WebSockets](./client-server-sockets/)** - Master bidirectional communication
4. **[HTTP/2](./http2/)** - Understand modern HTTP features

### Advanced

5. **[Raw TCP Sockets](./server-side-sockets/)** - Explore low-level networking

## 🔗 Cross-References

Each example includes:

- **Previous**: Link to the previous protocol in learning order
- **Next**: Link to the next protocol to explore
- **Related**: Links to similar or complementary examples
- **Resources**: External documentation and tutorials

## ✅ Tested & Verified

All examples have been comprehensively tested and are working perfectly:

- ✅ **XHR**: Traditional HTTP requests with modern error handling
- ✅ **SSE**: Real-time server-to-client streaming with automatic reconnection
- ✅ **WebSocket**: Bidirectional communication with both browser and Node.js clients
- ✅ **TCP Sockets**: Raw TCP communication for custom protocols
- ✅ **HTTP/2**: Modern HTTP with multiplexing and binary framing

## 🤝 Contributing

Contributions are welcome! Please feel free to:

- Add new communication protocols
- Improve existing examples
- Fix bugs or update dependencies
- Enhance documentation

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by "High Performance Browser Networking" by Ilya Grigorik
- Examples based on real-world use cases and best practices
- Community contributions and feedback

---

**Ready to start?** Begin with the [XHR example](./xhr/) or jump to any protocol that interests you!

# XMLHttpRequest (XHR) Example

XMLHttpRequest is the traditional way to make HTTP requests from JavaScript. It's the foundation of AJAX (Asynchronous JavaScript and XML) and is still widely used today, though modern applications often prefer the newer `fetch()` API.

## 🎯 What This Example Demonstrates

This example shows how to:

- Make periodic HTTP requests using XMLHttpRequest
- Handle server responses asynchronously
- Update the DOM with server data
- Implement a simple polling mechanism

## 🚀 How to Run

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Start the server**:

   ```bash
   node server.js
   ```

3. **Open your browser** and navigate to:

   ```
   http://localhost:3000
   ```

4. **Watch the magic**: The page will automatically update every 3 seconds with the current server time!

## 📝 Code Explanation

### Server Side (`server.js`)

```javascript
app.get('/api', function(req, res){
  res.send((new Date()).toLocaleTimeString());
});
```

- Simple Express server that serves static files
- `/api` endpoint returns the current server time
- Uses Express static middleware to serve the HTML and JS files

### Client Side (`public/app.js`)

```javascript
function reqListener (data) {
  document.body.innerHTML += this.responseText + '<br>';
}

setInterval(function () {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", reqListener);
  oReq.open("GET", "/api");
  oReq.send();
}, 3000);
```

- Creates a new XMLHttpRequest every 3 seconds
- Sets up an event listener for the `load` event
- Opens a GET request to `/api`
- Sends the request and updates the DOM with the response

## 🔍 Key Concepts

### XMLHttpRequest Lifecycle

1. **Create**: `new XMLHttpRequest()`
2. **Configure**: `open(method, url)`
3. **Listen**: Add event listeners
4. **Send**: `send()` the request
5. **Handle**: Process the response

### Event Types

- `load`: Request completed successfully
- `error`: Request failed
- `timeout`: Request timed out
- `progress`: Request progress (for large files)

### Response Properties

- `responseText`: Response as string
- `responseXML`: Response as XML document
- `status`: HTTP status code
- `statusText`: HTTP status text

## ⚡ When to Use XHR

### ✅ Good For

- **Simple API calls**: REST endpoints, data fetching
- **Form submissions**: POST requests with form data
- **File uploads**: With progress tracking
- **Legacy browser support**: Works in older browsers
- **Caching**: Leverages browser HTTP cache

### ❌ Not Ideal For

- **Real-time communication**: Use WebSockets or SSE instead
- **Streaming data**: Limited streaming capabilities
- **Modern applications**: Consider `fetch()` API
- **Complex state management**: Can become unwieldy

## 🔄 Modern Alternative: Fetch API

While XHR still works, modern JavaScript uses the `fetch()` API:

```javascript
// Modern approach with fetch()
setInterval(async function () {
  try {
    const response = await fetch('/api');
    const data = await response.text();
    document.body.innerHTML += data + '<br>';
  } catch (error) {
    console.error('Request failed:', error);
  }
}, 3000);
```

## 🛠️ Common Patterns

### Error Handling

```javascript
oReq.addEventListener("error", function() {
  console.error("Request failed");
});

oReq.addEventListener("timeout", function() {
  console.error("Request timed out");
});
```

### POST Requests

```javascript
oReq.open("POST", "/api");
oReq.setRequestHeader("Content-Type", "application/json");
oReq.send(JSON.stringify({data: "value"}));
```

### Request Headers

```javascript
oReq.setRequestHeader("Authorization", "Bearer token");
oReq.setRequestHeader("Content-Type", "application/json");
```

## 📚 Learning Resources

### Documentation

- [MDN XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest)
- [W3C XMLHttpRequest Specification](https://www.w3.org/TR/XMLHttpRequest/)

### Tutorials

- [JavaScript.info AJAX](https://javascript.info/xmlhttprequest)
- [MDN AJAX Guide](https://developer.mozilla.org/en-US/docs/Web/Guide/AJAX)

### Books

- "JavaScript: The Definitive Guide" by David Flanagan
- "High Performance Browser Networking" by Ilya Grigorik

## 🔗 Navigation

- **Previous**: [Main Guide](../README.md)
- **Next**: [Server-Sent Events](../server-side-events/) - Real-time server-to-client updates
- **Related**:
  - [WebSockets](../client-server-sockets/) - Bidirectional communication
  - [HTTP/2](../http2/) - Modern HTTP features

## 🐛 Troubleshooting

### Common Issues

1. **CORS errors**: Make sure server allows cross-origin requests
2. **Network errors**: Check if server is running and accessible
3. **Timing issues**: Ensure DOM is ready before making requests

### Debug Tips

- Use browser DevTools Network tab to inspect requests
- Check console for error messages
- Verify server logs for request handling

---

**Ready for real-time updates?** Check out [Server-Sent Events](../server-side-events/) next!

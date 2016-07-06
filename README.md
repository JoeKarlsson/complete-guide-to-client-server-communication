# Complete Guide To Client Server Communication

A complete list of all the ways a Client and Server communicate with each other in JavaScript and Node. This module covers the following forms of client server connection:

* XMLHttpRequest
* Server-Sent Events
* WebSocket
* HTTP/200
* Server to server

There is no one best protocol or API for client/server communication. Every nontrivial application will require a mix of different transports based on a variety of requirements: interaction with the browser cache, protocol overhead, message latency, reliability, type of data transfer, and more. Some protocols may offer low-latency delivery (e.g., Server-Sent Events, WebSocket), but may not meet other critical criteria, such as the ability to leverage the browser cache or support efficient binary transfers in all cases.

![hpbn_1702](https://cloud.githubusercontent.com/assets/4650739/16638018/712e5fe2-437f-11e6-88db-671c60753a9f.png)

* __WebSocket__ is the only transport that allows bidirectional communication over the same TCP connection (Figure 17-2): the client and server can exchange messages at will. As a result, WebSocket provides low latency delivery of text and binary application data in both directions.
* __XHR__ is optimized for "transactional" request-response communication: the client sends the full, well-formed HTTP request to the server, and the server responds with a full response. There is no support for request streaming, and until the Streams API is available, no reliable cross-browser response streaming API.
* __SSE__ enables efficient, low-latency server-to-client streaming of text-based data: the client initiates the SSE connection, and the server uses the event source protocol to stream updates to the client. The client can’t send any data to the server after the initial handshake.

|__               |XMLHttpRequest |Server-Sent Events| WebSocket     |
|-----------------|---------------|------------------|---------------|
|Request streaming |no             |no                |yes           |
|Response streaming|limited        |yes               |yes           |
|Framing mechanism |HTTP           |event stream      |binary framing|
|Binary data transfers |yes        |no(Base64)        |limited       |
|Compression       |yes            |yes               |limited       |
|Application transport protocol |HTTP        |HTTP    |WebSocket     |
|Network transport protocol |TCP             |TCP     |TCP           |


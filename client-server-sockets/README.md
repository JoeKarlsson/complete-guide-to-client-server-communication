# WebSocket Client + Server Demo

WebSockets is a technology, based on the ws protocol, that makes it possible to establish a continuous full-duplex connection stream between a client and a server.  A typical websocket client would be a user's browser, but the protocol is platform independent. It is the closest API to a raw network socket in the browser. Except a WebSocket connection is also much more than a network socket, as the browser abstracts all the complexity behind a simple API and provides a number of additional services:

* Connection negotiation and same-origin policy enforcement
* Interoperability with existing HTTP infrastructure
* Message-oriented communication and efficient message framing
* Subprotocol negotiation and extensibility

This is a demo shows a demo of a client connecting to a websocket server and sharing data.

## Getting Started

This demo requires a server for your client - install `http-server` with `npm i -g http-server`

* `npm i`
* `node server.js`
* `http-server`
* Go to [http://localhost:8081/](http://localhost:8081/)

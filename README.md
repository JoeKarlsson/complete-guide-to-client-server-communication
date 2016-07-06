# Complete Guide To Client Server Communication

A complete list of all the ways a Client and Server communicate with each other in JavaScript and Node. — Edit

Every time we initiate an HTTP or an XMLHttpRequest, a long-lived Server-Sent Events or WebSocket session, or open a WebRTC connection, we are interacting with some or all of these underlying services.

There is no one best protocol or API. Every nontrivial application will require a mix of different transports based on a variety of requirements: interaction with the browser cache, protocol overhead, message latency, reliability, type of data transfer, and more. Some protocols may offer low-latency delivery (e.g., Server-Sent Events, WebSocket), but may not meet other critical criteria, such as the ability to leverage the browser cache or support efficient binary transfers in all cases.

|__               |XMLHttpRequest |Server-Sent Events| WebSocket     |
|-----------------|---------------|------------------|---------------|
|Request streaming |no             |no                |yes           |
|Response streaming|limited        |yes               |yes           |
|Framing mechanism |HTTP           |event stream      |binary framing|
|Binary data transfers |yes        |no(Base64)        |limited       |
|Compression       |yes            |yes               |limited       |
|Application transport protocol |HTTP        |HTTP                ||WebSocket        |
|Network transport protocol |TCP             |TCP                |TCP        |


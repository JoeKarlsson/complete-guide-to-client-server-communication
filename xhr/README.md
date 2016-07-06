XMLHttpRequest (XHR) is a browser-level API that enables the client to script data transfers via JavaScript. XHR made its first debut in Internet Explorer 5, became one of the key technologies behind the Asynchronous JavaScript and XML (AJAX) revolution, and is now a fundamental building block of nearly every modern web application.

```
XMLHTTP changed everything. It put the "D" in DHTML. It allowed us to asynchronously get data from the server and preserve document state on the client… The Outlook Web Access (OWA) team’s desire to build a rich Win32 like application in a browser pushed the technology into IE that allowed AJAX to become a reality.

-- Jim Van Eaton Outlook Web Access: A catalyst for web evolution
```

![XML Polling](http://orm-chimera-prod.s3.amazonaws.com/1230000000545/images/hpbn_1501.png)

## XML HTTP Request basics

```javascript
// script origin: (http, example.com, 80)
var xhr = new XMLHttpRequest();
xhr.open('GET', '/resource.js'); 1
xhr.onload = function() { ... };
xhr.send();
```
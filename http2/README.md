# HTTP/2 with Node.js

Firstly, many clients and browsers are not planning on implementing the ability to use HTTP/2 over plain-text, even though this is in the protocols specification. This notion comes as a wider community effort to move towards a more secure and encrypted internet by default.

For us however, this means if we intend on using HTTP/2 in production, we must supply a valid TLS certificate!
If you wish to use a valid TLS certificate which is signed by an authority and not self signed, I recommend Let’s Encrypt, a free, automated and open certificate authority!

For the purpose of this guide, we’re going to be using self-signed certificates, feel free to replace these steps with a certificate you have acquired from Let’s Encrypt (or another certificate authority).

This is the real nitty gritty stuff of openssl, let’s quickly zip past it and get ourselves a certificate.

## Generating a TLS certificate

Create a new project directory and assuming you have openssh installed, lets generate a 2048 bit private key for our server, note that we specify the key passphrase as ‘x’ using the flag ‘-passout pass:x’:

```bash
$ mkdir node-http && cd node-http
$ openssl genrsa -des3 -passout pass:x -out server.pass.key 2048
```

We now need to remove the passphrase from this key so it can be loaded into our HTTP server, we then remove the original key:

```bash
$ openssl rsa -passin pass:x -in server.pass.key -out server.key
$ rm server.pass.key
```

Now we need to generate the certificate signing request in order to validate who we are (even though we are self signing the certificate, we must present a CSR), you’ll be prompted for information such as your country whereabouts, name, organisation details and common name, enter these as appropriate:

```bash
$ openssl req -new -key server.key -out server.csr
```

Finally, we can (self) sign our certificate:

```bash
$ openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

You now should have three extra files within the node-http2 directory:

* __server.crt__ — Your new TLS certificate
* __server.key__ — Your TLS certificate private key
* __server.csr__ — Your TLS certificate signing request

Now we have our certificates ready, we can move on to writing a basic HTTP/2 node server.

## Getting Started

* Get TLS Certificate (See above)
* `npm i`
* `node server.js`

(Inspired by Jacob Clark)[https://medium.com/@imjacobclark/http-2-with-node-js-85da17322812#.uw544zm68]
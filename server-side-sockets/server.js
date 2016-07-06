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
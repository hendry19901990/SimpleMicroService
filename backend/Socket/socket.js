const app = require('express')();
const http = require('http').Server(app);

const io = require('socket.io')(http, {
        cors: {
          origin: '*',
          methods: ["GET", "POST"]
        }
    });

const getSocket = () => {
  

  io.on('connection', socket => {
    console.log('User connected!');

    socket.on('disconnect', () => {
      console.log('User disconnected!');
      
    });
  });

  http.listen(4444, () => console.log(`Socket running on port 4444`));
  return io;
};

module.exports = getSocket;

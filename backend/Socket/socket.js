const app = require('express')();
var cors = require("cors");

app.use(cors()); 

const http = require('http');
const socketIo = require('socket.io');

const getSocket = () => {
  const server = http.createServer(app);
  const io = socketIo(server, {
        cors: {
            origins: ['http://localhost:4200']
        }
    });

  let ws = io.on('connection', socket => {
    console.log('User connected!');


    socket.on('disconnect', () => {
      console.log('User disconnected!');
      
    });
  });

  server.listen(4444, () => console.log(`Socket running on port 4444`));
  return ws;
};

module.exports = getSocket;

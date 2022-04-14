const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// app.use(express.static(path.join(__dirname, 'public')));

const port = 4200;

const sockets = new Map();

io.on("connection", (client) => {
  sockets.set(client.id, client);

  console.log('New websocket connection');

  client.on('messageFromClient', (msg) => {
    console.log(msg);
    io.emit('messageFromServer', msg);
  });

  client.on('disconnect', () => {
    sockets.delete(client.id);
    console.log('New websocket disconnected');
  });
});

app.get('/', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (_, res) => {
  console.log('POST')
  io.emit('messageFromServer', 'Hello from server');
  res.json({ success: true });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

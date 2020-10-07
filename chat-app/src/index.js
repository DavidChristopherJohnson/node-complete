const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

io.on('connect', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('message', 'Welcome');

    socket.on('sendMessage', (message) => {
        console.log('Send Message: ', message);
        io.emit('message', message);
    })
})

server.listen(port, () => {
    console.log(`Server up on port ${port}`);
})
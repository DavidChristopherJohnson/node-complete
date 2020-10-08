const path = require('path');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const Filter = require('bad-words');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, '../public');

app.use(express.static(publicDir));

io.on('connect', (socket) => {
    console.log('New WebSocket connection');

    socket.emit('message', 'Welcome');
    socket.broadcast.emit('message', 'A new user has joined');

    socket.on('sendMessage', (message, callback) => {
        const filter = new Filter();
        if (filter.isProfane(message)) {
            return callback('Profanity detected - Not Delivered');
        }

        io.emit('message', message);
        callback();
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left');
    });

    socket.on('sendLocation', (location, callback) => {
        io.emit('locationMessage', `https://google.com/maps?q=${location.latitude},${location.longitude}`);
        callback();
    })
})

server.listen(port, () => {
    console.log(`Server up on port ${port}`);
})
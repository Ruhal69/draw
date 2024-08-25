const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

// Setup server
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files
app.use(express.static(__dirname));

// Handle WebSocket connection
io.on('connection', (socket) => {
    console.log('A user connected');

    socket.on('startDrawing', (data) => {
        socket.broadcast.emit('startDrawing', data);
    });

    socket.on('draw', (data) => {
        socket.broadcast.emit('draw', data);
    });

    socket.on('stopDrawing', () => {
        socket.broadcast.emit('stopDrawing');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

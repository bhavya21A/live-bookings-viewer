const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// In-memory bookings array (not a real DB)
const bookings = [];

// Emit mock bookings every 5 seconds
setInterval(() => {
  const booking = {
    venueName: `Venue ${Math.floor(Math.random() * 10) + 1}`,
    partySize: Math.floor(Math.random() * 10) + 1,
    time: new Date().toLocaleTimeString()
  };

  bookings.push(booking);
  io.emit('new-booking', booking);
  console.log('New booking:', booking);
}, 5000);

// Listen for connections
io.on('connection', (socket) => {
  console.log('Client connected');
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

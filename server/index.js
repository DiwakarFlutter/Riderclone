const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*', methods: ['GET', 'POST'] } });

app.use(cors());
app.use(express.json());

const rides = {};
const drivers = {};

app.use('/api/auth', require('./routes/auth'));
app.use('/api/rides', require('./routes/rides'));
app.use('/api/drivers', require('./routes/drivers'));
app.use('/api/payments', require('./routes/payments'));

app.get('/health', (req, res) => res.json({ status: 'OK', timestamp: new Date() }));

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('driver-location', (data) => {
    drivers[data.driverId] = { lat: data.lat, lng: data.lng };
    socket.broadcast.emit('driver-location-update', data);
  });

  socket.on('request-ride', (data) => {
    const rideId = 'ride_' + Date.now();
    rides[rideId] = { ...data, id: rideId, status: 'searching' };
    io.emit('new-ride-request', rides[rideId]);
  });

  socket.on('accept-ride', (data) => {
    if (rides[data.rideId]) {
      rides[data.rideId].driverId = data.driverId;
      rides[data.rideId].status = 'accepted';
      io.emit('ride-accepted', rides[data.rideId]);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };

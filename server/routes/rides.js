const express = require('express');
const router = express.Router();

const rides = {};

router.get('/', (req, res) => {
  res.json({ rides: Object.values(rides) });
});

router.post('/request', (req, res) => {
  const { userId, pickupLat, pickupLng, dropoffLat, dropoffLng } = req.body;

  if (!userId || !pickupLat || !pickupLng || !dropoffLat || !dropoffLng) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const rideId = 'ride_' + Date.now();
  rides[rideId] = {
    id: rideId,
    userId,
    pickupLat,
    pickupLng,
    dropoffLat,
    dropoffLng,
    status: 'searching',
    createdAt: new Date()
  };

  res.status(201).json({ message: 'Ride requested successfully', ride: rides[rideId] });
});

router.get('/:id', (req, res) => {
  const ride = rides[req.params.id];
  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }
  res.json(ride);
});

router.put('/:id/accept', (req, res) => {
  const { driverId } = req.body;
  const ride = rides[req.params.id];

  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }

  ride.driverId = driverId;
  ride.status = 'accepted';
  ride.acceptedAt = new Date();

  res.json({ message: 'Ride accepted', ride });
});

router.put('/:id/complete', (req, res) => {
  const { fare, distance, duration } = req.body;
  const ride = rides[req.params.id];

  if (!ride) {
    return res.status(404).json({ error: 'Ride not found' });
  }

  ride.status = 'completed';
  ride.fare = fare;
  ride.distance = distance;
  ride.duration = duration;
  ride.completedAt = new Date();

  res.json({ message: 'Ride completed', ride });
});

module.exports = router;

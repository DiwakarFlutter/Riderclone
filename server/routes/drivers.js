const express = require('express');
const router = express.Router();

const drivers = {};

router.get('/', (req, res) => {
  res.json({ drivers: Object.values(drivers) });
});

router.post('/register', (req, res) => {
  const { userId, licenseNumber, bikeNumber } = req.body;

  if (!userId || !licenseNumber || !bikeNumber) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const driverId = 'driver_' + Date.now();
  drivers[driverId] = {
    id: driverId,
    userId,
    licenseNumber,
    bikeNumber,
    isVerified: false,
    isAvailable: true,
    currentLocation: { lat: 0, lng: 0 },
    totalRides: 0,
    totalEarnings: 0,
    rating: 5,
    createdAt: new Date()
  };

  res.status(201).json({ message: 'Driver registered successfully', driver: drivers[driverId] });
});

router.get('/:id', (req, res) => {
  const driver = drivers[req.params.id];
  if (!driver) {
    return res.status(404).json({ error: 'Driver not found' });
  }
  res.json(driver);
});

router.put('/:id/location', (req, res) => {
  const { lat, lng } = req.body;
  const driver = drivers[req.params.id];

  if (!driver) {
    return res.status(404).json({ error: 'Driver not found' });
  }

  driver.currentLocation = { lat, lng };
  driver.updatedAt = new Date();

  res.json({ message: 'Location updated', driver });
});

router.put('/:id/availability', (req, res) => {
  const { isAvailable } = req.body;
  const driver = drivers[req.params.id];

  if (!driver) {
    return res.status(404).json({ error: 'Driver not found' });
  }

  driver.isAvailable = isAvailable;
  driver.updatedAt = new Date();

  res.json({ message: 'Availability updated', driver });
});

module.exports = router;

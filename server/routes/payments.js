const express = require('express');
const router = express.Router();

const payments = {};

router.post('/process', (req, res) => {
  const { rideId, amount, paymentMethod } = req.body;

  if (!rideId || !amount || !paymentMethod) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const paymentId = 'pay_' + Date.now();
  payments[paymentId] = {
    id: paymentId,
    rideId,
    amount,
    paymentMethod,
    status: 'completed',
    transactionId: 'txn_' + Date.now(),
    createdAt: new Date()
  };

  res.status(201).json({ message: 'Payment processed successfully', payment: payments[paymentId] });
});

router.get('/:id', (req, res) => {
  const payment = payments[req.params.id];
  if (!payment) {
    return res.status(404).json({ error: 'Payment not found' });
  }
  res.json(payment);
});

router.get('/', (req, res) => {
  res.json({ payments: Object.values(payments) });
});

module.exports = router;

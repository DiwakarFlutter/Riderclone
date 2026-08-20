const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const users = {};

router.post('/register', (req, res) => {
  const { name, email, password, userType } = req.body;
  
  if (!name || !email || !password || !userType) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  if (users[email]) {
    return res.status(400).json({ error: 'User already exists' });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  users[email] = {
    id: 'user_' + Date.now(),
    name,
    email,
    password: hashedPassword,
    userType,
    createdAt: new Date()
  };

  res.status(201).json({
    message: 'User registered successfully',
    user: { id: users[email].id, name, email, userType }
  });
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }

  const user = users[email];
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, userType: user.userType },
    process.env.JWT_SECRET || 'secret123',
    { expiresIn: '24h' }
  );

  res.json({
    message: 'Login successful',
    token,
    user: { id: user.id, name: user.name, email: user.email, userType: user.userType }
  });
});

router.post('/logout', (req, res) => {
  res.json({ message: 'Logout successful' });
});

module.exports = router;

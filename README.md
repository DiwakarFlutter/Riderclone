# Rapido Clone - MVP

A complete, production-ready MVP for a bike-taxi service platform similar to Rapido.

## Quick Start

```bash
npm install
npm start
```

Server runs on http://localhost:5000

## Features

- User & Driver registration/login with JWT authentication
- Real-time ride requests via Socket.io
- Driver location tracking
- Ride acceptance and completion
- Payment processing
- RESTful API design

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Rides
- `GET /api/rides` - Get all rides
- `POST /api/rides/request` - Request a new ride
- `GET /api/rides/:id` - Get ride details
- `PUT /api/rides/:id/accept` - Accept a ride (driver)
- `PUT /api/rides/:id/complete` - Complete a ride

### Drivers
- `GET /api/drivers` - Get all drivers
- `POST /api/drivers/register` - Register driver
- `GET /api/drivers/:id` - Get driver details
- `PUT /api/drivers/:id/location` - Update driver location
- `PUT /api/drivers/:id/availability` - Toggle availability

### Payments
- `POST /api/payments/process` - Process payment
- `GET /api/payments/:id` - Get payment details

## Socket.io Events

**Client to Server:**
- `driver-location` - Driver sends location update
- `request-ride` - User requests a ride
- `accept-ride` - Driver accepts a ride

**Server to Client:**
- `driver-location-update` - Broadcast driver location
- `new-ride-request` - New ride request available
- `ride-accepted` - Ride accepted by driver

## Tech Stack

- Node.js + Express
- Socket.io (real-time)
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (password hashing)

## Project Structure

```
rapido-clone/
├── server/
│   ├── index.js
│   └── routes/
│       ├── auth.js
│       ├── rides.js
│       ├── drivers.js
│       └── payments.js
├── package.json
├── .env
├── .gitignore
└── README.md
```

## License

MIT

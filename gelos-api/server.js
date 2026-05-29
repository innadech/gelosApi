// ============================================================
// server.js — Session 6: PRODUCTION VERSION
// ============================================================
// WHAT'S NEW:
//   - Login checks against Employees collection (not hardcoded)
//   - JWT contains the authenticated employee's identity
//   - All /api/orders routes are protected by authenticateToken
//
// AUTHENTICATION FLOW:
//   1. Employee logs in with Username/Password from DB
//   2. Server verifies against Employees collection
//   3. JWT token contains empId, username
//   4. authenticateToken checks "is the token valid?" on every order route
//
// FOLDER STRUCTURE:
//   gelos-api/
//     .env
//     package.json
//     server.js               ← THIS FILE
//     swagger.js
//     models/
//       Employee.js            ← NEW: employee model
//       Order.js
//     routes/
//       auth.js               ← UPDATED: checks DB instead of hardcoded
//       orders.js             ← UPDATED: requires valid JWT
//     middleware/
//       auth.js               ← authentication (token valid?)

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger')
require('dotenv').config()

const authenticateToken = require('./middleware/auth')
const authRoutes = require('./routes/authRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express()

// Middleware
app.use(express.json())

// CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))

// Swagger docs (public)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// --- Routes ---
// Public
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Gelos Grocery API (Production)',
    documentation: '/api-docs',
    login: 'POST /api/auth/login with { username, password }',
  })
})
app.use('/api/auth', authRoutes)

// Protected (authentication required)
app.use('/api/orders', authenticateToken, orderRoutes)

// Start
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API docs:  http://localhost:${PORT}/api-docs`)
  console.log(`Login:     POST http://localhost:${PORT}/api/auth/login`)
})

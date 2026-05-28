// ============================================================
// server.js — Session 4: JWT Authentication
// ============================================================
// NEW in this session:
//   - /api/auth/login route (public — no token needed)
//   - /api/orders routes are now PROTECTED (token required)
//   - authenticateToken middleware sits between the path and the handler

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

// NEW: Import auth middleware and auth routes
const authenticateToken = require('./middleware/auth')
const authRoutes = require('./routes/authRoutes.js')
const orderRoutes = require('./routes/orderRoutes.js')

const app = express()

// CORS (from Session 3)
// const corsOptions = {
//   origin: '*',
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   preflightContinue: false,
//   optionsSuccessStatus: 204,
// }
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

// --- Routes ---
// Welcome (public)
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Gelos Grocery API' })
})

// Auth routes (public — you can't require a token to GET a token!)
app.use('/api/auth', authRoutes)

// Order routes (PROTECTED — token required)
// Notice the 3 arguments: path, middleware, router
// Express runs them left-to-right:
//   1. Match path "/api/orders"
//   2. Run authenticateToken (checks JWT)
//   3. If token valid → run orderRoutes handlers
//   4. If token invalid → authenticateToken sends 401/403, never reaches orderRoutes
//authenticateToken,
app.use('/api/orders', orderRoutes)

// Start server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

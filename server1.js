const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
}
app.use(cors(corsOptions))

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err))

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Gelos Grocery API' })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

// ============================================================
// server.js — Session 1: Basic Express Server + MongoDB
// ============================================================
// This file does 3 things:
//   1. Creates an Express web server
//   2. Connects to MongoDB using Mongoose
//   3. Sets up a welcome route to confirm everything works

// --- STEP 1: Import packages ---
// require() loads packages we installed with npm
// const express = require('express') // Web framework
// const mongoose = require('mongoose') // MongoDB object modelling
// require('dotenv').config() // Loads .env file into process.env

// --- STEP 2: Create the Express app ---
// express() creates an application object — this IS your server
// const app = express()

// --- STEP 3: Add middleware ---
// Middleware runs on EVERY request before your route handlers
// express.json() parses incoming JSON request bodies
// Without this, req.body would be undefined when clients send JSON
// app.use(express.json())

// --- STEP 4: Connect to MongoDB ---
// mongoose.connect() opens a connection to your Atlas database
// The connection string comes from your .env file
// .then() runs if connection succeeds
// .catch() runs if connection fails
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => console.log('Connected to MongoDB'))
//   .catch(err => console.error('MongoDB connection error:', err))

// --- STEP 5: Create a welcome route ---
// app.get(path, handler) — responds to GET requests at that path
// req = incoming request, res = outgoing response
// res.json() sends a JSON response back to the client
// app.get('/', (req, res) => {
//   res.json({ message: 'Welcome to Gelos Grocery API' })
// })

// --- STEP 6: Start the server ---
// app.listen() makes the server start accepting requests
// PORT comes from .env (3000), or defaults to 3000 if not set
// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`)
// })

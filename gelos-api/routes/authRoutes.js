// ============================================================
// routes/auth.js — Session 5: Login endpoint with Swagger annotation
// ============================================================
// This file ISSUES tokens (vs. middleware/auth.js which VERIFIES them).
// In Session 4 you wrote the route handler. In Session 5 we add the
// JSDoc @swagger comment so it appears in the /api-docs page.

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login to get a JWT token
 *     description: Send username and password to receive a bearer token.
 *       Copy the returned token and paste it into the green "Authorize"
 *       button at the top of this docs page to unlock protected endpoints.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "Gelos2026!"
 *     responses:
 *       200:
 *         description: Token returned
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body

  // --- Step 1: Check the credentials ---
  // (Hardcoded for the tutorial; Session 6 replaces this with a DB lookup.)
  if (username === 'admin' && password === 'Gelos2026!') {
    // --- Step 2: Sign the token ---
    // The password was used to verify the user, then discarded.
    // It is NEVER placed inside the JWT payload.
    const token = jwt.sign(
      { username: username, role: 'manager' },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )
    res.json({ token: token })
  } else {
    res.status(401).json({ error: 'Invalid credentials' })
  }
})

module.exports = router

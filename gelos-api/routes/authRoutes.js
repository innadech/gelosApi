// ============================================================
// routes/auth.js — Session 6: Production Login
// ============================================================
// WHAT CHANGED FROM SESSION 4:
//   Session 4: Hardcoded username/password check
//   Session 6: Checks credentials against the Employees collection
//
// HOW IT WORKS:
//   1. Client sends { username, password }
//   2. We search the Employees collection for that username
//   3. If found AND password matches → generate JWT
//   4. If not found or wrong password → 401 error

const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const Employee = require('../models/Employee')

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with employee credentials
 *     description: Authenticates against the Employees collection and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "Jam21"
 *               password:
 *                 type: string
 *                 example: "Axgp231@!"
 *     responses:
 *       200:
 *         description: Token returned
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', async (req, res) => {
  const { username, password } = req.body

  try {
    // --- Step 1: Find employee by username ---
    // We search the Employees collection for a matching Username field
    const employee = await Employee.findOne({ Username: username })

    // --- Step 2: Validate ---
    // If no employee found, or password doesn't match → reject
    if (!employee || employee.Password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' })
    }

    // --- Step 3: Generate JWT with employee info ---
    const token = jwt.sign(
      {
        empId: employee.Empid,
        username: employee.Username,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    )

    // --- Step 4: Send token ---
    res.json({
      message: `Welcome ${employee.Username}`,
      token: token,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

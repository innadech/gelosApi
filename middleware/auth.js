// ============================================================
// middleware/auth.js - Session 4: JWT Verification Middleware
// ============================================================
// This middleware runs BEFORE protected route handlers.
// It checks the Authorization header for a valid JWT.
//
// Flow:
//   1. Look at the Authorization header (format: "Bearer <token>")
//   2. If no token sent              -> 401 Unauthorized
//   3. If token is invalid/expired   -> 403 Forbidden
//   4. If token is valid             -> attach decoded payload to req.user, call next()

const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  // Read the Authorization header. Header names are case-insensitive
  // in HTTP, so we use lowercase to be safe.
  const authHeader = req.headers['authorization']

  // The header looks like: "Bearer eyJhbGci..."
  // We split on the space and take [1] to get just the token part.
  // The "authHeader && ..." guards against the header being missing.
  const token = authHeader && authHeader.split(' ')[1]

  // No token at all -> 401 (you did not identify yourself).
  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' })
  }

  // Try to verify the token's signature against JWT_SECRET.
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // route handler can now see who logged in
    next() // pass control to the next middleware / route
  } catch (err) {
    // Token was sent but signature is bad, or it has expired -> 403.
    res.status(403).json({ error: 'Invalid or expired token.' })
  }
}

module.exports = authenticateToken

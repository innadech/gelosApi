// ============================================================
// cors-test-server.js — Serves the CORS test client on port 5500
// ============================================================
// This creates a DIFFERENT ORIGIN from your API (port 3000).
// Different port = different origin = browser enforces CORS.
//
// Usage:
//   1. Make sure your API is running on port 3000 (npm run dev)
//   2. Run this: node cors-test-server.js
//   3. Open http://localhost:5500 in your browser
//   4. Open DevTools (F12) → Network tab to watch pre-flight requests
//
// Origin comparison:
//   This client: http://localhost:5500   ← different port!
//   Your API:    http://localhost:3000   ← different port!
//   Result: Browser enforces CORS on every API call

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 5500;
const FILE = path.join(__dirname, "cors-test-client.html");

const server = http.createServer((req, res) => {
  // Serve the HTML file for any request
  fs.readFile(FILE, (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end("Error loading cors-test-client.html");
      return;
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  });
});

server.listen(PORT, () => {
  console.log(`\n  🧪 CORS Test Client running at:`);
  console.log(`     http://localhost:${PORT}\n`);
  console.log(`  Your API should be running at:`);
  console.log(`     http://localhost:3000\n`);
  console.log(`  Different ports = different origins = CORS enforced!\n`);
  console.log(`  Open DevTools (F12) → Network tab to see OPTIONS pre-flight\n`);
});

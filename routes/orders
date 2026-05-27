// ============================================================
// routes/orders.js — Session 5: CRUD + Swagger Annotations
// ============================================================
// NEW: Each route now has a JSDoc @swagger comment block above it.
// swagger-jsdoc reads these comments and generates the API docs.
//
// IMPORTANT: The field names below ("OrderNo", "OrderDate",
// "ModeOfPayment", etc.) must match the EXACT spelling in your
// Mongoose schema (models/Order.js) — PascalCase, no spaces, no dots.
// If any field name differs by even one character, Mongoose will
// reject the request with "Path `X` is required" validation errors.

const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     description: Returns every order document from the orders collection
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of all orders
 *       401:
 *         description: No token provided
 *       500:
 *         description: Server error
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/**
 * @swagger
 * /api/orders/{orderNo}:
 *   get:
 *     summary: Get a single order
 *     description: Returns one order matching the given order number
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNo
 *         required: true
 *         description: The order number (e.g., 1001)
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order found
 *       404:
 *         description: Order not found
 *       401:
 *         description: No token provided
 */
router.get('/:orderNo', async (req, res) => {
  try {
    const order = await Order.findOne({
      OrderNo: parseInt(req.params.orderNo),
    })
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     description: Adds a new order document to the collection. Field
 *       names use the EXACT spelling from the MongoDB collection.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - "OrderNo"
 *               - "OrderDate"
 *               - "CustNo"
 *               - "ProductCode"
 *               - "ProductName"
 *               - "ProductQuantity"
 *               - "ProductPrice"
 *               - "Total"
 *               - "ModeOfPayment"
 *             properties:
 *               "OrderNo":
 *                 type: integer
 *                 example: 2001
 *               "OrderDate":
 *                 type: string
 *                 example: "21/04/2026"
 *               "CustNo":
 *                 type: integer
 *                 example: 1234567890
 *               "ProductCode":
 *                 type: integer
 *                 example: 1
 *               "ProductName":
 *                 type: string
 *                 example: "Edible oil"
 *               "ProductQuantity":
 *                 type: integer
 *                 example: 5
 *               "ProductPrice":
 *                 type: integer
 *                 example: 90
 *               "Total":
 *                 type: integer
 *                 example: 450
 *               "ModeOfPayment":
 *                 type: string
 *                 example: "Cash"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Validation error (missing required fields)
 *       401:
 *         description: No token provided
 */
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body)
    const saved = await order.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * @swagger
 * /api/orders/{orderNo}:
 *   put:
 *     summary: Replace an entire order
 *     description: Replaces all fields of the order with the provided data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNo
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Order replaced successfully
 *       404:
 *         description: Order not found
 *       400:
 *         description: Validation error
 */
router.put('/:orderNo', async (req, res) => {
  try {
    const order = await Order.findOneAndReplace(
      { OrderNo: parseInt(req.params.orderNo) },
      req.body,
      { new: true, runValidators: true },
    )
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * @swagger
 * /api/orders/{orderNo}:
 *   patch:
 *     summary: Update specific fields of an order
 *     description: Updates only the fields included in the request body
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNo
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *           example:
 *             "ProductQuantity": 10
 *             "Total": 900
 *     responses:
 *       200:
 *         description: Order updated successfully
 *       404:
 *         description: Order not found
 */
router.patch('/:orderNo', async (req, res) => {
  try {
    const order = await Order.findOneAndUpdate(
      { OrderNo: parseInt(req.params.orderNo) },
      { $set: req.body },
      { new: true, runValidators: true },
    )
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

/**
 * @swagger
 * /api/orders/{orderNo}:
 *   delete:
 *     summary: Delete an order
 *     description: Removes the order from the collection and returns it
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderNo
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Order deleted successfully
 *       404:
 *         description: Order not found
 */
router.delete('/:orderNo', async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      OrderNo: parseInt(req.params.orderNo),
    })
    if (!order) {
      return res.status(404).json({ error: 'Order not found' })
    }
    res.json({ message: 'Order deleted successfully', order })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

// const express = require('express')
// const router = express.Router()
// const Order = require('../models/Order')

// router.get('/', async (req, res) => {
//   try {
//     const orders = await Order.find()
//     res.json(orders)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// router.get('/:orderNo', async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       OrderNo: parseInt(req.params.orderNo),
//     })
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' })
//     }
//     res.json(order)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// router.post('/', async (req, res) => {
//   try {
//     const order = new Order(req.body)
//     const saved = await order.save()
//     res.status(201).json(saved)
//   } catch (err) {
//     // 400 = Bad Request (e.g., missing required fields)
//     res.status(400).json({ error: err.message })
//   }
// })

// router.put('/:orderNo', async (req, res) => {
//   try {
//     const order = await Order.findOneAndReplace(
//       { 'OrderNo.': parseInt(req.params.orderNo) },
//       req.body,
//       { new: true, runValidators: true },
//     )
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' })
//     }
//     res.json(order)
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// })

// router.patch('/:orderNo', async (req, res) => {
//   try {
//     const order = await Order.findOneAndUpdate(
//       { 'OrderNo.': parseInt(req.params.orderNo) },
//       { $set: req.body },
//       { new: true, runValidators: true },
//     )
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' })
//     }
//     res.json(order)
//   } catch (err) {
//     res.status(400).json({ error: err.message })
//   }
// })

// router.delete('/:orderNo', async (req, res) => {
//   try {
//     const order = await Order.findOneAndDelete({
//       'OrderNo.': parseInt(req.params.orderNo),
//     })
//     if (!order) {
//       return res.status(404).json({ error: 'Order not found' })
//     }
//     res.json({ message: 'Order deleted successfully', order })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// })

// module.exports = router

// ============================================================
// routes/orders.js — Session 2: CRUD Endpoints
// ============================================================
// This file creates ALL the API endpoints for the orders collection.
//
// REST convention:
//   GET    /api/orders        → Read all orders
//   GET    /api/orders/:id    → Read one order
//   POST   /api/orders        → Create a new order
//   PUT    /api/orders/:id    → Replace an entire order
//   PATCH  /api/orders/:id    → Update specific fields
//   DELETE /api/orders/:id    → Delete an order
//
// We use Express Router to group these routes together,
// then mount them in server.js at the /api/orders path.

// Import the Order model — this gives us database methods
// const Order = require("../models/Order");

// ────────────────────────────────────────────────────────────
// GET /api/orders — Return ALL orders
// ────────────────────────────────────────────────────────────
// Order.find() with no filter returns every document
// async/await: we WAIT for MongoDB to respond before continuing
// try/catch: if anything goes wrong, send a 500 error
// router.get("/", async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// ────────────────────────────────────────────────────────────
// GET /api/orders/:orderNo — Return ONE order
// ────────────────────────────────────────────────────────────
// :orderNo is a URL parameter — e.g., /api/orders/1001
// req.params.orderNo captures "1001" as a STRING
// parseInt() converts it to a NUMBER (because OrderNo. is Number type)
// findOne() returns the first matching document, or null
// router.get("/:orderNo", async (req, res) => {
//   try {
//     const order = await Order.findOne({
//       "OrderNo.": parseInt(req.params.orderNo)
//     });
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// ────────────────────────────────────────────────────────────
// POST /api/orders — Create a NEW order
// ────────────────────────────────────────────────────────────
// The client sends order data in the request BODY (as JSON)
// req.body contains the parsed JSON (thanks to express.json() middleware)
// new Order(req.body) creates a Mongoose document from the data
// .save() writes it to MongoDB
// Status 201 = "Created" (not 200, which means "OK" for reads)
// router.post("/", async (req, res) => {
//   try {
//     const order = new Order(req.body);
//     const saved = await order.save();
//     res.status(201).json(saved);
//   } catch (err) {
//     // 400 = Bad Request (e.g., missing required fields)
//     res.status(400).json({ error: err.message });
//   }
// });

// ────────────────────────────────────────────────────────────
// PUT /api/orders/:orderNo — REPLACE an entire order
// ────────────────────────────────────────────────────────────
// PUT means "replace the whole document with this new one"
// findOneAndReplace():
//   - 1st arg: filter (which document to find)
//   - 2nd arg: replacement (the new complete document)
//   - { new: true } = return the UPDATED document (not the old one)
//   - { runValidators: true } = check the schema rules
// router.put("/:orderNo", async (req, res) => {
//   try {
//     const order = await Order.findOneAndReplace(
//       { "OrderNo.": parseInt(req.params.orderNo) },
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.json(order);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// ────────────────────────────────────────────────────────────
// PATCH /api/orders/:orderNo — UPDATE specific fields
// ────────────────────────────────────────────────────────────
// PATCH means "change only the fields I'm sending, keep the rest"
// findOneAndUpdate() with $set operator:
//   - $set: req.body → only updates the fields present in the body
//   - If body is { "Product Quantity": 10 }, only that field changes
//
// PUT vs PATCH:
//   PUT   = send the COMPLETE object (all fields)
//   PATCH = send only the fields you want to change
// router.patch("/:orderNo", async (req, res) => {
//   try {
//     const order = await Order.findOneAndUpdate(
//       { "OrderNo.": parseInt(req.params.orderNo) },
//       { $set: req.body },
//       { new: true, runValidators: true }
//     );
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.json(order);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//   }
// });

// ────────────────────────────────────────────────────────────
// DELETE /api/orders/:orderNo — Remove an order
// ────────────────────────────────────────────────────────────
// findOneAndDelete() removes the document and returns it
// We return the deleted order so the client knows what was removed
// router.delete("/:orderNo", async (req, res) => {
//   try {
//     const order = await Order.findOneAndDelete({
//       "OrderNo.": parseInt(req.params.orderNo)
//     });
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }
//     res.json({ message: "Order deleted successfully", order });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// --- Export the router ---
// server.js will import this and mount it at /api/orders
// module.exports = router;

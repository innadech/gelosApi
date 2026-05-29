// ============================================================
// routes/orders.js — Session 6: CRUD with Authentication
// ============================================================
// All routes here are protected by authenticateToken, which is
// applied at the app.use() level in server.js. Any logged-in
// employee with a valid JWT can call any of these endpoints.

const express = require('express')
const router = express.Router()
const Order = require('../models/Order')

// ────────────────────────────────────────────────────────────
// GET /api/orders
// ────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Array of all orders
 */
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find()
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ────────────────────────────────────────────────────────────
// GET /api/orders/:orderNo
// ────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/orders/{orderNo}:
 *   get:
 *     summary: Get a single order
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
 *         description: Order found
 *       404:
 *         description: Order not found
 */
router.get('/:orderNo', async (req, res) => {
  try {
    const order = await Order.findOne({ OrderNo: parseInt(req.params.orderNo) })
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ────────────────────────────────────────────────────────────
// POST /api/orders
// ────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Create a new order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Order created
 *       400:
 *         description: Validation error
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

// ────────────────────────────────────────────────────────────
// PUT /api/orders/:orderNo
// ────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/orders/{orderNo}:
 *   put:
 *     summary: Replace an entire order
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
 *         description: Order replaced
 *       404:
 *         description: Order not found
 */
router.put('/:orderNo', async (req, res) => {
  try {
    const order = await Order.findOneAndReplace(
      { OrderNo: parseInt(req.params.orderNo) },
      req.body,
      { new: true, runValidators: true },
    )
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// ────────────────────────────────────────────────────────────
// PATCH /api/orders/:orderNo
// ────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/orders/{orderNo}:
 *   patch:
 *     summary: Update specific fields
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
 *         description: Order updated
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
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// ────────────────────────────────────────────────────────────
// DELETE /api/orders/:orderNo
// ────────────────────────────────────────────────────────────
/**
 * @swagger
 * /api/orders/{orderNo}:
 *   delete:
 *     summary: Delete an order
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
 *         description: Order deleted
 *       404:
 *         description: Order not found
 */
router.delete('/:orderNo', async (req, res) => {
  try {
    const order = await Order.findOneAndDelete({
      OrderNo: parseInt(req.params.orderNo),
    })
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json({
      message: 'Order deleted successfully',
      deletedBy: req.user.username,
      order,
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

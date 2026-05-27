const express = require('express')
const router = express.Router()
const Product = require('../models/Product')

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.get('/:ProductCode', async (req, res) => {
  try {
    const product = await Product.findOne({
      ProductCode: parseInt(req.params.ProductCode),
    })
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const product = new Product(req.body)
    const saved = await product.save()
    res.status(201).json(saved)
  } catch (err) {
    // 400 = Bad Request (e.g., missing required fields)
    res.status(400).json({ error: err.message })
  }
})

router.put('/:ProductCode', async (req, res) => {
  try {
    const product = await Product.findOneAndReplace(
      { ProductCode: parseInt(req.params.ProductCode) },
      req.body,
      { new: true, runValidators: true },
    )
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.patch('/:ProductCode', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { ProductCode: parseInt(req.params.ProductCode) },
      { $set: req.body },
      { new: true, runValidators: true },
    )
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json(product)
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

router.delete('/:ProductCode', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      ProductCode: parseInt(req.params.ProductCode),
    })
    if (!product) {
      return res.status(404).json({ error: 'Product not found' })
    }
    res.json({ message: 'Product deleted successfully', product })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router

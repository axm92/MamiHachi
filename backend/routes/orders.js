import express from 'express'
import Order from '../models/Order.js'
 
const router = express.Router()
 
// all orders
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })
    res.json(orders)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch orders' })
  }
})
 
//single order
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
    if (!order) return res.status(404).json({ error: 'Order not found' })
    res.json(order)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order' })
  }
})
 
//place a new order
router.post('/', async (req, res) => {
  try {
    const { items, customerName, customerEmail } = req.body
 
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must have at least one item' })
    }
 
    const total = items.reduce((sum, item) => sum + item.price * item.qty, 0)
 
    const order = new Order({
      items,
      total,
      customerName: customerName || '',
      customerEmail: customerEmail || '',
      status: 'pending'
    })
 
    const saved = await order.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: 'Failed to place order', details: err.message })
  }
})
 
// pdate order status
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Order not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update order', details: err.message })
  }
})
 
// cancel/delete an order
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Order not found' })
    res.json({ message: 'Order deleted', id: req.params.id })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order' })
  }
})
 
export default router
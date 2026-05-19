import express from 'express'
import MenuItem from '../models/MenuItem.js'

const router = express.Router();

//get all menu items
router.get('/', async (req, res) => {
    try {
        const items = await MenuItem.find({available:true});
        res.json(items);
    } catch (err) {
        res.status(500).json({error: 'Failed to fetch menu items'})
    }
})

//getting a single menu item
router.get('/:id', async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id)
    if (!item) return res.status(404).json({ error: 'Item not found' })
    res.json(item)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch item' })
  }
})

//create new menu item
router.post('/', async (req, res) => {
  try {
    const item = new MenuItem(req.body)
    const saved = await item.save()
    res.status(201).json(saved)
  } catch (err) {
    res.status(400).json({ error: 'Failed to create item', details: err.message })
  }
})

//update menu item
router.put('/:id', async (req, res) => {
  try {
    const updated = await MenuItem.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!updated) return res.status(404).json({ error: 'Item not found' })
    res.json(updated)
  } catch (err) {
    res.status(400).json({ error: 'Failed to update item', details: err.message })
  }
})

//delete menu item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await MenuItem.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ error: 'Item not found' })
    res.json({ message: 'Item deleted', id: req.params.id })
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' })
  }
})

//initial items
router.post('/seed', async (req, res) => {
  try {
    await MenuItem.deleteMany({})
    const items = [
      { name: 'Wagyu Patacon', description: 'A5 wagyu steak on fried plantain buns, with pico de gallo, salad, spicy mayo and ajo', price: 18, category: 'mains' },
      { name: 'Chulleta Curry', description: 'Fried Porkchop, white rice, flavorful curry', price: 12, category: 'mains' },
      { name: 'Veggie Ramen', description: 'Tofu, mushrooms, green onion, vegetable base, half egg', price: 14, category: 'mains' },
      { name: 'Matcha Tres Leches', description: 'Spongecake soaked in rich matcha', price: 7, category: 'desserts' },
      { name: 'Dulce de Leche Cheesecake', description: 'Fluffy Japanese cheesecake with caramel', price: 10, category: 'desserts' },
      { name: 'Pina Ramune', description: '', price: 6, category: 'drinks' },
      { name: 'Iced Matcha', description: '', price: 8, category: 'drinks' },
      { name: 'Cafe con Leche', description: '', price: 5, category: 'drinks' },
    ]
    const seeded = await MenuItem.insertMany(items)
    res.status(201).json({ message: `Seeded ${seeded.length} items`, items: seeded })
  } catch (err) {
    res.status(500).json({ error: 'Seed failed', details: err.message })
  }
})
 
export default router
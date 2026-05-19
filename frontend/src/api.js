const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
 
// menu
export async function fetchMenu() {
  const res = await fetch(`${BASE_URL}/menu`)
  if (!res.ok) throw new Error('Failed to fetch menu')
  return res.json()
}
 
export async function seedMenu() {
  const res = await fetch(`${BASE_URL}/menu/seed`, { method: 'POST' })
  if (!res.ok) throw new Error('Failed to seed menu')
  return res.json()
}
 
// orders
export async function placeOrder(orderData) {
  const res = await fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  })
  if (!res.ok) throw new Error('Failed to place order')
  return res.json()
}
 
export async function fetchOrders() {
  const res = await fetch(`${BASE_URL}/orders`)
  if (!res.ok) throw new Error('Failed to fetch orders')
  return res.json()
}
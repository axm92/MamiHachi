import { useState } from 'react'
import Navbar from './components/NavBar'
import Hero from './components/Hero'
import Menu from './components/Menu'
import Gallery from './components/Gallery'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CartPanel from './components/CartPanel'
 
export default function App() {
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
 
  function addToCart(name, price) {
    setCart(prev => {
      const existing = prev.find(i => i.name === name)
      if (existing) {
        return prev.map(i => i.name === name ? { ...i, qty: i.qty + 1 } : i)
      }
      return [...prev, { name, price, qty: 1 }]
    })
  }
 
  function removeOneFromCart(name) {
    setCart(prev => {
      const existing = prev.find(i => i.name === name)
      if (existing.qty === 1) return prev.filter(i => i.name !== name)
      return prev.map(i => i.name === name ? { ...i, qty: i.qty - 1 } : i)
    })
  }
 
  function removeFromCart(name) {
    setCart(prev => prev.filter(i => i.name !== name))
  }
 
  function clearCart() {
    setCart([])
  }
 
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0)
 
  return (
    <div className="bg-[#f5f0e8] text-[#1a1208]">
      <Navbar cartCount={cartCount} onCartOpen={() => setCartOpen(true)} />
      <CartPanel
        cart={cart}
        cartTotal={cartTotal}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onRemoveOne={removeOneFromCart}
        onRemoveAll={removeFromCart}
        onClear={clearCart}
        onOrderPlaced={clearCart}
        onAdd={addToCart}
      />
      <Hero />
      <Menu onAdd={addToCart} />
      <Gallery />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}
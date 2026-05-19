import { useState, useEffect } from 'react'
import { fetchMenu, seedMenu } from '../api'
 
export default function Menu({ onAdd }) {
  const [menuItems, setMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [added, setAdded] = useState({})
 
  useEffect(() => {
    loadMenu()
  }, [])
 
  async function loadMenu() {
    try {
      setLoading(true)
      setError(null)
      const items = await fetchMenu()
 
      // If DB is empty, seed it automatically then reload
      if (items.length === 0) {
        await seedMenu()
        const seeded = await fetchMenu()
        setMenuItems(seeded)
      } else {
        setMenuItems(items)
      }
    } catch (err) {
      setError('Could not load menu. Is the server running?')
    } finally {
      setLoading(false)
    }
  }
 
  function handleAdd(name, price) {
    onAdd(name, price)
    setAdded(prev => ({ ...prev, [name]: true }))
    setTimeout(() => setAdded(prev => ({ ...prev, [name]: false })), 1000)
  }
 
  return (
    <section id="menu" className="bg-[#1a1208] text-[#f5f0e8] py-28 px-8 md:px-16">
      <p className="text-xs tracking-[0.35em] uppercase text-[#d4a843] mb-2">Curated Selections</p>
      <h2 className="font-serif text-4xl md:text-5xl font-light mb-2">
        Our <em className="italic text">Menu</em>
      </h2>
      <div className="w-14 h-px bg-[#d4a843] mt-4 mb-12" />
 
      {loading && (
        <div className="text-[#f5f0e8]/40 text-sm tracking-widest uppercase animate-pulse py-10 text-center">
          Loading menu...
        </div>
      )}
 
      {error && (
        <div className="text-[#ba1818] text-sm py-10 text-center">
          {error}
          <button onClick={loadMenu} className="block mx-auto mt-3 border border-[#ba1818] text-[#ba1818] px-4 py-1.5 text-xs uppercase tracking-widest hover:bg-[#ba1818] hover:text-white transition-all">
            Retry
          </button>
        </div>
      )}
 
      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          {menuItems.map(item => (
            <div key={item._id}
              className="flex justify-between items-start px-4 py-5 border-b border-[#f5f0e8]/07 hover:bg-[#f5f0e8]/03 transition-colors duration-200 gap-4">
              <div className="flex-1">
                <h4 className="font-serif text-lg font-normal mb-1">{item.name}</h4>
                {item.description && (
                  <p className="text-xs text-[#f5f0e8]/50 leading-relaxed max-w-xs">{item.description}</p>
                )}
                <button
                  onClick={() => handleAdd(item.name, item.price)}
                  className={`mt-3 px-3 py-1 text-[10px] uppercase tracking-widest border transition-all duration-200
                    ${added[item.name]
                      ? 'bg-[#4a5240] border-[#4a5240] text-[#f5f0e8]'
                      : 'border-[#d4a843]/30 text-[#d4a843]/70 hover:bg-[#d4a843] hover:border-[#d4a843] hover:text-[#1a1208]'
                    }`}>
                  {added[item.name] ? '✓ Added' : '+ Add to Cart'}
                </button>
              </div>
              <span className="font-serif text-[#d4a843] text-lg flex-shrink-0">${item.price}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
import { useState } from 'react'
import { placeOrder } from '../api'
 
export default function CartPanel({ cart, cartTotal, isOpen, onClose, onRemoveOne, onRemoveAll, onClear, onOrderPlaced, onAdd }) {
  const [placing, setPlacing] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderError, setOrderError] = useState(null)
 
  async function handleCheckout() {
    try {
      setPlacing(true)
      setOrderError(null)
      await placeOrder({ items: cart, total: cartTotal })
      setOrderSuccess(true)
      setTimeout(() => {
        setOrderSuccess(false)
        onOrderPlaced()
        onClose()
      }, 2000)
    } catch (err) {
      setOrderError('Failed to place order. Please try again.')
    } finally {
      setPlacing(false)
    }
  }
 
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-[#1a1208]/60 z-50 backdrop-blur-sm" onClick={onClose} />
      )}
 
      {/* Panel */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-full bg-[#2c2416] text-[#f5f0e8] z-50 flex flex-col
        border-l border-[#d4a843]/15 transition-transform duration-400 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
 
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#d4a843]/15">
          <h3 className="font-serif text-[#d4a843] text-xl font-light tracking-wide">Your Order</h3>
          <button onClick={onClose} className="text-[#f5f0e8]/40 hover:text-[#f5f0e8] transition-colors text-lg">✕</button>
        </div>
 
        {/* Body */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {orderSuccess ? (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">✅</div>
              <p className="text-[#d4a843] font-serif text-xl mb-2">Order Placed!</p>
              <p className="text-[#f5f0e8]/50 text-xs tracking-wide">Saved to database.</p>
            </div>
          ) : cart.length === 0 ? (
            <div className="text-center py-16 text-[#f5f0e8]/30">
              <div className="text-4xl mb-3 opacity-30">🛒</div>
              <p className="text-sm tracking-wide">Your cart is empty.<br />Add items from the menu.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.name} className="flex justify-between items-center py-3 border-b border-[#f5f0e8]/07 gap-3">
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-[#f5f0e8] text-sm leading-snug">{item.name}</div>
                  <div className="text-[#f5f0e8]/40 text-xs mt-0.5">× {item.qty} · ${(item.price * item.qty).toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={() => onRemoveOne(item.name)}
                    className="w-6 h-6 border border-[#d4a843]/30 text-[#d4a843]/60 hover:bg-[#d4a843] hover:text-[#1a1208] hover:border-[#d4a843] transition-all text-sm flex items-center justify-center">
                    −
                  </button>
                  <span className="text-[#d4a843] font-serif text-sm w-4 text-center">{item.qty}</span>
                  <button onClick={() => onAdd(item.name, item.price)}
                    className="w-6 h-6 border border-[#d4a843]/30 text-[#d4a843]/60 hover:bg-[#d4a843] hover:text-[#1a1208] hover:border-[#d4a843] transition-all text-sm flex items-center justify-center">
                    +
                  </button>
                  <button onClick={() => onRemoveAll(item.name)}
                    className="w-5 h-5 border border-[#ba1818]/30 text-[#ba1818]/50 hover:bg-[#ba1818] hover:text-white hover:border-[#ba1818] transition-all text-xs flex items-center justify-center ml-1">
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
 
          {orderError && (
            <p className="text-[#ba1818] text-xs text-center mt-4">{orderError}</p>
          )}
        </div>
 
        {/* Footer */}
        <div className="px-6 py-5 border-t border-[#d4a843]/15">
          <div className="flex justify-between items-baseline mb-4">
            <span className="text-xs uppercase tracking-widest text-[#f5f0e8]/40">Total</span>
            <span className="font-serif text-[#d4a843] text-2xl font-light">${cartTotal.toFixed(2)}</span>
          </div>
          {cart.length > 0 && !orderSuccess && (
            <div className="flex flex-col gap-2">
              <button onClick={handleCheckout} disabled={placing}
                className="w-full bg-[#ba1818] text-[#f5f0e8] py-3 text-xs uppercase tracking-widest hover:bg-[#d4a843] hover:text-[#1a1208] transition-colors duration-200 disabled:opacity-50">
                {placing ? 'Placing Order...' : 'Proceed to Checkout'}
              </button>
              <button onClick={onClear}
                className="w-full border border-[#f5f0e8]/10 text-[#f5f0e8]/35 py-2.5 text-xs uppercase tracking-widest hover:border-[#ba1818] hover:text-[#ba1818] transition-all duration-200">
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
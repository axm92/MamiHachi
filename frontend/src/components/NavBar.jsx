import { useState, useEffect } from 'react'

export default function NavBar({ cartCount, onCartOpen }) 
{
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => 
  {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['home', 'menu', 'gallery', 'about', 'contact']

  function closeMenu() 
  {
    setMenuOpen(false)
    document.body.style.overflow = ''
  }

  function toggleMenu() 
  {
    const next = !menuOpen
    setMenuOpen(next)
    document.body.style.overflow = next ? 'hidden' : ''
  }

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 transition-all duration-300
        ${scrolled ? 'py-3' : 'py-4'} bg-[#1a1208] border-b border-[#d4a843]/20`}>

        <a href="#home" className="font-serif text-[#d4a843] text-2xl tracking-wide">
          Mami <span className="italic text-[#d4a843]">Hachi</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 list-none">
          {links.map(link => 
          (
            <li key={link}>
              <a href={`#${link}`}
                className="text-[#f5f0e8] text-xs uppercase tracking-widest hover:text-[#d4a843] transition-colors duration-200">
                {link}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: cart + hamburger */}
        <div className="flex items-center gap-3">
          <button onClick={onCartOpen}
            className="relative border border-[#d4a843]/40 text-[#f5f0e8] w-10 h-10 flex items-center justify-center hover:border-[#d4a843] hover:text-[#d4a843] transition-all duration-200 text-base">
            🛒
            {cartCount > 0 && 
            (
              <span className="absolute -top-1.5 -right-1.5 bg-[#ba1818] text-[#f5f0e8] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button onClick={toggleMenu}
            className="md:hidden flex flex-col gap-1.5 p-1 bg-transparent border-none cursor-pointer">
            <span className={`block w-6 h-0.5 bg-[#f5f0e8] transition-all duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#f5f0e8] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#f5f0e8] transition-all duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && 
      (
        <div className="fixed inset-0 bg-[#1a1208]/97 z-40 flex flex-col items-center justify-center gap-10">
          {links.map(link => 
          (
            <a key={link} href={`#${link}`} onClick={closeMenu}
              className="font-serif text-[#f5f0e8] text-4xl hover:text-[#d4a843] transition-colors duration-300 capitalize">
              {link}
            </a>
          ))}
        </div>
      )}
    </>
  )
}

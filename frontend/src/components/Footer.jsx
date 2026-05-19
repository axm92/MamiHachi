export default function Footer() {
  return (
    <footer className="bg-[#1a1208] text-[#f5f0e8] px-8 md:px-16 pt-14 pb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-[#f5f0e8]/08">
        <div>
          <a href="#home" className="font-serif text-[#d4a843] text-2xl tracking-wide block mb-3">
            Mami <span className="italic text-[#ba1818]">Hachi</span>
          </a>
          <p className="text-sm text-[#f5f0e8]/50 leading-relaxed max-w-xs">
            A fusion dining experience in the heart of Midtown Manhattan.
          </p>
          <div className="flex gap-3 mt-5">
            {['f', '◎'].map((icon, i) => (
              <a key={i} href="#"
                className="w-9 h-9 border border-[#f5f0e8]/15 flex items-center justify-center text-[#f5f0e8]/55 text-sm hover:border-[#d4a843] hover:text-[#d4a843] transition-all duration-200">
                {icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h5 className="text-[10px] uppercase tracking-widest text-[#d4a843] mb-4">Hours</h5>
          <ul className="space-y-1.5 text-sm text-[#f5f0e8]/55">
            <li className="flex justify-between gap-4"><span>Mon–Thur</span><span>10am–11pm</span></li>
            <li className="flex justify-between gap-4"><span>Fri–Sun</span><span>12pm–12am</span></li>
          </ul>
        </div>

        <div>
          <h5 className="text-[10px] uppercase tracking-widest text-[#d4a843] mb-4">Navigate</h5>
          <ul className="space-y-1.5 text-sm text-[#f5f0e8]/55">
            {['home', 'menu', 'gallery', 'about', 'contact'].map(link => (
              <li key={link}>
                <a href={`#${link}`} className="hover:text-[#d4a843] transition-colors capitalize">{link}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center pt-6 text-xs text-[#f5f0e8]/30 gap-2">
        <span>© 2026 Mami Hachi. All rights reserved.</span>
        <span>Where Latin America meets Japan.</span>
      </div>
    </footer>
  )
}
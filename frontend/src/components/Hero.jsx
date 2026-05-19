export default function Hero() {
  return (
    <section id="home" className="h-screen relative flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0"
        style={{
          background: `linear-gradient(160deg, rgba(26,18,8,0.75) 0%, rgba(200,98,26,0.18) 50%, rgba(26,18,8,0.88) 100%),
            url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=80') center/cover no-repeat`
        }} />
      <div className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(26,18,8,0.6) 100%)' }} />

      <div className="relative text-center text-[#f5f0e8] animate-fade-up">
        <p className="text-xs tracking-[0.35em] uppercase text-[#d4a843] mb-5">Est. 2026 · Midtown</p>
        <h1 className="font-serif font-light leading-none mb-2" style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}>
          Mami<br /><em className="italic text-[#d4a843]">Hachi</em>
        </h1>
        <p className="text-sm tracking-widest opacity-75 mt-4 italic">
          Where the flavors of Latin America meet Japan
        </p>
        <a href="#menu"
          className="inline-block mt-10 px-10 py-3.5 border border-[#d4a843] text-[#d4a843] text-xs uppercase tracking-widest hover:bg-[#d4a843] hover:text-[#1a1208] transition-all duration-300">
          Explore our menu
        </a>
      </div>

      
    </section>
  )
}

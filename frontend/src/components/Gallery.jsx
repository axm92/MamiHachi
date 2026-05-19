import { useState } from 'react'

const images = [
  { src: 'https://www.indulgewithmimi.com/wp-content/uploads/2025/07/japanese-tres-leches-with-matcha-powder-735x735.jpg', alt: 'Matcha Tres Leches' },
  { src: 'https://www.fsrmagazine.com/wp-content/uploads/2023/07/blendingworlds.jpg', alt: 'Fusion dish' },
  { src: 'https://www.cookeatworld.com/wp-content/uploads/2025/02/Katsu-Curry-1.jpg', alt: 'Katsu Curry' },
  { src: 'https://images.303magazine.com/uploads/2020/07/Toro_303Mag_ABonecutter-13.jpg', alt: 'Restaurant interior' },
  { src: 'https://www.mycolombianrecipes.com/wp-content/uploads/2013/11/patacones-con-carne-desmachada.jpg', alt: 'Patacon' },
  { src: 'https://yamashirohollywood.com/tokyo_admin/asset/uploads/465/cta/the-magic-of-yamashiro-hollywood--1--c--1-.jpg', alt: 'Ambiance' },
]

export default function Gallery() {
  const [current, setCurrent] = useState(0)

  function goTo(index) {
    if (index < 0) index = images.length - 1
    if (index >= images.length) index = 0
    setCurrent(index)
  }

  return (
    <section id="gallery" className="bg-[#e8dcc8] py-28 px-8 md:px-16">
      <h2 className="font-serif text-4xl md:text-5xl font-light mb-2">
        Our <em className="italic text-4x1">Gallery</em>
      </h2>
      <div className="w-14 h-px bg-[#d4a843] mt-4 mb-8" />

      <div className="overflow-hidden mt-4">
        <div className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((img, i) => (
            <div key={i} className="min-w-full flex-shrink-0">
              <img src={img.src} alt={img.alt}
                className="w-full object-cover object-center"
                style={{ height: '480px' }} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center items-center gap-5 mt-6">
        <button onClick={() => goTo(current - 1)}
          className="w-11 h-11 border border-[#ba1818] text-[#ba1818] hover:bg-[#ba1818] hover:text-[#f5f0e8] transition-all duration-200 text-lg">
          ←
        </button>
        <div className="flex gap-2">
          {images.map((_, i) => (
            <button key={i} onClick={() => goTo(i)}
              className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${i === current ? 'bg-[#ba1818]' : 'bg-[#ba1818]/30'}`} />
          ))}
        </div>
        <button onClick={() => goTo(current + 1)}
          className="w-11 h-11 border border-[#ba1818] text-[#ba1818] hover:bg-[#ba1818] hover:text-[#f5f0e8] transition-all duration-200 text-lg">
          →
        </button>
      </div>
    </section>
  )
}
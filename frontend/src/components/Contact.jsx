import { useState } from 'react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit() {
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="bg-[#2c2416] text-[#f5f0e8] py-28 px-8 md:px-16">
      <p className="text-xs tracking-[0.35em] uppercase text-[#d4a843] mb-2">Find Us</p>
      <h2 className="font-serif text-4xl md:text-5xl font-light text-[#f5f0e8] mb-2">
        Get in <em className="italic text-[#d4a843]">Touch</em>
      </h2>
      <div className="w-14 h-px bg-[#d4a843] mt-4 mb-10" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <div className="w-full h-72 border border-[#d4a843]/20 overflow-hidden mb-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d48360.39175873475!2d-73.98392375000002!3d40.75048770000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25901a4127ca9%3A0xbecdcc9081d6cfdb!2sMidtown%20Manhattan%2C%20New%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1773200721443!5m2!1sen!2sus"
              className="w-full h-full border-0"
              allowFullScreen loading="lazy" />
          </div>
          <div className="space-y-2 text-sm text-[#f5f0e8]/65">
            <p>📍 787 West 52nd Street, New York, NY 10019</p>
            <p>📞 (718) 987-4567</p>
          </div>
        </div>

        <div className="space-y-5">
          {['Your Name', 'Email Address'].map(label => (
            <div key={label}>
              <label className="block text-[10px] uppercase tracking-widest text-[#d4a843] mb-2">{label}</label>
              <input type={label === 'Email Address' ? 'email' : 'text'}
                className="w-full bg-[#f5f0e8]/06 border border-[#d4a843]/20 text-[#0c0801] px-4 py-3 text-sm outline-none focus:border-[#d4a843] transition-colors duration-200" />
            </div>
          ))}
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-[#d4a843] mb-2">Message</label>
            <textarea rows={4}
              className="w-full bg-[#f5f0e8]/06 border border-[#d4a843]/20 text-[#0a0701] px-4 py-3 text-sm outline-none focus:border-[#d4a843] transition-colors duration-200 resize-vertical" />
          </div>
          <button onClick={handleSubmit}
            className={`px-10 py-3 text-xs uppercase tracking-widest transition-all duration-300
              ${sent ? 'bg-[#4a5240] text-[#f5f0e8]' : 'bg-[#ba1818] text-[#070500] hover:bg-[#d4a843] hover:text-[#1a1208]'}`}>
            {sent ? 'Message Sent ✓' : 'Send Message'}
          </button>
        </div>
      </div>
    </section>
  )
}
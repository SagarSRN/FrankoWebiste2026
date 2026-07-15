export default function Contact() {
  return (
    <div className="pt-40 pb-28 max-w-4xl mx-auto px-6 text-center">
      <span className="block text-[12px] tracking-widest2 text-gold mb-4">GET IN TOUCH</span>
      <h1 className="font-display text-4xl md:text-5xl text-teal mb-10">Contact</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left max-w-2xl mx-auto">
        <div>
          <h3 className="font-display text-xl text-teal mb-2">Mumbai Studio</h3>
          <p className="text-sm font-light text-ink/70 leading-relaxed">
            FrankoJulia Creation Pvt Ltd<br />Mumbai, Maharashtra, India
          </p>
        </div>
        <div>
          <h3 className="font-display text-xl text-teal mb-2">Dubai Studio</h3>
          <p className="text-sm font-light text-ink/70 leading-relaxed">
            FrankoJulia FZE<br />Dubai, United Arab Emirates
          </p>
        </div>
      </div>
    </div>
  )
}

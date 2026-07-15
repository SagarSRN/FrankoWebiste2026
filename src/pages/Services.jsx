const SERVICES = [
  { title: 'Design & Engineering', text: 'Concept development, CAD detailing and material specification aligned to brand standards.' },
  { title: 'Manufacturing', text: 'Precision joinery, metal fabrication, glasswork and hand-finishing under one roof.' },
  { title: 'Project Management', text: 'Single point of contact from purchase order to site handover.' },
  { title: 'Installation', text: 'Turnkey install teams covering India, the UAE and the wider Gulf.' },
]

export default function Services() {
  return (
    <div className="pt-40 pb-28 max-w-6xl mx-auto px-6">
      <span className="block text-[12px] tracking-widest2 text-gold mb-4 text-center">CAPABILITIES</span>
      <h1 className="font-display text-4xl md:text-5xl text-teal text-center mb-16">Services</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
        {SERVICES.map((s, i) => (
          <div key={s.title} className="flex gap-6">
            <span className="font-display text-3xl text-gold/60">{String(i + 1).padStart(2, '0')}</span>
            <div>
              <h3 className="font-display text-2xl text-teal mb-2">{s.title}</h3>
              <p className="text-sm font-light text-ink/70 leading-relaxed">{s.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

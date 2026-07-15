import { Link } from 'react-router-dom'

export default function Careers() {
  return (
    <div className="pt-40 pb-28 max-w-5xl mx-auto px-6 text-center">
      <span className="block text-[12px] tracking-widest2 text-gold mb-4">JOIN US</span>
      <h1 className="font-display text-4xl md:text-5xl text-teal mb-6">Careers at FrankoJulia</h1>
      <p className="text-ink/70 font-light leading-relaxed max-w-2xl mx-auto mb-12">
        People. Perfectly placed. We're a design-and-manufacturing team spanning Mumbai
        and Dubai, and we grow by hiring people who care about craft as much as we do.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 text-left">
        {[
          { title: 'Design & Engineering', text: 'CAD detailing, material specification, brand-standard execution.' },
          { title: 'Production', text: 'Joinery, metalwork, finishing and quality control.' },
          { title: 'Client & Project Management', text: 'From proposal through to site handover.' },
        ].map((t) => (
          <div key={t.title}>
            <h3 className="font-display text-xl text-teal mb-2">{t.title}</h3>
            <p className="text-sm font-light text-ink/70 leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>

      <Link
        to="/recruitment"
        className="inline-block border border-teal text-teal text-[12px] tracking-widest2 uppercase px-8 py-4 hover:bg-teal hover:text-cream transition-colors"
      >
        View open roles & apply
      </Link>
    </div>
  )
}

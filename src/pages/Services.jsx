import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Testimonials from '../components/Testimonials.jsx'
import ServicesHero from '../assets/Retail Image/imgi_87_Cad-Showcase-2-225x300.jpg'
import DesignImg from '../assets/Retail Image/imgi_56_Rb-Showcase-1-300x169 5.jpg'
import ManufacturingImg from '../assets/Retail Image/imgi_60_Rb-Showcase-2-768x455.jpg'
import ProjectMgmtImg from '../assets/Retail Image/imgi_87_Cad-Showcase-2-225x300 s.jpg'
import InstallImg from '../assets/Retail Image/imgi_91_Bo-Showcase-5-768x576.jpg'

const SERVICES = [
  { title: 'Design & Engineering', text: 'Concept development, CAD detailing and material specification aligned to brand standards.', img: DesignImg },
  { title: 'Manufacturing', text: 'Precision joinery, metal fabrication, glasswork and hand-finishing under one roof.', img: ManufacturingImg },
  { title: 'Project Management', text: 'Single point of contact from purchase order to site handover.', img: ProjectMgmtImg },
  { title: 'Installation', text: 'Turnkey install teams covering India, the UAE and the wider Gulf.', img: InstallImg },
]

export default function Services() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[420px] flex items-center justify-center overflow-hidden">
        <img
          src={ServicesHero}
          alt="FrankoJulia manufacturing"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
        <div className="relative z-10 text-center text-cream px-6">
          <span className="block text-[12px] tracking-widest2 text-gold mb-4">CAPABILITIES</span>
          <h1 className="font-display text-5xl md:text-6xl">Services</h1>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-28">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {SERVICES.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} className="group relative overflow-hidden h-80">
              <img
                src={s.img}
                alt={s.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute inset-0 p-8 flex flex-col justify-end text-cream">
                <span className="font-display text-3xl text-gold/70 mb-2">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display text-2xl mb-2">{s.title}</h3>
                <p className="text-sm font-light text-cream/85 leading-relaxed max-w-md">{s.text}</p>
              </div>
              <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/60 transition-colors duration-500 pointer-events-none" />
            </Reveal>
          ))}
        </div>
      </section>

      <Testimonials />

      <section className="bg-teal-dark text-cream py-24 text-center px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl mb-6">Have a project in mind?</h2>
          <Link
            to="/contact"
            className="inline-block border border-cream/60 text-cream text-[12px] tracking-widest2 uppercase px-8 py-4
                       hover:bg-cream hover:text-teal-dark transition-colors"
          >
            Start a Conversation
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
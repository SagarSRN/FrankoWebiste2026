import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal.jsx'
import Banner from '../assets/Retail Image/Banner_Aboutus.png'
const STATS = [
  { value: '15+', label: 'Years of Craft' },
  { value: '500+', label: 'Fixtures Delivered' },
  { value: '2', label: 'Countries' },
  { value: '50+', label: 'Brand Partners' },
]

export default function About() {
  return (
    <div>
      {/* Full-bleed hero image */}
      <section className="relative h-[70vh] min-h-[480px] flex items-center justify-center overflow-hidden">
        <img
          src= {Banner}
          alt="FrankoJulia studio"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />
        <div className="relative z-10 text-center text-cream px-6">
          <span className="block text-[12px] tracking-widest2 text-gold mb-4">OUR STORY</span>
          <h1 className="font-display text-5xl md:text-6xl">About FrankoJulia</h1>
        </div>
      </section>

      {/* Intro statement */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <Reveal>
          <p className="text-ink/70 font-light leading-relaxed text-lg">
            FrankoJulia Creation Pvt Ltd is a luxury retail fixture manufacturer with studios in
            Mumbai and Dubai. We partner with premium brands across retail, travel-retail and
            aviation to design and build fixtures that hold up to the standards of the spaces
            they live in.
          </p>
        </Reveal>
      </section>

      {/* Stats band */}
      <section className="bg-teal-dark text-cream py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 100}>
              <div className="font-display text-4xl md:text-5xl text-gold mb-2">{s.value}</div>
              <div className="text-[11px] tracking-widest2 uppercase text-cream/70">{s.label}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Philosophy — image paired with text */}
      <section className="max-w-6xl mx-auto px-6 py-28 grid grid-cols-1 md:grid-cols-2 gap-14 items-center">
        <Reveal className="overflow-hidden">
          <img
            src="https://picsum.photos/id/1060/900/1100"
            alt="Craftsmanship detail"
            className="w-full h-[480px] object-cover transition-transform duration-700 hover:scale-105"
          />
        </Reveal>
        <Reveal delay={150}>
          <span className="block text-[11px] tracking-widest2 uppercase text-gold mb-4">Philosophy</span>
          <h2 className="font-display text-3xl md:text-4xl text-teal mb-6">What we believe</h2>
          <p className="text-ink/70 font-light leading-relaxed mb-4">
            A fixture is the first thing a customer touches. It should feel considered,
            durable and quietly confident — never louder than the product it presents.
          </p>
          <p className="text-ink/70 font-light leading-relaxed">
            Every joint, finish and material choice is made with that principle first —
            long after the launch photos are taken, the fixture still has to perform.
          </p>
        </Reveal>
      </section>

      {/* Studios */}
      <section className="bg-[#F1ECE2] py-28">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal className="text-center mb-16">
            <span className="block text-[11px] tracking-widest2 uppercase text-gold mb-3">Where we work</span>
            <h2 className="font-display text-4xl text-teal">Our Studios</h2>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {[
              {
                city: 'Mumbai, India',
                img: 'https://picsum.photos/id/1031/900/650',
                text: 'Our manufacturing base — design, joinery, metalwork and finishing under one roof, serving clients across India.',
              },
              {
                city: 'Dubai, UAE',
                img: 'https://picsum.photos/id/1076/900/650',
                text: 'Regional delivery and installation, supporting clients across the wider Gulf.',
              },
            ].map((studio, i) => (
              <Reveal key={studio.city} delay={i * 150} className="group relative overflow-hidden">
                <img
                  src={studio.img}
                  alt={studio.city}
                  className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                  <h3 className="font-display text-2xl mb-2">{studio.city}</h3>
                  <p className="text-sm font-light text-cream/80 leading-relaxed">{studio.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-teal-dark text-cream py-24 text-center px-6">
        <Reveal>
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            Let's build something exceptional, together.
          </h2>
          <Link
            to="/contact"
            className="inline-block border border-cream/60 text-cream text-[12px] tracking-widest2 uppercase px-8 py-4
                       hover:bg-cream hover:text-teal-dark transition-colors"
          >
            Get in Touch
          </Link>
        </Reveal>
      </section>
    </div>
  )
}
import Adani from '../assets/brands/Adani.png'
import Bacardi from '../assets/brands/Bacardi.png'
import BeautyFragranceInternational from '../assets/brands/Beauty & Fragrance International.webp'
import BrownForman from '../assets/brands/Belerrages.svg'
import ButlersChoco from '../assets/brands/Butlers Choco.png'
import Bvlgari from '../assets/brands/bvlgari.png'
import Reveal from './Reveal.jsx'

// NOTE: these quotes are placeholder copy so the section renders fully —
// they are NOT real statements from these companies. Replace each `quote`
// with an actual approved testimonial before this goes live; using a real
// brand's name/logo next to a fabricated quote isn't something to ship as-is.
const TESTIMONIALS = [
  {
    brand: 'Adani',
    logo: Adani,
    quote: 'Placeholder — replace with an actual quote from your Adani contact once approved.',
  },
  {
    brand: 'Bacardi',
    logo: Bacardi,
    quote: 'Placeholder — replace with an actual quote from your Bacardi contact once approved.',
  },
  {
    brand: 'Bvlgari',
    logo: Bvlgari,
    quote: 'Placeholder — replace with an actual quote from your Bvlgari contact once approved.',
  },
]

export default function Testimonials() {
  return (
    <section className="bg-[#F1ECE2] py-28">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="block text-[11px] tracking-widest2 uppercase text-gold mb-3">Client Voices</span>
          <h2 className="font-display text-4xl text-teal">What Our Partners Say</h2>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.brand} delay={i * 120} className="bg-cream p-8 flex flex-col items-center text-center border border-ink/5">
              <img src={t.logo} alt={t.brand} className="h-10 w-auto object-contain mb-6" />
              <p className="text-sm font-light text-ink/70 leading-relaxed italic mb-4">
                "{t.quote}"
              </p>
              <span className="text-[11px] tracking-widest2 uppercase text-gold">{t.brand}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
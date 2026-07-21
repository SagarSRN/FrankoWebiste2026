import { useEffect, useRef, useState } from 'react'
import Portfolioimg1 from '../assets/Retail Image/imgi_56_Rb-Showcase-1-300x169 5.jpg'
import Portfolioimg2 from "../assets/Retail Image/imgi_60_Rb-Showcase-2-768x455.jpg"
import Portfolioimg3 from "../assets/Retail Image/imgi_87_Cad-Showcase-2-225x300 s.jpg"
import Portfolioimg4 from '../assets/Retail Image/imgi_87_Cad-Showcase-2-225x300.jpg'
import Portfolioimg5 from '../assets/Retail Image/imgi_88_bvl-Showcase-1-225x300.jpg'
import Portfolioimg6 from '../assets/Retail Image/imgi_91_Bo-Showcase-5-768x576.jpg'

const PROJECTS = [
  { title: "", src: Portfolioimg1 },
  { title: "", src: Portfolioimg2 },
  { title: "", src: Portfolioimg3 },
  { title: "", src: Portfolioimg4 },
  { title: "", src: Portfolioimg5 },
  { title: "", src: Portfolioimg6 },
]

function RevealCard({ project, index }) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold : 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative overflow-hidden aspect-[4/3] transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: visible ? `${index * 90}ms` : '0ms' }}
    >
      <img
        src={project.src}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/60 transition-colors duration-500 flex items-center justify-center">
        <span className="font-display text-xl md:text-2xl text-cream text-center px-6 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-500">
          {project.title}
        </span>
      </div>

      {/* thin gold frame line on hover, for a touch of luxury */}
      <div className="absolute inset-3 border border-gold/0 group-hover:border-gold/60 transition-colors duration-500 pointer-events-none" />
    </div>
  )
}

export default function Portfolio() {
  return (
    <section className="py-24 md:py-28 bg-cream">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="block text-[11px] tracking-widest2 uppercase text-gold mb-3">Selected Work</span>
          <h2 className="font-display text-4xl md:text-5xl text-teal">Our Portfolio</h2>
          <span className="block w-16 h-[2px] bg-gold mx-auto mt-5" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((p, i) => (
            <RevealCard key={i} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
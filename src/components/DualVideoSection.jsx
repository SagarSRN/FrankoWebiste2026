import { Link } from 'react-router-dom'
import video1 from '../assets/Videos/Video 1.mp4'
import video2 from '../assets/Videos/Video 2.mp4'

const PANELS = [
  {
    video: video2,
    eyebrow: 'THE COLLECTION',
    title: 'Retail Fixtures',
    link: '/services',
    linkLabel: 'Discover',
  },
  {
    video: video1,
    eyebrow: 'CRAFTSMANSHIP',
    title: 'Our Manufacturing',
    link: '/about',
    linkLabel: 'Discover',
  },
]

export default function DualVideoSection() {
  return (
    <section className="relative w-full h-[70vh] md:h-screen grid grid-cols-1 md:grid-cols-2">
      {PANELS.map((panel) => (
        <div key={panel.title} className="group relative h-full overflow-hidden">
          <video
            src={panel.video}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition-colors duration-500" />

          <div className="relative z-10 h-full flex flex-col items-center justify-end text-center text-cream px-6 pb-16 md:pb-20">
            <span className="block text-[11px] tracking-widest2 uppercase text-gold mb-4 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              {panel.eyebrow}
            </span>
            <h2 className="font-display text-3xl md:text-5xl mb-6">{panel.title}</h2>
            <Link
              to={panel.link}
              className="text-[12px] tracking-widest2 uppercase border-b border-cream/70 pb-1
                         hover:border-gold hover:text-gold transition-colors duration-300"
            >
              {panel.linkLabel}
            </Link>
          </div>
        </div>
      ))}
    </section>
  )
}
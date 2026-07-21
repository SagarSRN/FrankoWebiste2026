import Adani from '../assets/brands/Adani.png'
import Bacardi from '../assets/brands/Bacardi.png'
import BeautyFragranceInternational from '../assets/brands/Beauty & Fragrance International.webp'
import BrownForman from '../assets/brands/Belerrages.svg'
import ButlersChoco from '../assets/brands/Butlers Choco.png'
import Bvlgari from '../assets/brands/bvlgari.png'
import Clarins from '../assets/brands/Clarins.svg'
import Clinique from '../assets/brands/Clinique.svg'
import Coty from '../assets/brands/Coty.svg'
import Diageo from '../assets/brands/Diageo.png'
import DIOR from '../assets/brands/DIOR.png'
import Elizabeth from '../assets/brands/Elizabeth_Arden_Logo.svg'
import Ferrero from '../assets/brands/Ferrero.jpg'
import ghirardelli from '../assets/brands/ghirardelli-chocolate.png'
import Grand_Cru_Club from '../assets/brands/Grand Cru Club.png'
import hersheys from '../assets/brands/hershey-company.png'
import Shiseido from '../assets/brands/imgi_94_SHISEIDO_logo_lockup_W_RED_BK.jpg'
import Jo_Malone from '../assets/brands/Jo Malone.svg'
import Loreal from '../assets/brands/Loreal.png'
import LVMH from '../assets/brands/LVMH.jpg'
import MAC from '../assets/brands/MAC.svg'
import Moet_Hennessy from '../assets/brands/Moet Hennessy.jpeg'
import Ospree_Duty_Free from '../assets/brands/Ospree Duty Free.png'
import PUIG from '../assets/brands/Puig.png'
import Pernod from '../assets/brands/Pernod Richard.svg'
import Radico from '../assets/brands/Radico.png'
import Rutland from '../assets/brands/Rutland Square.png'

const BRANDS = [
  { alt: 'Adani', src: Adani },
  { alt: 'Bacardi', src: Bacardi },
  { alt: 'Beauty & Fragrance International', src: BeautyFragranceInternational },
  { alt: 'Brown-Forman', src: BrownForman },
  { alt: 'Butlers Choco', src: ButlersChoco },
  { alt: 'Bvlgari', src: Bvlgari },
  { alt: 'Clarins', src: Clarins },
  { alt: 'Clinique', src: Clinique },
  { alt: 'Coty', src: Coty },
  { alt: 'Diageo', src: Diageo },
  { alt: 'DIOR', src: DIOR },
  { alt: 'Elizabeth', src: Elizabeth },
  { alt: 'Ferrero', src: Ferrero },
  { alt: 'ghirardelli', src: ghirardelli},
  { alt: 'Grand_Cru_Club', src: Grand_Cru_Club},
  { alt: 'hersheys', src: hersheys},
  { alt: 'Shiseido', src: Shiseido},
  { alt: 'Jo_Malone', src: Jo_Malone},
  { alt: 'Loreal', src: Loreal},
  { alt: 'LVMH', src: LVMH},
  { alt: 'MAC', src: MAC},
  { alt: 'Moet_Hennessy', src: Moet_Hennessy},
  { alt: 'Ospree_Duty_Free', src: Ospree_Duty_Free},
  { alt: 'PUIG', src: PUIG},
  { alt: 'Pernod', src: Pernod},
  { alt: 'Radico', src: Radico},
  { alt: 'Rutland', src: Rutland},
  
]

const LOOP = [...BRANDS, ...BRANDS]

export default function TrustedBrands() {
  return (
    <section className="bg-cream py-16 md:py-20 border-y border-ink/5">
      <div className="max-w-6xl mx-auto px-6">
        <span className="block text-center text-[11px] tracking-widest2 uppercase text-gold mb-10">
          Trusted by leading brands
        </span>
      </div>

      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {LOOP.map((brand, i) => (
            <div key={`${brand.alt}-${i}`} className="flex items-center shrink-0">
              {brand.src ? (
                <img
                  src={brand.src}
                  alt={brand.alt}
                  className="h-8 md:h-10 w-auto object-contain
                             transition-transform duration-300 ease-out
                             hover:-translate-y-0.5 hover:scale-105 mx-10 md:mx-14"
                />
              ) : (
                <span
                  className="font-display text-2xl md:text-3xl tracking-wide text-ink/40
                             transition-all duration-300 ease-out hover:text-gold
                             hover:-translate-y-0.5 whitespace-nowrap px-10 md:px-14"
                >
                  {brand.alt}
                </span>
              )}
              <span className="text-gold/30 text-xs">●</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BRANDS = [
  'Bacardí',
  'Chambor',
  'Colorbar',
  'Giordano',
  'Faces Canada',
  'Pernod Ricard',
]

// Duplicate the list so the CSS animation can loop seamlessly (0% -> -50%)
const LOOP = [...BRANDS, ...BRANDS]

export default function TrustedBrands() {
  return (
    <section className="bg-cream py-16 md:py-20 border-y border-ink/5">
      <div className="max-w-6xl mx-auto px-6">
        <span className="block text-center text-[11px] tracking-widest2 uppercase text-gold mb-10">
          Trusted by leading brands
        </span>
      </div>

      {/* Fading edges: mask the row so logos dissolve in/out at the sides */}
      <div
        className="relative overflow-hidden"
        style={{
          maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
          {LOOP.map((brand, i) => (
            <div
              key={`${brand}-${i}`}
              className="flex items-center justify-center px-10 md:px-14 shrink-0"
            >
              <span
                className="font-display text-2xl md:text-3xl tracking-wide text-ink/40 grayscale
                           transition-all duration-300 hover:text-gold hover:grayscale-0 whitespace-nowrap"
              >
                {brand}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
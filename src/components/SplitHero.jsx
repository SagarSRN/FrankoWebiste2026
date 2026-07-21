import { useRef } from 'react'

export default function SplitHero({ videoLeft, videoRight, eyebrow, title }) {
  const leftRef = useRef(null)
  const rightRef = useRef(null)

  const play = (ref) => ref.current?.play()
  const pause = (ref) => {
    ref.current?.pause()
    if (ref.current) ref.current.currentTime = 0
  }

  return (
    <section className="relative h-screen overflow-hidden bg-ink">
      <div className="absolute inset-0 grid grid-cols-2">
        <div
          className="group relative h-full overflow-hidden"
          onMouseEnter={() => play(leftRef)}
          onMouseLeave={() => pause(leftRef)}
        >
          <video
            ref={leftRef}
            muted
            loop
            playsInline
            src={videoLeft}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0
                       scale-105 group-hover:scale-100
                       transition-all duration-700 ease-out"
          />
        </div>

        <div
          className="group relative h-full overflow-hidden"
          onMouseEnter={() => play(rightRef)}
          onMouseLeave={() => pause(rightRef)}
        >
          <video
            ref={rightRef}
            muted
            loop
            playsInline
            src={videoRight}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0
                       scale-105 group-hover:scale-100
                       transition-all duration-700 ease-out"
          />
        </div>
      </div>

      {/* overlays — pointer-events-none so hover still reaches the videos beneath */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/55 pointer-events-none" />
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-24 bg-gradient-to-r from-black/40 via-transparent to-black/40 pointer-events-none" />

      <div className="absolute inset-0 z-10 flex items-center justify-center text-center text-cream px-6 pointer-events-none">
        <div>
          <span className="block text-[12px] tracking-widest2 text-gold mb-4">{eyebrow}</span>
          <h1 className="font-display font-medium text-5xl md:text-7xl leading-tight">{title}</h1>
        </div>
      </div>
    </section>
  )
}
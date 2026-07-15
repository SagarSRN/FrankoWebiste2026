export default function About() {
  return (
    <div className="pt-40 pb-28 max-w-5xl mx-auto px-6">
      <span className="block text-[12px] tracking-widest2 text-gold mb-4 text-center">OUR STORY</span>
      <h1 className="font-display text-4xl md:text-5xl text-teal text-center mb-10">About FrankoJulia</h1>
      <p className="text-ink/70 font-light leading-relaxed text-center max-w-2xl mx-auto mb-16">
        FrankoJulia Creation Pvt Ltd is a luxury retail fixture manufacturer with studios in
        Mumbai and Dubai. We partner with premium brands across retail, travel-retail and
        aviation to design and build fixtures that hold up to the standards of the spaces
        they live in.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-2xl text-teal mb-3">What we believe</h2>
          <p className="text-sm font-light text-ink/70 leading-relaxed">
            A fixture is the first thing a customer touches. It should feel considered,
            durable and quietly confident — never louder than the product it presents.
          </p>
        </div>
        <div>
          <h2 className="font-display text-2xl text-teal mb-3">Where we work</h2>
          <p className="text-sm font-light text-ink/70 leading-relaxed">
            Our manufacturing base in Mumbai serves clients across India and the wider
            Gulf, supported by our Dubai operations for regional delivery and install.
          </p>
        </div>
      </div>
    </div>
  )
}

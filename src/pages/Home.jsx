import TrustedBrands from '../components/TrustedBrands.jsx'
export default function Home() {
  return (
    <div>
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55" />
        <div className="relative z-10 text-center text-cream px-6">
          <span className="block text-[12px] tracking-widest2 text-gold mb-4">MUMBAI · DUBAI</span>
          <h1 className="font-display font-medium text-5xl md:text-7xl leading-tight">
            Luxury Retail Fixtures,<br />Precisely Crafted
          </h1>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-28 text-center">
        <h2 className="font-display text-3xl md:text-4xl text-teal mb-6">
          From concept to installation
        </h2>
        <p className="text-ink/70 font-light leading-relaxed max-w-2xl mx-auto">
          FrankoJulia designs, engineers and manufactures retail fixtures for luxury,
          travel-retail and aviation environments. One studio, one accountable partner,
          from first sketch to finished install.
        </p>
      </section>

      <section className="bg-[#F1ECE2] py-24">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Design', text: 'In-house design and CAD engineering tailored to brand guidelines.' },
            { title: 'Manufacture', text: 'Precision joinery, metalwork and finishing across our Mumbai facility.' },
            { title: 'Install', text: 'Turnkey delivery and installation across India and the Middle East.' },
          ].map((item) => (
            <div key={item.title} className="text-center px-4">
              <h3 className="font-display text-2xl text-teal mb-3">{item.title}</h3>
              <p className="text-sm font-light text-ink/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

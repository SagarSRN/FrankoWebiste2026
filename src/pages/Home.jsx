import TrustedBrands from '../components/TrustedBrands.jsx'
import Portfolio from '../components/Portfolio.jsx'
import SplitHero from '../components/SplitHero.jsx'
import video1 from '../assets/Videos/Video 1.mp4'
import video2 from '../assets/Videos/Video 2.mp4'

export default function Home() {
  return (
    <div>
      <SplitHero
        videoLeft={video1}
        videoRight={video2}
        eyebrow="MUMBAI · DUBAI"
        title={<>Luxury Retail Fixtures,<br />Precisely Crafted</>}
      />

      <TrustedBrands />

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

      <Portfolio />
    </div>
  )
}
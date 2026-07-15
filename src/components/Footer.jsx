import { Link } from 'react-router-dom'
import logo from '../assets/fj_logo.svg'

export default function Footer() {
  return (
    <footer className="bg-teal-dark text-cream">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div>
          <img src={logo} alt="FrankoJulia" className="h-8 mb-4" style={{ filter: 'brightness(0) invert(1)' }} />
          <p className="text-sm font-light text-cream/70 leading-relaxed">
            Luxury retail fixture design and manufacture, based in Mumbai with operations in Dubai.
          </p>
        </div>

        <div>
          <h4 className="text-[11px] tracking-widest2 uppercase text-gold mb-4">Company</h4>
          <ul className="space-y-2 text-sm font-light">
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/services" className="hover:text-gold transition-colors">Services</Link></li>
            <li><Link to="/careers" className="hover:text-gold transition-colors">Careers</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-widest2 uppercase text-gold mb-4">Opportunities</h4>
          <ul className="space-y-2 text-sm font-light">
            <li><Link to="/recruitment" className="hover:text-gold transition-colors">Recruitment</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] tracking-widest2 uppercase text-gold mb-4">Studios</h4>
          <p className="text-sm font-light text-cream/70 leading-relaxed">
            Mumbai, India<br />
            Dubai, UAE
          </p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs font-light text-cream/50">
        © {new Date().getFullYear()} FrankoJulia Creation Pvt Ltd. All rights reserved.
      </div>
    </footer>
  )
}

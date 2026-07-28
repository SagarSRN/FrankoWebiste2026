import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../assets/fj_logo.svg'

const LEFT_LINKS = [
  { to: '/', label: 'Home', key: 'home' },
  { to: '/about', label: 'About', key: 'about' },
  { to: '/services', label: 'Services', key: 'services' },
]

const RIGHT_LINKS = [
  { to: '/careers', label: 'Careers', key: 'careers' },
  { to: '/recruitment', label: 'Recruitment', key: 'recruitment' },
  { to: '/contact', label: 'Contact', key: 'contact' },
]

const ALL_LINKS = [...LEFT_LINKS, ...RIGHT_LINKS]

const PREVIEW = {
  home: { eyebrow: 'FRANKOJULIA', title: 'Home', text: 'Luxury retail fixture design and manufacture, from Mumbai to Dubai.' },
  about: { eyebrow: 'OUR STORY', title: 'About Us', text: 'Two decades of craftsmanship across luxury retail, travel retail and aviation.' },
  services: { eyebrow: 'CAPABILITIES', title: 'Services', text: 'Design, engineering, manufacture and install — one accountable partner.' },
  careers: { eyebrow: 'JOIN US', title: 'Careers', text: 'People. Perfectly placed. Open roles across design, production and client management.' },
  recruitment: { eyebrow: 'APPLY NOW', title: 'Recruitment', text: 'Submit your details and track your application with our HR team.' },
  contact: { eyebrow: 'GET IN TOUCH', title: 'Contact', text: 'Speak to our Mumbai or Dubai studio about your next retail environment.' },
}

function NavItem({ to, label, scrolled, onEnter, onClick }) {
  return (
    <li>
      <NavLink
        to={to}
        onMouseEnter={onEnter}
        onClick={onClick}
        className={({ isActive }) =>
          `nav-link text-[12px] tracking-widest2 uppercase transition-colors duration-300 hover:text-gold ${
            scrolled ? 'text-teal' : 'text-cream'
          } ${isActive ? 'active' : ''}`
        }
      >
        {label}
      </NavLink>
    </li>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeKey, setActiveKey] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const hideTimer = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const showPreview = (key) => {
    clearTimeout(hideTimer.current)
    setActiveKey(key)
  }

  const scheduleHide = () => {
    hideTimer.current = setTimeout(() => setActiveKey(null), 180)
  }

  const active = activeKey ? PREVIEW[activeKey] : null

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 grid grid-cols-[1fr_auto_1fr] items-center px-6 md:px-12 transition-all duration-500 ${
          scrolled || mobileOpen ? 'h-[76px] bg-cream shadow-[0_2px_18px_rgba(0,0,0,0.06)]' : 'h-24 bg-transparent'
        }`}
        onMouseLeave={scheduleHide}
      >
        <ul className="hidden md:flex justify-end gap-10 pr-11">
          {LEFT_LINKS.map((l) => (
            <NavItem key={l.key} to={l.to} label={l.label} scrolled={scrolled} onEnter={() => showPreview(l.key)} />
          ))}
        </ul>

        <div className="flex items-center justify-center">
          <NavLink to="/" onClick={() => setMobileOpen(false)}>
            <img
              src={logo}
              alt="FrankoJulia"
              className={`transition-all duration-500 ${scrolled || mobileOpen ? 'h-7' : 'h-[30px]'}`}
              style={{ filter: (scrolled || mobileOpen) ? 'none' : 'brightness(0) invert(1)' }}
            />
          </NavLink>
        </div>

        <ul className="hidden md:flex justify-start gap-10 pl-11">
          {RIGHT_LINKS.map((l) => (
            <NavItem key={l.key} to={l.to} label={l.label} scrolled={scrolled} onEnter={() => showPreview(l.key)} />
          ))}
        </ul>

        {/* Mobile hamburger — replaces the old inert "Menu" label */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden justify-self-end flex flex-col gap-[5px] w-7 z-50"
          aria-label="Toggle menu"
        >
          <span className={`block h-[1.5px] w-full transition-all duration-300 ${scrolled || mobileOpen ? 'bg-teal' : 'bg-cream'} ${mobileOpen ? 'rotate-45 translate-y-[6.5px]' : ''}`} />
          <span className={`block h-[1.5px] w-full transition-all duration-300 ${scrolled || mobileOpen ? 'bg-teal' : 'bg-cream'} ${mobileOpen ? 'opacity-0' : 'opacity-100'}`} />
          <span className={`block h-[1.5px] w-full transition-all duration-300 ${scrolled || mobileOpen ? 'bg-teal' : 'bg-cream'} ${mobileOpen ? '-rotate-45 -translate-y-[6.5px]' : ''}`} />
        </button>
      </header>

      {/* Mobile menu panel */}
      <div
        className={`md:hidden fixed inset-0 z-40 bg-cream transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
      >
        <ul className="flex flex-col items-center justify-center h-full gap-8 pt-20">
          {ALL_LINKS.map((l) => (
            <li key={l.key}>
              <NavLink
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className="text-teal text-lg tracking-widest2 uppercase font-display"
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Hover preview panel — desktop only, no equivalent needed on mobile since there's no hover */}
      <div
        className={`hidden md:block fixed inset-0 h-screen z-40 transition-opacity duration-500 ${
          active ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
        }`}
        onMouseEnter={() => clearTimeout(hideTimer.current)}
        onMouseLeave={scheduleHide}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/65" />
        {active && (
          <div className="absolute left-6 md:left-12 bottom-16 max-w-xl text-cream">
            <span className="block text-[11px] tracking-widest2 text-gold mb-2">{active.eyebrow}</span>
            <h2 className="font-display text-4xl md:text-5xl mb-3">{active.title}</h2>
            <p className="text-sm font-light leading-relaxed text-cream/85">{active.text}</p>
          </div>
        )}
      </div>
    </>
  )
}
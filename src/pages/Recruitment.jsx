import { useState } from 'react'

const OPEN_ROLES = [
  { title: 'Junior Design Engineer', location: 'Mumbai', type: 'Full-time' },
  { title: 'Production Supervisor', location: 'Mumbai', type: 'Full-time' },
  { title: 'Client Servicing Executive', location: 'Dubai', type: 'Full-time' },
]

export default function Recruitment() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: OPEN_ROLES[0].title, message: '' })
  const [status, setStatus] = useState('idle') // idle | submitting | submitted

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setStatus('submitting')
    // NOTE: no backend yet — this will POST to /api/applications/ once the
    // Django/DRF recruitment API is in place. For now we just simulate it.
    setTimeout(() => setStatus('submitted'), 700)
  }

  return (
    <div className="pt-40 pb-28 max-w-5xl mx-auto px-6">
      <span className="block text-[12px] tracking-widest2 text-gold mb-4 text-center">APPLY NOW</span>
      <h1 className="font-display text-4xl md:text-5xl text-teal text-center mb-16">Recruitment</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Open roles */}
        <div>
          <h2 className="font-display text-2xl text-teal mb-6">Open roles</h2>
          <ul className="space-y-6">
            {OPEN_ROLES.map((r) => (
              <li key={r.title} className="border-b border-ink/10 pb-4">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, role: r.title }))}
                  className="text-left w-full group"
                >
                  <h3 className="font-display text-xl text-ink group-hover:text-gold transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs font-light text-ink/50 tracking-wide uppercase mt-1">
                    {r.location} · {r.type}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Application form */}
        <div>
          <h2 className="font-display text-2xl text-teal mb-6">Application form</h2>

          {status === 'submitted' ? (
            <div className="border border-teal/30 bg-teal/5 p-6 text-sm font-light text-teal">
              Thanks, {form.name.split(' ')[0] || 'there'} — your application for
              "{form.role}" has been received. Our HR team will be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-[11px] tracking-widest2 uppercase text-ink/60 mb-2">Full name</label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-widest2 uppercase text-ink/60 mb-2">Email</label>
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-widest2 uppercase text-ink/60 mb-2">Phone</label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <div>
                <label className="block text-[11px] tracking-widest2 uppercase text-ink/60 mb-2">Role</label>
                <select
                  name="role"
                  value={form.role}
                  onChange={handleChange}
                  className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
                >
                  {OPEN_ROLES.map((r) => (
                    <option key={r.title} value={r.title}>{r.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] tracking-widest2 uppercase text-ink/60 mb-2">Message</label>
                <textarea
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full bg-teal text-cream text-[12px] tracking-widest2 uppercase py-4 hover:bg-teal-dark transition-colors disabled:opacity-60"
              >
                {status === 'submitting' ? 'Submitting…' : 'Submit application'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}

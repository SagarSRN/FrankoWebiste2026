import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (signInError) {
      setError('Invalid email or password.')
      return
    }

    navigate('/admin')
  }

  return (
    <div className="pt-40 pb-28 max-w-md mx-auto px-6">
      <span className="block text-[12px] tracking-widest2 text-gold mb-4 text-center">HR ACCESS</span>
      <h1 className="font-display text-4xl text-teal text-center mb-12">Admin Login</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="border border-red-300 bg-red-50 text-red-700 text-sm p-4">{error}</div>
        )}

        <div>
          <label className="block text-[11px] tracking-widest2 uppercase text-ink/60 mb-2">Email</label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
          />
        </div>

        <div>
          <label className="block text-[11px] tracking-widest2 uppercase text-ink/60 mb-2">Password</label>
          <input
            required
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-teal text-cream text-[12px] tracking-widest2 uppercase py-4 hover:bg-teal-dark transition-colors disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  )
}
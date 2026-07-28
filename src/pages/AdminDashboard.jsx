import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient.js'
import { useNavigate } from 'react-router-dom'

const RESUME_BUCKET = 'ResumeDataFrankojulia'

export default function AdminDashboard() {
  const [tab, setTab] = useState('applications') // 'jobs' | 'applications' — applications first, since that's the daily-use screen
  const navigate = useNavigate()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div className="pt-32 pb-28 max-w-6xl mx-auto px-6">
      <div className="flex items-center justify-between mb-12">
        <h1 className="font-display text-4xl text-teal">HR Dashboard</h1>
        <button
          onClick={handleLogout}
          className="text-[11px] tracking-widest2 uppercase text-ink/50 hover:text-gold transition-colors"
        >
          Log out
        </button>
      </div>

      <div className="flex gap-8 border-b border-ink/10 mb-10">
        <button
          onClick={() => setTab('applications')}
          className={`pb-4 text-[12px] tracking-widest2 uppercase transition-colors ${
            tab === 'applications' ? 'text-teal border-b-2 border-gold' : 'text-ink/40 hover:text-teal'
          }`}
        >
          Applications
        </button>
        <button
          onClick={() => setTab('jobs')}
          className={`pb-4 text-[12px] tracking-widest2 uppercase transition-colors ${
            tab === 'jobs' ? 'text-teal border-b-2 border-gold' : 'text-ink/40 hover:text-teal'
          }`}
        >
          Job Openings
        </button>
      </div>

      {tab === 'jobs' ? <JobsPanel /> : <ApplicationsPanel />}
    </div>
  )
}

function JobsPanel() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', location: '', type: 'Full-time', experience: '', requirements: '' })
  const [saving, setSaving] = useState(false)

  const loadJobs = async () => {
    setLoading(true)
    const { data } = await supabase.from('jobs').select('*').order('created_at', { ascending: false })
    setJobs(data || [])
    setLoading(false)
  }

  useEffect(() => { loadJobs() }, [])

  const handleAdd = async (e) => {
    e.preventDefault()
    setSaving(true)
    await supabase.from('jobs').insert({ ...form, active: true })
    setForm({ title: '', location: '', type: 'Full-time', experience: '', requirements: '' })
    setSaving(false)
    loadJobs()
  }

  const toggleActive = async (job) => {
    await supabase.from('jobs').update({ active: !job.active }).eq('id', job.id)
    loadJobs()
  }

  const deleteJob = async (job) => {
    if (!confirm(`Delete "${job.title}"? This cannot be undone.`)) return
    await supabase.from('jobs').delete().eq('id', job.id)
    loadJobs()
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h2 className="font-display text-2xl text-teal mb-6">Add a role</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <input
            required
            placeholder="Job title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
          />
          <input
            required
            placeholder="Location (e.g. Mumbai)"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
          />
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
          <input
            placeholder="Experience required (e.g. 2-4 years)"
            value={form.experience}
            onChange={(e) => setForm({ ...form, experience: e.target.value })}
            className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
          />
          <div>
            <label className="block text-[11px] tracking-widest2 uppercase text-ink/50 mb-2">
              Requirements (one per line)
            </label>
            <textarea
              rows={4}
              placeholder={'Bachelor\'s in Design or related field\n2+ years in CAD detailing\nStrong communication skills'}
              value={form.requirements}
              onChange={(e) => setForm({ ...form, requirements: e.target.value })}
              className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full bg-teal text-cream text-[12px] tracking-widest2 uppercase py-3 hover:bg-teal-dark transition-colors disabled:opacity-60"
          >
            {saving ? 'Adding…' : 'Add role'}
          </button>
        </form>
      </div>

      <div>
        <h2 className="font-display text-2xl text-teal mb-6">Current roles</h2>
        {loading ? (
          <p className="text-sm text-ink/50">Loading…</p>
        ) : jobs.length === 0 ? (
          <p className="text-sm text-ink/50">No roles yet — add one on the left.</p>
        ) : (
          <ul className="space-y-4">
            {jobs.map((job) => (
              <li key={job.id} className="border border-ink/10 p-4">
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div>
                    <h3 className="font-display text-lg text-ink">{job.title}</h3>
                    <p className="text-xs text-ink/50 uppercase tracking-wide">
                      {job.location} · {job.type}{job.experience ? ` · ${job.experience}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => toggleActive(job)}
                      className={`text-[10px] tracking-widest2 uppercase px-3 py-2 border transition-colors ${
                        job.active
                          ? 'border-teal text-teal hover:bg-teal hover:text-cream'
                          : 'border-ink/20 text-ink/40 hover:border-gold hover:text-gold'
                      }`}
                    >
                      {job.active ? 'Live' : 'Hidden'}
                    </button>
                    <button
                      onClick={() => deleteJob(job)}
                      className="text-[10px] tracking-widest2 uppercase text-red-400 hover:text-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {job.requirements && (
                  <p className="text-xs text-ink/50 leading-relaxed line-clamp-2">{job.requirements}</p>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function ApplicationsPanel() {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // 'all' | 'pending' | 'reviewed'
  const [search, setSearch] = useState('')

  const loadApplications = async () => {
    setLoading(true)
    const { data } = await supabase
      .from('applications')
      .select('*, jobs(title)')
      .order('created_at', { ascending: false })
    setApplications(data || [])
    setLoading(false)
  }

  useEffect(() => { loadApplications() }, [])

  const toggleReviewed = async (app) => {
    await supabase.from('applications').update({ reviewed: !app.reviewed }).eq('id', app.id)
    loadApplications()
  }

  const viewResume = async (app) => {
    if (!app.resume_path) return
    const { data, error } = await supabase.storage
      .from(RESUME_BUCKET)
      .createSignedUrl(app.resume_path, 60)

    if (error || !data?.signedUrl) {
      alert('Could not open resume. Please try again.')
      return
    }
    window.open(data.signedUrl, '_blank')
  }

  const pendingCount = applications.filter((a) => !a.reviewed).length
  const reviewedCount = applications.filter((a) => a.reviewed).length

  const filtered = applications.filter((app) => {
    if (filter === 'pending' && app.reviewed) return false
    if (filter === 'reviewed' && !app.reviewed) return false

    if (search.trim()) {
      const q = search.toLowerCase()
      const matches =
        app.name?.toLowerCase().includes(q) ||
        app.email?.toLowerCase().includes(q) ||
        app.jobs?.title?.toLowerCase().includes(q)
      if (!matches) return false
    }

    return true
  })

  if (loading) return <p className="text-sm text-ink/50">Loading…</p>

  return (
    <div>
      {/* Filter tabs with counts */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {[
          { key: 'all', label: `All (${applications.length})` },
          { key: 'pending', label: `Pending (${pendingCount})` },
          { key: 'reviewed', label: `Reviewed (${reviewedCount})` },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`text-[10px] tracking-widest2 uppercase px-4 py-2 border transition-colors ${
              filter === f.key
                ? 'border-teal bg-teal text-cream'
                : 'border-ink/15 text-ink/50 hover:border-teal hover:text-teal'
            }`}
          >
            {f.label}
          </button>
        ))}

        <input
          type="text"
          placeholder="Search name, email, or role…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto w-full sm:w-64 border border-ink/15 px-4 py-2 text-sm focus:outline-none focus:border-gold"
        />
      </div>

      {applications.length === 0 ? (
        <p className="text-sm text-ink/50">No applications yet.</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-ink/50">No applications match this filter.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <div
              key={app.id}
              className={`border p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                app.reviewed ? 'border-ink/10' : 'border-gold/40 bg-gold/5'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-display text-lg text-ink">{app.name}</h3>
                  {!app.reviewed && (
                    <span className="text-[9px] tracking-widest2 uppercase bg-gold text-cream px-2 py-1">
                      New
                    </span>
                  )}
                </div>
                <p className="text-sm text-ink/60">{app.email} {app.phone && `· ${app.phone}`}</p>
                <p className="text-xs text-gold uppercase tracking-wide mt-1">
                  Applied for: {app.jobs?.title || '—'}
                </p>
                {app.message && (
                  <p className="text-sm text-ink/70 mt-3 max-w-xl leading-relaxed">{app.message}</p>
                )}
                <p className="text-[11px] text-ink/40 mt-2">
                  {new Date(app.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {app.resume_path && (
                  <button
                    onClick={() => viewResume(app)}
                    className="text-[10px] tracking-widest2 uppercase px-4 py-2 border border-ink/20 text-ink/60 hover:border-gold hover:text-gold transition-colors"
                  >
                    View Resume
                  </button>
                )}
                <button
                  onClick={() => toggleReviewed(app)}
                  className={`text-[10px] tracking-widest2 uppercase px-4 py-2 border transition-colors ${
                    app.reviewed
                      ? 'border-teal text-teal hover:bg-teal hover:text-cream'
                      : 'border-gold text-gold hover:bg-gold hover:text-cream'
                  }`}
                >
                  {app.reviewed ? 'Reviewed' : 'Mark reviewed'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
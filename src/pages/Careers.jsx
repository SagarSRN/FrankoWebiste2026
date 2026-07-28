import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'

export default function Careers() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadJobs() {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })

      if (!error && data) setJobs(data)
      setLoading(false)
    }
    loadJobs()
  }, [])

  return (
    <div className="pt-40 pb-28 max-w-5xl mx-auto px-6 text-center">
      <span className="block text-[12px] tracking-widest2 text-gold mb-4">JOIN US</span>
      <h1 className="font-display text-4xl md:text-5xl text-teal mb-6">Careers at FrankoJulia</h1>
      <p className="text-ink/70 font-light leading-relaxed max-w-2xl mx-auto mb-16">
        People. Perfectly placed. We're a design-and-manufacturing team spanning Mumbai
        and Dubai, and we grow by hiring people who care about craft as much as we do.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-20 text-left">
        {[
          { title: 'Design & Engineering', text: 'CAD detailing, material specification, brand-standard execution.' },
          { title: 'Production', text: 'Joinery, metalwork, finishing and quality control.' },
          { title: 'Client & Project Management', text: 'From proposal through to site handover.' },
        ].map((t) => (
          <div key={t.title}>
            <h3 className="font-display text-xl text-teal mb-2">{t.title}</h3>
            <p className="text-sm font-light text-ink/70 leading-relaxed">{t.text}</p>
          </div>
        ))}
      </div>

      <div className="text-left max-w-3xl mx-auto">
        <h2 className="font-display text-2xl text-teal mb-8 text-center">Open Roles</h2>

        {loading && <p className="text-sm font-light text-ink/50 text-center">Loading open roles…</p>}
        {!loading && jobs.length === 0 && (
          <p className="text-sm font-light text-ink/50 text-center">No open roles right now — check back soon.</p>
        )}

        <ul className="space-y-8">
          {jobs.map((job) => (
            <li key={job.id} className="border border-ink/10 p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-display text-2xl text-ink mb-1">{job.title}</h3>
                  <p className="text-xs font-light text-ink/50 tracking-widest2 uppercase">
                    {job.location} · {job.type}
                    {job.experience && ` · ${job.experience} experience`}
                  </p>
                </div>
                <Link
                  to={`/recruitment?role=${encodeURIComponent(job.title)}`}
                  className="shrink-0 inline-block border border-teal text-teal text-[11px] tracking-widest2 uppercase px-6 py-3
                             hover:bg-teal hover:text-cream transition-colors text-center"
                >
                  Apply Now
                </Link>
              </div>

              {job.requirements && (
                <div>
                  <p className="text-[11px] tracking-widest2 uppercase text-gold mb-2">Requirements</p>
                  <ul className="text-sm font-light text-ink/70 leading-relaxed list-disc pl-5 space-y-1">
                    {job.requirements.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
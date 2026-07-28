import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient.js'

const MAX_FILE_MB = 5
const RESUME_BUCKET = 'ResumeDataFrankojulia'

export default function Recruitment() {
  const [searchParams] = useSearchParams()
  const [jobs, setJobs] = useState([])
  const [loadingJobs, setLoadingJobs] = useState(true)
  const [form, setForm] = useState({ name: '', email: '', phone: '', role: '', message: '' })
  const [resumeFile, setResumeFile] = useState(null)
  const [fileError, setFileError] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  useEffect(() => {
    async function loadJobs() {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('active', true)
        .order('created_at', { ascending: false })

      if (!error && data) {
        setJobs(data)
        const roleFromUrl = searchParams.get('role')
        const matched = data.find((j) => j.title === roleFromUrl)
        if (matched) {
          setForm((f) => ({ ...f, role: matched.title }))
        } else if (data.length > 0) {
          setForm((f) => ({ ...f, role: data[0].title }))
        }
      }
      setLoadingJobs(false)
    }
    loadJobs()
  }, [searchParams])

  const selectedJob = jobs.find((j) => j.title === form.role)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    setFileError('')

    if (!file) {
      setResumeFile(null)
      return
    }

    const isPdfOrDoc = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(file.type)

    if (!isPdfOrDoc) {
      setFileError('Please upload a PDF or Word document.')
      setResumeFile(null)
      return
    }

    if (file.size > MAX_FILE_MB * 1024 * 1024) {
      setFileError(`File is too large — please keep it under ${MAX_FILE_MB}MB.`)
      setResumeFile(null)
      return
    }

    setResumeFile(file)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setErrorMsg('')

    let resumePath = null

    if (resumeFile) {
      const safeName = resumeFile.name.replace(/[^a-zA-Z0-9.\-_]/g, '_')
      const path = `${Date.now()}-${safeName}`

      const { error: uploadError } = await supabase.storage
        .from(RESUME_BUCKET)
        .upload(path, resumeFile)

      if (uploadError) {
        console.error('Upload error:', uploadError)
        setStatus('error')
        setErrorMsg(`Resume upload failed: ${uploadError.message}`)
        return
      }
      resumePath = path
    }

    const matchedJob = jobs.find((j) => j.title === form.role)

    const { error: insertError } = await supabase.from('applications').insert({
      job_id: matchedJob?.id ?? null,
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      resume_path: resumePath,
    })

    if (insertError) {
      console.error('Insert error:', insertError)
      setStatus('error')
      setErrorMsg(`Could not save application: ${insertError.message}`)
      return
    }

    try {
      await supabase.functions.invoke('send-application-email', {
        body: { name: form.name, email: form.email, role: form.role },
      })
    } catch (emailErr) {
      console.error('Confirmation email failed to send:', emailErr)
    }

    setStatus('submitted')
  }

  return (
    <div className="pt-40 pb-28 max-w-5xl mx-auto px-6">
      <span className="block text-[12px] tracking-widest2 text-gold mb-4 text-center">APPLY NOW</span>
      <h1 className="font-display text-4xl md:text-5xl text-teal text-center mb-16">Recruitment</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="font-display text-2xl text-teal mb-6">Open roles</h2>

          {loadingJobs && <p className="text-sm font-light text-ink/50">Loading open roles…</p>}
          {!loadingJobs && jobs.length === 0 && (
            <p className="text-sm font-light text-ink/50">No open roles right now — check back soon.</p>
          )}

          <ul className="space-y-6">
            {jobs.map((r) => (
              <li key={r.id} className="border-b border-ink/10 pb-4">
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, role: r.title }))}
                  className="text-left w-full group"
                >
                  <h3 className="font-display text-xl text-ink group-hover:text-gold transition-colors">
                    {r.title}
                  </h3>
                  <p className="text-xs font-light text-ink/50 tracking-wide uppercase mt-1">
                    {r.location} · {r.type}{r.experience ? ` · ${r.experience}` : ''}
                  </p>
                </button>
              </li>
            ))}
          </ul>

          {selectedJob && (selectedJob.requirements || selectedJob.experience) && (
            <div className="mt-10 bg-[#F1ECE2] p-6">
              <h4 className="font-display text-lg text-teal mb-3">
                {selectedJob.title} — What we're looking for
              </h4>
              {selectedJob.experience && (
                <p className="text-xs tracking-widest2 uppercase text-gold mb-3">
                  {selectedJob.experience} experience
                </p>
              )}
              {selectedJob.requirements && (
                <ul className="text-sm font-light text-ink/70 leading-relaxed list-disc pl-5 space-y-1">
                  {selectedJob.requirements.split('\n').filter(Boolean).map((line, i) => (
                    <li key={i}>{line.replace(/^[-•]\s*/, '')}</li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        <div>
          <h2 className="font-display text-2xl text-teal mb-6">Application form</h2>

          {status === 'submitted' ? (
            <div className="border border-teal/30 bg-teal/5 p-6 text-sm font-light text-teal">
              Thanks, {form.name.split(' ')[0] || 'there'} — your application for
              "{form.role}" has been received. Our HR team will be in touch, and
              you should also receive a confirmation email shortly.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === 'error' && (
                <div className="border border-red-300 bg-red-50 text-red-700 text-sm p-4">{errorMsg}</div>
              )}

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
                  {jobs.map((r) => (
                    <option key={r.id} value={r.title}>{r.title}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] tracking-widest2 uppercase text-ink/60 mb-2">
                  Resume (PDF or Word, max {MAX_FILE_MB}MB)
                </label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full border border-ink/15 px-4 py-3 text-sm focus:outline-none focus:border-gold bg-white file:mr-4 file:py-1 file:px-3 file:border-0 file:text-xs file:tracking-widest2 file:uppercase file:bg-teal file:text-cream"
                />
                {fileError && <p className="text-xs text-red-600 mt-2">{fileError}</p>}
                {resumeFile && !fileError && (
                  <p className="text-xs text-ink/50 mt-2">Selected: {resumeFile.name}</p>
                )}
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
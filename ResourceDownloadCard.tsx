'use client'
import { useState } from 'react'
import { Download, Mail, Loader2, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Resource {
  id: string
  title: string
  description: string
  fileUrl: string
  fileType: string
  fileSize: string
  requiresEmail: boolean
  icon: React.ElementType
  accentColor: string
}

export function ResourceDownloadCard({ resource }: { resource: Resource }) {
  const [email, setEmail] = useState('')
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [done, setDone] = useState(false)

  const handleDownload = async (e?: React.FormEvent) => {
    e?.preventDefault()
    setDownloading(true)

    try {
      // Track download
      await fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'download', resourceId: resource.id, email }),
      })

      // Optionally save email
      if (email) {
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, name: '' }),
        })
      }

      // Trigger download
      const link = document.createElement('a')
      link.href = resource.fileUrl
      link.download = resource.fileUrl.split('/').pop() || 'download'
      link.click()

      setDone(true)
      toast.success('Download started!')
    } catch {
      toast.error('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  const handleClick = () => {
    if (resource.requiresEmail && !done) {
      setShowEmailForm(true)
    } else {
      handleDownload()
    }
  }

  return (
    <div
      className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
    >
      {/* Icon + meta */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `${resource.accentColor}15`, color: resource.accentColor }}
        >
          <resource.icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-[var(--text-primary)] mb-0.5">{resource.title}</h3>
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
            <span className="px-2 py-0.5 rounded border border-[var(--border)] font-medium">
              {resource.fileType}
            </span>
            <span>{resource.fileSize}</span>
            {resource.requiresEmail && (
              <span className="flex items-center gap-1">
                <Mail size={10} /> Email required
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">
        {resource.description}
      </p>

      {/* Email gate */}
      {showEmailForm && !done && (
        <form onSubmit={handleDownload} className="mb-4 space-y-3">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
              Enter your email to download
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2.5 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
            />
          </div>
          <button
            type="submit"
            disabled={downloading}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white rounded-xl transition-all"
            style={{ background: resource.accentColor }}
          >
            {downloading ? (
              <><Loader2 size={14} className="animate-spin" /> Preparing...</>
            ) : (
              <><Download size={14} /> Download Now</>
            )}
          </button>
        </form>
      )}

      {/* Download button */}
      {(!showEmailForm || done) && (
        <button
          onClick={handleClick}
          disabled={downloading}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white rounded-xl transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-60"
          style={{ background: done ? '#22C55E' : resource.accentColor }}
        >
          {done ? (
            <><CheckCircle2 size={15} /> Downloaded</>
          ) : downloading ? (
            <><Loader2 size={15} className="animate-spin" /> Preparing...</>
          ) : (
            <><Download size={15} /> {resource.requiresEmail ? 'Get Free Download' : 'Download'}</>
          )}
        </button>
      )}
    </div>
  )
}

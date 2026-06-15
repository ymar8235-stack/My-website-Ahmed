'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BookOpen, Download, Trash2, Loader2, Plus, Star } from 'lucide-react'
import toast from 'react-hot-toast'

interface Resource {
  id: string
  title: string
  title_ar: string | null
  description: string | null
  file_url: string
  file_type: string
  file_size: number | null
  download_count: number
  requires_email: boolean
  featured: boolean
}

export default function AdminResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', title_ar: '', slug: '', description: '',
    file_url: '', file_type: 'application/pdf',
    requires_email: false, featured: false,
  })

  const load = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('resources').select('*').order('created_at', { ascending: false })
    setResources(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const slugify = (s: string) =>
    s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-')

  const handleAdd = async () => {
    if (!form.title || !form.file_url) { toast.error('Title and file URL required'); return }
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('resources').insert({
      ...form,
      slug: form.slug || slugify(form.title),
      title_ar: form.title_ar || null,
      description: form.description || null,
      download_count: 0,
    })
    if (error) toast.error('Failed to add resource')
    else {
      toast.success('Resource added')
      setForm({ title: '', title_ar: '', slug: '', description: '', file_url: '', file_type: 'application/pdf', requires_email: false, featured: false })
      setShowForm(false)
      await load()
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this resource?')) return
    const supabase = createClient()
    await supabase.from('resources').delete().eq('id', id)
    setResources((prev) => prev.filter((r) => r.id !== id))
    toast.success('Resource deleted')
  }

  const toggleFeatured = async (id: string, current: boolean) => {
    const supabase = createClient()
    await supabase.from('resources').update({ featured: !current }).eq('id', id)
    setResources((prev) => prev.map((r) => (r.id === id ? { ...r, featured: !current } : r)))
  }

  const inputClass =
    'w-full px-3 py-2.5 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-2 text-[var(--text-primary)] flex items-center gap-3">
            <BookOpen size={22} className="text-[var(--accent)]" /> Resources
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{resources.length} downloadable resources</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all">
          <Plus size={16} /> Add Resource
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-6 rounded-2xl border border-[var(--accent)] bg-[var(--accent-subtle)] space-y-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">New Resource</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Title (English) *</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value, slug: slugify(e.target.value) }))}
                placeholder="Resource title" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Title (Arabic)</label>
              <input value={form.title_ar} onChange={(e) => setForm((f) => ({ ...f, title_ar: e.target.value }))}
                dir="rtl" placeholder="العنوان بالعربية" className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">File URL *</label>
              <input value={form.file_url} onChange={(e) => setForm((f) => ({ ...f, file_url: e.target.value }))}
                placeholder="/downloads/filename.pdf" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">File Type</label>
              <select value={form.file_type} onChange={(e) => setForm((f) => ({ ...f, file_type: e.target.value }))} className={inputClass}>
                <option value="application/pdf">PDF</option>
                <option value="application/zip">ZIP</option>
                <option value="application/vnd.openxmlformats-officedocument.wordprocessingml.document">DOCX</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Description</label>
              <input value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description" className={inputClass} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.requires_email}
                  onChange={(e) => setForm((f) => ({ ...f, requires_email: e.target.checked }))}
                  className="w-4 h-4 rounded accent-[var(--accent)]" />
                <span className="text-sm text-[var(--text-secondary)]">Requires email</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.featured}
                  onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                  className="w-4 h-4 rounded accent-[var(--accent)]" />
                <span className="text-sm text-[var(--text-secondary)]">Featured</span>
              </label>
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowForm(false)} className="px-4 py-2 text-sm text-[var(--text-muted)]">Cancel</button>
              <button onClick={handleAdd} disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl disabled:opacity-50">
                {saving ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-[var(--accent)]" /></div>
      ) : (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
                {['Title', 'File Type', 'Downloads', 'Requires Email', 'Featured', 'Actions'].map((h) => (
                  <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {resources.map((r) => (
                <tr key={r.id} className="hover:bg-[var(--bg-elevated)] transition-colors">
                  <td className="px-4 py-3">
                    <div className="font-medium text-[var(--text-primary)]">{r.title}</div>
                    <div className="text-xs text-[var(--text-muted)] truncate max-w-xs">{r.file_url}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 text-[10px] rounded border border-[var(--border)] text-[var(--text-muted)] font-medium">
                      PDF
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5 text-[var(--text-muted)]">
                      <Download size={12} />
                      <span className="tabular-nums">{r.download_count.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-xs font-medium ${r.requires_email ? 'text-[var(--accent)]' : 'text-[var(--text-muted)]'}`}>
                      {r.requires_email ? 'Yes' : 'No'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleFeatured(r.id, r.featured)}>
                      <Star size={14} className={r.featured ? 'fill-yellow-400 text-yellow-400' : 'text-[var(--text-muted)]'} />
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDelete(r.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors">
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
              {resources.length === 0 && (
                <tr><td colSpan={6} className="px-4 py-12 text-center text-[var(--text-muted)]">No resources yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

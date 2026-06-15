'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Plus, Trash2, Star, Loader2, Award } from 'lucide-react'
import toast from 'react-hot-toast'

interface AwardItem {
  id: string
  title: string
  title_ar: string | null
  description: string | null
  award_image: string | null
  award_date: string | null
  organization: string | null
  featured: boolean
}

export default function AwardsAdminPage() {
  const [awards, setAwards] = useState<AwardItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', title_ar: '', description: '', award_image: '',
    award_date: '', organization: '', featured: false,
  })

  const load = async () => {
    const supabase = createClient()
    const { data } = await supabase.from('awards').select('*').order('award_date', { ascending: false })
    setAwards(data || [])
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  const handleAdd = async () => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('awards').insert({
      title: form.title,
      title_ar: form.title_ar || null,
      description: form.description || null,
      award_image: form.award_image || null,
      award_date: form.award_date || null,
      organization: form.organization || null,
      featured: form.featured,
    })
    if (error) toast.error('Failed to add award')
    else {
      toast.success('Award added')
      setForm({ title: '', title_ar: '', description: '', award_image: '', award_date: '', organization: '', featured: false })
      setShowForm(false)
      await load()
    }
    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this award?')) return
    const supabase = createClient()
    await supabase.from('awards').delete().eq('id', id)
    setAwards((prev) => prev.filter((a) => a.id !== id))
    toast.success('Deleted')
  }

  const toggleFeatured = async (id: string, current: boolean) => {
    const supabase = createClient()
    await supabase.from('awards').update({ featured: !current }).eq('id', id)
    setAwards((prev) => prev.map((a) => (a.id === id ? { ...a, featured: !current } : a)))
  }

  const inputClass =
    'w-full px-3 py-2.5 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent'

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-2 text-[var(--text-primary)] flex items-center gap-3">
            <Award size={22} className="text-[var(--accent)]" /> Awards & Recognition
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{awards.length} awards</p>
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all">
          <Plus size={16} /> Add Award
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-6 rounded-2xl border border-[var(--accent)] bg-[var(--accent-subtle)] space-y-4">
          <h2 className="text-sm font-bold text-[var(--text-primary)]">New Award / Certificate</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Title (English) *</label>
              <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="Award title" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Title (Arabic)</label>
              <input value={form.title_ar} onChange={(e) => setForm((f) => ({ ...f, title_ar: e.target.value }))}
                placeholder="اسم الجائزة" dir="rtl" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Organization</label>
              <input value={form.organization} onChange={(e) => setForm((f) => ({ ...f, organization: e.target.value }))}
                placeholder="Awarding organization" className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Date</label>
              <input type="date" value={form.award_date} onChange={(e) => setForm((f) => ({ ...f, award_date: e.target.value }))}
                className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Award Image URL</label>
              <input value={form.award_image} onChange={(e) => setForm((f) => ({ ...f, award_image: e.target.value }))}
                placeholder="/images/awards/..." className={inputClass} />
            </div>
            <div className="col-span-2">
              <label className="block text-xs text-[var(--text-muted)] mb-1.5">Description</label>
              <textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                placeholder="Short description..." className={inputClass} />
            </div>
          </div>
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 rounded accent-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">Featured</span>
            </label>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {awards.map((award) => (
            <div key={award.id} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                  <Award size={18} className="text-[var(--accent)]" />
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => toggleFeatured(award.id, award.featured)}>
                    <Star size={14} className={award.featured ? 'fill-yellow-400 text-yellow-400' : 'text-[var(--text-muted)]'} />
                  </button>
                  <button onClick={() => handleDelete(award.id)} className="text-[var(--text-muted)] hover:text-red-400 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">{award.title}</h3>
              {award.organization && <p className="text-xs text-[var(--accent)] mb-1">{award.organization}</p>}
              {award.award_date && (
                <p className="text-xs text-[var(--text-muted)]">
                  {new Date(award.award_date).getFullYear()}
                </p>
              )}
              {award.description && <p className="text-xs text-[var(--text-muted)] mt-2 leading-relaxed">{award.description}</p>}
            </div>
          ))}
          {awards.length === 0 && (
            <div className="col-span-full py-12 text-center text-sm text-[var(--text-muted)]">
              No awards yet. Add your first award or certificate above.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

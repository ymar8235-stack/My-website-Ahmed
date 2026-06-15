'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Save, Eye, Trash2, Loader2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [autoSaving, setAutoSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', title_ar: '', slug: '', excerpt: '', excerpt_ar: '',
    content: '', content_ar: '', cover_image: '',
    status: 'draft', featured: false, reading_time: 5,
  })

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('blog_articles')
        .select('*')
        .eq('id', params.id)
        .single()
      if (error || !data) { router.push('/admin/blog'); return }
      setForm({
        title: data.title || '',
        title_ar: data.title_ar || '',
        slug: data.slug || '',
        excerpt: data.excerpt || '',
        excerpt_ar: data.excerpt_ar || '',
        content: data.content || '',
        content_ar: data.content_ar || '',
        cover_image: data.cover_image || '',
        status: data.status || 'draft',
        featured: data.featured || false,
        reading_time: data.reading_time || 5,
      })
      setLoading(false)
    }
    load()
  }, [params.id, router])

  // Auto-save draft every 60s
  useEffect(() => {
    if (loading || form.status !== 'draft') return
    const timer = setInterval(async () => {
      setAutoSaving(true)
      const supabase = createClient()
      await supabase
        .from('blog_articles')
        .update({ ...form, updated_at: new Date().toISOString() })
        .eq('id', params.id)
      setAutoSaving(false)
    }, 60000)
    return () => clearInterval(timer)
  }, [loading, form, params.id])

  const handleSave = async (newStatus?: string) => {
    setSaving(true)
    const supabase = createClient()
    const updates: Record<string, unknown> = {
      ...form,
      status: newStatus || form.status,
      updated_at: new Date().toISOString(),
    }
    if (newStatus === 'published' && form.status !== 'published') {
      updates.published_at = new Date().toISOString()
    }
    const { error } = await supabase.from('blog_articles').update(updates).eq('id', params.id)
    if (error) toast.error(error.message)
    else {
      toast.success(newStatus === 'published' ? 'Article published!' : 'Saved')
      if (newStatus) setForm((f) => ({ ...f, status: newStatus }))
    }
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm('Permanently delete this article?')) return
    const supabase = createClient()
    await supabase.from('blog_articles').delete().eq('id', params.id)
    toast.success('Article deleted')
    router.push('/admin/blog')
  }

  const inputClass =
    'w-full px-4 py-3 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent'

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 size={24} className="animate-spin text-[var(--accent)]" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-heading-2 text-[var(--text-primary)]">Edit Article</h1>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">
              /blog/{form.slug}
              {autoSaving && <span className="ml-2 text-[var(--accent)]">· Auto-saving...</span>}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2.5 border border-red-500/30 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/10 transition-all">
            <Trash2 size={14} /> Delete
          </button>
          {form.status !== 'published' && (
            <button onClick={() => handleSave('published')} disabled={saving}
              className="flex items-center gap-2 px-4 py-2.5 border border-green-500/30 text-green-400 text-sm font-medium rounded-xl hover:bg-green-500/10 transition-all disabled:opacity-50">
              <Eye size={14} /> Publish
            </button>
          )}
          <button onClick={() => handleSave()} disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50">
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />} Save
          </button>
        </div>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Title (English)</label>
            <input value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={`${inputClass} font-semibold`} />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Title (Arabic)</label>
            <input value={form.title_ar} onChange={(e) => setForm((f) => ({ ...f, title_ar: e.target.value }))}
              dir="rtl" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">URL Slug</label>
          <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
            <span className="text-xs text-[var(--text-muted)] shrink-0">/blog/</span>
            <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Excerpt (English)</label>
            <textarea rows={3} value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Excerpt (Arabic)</label>
            <textarea rows={3} value={form.excerpt_ar} dir="rtl"
              onChange={(e) => setForm((f) => ({ ...f, excerpt_ar: e.target.value }))} className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Cover Image URL</label>
          <input value={form.cover_image} onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
            placeholder="/images/blog/..." className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Content (HTML)</label>
          <textarea rows={24} value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            placeholder="<h2>Section</h2><p>Content...</p>"
            className={`${inputClass} font-mono text-xs leading-relaxed`} />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Content (Arabic HTML)</label>
          <textarea rows={8} value={form.content_ar} dir="rtl"
            onChange={(e) => setForm((f) => ({ ...f, content_ar: e.target.value }))}
            placeholder="<h2>القسم</h2><p>المحتوى...</p>"
            className={`${inputClass} font-mono text-xs leading-relaxed`} />
        </div>

        <div className="grid grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Reading Time (min)</label>
            <input type="number" min={1} value={form.reading_time}
              onChange={(e) => setForm((f) => ({ ...f, reading_time: Number(e.target.value) }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Status</label>
            <select value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className={inputClass}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 rounded accent-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">Featured</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Save, Eye, Loader2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function NewArticlePage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    title: '', title_ar: '', slug: '',
    excerpt: '', content: '', cover_image: '',
    status: 'draft', featured: false, reading_time: 5,
  })

  const slugify = (str: string) =>
    str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')

  const handleTitleChange = (val: string) => {
    setForm((f) => ({ ...f, title: val, slug: slugify(val) }))
  }

  const handleSave = async (publishNow = false) => {
    if (!form.title.trim()) { toast.error('Title is required'); return }
    setSaving(true)
    const supabase = createClient()

    const { data, error } = await supabase
      .from('blog_articles')
      .insert({
        ...form,
        status: publishNow ? 'published' : form.status,
        published_at: publishNow ? new Date().toISOString() : null,
      })
      .select()
      .single()

    if (error) {
      toast.error('Failed to save article')
      setSaving(false)
      return
    }

    toast.success(publishNow ? 'Article published!' : 'Draft saved!')
    router.push(`/admin/blog/${data.id}`)
  }

  const inputClass = 'w-full px-4 py-3 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent'

  return (
    <div className="p-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-heading-2 text-[var(--text-primary)]">New Article</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            Save Draft
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50"
          >
            <Eye size={14} /> Publish Now
          </button>
        </div>
      </div>

      <div className="space-y-5">
        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Title (English) *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Article title..."
            className={`${inputClass} text-lg font-semibold`}
          />
        </div>

        {/* Title Arabic */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Title (Arabic)</label>
          <input
            type="text"
            value={form.title_ar}
            onChange={(e) => setForm((f) => ({ ...f, title_ar: e.target.value }))}
            placeholder="عنوان المقال..."
            dir="rtl"
            className={inputClass}
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">URL Slug</label>
          <div className="flex items-center gap-2 px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl">
            <span className="text-xs text-[var(--text-muted)] shrink-0">/blog/</span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
              className="flex-1 bg-transparent text-sm text-[var(--text-primary)] outline-none"
            />
          </div>
        </div>

        {/* Excerpt */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Excerpt</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
            rows={3}
            placeholder="Short summary shown in article cards and meta description..."
            className={inputClass}
          />
        </div>

        {/* Cover Image */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Cover Image URL</label>
          <input
            type="text"
            value={form.cover_image}
            onChange={(e) => setForm((f) => ({ ...f, cover_image: e.target.value }))}
            placeholder="https://... or /images/blog/..."
            className={inputClass}
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Content (HTML or Markdown)</label>
          <textarea
            value={form.content}
            onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
            rows={20}
            placeholder="<h2>Section heading</h2><p>Article content...</p>"
            className={`${inputClass} font-mono text-xs leading-relaxed`}
          />
          <p className="text-[10px] text-[var(--text-muted)] mt-1.5">
            Supports HTML. Use &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;blockquote&gt;, &lt;strong&gt;.
          </p>
        </div>

        {/* Meta row */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Reading Time (min)</label>
            <input
              type="number"
              value={form.reading_time}
              onChange={(e) => setForm((f) => ({ ...f, reading_time: Number(e.target.value) }))}
              min={1}
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </div>
          <div className="flex items-end pb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                className="w-4 h-4 rounded border-[var(--border)] accent-[var(--accent)]"
              />
              <span className="text-sm text-[var(--text-secondary)]">Featured article</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function EditServicePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({
    name: '', name_ar: '', slug: '',
    description: '', description_ar: '',
    long_description: '', long_description_ar: '',
    starting_price: '', maximum_price: '',
    delivery_time: '', delivery_time_ar: '',
    icon: '', featured: false, is_active: true, sort_order: 0,
  })

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data, error } = await supabase.from('services').select('*').eq('id', params.id).single()
      if (error || !data) { router.push('/admin/services'); return }
      setForm({
        name: data.name || '',
        name_ar: data.name_ar || '',
        slug: data.slug || '',
        description: data.description || '',
        description_ar: data.description_ar || '',
        long_description: data.long_description || '',
        long_description_ar: data.long_description_ar || '',
        starting_price: data.starting_price?.toString() || '',
        maximum_price: data.maximum_price?.toString() || '',
        delivery_time: data.delivery_time || '',
        delivery_time_ar: data.delivery_time_ar || '',
        icon: data.icon || '',
        featured: data.featured || false,
        is_active: data.is_active !== false,
        sort_order: data.sort_order || 0,
      })
      setLoading(false)
    }
    load()
  }, [params.id, router])

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase.from('services').update({
      ...form,
      starting_price: form.starting_price ? parseFloat(form.starting_price) : null,
      maximum_price: form.maximum_price ? parseFloat(form.maximum_price) : null,
      updated_at: new Date().toISOString(),
    }).eq('id', params.id)
    if (error) toast.error(error.message)
    else toast.success('Service saved')
    setSaving(false)
  }

  const inputClass =
    'w-full px-4 py-3 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent'

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 size={24} className="animate-spin text-[var(--accent)]" />
    </div>
  )

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/services" className="p-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card)] transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <h1 className="text-heading-2 text-[var(--text-primary)]">Edit Service</h1>
        </div>
        <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50">
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save Changes
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Name (English)</label>
            <input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Name (Arabic)</label>
            <input value={form.name_ar} onChange={(e) => setForm((f) => ({ ...f, name_ar: e.target.value }))} dir="rtl" className={inputClass} />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Short Description (English)</label>
          <textarea rows={2} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Short Description (Arabic)</label>
          <textarea rows={2} value={form.description_ar} dir="rtl" onChange={(e) => setForm((f) => ({ ...f, description_ar: e.target.value }))} className={inputClass} />
        </div>

        <div>
          <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Long Description (English)</label>
          <textarea rows={4} value={form.long_description} onChange={(e) => setForm((f) => ({ ...f, long_description: e.target.value }))} className={inputClass} />
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Starting Price (EGP)</label>
            <input type="number" min={0} value={form.starting_price}
              onChange={(e) => setForm((f) => ({ ...f, starting_price: e.target.value }))}
              placeholder="Leave blank for 'Custom'" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Maximum Price (EGP)</label>
            <input type="number" min={0} value={form.maximum_price}
              onChange={(e) => setForm((f) => ({ ...f, maximum_price: e.target.value }))}
              placeholder="Optional" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Delivery Time (English)</label>
            <input value={form.delivery_time} onChange={(e) => setForm((f) => ({ ...f, delivery_time: e.target.value }))}
              placeholder="e.g. 3–7 Days" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Delivery Time (Arabic)</label>
            <input value={form.delivery_time_ar} dir="rtl" onChange={(e) => setForm((f) => ({ ...f, delivery_time_ar: e.target.value }))}
              placeholder="٣–٧ أيام" className={inputClass} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          <div>
            <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Sort Order</label>
            <input type="number" min={0} value={form.sort_order}
              onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} className={inputClass} />
          </div>
          <div className="flex items-end gap-6 pb-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={form.is_active}
                onChange={(e) => setForm((f) => ({ ...f, is_active: e.target.checked }))}
                className="w-4 h-4 rounded accent-[var(--accent)]" />
              <span className="text-sm text-[var(--text-secondary)]">Active</span>
            </label>
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

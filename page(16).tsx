'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Save, Loader2, Settings } from 'lucide-react'
import toast from 'react-hot-toast'

interface Setting {
  key: string
  value: string | number | boolean
  description: string
}

const SETTING_GROUPS = [
  {
    title: 'Site Identity',
    keys: ['site_name', 'contact_email', 'whatsapp_number', 'telegram_username'],
    labels: {
      site_name: 'Site Name',
      contact_email: 'Contact Email',
      whatsapp_number: 'WhatsApp Number',
      telegram_username: 'Telegram Username',
    } as Record<string, string>,
  },
  {
    title: 'Statistics',
    keys: ['years_experience', 'client_rating', 'total_reviews', 'website_visits'],
    labels: {
      years_experience: 'Years of Experience',
      client_rating: 'Client Rating (e.g. 4.8)',
      total_reviews: 'Total Reviews',
      website_visits: 'Website Visits',
    } as Record<string, string>,
  },
  {
    title: 'System',
    keys: ['default_language', 'maintenance_mode'],
    labels: {
      default_language: 'Default Language (en / ar)',
      maintenance_mode: 'Maintenance Mode (true / false)',
    } as Record<string, string>,
  },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const load = async () => {
      const supabase = createClient()
      const { data } = await supabase.from('website_settings').select('key, value')
      if (data) {
        const map: Record<string, string> = {}
        data.forEach((row: { key: string; value: unknown }) => {
          const raw = row.value
          map[row.key] = typeof raw === 'string' ? raw.replace(/^"|"$/g, '') : String(raw)
        })
        setSettings(map)
      }
      setLoading(false)
    }
    load()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    const supabase = createClient()

    const updates = Object.entries(settings).map(([key, value]) =>
      supabase
        .from('website_settings')
        .upsert({ key, value: JSON.parse(JSON.stringify(value)) }, { onConflict: 'key' })
    )

    const results = await Promise.all(updates)
    const hasError = results.some((r) => r.error)

    if (hasError) toast.error('Some settings failed to save')
    else toast.success('Settings saved successfully')

    setSaving(false)
  }

  const inputClass =
    'w-full px-4 py-2.5 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent'

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[50vh]">
        <Loader2 size={24} className="animate-spin text-[var(--accent)]" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-2 text-[var(--text-primary)] flex items-center gap-3">
            <Settings size={22} className="text-[var(--accent)]" /> Site Settings
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            Manage site-wide configuration without touching code.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all disabled:opacity-50"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          Save All
        </button>
      </div>

      <div className="space-y-8">
        {SETTING_GROUPS.map((group) => (
          <div key={group.title}>
            <h2 className="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 pb-2 border-b border-[var(--border)]">
              {group.title}
            </h2>
            <div className="space-y-4">
              {group.keys.map((key) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-[var(--text-muted)] mb-1.5">
                    {group.labels[key]}
                  </label>
                  <input
                    type="text"
                    value={settings[key] ?? ''}
                    onChange={(e) =>
                      setSettings((prev) => ({ ...prev, [key]: e.target.value }))
                    }
                    className={inputClass}
                    placeholder={`Enter ${group.labels[key]?.toLowerCase()}...`}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Env notice */}
      <div className="mt-8 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
          <strong className="text-[var(--text-secondary)]">Note:</strong> Sensitive keys like API
          tokens, email credentials, and Supabase URLs must be stored in{' '}
          <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent)]">
            .env.local
          </code>{' '}
          — never in the database.
        </p>
      </div>
    </div>
  )
}

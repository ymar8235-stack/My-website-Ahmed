import { createClient } from '@/lib/supabase/server'
import { BarChart3, TrendingUp, Users, Eye, Download, Calendar } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = await createClient()

  const [
    { count: totalViews },
    { count: totalLeads },
    { count: totalBookings },
    { count: totalSubscribers },
    { count: totalDownloads },
    { data: topProjects },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from('page_views').select('*', { count: 'exact', head: true }),
    supabase.from('leads').select('*', { count: 'exact', head: true }),
    supabase.from('bookings').select('*', { count: 'exact', head: true }),
    supabase.from('newsletter_subscribers').select('*', { count: 'exact', head: true }).eq('is_active', true),
    supabase.from('downloads').select('*', { count: 'exact', head: true }),
    supabase.from('projects').select('id, title, status').eq('status', 'published').limit(5),
    supabase.from('leads')
      .select('service_requested')
      .not('service_requested', 'is', null)
      .limit(100),
  ])

  // Service popularity
  const serviceCount = (recentLeads || []).reduce((acc: Record<string, number>, l: { service_requested?: string }) => {
    const s = l.service_requested || 'Other'
    acc[s] = (acc[s] || 0) + 1
    return acc
  }, {})

  const topServices = Object.entries(serviceCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const maxCount = Math.max(...topServices.map(([, v]) => v), 1)

  const kpis = [
    { label: 'Total Page Views', value: totalViews || 0, icon: Eye, color: '#0071E3' },
    { label: 'Total Leads', value: totalLeads || 0, icon: Users, color: '#A855F7' },
    { label: 'Consultations Booked', value: totalBookings || 0, icon: Calendar, color: '#22C55E' },
    { label: 'Newsletter Subscribers', value: totalSubscribers || 0, icon: TrendingUp, color: '#F59E0B' },
    { label: 'Resource Downloads', value: totalDownloads || 0, icon: Download, color: '#EF4444' },
  ]

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-heading-2 text-[var(--text-primary)] flex items-center gap-3">
          <BarChart3 size={22} className="text-[var(--accent)]" /> Analytics
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          Platform performance overview. Connect Google Analytics for deeper insights.
        </p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${kpi.color}15`, color: kpi.color }}>
              <kpi.icon size={16} />
            </div>
            <div className="text-2xl font-bold text-[var(--text-primary)] tabular-nums mb-0.5">
              {kpi.value.toLocaleString()}
            </div>
            <div className="text-xs text-[var(--text-muted)]">{kpi.label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Services Requested */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-6 uppercase tracking-wider">
            Most Requested Services
          </h2>
          {topServices.length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No leads data yet.</p>
          ) : (
            <div className="space-y-4">
              {topServices.map(([service, count]) => (
                <div key={service}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm text-[var(--text-secondary)] truncate">{service}</span>
                    <span className="text-sm font-semibold text-[var(--text-primary)] tabular-nums ml-2">{count}</span>
                  </div>
                  <div className="h-2 rounded-full bg-[var(--bg-elevated)] overflow-hidden">
                    <div
                      className="h-full rounded-full bg-[var(--accent)] transition-all duration-700"
                      style={{ width: `${(count / maxCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Published projects */}
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
          <h2 className="text-sm font-bold text-[var(--text-primary)] mb-6 uppercase tracking-wider">
            Published Projects
          </h2>
          {(topProjects || []).length === 0 ? (
            <p className="text-sm text-[var(--text-muted)]">No published projects yet.</p>
          ) : (
            <div className="space-y-3">
              {(topProjects || []).map((p: { id: string; title: string; status: string }) => (
                <div key={p.id} className="flex items-center justify-between py-2 border-b border-[var(--border)] last:border-0">
                  <span className="text-sm text-[var(--text-secondary)] truncate">{p.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 font-semibold ml-2 shrink-0">
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* GA Notice */}
      <div className="mt-6 p-5 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex items-start gap-4">
        <BarChart3 size={20} className="text-[var(--accent)] shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-medium text-[var(--text-primary)] mb-1">Connect Google Analytics 4</p>
          <p className="text-xs text-[var(--text-muted)]">
            Add your <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent)]">NEXT_PUBLIC_GA_MEASUREMENT_ID</code> to
            <code className="px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] text-[var(--accent)] ml-1">.env.local</code> for
            full traffic, session, and conversion analytics.
          </p>
        </div>
      </div>
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Edit, Eye, Star, Wrench } from 'lucide-react'

export default async function AdminServicesPage() {
  const supabase = await createClient()
  const { data: services } = await supabase
    .from('services')
    .select('*')
    .order('sort_order')

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-2 text-[var(--text-primary)] flex items-center gap-3">
            <Wrench size={22} className="text-[var(--accent)]" /> Services
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{services?.length || 0} services</p>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
              {['Service', 'Starting Price', 'Max Price', 'Delivery', 'Active', 'Featured', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {(services || []).map((service) => (
              <tr key={service.id} className="hover:bg-[var(--bg-elevated)] transition-colors">
                <td className="px-4 py-3">
                  <div className="font-medium text-[var(--text-primary)]">{service.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">/services/{service.slug}</div>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)] tabular-nums">
                  {service.starting_price
                    ? `${Number(service.starting_price).toLocaleString()} EGP`
                    : 'Custom'}
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)] tabular-nums">
                  {service.maximum_price
                    ? `${Number(service.maximum_price).toLocaleString()} EGP`
                    : '—'}
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">{service.delivery_time || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    service.is_active
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'
                  }`}>
                    {service.is_active ? 'Active' : 'Hidden'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  {service.featured && <Star size={14} className="text-yellow-400 fill-yellow-400" />}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/services/${service.id}`}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-all">
                      <Edit size={14} />
                    </Link>
                    <Link href={`/services/${service.slug}`} target="_blank"
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-all">
                      <Eye size={14} />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--text-muted)] mt-4">
        Services are pre-seeded. Click the edit icon to update pricing, descriptions, and availability.
      </p>
    </div>
  )
}

import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus, Edit, Eye, Star } from 'lucide-react'

export default async function AdminBlogPage() {
  const supabase = await createClient()
  const { data: articles } = await supabase
    .from('blog_articles')
    .select('*, blog_categories(name)')
    .order('created_at', { ascending: false })

  const statusColors: Record<string, string> = {
    published: 'bg-green-500/10 text-green-400 border-green-500/20',
    draft: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
    scheduled: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-heading-2 text-[var(--text-primary)]">Blog Articles</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">{articles?.length || 0} total articles</p>
        </div>
        <Link
          href="/admin/blog/new"
          className="flex items-center gap-2 px-5 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all"
        >
          <Plus size={16} /> New Article
        </Link>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-6">
        {['All', 'Published', 'Draft', 'Scheduled'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
              tab === 'All'
                ? 'bg-[var(--accent)] text-white'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
              {['Title', 'Category', 'Views', 'Status', 'Published', 'Actions'].map((h) => (
                <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-[var(--text-muted)] uppercase tracking-wider">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {(articles || []).map((article) => (
              <tr key={article.id} className="hover:bg-[var(--bg-elevated)] transition-colors">
                <td className="px-4 py-3 max-w-xs">
                  <div className="flex items-center gap-2">
                    {article.featured && <Star size={12} className="text-yellow-400 fill-yellow-400 shrink-0" />}
                    <div>
                      <div className="font-medium text-[var(--text-primary)] line-clamp-1">{article.title}</div>
                      <div className="text-xs text-[var(--text-muted)]">{article.slug}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {(article as { blog_categories?: { name: string } }).blog_categories?.name || '—'}
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)] tabular-nums">
                  {(article.views || 0).toLocaleString()}
                </td>
                <td className="px-4 py-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-[10px] font-semibold border ${statusColors[article.status] || statusColors.draft}`}>
                    {article.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-[var(--text-muted)]">
                  {article.published_at
                    ? new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                    : '—'}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blog/${article.id}`}
                      className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-all"
                    >
                      <Edit size={14} />
                    </Link>
                    {article.status === 'published' && (
                      <Link
                        href={`/blog/${article.slug}`}
                        target="_blank"
                        className="p-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--accent)] transition-all"
                      >
                        <Eye size={14} />
                      </Link>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {!articles?.length && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center text-[var(--text-muted)]">
                  No articles yet.{' '}
                  <Link href="/admin/blog/new" className="text-[var(--accent)] hover:underline">
                    Write your first article →
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

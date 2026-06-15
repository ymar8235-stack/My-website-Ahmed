'use client'
import { usePathname } from 'next/navigation'
import { Bell, Search } from 'lucide-react'

// Derive a readable title from the current pathname
function getPageTitle(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean)
  const last = segments[segments.length - 1]
  if (!last || last === 'admin') return 'Dashboard'
  // Handle dynamic segments like [id]
  if (last.length === 36 && last.includes('-')) return 'Detail'
  return last
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function getBreadcrumbs(pathname: string) {
  const segments = pathname
    .split('/')
    .filter((s) => s && s !== 'admin')
  return segments.map((seg, i) => ({
    label:
      seg.length === 36 && seg.includes('-')
        ? 'Detail'
        : seg.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    href: '/admin/' + segments.slice(0, i + 1).join('/'),
  }))
}

export function AdminHeader() {
  const pathname = usePathname()
  const crumbs = getBreadcrumbs(pathname)

  return (
    <header className="sticky top-0 z-[100] flex items-center justify-between px-6 py-3.5 border-b border-[var(--border)] bg-[var(--bg-primary)]/95 backdrop-blur-xl">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-sm" aria-label="Breadcrumb">
        <span className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer">
          Admin
        </span>
        {crumbs.map((crumb, i) => (
          <span key={crumb.href} className="flex items-center gap-1.5">
            <span className="text-[var(--border-strong)]">/</span>
            <span
              className={
                i === crumbs.length - 1
                  ? 'text-[var(--text-primary)] font-medium'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer'
              }
            >
              {crumb.label}
            </span>
          </span>
        ))}
      </nav>

      {/* Right controls */}
      <div className="flex items-center gap-2">
        {/* Global search hint */}
        <button className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-xs text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--text-primary)] transition-all">
          <Search size={12} />
          <span>Search...</span>
          <kbd className="ml-2 text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-elevated)] border border-[var(--border)]">
            ⌘K
          </kbd>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)] transition-all">
          <Bell size={16} />
          {/* Unread dot */}
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[var(--accent)] flex items-center justify-center text-white text-xs font-bold shrink-0">
          AA
        </div>
      </div>
    </header>
  )
}

'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, FolderKanban, Layers, Wrench,
  FileText, BookOpen, Users, MessageSquare, Award,
  HelpCircle, Package, BarChart3, ImageIcon,
  Settings, LogOut, ChevronRight, Inbox,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    ],
  },
  {
    label: 'Content',
    items: [
      { href: '/admin/projects', label: 'Projects', icon: FolderKanban },
      { href: '/admin/services', label: 'Services', icon: Wrench },
      { href: '/admin/blog', label: 'Blog Articles', icon: FileText },
      { href: '/admin/resources', label: 'Resources', icon: BookOpen },
    ],
  },
  {
    label: 'Brand',
    items: [
      { href: '/admin/clients', label: 'Clients', icon: Users },
      { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare },
      { href: '/admin/awards', label: 'Awards', icon: Award },
      { href: '/admin/faq', label: 'FAQ', icon: HelpCircle },
    ],
  },
  {
    label: 'CRM',
    items: [
      { href: '/admin/leads', label: 'Leads', icon: Inbox },
      { href: '/admin/bookings', label: 'Bookings', icon: Layers },
    ],
  },
  {
    label: 'System',
    items: [
      { href: '/admin/media', label: 'Media Library', icon: ImageIcon },
      { href: '/admin/settings', label: 'Settings', icon: Settings },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
  }

  return (
    <aside className="admin-sidebar flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-[var(--border)]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white font-bold text-sm shrink-0">
            AA
          </div>
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">Ahmed Ammar</div>
            <div className="text-[10px] text-[var(--text-muted)]">Admin Dashboard</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)] px-3 mb-2">
              {group.label}
            </p>
            <ul className="space-y-0.5">
              {group.items.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group',
                        isActive
                          ? 'bg-[var(--accent)] text-white'
                          : 'text-[var(--text-muted)] hover:bg-[var(--bg-elevated)] hover:text-[var(--text-primary)]'
                      )}
                    >
                      <item.icon size={15} className="shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {isActive && <ChevronRight size={12} className="opacity-60" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[var(--border)]">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-[var(--text-muted)] hover:bg-red-500/10 hover:text-red-400 transition-all duration-150"
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

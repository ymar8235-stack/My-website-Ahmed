import { AdminSidebar } from '@/components/admin/AdminSidebar'
import { AdminHeader } from '@/components/admin/AdminHeader'

// Auth is enforced entirely by middleware.ts for all /admin/* routes.
// The login page lives at src/app/admin/login/ (outside this route group)
// so it is never wrapped by this layout — no infinite-redirect risk.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[var(--bg-primary)] overflow-hidden">
      <AdminSidebar />
      <div className="admin-content flex flex-col">
        <AdminHeader />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  )
}

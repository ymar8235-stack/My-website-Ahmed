// This file intentionally redirects to the dashboard.
// The real login page lives at src/app/admin/login/page.tsx (outside this
// route group) to avoid a duplicate-URL build error with Next.js App Router.
// The middleware ensures only authenticated users reach this layout.
import { redirect } from 'next/navigation'
export default function AdminLoginPlaceholder() {
  redirect('/admin/dashboard')
}

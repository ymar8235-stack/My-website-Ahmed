// Minimal layout for /admin/login — no sidebar, no auth check.
// Middleware handles redirecting authenticated users away from this page.
export default function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

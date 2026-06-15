import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] px-4">
      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border-strong) 1px, transparent 1px), linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)`,
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative text-center">
        <div className="text-[10rem] font-bold leading-none text-[var(--border)] select-none mb-4">
          404
        </div>
        <h1 className="text-heading-1 text-[var(--text-primary)] mb-3">Page Not Found</h1>
        <p className="text-body-lg text-[var(--text-muted)] mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[var(--accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--accent-hover)] transition-all"
          >
            Go Home
          </Link>
          <Link
            href="/portfolio"
            className="px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] font-semibold text-sm rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
          >
            View Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}

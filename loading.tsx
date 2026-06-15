export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
      <div className="flex flex-col items-center gap-4">
        {/* Animated logo mark */}
        <div className="relative w-12 h-12">
          <div className="w-12 h-12 bg-[var(--accent)] rounded-xl flex items-center justify-center text-white font-bold text-lg animate-pulse">
            AA
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-32 h-0.5 rounded-full bg-[var(--border)] overflow-hidden">
          <div className="h-full bg-[var(--accent)] rounded-full animate-[slide-right_1.2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  )
}

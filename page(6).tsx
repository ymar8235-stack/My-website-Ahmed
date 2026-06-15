'use client'
import { useActionState, useEffect, useState } from 'react'
import { Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react'
import { loginAction, type LoginResult } from './actions'

const initialState: LoginResult | null = null

export default function AdminLoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState)
  const [showPassword, setShowPassword] = useState(false)

  const inputClass =
    'w-full px-4 py-3 text-sm bg-[var(--bg-secondary)] border border-[var(--border)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-colors'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)] p-4">
      {/* Background grid */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(var(--border-strong) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[var(--accent)] rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 shadow-[var(--shadow-accent-lg)]">
            AA
          </div>
          <h1 className="text-heading-3 text-[var(--text-primary)]">Admin Access</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Ahmed Ammar Portfolio CMS</p>
        </div>

        {/* Card */}
        <div className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[var(--shadow-card)]">
          <form action={formAction} className="space-y-5">

            {/* Username / Email */}
            <div>
              <label
                htmlFor="identifier"
                className="block text-xs font-medium text-[var(--text-muted)] mb-2"
              >
                Username or Email
              </label>
              <input
                id="identifier"
                name="identifier"
                type="text"
                required
                autoComplete="username"
                autoFocus
                placeholder='Admin or your@email.com'
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-medium text-[var(--text-muted)] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  className={`${inputClass} pr-11`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Error */}
            {state && 'error' in state && (
              <div className="px-4 py-3 rounded-xl bg-[var(--error-light)] border border-[var(--error)]/30 text-sm text-[var(--error)] flex items-start gap-2">
                <span className="mt-0.5 shrink-0">⚠</span>
                <span>{state.error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={pending}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--accent-hover)] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
            >
              {pending ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  <ShieldCheck size={15} />
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-[var(--text-muted)] mt-5">
          Protected area — authorised access only.
        </p>
      </div>
    </div>
  )
}

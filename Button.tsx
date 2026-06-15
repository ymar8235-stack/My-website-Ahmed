'use client'
import { forwardRef } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import Link from 'next/link'

const buttonVariants = cva(
  // Base styles
  [
    'inline-flex items-center justify-center gap-2',
    'font-medium rounded-lg select-none',
    'transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-primary)]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    'cursor-pointer',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-[var(--accent)] text-white',
          'hover:bg-[var(--accent-hover)] hover:scale-[1.02]',
          'shadow-[0_1px_2px_rgba(0,0,0,0.3)]',
          'hover:shadow-[var(--shadow-accent-lg)]',
        ],
        secondary: [
          'bg-[var(--bg-card)] text-[var(--text-primary)]',
          'border border-[var(--border)]',
          'hover:bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] hover:scale-[1.02]',
        ],
        ghost: [
          'text-[var(--text-secondary)]',
          'hover:bg-[var(--bg-card)] hover:text-[var(--text-primary)]',
        ],
        outline: [
          'border border-[var(--accent)] text-[var(--accent)]',
          'hover:bg-[var(--accent-subtle)] hover:scale-[1.02]',
        ],
        text: [
          'text-[var(--accent)] underline-offset-4',
          'hover:underline p-0 h-auto',
        ],
        danger: [
          'bg-[var(--error)] text-white',
          'hover:opacity-90 hover:scale-[1.02]',
        ],
      },
      size: {
        xs: 'h-7 px-3 text-xs',
        sm: 'h-9 px-4 text-sm',
        md: 'h-11 px-6 text-sm',
        lg: 'h-13 px-8 text-base',
        xl: 'h-15 px-10 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string
  external?: boolean
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  animate?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      href,
      external,
      loading,
      icon,
      iconPosition = 'left',
      animate = true,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const content = (
      <>
        {loading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {icon && iconPosition === 'left' && !loading && <span className="shrink-0">{icon}</span>}
        {children}
        {icon && iconPosition === 'right' && !loading && <span className="shrink-0">{icon}</span>}
      </>
    )

    const classes = cn(buttonVariants({ variant, size }), className)

    if (href) {
      return (
        <Link
          href={href}
          className={classes}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {content}
        </Link>
      )
    }

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={classes}
          disabled={disabled || loading}
          whileTap={{ scale: 0.98 }}
          {...(props as React.ComponentPropsWithoutRef<typeof motion.button>)}
        >
          {content}
        </motion.button>
      )
    }

    return (
      <button ref={ref} className={classes} disabled={disabled || loading} {...props}>
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }

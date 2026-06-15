'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { fadeUpVariant, staggerContainer } from '@/lib/utils'
import { useTranslation } from '@/store/languageStore'

const industries = [
  'Brand Identity',
  'Logo Design',
  'Packaging',
  'Social Media',
  'Website Design',
  'Marketing Campaigns',
]

export function HeroSection() {
  const { t, isRTL } = useTranslation()

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(var(--border-strong) 1px, transparent 1px),
            linear-gradient(90deg, var(--border-strong) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
        }}
      />

      {/* Accent glow top-right */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(0,113,227,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="container-main relative z-10 py-20">
        <div
          className={`grid lg:grid-cols-2 gap-16 xl:gap-24 items-center ${isRTL ? 'lg:flex-row-reverse' : ''}`}
        >
          {/* ── Left: Content ─────────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div variants={fadeUpVariant} className="mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--bg-card)] text-xs font-medium text-[var(--text-muted)]">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t.hero.badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              variants={fadeUpVariant}
              className="text-display-lg font-bold text-[var(--text-primary)] leading-[1.06] mb-6 text-balance"
            >
              {isRTL ? (
                t.hero.headline
              ) : (
                <>
                  Building{' '}
                  <span className="text-gradient-accent">Powerful Brands</span>
                  <br />
                  Through Strategy,
                  <br />
                  Design & Creativity
                </>
              )}
            </motion.h1>

            {/* Sub */}
            <motion.p
              variants={fadeUpVariant}
              className="text-body-lg text-[var(--text-muted)] mb-8 max-w-lg leading-relaxed"
            >
              {t.hero.subheadline}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUpVariant} className="flex flex-wrap gap-4 mb-12">
              <Link
                href="/portfolio"
                data-cursor="view"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--accent-hover)] hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_20px_rgba(0,113,227,0.3)]"
              >
                {t.hero.cta_primary}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/book-consultation"
                data-cursor="talk"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[var(--bg-card)] text-[var(--text-primary)] font-semibold text-sm rounded-xl border border-[var(--border)] hover:border-[var(--border-strong)] hover:scale-[1.02] transition-all duration-300"
              >
                <Calendar size={16} />
                {t.hero.cta_secondary}
              </Link>
            </motion.div>

            {/* Industries scroll */}
            <motion.div variants={fadeUpVariant}>
              <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-wider font-medium">
                Industries Served
              </p>
              <div className="flex flex-wrap gap-2">
                {industries.map((ind) => (
                  <span
                    key={ind}
                    className="px-3 py-1.5 text-xs rounded-lg border border-[var(--border)] text-[var(--text-muted)] bg-[var(--bg-card)]"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Portrait ────────────────────────────────── */}
          <motion.div
            className="order-1 lg:order-2 relative flex justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          >
            {/* Outer glow ring */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse at 60% 40%, rgba(0,113,227,0.12) 0%, transparent 70%)',
              }}
            />

            {/* Image frame */}
            <div className="relative w-full max-w-md">
              <div
                className="relative rounded-3xl overflow-hidden"
                style={{
                  aspectRatio: '3/4',
                  background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
                }}
              >
                {/* Portrait — replace src with actual image path */}
                <Image
                  src="/images/ahmed-ammar.jpg"
                  alt="Ahmed Ammar — Professional Graphic Designer"
                  fill
                  priority
                  className="object-cover object-center"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUH/8QAIBAAAgICAgMBAAAAAAAAAAAAAQIDBAUREiFhkv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCm3lfuKx6vHLXIScimVj4kW1s68OaWJKJ7jF7+QP8Ax/SgAV//2Q=="
                />

                {/* Subtle gradient overlay for depth */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.4) 100%)',
                  }}
                />
              </div>

              {/* Floating stats cards */}
              <motion.div
                className="absolute -left-6 top-1/4 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl px-4 py-3 shadow-lg"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <div className="text-2xl font-bold text-[var(--text-primary)]">5+</div>
                <div className="text-xs text-[var(--text-muted)]">Years of Experience</div>
              </motion.div>

              <motion.div
                className="absolute -right-6 bottom-1/3 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl px-4 py-3 shadow-lg"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
              >
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <svg key={s} className="w-3 h-3 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                  ))}
                </div>
                <div className="text-xs text-[var(--text-muted)]">4.8 / 5 · 861+ Reviews</div>
              </motion.div>

              {/* Brand identity badge bottom */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[var(--accent)] text-white rounded-full px-5 py-2 text-xs font-semibold shadow-lg whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                Brand Identity Specialist
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="text-[10px] uppercase tracking-[0.15em] text-[var(--text-muted)]">
            {t.hero.scroll}
          </span>
          <motion.div
            className="w-5 h-8 rounded-full border border-[var(--border)] flex justify-center pt-1.5"
          >
            <motion.div
              className="w-1 h-1.5 rounded-full bg-[var(--accent)]"
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

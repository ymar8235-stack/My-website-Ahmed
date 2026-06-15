'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { staggerContainer, fadeUpVariant } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useScrollAnimation'
import { useTranslation } from '@/store/languageStore'
import { ArrowRight, Star, ChevronDown } from 'lucide-react'
import { useState } from 'react'

// ─── About Section ────────────────────────────────────────────────────────────
export function AboutSection() {
  const { ref, inView } = useScrollReveal()
  const { t, isRTL } = useTranslation()

  const skills = isRTL ? t.about.skills : [
    'Branding', 'Logo Design', 'Visual Identity Systems',
    'Website Creation', 'Marketing', 'Content Writing',
    'AI Tools', 'Print Production',
  ]

  return (
    <section className="section" id="about">
      <div className="container-main">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 40 : -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-[var(--bg-card)] border border-[var(--border)]">
              <Image
                src="/images/ahmed-ammar-about.jpg"
                alt="Ahmed Ammar"
                fill
                className="object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/10 to-transparent" />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 -right-6 bg-[var(--accent)] text-white rounded-2xl p-5 shadow-lg">
              <div className="text-3xl font-bold">5+</div>
              <div className="text-xs font-medium opacity-90">Years of Experience</div>
            </div>

            {/* Industries badge */}
            <div className="absolute -top-4 -left-4 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-[var(--text-primary)]">8+</div>
              <div className="text-xs text-[var(--text-muted)]">Industries Served</div>
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            ref={ref as React.Ref<HTMLDivElement>}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUpVariant} className="eyebrow mb-4">
              {t.about.eyebrow}
            </motion.div>
            <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)] mb-5">
              {t.about.headline}
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-body-lg text-[var(--text-muted)] mb-8 leading-relaxed">
              {t.about.bio}
            </motion.p>

            {/* Skills */}
            <motion.div variants={fadeUpVariant}>
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
                {t.about.skills_label}
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {skills.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-lg border border-[var(--border)] bg-[var(--bg-card)] text-[var(--text-secondary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUpVariant}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 group"
              >
                {t.about.cta}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ─── Clients Section ──────────────────────────────────────────────────────────
const clientLogos = [
  { name: 'NovaTech', logo: '/images/clients/novatech.png' },
  { name: 'Genter Athlete', logo: '/images/clients/genter-athlete.png' },
  { name: 'El Khal', logo: '/images/clients/el-khal.png' },
  { name: 'Taqnia', logo: '/images/clients/taqnia.png' },
  { name: 'Tafowq Academy', logo: '/images/clients/tafowq.png' },
  { name: 'WE Telecom', logo: '/images/clients/we.png' },
  { name: "McDonald's", logo: '/images/clients/mcdonalds.png' },
  { name: 'Sting Energy', logo: '/images/clients/sting.png' },
]

export function ClientsSection() {
  const { ref, inView } = useScrollReveal()
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-[var(--bg-secondary)] border-y border-[var(--border)] overflow-hidden">
      <div className="container-main mb-10">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="text-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="eyebrow justify-center mb-3">
            {t.clients.eyebrow}
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="text-heading-3 text-[var(--text-muted)]">
            {t.clients.headline}
          </motion.h2>
        </motion.div>
      </div>

      {/* Infinite scroll marquee */}
      <div className="relative flex overflow-hidden">
        {[0, 1].map((set) => (
          <motion.div
            key={set}
            className="flex gap-8 shrink-0 items-center"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[...clientLogos, ...clientLogos].map((client, i) => (
              <div
                key={`${set}-${i}`}
                className="w-32 h-16 flex items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-card)] px-4 opacity-60 hover:opacity-100 transition-opacity shrink-0 grayscale hover:grayscale-0"
              >
                <Image
                  src={client.logo}
                  alt={client.name}
                  width={100}
                  height={40}
                  className="object-contain max-h-8"
                />
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const testimonials = [
  {
    name: 'Sarah Al-Mansouri',
    company: 'NovaTech AI',
    rating: 5,
    review: 'Ahmed delivered an exceptional brand identity for our AI startup. The logo construction and visual system perfectly communicate our technical precision and forward-thinking nature.',
    avatar: '/images/testimonials/sarah.jpg',
  },
  {
    name: 'Khalid Ibrahim',
    company: 'Genter Athlete',
    rating: 5,
    review: 'Outstanding work on our gym brand! The dark, bold aesthetic Ahmed created is exactly what we envisioned. Our members love the new identity and it\'s attracted premium clients.',
    avatar: '/images/testimonials/khalid.jpg',
  },
  {
    name: 'Rana Hassan',
    company: 'El Khal Restaurant',
    rating: 5,
    review: 'The complete visual identity and packaging system Ahmed created for El Khal exceeded all expectations. Every touchpoint feels authentic, warm, and professional. Sales increased after launch.',
    avatar: '/images/testimonials/rana.jpg',
  },
  {
    name: 'Dr. Mohamed Saleh',
    company: 'Tafowq Academy',
    rating: 5,
    review: 'Ahmed designed a comprehensive brand identity for our educational academy. The complete stationery system, signage, and digital applications were delivered on time and with exceptional quality.',
    avatar: '/images/testimonials/mohamed.jpg',
  },
  {
    name: 'Laila Nour',
    company: 'Taqnia Platform',
    rating: 5,
    review: 'The brand identity for Taqnia is brilliant. Ahmed understood our Arabic-first tech education vision perfectly and delivered a system that works beautifully across digital and print.',
    avatar: '/images/testimonials/laila.jpg',
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-[var(--border)]'}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const { ref, inView } = useScrollReveal()
  const { t } = useTranslation()

  return (
    <section className="section" id="testimonials">
      <div className="container-main">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div>
            <motion.div variants={fadeUpVariant} className="eyebrow mb-3">
              {t.testimonials.eyebrow}
            </motion.div>
            <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)]">
              {t.testimonials.headline}
            </motion.h2>
          </div>
          <motion.div variants={fadeUpVariant} className="text-right">
            <div className="text-3xl font-bold text-[var(--text-primary)]">4.8<span className="text-lg text-[var(--text-muted)]">/5</span></div>
            <div className="flex justify-end gap-0.5 mt-1">
              {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-yellow-400 text-yellow-400" />)}
            </div>
            <div className="text-xs text-[var(--text-muted)] mt-1">861+ {t.testimonials.reviews_count}</div>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.name}
              variants={fadeUpVariant}
              className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--border-strong)] transition-all duration-300"
            >
              <StarRating rating={t.rating} />
              <p className="text-sm text-[var(--text-secondary)] mt-3 mb-5 leading-relaxed line-clamp-4">
                "{t.review}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] overflow-hidden shrink-0">
                  <Image src={t.avatar} alt={t.name} width={36} height={36} className="object-cover" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</div>
                  <div className="text-xs text-[var(--text-muted)]">{t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── FAQ Section ──────────────────────────────────────────────────────────────
const faqs = [
  { q: 'How long does a branding project take?', a: 'A complete brand identity system typically takes 2–4 weeks depending on project scope. A logo-only project usually takes 3–7 business days.' },
  { q: 'Do you provide source files?', a: 'Yes. Every project delivers the complete source files (AI, EPS, PDF) along with ready-to-use PNG and JPG versions for all platforms.' },
  { q: 'What payment methods are accepted?', a: 'Bank transfer, Vodafone Cash, InstaPay, and online payment methods. A 50% deposit is required before project commencement.' },
  { q: 'Can you redesign an existing brand?', a: 'Absolutely. Rebranding is a specialty. The process involves a full audit of the current identity, competitor analysis, and strategic repositioning before design begins.' },
  { q: 'Do you work with clients outside Egypt?', a: 'Yes. All consultations and project delivery are fully remote, supporting clients across the Middle East, Gulf, North Africa, and internationally.' },
]

export function FAQSection() {
  const { ref, inView } = useScrollReveal()
  const { t } = useTranslation()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="section bg-[var(--bg-secondary)]" id="faq">
      <div className="container-main max-w-3xl">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="text-center mb-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="eyebrow justify-center mb-3">{t.faq.eyebrow}</motion.div>
          <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)]">{t.faq.headline}</motion.h2>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08 }}
              className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-card)]"
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-5 text-left"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <span className="text-sm font-medium text-[var(--text-primary)]">{faq.q}</span>
                <ChevronDown
                  size={16}
                  className={`shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
                />
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="px-5 pb-5 text-sm text-[var(--text-muted)] leading-relaxed"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link href="/faq" className="text-sm text-[var(--accent)] hover:underline">
            {t.faq.cta} →
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Final CTA ────────────────────────────────────────────────────────────────
export function CTASection() {
  const { ref, inView } = useScrollReveal()
  const { t } = useTranslation()

  return (
    <section className="section" id="cta">
      <div className="container-main">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="relative rounded-3xl overflow-hidden p-12 md:p-20 text-center"
          style={{
            background: 'linear-gradient(135deg, #0a0a1a 0%, #0D1B3E 50%, #0a0a1a 100%)',
            border: '1px solid var(--border)',
          }}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'radial-gradient(ellipse at 50% 50%, rgba(0,113,227,0.15) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <div className="eyebrow justify-center mb-6 text-[var(--accent)]">
              Start a Project
            </div>
            <h2 className="text-display-lg text-white mb-6 max-w-3xl mx-auto">
              {t.cta.headline}
            </h2>
            <p className="text-body-lg text-white/60 mb-10 max-w-xl mx-auto">
              {t.cta.subheadline}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/book-consultation"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] hover:scale-[1.02] transition-all duration-300 shadow-[0_4px_24px_rgba(0,113,227,0.4)]"
              >
                {t.cta.primary}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-xl border border-white/20 hover:bg-white/15 hover:scale-[1.02] transition-all duration-300 backdrop-blur-sm"
              >
                {t.cta.secondary}
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

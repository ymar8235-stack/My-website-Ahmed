'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { fadeUpVariant, staggerContainer } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useScrollAnimation'
import { useTranslation } from '@/store/languageStore'

// Highlight the NovaTech case study — the most technically rich project
const FEATURED_CASE_STUDY = {
  slug: 'novatech-ai-brand-identity',
  title: 'NovaTech — AI Brand Identity',
  titleAr: 'نوفاتك — هوية الذكاء الاصطناعي',
  industry: 'AI Systems & Automation',
  industryAr: 'أنظمة الذكاء الاصطناعي والأتمتة',
  overview:
    'Complete brand identity for a cutting-edge AI automation company — built around the V-mark symbol with circuit-board geometry representing intelligence, connectivity, and forward momentum.',
  overviewAr:
    'هوية علامة تجارية كاملة لشركة أتمتة ذكاء اصطناعي متطورة — مبنية على رمز V مع هندسة لوحة الدوائر المتكاملة.',
  colors: ['#081423', '#0D1B2A', '#00D9FF', '#226EFF', '#E2EBF0'],
  cover: '/images/portfolio/novatech-cover.jpg',
  mockup: '/images/portfolio/novatech-mockup.jpg',
}

export function CaseStudyHighlight() {
  const { ref, inView } = useScrollReveal()
  const { isRTL } = useTranslation()

  const title = isRTL ? FEATURED_CASE_STUDY.titleAr : FEATURED_CASE_STUDY.title
  const industry = isRTL ? FEATURED_CASE_STUDY.industryAr : FEATURED_CASE_STUDY.industry
  const overview = isRTL ? FEATURED_CASE_STUDY.overviewAr : FEATURED_CASE_STUDY.overview

  return (
    <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border)]" id="case-study">
      <div className="container-main">
        {/* Header */}
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <div>
            <motion.div variants={fadeUpVariant} className="eyebrow mb-3">
              Case Study
            </motion.div>
            <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)]">
              {isRTL ? 'من الفكرة إلى الهوية' : 'From Concept to Identity'}
            </motion.h2>
          </div>
          <motion.div variants={fadeUpVariant}>
            <Link
              href={`/portfolio/${FEATURED_CASE_STUDY.slug}`}
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors group"
              data-cursor="explore"
            >
              {isRTL ? 'عرض دراسة الحالة كاملة' : 'View Full Case Study'}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div
          className="grid lg:grid-cols-2 gap-10 items-center"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {/* Left: info */}
          <motion.div variants={fadeUpVariant} className="space-y-6">
            <div>
              <div
                className="text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: '#00D9FF' }}
              >
                {industry}
              </div>
              <h3 className="text-heading-2 text-[var(--text-primary)] mb-4">{title}</h3>
              <p className="text-body-md text-[var(--text-muted)] leading-relaxed">{overview}</p>
            </div>

            {/* Color palette preview */}
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-3 uppercase tracking-wider font-medium">
                {isRTL ? 'لوحة الألوان' : 'Color Palette'}
              </p>
              <div className="flex gap-2">
                {FEATURED_CASE_STUDY.colors.map((color) => (
                  <div
                    key={color}
                    className="group relative w-10 h-10 rounded-xl cursor-default border border-white/10 hover:scale-110 transition-transform"
                    style={{ background: color }}
                    title={color}
                  >
                    <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[9px] text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-mono">
                      {color}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href={`/portfolio/${FEATURED_CASE_STUDY.slug}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--accent-hover)] hover:scale-[1.02] transition-all duration-300"
            >
              {isRTL ? 'استكشف دراسة الحالة' : 'Explore Case Study'}
              <ArrowRight size={15} />
            </Link>
          </motion.div>

          {/* Right: visual preview */}
          <motion.div variants={fadeUpVariant}>
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[#081423] aspect-[4/3]">
              <Image
                src={FEATURED_CASE_STUDY.cover}
                alt={title}
                fill
                className="object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
              {/* Corner accent */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(0,217,255,0.08) 0%, transparent 50%)',
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

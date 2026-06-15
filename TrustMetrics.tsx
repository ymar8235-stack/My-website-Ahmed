'use client'
import { motion } from 'framer-motion'
import { useCounter, useScrollReveal } from '@/hooks/useScrollAnimation'
import { staggerContainer, fadeUpVariant } from '@/lib/utils'
import { useTranslation } from '@/store/languageStore'

const stats = [
  { value: 5, suffix: '+', labelEn: 'Years of Experience', labelAr: 'سنوات الخبرة', description: 'Since 2019' },
  { value: 48, prefix: '4.', suffix: '/ 5', labelEn: 'Client Rating', labelAr: 'تقييم العملاء', description: '861+ reviews' },
  { value: 861, suffix: '+', labelEn: 'Total Reviews', labelAr: 'إجمالي التقييمات', description: 'Across platforms' },
  { value: 4179, suffix: '+', labelEn: 'Website Visits', labelAr: 'زيارات الموقع', description: 'Monthly average' },
  { value: 240, suffix: '+', labelEn: 'Projects Completed', labelAr: 'المشاريع المنجزة', description: 'And counting' },
  { value: 180, suffix: '+', labelEn: 'Clients Served', labelAr: 'العملاء المخدومون', description: 'Across industries' },
]

function StatCard({
  value,
  suffix,
  prefix,
  labelEn,
  labelAr,
  description,
  index,
}: (typeof stats)[0] & { index: number }) {
  const { count, ref } = useCounter(value, 2000)
  const { t, isRTL } = useTranslation()

  const label = isRTL ? labelAr : labelEn

  // Special case: rating is displayed as "4.8"
  const display =
    suffix === '/ 5'
      ? `4.${count % 10 === 0 ? '8' : count % 10}`
      : `${count.toLocaleString()}${suffix ?? ''}`

  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      variants={fadeUpVariant}
      className="relative p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300 group"
    >
      {/* Accent line */}
      <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="text-3xl xl:text-4xl font-bold text-[var(--text-primary)] mb-1 tabular-nums">
        {prefix && <span className="text-[var(--accent)]">{prefix}</span>}
        {count.toLocaleString()}
        {suffix && suffix !== '/ 5' && (
          <span className="text-[var(--accent)]">{suffix}</span>
        )}
        {suffix === '/ 5' && (
          <span className="text-[var(--text-muted)] text-xl ml-1">/ 5</span>
        )}
      </div>
      <div className="text-sm font-semibold text-[var(--text-secondary)] mb-1">{label}</div>
      <div className="text-xs text-[var(--text-muted)]">{description}</div>
    </motion.div>
  )
}

export function TrustMetrics() {
  const { ref, inView } = useScrollReveal()
  const { t } = useTranslation()

  return (
    <section className="section bg-[var(--bg-secondary)] border-y border-[var(--border)]">
      <div className="container-main">
        {/* Header */}
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="text-center mb-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="eyebrow justify-center mb-4">
            {t.stats.eyebrow}
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)]">
            {t.stats.headline}
          </motion.h2>
        </motion.div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.labelEn} {...stat} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

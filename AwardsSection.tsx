'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Award } from 'lucide-react'
import { staggerContainer, fadeUpVariant } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useScrollAnimation'
import { useTranslation } from '@/store/languageStore'

const awards = [
  {
    id: '1',
    title: 'Arab Creators Certificate',
    titleAr: 'شهادة المبدعين العرب',
    organization: 'Arab Creators',
    year: '2024',
    image: '/images/awards/arab-creators.jpg',
  },
]

export function AwardsSection() {
  const { ref, inView } = useScrollReveal()
  const { t, isRTL } = useTranslation()

  if (awards.length === 0) return null

  return (
    <section className="section" id="awards">
      <div className="container-main">
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="text-center mb-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="eyebrow justify-center mb-3">
            {t.awards.eyebrow}
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)]">
            {t.awards.headline}
          </motion.h2>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center gap-6"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {awards.map((award) => (
            <motion.div
              key={award.id}
              variants={fadeUpVariant}
              className="group flex flex-col items-center gap-4 p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300 max-w-xs w-full"
            >
              {/* Certificate image or icon */}
              <div className="w-24 h-24 rounded-2xl overflow-hidden bg-[var(--bg-secondary)] flex items-center justify-center border border-[var(--border)] group-hover:border-[var(--accent)] transition-colors">
                {award.image ? (
                  <Image
                    src={award.image}
                    alt={isRTL ? award.titleAr : award.title}
                    width={96}
                    height={96}
                    className="object-cover"
                  />
                ) : (
                  <Award size={32} className="text-[var(--accent)]" />
                )}
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-[var(--text-primary)] mb-1">
                  {isRTL ? award.titleAr : award.title}
                </div>
                <div className="text-xs text-[var(--accent)] mb-0.5">{award.organization}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{award.year}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

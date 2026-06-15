'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { staggerContainer, fadeUpVariant } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useScrollAnimation'
import { useTranslation } from '@/store/languageStore'

const articles = [
  {
    slug: 'logo-vs-brand-identity',
    title: 'Logo vs Complete Visual Identity: What Every Business Needs to Know',
    titleAr: 'الشعار مقابل الهوية البصرية الكاملة',
    excerpt: 'Most businesses think they need a logo. What they actually need is a complete visual identity system — and understanding the difference is critical.',
    excerptAr: 'معظم الشركات تعتقد أنها تحتاج إلى شعار. ما تحتاجه فعلاً هو نظام هوية بصرية متكامل.',
    cover: '/images/blog/logo-vs-brand-identity.jpg',
    category: 'Brand Strategy',
    categoryAr: 'استراتيجية العلامة التجارية',
    readingTime: 6,
    date: '2024-11-15',
    accentColor: '#0071E3',
  },
  {
    slug: 'novatech-case-study',
    title: 'Case Study: Building NovaTech — AI Brand Identity from Concept to Launch',
    titleAr: 'دراسة حالة: بناء هوية نوفاتك للذكاء الاصطناعي',
    excerpt: 'A behind-the-scenes look at how the complete brand identity system for NovaTech AI was developed — from the circuit-board V-mark to the full visual system.',
    excerptAr: 'نظرة خلف الكواليس على كيفية تطوير نظام الهوية البصرية الكامل لنوفاتك للذكاء الاصطناعي.',
    cover: '/images/blog/novatech-case-study.jpg',
    category: 'Case Studies',
    categoryAr: 'دراسات الحالة',
    readingTime: 12,
    date: '2024-10-28',
    accentColor: '#A855F7',
  },
  {
    slug: 'how-to-write-design-brief',
    title: 'How to Write a Professional Design Brief That Gets Better Results',
    titleAr: 'كيف تكتب موجزاً تصميمياً احترافياً يحقق نتائج أفضل',
    excerpt: 'A clear design brief is the single most important document in any branding project. Learn how to write one that saves time and improves outcomes.',
    excerptAr: 'الموجز التصميمي الواضح هو الوثيقة الأهم في أي مشروع علامة تجارية.',
    cover: '/images/blog/design-brief.jpg',
    category: 'Client Education',
    categoryAr: 'تثقيف العملاء',
    readingTime: 5,
    date: '2024-10-15',
    accentColor: '#22C55E',
  },
]

export function BlogSection() {
  const { ref, inView } = useScrollReveal()
  const { t, isRTL } = useTranslation()

  return (
    <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border)]" id="blog">
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
              {t.blog.eyebrow}
            </motion.div>
            <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)]">
              {t.blog.headline}
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-body-md text-[var(--text-muted)] mt-2 max-w-lg">
              {t.blog.subheadline}
            </motion.p>
          </div>
          <motion.div variants={fadeUpVariant}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors group"
            >
              {t.blog.read_all}
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Articles grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {articles.map((article, i) => {
            const title = isRTL ? article.titleAr : article.title
            const excerpt = isRTL ? article.excerptAr : article.excerpt
            const category = isRTL ? article.categoryAr : article.category

            return (
              <motion.div key={article.slug} variants={fadeUpVariant}>
                <Link
                  href={`/blog/${article.slug}`}
                  className="group block rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)]"
                >
                  {/* Cover */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.cover}
                      alt={title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2.5 py-1 text-[10px] font-semibold rounded-full text-white"
                        style={{ background: article.accentColor }}
                      >
                        {category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                      {title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">
                      {excerpt}
                    </p>
                    <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                      <span className="flex items-center gap-1">
                        <Clock size={10} />
                        {article.readingTime} {t.blog.reading_time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar size={10} />
                        {new Date(article.date).toLocaleDateString(
                          isRTL ? 'ar-EG' : 'en-US',
                          { month: 'short', day: 'numeric', year: 'numeric' }
                        )}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

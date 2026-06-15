'use client'
import { useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { staggerContainer, fadeUpVariant } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useScrollAnimation'
import { useTranslation } from '@/store/languageStore'

// ─── Real Projects from Portfolio ────────────────────────────────────────────
export const PORTFOLIO_PROJECTS = [
  {
    id: 'taqnia',
    slug: 'taqnia-tech-education-platform',
    title: 'Taqnia',
    titleAr: 'تقنية',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    industry: 'EdTech',
    tagline: 'Complete visual identity for an Arabic tech education platform',
    taglineAr: 'هوية بصرية كاملة لمنصة تعليم تقني عربية',
    cover: '/images/portfolio/taqnia-cover.jpg',
    accentColor: '#1E40AF',
    featured: true,
    year: '2024',
  },
  {
    id: 'novatech',
    slug: 'novatech-ai-brand-identity',
    title: 'NovaTech',
    titleAr: 'نوفاتك',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    industry: 'AI & Automation',
    tagline: 'AI systems & automation brand with circuit-board geometry',
    taglineAr: 'هوية علامة تجارية لأنظمة الذكاء الاصطناعي والأتمتة',
    cover: '/images/portfolio/novatech-cover.jpg',
    accentColor: '#00D9FF',
    featured: true,
    year: '2024',
  },
  {
    id: 'genter-athlete',
    slug: 'genter-athlete-gym-brand',
    title: 'Genter Athlete',
    titleAr: 'جينتر أثليت',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    industry: 'Fitness & Gym',
    tagline: 'Dark, bold, powerful identity for a premium fitness brand',
    taglineAr: 'هوية داكنة وقوية لعلامة تجارية رياضية متميزة',
    cover: '/images/portfolio/genter-athlete-cover.jpg',
    accentColor: '#FFC107',
    featured: true,
    year: '2024',
  },
  {
    id: 'el-khal',
    slug: 'el-khal-restaurant-brand',
    title: 'El Khal',
    titleAr: 'الخال',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    industry: 'Food & Restaurant',
    tagline: 'Complete visual identity & packaging for an Egyptian food brand',
    taglineAr: 'هوية بصرية وتغليف كامل لعلامة طعام مصرية',
    cover: '/images/portfolio/el-khal-cover.jpg',
    accentColor: '#D62828',
    featured: true,
    year: '2024',
  },
  {
    id: 'tafowq-academy',
    slug: 'tafowq-academy-education-brand',
    title: 'اكاديمية التفوق',
    titleAr: 'اكاديمية التفوق',
    category: 'branding',
    categoryLabel: 'Brand Identity',
    industry: 'Education',
    tagline: 'Premium educational academy identity with full stationery system',
    taglineAr: 'هوية أكاديمية تعليمية متميزة مع نظام قرطاسية كامل',
    cover: '/images/portfolio/tafowq-cover.jpg',
    accentColor: '#0A2D56',
    featured: false,
    year: '2024',
  },
  {
    id: 'sting-campaign',
    slug: 'sting-energy-drink-campaign',
    title: 'Sting Energy — اشحن طاقتك',
    titleAr: 'ستينج للطاقة — اشحن طاقتك',
    category: 'social',
    categoryLabel: 'Marketing Campaign',
    industry: 'FMCG / Beverages',
    tagline: 'Full 360° marketing campaign targeting ambitious Arab youth',
    taglineAr: 'حملة تسويقية 360° موجهة للشباب العربي الطموح',
    cover: '/images/portfolio/sting-cover.jpg',
    accentColor: '#E60012',
    featured: false,
    year: '2024',
  },
  {
    id: 'mcdonalds-campaign',
    slug: 'mcdonalds-50-percent-campaign',
    title: "McDonald's — قضمه منه تنسيك نفسك",
    titleAr: "ماكدونالدز — قضمه منه تنسيك نفسك",
    category: 'social',
    categoryLabel: 'Marketing Campaign',
    industry: 'Food & Restaurant',
    tagline: '50% discount campaign driving footfall & social engagement',
    taglineAr: 'حملة خصم ٥٠٪ لتعزيز الزيارات والمشاركة على التواصل',
    cover: '/images/portfolio/mcdonalds-cover.jpg',
    accentColor: '#DA291C',
    featured: false,
    year: '2024',
  },
  {
    id: 'we-telecom',
    slug: 'we-telecom-5g-campaign',
    title: 'WE Telecom — 5G',
    titleAr: 'we للاتصالات — 5G',
    category: 'social',
    categoryLabel: 'Advertising Campaign',
    industry: 'Telecommunications',
    tagline: "Egypt's fastest 5G network — integrated campaign across all channels",
    taglineAr: 'أسرع شبكة 5G في مصر — حملة متكاملة عبر جميع القنوات',
    cover: '/images/portfolio/we-cover.jpg',
    accentColor: '#6F00FF',
    featured: false,
    year: '2024',
  },
]

const filters = [
  { key: 'all', labelEn: 'All Works', labelAr: 'جميع الأعمال' },
  { key: 'branding', labelEn: 'Branding & Identity', labelAr: 'الهوية البصرية' },
  { key: 'social', labelEn: 'Social Media & Ads', labelAr: 'السوشيال ميديا والإعلانات' },
  { key: 'packaging', labelEn: 'Packaging', labelAr: 'التغليف' },
  { key: 'web', labelEn: 'Web Design', labelAr: 'تصميم المواقع' },
]

export function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState('all')
  const { ref, inView } = useScrollReveal()
  const { t, isRTL } = useTranslation()

  const filtered =
    activeFilter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.category === activeFilter)

  return (
    <section className="section" id="portfolio">
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
              {t.portfolio.eyebrow}
            </motion.div>
            <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)]">
              {t.portfolio.headline}
            </motion.h2>
            <motion.p variants={fadeUpVariant} className="text-body-md text-[var(--text-muted)] mt-2 max-w-lg">
              {t.portfolio.subheadline}
            </motion.p>
          </div>
          <motion.div variants={fadeUpVariant}>
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium text-[var(--accent)] hover:text-[var(--text-primary)] transition-colors group"
            >
              {t.portfolio.explore_all}
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeFilter === f.key
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)] hover:border-[var(--border-strong)]'
              }`}
            >
              {isRTL ? f.labelAr : f.labelEn}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <LayoutGroup>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            layout
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)]">
            {t.portfolio.no_results}
          </div>
        )}
      </div>
    </section>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────
function ProjectCard({
  project,
  index,
}: {
  project: (typeof PORTFOLIO_PROJECTS)[0]
  index: number
}) {
  const { isRTL } = useTranslation()
  const title = isRTL ? project.titleAr : project.title
  const tagline = isRTL ? project.taglineAr : project.tagline

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: [0.4, 0, 0.2, 1] }}
      className={`group relative rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] cursor-pointer ${
        project.featured && index === 0 ? 'sm:col-span-2' : ''
      }`}
      data-cursor="view"
    >
      <Link href={`/portfolio/${project.slug}`} className="block">
        {/* Image */}
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: project.featured && index === 0 ? '16/9' : '4/3' }}
        >
          <Image
            src={project.cover}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Hover CTA */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
            <div className="flex items-center justify-between">
              <span className="text-sm font-semibold text-white">View Project</span>
              <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <ArrowUpRight size={14} className="text-white" />
              </div>
            </div>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <span
                className="px-2.5 py-1 text-[10px] font-semibold rounded-full text-white"
                style={{ background: project.accentColor }}
              >
                Featured
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-[10px] font-semibold uppercase tracking-wider"
              style={{ color: project.accentColor }}
            >
              {project.categoryLabel}
            </span>
            <span className="text-[10px] text-[var(--text-muted)]">{project.year}</span>
          </div>
          <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug mb-1 line-clamp-2">
            {title}
          </h3>
          <p className="text-xs text-[var(--text-muted)] line-clamp-2 leading-relaxed">{tagline}</p>
        </div>
      </Link>
    </motion.div>
  )
}

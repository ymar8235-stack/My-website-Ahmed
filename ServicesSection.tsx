'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { staggerContainer, fadeUpVariant } from '@/lib/utils'
import { useScrollReveal } from '@/hooks/useScrollAnimation'
import { useTranslation } from '@/store/languageStore'

const services = [
  {
    id: 'logo-design',
    slug: 'logo-design',
    icon: '✦',
    nameEn: 'Logo Design',
    nameAr: 'تصميم الشعار',
    descEn: 'Strategic logo creation built on geometric precision and brand psychology.',
    descAr: 'تصميم شعار استراتيجي مبني على الدقة الهندسية وعلم نفس العلامة التجارية.',
    startingPrice: 500,
    maxPrice: 3000,
    delivery: '3–7 Days',
    deliveryAr: '٣–٧ أيام',
    featured: false,
    accentColor: '#0071E3',
  },
  {
    id: 'brand-identity',
    slug: 'brand-identity',
    icon: '◈',
    nameEn: 'Brand Identity Design',
    nameAr: 'تصميم الهوية البصرية',
    descEn: 'Complete visual identity systems — logo, colors, typography, guidelines, and all applications.',
    descAr: 'أنظمة هوية بصرية متكاملة — شعار وألوان وخطوط وإرشادات وجميع التطبيقات.',
    startingPrice: 5000,
    maxPrice: 25000,
    delivery: '2–4 Weeks',
    deliveryAr: '٢–٤ أسابيع',
    featured: true,
    accentColor: '#0071E3',
  },
  {
    id: 'social-media-design',
    slug: 'social-media-design',
    icon: '▣',
    nameEn: 'Social Media Design',
    nameAr: 'تصميم السوشيال ميديا',
    descEn: 'High-impact posts, stories, campaigns, and advertising creatives that stop the scroll.',
    descAr: 'منشورات واستوريز وحملات وإعلانات عالية التأثير تلفت الأنظار.',
    startingPrice: 250,
    maxPrice: 800,
    delivery: '1–3 Days',
    deliveryAr: '١–٣ أيام',
    featured: false,
    accentColor: '#A855F7',
  },
  {
    id: 'website-design',
    slug: 'website-design',
    icon: '⬡',
    nameEn: 'Website Design & Dev',
    nameAr: 'تصميم وتطوير المواقع',
    descEn: 'Fast, responsive, SEO-optimized websites that convert visitors into clients.',
    descAr: 'مواقع سريعة ومتجاوبة ومحسّنة لمحركات البحث تحول الزوار إلى عملاء.',
    startingPrice: 2500,
    maxPrice: 15000,
    delivery: '1–3 Weeks',
    deliveryAr: '١–٣ أسابيع',
    featured: false,
    accentColor: '#22C55E',
  },
  {
    id: 'print-design',
    slug: 'print-design',
    icon: '◻',
    nameEn: 'Print Design',
    nameAr: 'التصميم المطبوع',
    descEn: 'Business cards, brochures, banners, flyers, and corporate print materials.',
    descAr: 'بطاقات أعمال وكتيبات ولافتات وبوسترات ومطبوعات شركات.',
    startingPrice: 1000,
    maxPrice: 10000,
    delivery: '2–5 Days',
    deliveryAr: '٢–٥ أيام',
    featured: false,
    accentColor: '#F59E0B',
  },
  {
    id: 'packaging-design',
    slug: 'packaging-design',
    icon: '⬢',
    nameEn: 'Packaging Design',
    nameAr: 'تصميم التغليف',
    descEn: 'Product packaging that stands out on shelves and reflects the brand\'s premium value.',
    descAr: 'تغليف منتجات يبرز على الرفوف ويعكس القيمة المتميزة للعلامة.',
    startingPrice: 1500,
    maxPrice: 8000,
    delivery: '3–7 Days',
    deliveryAr: '٣–٧ أيام',
    featured: false,
    accentColor: '#EF4444',
  },
  {
    id: 'sticker-design',
    slug: 'sticker-design',
    icon: '◉',
    nameEn: 'Sticker Design',
    nameAr: 'تصميم الملصقات',
    descEn: 'Custom sticker designs ready for digital or commercial printing.',
    descAr: 'تصاميم ملصقات مخصصة جاهزة للطباعة الرقمية أو التجارية.',
    startingPrice: 300,
    maxPrice: 1000,
    delivery: '1–2 Days',
    deliveryAr: '١–٢ يومان',
    featured: false,
    accentColor: '#06B6D4',
  },
  {
    id: 'content-writing',
    slug: 'content-writing',
    icon: '◈',
    nameEn: 'Content Writing',
    nameAr: 'كتابة المحتوى',
    descEn: 'Brand messaging, website copy, social content, and marketing text in Arabic and English.',
    descAr: 'رسائل العلامة التجارية ومحتوى الموقع والسوشيال والتسويق بالعربية والإنجليزية.',
    startingPrice: 500,
    maxPrice: 5000,
    delivery: 'Varies',
    deliveryAr: 'يتفاوت',
    featured: false,
    accentColor: '#8B5CF6',
  },
  {
    id: 'marketing-consultation',
    slug: 'marketing-consultation',
    icon: '▲',
    nameEn: 'Marketing Consultation',
    nameAr: 'الاستشارة التسويقية',
    descEn: 'Strategic brand and marketing consultation sessions via Google Meet.',
    descAr: 'جلسات استشارة استراتيجية للعلامة التجارية والتسويق عبر Google Meet.',
    startingPrice: 0,
    maxPrice: 0,
    delivery: '60 min session',
    deliveryAr: 'جلسة ٦٠ دقيقة',
    featured: false,
    accentColor: '#F97316',
  },
]

export function ServicesSection() {
  const { ref, inView } = useScrollReveal()
  const { t, isRTL } = useTranslation()

  return (
    <section className="section bg-[var(--bg-secondary)]" id="services">
      <div className="container-main">
        {/* Header */}
        <motion.div
          ref={ref as React.Ref<HTMLDivElement>}
          className="max-w-2xl mb-12"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUpVariant} className="eyebrow mb-3">
            {t.services.eyebrow}
          </motion.div>
          <motion.h2 variants={fadeUpVariant} className="text-heading-1 text-[var(--text-primary)] mb-3">
            {t.services.headline}
          </motion.h2>
          <motion.p variants={fadeUpVariant} className="text-body-lg text-[var(--text-muted)]">
            {t.services.subheadline}
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={staggerContainer}
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* View All CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] text-sm font-medium rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 group"
          >
            {t.services.view_all}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  const { isRTL } = useTranslation()
  const name = isRTL ? service.nameAr : service.nameEn
  const desc = isRTL ? service.descAr : service.descEn
  const delivery = isRTL ? service.deliveryAr : service.delivery

  return (
    <motion.div
      variants={fadeUpVariant}
      className={`group relative p-6 rounded-2xl border bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] ${
        service.featured
          ? 'border-[var(--accent)] ring-1 ring-[var(--accent)] ring-opacity-30'
          : 'border-[var(--border)]'
      }`}
    >
      {service.featured && (
        <div className="absolute -top-3 left-6">
          <span className="px-3 py-1 text-[10px] font-semibold bg-[var(--accent)] text-white rounded-full">
            Most Popular
          </span>
        </div>
      )}

      {/* Icon */}
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-4 font-bold transition-transform duration-300 group-hover:scale-110"
        style={{
          background: `${service.accentColor}15`,
          color: service.accentColor,
          fontSize: '1.25rem',
        }}
      >
        {service.icon}
      </div>

      <h3 className="font-semibold text-[var(--text-primary)] mb-2 text-sm">{name}</h3>
      <p className="text-xs text-[var(--text-muted)] mb-4 leading-relaxed line-clamp-3">{desc}</p>

      {/* Meta */}
      <div className="flex items-center gap-4 mb-5 text-xs text-[var(--text-muted)]">
        <div className="flex items-center gap-1">
          <Tag size={11} style={{ color: service.accentColor }} />
          {service.startingPrice === 0
            ? 'Custom Pricing'
            : `From ${service.startingPrice.toLocaleString()} EGP`}
        </div>
        <div className="flex items-center gap-1">
          <Clock size={11} style={{ color: service.accentColor }} />
          {delivery}
        </div>
      </div>

      <Link
        href={`/services/${service.slug}`}
        className="inline-flex items-center gap-1.5 text-xs font-semibold transition-colors duration-200 group/link"
        style={{ color: service.accentColor }}
      >
        Learn More
        <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
      </Link>
    </motion.div>
  )
}

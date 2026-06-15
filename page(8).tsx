import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Clock, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Services — Ahmed Ammar',
  description: 'Professional branding, logo design, social media, website design, packaging, and marketing services.',
}

const services = [
  {
    slug: 'logo-design',
    icon: '✦',
    name: 'Logo Design',
    description: 'Strategic logo creation built on geometric precision and brand psychology. Every mark is constructed with intent — not just drawn.',
    startingPrice: 500,
    maxPrice: 3000,
    delivery: '3–7 Days',
    deliverables: ['Primary Logo', 'Logo Variations', 'Vector Files (AI/EPS)', 'PNG/JPG Exports', 'Brand Usage Guide'],
    accentColor: '#0071E3',
    featured: false,
  },
  {
    slug: 'brand-identity',
    icon: '◈',
    name: 'Brand Identity Design',
    description: 'Complete visual identity systems — logo, colors, typography, brand guidelines, and all brand applications across every touchpoint.',
    startingPrice: 5000,
    maxPrice: 25000,
    delivery: '2–4 Weeks',
    deliverables: ['Logo System', 'Color Palette', 'Typography System', 'Brand Guidelines PDF', 'Business Card', 'Social Assets', 'Identity Applications'],
    accentColor: '#0071E3',
    featured: true,
  },
  {
    slug: 'social-media-design',
    icon: '▣',
    name: 'Social Media Design',
    description: 'High-impact posts, stories, campaigns, and advertising creatives designed to stop the scroll and drive engagement.',
    startingPrice: 250,
    maxPrice: 800,
    delivery: '1–3 Days',
    deliverables: ['Social Media Posts', 'Campaign Designs', 'Story Designs', 'Ad Creatives', 'Editable Templates'],
    accentColor: '#A855F7',
    featured: false,
  },
  {
    slug: 'website-design',
    icon: '⬡',
    name: 'Website Design & Development',
    description: 'Fast, responsive, SEO-optimized websites built with Next.js that convert visitors into clients and reflect the brand identity.',
    startingPrice: 2500,
    maxPrice: 15000,
    delivery: '1–3 Weeks',
    deliverables: ['Website Design', 'Responsive Development', 'SEO Setup', 'Performance Optimization', 'CMS Integration'],
    accentColor: '#22C55E',
    featured: false,
  },
  {
    slug: 'print-design',
    icon: '◻',
    name: 'Print Design',
    description: 'Business cards, brochures, banners, flyers, folders, and all corporate print materials — print-ready with CMYK precision.',
    startingPrice: 1000,
    maxPrice: 10000,
    delivery: '2–5 Days',
    deliverables: ['Business Cards', 'Flyers', 'Brochures', 'Banners', 'Corporate Materials'],
    accentColor: '#F59E0B',
    featured: false,
  },
  {
    slug: 'packaging-design',
    icon: '⬢',
    name: 'Packaging Design',
    description: 'Product packaging that stands out on shelves and communicates premium quality — from boxes to labels to bags.',
    startingPrice: 1500,
    maxPrice: 8000,
    delivery: '3–7 Days',
    deliverables: ['Package Design', 'Dieline Layout', 'Print-Ready Files', 'Mockup Previews', 'Brand Pattern'],
    accentColor: '#EF4444',
    featured: false,
  },
  {
    slug: 'sticker-design',
    icon: '◉',
    name: 'Sticker Design',
    description: 'Custom sticker and label designs — die-cut, rounded, or square — ready for digital or large-scale commercial printing.',
    startingPrice: 300,
    maxPrice: 1000,
    delivery: '1–2 Days',
    deliverables: ['Custom Sticker Designs', 'Print-Ready Files', 'Multiple Formats', 'Cut Lines'],
    accentColor: '#06B6D4',
    featured: false,
  },
  {
    slug: 'content-writing',
    icon: '◈',
    name: 'Content Writing',
    description: 'Brand messaging, website copy, social content, and marketing text crafted in both Arabic and English with strategic intent.',
    startingPrice: 500,
    maxPrice: 5000,
    delivery: 'Varies',
    deliverables: ['Marketing Content', 'Website Copy', 'Social Content', 'Brand Messaging', 'Campaign Text'],
    accentColor: '#8B5CF6',
    featured: false,
  },
  {
    slug: 'marketing-consultation',
    icon: '▲',
    name: 'Marketing Consultation',
    description: 'Strategic brand and marketing consultation sessions via Google Meet. Clarify your positioning, define your messaging, and build a roadmap.',
    startingPrice: 0,
    maxPrice: 0,
    delivery: '60-min Session',
    deliverables: ['Brand Audit', 'Market Positioning', 'Strategy Roadmap', 'Written Summary', 'Action Plan'],
    accentColor: '#F97316',
    featured: false,
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="border-b border-[var(--border)] py-20 bg-[var(--bg-secondary)]">
        <div className="container-main max-w-3xl">
          <div className="eyebrow mb-4">Services</div>
          <h1 className="text-display-lg text-[var(--text-primary)] mb-5">
            Creative Solutions Designed to Elevate Your Brand
          </h1>
          <p className="text-body-lg text-[var(--text-muted)] mb-8">
            Professional design, branding, websites, content creation, and marketing services — each delivered with strategic thinking and premium execution.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/book-consultation" className="px-6 py-3 bg-[var(--accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--accent-hover)] transition-all">
              Book Consultation
            </Link>
            <Link href="/portfolio" className="px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] font-semibold text-sm rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.slug}
              className={`relative group rounded-2xl border bg-[var(--bg-card)] p-6 hover:border-[var(--accent)] transition-all duration-300 hover:shadow-[var(--shadow-card-hover)] ${
                service.featured
                  ? 'border-[var(--accent)] ring-1 ring-[var(--accent)] ring-opacity-20'
                  : 'border-[var(--border)]'
              }`}
            >
              {service.featured && (
                <div className="absolute -top-3 left-6">
                  <span className="px-3 py-1 text-[10px] font-bold bg-[var(--accent)] text-white rounded-full uppercase tracking-wider">
                    Most Popular
                  </span>
                </div>
              )}

              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-xl mb-5 group-hover:scale-110 transition-transform duration-300"
                style={{ background: `${service.accentColor}15`, color: service.accentColor }}
              >
                {service.icon}
              </div>

              <h2 className="text-heading-4 text-[var(--text-primary)] mb-3">{service.name}</h2>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5">{service.description}</p>

              {/* Deliverables */}
              <ul className="space-y-1.5 mb-6">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                    <span style={{ color: service.accentColor }} className="text-sm">✓</span>
                    {d}
                  </li>
                ))}
              </ul>

              {/* Pricing & delivery */}
              <div className="pt-5 border-t border-[var(--border)] flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[var(--text-muted)] mb-0.5 flex items-center gap-1">
                    <Tag size={9} /> Pricing
                  </div>
                  <div className="text-sm font-bold text-[var(--text-primary)]">
                    {service.startingPrice === 0
                      ? 'Custom Quote'
                      : `From ${service.startingPrice.toLocaleString()} EGP`}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-[var(--text-muted)] mb-0.5 flex items-center gap-1 justify-end">
                    <Clock size={9} /> Delivery
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-secondary)]">{service.delivery}</div>
                </div>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="mt-5 flex items-center gap-2 text-sm font-semibold group/link transition-colors duration-200"
                style={{ color: service.accentColor }}
              >
                View Details
                <ArrowRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="border-t border-[var(--border)] py-20 bg-[var(--bg-secondary)]">
        <div className="container-main text-center">
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">Not sure which service you need?</h2>
          <p className="text-body-lg text-[var(--text-muted)] mb-8 max-w-lg mx-auto">
            Book a free consultation and we'll figure out the best approach for your business together.
          </p>
          <Link href="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all">
            Book Free Consultation
          </Link>
        </div>
      </div>
    </div>
  )
}

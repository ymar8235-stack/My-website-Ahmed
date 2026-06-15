import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Check, Clock, Tag, ArrowRight } from 'lucide-react'
import { serviceSchema } from '@/lib/seo'
import { PORTFOLIO_PROJECTS } from '@/components/sections/PortfolioSection'

// Static service data — in production, fetch from Supabase
const SERVICES: Record<string, {
  slug: string; name: string; nameAr: string; description: string;
  longDescription: string; startingPrice: number; maxPrice: number;
  currency: string; delivery: string; deliverables: string[];
  process: Array<{ step: number; title: string; description: string }>;
  faqs: Array<{ q: string; a: string }>;
  relatedCategory: string; accentColor: string;
}> = {
  'logo-design': {
    slug: 'logo-design', name: 'Logo Design', nameAr: 'تصميم الشعار',
    accentColor: '#0071E3',
    description: 'Strategic logo creation built on geometric precision and brand psychology.',
    longDescription: 'A logo is not just a graphic — it is the entry point to your entire brand. Every mark designed is constructed with intentional geometry, tested across all sizes and surfaces, and delivered as a complete logo system with all required variations.',
    startingPrice: 500, maxPrice: 3000, currency: 'EGP', delivery: '3–7 Business Days',
    deliverables: ['Primary Logo (Color)', 'Secondary Logo Variations', 'Monochrome Version', 'Reversed Version (White)', 'Icon Mark', 'AI + EPS Source Files', 'PNG (Multiple Sizes & Backgrounds)', 'PDF Print-Ready', 'Basic Usage Guide'],
    process: [
      { step: 1, title: 'Discovery Brief', description: 'Complete a detailed questionnaire covering brand values, target audience, industry, and visual preferences.' },
      { step: 2, title: 'Research & Moodboard', description: 'Competitor analysis and a curated moodboard for your approval before any design begins.' },
      { step: 3, title: 'Concept Development', description: 'Multiple logo directions explored through sketching and digital refinement.' },
      { step: 4, title: 'Presentation', description: 'Concepts presented in context — on mockups, business cards, and actual use cases.' },
      { step: 5, title: 'Refinement', description: 'Feedback rounds to refine the chosen direction to final pixel-perfect quality.' },
      { step: 6, title: 'Delivery', description: 'All files delivered in a structured, organized folder with usage notes.' },
    ],
    faqs: [
      { q: 'How many logo concepts will I see?', a: '2–3 distinct directions are presented in the first round, with one chosen for refinement.' },
      { q: 'Can I use the logo for print and large-format?', a: 'Yes. All logos are delivered as scalable vector files — they work at any size from a favicon to a billboard.' },
      { q: 'What if I don\'t like any of the concepts?', a: 'An additional concept round can be requested. This is rare — the discovery brief and moodboard approval ensure alignment before design begins.' },
    ],
    relatedCategory: 'branding',
  },
  'brand-identity': {
    slug: 'brand-identity', name: 'Brand Identity Design', nameAr: 'تصميم الهوية البصرية',
    accentColor: '#0071E3',
    description: 'Complete visual identity systems across every brand touchpoint.',
    longDescription: 'A complete brand identity is the most powerful investment a business can make. This service delivers a full visual system — from the logo and color palette to typography, brand guidelines, and all physical and digital applications — creating the foundation for consistent, professional brand communication.',
    startingPrice: 5000, maxPrice: 25000, currency: 'EGP', delivery: '2–4 Weeks',
    deliverables: ['Complete Logo System (all variations)', 'Color Palette (HEX, RGB, CMYK)', 'Typography System', 'Brand Guidelines PDF', 'Business Card Design', 'Letterhead & Envelope', 'Social Media Profile Assets', 'Email Signature', 'Pattern & Textures', 'All Source Files'],
    process: [
      { step: 1, title: 'Brand Discovery', description: 'In-depth discovery session covering brand mission, positioning, audience, competitors, and vision.' },
      { step: 2, title: 'Research & Strategy', description: 'Market research, competitor audit, and brand positioning strategy before creative work begins.' },
      { step: 3, title: 'Concept Development', description: 'Logo exploration, color exploration, and typography selection — all presented for approval.' },
      { step: 4, title: 'System Design', description: 'Full brand system built around the approved direction — all elements designed and tested.' },
      { step: 5, title: 'Applications', description: 'Logo and brand applied across all required touchpoints — print, digital, and environmental.' },
      { step: 6, title: 'Guidelines & Delivery', description: 'Complete brand guidelines document and all organized source files delivered.' },
    ],
    faqs: [
      { q: 'What industries do you work with?', a: 'Education, food & restaurant, technology, fitness, real estate, medical, e-commerce, personal brands, and more.' },
      { q: 'Is the brand guidelines PDF editable?', a: 'The guidelines are delivered as a polished PDF. Editable source files for the guidelines document are available on request.' },
      { q: 'Can the identity be expanded later?', a: 'Yes. The system is designed to scale — additional assets and applications can always be added to an established identity.' },
    ],
    relatedCategory: 'branding',
  },
}

// Add remaining services with minimal data
// ─── Remaining 7 services with full detail ─────────────────────────────────
const SERVICES_EXTRA: typeof SERVICES = {
  'social-media-design': {
    slug: 'social-media-design', name: 'Social Media Design', nameAr: 'تصميم السوشيال ميديا',
    accentColor: '#A855F7',
    description: 'High-impact posts, stories, and ad creatives that stop the scroll.',
    longDescription: 'Social media design is where brand meets performance. Every post is crafted to reflect the brand identity while maximising engagement — designed for real-world platforms with the right dimensions, safe zones, and visual hierarchy.',
    startingPrice: 250, maxPrice: 800, currency: 'EGP', delivery: '1–3 Business Days',
    deliverables: ['Social Media Posts (Feed)', 'Story Designs', 'Ad Creative Variants', 'Campaign Series', 'Editable Source Files'],
    process: [
      { step: 1, title: 'Brief & Brand Assets', description: 'Receive existing brand assets and campaign brief.' },
      { step: 2, title: 'Concept Direction', description: 'Visual concept presented for approval before full production.' },
      { step: 3, title: 'Design Production', description: 'All required posts and story formats designed at correct specs.' },
      { step: 4, title: 'Feedback Round', description: 'Revision round based on your feedback.' },
      { step: 5, title: 'Final Delivery', description: 'Exported in all required formats — PNG, JPG, and PDF.' },
    ],
    faqs: [
      { q: 'Do you design for all platforms?', a: 'Yes — Instagram (Feed, Stories, Reels), Facebook, LinkedIn, TikTok, Twitter/X, and Snapchat.' },
      { q: 'Can you create monthly packages?', a: 'Yes. Monthly social media design packages are available for consistent brand presence.' },
    ],
    relatedCategory: 'social',
  },
  'website-design': {
    slug: 'website-design', name: 'Website Design & Development', nameAr: 'تصميم وتطوير المواقع',
    accentColor: '#22C55E',
    description: 'Fast, responsive, conversion-focused websites that reflect your brand identity.',
    longDescription: 'A website is the most permanent asset in your digital presence. Each site is built with Next.js, fully responsive, SEO-optimised, and connected to a content management system — so you can update content without touching code.',
    startingPrice: 2500, maxPrice: 15000, currency: 'EGP', delivery: '1–3 Weeks',
    deliverables: ['Website Design (Figma)', 'Responsive Development', 'CMS Integration', 'SEO Setup', 'Performance Optimisation', 'Contact Form', 'Deployment'],
    process: [
      { step: 1, title: 'Discovery & Sitemap', description: 'Define the site structure, page list, and conversion goals.' },
      { step: 2, title: 'Wireframes', description: 'Low-fidelity wireframes for layout review before visual design.' },
      { step: 3, title: 'Visual Design', description: 'Full page designs in Figma aligned with your brand identity.' },
      { step: 4, title: 'Development', description: 'Next.js / React build with mobile-first responsive approach.' },
      { step: 5, title: 'Testing & Launch', description: 'Cross-browser testing, performance audit, and Vercel deployment.' },
    ],
    faqs: [
      { q: 'Do I own the code?', a: 'Yes. Full source code is delivered and hosted on your own accounts.' },
      { q: 'Is ongoing maintenance included?', a: 'A one-month support period is included. Ongoing maintenance plans are available separately.' },
    ],
    relatedCategory: 'web',
  },
  'print-design': {
    slug: 'print-design', name: 'Print Design', nameAr: 'التصميم المطبوع',
    accentColor: '#F59E0B',
    description: 'Business cards, brochures, banners, and all corporate print materials — CMYK print-ready.',
    longDescription: 'Every physical touchpoint communicates brand quality. Print design is created at professional CMYK specifications with bleed, crop marks, and print-ready PDF delivery — so what you see on screen is exactly what prints.',
    startingPrice: 1000, maxPrice: 10000, currency: 'EGP', delivery: '2–5 Business Days',
    deliverables: ['Print-Ready PDF', 'CMYK Colour Profile', 'Bleed & Crop Marks', 'Editable Source File (AI/INDD)', 'Preview Mockups'],
    process: [
      { step: 1, title: 'Brief & Specs', description: 'Confirm print dimensions, quantity, and printing house requirements.' },
      { step: 2, title: 'Design', description: 'Full design with CMYK colours and correct bleed margins.' },
      { step: 3, title: 'Proof', description: 'Digital proof for colour and layout approval.' },
      { step: 4, title: 'Print-Ready Export', description: 'PDF/X export at correct specs for your printer.' },
    ],
    faqs: [
      { q: 'Do you liaise with the printer?', a: 'Specs are prepared to match standard print house requirements. Liaison available on request.' },
      { q: 'Can you handle large-format?', a: 'Yes — banners, roll-ups, billboards, and vehicle wraps.' },
    ],
    relatedCategory: 'branding',
  },
  'packaging-design': {
    slug: 'packaging-design', name: 'Packaging Design', nameAr: 'تصميم التغليف',
    accentColor: '#EF4444',
    description: 'Product packaging that stands out on shelves and reflects premium brand value.',
    longDescription: 'Packaging is the first physical interaction a customer has with a product. It must communicate quality, reflect the brand, and be structurally sound. Each packaging project is designed to the exact dieline specification and delivered print-ready.',
    startingPrice: 1500, maxPrice: 8000, currency: 'EGP', delivery: '3–7 Business Days',
    deliverables: ['Packaging Design (all faces)', 'Dieline Layout', 'Print-Ready PDF', 'Mockup Previews', 'Brand Pattern (if applicable)'],
    process: [
      { step: 1, title: 'Product & Dieline', description: 'Receive structural dieline from your manufacturer or create one.' },
      { step: 2, title: 'Concept Design', description: 'Design applied to all packaging faces — top, sides, bottom.' },
      { step: 3, title: 'Mockup Review', description: '3D mockup preview to visualise the finished product.' },
      { step: 4, title: 'Production Files', description: 'Print-ready files at correct specs for your manufacturer.' },
    ],
    faqs: [
      { q: 'Do you design for all packaging types?', a: 'Yes — boxes, bags, labels, sleeves, cups, and pouches.' },
      { q: 'Can you create the dieline if I don\'t have one?', a: 'Yes. Standard dielines for common packaging types are available.' },
    ],
    relatedCategory: 'packaging',
  },
  'sticker-design': {
    slug: 'sticker-design', name: 'Sticker Design', nameAr: 'تصميم الملصقات',
    accentColor: '#06B6D4',
    description: 'Custom stickers and labels — die-cut or standard — ready for commercial printing.',
    longDescription: 'Sticker and label design spans everything from product labels to promotional die-cuts. Files are delivered at the correct specifications for offset, digital, or large-format printing — with vector source files included.',
    startingPrice: 300, maxPrice: 1000, currency: 'EGP', delivery: '1–2 Business Days',
    deliverables: ['Sticker Design', 'Vector Source File (AI)', 'Print-Ready PDF', 'Cut Path / Die-Line', 'PNG Preview'],
    process: [
      { step: 1, title: 'Brief', description: 'Size, shape, quantity, and use-case confirmed.' },
      { step: 2, title: 'Design', description: 'Full artwork with correct bleed and cut path.' },
      { step: 3, title: 'Delivery', description: 'Print-ready files exported at correct specifications.' },
    ],
    faqs: [
      { q: 'What sizes do you design for?', a: 'Any standard or custom size. Just provide the dimensions required by your printer.' },
    ],
    relatedCategory: 'branding',
  },
  'content-writing': {
    slug: 'content-writing', name: 'Content Writing', nameAr: 'كتابة المحتوى',
    accentColor: '#8B5CF6',
    description: 'Brand messaging, website copy, and marketing content in Arabic and English.',
    longDescription: 'Content strategy and copywriting that connects your brand to your audience. Every word is written with the brand voice, target audience, and conversion goal in mind — whether it\'s a website landing page, campaign tagline, or social media caption.',
    startingPrice: 500, maxPrice: 5000, currency: 'EGP', delivery: 'Varies by scope',
    deliverables: ['Brand Voice Guidelines', 'Website Copy', 'Social Media Captions', 'Campaign Messaging', 'Email Copy', 'Arabic & English Versions'],
    process: [
      { step: 1, title: 'Brand Voice Brief', description: 'Define tone, personality, audience, and key messages.' },
      { step: 2, title: 'Content Strategy', description: 'Content map and messaging hierarchy agreed before writing.' },
      { step: 3, title: 'Copywriting', description: 'First draft delivered for review.' },
      { step: 4, title: 'Revision', description: 'One round of revisions based on feedback.' },
      { step: 5, title: 'Final Copy', description: 'Final copy delivered in editable document format.' },
    ],
    faqs: [
      { q: 'Do you write in Arabic?', a: 'Yes — Arabic-first or bilingual content is a speciality, especially for MENA market brands.' },
      { q: 'Can you write SEO-optimised content?', a: 'Yes. Keyword-aware web copy and blog articles are available.' },
    ],
    relatedCategory: 'social',
  },
  'marketing-consultation': {
    slug: 'marketing-consultation', name: 'Marketing Consultation', nameAr: 'الاستشارة التسويقية',
    accentColor: '#F97316',
    description: 'Strategic brand and marketing consultation via Google Meet.',
    longDescription: 'A focused consultation session to clarify your brand positioning, marketing strategy, and creative direction. Each session produces a written summary with actionable next steps tailored to your business.',
    startingPrice: 0, maxPrice: 0, currency: 'EGP', delivery: '60-minute session',
    deliverables: ['60-Minute Video Call', 'Brand Audit Review', 'Strategic Recommendations', 'Written Session Summary', 'Action Plan Document'],
    process: [
      { step: 1, title: 'Pre-Session Brief', description: 'Short questionnaire completed before the call to maximise session value.' },
      { step: 2, title: 'Google Meet Call', description: 'Focused 60-minute strategy session.' },
      { step: 3, title: 'Written Summary', description: 'Detailed written summary and action plan delivered within 24 hours.' },
    ],
    faqs: [
      { q: 'Is the first consultation free?', a: 'Yes. An initial 30-minute discovery call is free for all new clients.' },
      { q: 'Can I record the session?', a: 'Yes. You\'re welcome to record the Google Meet call for your own reference.' },
    ],
    relatedCategory: 'branding',
  },
}

// Merge all services
const ALL_SERVICES = { ...SERVICES, ...SERVICES_EXTRA }

const SERVICE_SLUGS = [
  'logo-design', 'brand-identity', 'social-media-design',
  'website-design', 'print-design', 'packaging-design',
  'sticker-design', 'content-writing', 'marketing-consultation',
]

export async function generateStaticParams() {
  return SERVICE_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = ALL_SERVICES[params.slug]
  if (!service) return { title: 'Service Not Found' }
  return {
    title: `${service.name} — Ahmed Ammar`,
    description: service.longDescription.slice(0, 160),
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = ALL_SERVICES[params.slug]
  if (!service) notFound()

  const relatedProjects = PORTFOLIO_PROJECTS.filter(
    (p) => p.category === service.relatedCategory
  ).slice(0, 3)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceSchema({ name: service.name, description: service.description, startingPrice: service.startingPrice, currency: service.currency })
          ),
        }}
      />
      <div className="pt-24">
        {/* Hero */}
        <div className="border-b border-[var(--border)] py-20 bg-[var(--bg-secondary)]">
          <div className="container-main">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="eyebrow mb-4" style={{ color: service.accentColor }}>
                  {service.name}
                </div>
                <h1 className="text-display-lg text-[var(--text-primary)] mb-5">
                  {service.longDescription.split('.')[0]}.
                </h1>
                <div className="flex items-center gap-6 mb-8">
                  <div>
                    <div className="text-xs text-[var(--text-muted)] mb-0.5 flex items-center gap-1">
                      <Tag size={10} /> Starting from
                    </div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">
                      {service.startingPrice === 0
                        ? 'Custom Quote'
                        : `${service.startingPrice.toLocaleString()} ${service.currency}`}
                    </div>
                  </div>
                  <div className="w-px h-10 bg-[var(--border)]" />
                  <div>
                    <div className="text-xs text-[var(--text-muted)] mb-0.5 flex items-center gap-1">
                      <Clock size={10} /> Delivery
                    </div>
                    <div className="text-xl font-bold text-[var(--text-primary)]">{service.delivery}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link href="/book-consultation" className="px-6 py-3 bg-[var(--accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--accent-hover)] transition-all">
                    Book Free Consultation
                  </Link>
                  <Link href="/contact" className="px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] font-semibold text-sm rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                    Get a Quote
                  </Link>
                </div>
              </div>

              {/* Deliverables */}
              <div className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
                <h2 className="text-sm font-bold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
                  What's Included
                </h2>
                <ul className="space-y-2.5">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                      <Check size={15} className="shrink-0 mt-0.5" style={{ color: service.accentColor }} />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Process */}
        <section className="section">
          <div className="container-main">
            <div className="eyebrow mb-4">How It Works</div>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-12">The Process</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {service.process.map((step) => (
                <div key={step.step} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white mb-4"
                    style={{ background: service.accentColor }}
                  >
                    {step.step}
                  </div>
                  <h3 className="font-semibold text-[var(--text-primary)] mb-2">{step.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border)]">
            <div className="container-main">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <div className="eyebrow mb-3">Portfolio</div>
                  <h2 className="text-heading-1 text-[var(--text-primary)]">Related Projects</h2>
                </div>
                <Link href="/portfolio" className="text-sm text-[var(--accent)] hover:underline flex items-center gap-1 group">
                  All Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {relatedProjects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/portfolio/${project.slug}`}
                    className="group rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={project.cover}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: project.accentColor }}>
                        {project.industry}
                      </p>
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1">
                        {project.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs */}
        <section className="section">
          <div className="container-main max-w-2xl">
            <div className="eyebrow mb-4">Questions</div>
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-10">
              Common Questions About {service.name}
            </h2>
            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <div key={i} className="p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">{faq.q}</h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <div className="border-t border-[var(--border)] py-20 bg-[var(--bg-secondary)]">
          <div className="container-main text-center">
            <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-body-lg text-[var(--text-muted)] mb-8 max-w-lg mx-auto">
              Book a free consultation to discuss your project and get a tailored proposal.
            </p>
            <Link href="/book-consultation" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all">
              Book Free Consultation
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

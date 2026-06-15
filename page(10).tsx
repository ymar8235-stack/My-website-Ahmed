import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Download } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About — Ahmed Ammar',
  description: 'Learn about Ahmed Ammar — professional graphic designer, brand identity specialist, and website creator based in Egypt.',
}

const timeline = [
  { year: '2019', title: 'Started Freelancing', description: 'Began professional graphic design and brand identity work serving local Egyptian businesses.' },
  { year: '2020', title: 'Expanded to Social Media', description: 'Added comprehensive social media design and advertising campaign services.' },
  { year: '2021', title: 'First Major Brand Identity', description: 'Delivered first complete brand identity system for a regional educational institution.' },
  { year: '2022', title: 'Website Design Added', description: 'Expanded services to include full website design and development using modern frameworks.' },
  { year: '2023', title: '100+ Clients Milestone', description: 'Reached 100+ satisfied clients across Egypt and MENA region spanning multiple industries.' },
  { year: '2024', title: 'Premium Positioning', description: 'Focused on premium brand identity, large-scale campaigns, and enterprise-level visual systems.' },
]

const skills = [
  { category: 'Brand Design', items: ['Logo Design', 'Visual Identity Systems', 'Brand Guidelines', 'Brand Strategy', 'Logo Construction', 'Grid Systems'] },
  { category: 'Digital & Print', items: ['Social Media Design', 'Advertising Campaigns', 'Print Design', 'Packaging Design', 'Sticker Design', 'Signage'] },
  { category: 'Technology', items: ['Website Design', 'Next.js / React', 'UI/UX Design', 'Figma', 'Adobe Creative Suite', 'AI Design Tools'] },
  { category: 'Strategy', items: ['Content Writing', 'Marketing Consultation', 'Brand Positioning', 'Market Research', 'Campaign Planning', 'Client Education'] },
]

export default function AboutPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <section className="border-b border-[var(--border)] py-20 bg-[var(--bg-secondary)]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="eyebrow mb-4">About Me</div>
              <h1 className="text-display-lg text-[var(--text-primary)] mb-6">
                Designing Identities That Define Businesses
              </h1>
              <p className="text-body-lg text-[var(--text-muted)] mb-5 leading-relaxed">
                Ahmed Ammar is a professional graphic designer focused on building complete visual identity systems rather than creating ordinary designs.
              </p>
              <p className="text-body-md text-[var(--text-muted)] mb-8 leading-relaxed">
                His work is based on strategic thinking, geometric construction, creative problem solving, and strong branding principles. Every project starts with understanding the business, its market, and its audience — before a single mark is drawn.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/book-consultation" className="px-6 py-3 bg-[var(--accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--accent-hover)] transition-all">
                  Book a Consultation
                </Link>
                <a href="/downloads/ahmed-ammar-cv.pdf" download className="inline-flex items-center gap-2 px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] font-semibold text-sm rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
                  <Download size={15} /> Download CV
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden aspect-[3/4] bg-[var(--bg-card)] border border-[var(--border)] max-w-md mx-auto">
                <Image
                  src="/images/ahmed-ammar.jpg"
                  alt="Ahmed Ammar — Professional Graphic Designer"
                  fill
                  className="object-cover object-center"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: '5+', label: 'Years' },
                      { value: '180+', label: 'Clients' },
                      { value: '240+', label: 'Projects' },
                    ].map((s) => (
                      <div key={s.label} className="text-center bg-black/40 backdrop-blur-sm rounded-xl py-2 border border-white/10">
                        <div className="text-xl font-bold text-white">{s.value}</div>
                        <div className="text-[10px] text-white/70">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <div className="container-main">
          <div className="eyebrow mb-4">Expertise</div>
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-12">Skills & Capabilities</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div key={skill.category} className="p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)]">
                <h3 className="text-sm font-bold text-[var(--accent)] mb-4 uppercase tracking-wider">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item) => (
                    <li key={item} className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-[var(--bg-secondary)] border-t border-[var(--border)]">
        <div className="container-main max-w-3xl">
          <div className="eyebrow mb-4">Journey</div>
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-12">Professional Timeline</h2>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--border)]" />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={item.year} className="relative flex gap-8 items-start">
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[var(--accent)]">{item.year}</span>
                  </div>
                  <div className="pt-3">
                    <h3 className="text-heading-4 text-[var(--text-primary)] mb-1">{item.title}</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section border-t border-[var(--border)]">
        <div className="container-main text-center">
          <h2 className="text-heading-1 text-[var(--text-primary)] mb-4">Ready to Work Together?</h2>
          <p className="text-body-lg text-[var(--text-muted)] mb-8 max-w-lg mx-auto">
            Let's create a brand identity that positions your business for long-term success.
          </p>
          <Link href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all">
            Start a Project
          </Link>
        </div>
      </section>
    </div>
  )
}

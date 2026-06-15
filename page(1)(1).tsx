import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, Building, Tag } from 'lucide-react'
import { PORTFOLIO_PROJECTS } from '@/components/sections/PortfolioSection'

export async function generateStaticParams() {
  return PORTFOLIO_PROJECTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === params.slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} — Portfolio | Ahmed Ammar`,
    description: project.tagline,
    openGraph: {
      images: [{ url: project.cover }],
    },
  }
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = PORTFOLIO_PROJECTS.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const related = PORTFOLIO_PROJECTS.filter(
    (p) => p.category === project.category && p.slug !== project.slug
  ).slice(0, 3)

  return (
    <div className="pt-20">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <Image
          src={project.cover}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/40 to-transparent" />
        <div className="relative container-main pb-16 z-10">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Portfolio
          </Link>
          <div className="flex flex-wrap gap-4 mb-4">
            <span
              className="px-3 py-1 text-xs font-semibold rounded-full text-white"
              style={{ background: project.accentColor }}
            >
              {project.categoryLabel}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Building size={12} /> {project.industry}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/60">
              <Calendar size={12} /> {project.year}
            </span>
          </div>
          <h1 className="text-display-lg text-white mb-3">{project.title}</h1>
          <p className="text-body-lg text-white/70 max-w-2xl">{project.tagline}</p>
        </div>
      </section>

      {/* ── Case Study Content ────────────────────── */}
      <div className="container-main py-20 max-w-4xl">

        {/* Overview */}
        <section className="mb-20">
          <div className="eyebrow mb-4">Project Overview</div>
          <h2 className="text-heading-2 text-[var(--text-primary)] mb-6">About This Project</h2>
          <p className="text-body-lg text-[var(--text-muted)] leading-relaxed mb-8">
            This project represents a complete visual identity system developed for {project.title} in the {project.industry} industry.
            Every design decision was made with strategic intent, ensuring the brand communicates the right message
            to the right audience across all touchpoints.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Industry', value: project.industry },
              { label: 'Category', value: project.categoryLabel },
              { label: 'Year', value: project.year },
              { label: 'Duration', value: '3 Weeks' },
            ].map((item) => (
              <div key={item.label} className="p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
                <div className="text-xs text-[var(--text-muted)] mb-1">{item.label}</div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">{item.value}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Challenge */}
        <section className="mb-20">
          <div className="eyebrow mb-4">Challenge</div>
          <h2 className="text-heading-2 text-[var(--text-primary)] mb-6">The Business Problem</h2>
          <p className="text-body-lg text-[var(--text-muted)] leading-relaxed">
            The client needed a visual identity that clearly differentiated them from competitors while
            communicating their core values and unique value proposition. The challenge was to create
            a system that works across multiple touchpoints — from digital to print — while remaining
            consistent and memorable.
          </p>
        </section>

        {/* Gallery */}
        <section className="mb-20">
          <div className="eyebrow mb-4">Visual System</div>
          <h2 className="text-heading-2 text-[var(--text-primary)] mb-8">Brand Applications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-video rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden"
              >
                <Image
                  src={`/images/portfolio/${project.id}-${i}.jpg`}
                  alt={`${project.title} application ${i}`}
                  width={640}
                  height={360}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="text-center py-16 rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] px-8">
          <h2 className="text-heading-2 text-[var(--text-primary)] mb-4">
            Need a Brand Identity Like This?
          </h2>
          <p className="text-body-md text-[var(--text-muted)] mb-8 max-w-md mx-auto">
            Let's build a visual identity that positions your business for success.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              href="/book-consultation"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--accent)] text-white font-semibold rounded-xl hover:bg-[var(--accent-hover)] transition-all"
            >
              Book Consultation
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[var(--border)] text-[var(--text-secondary)] font-semibold rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all"
            >
              Start Your Project
            </Link>
          </div>
        </section>
      </div>

      {/* ── Related Projects ──────────────────────── */}
      {related.length > 0 && (
        <div className="border-t border-[var(--border)] py-16">
          <div className="container-main">
            <h2 className="text-heading-3 text-[var(--text-primary)] mb-8">Related Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <Link
                  key={p.id}
                  href={`/portfolio/${p.slug}`}
                  className="group rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image src={p.cover} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: p.accentColor }}>{p.categoryLabel}</p>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] line-clamp-1">{p.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

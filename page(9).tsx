import type { Metadata } from 'next'
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Portfolio — Ahmed Ammar',
  description:
    'Browse all branding, logo design, packaging, social media, and website design projects by Ahmed Ammar.',
}

export default function PortfolioPage({
  searchParams,
}: {
  searchParams: { category?: string }
}) {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div
        className="border-b border-[var(--border)] py-20"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="container-main">
          <div className="eyebrow mb-4">Portfolio</div>
          <h1 className="text-display-lg text-[var(--text-primary)] mb-4 max-w-2xl">
            Crafting Identities That Define Businesses
          </h1>
          <p className="text-body-lg text-[var(--text-muted)] max-w-xl">
            Brand identity systems, marketing campaigns, packaging, and digital design for clients
            across education, food, tech, fitness, and telecom industries.
          </p>
        </div>
      </div>

      <PortfolioGrid defaultCategory={searchParams.category} />
    </div>
  )
}

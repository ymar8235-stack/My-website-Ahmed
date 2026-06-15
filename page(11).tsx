import type { Metadata } from 'next'
import Image from 'next/image'
import { Award, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Awards & Recognition — Ahmed Ammar',
  description: 'Awards, certificates, and professional recognition received by Ahmed Ammar.',
}

const awards = [
  {
    id: '1',
    title: 'Arab Creators Certificate',
    titleAr: 'شهادة المبدعين العرب',
    organization: 'Arab Creators',
    year: '2024',
    description: 'Recognition of excellence in Arabic creative design and visual identity work across the Arab world.',
    descriptionAr: 'تقدير للتميز في التصميم الإبداعي العربي وعمل الهوية البصرية عبر العالم العربي.',
    image: '/images/awards/arab-creators.jpg',
    featured: true,
  },
]

export default function AwardsPage() {
  return (
    <div className="pt-24">
      <div className="border-b border-[var(--border)] py-20 bg-[var(--bg-secondary)]">
        <div className="container-main max-w-3xl">
          <div className="eyebrow mb-4">Recognition</div>
          <h1 className="text-display-lg text-[var(--text-primary)] mb-4">Awards & Achievements</h1>
          <p className="text-body-lg text-[var(--text-muted)]">
            Professional recognition, certificates, and achievements in design and branding.
          </p>
        </div>
      </div>

      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {awards.map((award) => (
            <div key={award.id}
              className="group p-6 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300">
              {/* Award image */}
              <div className="relative aspect-video rounded-xl overflow-hidden bg-[var(--bg-secondary)] mb-5">
                {award.image ? (
                  <Image src={award.image} alt={award.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Award size={48} className="text-[var(--accent)] opacity-30" />
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-light)]">
                  {award.organization}
                </span>
                {award.featured && (
                  <span className="px-2.5 py-0.5 text-[10px] font-semibold rounded-full bg-yellow-400/10 text-yellow-400 border border-yellow-400/20">
                    Featured
                  </span>
                )}
              </div>
              <h2 className="font-semibold text-[var(--text-primary)] mb-1">{award.title}</h2>
              <p className="text-[10px] text-[var(--text-muted)] flex items-center gap-1 mb-3">
                <Calendar size={10} /> {award.year}
              </p>
              <p className="text-sm text-[var(--text-muted)] leading-relaxed">{award.description}</p>
            </div>
          ))}
        </div>

        {awards.length === 0 && (
          <div className="text-center py-20 text-[var(--text-muted)]">
            <Award size={48} className="mx-auto mb-4 opacity-20" />
            <p>Awards will appear here as they are earned.</p>
          </div>
        )}
      </div>
    </div>
  )
}

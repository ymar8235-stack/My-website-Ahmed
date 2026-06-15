import type { Metadata } from 'next'
import { CalendlyEmbed } from '@/components/booking/CalendlyEmbed'
import { Calendar, Video, Clock, CheckCircle2 } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Book a Consultation — Ahmed Ammar',
  description: 'Schedule a free consultation with Ahmed Ammar. Discuss your branding, logo, or website project.',
}

const consultationTypes = [
  { id: 'brand', label: 'Brand Identity Consultation', labelAr: 'استشارة هوية العلامة التجارية', duration: '60 min', icon: '◈' },
  { id: 'logo', label: 'Logo Design Consultation', labelAr: 'استشارة تصميم الشعار', duration: '45 min', icon: '✦' },
  { id: 'website', label: 'Website Consultation', labelAr: 'استشارة الموقع الإلكتروني', duration: '45 min', icon: '⬡' },
  { id: 'marketing', label: 'Marketing Consultation', labelAr: 'استشارة التسويق', duration: '60 min', icon: '▲' },
  { id: 'general', label: 'General Consultation', labelAr: 'استشارة عامة', duration: '30 min', icon: '◉' },
]

const benefits = [
  'Free 30-minute discovery session',
  'No commitment required',
  'Google Meet video call',
  'Get a tailored project roadmap',
  'Receive a detailed proposal afterward',
]

export default function BookConsultationPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="border-b border-[var(--border)] py-20 bg-[var(--bg-secondary)]">
        <div className="container-main">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="eyebrow mb-4">Free Consultation</div>
              <h1 className="text-display-lg text-[var(--text-primary)] mb-5">
                Schedule a Free Consultation
              </h1>
              <p className="text-body-lg text-[var(--text-muted)] mb-8">
                Choose a convenient time and let's discuss your project. No commitment required — just an honest conversation about your goals.
              </p>
              <ul className="space-y-3">
                {benefits.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center">
                  <Video size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">Google Meet</div>
                  <div className="text-xs text-[var(--text-muted)]">Automatic link sent on booking</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center">
                  <Calendar size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">Calendar Invite</div>
                  <div className="text-xs text-[var(--text-muted)]">Added to your calendar automatically</div>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)]">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-subtle)] flex items-center justify-center">
                  <Clock size={18} className="text-[var(--accent)]" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">Flexible Scheduling</div>
                  <div className="text-xs text-[var(--text-muted)]">Choose from available time slots</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Types */}
      <div className="container-main py-12">
        <h2 className="text-heading-2 text-[var(--text-primary)] mb-6">Choose Consultation Type</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
          {consultationTypes.map((type) => (
            <button
              key={type.id}
              className="group p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] hover:bg-[var(--accent-subtle)] transition-all duration-200 text-left"
            >
              <div className="text-xl mb-2 text-[var(--accent)]">{type.icon}</div>
              <div className="text-xs font-semibold text-[var(--text-primary)] mb-1 leading-snug">{type.label}</div>
              <div className="text-[10px] text-[var(--text-muted)]">{type.duration}</div>
            </button>
          ))}
        </div>

        {/* Calendly Embed */}
        <div className="rounded-3xl border border-[var(--border)] overflow-hidden bg-[var(--bg-card)]">
          <CalendlyEmbed url={process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/ahmedammar'} />
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { ContactForm } from '@/components/forms/ContactForm'
import { MessageCircle, Mail, Send, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: "Contact — Ahmed Ammar",
  description: "Get in touch with Ahmed Ammar. Start a branding project, book a consultation, or send a message.",
}

const contactMethods = [
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+20 115 394 3689',
    href: 'https://wa.me/201153943689',
    color: '#25D366',
    note: 'Fastest response',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'ymar8235@gmail.com',
    href: 'mailto:ymar8235@gmail.com',
    color: '#0071E3',
    note: 'Response within 24h',
  },
  {
    icon: Send,
    label: 'Telegram',
    value: '+20 115 394 3689',
    href: 'https://t.me/201153943689',
    color: '#2AABEE',
    note: 'Available for quick chats',
  },
]

export default function ContactPage() {
  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="border-b border-[var(--border)] py-20 bg-[var(--bg-secondary)]">
        <div className="container-main max-w-3xl">
          <div className="eyebrow mb-4">Get in Touch</div>
          <h1 className="text-display-lg text-[var(--text-primary)] mb-4">
            Let's Build Something Exceptional Together
          </h1>
          <p className="text-body-lg text-[var(--text-muted)] max-w-2xl">
            Whether you need a complete visual identity, website, marketing strategy, or creative
            consultation — let's discuss your project and create something meaningful.
          </p>
          <div className="flex items-center gap-2 mt-6 text-sm text-[var(--text-muted)]">
            <Clock size={14} className="text-[var(--accent)]" />
            Usually responds within 2 hours
          </div>
        </div>
      </div>

      <div className="container-main py-16">
        <div className="grid lg:grid-cols-3 gap-12">

          {/* Contact Methods */}
          <div className="lg:col-span-1">
            <h2 className="text-heading-3 text-[var(--text-primary)] mb-6">Contact Methods</h2>
            <div className="space-y-4 mb-10">
              {contactMethods.map((method) => (
                <a
                  key={method.label}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300 group"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${method.color}15`, color: method.color }}
                  >
                    <method.icon size={18} />
                  </div>
                  <div>
                    <div className="text-xs text-[var(--text-muted)] mb-0.5">{method.label}</div>
                    <div className="text-sm font-medium text-[var(--text-primary)]">{method.value}</div>
                    <div className="text-[10px] text-[var(--text-muted)] mt-0.5">{method.note}</div>
                  </div>
                </a>
              ))}
            </div>

            {/* Quick Book CTA */}
            <div className="p-5 rounded-2xl border border-[var(--accent)] bg-[var(--accent-subtle)]">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Prefer a Call?</h3>
              <p className="text-xs text-[var(--text-muted)] mb-4">
                Book a free 30-minute consultation directly in the calendar.
              </p>
              <a
                href="/book-consultation"
                className="inline-flex items-center gap-2 w-full justify-center px-4 py-2.5 bg-[var(--accent)] text-white text-sm font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
              >
                Book Free Consultation
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <h2 className="text-heading-3 text-[var(--text-primary)] mb-6">Send a Message</h2>
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  )
}

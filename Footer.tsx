import Link from 'next/link'
import { MessageCircle, Mail, Send } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
]

const serviceLinks = [
  { href: '/services/logo-design', label: 'Logo Design' },
  { href: '/services/brand-identity', label: 'Brand Identity' },
  { href: '/services/social-media-design', label: 'Social Media Design' },
  { href: '/services/website-design', label: 'Website Design' },
  { href: '/services/print-design', label: 'Print Design' },
  { href: '/services/packaging-design', label: 'Packaging Design' },
]

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="container-main py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                AA
              </div>
              <span className="font-semibold text-[var(--text-primary)]">Ahmed Ammar</span>
            </Link>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
              Professional Graphic Designer, Brand Identity Specialist, and Website Creator based in Egypt.
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="https://wa.me/201153943689"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <MessageCircle size={14} className="text-green-500" />
                <span>WhatsApp</span>
              </a>
              <a
                href="mailto:ymar8235@gmail.com"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Mail size={14} className="text-[var(--accent)]" />
                <span>ymar8235@gmail.com</span>
              </a>
              <a
                href="https://t.me/201153943689"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              >
                <Send size={14} className="text-blue-400" />
                <span>Telegram</span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)] mb-4">
              Stay Updated
            </h3>
            <p className="text-sm text-[var(--text-muted)] mb-4 leading-relaxed">
              Get branding tips, case studies, and design insights delivered to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 min-w-0 px-3 py-2 text-sm bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[var(--accent)] text-white text-sm font-medium rounded-lg hover:bg-[var(--accent-hover)] transition-colors shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[var(--border)] mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            © {year} Ahmed Ammar. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)]">
            Crafted with precision and passion.
          </p>
        </div>
      </div>
    </footer>
  )
}

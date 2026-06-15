import type { Metadata, Viewport } from 'next'
import { Inter, Plus_Jakarta_Sans, Cairo } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

// ─── Fonts ───────────────────────────────────────────────────────────────────
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ahmedammar.com'),
  title: {
    default: 'Ahmed Ammar | Professional Graphic Designer & Brand Identity Specialist',
    template: '%s | Ahmed Ammar',
  },
  description:
    'Professional Graphic Designer, Brand Identity Designer, Logo Designer, Website Creator, and Marketing Specialist. 5+ years of experience creating premium visual identities for businesses worldwide.',
  keywords: [
    'graphic designer',
    'brand identity designer',
    'logo designer',
    'visual identity',
    'website designer',
    'freelance designer',
    'branding specialist',
    'مصمم جرافيك',
    'تصميم هوية بصرية',
    'تصميم شعار',
    'Ahmed Ammar',
    'أحمد عمار',
  ],
  authors: [{ name: 'Ahmed Ammar', url: 'https://ahmedammar.com' }],
  creator: 'Ahmed Ammar',
  publisher: 'Ahmed Ammar',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ar_EG',
    url: 'https://ahmedammar.com',
    siteName: 'Ahmed Ammar',
    title: 'Ahmed Ammar | Professional Graphic Designer & Brand Identity Specialist',
    description:
      'Professional Graphic Designer, Brand Identity Designer, Logo Designer, Website Creator. 5+ years of experience.',
    images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Ahmed Ammar - Graphic Designer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ahmed Ammar | Graphic Designer',
    description: 'Professional Graphic Designer & Brand Identity Specialist',
    images: ['/images/og-image.jpg'],
  },
  alternates: {
    canonical: 'https://ahmedammar.com',
    languages: {
      'en-US': 'https://ahmedammar.com',
      'ar-EG': 'https://ahmedammar.com/ar',
    },
  },
  icons: {
    icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
    { media: '(prefers-color-scheme: light)', color: '#F5F5F7' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// ─── Structured Data ───────────────────────────────────────────────────────────
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ahmed Ammar',
  url: 'https://ahmedammar.com',
  email: 'ymar8235@gmail.com',
  telephone: '+201153943689',
  image: 'https://ahmedammar.com/images/ahmed-ammar.jpg',
  sameAs: [
    'https://wa.me/201153943689',
    'https://t.me/201153943689',
  ],
  jobTitle: 'Professional Graphic Designer',
  description: 'Professional Graphic Designer, Brand Identity Designer, Logo Designer, Website Creator, and Marketing Specialist.',
  knowsAbout: [
    'Graphic Design',
    'Brand Identity',
    'Logo Design',
    'Visual Identity',
    'Website Design',
    'Print Design',
    'Marketing',
  ],
  offers: {
    '@type': 'Offer',
    description: 'Professional Design and Branding Services',
  },
}

// ─── Root Layout ──────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className={`${inter.variable} ${jakarta.variable} ${cairo.variable}`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          storageKey="ahmed-ammar-theme"
          disableTransitionOnChange={false}
        >
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: 'var(--bg-card)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem',
              },
            }}
          />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

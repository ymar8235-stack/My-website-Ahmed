# Ahmed Ammar — Premium Freelance Portfolio Platform

A complete full-stack portfolio, CMS, CRM, and lead generation platform built for professional graphic designer **Ahmed Ammar**.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + CSS Variables |
| Animation | Framer Motion |
| Backend | Supabase (PostgreSQL + Auth + Storage) |
| Email | Resend |
| Scheduling | Calendly |
| Deployment | Vercel |
| Analytics | Google Analytics 4 + Vercel Analytics |

---

## Features

### Public Platform
- **Homepage** — Hero, stats, about, services, portfolio, clients, testimonials, FAQ, CTA
- **Portfolio** — Masonry grid, category filtering, URL-state deep-linking, search
- **Case Studies** — Full brand identity presentation per project
- **Services** — 9 services with pricing, process, deliverables, and per-service FAQs
- **Blog** — Article listing, individual pages, category filtering, reading progress
- **Resources** — Downloadable PDFs with optional email gate
- **FAQ** — Grouped accordion with structured data (Schema.org FAQPage)
- **Contact** — Form with Supabase storage + Resend email notifications
- **Book Consultation** — Calendly embed with Google Meet integration
- **About** — Timeline, skills, portrait, CV download
- **Awards** — Certifications and recognition showcase
- **Clients** — Industry-filtered client logo wall

### Admin Dashboard
- **Projects CMS** — Create, edit, publish, archive, reorder projects
- **Blog CMS** — Rich article editor with auto-save, bilingual content
- **Services CMS** — Edit pricing, descriptions, delivery times
- **Lead CRM** — Status pipeline (New → Won/Lost), notes, quick actions
- **Bookings** — Upcoming consultations with Google Meet links
- **Clients** — Logo management with featured toggle
- **Testimonials** — Approve, feature, star-rate reviews
- **Awards** — Certificate and recognition management
- **FAQ** — Bilingual Q&A management
- **Resources** — Downloadable file management with download tracking
- **Media Library** — Supabase Storage browser with drag & drop upload
- **Analytics** — KPIs, service demand chart, content performance
- **Settings** — Site-wide config (stats, contact info, language) without code changes
- **Account** — Password change, session management, security rules

### Design System
- Dark mode default, light mode toggle (next-themes)
- Full CSS variable design token system
- Bilingual: Arabic (RTL, Cairo font) + English (LTR, Inter font)
- Premium custom cursor with context-aware labels
- Scroll progress indicator
- Floating WhatsApp button
- Framer Motion animations throughout (respects `prefers-reduced-motion`)

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx               # Root layout (fonts, metadata, providers)
│   ├── loading.tsx              # Global loading state
│   ├── not-found.tsx            # 404 page
│   ├── globals.css              # CSS variables + Tailwind base
│   ├── (public)/                # All public-facing routes
│   │   ├── layout.tsx           # Public layout (Navbar, Footer, cursor)
│   │   ├── page.tsx             # Homepage
│   │   ├── portfolio/           # /portfolio + /portfolio/[slug]
│   │   ├── services/            # /services + /services/[slug]
│   │   ├── blog/                # /blog + /blog/[slug]
│   │   ├── about/
│   │   ├── contact/
│   │   ├── book-consultation/
│   │   ├── faq/
│   │   ├── resources/
│   │   ├── awards/
│   │   └── clients/
│   ├── (admin)/admin/           # All admin routes (auth-protected)
│   │   ├── layout.tsx           # Admin layout (sidebar)
│   │   ├── login/
│   │   ├── dashboard/
│   │   ├── projects/            # List + [id] edit + new/
│   │   ├── blog/                # List + [id] edit + new/
│   │   ├── services/            # List + [id] edit
│   │   ├── leads/               # List + [id] detail
│   │   ├── bookings/
│   │   ├── clients/
│   │   ├── testimonials/
│   │   ├── awards/
│   │   ├── faq/
│   │   ├── resources/
│   │   ├── media/
│   │   ├── analytics/
│   │   ├── settings/
│   │   └── account/
│   └── api/
│       ├── contact/route.ts     # Lead capture + email
│       ├── newsletter/route.ts  # Subscriber storage
│       └── analytics/route.ts  # Page view tracking
├── components/
│   ├── ui/                      # Button, etc.
│   ├── layout/                  # Navbar, Footer
│   ├── sections/                # Homepage sections
│   ├── portfolio/               # PortfolioGrid
│   ├── forms/                   # ContactForm
│   ├── booking/                 # CalendlyEmbed
│   ├── faq/                     # FAQAccordion
│   ├── resources/               # ResourceDownloadCard
│   ├── common/                  # Cursor, WhatsApp, ScrollProgress
│   └── admin/                   # AdminSidebar, LeadActions
├── lib/
│   ├── supabase/                # client.ts, server.ts, middleware.ts
│   ├── utils.ts                 # cn(), formatDate(), animation variants
│   └── seo.ts                   # Metadata builders, schema generators
├── hooks/
│   └── useScrollAnimation.ts   # useScrollReveal, useCounter, useParallax
├── store/
│   ├── languageStore.ts         # Zustand: language + translations
│   └── themeStore.ts            # Zustand: theme (mirrors next-themes)
├── types/
│   ├── database.ts              # Full Supabase type map
│   └── index.ts                 # App-level types and interfaces
└── i18n/
    ├── en.ts                    # English translations
    └── ar.ts                    # Arabic translations
supabase/
├── migrations/001_initial.sql   # Complete schema + RLS policies
└── seed.sql                     # Sample data for development
```

---

## Setup

### 1. Clone & install

```bash
git clone https://github.com/yourusername/ahmed-ammar-portfolio.git
cd ahmed-ammar-portfolio
npm install
```

### 2. Environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local` — at minimum you need:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL`

### 3. Database setup

In your Supabase project SQL editor, run in order:

```sql
-- 1. Schema + seed data
\i supabase/migrations/001_initial.sql

-- 2. Optional: sample data for development
\i supabase/seed.sql
```

### 4. Supabase Storage

Create these buckets in your Supabase dashboard:
```
projects, project-gallery, case-studies, mockups,
blog-images, resources, clients, awards, avatars, uploads
```

Set all buckets to **Public** read, authenticated write.

### 5. Admin account

In Supabase Auth → Users → Create a new user with your email and a strong password (min 12 chars). This becomes your admin login.

### 6. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the public site.
Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin dashboard.

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Add all `.env.local` variables to Vercel → Project → Settings → Environment Variables.

After deployment, add your domain to:
- Supabase → Authentication → URL Configuration → Site URL
- Supabase → Authentication → URL Configuration → Redirect URLs

---

## Images

Add these images to `/public/images/`:

| Path | Description |
|---|---|
| `ahmed-ammar.jpg` | Hero portrait (dramatic red-lit photo) |
| `ahmed-ammar-about.jpg` | About page portrait |
| `og-image.jpg` | Open Graph share image (1200×630) |
| `portfolio/taqnia-cover.jpg` | Taqnia project cover |
| `portfolio/novatech-cover.jpg` | NovaTech project cover |
| `portfolio/genter-athlete-cover.jpg` | Genter Athlete cover |
| `portfolio/el-khal-cover.jpg` | El Khal cover |
| `portfolio/tafowq-cover.jpg` | Tafowq Academy cover |
| `portfolio/sting-cover.jpg` | Sting Energy campaign cover |
| `portfolio/mcdonalds-cover.jpg` | McDonald's campaign cover |
| `portfolio/we-cover.jpg` | WE Telecom campaign cover |
| `clients/*.png` | Client logos (transparent PNG) |
| `awards/*.jpg` | Award certificate images |
| `blog/*.jpg` | Blog article cover images |

---

## Key Customisation Points

| What | Where |
|---|---|
| Stats (experience, reviews, visits) | Admin → Settings |
| Service pricing | Admin → Services → Edit |
| Portfolio projects | Admin → Projects |
| Blog articles | Admin → Blog |
| Contact info | `.env.local` + Admin → Settings |
| Calendly URL | `NEXT_PUBLIC_CALENDLY_URL` in `.env.local` |
| WhatsApp number | `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` |
| GA tracking | `NEXT_PUBLIC_GA_MEASUREMENT_ID` in `.env.local` |
| Site colors | `src/app/globals.css` → CSS variables |
| Translations | `src/i18n/en.ts` and `src/i18n/ar.ts` |

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | 95+ |
| Lighthouse Accessibility | 95+ |
| Lighthouse Best Practices | 100 |
| Lighthouse SEO | 100 |
| LCP | < 2.5s |
| CLS | < 0.1 |
| INP | < 200ms |

---

## License

Private — all rights reserved. Built for Ahmed Ammar.

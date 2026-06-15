import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog — Ahmed Ammar',
  description: 'Brand strategy, design insights, case studies, and client education articles by Ahmed Ammar.',
}

// Sample articles — replace with Supabase fetch in production
const articles = [
  {
    slug: 'logo-vs-brand-identity',
    title: 'Logo vs Complete Visual Identity: What Every Business Needs to Know',
    titleAr: 'الشعار مقابل الهوية البصرية الكاملة',
    excerpt: 'Most businesses think they need a logo. What they actually need is a complete visual identity system. Here\'s the critical difference and why it matters for your business growth.',
    cover: '/images/blog/logo-vs-brand-identity.jpg',
    category: 'Brand Strategy',
    readingTime: 6,
    date: '2024-11-15',
    featured: true,
  },
  {
    slug: 'how-brand-colors-influence-buying',
    title: 'How Brand Colors Influence Purchasing Decisions',
    titleAr: 'كيف تؤثر ألوان العلامة التجارية على قرارات الشراء',
    excerpt: 'Color psychology is one of the most powerful and underused tools in brand identity design. Choosing the wrong palette can cost you customers without you ever knowing why.',
    cover: '/images/blog/color-psychology.jpg',
    category: 'Brand Strategy',
    readingTime: 8,
    date: '2024-11-08',
    featured: false,
  },
  {
    slug: 'novatech-case-study',
    title: 'Case Study: Building NovaTech — AI Brand Identity from Concept to Launch',
    titleAr: 'دراسة حالة: بناء هوية نوفاتك للذكاء الاصطناعي',
    excerpt: 'A behind-the-scenes look at how we developed the complete brand identity system for NovaTech AI — from the V-mark circuit concept to the full visual system.',
    cover: '/images/blog/novatech-case-study.jpg',
    category: 'Case Studies',
    readingTime: 12,
    date: '2024-10-28',
    featured: false,
  },
  {
    slug: 'how-to-write-design-brief',
    title: 'How to Write a Professional Design Brief That Gets Better Results',
    titleAr: 'كيف تكتب موجزاً تصميمياً احترافياً',
    excerpt: 'A clear design brief is the single most important document in any branding project. Learn how to write one that saves time, reduces revisions, and produces better outcomes.',
    cover: '/images/blog/design-brief.jpg',
    category: 'Client Education',
    readingTime: 5,
    date: '2024-10-15',
    featured: false,
  },
  {
    slug: 'when-to-rebrand',
    title: 'When Does Your Business Actually Need a Rebrand?',
    titleAr: 'متى تحتاج شركتك فعلاً إلى إعادة تسمية العلامة التجارية؟',
    excerpt: 'Rebranding is expensive and risky when done wrong. These are the five real signals that indicate your brand needs strategic renewal — not just a new logo.',
    cover: '/images/blog/rebrand.jpg',
    category: 'Brand Strategy',
    readingTime: 7,
    date: '2024-09-30',
    featured: false,
  },
  {
    slug: 'genter-athlete-case-study',
    title: 'Case Study: Genter Athlete — Creating a Dark, Bold Gym Brand Identity',
    titleAr: 'دراسة حالة: هوية جينتر أثليت الرياضية',
    excerpt: 'How we developed the complete visual identity for Genter Athlete gym — from the circular badge logo to the apparel, equipment branding, and social media system.',
    cover: '/images/blog/genter-case-study.jpg',
    category: 'Case Studies',
    readingTime: 10,
    date: '2024-09-15',
    featured: false,
  },
]

const categories = ['All', 'Brand Strategy', 'Case Studies', 'Client Education']

export default function BlogPage() {
  const featured = articles.find((a) => a.featured)
  const rest = articles.filter((a) => !a.featured)

  return (
    <div className="pt-24">
      {/* Hero */}
      <div className="border-b border-[var(--border)] py-16 bg-[var(--bg-secondary)]">
        <div className="container-main">
          <div className="eyebrow mb-4">Knowledge</div>
          <h1 className="text-display-lg text-[var(--text-primary)] mb-4">Insights & Resources</h1>
          <p className="text-body-lg text-[var(--text-muted)] max-w-xl">
            Brand strategy, design education, case studies, and client guides.
          </p>
        </div>
      </div>

      <div className="container-main py-16">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                cat === 'All'
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Article */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block mb-12 rounded-3xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative aspect-video md:aspect-auto overflow-hidden">
                <Image
                  src={featured.cover}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-light)]">
                    {featured.category}
                  </span>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full border border-[var(--border)] text-[var(--text-muted)]">
                    Featured
                  </span>
                </div>
                <h2 className="text-heading-2 text-[var(--text-primary)] mb-4 group-hover:text-[var(--accent)] transition-colors">
                  {featured.title}
                </h2>
                <p className="text-body-md text-[var(--text-muted)] mb-6 leading-relaxed">{featured.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-[var(--text-muted)]">
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {featured.readingTime} min read</span>
                  <span className="flex items-center gap-1.5"><Calendar size={12} /> {new Date(featured.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300"
            >
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={article.cover}
                  alt={article.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-black/60 text-white backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-2 leading-snug line-clamp-2 group-hover:text-[var(--accent)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">{article.excerpt}</p>
                <div className="flex items-center justify-between text-[10px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><Clock size={10} /> {article.readingTime} min read</span>
                  <span>{new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

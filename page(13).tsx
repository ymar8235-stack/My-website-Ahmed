import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react'
import { ScrollProgress } from '@/components/common/ScrollProgress'

// In production, fetch from Supabase
const getArticle = (slug: string) => ({
  slug,
  title: 'Logo vs Complete Visual Identity: What Every Business Needs to Know',
  excerpt: 'Most businesses think they need a logo. What they actually need is a complete visual identity system.',
  cover: `/images/blog/${slug}.jpg`,
  category: 'Brand Strategy',
  readingTime: 6,
  date: '2024-11-15',
  content: `
    <h2>The Logo is Just the Beginning</h2>
    <p>When business owners approach designers, the most common request is: "I need a logo." And while a logo is certainly part of a brand identity, confusing the two is one of the most costly mistakes a growing business can make.</p>
    <p>A logo is a mark. A visual identity is a complete system. Understanding the difference determines whether your brand will feel professional and consistent — or fragmented and forgettable.</p>
    <h2>What is a Logo?</h2>
    <p>A logo is the primary graphic mark that represents your brand. It can be a wordmark (your name in a specific typeface), a symbol (an icon or emblem), or a combination of both. It's designed to be instantly recognizable and scalable across different sizes.</p>
    <h2>What is a Visual Identity System?</h2>
    <p>A visual identity system is the complete set of visual elements that represent your brand across every touchpoint. It includes:</p>
    <ul>
      <li><strong>Logo System</strong> — Primary, secondary, icon, and monogram versions</li>
      <li><strong>Color Palette</strong> — Primary, secondary, and neutral colors with specific HEX, RGB, and CMYK values</li>
      <li><strong>Typography</strong> — Primary and secondary typefaces with a defined hierarchy</li>
      <li><strong>Brand Guidelines</strong> — Rules for correct and incorrect usage</li>
      <li><strong>Applications</strong> — Business cards, letterheads, social media, signage, packaging, and more</li>
    </ul>
    <h2>Why Does This Matter for Your Business?</h2>
    <p>Brand consistency across all touchpoints increases revenue by an average of 23%. When customers encounter your brand on social media, then on a business card, then on your website — and it looks different each time — trust erodes. They question whether they're dealing with the same professional organization.</p>
    <blockquote>A logo without a system is like a name without a personality. It introduces you, but doesn't tell people who you are.</blockquote>
    <h2>The Hidden Cost of a Logo-Only Approach</h2>
    <p>Many businesses start with a logo because it seems like the affordable option. But without a system, every new marketing asset requires a design decision: Which colors? What font? How much spacing? These decisions made inconsistently over time destroy brand equity.</p>
    <p>The cost of fixing inconsistent branding later — updating all assets, print materials, signage, and digital presence — far exceeds the cost of building a complete system from the start.</p>
    <h2>When Should You Invest in a Complete Identity?</h2>
    <p>If you're launching a new business, repositioning an existing one, or experiencing brand inconsistency that's affecting client trust — you need a complete visual identity system. The investment pays for itself through increased professionalism, client trust, and marketing efficiency.</p>
  `,
})

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = getArticle(params.slug)
  return {
    title: `${article.title} — Ahmed Ammar Blog`,
    description: article.excerpt,
  }
}

export default function BlogArticlePage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)

  return (
    <div className="pt-20">
      <ScrollProgress />

      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <Image src={article.cover} alt={article.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container-main pb-12">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-white/70 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={14} /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-[var(--accent)] text-white">
              {article.category}
            </span>
          </div>
          <h1 className="text-display-lg text-white max-w-3xl">{article.title}</h1>
        </div>
      </div>

      {/* Meta bar */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="container-main py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[var(--accent)] flex items-center justify-center text-xs text-white font-bold">AA</div>
              <span>Ahmed Ammar</span>
            </div>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {new Date(article.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {article.readingTime} min read</span>
          </div>
          <button className="flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">
            <Share2 size={14} /> Share
          </button>
        </div>
      </div>

      {/* Article content */}
      <div className="container-main py-16 max-w-3xl">
        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl border border-[var(--accent)] bg-[var(--accent-subtle)] text-center">
          <h3 className="text-heading-3 text-[var(--text-primary)] mb-3">Ready to Build Your Visual Identity?</h3>
          <p className="text-sm text-[var(--text-muted)] mb-6">Let's create a complete brand system for your business.</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/book-consultation" className="px-6 py-3 bg-[var(--accent)] text-white font-semibold text-sm rounded-xl hover:bg-[var(--accent-hover)] transition-all">
              Book Free Consultation
            </Link>
            <Link href="/portfolio" className="px-6 py-3 border border-[var(--border)] text-[var(--text-secondary)] font-semibold text-sm rounded-xl hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all">
              View Portfolio
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

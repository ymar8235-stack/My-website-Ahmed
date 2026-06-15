'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpRight, Search } from 'lucide-react'
import { PORTFOLIO_PROJECTS } from '@/components/sections/PortfolioSection'

const filters = [
  { key: 'all', label: 'All Works' },
  { key: 'branding', label: 'Branding & Identity' },
  { key: 'social', label: 'Social Media & Ads' },
  { key: 'packaging', label: 'Packaging' },
  { key: 'web', label: 'Web Design' },
]

export function PortfolioGrid({ defaultCategory }: { defaultCategory?: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [activeFilter, setActiveFilter] = useState(defaultCategory || 'all')
  const [search, setSearch] = useState('')

  const handleFilter = (key: string) => {
    setActiveFilter(key)
    const params = new URLSearchParams(searchParams.toString())
    if (key === 'all') params.delete('category')
    else params.set('category', key)
    router.push(`/portfolio?${params.toString()}`, { scroll: false })
  }

  const filtered = PORTFOLIO_PROJECTS.filter((p) => {
    const matchCat = activeFilter === 'all' || p.category === activeFilter
    const matchSearch =
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.industry.toLowerCase().includes(search.toLowerCase()) ||
      p.tagline.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="container-main py-12">
      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <div className="flex flex-wrap gap-2 flex-1">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => handleFilter(f.key)}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                activeFilter === f.key
                  ? 'bg-[var(--accent)] text-white'
                  : 'bg-[var(--bg-card)] text-[var(--text-muted)] border border-[var(--border)] hover:text-[var(--text-primary)]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm bg-[var(--bg-card)] border border-[var(--border)] rounded-lg text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent"
          />
        </div>
      </div>

      {/* Count */}
      <p className="text-xs text-[var(--text-muted)] mb-6">
        {filtered.length} project{filtered.length !== 1 ? 's' : ''}
      </p>

      {/* Masonry Grid */}
      <LayoutGroup>
        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5" layout>
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                className={`group rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--bg-card)] hover:border-[var(--accent)] transition-all duration-300 cursor-pointer ${
                  project.featured ? 'sm:col-span-2' : ''
                }`}
                data-cursor="view"
              >
                <Link href={`/portfolio/${project.slug}`} className="block">
                  <div
                    className="relative overflow-hidden"
                    style={{ aspectRatio: project.featured ? '16/9' : '4/3' }}
                  >
                    <Image
                      src={project.cover}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">View Project</span>
                      <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                        <ArrowUpRight size={14} className="text-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className="text-[10px] font-semibold uppercase tracking-wider"
                        style={{ color: project.accentColor }}
                      >
                        {project.categoryLabel}
                      </span>
                      <span className="text-[10px] text-[var(--text-muted)]">{project.industry}</span>
                    </div>
                    <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1 line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-2">{project.tagline}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      {filtered.length === 0 && (
        <div className="text-center py-20 text-[var(--text-muted)]">
          No projects found. Try a different filter or search term.
        </div>
      )}
    </div>
  )
}

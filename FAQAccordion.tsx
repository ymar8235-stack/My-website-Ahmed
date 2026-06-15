'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  q: string
  a: string
}

export function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <div className="space-y-2">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div
            key={i}
            className={`rounded-xl border transition-colors duration-200 overflow-hidden ${
              isOpen
                ? 'border-[var(--accent)] bg-[var(--accent-subtle)]'
                : 'border-[var(--border)] bg-[var(--bg-card)]'
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
            >
              <span
                className={`text-sm font-medium transition-colors ${
                  isOpen ? 'text-[var(--accent)]' : 'text-[var(--text-primary)]'
                }`}
              >
                {item.q}
              </span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-[var(--text-muted)] transition-transform duration-300 ${
                  isOpen ? 'rotate-180 text-[var(--accent)]' : ''
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                >
                  <div className="px-5 pb-5 text-sm text-[var(--text-muted)] leading-relaxed border-t border-[var(--accent)]/20 pt-3">
                    {item.a}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

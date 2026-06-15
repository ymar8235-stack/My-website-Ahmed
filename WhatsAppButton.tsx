'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '201153943689'

export function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false)

  const message = encodeURIComponent(
    "Hello Ahmed,\nI would like to discuss a branding project."
  )
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  return (
    <div className="fixed bottom-6 right-6 z-[300] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl px-4 py-3 shadow-lg max-w-[200px]"
          >
            <p className="text-xs text-[var(--text-secondary)] font-medium">
              Chat with Ahmed on WhatsApp
            </p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5">
              Usually replies within 2 hours
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: '#25D366' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Chat on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300 }}
      >
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
        >
          <MessageCircle size={26} className="text-white fill-white" />
        </motion.div>

        {/* Pulse ring */}
        <motion.div
          className="absolute w-14 h-14 rounded-full"
          style={{ background: 'rgba(37, 211, 102, 0.3)' }}
          animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeOut' }}
        />
      </motion.a>
    </div>
  )
}

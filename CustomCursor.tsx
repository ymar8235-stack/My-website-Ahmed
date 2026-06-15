'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

type CursorState = 'default' | 'view' | 'talk' | 'explore' | 'link'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [cursorState, setCursorState] = useState<CursorState>('default')
  const [isVisible, setIsVisible] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springX = useSpring(mouseX, { damping: 25, stiffness: 400 })
  const springY = useSpring(mouseY, { damping: 25, stiffness: 400 })

  useEffect(() => {
    // Only show on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const closest = target.closest('[data-cursor]') as HTMLElement | null
      if (closest) {
        setCursorState(closest.dataset.cursor as CursorState)
      } else if (target.closest('a, button, [role="button"]')) {
        setCursorState('link')
      } else {
        setCursorState('default')
      }
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleHover)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleHover)
    }
  }, [isVisible, mouseX, mouseY])

  if (typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches) {
    return null
  }

  const labels: Record<CursorState, string> = {
    default: '',
    view: 'View',
    talk: "Let's Talk",
    explore: 'Explore',
    link: '',
  }

  const isExpanded = cursorState !== 'default' && cursorState !== 'link'

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999] top-0 left-0"
      style={{ x: springX, y: springY }}
      animate={{ opacity: isVisible ? 1 : 0 }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        style={{ x: '-50%', y: '-50%' }}
        animate={{
          width: isExpanded ? 80 : cursorState === 'link' ? 12 : 8,
          height: isExpanded ? 80 : cursorState === 'link' ? 12 : 8,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      >
        <motion.div
          className="rounded-full bg-white mix-blend-difference"
          style={{ width: '100%', height: '100%' }}
          animate={{
            scale: cursorState === 'link' ? 1.5 : 1,
          }}
        />
        {isExpanded && (
          <motion.span
            className="absolute text-[10px] font-semibold text-black tracking-wide uppercase whitespace-nowrap"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            {labels[cursorState]}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  )
}

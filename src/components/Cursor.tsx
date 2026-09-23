import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useFinePointer, usePrefersReducedMotion } from '../utils/hooks'

/**
 * A precise dot plus a trailing ring. The ring expands over interactive
 * elements, and shows a label for any element with a data-cursor="Label" attribute.
 */
export function Cursor() {
  const fine = useFinePointer()
  const reduced = usePrefersReducedMotion()
  const enabled = fine && !reduced

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const rx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.6 })
  const ry = useSpring(y, { stiffness: 420, damping: 36, mass: 0.6 })

  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('has-custom-cursor')

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      if (!visible) setVisible(true)
    }
    const over = (e: PointerEvent) => {
      const t = e.target as Element | null
      const labelled = t?.closest<HTMLElement>('[data-cursor]')
      setLabel(labelled?.dataset.cursor || null)
      setHovering(!!t?.closest('a, button, [role="button"], [data-cursor], input, textarea'))
    }
    const leave = () => setVisible(false)

    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.addEventListener('pointerleave', leave)
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.removeEventListener('pointerleave', leave)
    }
  }, [enabled, visible, x, y])

  if (!enabled) return null

  const size = label ? 112 : hovering ? 56 : 32

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]" style={{ opacity: visible ? 1 : 0 }}>
      <motion.div className="absolute top-0 left-0" style={{ x: rx, y: ry }}>
        <motion.div
          className="flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          animate={{
            width: size,
            height: size,
            backgroundColor: label ? 'rgba(200,240,49,1)' : 'rgba(200,240,49,0)',
            borderColor: label ? 'rgba(200,240,49,0)' : hovering ? 'rgba(200,240,49,0.9)' : 'rgba(255,255,255,0.35)',
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          style={{ borderWidth: 1, borderStyle: 'solid' }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                key={label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="px-3 text-center font-mono text-[11px] leading-tight font-medium text-ink"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <motion.div
        className="absolute top-0 left-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pass"
        style={{ x, y, opacity: label ? 0 : 1 }}
      />
    </div>
  )
}

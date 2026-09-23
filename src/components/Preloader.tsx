import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePrefersReducedMotion } from '../utils/hooks'

/** A short "booting the suite" intro that plays once per session. */
export function Preloader() {
  const reduced = usePrefersReducedMotion()
  const [show, setShow] = useState(() => {
    try {
      return !sessionStorage.getItem('plv-booted')
    } catch {
      return true
    }
  })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!show) return
    if (reduced) {
      setShow(false)
      return
    }
    const start = performance.now()
    const duration = 1100
    let frame = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else
        setTimeout(() => {
          setShow(false)
          try {
            sessionStorage.setItem('plv-booted', '1')
          } catch {
            /* storage unavailable */
          }
        }, 250)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [show, reduced])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-end bg-ink"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          aria-hidden
        >
          <div className="container-x flex w-full items-end justify-between pb-10 font-mono text-xs text-muted md:pb-14">
            <div className="space-y-1.5">
              <p>
                <span className="text-pass">$</span> npx run portfolio --suite=all
              </p>
              <p className="text-dim">{count < 100 ? 'running specs…' : '✓ ready'}</p>
            </div>
            <span className="text-[clamp(4rem,14vw,10rem)] leading-none font-medium tracking-[-0.06em] text-fg tabular-nums">
              {count}
              <span className="text-pass">%</span>
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

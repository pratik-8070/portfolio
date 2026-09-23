import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { cn } from '../utils/cn'

type Word = { text: ReactNode; className?: string }

type SplitTextProps = {
  words: (string | Word)[]
  className?: string
  delay?: number
  stagger?: number
  /** animate on mount instead of when scrolled into view */
  immediate?: boolean
}

/** Word-by-word masked rise. Each word slides up from behind a clip. */
export function SplitText({ words, className, delay = 0, stagger = 0.06, immediate }: SplitTextProps) {
  const trigger = immediate
    ? { animate: 'show' as const }
    : { whileInView: 'show' as const, viewport: { once: true, margin: '0px 0px -10% 0px' } }
  return (
    <motion.span className={cn('inline', className)} initial="hidden" {...trigger}>
      {words.map((w, i) => {
        const word = typeof w === 'string' ? { text: w } : w
        return (
          <span key={i} className="inline-block overflow-hidden pb-[0.18em] -mb-[0.18em] align-bottom">
            <motion.span
              className={cn('inline-block will-change-transform', word.className)}
              variants={{
                hidden: { y: '110%' },
                show: { y: '0%', transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: delay + i * stagger } },
              }}
            >
              {word.text}
            </motion.span>
            {i < words.length - 1 && ' '}
          </span>
        )
      })}
    </motion.span>
  )
}

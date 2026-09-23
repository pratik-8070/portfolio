import { motion, type HTMLMotionProps } from 'framer-motion'
import type { ReactNode } from 'react'

type RevealProps = HTMLMotionProps<'div'> & {
  children: ReactNode
  delay?: number
  y?: number
  as?: 'div' | 'li' | 'section' | 'article'
}

/** Fades and lifts content in once it enters the viewport. */
export function Reveal({ children, delay = 0, y = 28, as = 'div', ...rest }: RevealProps) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      {...rest}
    >
      {children}
    </Comp>
  )
}

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { ExperienceItem } from '../data/experience'
import { cn } from '../utils/cn'
import { Reveal } from './Reveal'

/** Vertical timeline; the rail fills as you scroll through it. */
export function Timeline({ items }: { items: ExperienceItem[] }) {
  const ref = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] })
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <ol ref={ref} className="relative">
      <div aria-hidden className="absolute top-2 bottom-2 left-[7px] w-px bg-line md:left-[calc(25%+7px)]">
        <motion.div className="w-full bg-gradient-to-b from-pass to-pass/20" style={{ height: fill }} />
      </div>

      {items.map((item, i) => (
        <Reveal as="li" key={i} className="relative grid gap-4 pb-16 pl-10 last:pb-0 md:grid-cols-4 md:gap-10 md:pl-0">
          {/* period (left column on desktop) */}
          <div className="md:pt-1 md:pr-10 md:text-right">
            {item.period && (
              <p className={cn('font-mono text-xs', item.placeholder ? 'text-dim' : 'text-muted')}>{item.period}</p>
            )}
            {item.current && (
              <p className="inline-flex items-center gap-2 font-mono text-[11px] text-pass">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-pass" /> Most recent
              </p>
            )}
          </div>

          {/* node */}
          <span
            aria-hidden
            className={cn(
              'absolute top-1 left-0 flex h-[15px] w-[15px] items-center justify-center rounded-full border md:left-[25%]',
              item.current ? 'border-pass bg-ink' : 'border-line-strong bg-ink',
            )}
          >
            <span className={cn('h-[7px] w-[7px] rounded-full', item.current ? 'bg-pass' : 'bg-white/25')} />
          </span>

          {/* content */}
          <div
            className={cn(
              'md:col-span-3 md:pl-6',
              item.placeholder && 'rounded-2xl border border-dashed border-line-strong p-5 md:ml-6 md:pl-6',
            )}
          >
            {item.placeholder && (
              <p className="mb-3 font-mono text-[10px] tracking-wider text-bug uppercase">Placeholder: update in src/data/experience.ts</p>
            )}
            <h3 className="text-2xl font-medium tracking-[-0.03em] md:text-4xl">{item.role}</h3>
            <p className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-muted">
              <span className="text-fg">{item.company}</span>
              <span className="h-1 w-1 rounded-full bg-dim" aria-hidden />
              <span>{item.context}</span>
            </p>
            <p className="mt-5 max-w-2xl leading-relaxed text-muted text-pretty">{item.summary}</p>
            {item.highlights && (
              <ul className="mt-6 flex flex-wrap gap-3" aria-label="Highlights">
                {item.highlights.map((h) => (
                  <li key={h} className="rounded-xl border border-pass/30 bg-pass/[0.06] px-4 py-2.5 text-sm font-medium text-pass">
                    {h}
                  </li>
                ))}
              </ul>
            )}
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Responsibilities">
              {item.responsibilities.map((r, j) => (
                <li
                  key={j}
                  className="flex items-center gap-1.5 rounded-full border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-[11px] text-muted"
                >
                  <span className="text-pass" aria-hidden>✓</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </ol>
  )
}

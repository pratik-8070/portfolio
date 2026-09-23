import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { Check } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { processSteps } from '../data/process'
import { cn } from '../utils/cn'

export function Process() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 55%', 'end 55%'] })
  const fill = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const [active, setActive] = useState(-1)
  const n = processSteps.length

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = v <= 0 ? -1 : Math.min(n - 1, Math.floor(v * n))
    setActive(idx)
  })

  const done = active === n - 1
  const current = processSteps[Math.max(0, active)]

  return (
    <section id="process" className="relative py-28 md:py-40" aria-labelledby="process-title">
      <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-10">
        {/* sticky narrative column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs text-muted">
              <span className="text-pass">03</span>
              <span className="h-px w-8 bg-line-strong" aria-hidden />
              <span>process.pipeline.yml</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2
                id="process-title"
                className="text-[clamp(2.5rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.045em]"
              >
                How I <span className="font-serif font-normal text-pass italic">test.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-sm text-lg leading-relaxed text-muted text-pretty">
                From a requirement to release confidence, every step leaves evidence behind it.
              </p>
            </Reveal>

            {/* live stage readout (desktop) */}
            <div className="glass mt-12 hidden rounded-2xl p-6 lg:block" aria-hidden>
              <div className="flex items-center justify-between font-mono text-[11px] text-dim">
                <span>pipeline</span>
                <span className={cn(done ? 'text-pass' : 'text-muted')}>
                  {done ? '● success' : active < 0 ? '○ waiting' : '● running'}
                </span>
              </div>
              <div className="mt-5 flex h-20 items-end gap-4 overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={active}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -40, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="text-7xl leading-none font-medium tracking-[-0.05em] tabular-nums"
                  >
                    {String(Math.max(0, active) + 1).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                <span className="pb-2 font-mono text-sm text-dim">/ {String(n).padStart(2, '0')}</span>
              </div>
              <p className="mt-3 truncate text-lg font-medium tracking-tight">{current.title}</p>
              <div className="mt-5 flex gap-1">
                {processSteps.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      'h-1 flex-1 rounded-full transition-colors duration-500',
                      i <= active ? 'bg-pass' : 'bg-white/[0.08]',
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* steps */}
        <ol ref={listRef} className="relative lg:col-span-6 lg:col-start-7">
          <div aria-hidden className="absolute top-3 bottom-3 left-[15px] w-px bg-line">
            <motion.div className="w-full bg-pass" style={{ height: fill }} />
          </div>

          {processSteps.map((step, i) => {
            const isLast = i === n - 1
            const state = i < active || (isLast && done) ? 'done' : i === active ? 'running' : 'queued'
            return (
              <li key={step.title} className="relative pb-14 pl-14 last:pb-0 md:pb-20">
                <span
                  aria-hidden
                  className={cn(
                    'absolute top-0.5 left-0 flex h-[31px] w-[31px] items-center justify-center rounded-full border transition-all duration-500',
                    state === 'queued' && 'border-line-strong bg-ink',
                    state === 'running' && 'border-pass bg-ink shadow-[0_0_0_6px_rgba(200,240,49,0.12)]',
                    state === 'done' && 'border-pass bg-pass text-ink',
                  )}
                >
                  {state === 'done' ? (
                    <Check size={14} />
                  ) : (
                    <span
                      className={cn(
                        'font-mono text-[10px]',
                        state === 'running' ? 'text-pass' : 'text-dim',
                      )}
                    >
                      {i + 1}
                    </span>
                  )}
                </span>

                <p
                  className={cn(
                    'font-mono text-[10.5px] tracking-wider transition-colors duration-500',
                    state === 'done' ? 'text-pass' : state === 'running' ? 'text-fg' : 'text-dim',
                  )}
                  aria-hidden
                >
                  {state === 'done' ? 'PASSED' : state === 'running' ? 'RUNNING' : 'QUEUED'}
                </p>
                <h3
                  className={cn(
                    'mt-2 font-medium tracking-[-0.035em] transition-colors duration-500',
                    isLast ? 'text-4xl md:text-6xl' : 'text-3xl md:text-[2.75rem] md:leading-[1.05]',
                    state === 'queued' ? 'text-fg/35' : isLast ? 'text-pass' : 'text-fg',
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    'mt-3 max-w-md leading-relaxed transition-colors duration-500 text-pretty',
                    state === 'queued' ? 'text-dim' : 'text-muted',
                  )}
                >
                  {step.detail}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

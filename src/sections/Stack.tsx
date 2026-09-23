import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { SkillCard } from '../components/SkillCard'
import { stack } from '../data/stack'
import { cn } from '../utils/cn'
import { usePrefersReducedMotion } from '../utils/hooks'

// Node positions (percent of the graph canvas), arranged in a ring around the hub.
const positions = stack.map((_, i) => {
  const angle = (-90 + (360 / stack.length) * i) * (Math.PI / 180)
  return { x: 50 + Math.cos(angle) * 36, y: 50 + Math.sin(angle) * 38 }
})

export function Stack() {
  const [active, setActive] = useState(0)
  const [touched, setTouched] = useState(false)
  const graphRef = useRef<HTMLDivElement>(null)
  const inView = useInView(graphRef, { margin: '-20% 0px' })
  const reduced = usePrefersReducedMotion()

  // Gently cycle through categories until the visitor takes over.
  useEffect(() => {
    if (touched || !inView || reduced) return
    const id = setInterval(() => setActive((a) => (a + 1) % stack.length), 3200)
    return () => clearInterval(id)
  }, [touched, inView, reduced])

  const select = (i: number) => {
    setTouched(true)
    setActive(i)
  }

  const cat = stack[active]

  return (
    <section id="stack" className="relative py-28 md:py-40" aria-labelledby="stack-title">
      <div className="container-x">
        <SectionHeader
          index="02"
          file="stack.spec.ts"
          title={
            <span id="stack-title">
              A testing stack, <span className="font-serif font-normal text-muted italic">wired together.</span>
            </span>
          }
          intro="Not a list of logos. Each tool has a job in the pipeline. Select a node to inspect it."
        />

        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          {/* graph (tablet & desktop) */}
          <Reveal className="hidden md:block lg:col-span-7">
            <div
              ref={graphRef}
              className="relative aspect-[1.15] overflow-hidden rounded-3xl border border-line bg-ink-2 grid-bg"
            >
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
                {positions.map((p, i) => (
                  <line
                    key={i}
                    x1={50}
                    y1={50}
                    x2={p.x}
                    y2={p.y}
                    vectorEffect="non-scaling-stroke"
                    strokeWidth={1}
                    strokeDasharray={i === active ? '6 6' : '2 6'}
                    className={cn('transition-[stroke] duration-500', i === active ? 'animate-dash stroke-pass' : 'stroke-white/15')}
                  />
                ))}
                {/* outer ring connections */}
                {positions.map((p, i) => {
                  const n = positions[(i + 1) % positions.length]
                  return (
                    <line
                      key={`r${i}`}
                      x1={p.x}
                      y1={p.y}
                      x2={n.x}
                      y2={n.y}
                      vectorEffect="non-scaling-stroke"
                      strokeWidth={1}
                      className="stroke-white/[0.06]"
                    />
                  )
                })}
              </svg>

              {/* packet travelling from hub to the active node */}
              <motion.span
                key={active}
                aria-hidden
                className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pass shadow-[0_0_14px_3px_rgba(200,240,49,0.55)]"
                initial={{ left: '50%', top: '50%', opacity: 0 }}
                animate={{ left: `${positions[active].x}%`, top: `${positions[active].y}%`, opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.1, ease: 'easeInOut', repeat: reduced ? 0 : Infinity, repeatDelay: 0.4 }}
              />

              {/* hub */}
              <div className="absolute top-1/2 left-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-line-strong bg-ink text-center">
                <span className="absolute inset-0 animate-pulse-dot rounded-full" aria-hidden />
                <span className="font-mono text-[10px] text-dim">core</span>
                <span className="text-lg font-medium tracking-tight">QA</span>
                <span className="font-mono text-[10px] text-pass">● running</span>
              </div>

              {/* category nodes */}
              {stack.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onMouseEnter={() => select(i)}
                  onFocus={() => select(i)}
                  onClick={() => select(i)}
                  aria-pressed={i === active}
                  className={cn(
                    'absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-all duration-300',
                    i === active
                      ? 'scale-105 border-pass bg-pass text-ink shadow-[0_0_40px_-6px_rgba(200,240,49,0.6)]'
                      : 'border-line-strong bg-ink/90 text-fg backdrop-blur hover:border-fg/40',
                  )}
                  style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
                >
                  {c.name}
                  <span
                    className={cn(
                      'rounded-full px-1.5 font-mono text-[10px]',
                      i === active ? 'bg-ink/15 text-ink' : 'bg-white/5 text-dim',
                    )}
                  >
                    {c.tools.length}
                  </span>
                </button>
              ))}
            </div>
          </Reveal>

          {/* category tabs (mobile) */}
          <div className="-mx-5 overflow-x-auto px-5 no-scrollbar md:hidden" role="group" aria-label="Stack categories">
            <div className="flex w-max gap-2">
              {stack.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={i === active}
                  onClick={() => select(i)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors',
                    i === active ? 'border-pass bg-pass text-ink' : 'border-line-strong text-muted',
                  )}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* inspector */}
          <Reveal className="lg:col-span-5" delay={0.1}>
            <div className="glass flex h-full flex-col rounded-3xl p-6 md:p-8" aria-live={touched ? 'polite' : 'off'}>
              <div className="flex items-center justify-between font-mono text-[11px] text-dim">
                <span>inspector</span>
                <span>
                  {String(active + 1).padStart(2, '0')} / {String(stack.length).padStart(2, '0')}
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="flex flex-1 flex-col"
                >
                  <h3 className="mt-6 text-4xl font-medium tracking-[-0.04em] md:text-5xl">{cat.name}</h3>
                  <p className="mt-4 truncate rounded-lg border border-line bg-ink/60 px-3 py-2 font-mono text-xs text-muted">
                    <span className="text-pass">$</span> {cat.command}
                  </p>
                  <p className="mt-5 leading-relaxed text-muted text-pretty">{cat.description}</p>
                  <ul className="mt-6 flex flex-col gap-2">
                    {cat.tools.map((t, i) => (
                      <SkillCard key={t.name} name={t.name} note={t.note} index={i} />
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

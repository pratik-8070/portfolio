import { animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import type { MetricItem } from '../data/metrics'
import { cn } from '../utils/cn'
import { usePrefersReducedMotion } from '../utils/hooks'

function useCountUp(target: number, run: boolean, decimals = 0, duration = 1.8) {
  const reduced = usePrefersReducedMotion()
  const [value, setValue] = useState(reduced ? target : 0)
  useEffect(() => {
    if (!run) return
    if (reduced) {
      setValue(target)
      return
    }
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    })
    return () => controls.stop()
  }, [run, target, duration, reduced])
  return value.toFixed(decimals)
}

const numberCls = 'leading-[0.9] font-medium tracking-[-0.05em] tabular-nums whitespace-nowrap'
const bigSize = 'text-[clamp(3.25rem,8vw,6.5rem)]'

export function Metric({ item, className }: { item: MetricItem; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })

  return (
    <div
      ref={ref}
      className={cn(
        'group glass relative flex min-h-[190px] md:min-h-[220px] flex-col justify-between overflow-hidden rounded-2xl p-6 transition-colors duration-500 hover:border-pass/30 md:p-8',
        className,
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-48 w-48 rounded-full bg-pass/10 opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
      />
      <div className="flex items-start justify-between font-mono text-[11px] text-dim">
        <span>assert</span>
        {item.note && <span className="rounded-full border border-line px-2 py-0.5">{item.note}</span>}
      </div>
      <div>
        <MetricValue item={item} run={inView} />
        <p className="mt-3 text-sm text-muted md:text-base">{item.label}</p>
      </div>
    </div>
  )
}

function MetricValue({ item, run }: { item: MetricItem; run: boolean }) {
  if (item.kind === 'number') return <NumberValue item={item} run={run} />
  if (item.kind === 'range') return <RangeValue item={item} run={run} />
  return (
    <p className="flex flex-wrap items-baseline gap-x-3 text-[clamp(2rem,4.5vw,3.5rem)] leading-none font-medium tracking-[-0.04em]">
      {item.parts.map((p, i) => (
        <motion.span
          key={p}
          initial={{ opacity: 0, y: 20 }}
          animate={run ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: i * 0.18, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-baseline gap-3"
        >
          {p}
          {i < item.parts.length - 1 && <span className="text-pass">+</span>}
        </motion.span>
      ))}
    </p>
  )
}

function NumberValue({ item, run }: { item: Extract<MetricItem, { kind: 'number' }>; run: boolean }) {
  const v = useCountUp(item.value, run, item.decimals ?? 0)
  return (
    <p className={cn(numberCls, bigSize)} aria-label={`${item.value}${item.suffix ?? ''}`}>
      {v}
      <span className="text-pass">{item.suffix}</span>
    </p>
  )
}

function RangeValue({ item, run }: { item: Extract<MetricItem, { kind: 'range' }>; run: boolean }) {
  const a = useCountUp(item.from, run)
  const b = useCountUp(item.to, run)
  return (
    <p
      className={cn(numberCls, 'text-[clamp(2.75rem,5vw,4.75rem)]')}
      aria-label={`${item.from} to ${item.to}${item.suffix ?? ''}`}
    >
      {a}
      <span className="text-dim">–</span>
      {b}
      <span className="text-pass">{item.suffix}</span>
    </p>
  )
}

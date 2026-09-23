import { Metric } from '../components/Metric'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { metrics } from '../data/metrics'
import { cn } from '../utils/cn'

// Bento layout: three across the top row, two wide tiles beneath.
const spans = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'lg:col-span-3']

export function Metrics() {
  return (
    <section id="metrics" className="relative py-28 md:py-40" aria-labelledby="metrics-title">
      <div className="container-x">
        <SectionHeader
          index="07"
          file="metrics.assert.ts"
          title={
            <span id="metrics-title">
              By the <span className="font-serif font-normal text-muted italic">numbers.</span>
            </span>
          }
        />
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-6">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={(i % 3) * 0.08} className={cn(spans[i], i === metrics.length - 1 && 'sm:col-span-2 lg:col-span-3')}>
              <Metric item={m} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import { Metric } from '../components/Metric'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { metrics } from '../data/metrics'


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
        <div className="grid gap-3 sm:grid-cols-2 md:gap-4">
          {metrics.map((m, i) => (
            <Reveal key={m.label} delay={(i % 2) * 0.08}>
              <Metric item={m} className="h-full" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Brain, Check, Sparkle } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { aiTools, aiUseCases } from '../data/ai'

export function AIWorkflow() {
  return (
    <section id="ai" className="relative py-28 md:py-40" aria-labelledby="ai-title">
      <div aria-hidden className="absolute inset-x-0 top-1/3 -z-10 mx-auto h-[500px] max-w-4xl rounded-full bg-pass/[0.05] blur-[140px]" />
      <div className="container-x">
        <SectionHeader
          index="08"
          file="ai-workflow.config.ts"
          title={<span id="ai-title">MY AI-ASSISTED QA WORKFLOW</span>}
          intro="AI makes me faster. It doesn’t decide what quality means. That judgment stays with me."
        />

        {/* the equation */}
        <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-4">
          <Reveal>
            <Term icon={<Brain size={22} />} label="Human thinking" desc="Risk, context, intent, edge cases, judgment." />
          </Reveal>
          <Operator symbol="+" delay={0.15} />
          <Reveal delay={0.1}>
            <Term icon={<Sparkle size={22} />} label="AI assistance" desc="Drafts, suggestions, boilerplate, analysis." />
          </Reveal>
          <Operator symbol="=" delay={0.3} />
          <Reveal delay={0.2}>
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-pass p-6 text-ink md:p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink/10">
                <Check size={22} />
              </span>
              <div className="mt-10">
                <p className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">Faster QA</p>
                <p className="mt-2 text-sm text-ink/70">Same standards, less time spent on boilerplate.</p>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <blockquote className="text-[clamp(1.9rem,4vw,3.25rem)] leading-[1.02] font-medium tracking-[-0.04em]">
              A <span className="font-serif font-normal text-pass italic">co-pilot</span>,
              <br /> not an autopilot.
            </blockquote>
            <p className="mt-6 max-w-sm leading-relaxed text-muted text-pretty">
              Every generated test, locator or dataset gets reviewed and run before I trust it, like any other code.
            </p>
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="AI tools">
              {aiTools.map((t) => (
                <li key={t} className="rounded-full border border-line-strong px-4 py-2 text-sm">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>

          <ul className="grid gap-2 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
            {aiUseCases.map((u, i) => (
              <motion.li
                key={u}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-center justify-between gap-4 rounded-xl border border-line bg-white/[0.02] px-5 py-4 transition-colors hover:border-pass/40"
              >
                <span className="font-medium tracking-tight">{u}</span>
                <span className="flex shrink-0 items-center gap-1.5 font-mono text-[10px] text-dim">
                  <span className="text-muted">AI drafts</span>
                  <span aria-hidden>→</span>
                  <span className="text-pass">I verify</span>
                </span>
              </motion.li>
            ))}
            <motion.li
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex items-center rounded-xl border border-dashed border-line-strong px-5 py-4 font-mono text-xs text-dim"
            >
              assert(humanReview === true)
            </motion.li>
          </ul>
        </div>
      </div>
    </section>
  )
}

function Term({ icon, label, desc }: { icon: ReactNode; label: string; desc: string }) {
  return (
    <div className="glass flex h-full flex-col justify-between rounded-2xl p-6 md:p-8">
      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong text-pass">
        {icon}
      </span>
      <div className="mt-10">
        <p className="text-3xl font-medium tracking-[-0.04em] md:text-4xl">{label}</p>
        <p className="mt-2 text-sm text-muted">{desc}</p>
      </div>
    </div>
  )
}

function Operator({ symbol, delay }: { symbol: string; delay: number }) {
  return (
    <motion.div
      aria-hidden
      className="flex items-center justify-center py-1 font-serif text-5xl text-dim italic md:px-2 md:text-6xl"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 260, damping: 18 }}
    >
      {symbol}
    </motion.div>
  )
}

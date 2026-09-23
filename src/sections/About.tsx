import { motion } from 'framer-motion'
import { Reveal } from '../components/Reveal'
import { ScrollWords, toScrollWords } from '../components/ScrollWords'

const spec = [
  'thinks like a user, then questions everything',
  'automates the repetitive so humans can explore',
  'finds edge cases before users do',
  'writes frameworks that stay maintainable',
  'covers both manual and automated testing',
  'uses AI as a tool, not a replacement for judgment',
  'cares about what ships, not only what was tested',
]

const layers = [
  { name: 'Web', detail: 'Playwright · WebdriverIO', code: 'page.click()' },
  { name: 'API', detail: 'REST · Postman', code: 'GET → 200' },
  { name: 'Mobile', detail: 'Appium · Android', code: 'driver.tap()' },
  { name: 'CI/CD', detail: 'GitHub Actions · Jenkins', code: 'on: push' },
]

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-40" aria-labelledby="about-title">
      <div className="container-x">
        <Reveal className="mb-10 flex items-center gap-3 font-mono text-xs text-muted md:mb-14">
          <span className="text-pass">01</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          <span>about.spec.ts</span>
        </Reveal>

        <h2 id="about-title" className="sr-only">
          About
        </h2>
        <ScrollWords
          className="max-w-6xl text-[clamp(2.1rem,5.6vw,5.5rem)] leading-[1.02] font-medium tracking-[-0.045em]"
          words={toScrollWords(
            ["I don't just test features.", 'I test what happens when users', 'do the unexpected.'],
            ['unexpected.'],
          )}
        />

        <div className="mt-20 grid gap-12 md:mt-28 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-4">
            <p className="text-lg leading-relaxed text-muted text-pretty">
              I&apos;m an automation-focused QA engineer with <span className="text-fg">2 years</span> of hands-on web,
              API and mobile automation on <span className="text-fg">B2B SaaS</span> products, building frameworks from
              scratch.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-muted text-pretty">
              I build the safety net that lets teams release without holding their breath.
            </p>
          </Reveal>

          {/* the engineer, described as a passing spec */}
          <Reveal className="lg:col-span-7 lg:col-start-6" delay={0.1}>
            <div className="glass overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between border-b border-line px-5 py-3 font-mono text-xs text-muted">
                <span>
                  <span className="text-info">describe</span>(<span className="text-pass">&apos;Pratik&apos;</span>)
                </span>
                <span className="text-dim">{spec.length} specs</span>
              </div>
              <ul className="divide-y divide-line font-mono text-[12.5px] md:text-[13.5px]">
                {spec.map((line, i) => (
                  <motion.li
                    key={line}
                    className="flex items-center gap-4 px-5 py-3.5"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                    transition={{ delay: 0.15 + i * 0.09, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.span
                      className="rounded bg-pass-soft px-1.5 py-0.5 text-[10px] font-medium text-pass"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.35 + i * 0.09, type: 'spring', stiffness: 400, damping: 20 }}
                    >
                      PASS
                    </motion.span>
                    <span className="text-muted">
                      <span className="text-dim">it(</span>
                      <span className="text-fg">&apos;{line}&apos;</span>
                      <span className="text-dim">)</span>
                    </span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* layer chain */}
        <div className="mt-24 md:mt-32">
          <Reveal>
            <p className="mb-8 font-mono text-xs text-dim">// coverage across every layer</p>
          </Reveal>
          <ol className="relative grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-0">
            {layers.map((l, i) => (
              <Reveal as="li" key={l.name} delay={i * 0.12} className="relative">
                <div className="group relative h-full rounded-2xl border border-line bg-ink-2 p-5 transition-colors duration-500 hover:border-pass/40 md:mr-10 md:p-6">
                  <p className="font-mono text-[11px] text-dim">{String(i + 1).padStart(2, '0')}</p>
                  <p className="mt-6 text-3xl font-medium tracking-[-0.04em] md:text-5xl">{l.name}</p>
                  <p className="mt-2 text-sm text-muted">{l.detail}</p>
                  <p className="mt-6 inline-block rounded-md bg-white/[0.04] px-2 py-1 font-mono text-[11px] text-pass/90">
                    {l.code}
                  </p>
                </div>
                {i < layers.length - 1 && (
                  <motion.span
                    aria-hidden
                    className="absolute top-1/2 right-0 hidden h-px w-10 origin-left bg-pass/60 md:block"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.15, duration: 0.6 }}
                  >
                    <span className="absolute -top-[3px] right-0 h-[7px] w-[7px] rotate-45 border-t border-r border-pass/80" />
                  </motion.span>
                )}
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

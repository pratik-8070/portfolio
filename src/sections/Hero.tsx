import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../components/Button'
import { ArrowRight, ArrowUpRight } from '../components/Icons'
import { SplitText } from '../components/SplitText'
import { TestRunner } from '../components/TestRunner'
import { profile } from '../data/profile'
import { scrollToId } from '../utils/smoothScroll'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const headY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const runnerY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  const { before, emphasis, after } = profile.headline

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28 lg:min-h-[100svh]"
      aria-labelledby="hero-title"
    >
      {/* backdrop */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-bg [mask-image:radial-gradient(ellipse_80%_60%_at_50%_30%,black,transparent)]" />
        <div className="absolute top-[-20%] left-1/2 h-[700px] w-[900px] -translate-x-1/2 rounded-full bg-pass/[0.07] blur-[140px]" />
      </div>

      <div className="container-x">
        {/* editorial masthead */}
        <motion.div
          className="flex flex-col gap-3 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
        >
          <div>
            <p className="text-[15px] font-medium tracking-[0.18em] uppercase md:text-lg">{profile.name}</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-muted uppercase md:text-xs">{profile.role}</p>
          </div>
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-pass/25 bg-pass/[0.06] px-3 py-1.5 font-mono text-[11px] text-pass">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-pass" />
            {profile.availability}
          </p>
        </motion.div>

        <motion.div style={{ y: headY, opacity: fade }} className="mt-10 md:mt-12">
          <h1
            id="hero-title"
            className="text-[clamp(3.2rem,8.4vw,8.75rem)] leading-[0.92] font-medium tracking-[-0.055em]"
          >
            <span className="sr-only">
              {profile.name}, {profile.role}. {before} {emphasis} {after}
            </span>
            <span aria-hidden>
              <SplitText immediate delay={0.35} words={before.split(' ')} />{' '}
              <SplitText
                immediate
                delay={0.35 + 4 * 0.06}
                words={[{ text: emphasis, className: 'font-serif italic font-normal text-pass tracking-[-0.02em] pr-[0.06em]' }]}
              />
              <br className="hidden md:block" />{' '}
              <SplitText immediate delay={0.35 + 5 * 0.06} words={after.split(' ')} />
            </span>
          </h1>
        </motion.div>

        <div className="mt-10 grid items-start gap-14 md:mt-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            className="lg:col-span-5 lg:pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 0.9 }}
          >
            <p className="max-w-md text-lg leading-relaxed text-muted md:text-xl text-pretty">{profile.subheadline}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#work" onClick={() => scrollToId('work')} size="lg" icon={<ArrowRight size={18} />}>
                View My Work
              </Button>
              <Button
                href="#contact"
                onClick={() => scrollToId('contact')}
                variant="ghost"
                size="lg"
                icon={<ArrowUpRight size={18} />}
              >
                Let&apos;s Connect
              </Button>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6 font-mono text-xs">
              <div>
                <dt className="text-dim">experience</dt>
                <dd className="mt-1 text-fg">{profile.experienceYears} yrs</dd>
              </div>
              <div>
                <dt className="text-dim">layers</dt>
                <dd className="mt-1 text-fg">Web · API · Mobile</dd>
              </div>
              <div>
                <dt className="text-dim">pipeline</dt>
                <dd className="mt-1 text-fg">CI/CD</dd>
              </div>
            </dl>
          </motion.div>

          <motion.div className="lg:col-span-6 lg:col-start-7" style={{ y: runnerY }}>
            <motion.div
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 1.2, ease, delay: 0.7 }}
              style={{ transformPerspective: 1200 }}
            >
              <TestRunner />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

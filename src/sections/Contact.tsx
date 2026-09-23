import { AnimatePresence, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'
import { Button } from '../components/Button'
import { ArrowUpRight, Bug, Check, FileText, Github, Linkedin, Mail } from '../components/Icons'
import { Reveal } from '../components/Reveal'
import { SplitText } from '../components/SplitText'
import { profile } from '../data/profile'

const channels: { label: string; value: string; href: string; icon: ReactNode; external?: boolean; download?: boolean }[] = [
  { label: 'LinkedIn', value: 'Connect', href: profile.links.linkedin, icon: <Linkedin size={20} />, external: true },
  { label: 'GitHub', value: 'Browse code', href: profile.links.github, icon: <Github size={20} />, external: true },
  { label: 'Email', value: profile.links.email, href: `mailto:${profile.links.email}`, icon: <Mail size={20} /> },
  { label: 'Resume', value: 'Download PDF', href: profile.links.resume, icon: <FileText size={20} />, download: true },
]

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden pt-28 md:pt-40" aria-labelledby="contact-title">
      <div aria-hidden className="absolute inset-0 -z-10 grid-bg [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" />
      <div className="container-x">
        <Reveal className="mb-10 flex items-center gap-3 font-mono text-xs text-muted">
          <span className="text-pass">09</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          <span>contact.ts</span>
        </Reveal>

        <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
          <h2
            id="contact-title"
            className="text-[clamp(3.5rem,13vw,13rem)] leading-[0.85] font-medium tracking-[-0.06em]"
          >
            <SplitText words={['Found', 'a', 'bug?']} stagger={0.08} />
          </h2>
          <SquashableBug />
        </div>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-6" delay={0.2}>
            <p className="font-serif text-[clamp(1.75rem,3.4vw,3rem)] leading-[1.1] text-pass italic">
              Good. That&apos;s what I&apos;m here for.
            </p>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted text-pretty">
              Let&apos;s build software users can trust. I&apos;m open to QA Automation roles where release quality
              actually matters.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href={`mailto:${profile.links.email}`} size="lg" icon={<ArrowUpRight size={18} />}>
                Let&apos;s Connect
              </Button>
              <Button href={profile.links.resume} variant="ghost" size="lg" icon={<FileText size={18} />} download>
                Resume
              </Button>
            </div>
          </Reveal>

          <ul className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:col-span-6">
            {channels.map((c, i) => (
              <Reveal as="li" key={c.label} delay={0.1 + i * 0.06} className="bg-ink">
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noopener noreferrer' : undefined}
                  download={c.download || undefined}
                  className="group flex h-full min-h-[150px] flex-col justify-between p-6 transition-colors duration-500 hover:bg-pass hover:text-ink"
                  aria-label={`${c.label}: ${c.value}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-muted transition-colors group-hover:text-ink">{c.icon}</span>
                    <ArrowUpRight
                      size={20}
                      className="text-dim transition-all duration-500 group-hover:rotate-45 group-hover:text-ink"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-medium tracking-tight">{c.label}</p>
                    <p className="mt-1 truncate font-mono text-xs text-muted transition-colors group-hover:text-ink/70">
                      {c.value}
                    </p>
                  </div>
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* oversized wordmark */}
      <div className="mt-28 overflow-hidden md:mt-40" aria-hidden>
        <motion.p
          className="text-center text-[11.2vw] leading-[0.8] font-medium tracking-[-0.06em] whitespace-nowrap text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.14)]"
          initial={{ y: '40%' }}
          whileInView={{ y: '12%' }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        >
          PRATIK LAL VISHWAKARMA
        </motion.p>
      </div>
    </section>
  )
}

/** Click the bug to squash it. A tiny reward for curious visitors. */
function SquashableBug() {
  const [fixed, setFixed] = useState(false)
  return (
    <button
      type="button"
      onClick={() => setFixed((f) => !f)}
      className="relative mb-3 flex h-16 w-16 items-center justify-center rounded-full border md:mb-6 md:h-24 md:w-24"
      style={{ borderColor: fixed ? 'var(--color-pass)' : 'rgb(255 92 77 / 0.5)' }}
      aria-label={fixed ? 'Bug fixed. Click to reopen it' : 'Squash the bug'}
      data-cursor={fixed ? 'Reopen' : 'Squash it'}
    >
      <AnimatePresence mode="wait" initial={false}>
        {fixed ? (
          <motion.span
            key="fixed"
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            className="text-pass"
          >
            <Check size={36} />
          </motion.span>
        ) : (
          <motion.span
            key="bug"
            className="text-bug"
            animate={{ rotate: [0, -12, 12, -6, 0], x: [0, -2, 2, 0] }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.6 }}
            exit={{ scale: [1, 1.4, 0], transition: { duration: 0.3 } }}
          >
            <Bug size={36} />
          </motion.span>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {fixed && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -bottom-7 left-1/2 -translate-x-1/2 font-mono text-[10px] whitespace-nowrap text-pass"
          >
            status: resolved
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  )
}

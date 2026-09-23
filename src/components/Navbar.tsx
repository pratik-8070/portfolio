import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/profile'
import { cn } from '../utils/cn'
import { useActiveSection } from '../utils/hooks'
import { lockScroll, scrollToId } from '../utils/smoothScroll'
import { ArrowUpRight } from './Icons'

const ids = navItems.map((n) => n.id)

export function Navbar() {
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(ids)

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => {
    lockScroll(open)
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (id: string) => {
    setOpen(false)
    // wait for the overlay to start closing so the scroll lock is released
    setTimeout(() => scrollToId(id), open ? 250 : 0)
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={cn(
            'transition-[background-color,border-color,backdrop-filter] duration-500',
            scrolled || open
              ? 'border-b border-line bg-ink/70 backdrop-blur-xl'
              : 'border-b border-transparent bg-transparent',
          )}
        >
          <nav className="container-x flex h-16 items-center justify-between md:h-[72px]" aria-label="Primary">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault()
                go('top')
              }}
              className="group flex items-center gap-2.5"
              aria-label={`${profile.name}, back to top`}
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-line-strong bg-ink-3 font-mono text-[11px] font-medium">
                PV
                <span className="absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-ink bg-pass" />
              </span>
              <span className="hidden text-sm font-medium tracking-tight sm:block">
                Pratik<span className="text-dim"> / QA</span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      go(item.id)
                    }}
                    className={cn(
                      'relative rounded-full px-3.5 py-2 text-sm transition-colors',
                      active === item.id ? 'text-fg' : 'text-muted hover:text-fg',
                    )}
                    aria-current={active === item.id ? 'true' : undefined}
                  >
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.06]"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted xl:flex">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-pass" />
                Available
              </span>
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault()
                  go('contact')
                }}
                className="hidden h-10 items-center gap-1.5 rounded-full bg-fg px-4 text-sm font-medium text-ink transition-colors hover:bg-pass sm:inline-flex"
              >
                Let&apos;s talk <ArrowUpRight size={16} />
              </a>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-line-strong lg:hidden"
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? 'Close menu' : 'Open menu'}
              >
                <span
                  className={cn(
                    'absolute h-px w-4 bg-fg transition-transform duration-300',
                    open ? 'rotate-45' : '-translate-y-[3px]',
                  )}
                />
                <span
                  className={cn(
                    'absolute h-px w-4 bg-fg transition-transform duration-300',
                    open ? '-rotate-45' : 'translate-y-[3px]',
                  )}
                />
              </button>
            </div>
          </nav>
        </div>
        <motion.div
          className="h-px origin-left bg-pass"
          style={{ scaleX: progress }}
          aria-hidden
        />
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-40 flex flex-col bg-ink/95 pt-24 backdrop-blur-2xl lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <nav className="container-x flex flex-1 flex-col" aria-label="Mobile">
              <p className="mb-6 font-mono text-xs text-dim">// navigate.spec.ts</p>
              <ul className="flex flex-col">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="border-b border-line"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault()
                        go(item.id)
                      }}
                      className="flex items-baseline justify-between py-4 text-4xl font-medium tracking-[-0.03em]"
                    >
                      {item.label}
                      <span className="font-mono text-xs text-dim">0{i + 1}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-auto flex items-center gap-2 pb-10 font-mono text-xs text-muted"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-pass" />
                {profile.availability}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

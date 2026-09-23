import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, type ReactNode } from 'react'
import type { Project } from '../data/projects'
import { lockScroll } from '../utils/smoothScroll'
import { ArrowUpRight, Check, Close, Github } from './Icons'
import { ProjectVisual } from './ProjectVisual'

/** Devtools-style side panel with a project's full case study. */
export function ProjectInspector({ project, onClose }: { project: Project | null; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocus = useRef<HTMLElement | null>(null)

  useEffect(() => {
    if (!project) return
    lastFocus.current = document.activeElement as HTMLElement
    lockScroll(true)
    const t = setTimeout(() => closeRef.current?.focus(), 50)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      lockScroll(false)
      window.removeEventListener('keydown', onKey)
      lastFocus.current?.focus({ preventScroll: true })
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div className="fixed inset-0 z-[70]" initial={{ opacity: 1 }} exit={{ opacity: 1 }}>
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="inspector-title"
            data-lenis-prevent
            className="absolute inset-x-0 bottom-0 max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-3xl border border-line bg-ink-2 md:inset-y-3 md:right-3 md:left-auto md:max-h-none md:w-[min(680px,calc(100vw-24px))] md:rounded-3xl"
            initial={{ y: '100%', x: 0 }}
            animate={{ y: 0, x: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-ink-2/85 px-6 py-4 backdrop-blur-xl">
              <p className="font-mono text-xs text-muted">
                <span className="text-pass">inspect</span> ▸ {project.id}
              </p>
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-white/5"
                aria-label="Close project details"
              >
                <Close size={16} />
              </button>
            </div>

            <div className="px-6 pt-8 pb-12 md:px-10">
              <p className="font-mono text-xs text-dim">Project {project.index}</p>
              <h2 id="inspector-title" className="mt-3 text-3xl leading-[1.05] font-medium tracking-[-0.04em] text-balance md:text-5xl">
                {project.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted">{project.tagline}</p>

              <div className="relative mt-8 h-[300px] overflow-hidden rounded-2xl border border-line bg-ink grid-bg md:h-[340px]">
                <ProjectVisual kind={project.visual} active />
              </div>

              <Block label="Problem">
                <p className="leading-relaxed text-fg/90 text-pretty">{project.problem}</p>
              </Block>

              <Block label="What I built">
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {project.built.map((b) => (
                    <li key={b} className="flex gap-2.5 text-[15px] leading-snug">
                      <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-pass/15 text-pass">
                        <Check size={10} />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </Block>

              {project.screenshots && (
                <Block label="In action">
                  <ol className="space-y-6">
                    {project.screenshots.map((shot, i) => (
                      <li key={shot.src}>
                        <a
                          href={shot.src}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block overflow-hidden rounded-xl border border-line bg-ink transition-colors hover:border-pass/40"
                          aria-label={`Open full-size screenshot: ${shot.caption}`}
                        >
                          <img
                            src={shot.src}
                            alt={shot.alt}
                            width={shot.width}
                            height={shot.height}
                            loading="lazy"
                            decoding="async"
                            className="h-auto w-full"
                          />
                        </a>
                        <p className="mt-2.5 flex gap-3 font-mono text-xs text-muted">
                          <span className="text-pass">{String(i + 1).padStart(2, '0')}</span>
                          {shot.caption}
                        </p>
                      </li>
                    ))}
                  </ol>
                </Block>
              )}

              <Block label="Technologies">
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((t) => (
                    <li key={t} className="rounded-full border border-line-strong px-3 py-1.5 font-mono text-xs">
                      {t}
                    </li>
                  ))}
                </ul>
              </Block>

              <Block label="Testing approach">
                <ol className="space-y-3">
                  {project.approach.map((a, i) => (
                    <li key={a} className="flex gap-4 text-[15px] leading-relaxed">
                      <span className="font-mono text-xs text-dim">{String(i + 1).padStart(2, '0')}</span>
                      {a}
                    </li>
                  ))}
                </ol>
              </Block>

              <Block label="Result">
                <p className="rounded-2xl border border-pass/25 bg-pass/[0.05] p-5 leading-relaxed text-pretty">
                  {project.result}
                </p>
              </Block>

              {project.nextSteps && (
                <Block label="Limitations & next steps">
                  <ul className="space-y-2.5">
                    {project.nextSteps.map((n) => (
                      <li key={n} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                        <span className="font-mono text-xs leading-6 text-dim" aria-hidden>
                          TODO
                        </span>
                        {n}
                      </li>
                    ))}
                  </ul>
                </Block>
              )}

              <div className="mt-10 flex flex-wrap gap-3">
                {project.links?.github ? (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-fg px-5 text-sm font-medium text-ink transition-colors hover:bg-pass"
                  >
                    <Github size={16} /> View on GitHub
                  </a>
                ) : null}
                {project.links?.demo ? (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm font-medium transition-colors hover:bg-white/5"
                  >
                    {project.links.demoLabel ?? 'Live demo'} <ArrowUpRight size={16} />
                  </a>
                ) : null}
                {project.links && !project.links.github && !project.links.demo && (
                  <span className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-line-strong px-5 font-mono text-xs text-dim">
                    <Github size={14} /> Repository link coming soon
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="mt-10 border-t border-line pt-6">
      <h3 className="mb-4 font-mono text-[11px] tracking-[0.14em] text-dim uppercase">{label}</h3>
      {children}
    </section>
  )
}

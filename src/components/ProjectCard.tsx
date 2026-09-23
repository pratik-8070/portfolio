import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { useState, type MouseEvent } from 'react'
import type { Project } from '../data/projects'
import { useFinePointer } from '../utils/hooks'
import { ArrowRight, ArrowUpRight, Github } from './Icons'
import { ProjectVisual } from './ProjectVisual'

type ProjectCardProps = {
  project: Project
  total: number
  onInspect: (p: Project) => void
  scale?: MotionValue<number>
}

/** Large interactive project card. Tilts toward the cursor and opens the inspector. */
export function ProjectCard({ project, total, onInspect, scale }: ProjectCardProps) {
  const fine = useFinePointer()
  const [hover, setHover] = useState(false)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-3, 3]), { stiffness: 150, damping: 20 })
  const glowX = useTransform(mx, (v) => `${v * 100}%`)
  const glowY = useTransform(my, (v) => `${v * 100}%`)
  const glow = useTransform(
    [glowX, glowY] as MotionValue<string>[],
    ([x, y]) => `radial-gradient(600px circle at ${x} ${y}, rgba(200,240,49,0.07), transparent 40%)`,
  )

  const onMove = (e: MouseEvent<HTMLElement>) => {
    if (!fine) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    setHover(false)
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.article
      style={{ scale, rotateX: fine ? rotateX : 0, rotateY: fine ? rotateY : 0, transformPerspective: 1400 }}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      className="group relative origin-top overflow-hidden rounded-3xl border border-line bg-ink-2 lg:h-[560px]"
      aria-labelledby={`${project.id}-title`}
    >
      {/* cursor-follow glow */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: glow }}
      />

      <div className="relative grid h-full lg:grid-cols-[1fr_1.15fr]">
        {/* copy */}
        <div className="flex flex-col p-6 md:p-10">
          <div className="flex items-center justify-between font-mono text-xs text-dim">
            <span>
              <span className="text-pass">{project.index}</span> / {String(total).padStart(2, '0')}
            </span>
            <span className="hidden items-center gap-1.5 sm:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-pass" aria-hidden /> passing
            </span>
          </div>

          <h3
            id={`${project.id}-title`}
            className="mt-8 text-[clamp(1.75rem,3.4vw,3rem)] leading-[1] font-medium tracking-[-0.04em] text-balance md:mt-12"
          >
            {project.title}
          </h3>
          <p className="mt-5 max-w-md leading-relaxed text-muted text-pretty">{project.tagline}</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
            {project.tags.map((t) => (
              <li key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-muted">
                {t}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 lg:mt-auto">
            <button
              type="button"
              onClick={() => onInspect(project)}
              data-cursor="Inspect Project →"
              className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong pr-2 pl-5 text-sm font-medium transition-colors duration-300 group-hover:border-pass group-hover:bg-pass group-hover:text-ink after:absolute after:inset-0 after:content-['']"
              aria-label={`Inspect project: ${project.title}`}
            >
              Inspect Project
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:bg-ink/10">
                <ArrowRight size={14} />
              </span>
            </button>
            {project.links?.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex h-11 items-center gap-2 rounded-full px-3 font-mono text-xs text-muted transition-colors hover:text-fg"
                aria-label={`${project.title} source code on GitHub`}
              >
                <Github size={16} /> Code
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="relative z-10 inline-flex h-11 items-center gap-1.5 rounded-full px-3 font-mono text-xs text-muted transition-colors hover:text-fg"
              >
                {project.links.demoLabel ?? 'Demo'} <ArrowUpRight size={14} />
              </a>
            )}
          </div>
        </div>

        {/* visual */}
        <div className="relative min-h-[300px] border-t border-line bg-ink/40 grid-bg sm:min-h-[340px] lg:min-h-0 lg:border-t-0 lg:border-l">
          <div className="absolute inset-0 transition-transform duration-700 ease-out-expo group-hover:scale-[1.02]">
            <ProjectVisual kind={project.visual} active={hover || !fine} />
          </div>
        </div>
      </div>
    </motion.article>
  )
}

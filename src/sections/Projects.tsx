import { useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import { ProjectCard } from '../components/ProjectCard'
import { ProjectInspector } from '../components/ProjectInspector'
import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { projects, type Project } from '../data/projects'
import { useMediaQuery } from '../utils/hooks'

export function Projects() {
  const [open, setOpen] = useState<Project | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const stackRef = useRef<HTMLDivElement>(null)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const { scrollYProgress } = useScroll({ target: stackRef, offset: ['start start', 'end end'] })

  return (
    <section id="work" className="relative py-28 md:py-40" aria-labelledby="work-title">
      <div className="container-x">
        <SectionHeader
          index="04"
          file="projects.spec.ts"
          title={
            <span id="work-title">
              Selected work. <span className="font-serif font-normal text-muted italic">Open any spec to inspect.</span>
            </span>
          }
          intro="Frameworks, pipelines and tools I've built to make testing faster, sturdier and harder to skip."
        />

        <div ref={stackRef} className="flex flex-col gap-6 lg:gap-10">
          {projects.map((p, i) => (
            <StackedCard
              key={p.id}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              sticky={desktop}
              onInspect={setOpen}
            />
          ))}
        </div>
      </div>

      <ProjectInspector project={open} onClose={close} />
    </section>
  )
}

/**
 * On desktop each card pins below the nav and the ones behind it shrink
 * slightly, so the cards stack up like a deck. On mobile they simply reveal.
 */
function StackedCard({
  project,
  index,
  total,
  progress,
  sticky,
  onInspect,
}: {
  project: Project
  index: number
  total: number
  progress: MotionValue<number>
  sticky: boolean
  onInspect: (p: Project) => void
}) {
  const scale = useTransform(progress, [index / total, 1], [1, 1 - (total - 1 - index) * 0.035])
  const card = (
    <ProjectCard project={project} total={total} onInspect={onInspect} scale={sticky ? scale : undefined} />
  )

  if (!sticky) return <Reveal>{card}</Reveal>
  return (
    <div className="sticky" style={{ top: 104 + index * 18 }}>
      <Reveal>{card}</Reveal>
    </div>
  )
}

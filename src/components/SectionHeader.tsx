import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { cn } from '../utils/cn'

type SectionHeaderProps = {
  index: string
  file: string
  title: ReactNode
  intro?: ReactNode
  className?: string
}

/** Section label styled like a spec file in a test run: "03 — stack.spec.ts" */
export function SectionHeader({ index, file, title, intro, className }: SectionHeaderProps) {
  return (
    <header className={cn('mb-12 md:mb-20', className)}>
      <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs tracking-wide text-muted">
        <span className="text-pass">{index}</span>
        <span className="h-px w-8 bg-line-strong" aria-hidden />
        <span>{file}</span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-4xl text-[clamp(2.25rem,6vw,5rem)] leading-[0.95] font-medium tracking-[-0.04em] text-balance">
          {title}
        </h2>
      </Reveal>
      {intro && (
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg text-pretty">{intro}</p>
        </Reveal>
      )}
    </header>
  )
}

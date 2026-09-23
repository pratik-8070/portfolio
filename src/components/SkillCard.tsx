import { motion } from 'framer-motion'

type SkillCardProps = { name: string; note: string; index: number }

/** A single tool inside the stack inspector. */
export function SkillCard({ name, note, index }: SkillCardProps) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex items-center justify-between gap-3 overflow-hidden rounded-xl border border-line bg-white/[0.02] px-4 py-3.5 transition-colors hover:border-pass/40 hover:bg-pass/[0.04]"
    >
      <div className="flex items-center gap-3">
        <span className="font-mono text-[10px] text-dim">{String(index + 1).padStart(2, '0')}</span>
        <span className="text-[15px] font-medium tracking-tight">{name}</span>
      </div>
      <span className="flex items-center gap-2 font-mono text-[10.5px] text-muted">
        {note}
        <span className="h-1.5 w-1.5 rounded-full bg-pass/70 transition-transform group-hover:scale-150" aria-hidden />
      </span>
    </motion.li>
  )
}

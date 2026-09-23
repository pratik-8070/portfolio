import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef, type MouseEvent, type ReactNode } from 'react'
import { cn } from '../utils/cn'
import { useFinePointer } from '../utils/hooks'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'ghost'
  size?: 'md' | 'lg'
  href?: string
  onClick?: () => void
  external?: boolean
  icon?: ReactNode
  className?: string
  ariaLabel?: string
  download?: boolean
}

/** Pill button with a subtle magnetic pull toward the cursor. */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  external,
  icon,
  className,
  ariaLabel,
  download,
}: ButtonProps) {
  const ref = useRef<HTMLElement>(null)
  const fine = useFinePointer()
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 })

  const onMove = (e: MouseEvent) => {
    if (!fine || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25)
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35)
  }
  const onLeave = () => {
    x.set(0)
    y.set(0)
  }

  const classes = cn(
    'group/btn relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-medium tracking-tight transition-colors duration-300',
    size === 'lg' ? 'h-14 px-7 text-base' : 'h-12 px-6 text-[15px]',
    variant === 'primary'
      ? 'bg-pass text-ink hover:bg-white'
      : 'border border-line-strong text-fg hover:border-fg/40 hover:bg-white/[0.04]',
    className,
  )

  const content = (
    <>
      <span className="relative">{children}</span>
      {icon && (
        <span className="relative transition-transform duration-500 ease-out-expo group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-px">
          {icon}
        </span>
      )}
    </>
  )

  const shared = {
    ref: ref as never,
    className: classes,
    style: { x, y },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    'aria-label': ariaLabel,
    'data-cursor-magnet': '',
  }

  if (href) {
    return (
      <motion.a
        {...shared}
        href={href}
        onClick={
          onClick
            ? (e) => {
                e.preventDefault()
                onClick()
              }
            : undefined
        }
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        download={download || undefined}
      >
        {content}
      </motion.a>
    )
  }
  return (
    <motion.button type="button" {...shared} onClick={onClick}>
      {content}
    </motion.button>
  )
}

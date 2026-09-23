import { cn } from '../utils/cn'

type MarqueeProps = {
  items: string[]
  className?: string
  duration?: number
  reverse?: boolean
  separator?: string
}

/** CSS-only infinite marquee (GPU transform; pauses on hover). */
export function Marquee({ items, className, duration = 40, reverse, separator = '✦' }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((item, i) => (
        <li key={i} className="flex items-center">
          <span className="px-6 md:px-10">{item}</span>
          <span className="text-pass text-[0.5em]" aria-hidden>
            {separator}
          </span>
        </li>
      ))}
    </ul>
  )
  return (
    <div
      className={cn(
        'group relative flex overflow-hidden select-none [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]',
        className,
      )}
    >
      <div
        className="flex w-max animate-marquee group-hover:[animation-play-state:paused]"
        style={{ ['--marquee-duration' as string]: `${duration}s`, animationDirection: reverse ? 'reverse' : 'normal' }}
      >
        {row(false)}
        {row(true)}
      </div>
    </div>
  )
}

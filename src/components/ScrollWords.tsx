import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../utils/cn'

export type ScrollWord = { text: string; emphasis?: boolean; strike?: boolean; br?: boolean }

type ScrollWordsProps = {
  words: ScrollWord[]
  className?: string
  as?: 'p' | 'h2' | 'h3' | 'blockquote'
  offset?: [string, string]
}

/** Words brighten one by one as the block scrolls through the viewport. */
export function ScrollWords({ words, className, as = 'p', offset = ['start 85%', 'end 55%'] }: ScrollWordsProps) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: offset as never })
  const Tag = as as 'p'
  const plain = words.map((w) => w.text).join(' ')

  return (
    <Tag ref={ref as never} className={cn('relative', className)}>
      <span className="sr-only">{plain}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <span key={i}>
            <Word word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            {w.br ? <br className="hidden md:block" /> : null}{' '}
          </span>
        ))}
      </span>
    </Tag>
  )
}

function Word({ word, progress, range }: { word: ScrollWord; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const strike = useTransform(progress, [range[1], Math.min(1, range[1] + 0.12)], ['0%', '100%'])
  return (
    <motion.span
      style={{ opacity }}
      className={cn(
        'relative inline-block',
        word.emphasis && 'font-serif italic font-normal text-pass tracking-[-0.01em]',
        word.strike && 'text-dim',
      )}
    >
      {word.text}
      {word.strike && (
        <motion.span
          className="absolute top-[55%] left-0 h-[0.06em] min-h-[2px] bg-bug"
          style={{ width: strike }}
        />
      )}
    </motion.span>
  )
}

/** Helper: turn lines + emphasis/strike word lists into ScrollWords input. */
export function toScrollWords(lines: string[], emphasis: string[] = [], strike: string[] = []): ScrollWord[] {
  const out: ScrollWord[] = []
  lines.forEach((line) => {
    const ws = line.split(' ')
    ws.forEach((text, j) => {
      out.push({
        text,
        emphasis: emphasis.includes(text),
        strike: strike.includes(text),
        br: j === ws.length - 1,
      })
    })
  })
  if (out.length) out[out.length - 1].br = false
  return out
}

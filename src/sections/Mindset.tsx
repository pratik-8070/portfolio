import { Marquee } from '../components/Marquee'
import { Reveal } from '../components/Reveal'
import { ScrollWords, toScrollWords } from '../components/ScrollWords'
import { mindset } from '../data/mindset'

export function Mindset() {
  return (
    <section id="mindset" className="relative overflow-hidden py-28 md:py-40" aria-labelledby="mindset-title">
      <div className="container-x">
        <Reveal className="mb-6 flex items-center gap-3 font-mono text-xs text-muted">
          <span className="text-pass">05</span>
          <span className="h-px w-8 bg-line-strong" aria-hidden />
          <span>mindset.md</span>
        </Reveal>
        <h2 id="mindset-title" className="sr-only">
          Testing mindset
        </h2>

        <div className="flex flex-col">
          {mindset.map((m, i) => (
            <article
              key={i}
              className="grid gap-6 border-t border-line py-16 first:border-t-0 md:grid-cols-12 md:gap-10 md:py-24"
            >
              <Reveal className="md:col-span-2">
                <p className="font-mono text-xs text-dim">
                  <span className="text-pass">§</span> {String(i + 1).padStart(2, '0')}
                </p>
              </Reveal>
              <div className="md:col-span-10">
                <ScrollWords
                  as="blockquote"
                  offset={['start 90%', 'end 60%']}
                  className="text-[clamp(2.1rem,6.4vw,6.25rem)] leading-[0.98] font-medium tracking-[-0.05em]"
                  words={toScrollWords(m.lines, m.emphasis, m.strike)}
                />
                <Reveal delay={0.2}>
                  <p className="mt-8 font-mono text-xs text-dim md:text-sm">{m.tag}</p>
                </Reveal>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-10 border-y border-line py-6 md:py-8">
        <Marquee
          duration={50}
          reverse
          separator="✕"
          className="font-mono text-sm tracking-wide text-muted md:text-base"
          items={[
            'null',
            'empty string',
            '0',
            '-1',
            'MAX_INT',
            'double click',
            'slow 3G',
            'expired session',
            'back button',
            'timezone +14',
            'emoji input',
            'race condition',
          ]}
        />
      </div>
    </section>
  )
}

import { Reveal } from '../components/Reveal'
import { SectionHeader } from '../components/SectionHeader'
import { Timeline } from '../components/Timeline'
import { experience } from '../data/experience'
import { profile } from '../data/profile'

export function Experience() {
  return (
    <section id="experience" className="relative py-28 md:py-40" aria-labelledby="experience-title">
      <div className="container-x">
        <SectionHeader
          index="06"
          file="experience.log"
          title={
            <span id="experience-title">
              {profile.experienceYears} years of{' '}
              <span className="font-serif font-normal text-pass italic">breaking things</span> on purpose.
            </span>
          }
        />

        <Timeline items={experience} />

        <Reveal className="mt-20 border-t border-line pt-10 md:mt-28">
          <p className="mb-5 font-mono text-xs text-dim">// testing types</p>
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-2xl font-medium tracking-[-0.03em] md:text-4xl">
            {profile.testingTypes.map((d, i) => (
              <li key={d} className="flex items-center gap-8 text-fg/80 transition-colors hover:text-pass">
                {d}
                {i < profile.testingTypes.length - 1 && <span className="text-base text-dim" aria-hidden>/</span>}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="mt-14 flex flex-col gap-2 border-t border-line pt-8 sm:flex-row sm:items-baseline sm:gap-10">
          <p className="font-mono text-xs text-dim">// education</p>
          <p className="text-lg tracking-tight">{profile.education}</p>
        </Reveal>
      </div>
    </section>
  )
}

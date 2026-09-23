import { Marquee } from '../components/Marquee'
import { marqueeItems } from '../data/profile'
import { About } from '../sections/About'
import { AIWorkflow } from '../sections/AIWorkflow'
import { Contact } from '../sections/Contact'
import { Experience } from '../sections/Experience'
import { Hero } from '../sections/Hero'
import { Metrics } from '../sections/Metrics'
import { Mindset } from '../sections/Mindset'
import { Process } from '../sections/Process'
import { Projects } from '../sections/Projects'
import { Stack } from '../sections/Stack'

/**
 * Story order: who I am → how I think → what I build with → how I test →
 * what I've built → what I believe → where I've been → proof → AI → connect.
 */
export function Home() {
  return (
    <>
      <Hero />
      <div className="border-y border-line bg-ink-2/60 py-5 md:py-7">
        <Marquee
          items={marqueeItems}
          duration={45}
          className="text-2xl font-medium tracking-[-0.03em] text-fg/80 md:text-4xl"
        />
      </div>
      <About />
      <Stack />
      <Process />
      <Projects />
      <Mindset />
      <Experience />
      <Metrics />
      <AIWorkflow />
      <Contact />
    </>
  )
}

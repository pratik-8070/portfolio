import { profile } from '../data/profile'
import { scrollToId } from '../utils/smoothScroll'
import { ArrowUp } from './Icons'

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-6 py-8 font-mono text-xs text-muted md:flex-row md:items-center md:justify-between">
        <p>
          © {year} {profile.name}
        </p>
        <a
          href="https://github.com/pratik-8070/portfolio/actions/workflows/e2e.yml"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 transition-colors hover:text-fg"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-pass" aria-hidden />
          tests: Playwright on every push · desktop + mobile · a11y
        </a>
        <button
          type="button"
          onClick={() => scrollToId('top')}
          className="group flex items-center gap-2 self-start transition-colors hover:text-fg md:self-auto"
        >
          Back to top
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-line-strong transition-transform duration-500 group-hover:-translate-y-1">
            <ArrowUp size={14} />
          </span>
        </button>
      </div>
    </footer>
  )
}

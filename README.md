# Pratik Lal Vishwakarma — QA Automation Portfolio

[![E2E tests](https://github.com/pratik-8070/portfolio/actions/workflows/e2e.yml/badge.svg)](https://github.com/pratik-8070/portfolio/actions/workflows/e2e.yml)

React · TypeScript · Vite · Tailwind CSS v4 · Framer Motion · Lenis

```bash
npm install
npm run dev       # local dev server
npm run build     # typecheck + production build → dist/
npm run preview   # serve the production build
```

## Structure

```
src/
  components/   Navbar, Footer, Button, Cursor, TestRunner, ProjectCard, ProjectInspector,
                ProjectVisual, SkillCard, Metric, Timeline, Marquee, Reveal, SplitText, ScrollWords…
  sections/     Hero, About, Stack, Process, Projects, Mindset, Experience, Metrics, AIWorkflow, Contact
  pages/        Home (section order / story)
  data/         All copy & content: profile, projects, stack, process, mindset, experience, metrics, ai
  utils/        smooth scroll, hooks, cn
public/         favicon.svg, og-image.png, robots.txt (add resume.pdf here)
```

All content lives in `src/data/`. Edit it there, not in the components.

## Tests

The site is tested with Playwright on every push (and daily), on desktop and mobile:

```bash
npm run test:e2e      # builds, serves the production bundle and runs tests/portfolio.spec.ts
```

The tests check that the page loads without console errors, that the featured projects appear in order, that each project opens and closes using the keyboard, that every project link resolves, that the resume downloads, and that there are no serious WCAG 2 A/AA violations (axe).

## Content source

All facts on the site come from the resume (`public/resume.pdf`) or from the linked public GitHub projects. Don't add claims or numbers that can't be checked in one of them.

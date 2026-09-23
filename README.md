# Pratik Lal Vishwakarma — QA Automation Portfolio

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

## Before deploying: fill in the placeholders

| What | Where |
| --- | --- |
| Email, LinkedIn, GitHub URLs | `src/data/profile.ts` → `links` |
| Resume PDF | put it at `public/resume.pdf` |
| MelloUp dates | `src/data/experience.ts` → `period` |
| Previous roles (company, role, dates, domain, summary) | `src/data/experience.ts` (dashed placeholder card) |
| Project GitHub / demo links | `src/data/projects.ts` → `links` |
| Deployed domain (canonical + OG URLs) | `index.html` (`your-domain.com`) |

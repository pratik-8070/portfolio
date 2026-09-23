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

## Content source

All facts on the site come from the resume (`public/resume.pdf`). Don't add claims or numbers that aren't in it.

## Still to update

| What | Where |
| --- | --- |
| Mobile framework repo link | `src/data/projects.ts` → `links` |

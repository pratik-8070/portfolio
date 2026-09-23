/**
 * Work history, taken from the resume. Entries marked `placeholder: true`
 * render with a dashed "placeholder" style.
 */
export type ExperienceItem = {
  role: string
  company: string
  context: string
  period: string
  current?: boolean
  placeholder?: boolean
  summary: string
  highlights?: string[]
  responsibilities: string[]
}

export const experience: ExperienceItem[] = [
  {
    role: 'Software Test Engineer',
    company: 'MelloUp',
    context: 'B2B SaaS · Bengaluru',
    period: 'Sep 2024 — Apr 2026',
    current: true,
    summary:
      'Built the Playwright automation framework from scratch using the Page Object Model, and automated the platform’s end-to-end B2B SaaS workflows: event tracking, attendee filtering, group creation, email campaigns and lead engagement.',
    highlights: ['95% automation coverage', '~60–70% less manual regression time (est.)'],
    responsibilities: [
      'Framework from scratch (POM)',
      'End-to-end automation',
      'Functional · regression · smoke suites',
      'REST API testing (Postman)',
      'Defect management (JIRA)',
      'CI/CD',
      'Test reporting',
      'AI-assisted scripting',
    ],
  },
]

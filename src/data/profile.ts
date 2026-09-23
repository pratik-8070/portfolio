/** Personal details & links. */
export const profile = {
  name: 'Pratik Lal Vishwakarma',
  firstName: 'Pratik',
  role: 'QA Automation Engineer',
  positioning: 'QA Automation Engineer specializing in Web, API & Mobile Test Automation.',
  headline: {
    before: 'I find the bugs',
    emphasis: 'users',
    after: 'shouldn’t have to.',
  },
  subheadline:
    'QA Automation Engineer building reliable Web, API and Mobile test automation with Playwright, TypeScript, Appium and CI/CD.',
  availability: 'Open to QA Automation opportunities',
  experienceYears: '4.6+',
  domains: ['FinTech', 'Supply Chain Finance', 'EdTech', 'Enterprise platforms', 'B2B SaaS'],
  education: 'M.Sc — Kolhan University, Jharkhand',
  links: {
    email: 'pratikv8070@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pratiklalv/',
    github: 'https://github.com/pratik-8070',
    resume: '/resume.pdf',
  },
} as const

export const navItems = [
  { id: 'about', label: 'About' },
  { id: 'stack', label: 'Stack' },
  { id: 'process', label: 'Process' },
  { id: 'work', label: 'Work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
] as const

export const marqueeItems = [
  'Playwright',
  'TypeScript',
  'Appium',
  'WebdriverIO',
  'REST APIs',
  'Postman',
  'SQL',
  'GitHub Actions',
  'Jenkins',
  'Allure',
  'JIRA',
  'Smoke & Sanity',
  'CI/CD',
  'AI-assisted testing',
]

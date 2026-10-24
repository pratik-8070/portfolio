export type StackCategory = {
  id: string
  name: string
  command: string
  description: string
  tools: { name: string; note: string }[]
}

export const stack: StackCategory[] = [
  {
    id: 'automation',
    name: 'Automation',
    command: 'npx playwright test',
    description: 'The core. Frameworks for driving browsers and devices, written to be maintained.',
    tools: [
      { name: 'Playwright', note: 'Web E2E' },
      { name: 'TypeScript', note: 'Typed tests' },
      { name: 'JavaScript', note: 'Language' },
      { name: 'Appium', note: 'Mobile driver' },
      { name: 'WebdriverIO', note: 'Test runner' },
      { name: 'POM · Fixtures', note: 'Framework design' },
    ],
  },
  {
    id: 'api',
    name: 'API',
    command: 'GET /api/v1/health → 200',
    description: 'Validating the contract underneath the UI: status, schema, payloads and edge cases.',
    tools: [
      { name: 'REST APIs', note: 'Contract checks' },
      { name: 'Postman', note: 'Collections' },
    ],
  },
  {
    id: 'database',
    name: 'Database',
    command: 'SELECT * FROM orders WHERE …',
    description: 'Checking that what the UI says actually happened in the data layer.',
    tools: [
      { name: 'SQL', note: 'Queries' },
      { name: 'MySQL', note: 'Data validation' },
    ],
  },
  {
    id: 'cicd',
    name: 'CI/CD',
    command: 'on: [push, schedule]',
    description: 'Tests that run themselves on every push, on a schedule, without anyone asking.',
    tools: [
      { name: 'GitHub Actions', note: 'Pipelines' },
      { name: 'Jenkins', note: 'Pipelines' },
      { name: 'Git', note: 'Version control' },
    ],
  },
  {
    id: 'reporting',
    name: 'Reporting',
    command: 'allure serve ./allure-results',
    description: 'Results people can read, and defects tracked to closure. A failure should explain itself.',
    tools: [
      { name: 'Allure', note: 'Test reports' },
      { name: 'JIRA', note: 'Defect tracking' },
      { name: 'Slack Bolt', note: 'QA bots' },
      { name: 'Google Sheets API', note: 'Test case export' },
      { name: 'HTML Reports', note: 'Built-in' },
      { name: 'Trace Viewer', note: 'Debugging' },
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    command: '/generate-test-cases prd.md',
    description: 'Assistants for speed, and AI tools I build, with checks that gate every output. QA judgment stays with me.',
    tools: [
      { name: 'Claude Code', note: 'Agent skills' },
      { name: 'Claude Agent SDK', note: 'Headless agent' },
      { name: 'Gemini API', note: 'Free-tier LLM' },
      { name: 'Python', note: 'Tooling' },
      { name: 'ChatGPT', note: 'Assistant' },
      { name: 'GitHub Copilot', note: 'In-editor' },
    ],
  },
]

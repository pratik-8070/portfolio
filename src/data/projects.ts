/**
 * Featured projects.
 * `links` are optional. Leave a value undefined and the card shows "Link coming soon".
 * TODO: add real GitHub / demo URLs where applicable.
 */
export type ProjectVisual = 'playwright' | 'saas' | 'mobile' | 'slack-jira' | 'test-agent' | 'ai'

export type Project = {
  id: string
  index: string
  title: string
  tagline: string
  visual: ProjectVisual
  tags: string[]
  problem: string
  built: string[]
  technologies: string[]
  approach: string[]
  result: string
  /** Real screenshots (files in public/projects/…), shown in the inspector */
  screenshots?: { src: string; alt: string; caption: string; width: number; height: number }[]
  /** Honest limitations / what I'd do next */
  nextSteps?: string[]
  links?: { github?: string; demo?: string; demoLabel?: string }
}

export const projects: Project[] = [
  {
    id: 'playwright-ecommerce',
    index: '01',
    title: 'Playwright E‑Commerce Automation Framework',
    tagline: 'A Page Object framework, built from scratch, covering login through cart validation, with CI on every push.',
    visual: 'playwright',
    tags: ['Playwright', 'JavaScript', 'POM', 'Allure', 'GitHub Actions'],
    problem:
      'E-commerce flows break in small, costly ways: a cart total that is off, or an element that renders late. Manual regression can’t keep pace with every change.',
    built: [
      'Automation framework built from scratch',
      'Page Object Model architecture',
      'Login, product selection and add-to-cart flows',
      'Cart validation',
      'Robust handling of dynamic elements',
      'Reusable fixtures and assertions',
      'Allure reporting, published as a live report',
      'GitHub Actions CI on push, plus scheduled daily runs',
    ],
    technologies: ['Playwright', 'JavaScript', 'TypeScript', 'Allure', 'GitHub Actions'],
    approach: [
      'Page objects keep locators and actions out of test logic',
      'Web-first assertions and auto-waiting for dynamic content',
      'Every push, and a daily schedule, runs the suite in CI and publishes a report',
    ],
    result:
      'A maintainable, CI-integrated suite that validates the core purchase journey automatically and reports clearly when something breaks.',
    links: {
      demo: 'https://automation-exercise-pratik.vercel.app/',
      demoLabel: 'Live Allure report',
    },
  },
  {
    id: 'b2b-saas',
    index: '02',
    title: 'B2B SaaS QA Automation',
    tagline: 'A Playwright framework built from scratch at MelloUp. It reached 95% automation coverage across event, attendee and campaign workflows.',
    visual: 'saas',
    tags: ['Playwright', 'TypeScript', 'POM', 'Postman', 'B2B SaaS'],
    problem:
      'A feature-rich B2B platform where modules depend on each other. A change to groups or filters can quietly break campaigns and lead tracking.',
    built: [
      'Playwright (JavaScript/TypeScript) framework from scratch, using POM',
      'Event tracking validation',
      'Attendee filtering scenarios',
      'Group creation and management flows',
      'Email campaign checks',
      'Lead engagement validation',
      'Functional, regression, smoke and REST API suites',
    ],
    technologies: ['Playwright', 'TypeScript', 'JavaScript', 'Page Object Model', 'Postman', 'REST APIs', 'JIRA'],
    approach: [
      'Map cross-module dependencies before each release',
      'Functional depth on new features, regression breadth on existing ones',
      'Filter and data-combination edge cases tested deliberately',
    ],
    result:
      '95% automation coverage and an estimated 60–70% reduction in manual regression time. Defects were caught earlier in the release cycle, and releases became faster and more reliable.',
  },
  {
    id: 'mobile-framework',
    index: '03',
    title: 'Mobile Automation Framework',
    tagline: 'A native Android framework built from scratch with TypeScript, WebdriverIO, Appium 3 and UiAutomator2, running on the Android Emulator.',
    visual: 'mobile',
    tags: ['Appium', 'WebdriverIO', 'TypeScript', 'Android'],
    problem:
      'Testing native Android screens by hand is slow and repetitive. Automating them is fragile unless locators, waits and device setup are handled in one consistent way.',
    built: [
      'Framework from scratch: TypeScript + WebdriverIO v9 + Appium 3 + UiAutomator2',
      'Page Object Model on a shared base page',
      'Locator builders by priority: accessibility id → resource id → UiSelector',
      'Reusable utilities: explicit waits, gestures, app lifecycle',
      'Environment-driven config for device, app and Appium server',
      'Screenshot on failure and a log file for every run',
      'Smoke suite plus a product-navigation test on Sauce Labs’ My Demo App',
    ],
    technologies: ['Appium 3', 'WebdriverIO', 'TypeScript', 'Mocha', 'UiAutomator2', 'Appium Inspector', 'Android Emulator'],
    approach: [
      'Locators found and validated in Appium Inspector before they are coded',
      'Explicit waits instead of sleeps',
      'Assertions compare values read from the app, not hard-coded data',
      'Smoke suite runs on its own with npm run test:smoke',
    ],
    result:
      'One command starts Appium, boots the emulator if needed, installs the app, runs the specs and tears everything down cleanly. Every failure leaves a screenshot and a log.',
    links: { github: undefined },
  },
  {
    id: 'slack-jira',
    index: '04',
    title: 'Slack → Jira Bug Reporting Tool',
    tagline: 'Type /report in Slack and fill in a bug form. A Jira bug is filed through the REST API, and the ticket link comes straight back to you.',
    visual: 'slack-jira',
    tags: ['Node.js', 'Slack Bolt', 'Jira REST API', 'Tooling'],
    problem:
      'Bug reports arrived as free-text Slack messages, often missing platform, repro steps or severity. Someone then had to re-type each one into Jira, so reports sat in the channel until they did.',
    built: [
      'Slack /report slash command (Bolt, Socket Mode)',
      'Block Kit modal: platforms, title, description, steps, severity',
      'Validation that at least one platform is selected',
      'Command restricted to the team’s bug channel',
      'Jira Cloud REST API v3 client that files a Bug issue',
      'Description formatted as Atlassian Document Format',
      'Private confirmation with a link to the new ticket',
    ],
    technologies: ['Node.js', 'Slack Bolt', 'Socket Mode', 'Block Kit', 'Jira Cloud REST API v3', 'Atlassian Document Format'],
    approach: [
      'Structured fields so every report arrives with steps, severity and platforms',
      'Invalid input is rejected inside the modal, before any API call',
      'Jira API failures are reported back to the user, not swallowed',
      'Credentials live in environment variables, never in the repo',
    ],
    result:
      'Bugs go from a Slack conversation to a complete Jira ticket in one step, with nothing to copy and paste and a direct link back to the reporter. Socket Mode means it runs without a public server.',
    screenshots: [
      {
        src: '/projects/slack-jira/modal.jpg',
        alt: 'Slack modal titled Report a Bug with platform checkboxes (Android and Mobile Web selected), bug title, description and steps to reproduce fields, and Cancel and Create buttons',
        caption: '/report opens a structured bug form',
        width: 900,
        height: 988,
      },
      {
        src: '/projects/slack-jira/confirmation.jpg',
        alt: 'Private Slack message from the Bug Reporter app: Hello there! Your ticket has been successfully created, SCRUM-10',
        caption: 'Create → private confirmation with the ticket link',
        width: 1200,
        height: 271,
      },
      {
        src: '/projects/slack-jira/jira-ticket.jpg',
        alt: 'Jira bug SCRUM-10 titled Test 1, with description, steps to reproduce, severity Medium and platforms Android, Mobile Web mapped into the description',
        caption: 'The Jira bug, with every field mapped into the description',
        width: 1600,
        height: 882,
      },
    ],
    nextSteps: [
      'Map severity and platforms to native Jira fields (priority, labels)',
      'Retry or queue submissions when the Jira API fails',
      'Switch to HTTP mode and host it for always-on team use',
      'Add automated tests for the payload mapping and modal validation',
    ],
    links: { github: 'https://github.com/pratik-8070/slack-jira-bug-reporter' },
  },
  {
    id: 'test-case-agent',
    index: '05',
    title: 'AI Test Case Generation Agent',
    tagline: 'Paste a PRD, Confluence page or Figma link into a Slack form and get validated, traceable test cases in a Google Sheet a few minutes later.',
    visual: 'test-agent',
    tags: ['AI Agent', 'Python', 'Claude', 'Gemini', 'Slack Bolt', 'Google Sheets'],
    problem:
      'Writing test cases from PRDs and designs is slow and uneven. Negative and boundary cases get missed, the link back to requirements is lost, and every PRD revision means rewriting the suite.',
    built: [
      'Claude Code skill (/generate-test-cases) driven by a staged QA workflow',
      'Input classification: stories, acceptance criteria, PRDs, API specs, UI designs, existing suites',
      'Requirement extraction that keeps source IDs (FR-6, AC2) for traceability',
      'Clarification gate: asks about missing rules instead of inventing them',
      'Positive, negative, boundary, validation and edge-case scenario design',
      'Deterministic checks: schema, vague wording, duplicates, coverage of every acceptance criterion',
      'Slack /test-case form that reads Confluence pages, Figma screens and docs by itself',
      'Google Sheet per run with Test type and P0–P3 priority dropdowns',
      'Versioned knowledge base in Google Sheets that reuses and updates tests when the PRD changes',
    ],
    technologies: ['Python', 'Claude Code', 'Claude Agent SDK', 'Gemini API', 'Slack Bolt', 'Confluence REST API', 'Figma REST API', 'Google Sheets API', 'JSON Schema'],
    approach: [
      'The AI does the judgement work; plain Python checks gate every suite before it ships',
      'Never invent requirements: missing details become questions or clearly flagged assumptions',
      'Every test case traces back to a requirement, acceptance criterion or business rule',
      'Test cases edited by a person are protected; source changes only flag them for review',
      'The bot fetches links itself, so the AI never gets network access',
    ],
    result:
      'From a single Confluence PRD link: 44 test cases covering all 34 requirements, 17 acceptance criteria and 5 business rules, in about four minutes on Gemini’s free tier. Each run is saved as a new version in the knowledge base, so a revised PRD updates the existing suite instead of replacing it.',
    nextSteps: [
      'Host the Slack bot on an always-on server instead of a laptop',
      'Export straight to Jira and test management tools',
      'Generate Playwright tests from the approved test cases',
      'Measure quality across models (free-tier Gemini suites are thinner than Claude’s)',
    ],
    links: { github: 'https://github.com/pratik-8070/test-case-generation-agent' },
  },
  {
    id: 'ai-assisted',
    index: '06',
    title: 'AI-Assisted Testing',
    tagline: 'Using AI to go faster, with every output checked by a tester.',
    visual: 'ai',
    tags: ['ChatGPT', 'Claude', 'GitHub Copilot'],
    problem:
      'Much of QA work is drafting: cases, scripts, test data and documentation. That is time not spent thinking about risk.',
    built: [
      'Test case generation',
      'Test script creation',
      'Debugging support',
      'Locator suggestions',
      'Test data generation',
      'Failure analysis',
      'Documentation',
    ],
    technologies: ['ChatGPT', 'Claude', 'GitHub Copilot'],
    approach: [
      'AI drafts, I review and decide',
      'Generated tests are validated like any other code',
      'Domain knowledge and risk thinking stay with the tester',
    ],
    result: 'Less time on boilerplate, more time on the edge cases that matter.',
  },
]

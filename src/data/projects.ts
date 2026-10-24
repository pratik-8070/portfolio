/**
 * Featured projects.
 * `links` are optional. Leave a value undefined and the card shows "Link coming soon".
 * TODO: add real GitHub / demo URLs where applicable.
 */
export type ProjectVisual = 'slack-jira' | 'test-agent'

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
    id: 'slack-jira',
    index: '01',
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
    index: '02',
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
]

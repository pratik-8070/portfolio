export type MindsetStatement = {
  lines: string[]
  /** words to render in the accent serif */
  emphasis?: string[]
  /** words to render struck through */
  strike?: string[]
  tag: string
}

export const mindset: MindsetStatement[] = [
  {
    lines: ['Happy path is only', 'the beginning.'],
    emphasis: ['beginning.'],
    tag: '// test.describe("everything else")',
  },
  {
    lines: ['Every feature has', 'an edge case.'],
    emphasis: ['edge', 'case.'],
    tag: '// null, empty, 0, -1, 10_000, "🙃"',
  },
  {
    lines: ["Automation isn't about", 'writing more tests.', "It's about getting", 'faster feedback.'],
    strike: ['writing', 'more', 'tests.'],
    emphasis: ['faster', 'feedback.'],
    tag: '// signal > volume',
  },
  {
    lines: ["Good QA doesn't just", 'find bugs. It prevents', 'them from reaching', 'production.'],
    emphasis: ['production.'],
    tag: '// shift left',
  },
]

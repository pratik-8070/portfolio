/** Only metrics supplied by Pratik. Do not add invented numbers here. */
export type MetricItem =
  | { kind: 'number'; value: number; decimals?: number; suffix?: string; label: string; note?: string }
  | { kind: 'range'; from: number; to: number; suffix?: string; label: string; note?: string }
  | { kind: 'text'; parts: string[]; label: string; note?: string }

export const metrics: MetricItem[] = [
  { kind: 'number', value: 4.6, decimals: 1, suffix: '+', label: 'Years of experience', note: 'QA & test automation' },
  { kind: 'number', value: 95, suffix: '%', label: 'Automation coverage', note: 'Playwright framework' },
  { kind: 'range', from: 60, to: 70, suffix: '%', label: 'Less manual regression time', note: 'Estimated' },
  { kind: 'text', parts: ['Web', 'API', 'Mobile'], label: 'Testing across platforms' },
  { kind: 'number', value: 50, suffix: '+', label: 'Manual test cases' },
]

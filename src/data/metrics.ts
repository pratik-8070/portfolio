/** Only metrics backed by the resume. Do not add invented numbers here. */
export type MetricItem =
  | { kind: 'number'; value: number; decimals?: number; suffix?: string; label: string; note?: string }
  | { kind: 'range'; from: number; to: number; suffix?: string; label: string; note?: string }
  | { kind: 'text'; parts: string[]; label: string; note?: string }

export const metrics: MetricItem[] = [
  { kind: 'number', value: 2, label: 'Years of experience', note: 'Web · API · mobile automation' },
  { kind: 'number', value: 95, suffix: '%', label: 'Automation coverage', note: 'Playwright framework' },
  { kind: 'range', from: 60, to: 70, suffix: '%', label: 'Less manual regression time', note: 'Estimated' },
  { kind: 'text', parts: ['Web', 'API', 'Mobile'], label: 'Testing across platforms' },
]

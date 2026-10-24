import { motion } from 'framer-motion'
import type { ProjectVisual as VisualKind } from '../data/projects'
import { cn } from '../utils/cn'
import { Check } from './Icons'

/** Decorative illustration per project, built in HTML/CSS so it stays sharp and light. */
export function ProjectVisual({ kind, active }: { kind: VisualKind; active?: boolean }) {
  switch (kind) {
    case 'slack-jira':
      return <SlackJiraFlow active={active} />
    case 'test-agent':
      return <TestAgentVisual active={active} />
    case 'playwright':
      return <PlaywrightVisual active={active} />
  }
}

const k = 'text-[#c792ea]' // keyword
const s = 'text-pass' // string
const f = 'text-info' // function
const c = 'text-dim' // comment

function PlaywrightVisual({ active }: { active?: boolean }) {
  const lines = [
    <><span className={c}>// tests/cart.spec.ts</span></>,
    <><span className={k}>test</span>(<span className={s}>'add to cart'</span>, <span className={k}>async</span> ({'{'} page {'}'}) =&gt; {'{'}</>,
    <>&nbsp;&nbsp;<span className={k}>const</span> login = <span className={k}>new</span> <span className={f}>LoginPage</span>(page)</>,
    <>&nbsp;&nbsp;<span className={k}>await</span> login.<span className={f}>signIn</span>(user)</>,
    <>&nbsp;&nbsp;<span className={k}>await</span> products.<span className={f}>select</span>(<span className={s}>'Backpack'</span>)</>,
    <>&nbsp;&nbsp;<span className={k}>await</span> cart.<span className={f}>add</span>()</>,
    <>&nbsp;&nbsp;<span className={k}>await</span> <span className={f}>expect</span>(cart.items).<span className={f}>toHaveCount</span>(1)</>,
    <>{'}'})</>,
  ]
  return (
    <div className="relative h-full w-full p-5 md:p-7">
      <div className="h-full overflow-hidden rounded-xl border border-line bg-ink/80">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[10.5px] text-dim">
          <span className="rounded bg-white/5 px-2 py-0.5 text-muted">cart.spec.ts</span>
          <span>LoginPage.ts</span>
          <span className="hidden sm:inline">allure-results/</span>
        </div>
        <pre className="overflow-hidden p-4 font-mono text-[11px] leading-[1.9] text-fg/90 md:text-[12.5px]">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              className="flex gap-4 whitespace-nowrap"
              initial={{ opacity: 0.35 }}
              animate={{ opacity: active ? 1 : 0.8 }}
              transition={{ delay: active ? i * 0.05 : 0 }}
            >
              <span className="w-4 shrink-0 text-right text-dim/60 select-none">{i + 1}</span>
              <span>{l}</span>
            </motion.div>
          ))}
        </pre>
      </div>
      <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-full border border-pass/30 bg-ink/90 px-3 py-1.5 font-mono text-[11px] text-pass backdrop-blur md:right-5 md:bottom-5">
        <Check size={12} /> passed · GitHub Actions
      </div>
    </div>
  )
}

export function SlackJiraFlow({ active, compact }: { active?: boolean; compact?: boolean }) {
  const nodes = [
    { label: 'Slack', sub: '/report' },
    { label: 'Modal', sub: 'Block Kit' },
    { label: 'API', sub: 'Bolt · Node' },
    { label: 'Jira', sub: 'REST v3' },
    { label: 'Notify', sub: 'ticket link' },
  ]
  return (
    <div className={cn('flex h-full w-full flex-col justify-center gap-6', compact ? 'p-0' : 'p-5 md:p-8')}>
      <div className="relative">
        {/* rail */}
        <div className="absolute top-1/2 right-[10%] left-[10%] h-px -translate-y-1/2 bg-line-strong" aria-hidden>
          <motion.span
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-pass shadow-[0_0_16px_4px_rgba(200,240,49,0.5)]"
            animate={{ left: ['0%', '100%'] }}
            transition={{ duration: active ? 2 : 3.2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <ol className="relative grid grid-cols-5 gap-2">
          {nodes.map((n, i) => (
            <li key={n.label} className="flex flex-col items-center text-center">
              <motion.span
                className="flex aspect-square w-full max-w-[76px] flex-col items-center justify-center rounded-2xl border border-line-strong bg-ink-2"
                animate={active ? { borderColor: ['rgba(255,255,255,0.16)', 'rgba(200,240,49,0.7)', 'rgba(255,255,255,0.16)'] } : {}}
                transition={{ duration: 2, delay: (i / 4) * 2 * 0.9, repeat: Infinity }}
              >
                <span className="text-[12px] font-medium tracking-tight md:text-sm">{n.label}</span>
              </motion.span>
              <span className="mt-2 font-mono text-[9.5px] text-dim md:text-[10.5px]">{n.sub}</span>
            </li>
          ))}
        </ol>
      </div>
      {!compact && (
        <div className="mx-auto w-full max-w-md rounded-xl border border-line bg-ink/80 p-4 font-mono text-[11px] leading-relaxed">
          <p className="text-dim">POST /rest/api/3/issue</p>
          <p className="text-muted">
            {'{'} <span className="text-info">"issuetype"</span>: <span className="text-pass">"Bug"</span>,{' '}
            <span className="text-info">"summary"</span>: <span className="text-pass">"…"</span> {'}'}
          </p>
          <p className="mt-1 text-pass">← 201 Created</p>
        </div>
      )}
    </div>
  )
}

function TestAgentVisual({ active }: { active?: boolean }) {
  const inputs = ['PRD', 'Confluence', 'Figma', 'API spec']
  const rows = [
    { id: 'TC-LUXURY-001', type: 'Boundary', p: 'P0', title: 'Price ₹49,999 is rejected' },
    { id: 'TC-LUXURY-002', type: 'Boundary', p: 'P1', title: 'Price ₹50,000 is accepted' },
    { id: 'TC-CART-004', type: 'Negative', p: 'P1', title: 'Out-of-stock item not added' },
    { id: 'TC-OM-001', type: 'Validation', p: 'P2', title: 'Min offer above asking price' },
  ]
  const pColor: Record<string, string> = { P0: 'text-bug', P1: 'text-[#f0b429]', P2: 'text-info' }
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4 p-5 md:p-7">
      <div className="flex items-center gap-2 font-mono text-[10.5px]">
        <div className="flex flex-wrap gap-1.5">
          {inputs.map((name, i) => (
            <motion.span
              key={name}
              className="rounded-md border border-line bg-white/[0.03] px-2 py-1 text-muted"
              animate={active ? { borderColor: ['rgba(255,255,255,0.10)', 'rgba(200,240,49,0.6)', 'rgba(255,255,255,0.10)'] } : {}}
              transition={{ duration: 1.6, delay: i * 0.2, repeat: Infinity }}
            >
              {name}
            </motion.span>
          ))}
        </div>
        <span className="text-dim">→</span>
        <span className="shrink-0 rounded-md border border-pass/30 bg-pass/[0.08] px-2 py-1 text-pass">agent</span>
      </div>
      <div className="overflow-hidden rounded-xl border border-line bg-ink/80">
        <div className="flex items-center gap-2 border-b border-line px-4 py-2.5 font-mono text-[10.5px] text-dim">
          <span className="rounded bg-white/5 px-2 py-0.5 text-muted">Test Cases – Add to Cart v1</span>
          <span className="hidden sm:inline">Google Sheet</span>
        </div>
        <ul className="divide-y divide-line">
          {rows.map((r, i) => (
            <motion.li
              key={r.id}
              className="flex items-center gap-3 px-4 py-2.5 text-[12.5px]"
              initial={{ opacity: 0.4 }}
              animate={{ opacity: active ? 1 : 0.85 }}
              transition={{ delay: active ? 0.15 + i * 0.12 : 0 }}
            >
              <span className="hidden w-28 shrink-0 font-mono text-[10.5px] text-dim sm:inline">{r.id}</span>
              <span className="flex-1 truncate">{r.title}</span>
              <span className="hidden font-mono text-[10px] text-muted md:inline">{r.type}</span>
              <span className={cn('font-mono text-[10.5px] font-medium', pColor[r.p])}>{r.p}</span>
            </motion.li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-center gap-2 font-mono text-[10.5px] text-pass">
        <Check size={12} /> qa_tools checks passed · 34/34 requirements covered
      </div>
    </div>
  )
}

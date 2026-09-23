import { motion } from 'framer-motion'
import type { ProjectVisual as VisualKind } from '../data/projects'
import { cn } from '../utils/cn'
import { Check } from './Icons'

/** Decorative illustration per project, built in HTML/CSS so it stays sharp and light. */
export function ProjectVisual({ kind, active }: { kind: VisualKind; active?: boolean }) {
  switch (kind) {
    case 'playwright':
      return <PlaywrightVisual active={active} />
    case 'saas':
      return <SaasVisual active={active} />
    case 'mobile':
      return <MobileVisual active={active} />
    case 'slack-jira':
      return <SlackJiraFlow active={active} />
    case 'ai':
      return <AIVisual active={active} />
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

function SaasVisual({ active }: { active?: boolean }) {
  const rows = [
    { name: 'Attendee A', group: 'VIP', ok: true },
    { name: 'Attendee B', group: 'Speakers', ok: true },
    { name: 'Attendee C', group: '(none)', ok: false },
    { name: 'Attendee D', group: 'Sponsors', ok: true },
  ]
  return (
    <div className="h-full w-full p-5 md:p-7">
      <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-ink/80">
        <div className="flex flex-wrap items-center gap-2 border-b border-line p-3">
          {['Event: Summit', 'Status: Registered', 'Group: Any'].map((chip) => (
            <span key={chip} className="rounded-md border border-line bg-white/[0.03] px-2 py-1 font-mono text-[10.5px] text-muted">
              {chip}
            </span>
          ))}
          <span className="ml-auto rounded-md bg-pass px-2 py-1 font-mono text-[10.5px] font-medium text-ink">Campaign ↗</span>
        </div>
        <ul className="flex-1 divide-y divide-line">
          {rows.map((r, i) => (
            <motion.li
              key={r.name}
              className={cn('flex items-center gap-3 px-4 py-3 text-[13px]', !r.ok && 'bg-bug/[0.06]')}
              animate={{ x: active && !r.ok ? [0, -4, 4, -2, 0] : 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
            >
              <span className="h-6 w-6 shrink-0 rounded-full bg-gradient-to-br from-white/20 to-white/5" aria-hidden />
              <span className="flex-1 truncate">{r.name}</span>
              <span className="hidden font-mono text-[10.5px] text-dim sm:inline">{r.group}</span>
              {r.ok ? (
                <span className="font-mono text-[10px] text-pass">PASS</span>
              ) : (
                <span className="rounded bg-bug/15 px-1.5 py-0.5 font-mono text-[10px] text-bug">EDGE CASE</span>
              )}
            </motion.li>
          ))}
        </ul>
        <div className="border-t border-line px-4 py-2.5 font-mono text-[10.5px] text-dim">
          filter × group × campaign → <span className="text-muted">combinations covered</span>
        </div>
      </div>
    </div>
  )
}

function MobileVisual({ active }: { active?: boolean }) {
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-6 p-5 md:p-7">
      <div className="relative h-[92%] max-h-[380px] aspect-[9/19] rounded-[28px] border border-line-strong bg-ink p-2 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <div className="absolute top-3 left-1/2 h-1.5 w-12 -translate-x-1/2 rounded-full bg-white/10" aria-hidden />
        <div className="flex h-full flex-col gap-2 overflow-hidden rounded-[22px] bg-ink-3 p-3 pt-6">
          <div className="h-16 rounded-xl bg-gradient-to-br from-pass/25 to-pass/5" />
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-2 rounded-lg bg-white/[0.04] p-2">
              <div className="h-6 w-6 rounded-md bg-white/10" />
              <div className="flex-1 space-y-1">
                <div className="h-1.5 w-3/4 rounded bg-white/15" />
                <div className="h-1.5 w-1/2 rounded bg-white/10" />
              </div>
            </div>
          ))}
          <div className="relative mt-auto flex h-9 items-center justify-center rounded-lg bg-pass font-mono text-[10px] font-medium text-ink">
            Add to cart
            <motion.span
              aria-hidden
              className="absolute h-8 w-8 rounded-full border-2 border-white"
              animate={active ? { scale: [0.4, 1.6], opacity: [0.9, 0] } : { opacity: 0 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
      <div className="hidden flex-col gap-2 font-mono text-[10.5px] sm:flex">
        {[
          ['driver', 'UiAutomator2'],
          ['runner', 'WebdriverIO + Mocha'],
          ['schedule', 'cron · scheduled'],
          ['report', 'auto-generated'],
        ].map(([key, val]) => (
          <div key={key} className="rounded-lg border border-line bg-ink/80 px-3 py-2">
            <p className="text-dim">{key}</p>
            <p className="text-fg">{val}</p>
          </div>
        ))}
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

function AIVisual({ active }: { active?: boolean }) {
  const steps = [
    { who: 'me', text: 'Risky areas: auth expiry, empty cart, currency rounding' },
    { who: 'ai', text: 'Draft: scenarios, test data, locator options' },
    { who: 'me', text: 'Reviewed · pruned · edge cases added' },
  ]
  return (
    <div className="flex h-full w-full flex-col justify-center gap-3 p-5 md:p-8">
      {steps.map((st, i) => (
        <motion.div
          key={i}
          className={cn(
            'max-w-[88%] rounded-2xl border px-4 py-3 text-[13px] leading-snug',
            st.who === 'me' ? 'self-start border-line bg-white/[0.03]' : 'self-end border-pass/25 bg-pass/[0.06]',
          )}
          animate={{ x: active ? (st.who === 'me' ? 6 : -6) : 0 }}
          transition={{ delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 }}
        >
          <p className="mb-1 font-mono text-[10px] tracking-wider text-dim uppercase">
            {st.who === 'me' ? 'QA thinking' : 'AI assist'}
          </p>
          {st.text}
        </motion.div>
      ))}
      <p className="mt-2 text-center font-mono text-[10.5px] text-dim">illustrative · human review is always the last step</p>
    </div>
  )
}

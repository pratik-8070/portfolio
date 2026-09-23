import { AnimatePresence, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { cn } from '../utils/cn'
import { usePrefersReducedMotion } from '../utils/hooks'
import { Bug, Check } from './Icons'

type Status = 'queued' | 'running' | 'pass' | 'fail'

type TestDef = { name: string; meta: string; target: string; ms: number; flaky?: boolean }

const TESTS: TestDef[] = [
  { name: 'Login Test', meta: 'auth.spec.ts', target: 'chromium', ms: 820 },
  { name: 'API Response Validation', meta: 'GET /api/orders → 200', target: 'api', ms: 640 },
  { name: 'Checkout Flow', meta: 'checkout.spec.ts', target: 'webkit', ms: 900, flaky: true },
  { name: 'Mobile Test', meta: 'cart.e2e.js', target: 'android', ms: 980 },
  { name: 'Regression Suite', meta: '@regression', target: 'ci', ms: 1100 },
]

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

type RunState = { statuses: Status[]; retried: boolean[]; bug: boolean; done: boolean; elapsed: number }

const initial = (): RunState => ({
  statuses: TESTS.map(() => 'queued'),
  retried: TESTS.map(() => false),
  bug: false,
  done: false,
  elapsed: 0,
})

const finalState = (): RunState => ({
  statuses: TESTS.map(() => 'pass'),
  retried: TESTS.map((t) => !!t.flaky),
  bug: false,
  done: true,
  elapsed: TESTS.reduce((a, t) => a + t.ms, 0) + 700,
})

/**
 * Hero centrepiece: a stylised test runner. The tests run in turn, one of them
 * surfaces a bug, the bug is patched and retried, and the suite ends green.
 */
export function TestRunner() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { margin: '-10% 0px' })
  const reduced = usePrefersReducedMotion()
  const [state, setState] = useState<RunState>(reduced ? finalState : initial)

  useEffect(() => {
    if (reduced) {
      setState(finalState())
      return
    }
    if (!inView) return
    let cancelled = false
    const set = (fn: (s: RunState) => RunState) => !cancelled && setState(fn)
    const setStatus = (i: number, st: Status) =>
      set((s) => ({ ...s, statuses: s.statuses.map((v, j) => (j === i ? st : v)) }))

    const run = async () => {
      while (!cancelled) {
        set(() => initial())
        await sleep(700)
        for (let i = 0; i < TESTS.length && !cancelled; i++) {
          const t = TESTS[i]
          setStatus(i, 'running')
          await sleep(t.ms)
          if (t.flaky) {
            setStatus(i, 'fail')
            set((s) => ({ ...s, bug: true }))
            await sleep(2400)
            set((s) => ({ ...s, bug: false, retried: s.retried.map((v, j) => (j === i ? true : v)) }))
            setStatus(i, 'running')
            await sleep(700)
          }
          setStatus(i, 'pass')
          set((s) => ({ ...s, elapsed: s.elapsed + t.ms + (t.flaky ? 700 : 0) }))
          await sleep(160)
        }
        set((s) => ({ ...s, done: true }))
        await sleep(4200)
      }
    }
    run()
    return () => {
      cancelled = true
    }
  }, [inView, reduced])

  const passed = state.statuses.filter((s) => s === 'pass').length
  const failed = state.statuses.filter((s) => s === 'fail').length

  return (
    <div ref={ref} className="relative">
      {/* ambient glow reacts to run state */}
      <div
        aria-hidden
        className={cn(
          'absolute -inset-10 -z-10 rounded-[48px] opacity-60 blur-3xl transition-colors duration-700',
          state.bug ? 'bg-bug/20' : state.done ? 'bg-pass/15' : 'bg-white/[0.04]',
        )}
      />

      <div
        className="glass relative overflow-hidden rounded-2xl shadow-[0_40px_120px_-40px_rgba(0,0,0,0.9)]"
        role="img"
        aria-label="Animated test runner: Login Test, API Response Validation, Checkout Flow, Mobile Test and Regression Suite run in turn. Checkout Flow finds a bug, is fixed and retried, and all tests pass."
      >
        {/* title bar */}
        <div className="flex items-center justify-between border-b border-line px-4 py-3">
          <div className="flex items-center gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          </div>
          <p className="font-mono text-[11px] text-muted">regression.spec.ts</p>
          <span
            className={cn(
              'rounded-full px-2 py-0.5 font-mono text-[10px] font-medium transition-colors',
              state.done ? 'bg-pass-soft text-pass' : state.bug ? 'bg-bug-soft text-bug' : 'bg-white/5 text-muted',
            )}
          >
            {state.done ? 'PASSED' : state.bug ? 'FAILING' : 'RUNNING'}
          </span>
        </div>

        {/* command */}
        <div className="border-b border-line px-4 py-3 font-mono text-[12px] text-muted">
          <span className="text-pass">❯</span> npx playwright test --project=all{' '}
          {!state.done && <span className="inline-block h-3.5 w-1.5 translate-y-0.5 animate-blink bg-fg/70" />}
        </div>

        {/* tests */}
        <ul className="divide-y divide-line">
          {TESTS.map((t, i) => (
            <TestRow key={t.name} test={t} status={state.statuses[i]} retried={state.retried[i]} />
          ))}
        </ul>

        {/* progress + summary */}
        <div className="border-t border-line px-4 pt-3 pb-4">
          <div className="mb-3 flex gap-1" aria-hidden>
            {state.statuses.map((s, i) => (
              <div key={i} className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                <motion.div
                  className={cn('h-full rounded-full', s === 'fail' ? 'bg-bug' : 'bg-pass')}
                  initial={false}
                  animate={{ width: s === 'queued' ? '0%' : s === 'running' ? '55%' : '100%' }}
                  transition={{ duration: s === 'running' ? TESTS[i].ms / 1000 : 0.25, ease: 'easeOut' }}
                />
              </div>
            ))}
          </div>
          <div className="flex h-7 items-center justify-between font-mono text-[12px]">
            <AnimatePresence mode="wait">
              {state.done ? (
                <motion.p
                  key="done"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-sm font-medium text-pass"
                >
                  <Check size={16} /> All tests passed.
                </motion.p>
              ) : (
                <motion.p key="running" exit={{ opacity: 0 }} className="text-muted">
                  <span className="text-pass">{passed} passed</span>
                  {failed > 0 && <span className="text-bug"> · {failed} failed</span>}
                  <span className="text-dim"> · {TESTS.length - passed - failed} pending</span>
                </motion.p>
              )}
            </AnimatePresence>
            <span className="text-dim tabular-nums">{(state.elapsed / 1000).toFixed(1)}s</span>
          </div>
        </div>
      </div>

      {/* bug found callout */}
      <AnimatePresence>
        {state.bug && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: -2 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ type: 'spring', stiffness: 320, damping: 24 }}
            className="absolute -bottom-6 left-3 z-10 w-[min(290px,85%)] rounded-xl border border-bug/40 bg-ink-2/95 p-3.5 shadow-[0_20px_60px_-10px_rgba(255,92,77,0.35)] backdrop-blur-xl sm:-left-8 md:-bottom-10"
            aria-hidden
          >
            <p className="mb-2 flex items-center gap-2 font-mono text-[11px] font-medium tracking-wider text-bug">
              <Bug size={14} /> BUG FOUND
            </p>
            <p className="font-mono text-[11px] leading-relaxed text-muted">
              expect(<span className="text-fg">cartTotal</span>).toBe(<span className="text-pass">59.97</span>)
              <br />
              received: <span className="text-bug">59.970000001</span>
            </p>
            <p className="mt-2 font-mono text-[10px] text-dim">→ logged · patched · retrying…</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function TestRow({ test, status, retried }: { test: TestDef; status: Status; retried: boolean }) {
  return (
    <li
      className={cn(
        'relative flex items-center gap-3 px-4 py-3 transition-colors duration-300',
        status === 'fail' && 'bg-bug/[0.06]',
        status === 'running' && 'bg-white/[0.025]',
      )}
    >
      <StatusIcon status={status} />
      <div className="min-w-0 flex-1">
        <p
          className={cn(
            'truncate text-[14px] tracking-tight transition-colors',
            status === 'queued' ? 'text-dim' : 'text-fg',
          )}
        >
          {test.name}
        </p>
        <p className="truncate font-mono text-[10.5px] text-dim">
          {test.meta}
          {retried && status !== 'fail' && <span className="text-info"> · retry #1</span>}
        </p>
      </div>
      <span className="hidden rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim sm:inline">
        {test.target}
      </span>
      <StatusLabel status={status} />
    </li>
  )
}

function StatusIcon({ status }: { status: Status }) {
  return (
    <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {status === 'pass' && (
          <motion.span
            key="p"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-pass text-ink"
          >
            <Check size={12} />
          </motion.span>
        )}
        {status === 'fail' && (
          <motion.span
            key="f"
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.25, 1] }}
            exit={{ scale: 0 }}
            className="flex h-5 w-5 items-center justify-center rounded-full bg-bug font-mono text-[11px] font-bold text-ink"
          >
            ✕
          </motion.span>
        )}
        {status === 'running' && (
          <motion.span
            key="r"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ rotate: { repeat: Infinity, duration: 0.8, ease: 'linear' } }}
            className="h-4 w-4 rounded-full border-2 border-white/15 border-t-pass"
          />
        )}
        {status === 'queued' && (
          <motion.span key="q" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-4 w-4 rounded-full border border-dashed border-white/20" />
        )}
      </AnimatePresence>
    </span>
  )
}

function StatusLabel({ status }: { status: Status }) {
  const map: Record<Status, { text: string; cls: string }> = {
    queued: { text: 'QUEUED', cls: 'text-dim' },
    running: { text: 'RUN', cls: 'text-fg' },
    pass: { text: 'PASS', cls: 'text-pass' },
    fail: { text: 'FAIL', cls: 'text-bug' },
  }
  const { text, cls } = map[status]
  return <span className={cn('w-12 text-right font-mono text-[10.5px] font-medium tracking-wider', cls)}>{text}</span>
}

import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const PROJECTS = ['AI Test Case Generation Agent', 'Slack → Jira Bug Reporting Tool', 'Playwright E‑Commerce Automation Framework']

test.describe('portfolio', () => {
  test('home page loads with name, role and no console errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (e) => errors.push(e.message))
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    await page.goto('/')
    await expect(page).toHaveTitle(/Pratik Lal Vishwakarma \| QA Automation Engineer/)
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    expect(errors).toEqual([])
  })

  test('Work section lists the featured projects in order', async ({ page }) => {
    await page.goto('/')
    const work = page.locator('#work')
    await work.scrollIntoViewIfNeeded()
    for (const title of PROJECTS) {
      await expect(work.getByRole('button', { name: `Inspect project: ${title}` })).toBeAttached()
    }
    const labels = await work.getByRole('button', { name: /^Inspect project:/ }).evaluateAll((els) =>
      els.map((e) => e.getAttribute('aria-label')),
    )
    expect(labels).toEqual(PROJECTS.map((t) => `Inspect project: ${t}`))
  })

  for (const title of PROJECTS) {
    // Keyboard path: desktop cards are stacked sticky panels, so this also proves each one is reachable without a mouse.
    test(`project details open and close: ${title}`, async ({ page }) => {
      await page.goto('/')
      const inspect = page.getByRole('button', { name: `Inspect project: ${title}` })
      await inspect.focus()
      await inspect.press('Enter')
      const dialog = page.getByRole('dialog')
      await expect(dialog).toBeVisible()
      await expect(dialog.getByRole('heading', { name: title })).toBeVisible()
      await dialog.getByRole('button', { name: 'Close project details' }).click()
      await expect(dialog).toBeHidden()
    })
  }

  test('project links point to real pages', async ({ page, request }) => {
    await page.goto('/')
    const hrefs = await page
      .locator('#work a[href^="http"]')
      .evaluateAll((els) => [...new Set(els.map((e) => (e as HTMLAnchorElement).href))])
    expect(hrefs.length).toBeGreaterThan(0)
    for (const href of hrefs) {
      const res = await request.get(href, { maxRedirects: 5 })
      expect(res.status(), href).toBeLessThan(400)
    }
  })

  test('resume downloads as a PDF', async ({ page, request }) => {
    await page.goto('/')
    const href = await page.locator('a[href$="resume.pdf"]').first().getAttribute('href')
    const res = await request.get(href!)
    expect(res.ok()).toBeTruthy()
    expect(res.headers()['content-type']).toContain('pdf')
  })

  test('no serious accessibility violations', async ({ page }) => {
    await page.goto('/')
    // Scroll-reveal words fade in as you scroll; their plain-text copy for screen readers is checked instead.
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).exclude('[data-scroll-reveal]').analyze()
    const serious = results.violations.filter((v) => v.impact === 'critical' || v.impact === 'serious')
    expect(serious.map((v) => `${v.id}: ${v.help} (${v.nodes.length})`)).toEqual([])
  })
})

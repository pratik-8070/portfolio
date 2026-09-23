import Lenis from 'lenis'

let lenis: Lenis | null = null

export function initSmoothScroll() {
  if (typeof window === 'undefined') return () => {}
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  lenis = new Lenis({ duration: 1.1, smoothWheel: true })
  let frame = 0
  const raf = (time: number) => {
    lenis?.raf(time)
    frame = requestAnimationFrame(raf)
  }
  frame = requestAnimationFrame(raf)

  return () => {
    cancelAnimationFrame(frame)
    lenis?.destroy()
    lenis = null
  }
}

export function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  if (lenis) {
    // Lenis honours the html scroll-padding-top (nav height), so no extra offset
    lenis.scrollTo(el)
  } else {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  // Move focus for keyboard / screen-reader users without jumping the scroll
  el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

export function lockScroll(locked: boolean) {
  if (lenis) {
    if (locked) lenis.stop()
    else lenis.start()
  }
  document.documentElement.style.overflow = locked ? 'hidden' : ''
}

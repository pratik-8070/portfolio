import { MotionConfig } from 'framer-motion'
import { useEffect } from 'react'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Footer'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { Home } from './pages/Home'
import { initSmoothScroll } from './utils/smoothScroll'

export default function App() {
  useEffect(() => initSmoothScroll(), [])

  return (
    <MotionConfig reducedMotion="user">
      <div className="grain">
        <a
          href="#main"
          className="fixed top-3 left-3 z-[110] -translate-y-20 rounded-full bg-pass px-4 py-2 text-sm font-medium text-ink transition-transform focus:translate-y-0"
        >
          Skip to content
        </a>
        <Preloader />
        <Cursor />
        <Navbar />
        <main id="main">
          <Home />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}

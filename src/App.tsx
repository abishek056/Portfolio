import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Home } from './components/sections/Home'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Contact } from './components/sections/Contact'
import { LoadingScreen } from './components/ui/LoadingScreen'
import { SpiderWebBackground } from './components/ui/SpiderWebBackground'

/** Scroll-triggered fade+slide-up wrapper for each major section */
const SectionReveal: React.FC<{ children: React.ReactNode; delay?: number }> = ({
  children,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#07080e] text-neutral-100 flex flex-col selection:bg-indigo-500/40 selection:text-white">
      {/* Global Unified Spider-Web Constellation Background */}
      <SpiderWebBackground />

      {/* Smooth Loading Screen */}
      <LoadingScreen />

      <Navbar />

      <main className="relative grow z-10">
        {/* Home hero section */}
        <Home />

        <SectionReveal>
          <About />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <Projects />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <Skills />
        </SectionReveal>

        <SectionReveal delay={0.05}>
          <Contact />
        </SectionReveal>
      </main>

      <Footer />
    </div>
  )
}

export default App


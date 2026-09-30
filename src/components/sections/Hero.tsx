import React, { Suspense } from 'react'
import { motion, type Variants } from 'framer-motion'
import { ArrowRight, Send, Sparkles, Terminal, ChevronDown } from 'lucide-react'
import { PERSONAL_INFO } from '../../data/portfolio'
import { HeroScene } from '../3d/HeroScene'

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
}

const techHighlights = [
  'React 19',
  'Laravel 13',
  'TypeScript',
  'Three.js / 3D',
  'Tailwind CSS',
  'Real-Time Systems',
]

export const Hero: React.FC = () => {
  return (
    <section
      id="hero"
      className="relative min-h-screen min-h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[#07080d] pt-20 pb-16 lg:py-0"
    >
      {/* Target anchor for navbar links targeting #home */}
      <span id="home" className="absolute -top-24" aria-hidden="true" />

      {/* Cyberpunk / Deep Space Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Ambient radial gradients */}
        <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-purple-600/15 blur-[130px]" />
        <div className="absolute -bottom-20 left-1/3 w-[550px] h-[400px] rounded-full bg-cyan-600/10 blur-[140px]" />

        {/* Subtle Cyber Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e8112_1px,transparent_1px),linear-gradient(to_bottom,#312e8112_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center min-h-[calc(100vh-6rem)] lg:min-h-0 py-8">
          {/* Left Column: Text & Content with Framer Motion Entrance */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-6 xl:col-span-7 space-y-6 text-left"
          >
            {/* Status Pill Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.15)] group hover:border-indigo-400/50 transition-colors">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                </span>
                <span className="text-xs font-medium tracking-wide text-neutral-300">
                  {PERSONAL_INFO.availableForHire ? 'Available for new opportunities' : 'Building cutting-edge tech'}
                </span>
              </div>
            </motion.div>

            {/* Greeting & Name */}
            <motion.div variants={itemVariants} className="space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs sm:text-sm tracking-wider uppercase">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Hello world, I'm</span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08]">
                {PERSONAL_INFO.name}
              </h1>

              {/* Title with futuristic gradient */}
              <div className="pt-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-neutral-200">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
                    {PERSONAL_INFO.title}
                  </span>
                </h2>
              </div>
            </motion.div>

            {/* Short Bio */}
            <motion.div variants={itemVariants}>
              <p className="text-base sm:text-lg text-neutral-300/90 max-w-xl leading-relaxed font-normal">
                {PERSONAL_INFO.shortBio || PERSONAL_INFO.bio}
              </p>
            </motion.div>

            {/* Tech Badges / Highlights */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-2 pt-1">
              {techHighlights.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md text-xs font-mono text-neutral-300 bg-neutral-900/70 border border-neutral-800 hover:border-neutral-700 hover:text-indigo-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            {/* CTA Buttons & Social Links */}
            <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-4 pt-3">
              {/* Primary CTA: View Projects */}
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-xl font-medium text-sm text-white overflow-hidden bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 shadow-[0_0_25px_rgba(99,102,241,0.35)] hover:shadow-[0_0_35px_rgba(99,102,241,0.55)] transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-200 group-hover:rotate-12 transition-transform duration-300" />
                  <span>View Projects</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.a>

              {/* Secondary CTA: Contact */}
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-700/80 hover:border-indigo-400/60 shadow-lg backdrop-blur-md transition-all duration-300"
              >
                <Send className="w-4 h-4 text-indigo-400" />
                <span>Contact Me</span>
              </motion.a>

              {/* Social Icon Links */}
              <div className="flex items-center gap-2 sm:pl-2">
                <motion.a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                  </svg>
                </motion.a>

                <motion.a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors shadow-sm"
                >
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive 3D Scene with React Three Fiber + Drei */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 xl:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[600px] flex items-center justify-center"
          >
            {/* Futuristic Backdrop Frame / Glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 backdrop-blur-[2px] shadow-[0_0_50px_rgba(99,102,241,0.1)] overflow-hidden">
              {/* Corner Cyber Accents */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-purple-400/60" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-indigo-400/60" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60" />

              {/* Top Bar HUD detail */}
              <div className="absolute top-3 inset-x-8 flex items-center justify-between text-[11px] font-mono text-neutral-400 pointer-events-none select-none">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                  R3F ENGINE // ACTIVE
                </span>
                <span className="text-neutral-400">60 FPS // WebGL</span>
              </div>
            </div>

            {/* 3D Canvas Scene */}
            <Suspense
              fallback={
                <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                  <span className="text-xs font-mono text-neutral-400">Initializing 3D Core...</span>
                </div>
              }
            >
              <HeroScene />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Floating Bottom Scroll Hint */}
      <motion.a
        href="#about"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="hidden sm:flex absolute bottom-5 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-neutral-400 hover:text-indigo-400 transition-colors z-20 group"
        aria-label="Scroll to about section"
      >
        <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-400 group-hover:text-indigo-300 transition-colors">
          Scroll To Explore
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-indigo-400/80" />
        </motion.div>
      </motion.a>
    </section>
  )
}

export { Hero as Home }
export default Hero

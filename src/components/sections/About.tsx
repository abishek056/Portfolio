import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Sparkles,
  Server,
  Layers,
  Zap,
  Coffee,
  ArrowRight,
  MapPin,
  Code2,
  Terminal,
  HeartHandshake,
} from 'lucide-react'
import aboutImg from '../../assets/image/about/about.jpg'
import { PERSONAL_INFO } from '../../data/portfolio'
import { AboutBackground3D } from './about/AboutBackground3D'

export const About: React.FC = () => {
  // 3D Card tilt motion hooks for the profile card
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 22, stiffness: 200, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])
  const glareX = useTransform(smoothX, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(smoothY, [-0.5, 0.5], [20, 80])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  // Key strengths / What I do - concise, high-impact capabilities
  const keyStrengths = [
    {
      title: 'Full-Stack Architecture',
      description: 'Resilient REST APIs, database schemas, and secure authentication in Laravel 13 & Django 6.',
      icon: Server,
      accent: 'indigo',
      badge: 'Laravel & Django',
      borderGlow: 'hover:border-indigo-500/50 hover:shadow-[0_0_24px_rgba(99,102,241,0.18)]',
      iconBox: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    },
    {
      title: 'Modern UI & 3D Web UX',
      description: 'Fluid, responsive digital interfaces crafted with React 19, TypeScript, Tailwind CSS & Three.js.',
      icon: Layers,
      accent: 'cyan',
      badge: 'React 19 & Three.js',
      borderGlow: 'hover:border-cyan-500/50 hover:shadow-[0_0_24px_rgba(56,189,248,0.18)]',
      iconBox: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30',
    },
    {
      title: 'Real-Time Systems & Optimization',
      description: 'Bidirectional WebSockets with Laravel Reverb, live status pipelines, and fast query execution.',
      icon: Zap,
      accent: 'purple',
      badge: 'WebSockets & Pipelines',
      borderGlow: 'hover:border-purple-500/50 hover:shadow-[0_0_24px_rgba(168,85,247,0.18)]',
      iconBox: 'bg-purple-500/10 text-purple-400 border-purple-500/30',
    },
  ]

  const personalInterests = [
    { label: 'Specialty Coffee', icon: '☕' },
    { label: 'UI Micro-Interactions', icon: '✨' },
    { label: 'Tech Exploration', icon: '🚀' },
    { label: 'Problem Solving', icon: '🧩' },
  ]

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 border-t border-neutral-800/80 bg-[#07080e] overflow-hidden"
    >
      {/* Light 3D Floating Geometric Shapes & Soft Particle Dust */}
      <AboutBackground3D />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header - Clean, Short & Focused */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.12)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] font-mono font-medium tracking-wider text-indigo-300 uppercase">
              About // Snapshot
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Crafting scalable systems &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
              modern digital experiences
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm sm:text-base text-neutral-400 max-w-xl mx-auto font-normal"
          >
            A quick glimpse into who I am, what I build, and how I engineer reliable software.
          </motion.p>
        </div>

        {/* Modern Two-Column Card Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* ── LEFT COLUMN (5 Cols): 3D Persona Card + Personal Touch ── */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            {/* 3D Tilt Identity Card */}
            <div className="w-full" style={{ perspective: 1000 }}>
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl border border-neutral-800/90 bg-neutral-900/80 backdrop-blur-xl p-5 shadow-2xl transition-all duration-300 hover:border-indigo-500/40 group overflow-hidden"
              >
                {/* Ambient Top Glow Line */}
                <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/60 to-transparent pointer-events-none" />

                {/* Dynamic Specular Sheen on Hover */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-2xl"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: useTransform(
                      [glareX, glareY],
                      ([gx, gy]) =>
                        `radial-gradient(circle 260px at ${gx}% ${gy}%, rgba(255,255,255,0.08), transparent 70%)`
                    ),
                  }}
                />

                {/* Top Bar: Availability & Location Badges */}
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800/60">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[11px] font-mono font-medium text-emerald-300">
                      Available for Opportunities
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-400">
                    <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{PERSONAL_INFO.location || 'Nepal'}</span>
                  </div>
                </div>

                {/* Visual Portrait Frame */}
                <div className="relative mt-4 rounded-xl overflow-hidden aspect-[4/3] bg-neutral-950 border border-neutral-800/80 group-hover:border-indigo-500/30 transition-colors">
                  <img
                    src={aboutImg}
                    alt={PERSONAL_INFO.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top filter brightness-[0.96] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />

                  {/* Corner Accent Ornaments */}
                  <div className="absolute top-2.5 left-2.5 w-2 h-2 border-t border-l border-indigo-400/60 pointer-events-none" />
                  <div className="absolute bottom-2.5 right-2.5 w-2 h-2 border-b border-r border-indigo-400/60 pointer-events-none" />
                </div>

                {/* Persona Footnote */}
                <div className="pt-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs font-mono text-indigo-300/80">{PERSONAL_INFO.title}</p>
                  </div>

                  {/* Quick Tech Tag */}
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-800/80 border border-neutral-700/60 text-[11px] font-mono text-neutral-300">
                    <Code2 className="w-3 h-3 text-indigo-400" />
                    <span>Full-Stack</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Personal Touch Card ("Beyond The Code") */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              whileHover={{ y: -3 }}
              className="p-5 rounded-2xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-xl shadow-lg hover:border-purple-500/40 hover:bg-neutral-900/80 transition-all duration-300 group"
            >
              <div className="flex items-center gap-2.5 mb-2.5">
                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform duration-300">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white tracking-tight">Beyond The Code</h4>
                  <span className="text-[10px] font-mono text-purple-400/80 uppercase tracking-wider block">
                    Personal Touch
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-neutral-300/90 leading-relaxed mb-3">
                Outside of software architecture, I'm driven by continuous curiosity—exploring new tech stacks, refining UI micro-interactions, and brewing good coffee while planning the next build.
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {personalInterests.map((item) => (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-mono text-neutral-300 bg-neutral-800/70 border border-neutral-700/50 group-hover:border-neutral-600 transition-colors"
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN (7 Cols): Short Intro + Key Strengths + CTAs ── */}
          <div className="lg:col-span-7 flex flex-col gap-5">
            {/* Professional Introduction Card (Concise 3-4 lines max) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -2 }}
              className="p-6 rounded-2xl border border-neutral-800/90 bg-neutral-900/70 backdrop-blur-xl shadow-xl hover:border-indigo-500/40 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle accent highlight */}
              <div className="absolute top-0 left-0 w-24 h-[2px] bg-gradient-to-r from-indigo-500 to-sky-400" />

              <div className="flex items-center gap-2 mb-3 text-indigo-400 font-mono text-xs uppercase tracking-wider font-semibold">
                <Terminal className="w-4 h-4" />
                <span>Professional Overview</span>
              </div>

              {/* 3-4 Line Professional Introduction */}
              <p className="text-sm sm:text-base text-neutral-200 leading-relaxed">
                I'm a full-stack software engineer dedicated to architecting resilient backends and intuitive, high-performance web applications. Working seamlessly across <span className="text-white font-medium">Laravel 13</span>, <span className="text-white font-medium">Django 6</span>, and modern <span className="text-white font-medium">React 19</span> ecosystems, I turn complex business challenges into clean, maintainable, and scalable digital products.
              </p>

              {/* Quick Philosophy Pills */}
              <div className="mt-4 pt-4 border-t border-neutral-800/70 flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-mono text-neutral-400">Core Principles:</span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                  Clean Architecture
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  Fluid UX
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-purple-500/10 text-purple-300 border border-purple-500/20">
                  Production Reliability
                </span>
              </div>
            </motion.div>

            {/* Key Strengths / What I Do Cards */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-semibold flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Key Strengths & What I Do</span>
                </span>
                <span className="text-[11px] font-mono text-neutral-500">Core Capabilities</span>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {keyStrengths.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.45, delay: 0.15 + idx * 0.08 }}
                      whileHover={{ y: -3, scale: 1.008 }}
                      className={`p-4 sm:p-4.5 rounded-xl border border-neutral-800/80 bg-neutral-900/60 backdrop-blur-md ${item.borderGlow} transition-all duration-300 group`}
                    >
                      <div className="flex items-start gap-3.5">
                        <div
                          className={`p-2.5 rounded-xl border ${item.iconBox} shrink-0 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                        </div>

                        <div className="space-y-1 flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <h4 className="text-sm sm:text-base font-semibold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                              {item.title}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800/80 border border-neutral-700/60 text-neutral-400 shrink-0 hidden sm:inline-block">
                              {item.badge}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Bottom Actions - Aligned with Hero button aesthetics */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-3"
            >
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.5)] transition-all duration-300"
              >
                <span>View Featured Projects</span>
                <ArrowRight className="w-4 h-4" />
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 backdrop-blur-md transition-all duration-200"
              >
                <HeartHandshake className="w-4 h-4 text-indigo-400" />
                <span>Get In Touch</span>
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

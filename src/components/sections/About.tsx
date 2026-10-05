import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Sparkles,
  Server,
  Layers,
  Activity,
  ShieldCheck,
  ArrowUpRight,
  Code2,
  Terminal,
  MapPin,
  CheckCircle2,
} from 'lucide-react'
import aboutImg from '../../assets/image/about/about.jpg'
import { PERSONAL_INFO } from '../../data/portfolio'
import { AboutBackground3D } from './about/AboutBackground3D'

export const About: React.FC = () => {
  // 3D Card tilt motion hooks for profile portrait
  const portraitRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 20, stiffness: 220, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12])
  const glareX = useTransform(smoothX, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(smoothY, [-0.5, 0.5], [20, 80])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(pointer: coarse)').matches) return
    if (!portraitRef.current) return
    const rect = portraitRef.current.getBoundingClientRect()
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

  const pillars = [
    {
      title: 'Full-Stack Architecture',
      description:
        'Resilient backend services, relational schema design, and secure authentication in Laravel 13 and Django 6.',
      icon: Server,
      color: 'from-indigo-500/20 to-purple-500/20',
      border: 'border-indigo-500/30',
      iconColor: 'text-indigo-400',
    },
    {
      title: 'Modern UI & 3D Web UX',
      description:
        'Fluid interfaces built with React 19, TypeScript, Tailwind CSS, Framer Motion, and Three.js visual elements.',
      icon: Layers,
      color: 'from-cyan-500/20 to-blue-500/20',
      border: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
    {
      title: 'Real-Time & Event Pipelines',
      description:
        'Bidirectional WebSockets with Laravel Reverb, real-time status dispatching, and Mapbox GL geographic tracking.',
      icon: Activity,
      color: 'from-emerald-500/20 to-teal-500/20',
      border: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
    },
    {
      title: 'Clean Code & Reliability',
      description:
        'Modular architecture, defensive validation, RESTful API standards, and database query optimizations.',
      icon: ShieldCheck,
      color: 'from-purple-500/20 to-pink-500/20',
      border: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
  ]

  const metrics = [
    { label: 'Featured Projects', value: '5+' },
    { label: 'Full-Stack Ecosystem', value: 'Laravel & Django' },
    { label: 'Frontend Stack', value: 'React 19 & Vite' },
    { label: 'Real-Time Sync', value: 'WebSockets' },
  ]

  return (
    <section
      id="about"
      className="relative py-24 sm:py-32 border-t border-neutral-800/80 bg-[#08090f] overflow-hidden"
    >
      {/* Light 3D Floating Geometric Shapes & Soft Particles */}
      <AboutBackground3D />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.12)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-mono font-medium tracking-wider text-indigo-300 uppercase">
              About Me // Profile & Philosophy
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Passionate{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
              {PERSONAL_INFO.title}
            </span>{' '}
            & Systems Craftsman
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            Bridging scalable, secure backend systems with fluid, interactive web experiences and modern digital craftsmanship.
          </motion.p>
        </div>

        {/* Main Grid: 3D Portrait Column + Professional Intro Column */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Interactive 3D Tilt Portrait Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm" style={{ perspective: 1200 }}>
              {/* Floating 3D Badge 1: Top-Left */}
              <motion.div
                animate={{ y: [-4, 6, -4] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-4 -left-4 sm:-left-6 z-30 px-3 py-1.5 rounded-xl bg-neutral-900/90 border border-indigo-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 text-xs font-medium text-indigo-200"
              >
                <Code2 className="w-3.5 h-3.5 text-indigo-400" />
                <span>Laravel & Django</span>
              </motion.div>

              {/* Floating 3D Badge 2: Bottom-Right */}
              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                className="absolute -bottom-4 -right-3 sm:-right-5 z-30 px-3 py-1.5 rounded-xl bg-neutral-900/90 border border-cyan-500/40 backdrop-blur-md shadow-xl flex items-center gap-2 text-xs font-medium text-cyan-200"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>React 19 & 3D Web</span>
              </motion.div>

              {/* Ambient Glow behind Portrait */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-500/20 opacity-40 blur-2xl pointer-events-none" />

              {/* 3D Tilt Card Container */}
              <motion.div
                ref={portraitRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/90 p-3 shadow-2xl transition-colors duration-300 group"
              >
                {/* Specular Glare Sheen Overlay */}
                <motion.div
                  className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-2xl"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: useTransform(
                      [glareX, glareY],
                      ([gx, gy]) =>
                        `radial-gradient(circle 280px at ${gx}% ${gy}%, rgba(255,255,255,0.1), transparent 70%)`
                    ),
                  }}
                />

                {/* Portrait Photo Container */}
                <div className="relative rounded-xl overflow-hidden aspect-[4/5] bg-neutral-950 border border-neutral-800">
                  <img
                    src={aboutImg}
                    alt={PERSONAL_INFO.name}
                    loading="lazy"
                    className="w-full h-full object-cover object-top filter brightness-[0.97] contrast-[1.02] group-hover:scale-105 transition-transform duration-700 ease-out"
                  />

                  {/* Gradient Vignette at Bottom of Photo */}
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/20 to-transparent opacity-80" />

                  {/* Inside Portrait Footer Pill */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between p-2.5 rounded-lg bg-neutral-900/80 backdrop-blur-md border border-neutral-800/80 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="font-medium text-neutral-200">Available for Opportunities</span>
                    </div>
                    <span className="text-[11px] font-mono text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-indigo-400" />
                      Nepal
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Column: Professional Narrative & Pillars */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Hi, I'm {PERSONAL_INFO.name} — bridging full-stack systems with smooth, interactive user experiences.
              </h3>

              <p className="text-neutral-300 leading-relaxed text-sm sm:text-base">
                I specialize in end-to-end software engineering, from architecting scalable REST APIs and relational database models in <span className="text-white font-medium">Laravel</span> and <span className="text-white font-medium">Django</span> to building responsive, fluid interfaces with <span className="text-white font-medium">React 19</span>, <span className="text-white font-medium">TypeScript</span>, and <span className="text-white font-medium">Tailwind CSS</span>.
              </p>

              <p className="text-neutral-400 text-sm leading-relaxed">
                Whether deploying mission-critical platforms like <span className="text-indigo-300 font-medium">HealthHub</span> (with real-time ambulance tracking, hospital discovery, and OPD queues) or developing dynamic e-commerce portals, I prioritize clean architectural separation, rock-solid security, and refined visual aesthetics.
              </p>
            </motion.div>

            {/* Core Competency Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {pillars.map((pillar, i) => {
                const Icon = pillar.icon
                return (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    whileHover={{ y: -4 }}
                    className={`p-4 rounded-xl bg-neutral-900/70 border ${pillar.border} backdrop-blur-md hover:bg-neutral-900/90 transition-all duration-300 shadow-lg group`}
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className={`p-2 rounded-lg bg-neutral-800/80 border border-neutral-700/60 ${pillar.iconColor} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="text-sm font-semibold text-white group-hover:text-indigo-300 transition-colors">
                        {pillar.title}
                      </h4>
                    </div>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {pillar.description}
                    </p>
                  </motion.div>
                )
              })}
            </div>

            {/* Key Metrics / Highlights Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-4 rounded-xl bg-neutral-900/50 border border-neutral-800/80 backdrop-blur-md grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {metrics.map((m) => (
                <div key={m.label} className="text-left space-y-0.5">
                  <span className="text-xs text-neutral-400 font-mono block">{m.label}</span>
                  <span className="text-sm sm:text-base font-bold text-white tracking-tight">{m.value}</span>
                </div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Explore Featured Projects</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-neutral-300 hover:text-white bg-neutral-900/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all duration-200"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Get in Touch</span>
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Mail,
  CheckCircle2,
  Loader2,
  MapPin,
  Sparkles,
  ArrowUpRight,
  MessageSquare,
  Clock,
  Sparkle,
} from 'lucide-react'
import { PERSONAL_INFO } from '../../data/portfolio'

/* ─────────────────────────── Spider-Web / Particle Canvas ─────────────────────────── */
interface NodeParticle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

const SpiderWebCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let isVisible = true
    let width = 0
    let height = 0
    let particles: NodeParticle[] = []

    const colors = [
      'rgba(129, 140, 248, ', // Indigo
      'rgba(56, 189, 248, ',  // Sky / Cyan
      'rgba(192, 132, 252, ', // Purple
    ]

    const initParticles = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = container.clientWidth
      height = container.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      const count = width < 640 ? 22 : width < 1024 ? 34 : 44
      particles = []

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 1.4 + 1.1,
          color: colors[i % colors.length],
        })
      }
    }

    initParticles()

    const handleResize = () => {
      initParticles()
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)

    const maxDistance = 115
    const mouseMaxDistance = 140

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)
      const mouse = mouseRef.current

      // Update positions and draw spider-web connections
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]
        p1.x += p1.vx
        p1.y += p1.vy

        if (p1.x < 0) {
          p1.x = 0
          p1.vx *= -1
        } else if (p1.x > width) {
          p1.x = width
          p1.vx *= -1
        }
        if (p1.y < 0) {
          p1.y = 0
          p1.vy *= -1
        } else if (p1.y > height) {
          p1.y = height
          p1.vy *= -1
        }

        // Particle-to-particle spider-web lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`
            ctx.lineWidth = 0.75
            ctx.stroke()
          }
        }

        // Mouse interactive connection
        if (mouse.active) {
          const mdx = p1.x - mouse.x
          const mdy = p1.y - mouse.y
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy)

          if (mDist < mouseMaxDistance) {
            const mAlpha = (1 - mDist / mouseMaxDistance) * 0.35
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(168, 85, 247, ${mAlpha})`
            ctx.lineWidth = 0.95
            ctx.stroke()

            p1.x -= (mdx / mDist) * 0.1
            p1.y -= (mdy / mDist) * 0.1
          }
        }

        // Draw particle node
        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p1.color}0.85)`
        ctx.shadowColor = `${p1.color}0.6)`
        ctx.shadowBlur = 4
        ctx.fill()
        ctx.shadowBlur = 0
      }

      animationFrameId = requestAnimationFrame(render)
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    io.observe(container)

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full pointer-events-none" />
    </div>
  )
}

/* ─────────────────────────── Social Link Definitions ─────────────────────────── */
const SOCIALS = [
  {
    name: 'GitHub',
    handle: '@abishek056',
    href: PERSONAL_INFO.github,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
    badge: 'Code',
    accent: 'hover:border-neutral-500 hover:text-white hover:bg-neutral-800/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.12)]',
  },
  {
    name: 'LinkedIn',
    handle: 'Abishek Adhikari',
    href: PERSONAL_INFO.linkedin,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    badge: 'Network',
    accent: 'hover:border-sky-500/50 hover:text-sky-400 hover:bg-sky-500/10 hover:shadow-[0_0_15px_rgba(14,165,233,0.2)]',
  },
  {
    name: 'Facebook',
    handle: 'abishek.adhikari',
    href: PERSONAL_INFO.facebook,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    badge: 'Social',
    accent: 'hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/10 hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]',
  },
  {
    name: 'X (Twitter)',
    handle: '@abishek_dev',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    badge: 'Feed',
    accent: 'hover:border-neutral-400 hover:text-neutral-100 hover:bg-neutral-800/80 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]',
  },
]

/* ─────────────────────────── Main Contact Component ─────────────────────────── */
export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle')
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.name.trim() || !values.email.trim() || !values.message.trim()) return

    setFormState('loading')
    // Smooth simulated dispatch (ready for EmailJS, Formspree or custom API)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setFormState('success')
  }

  return (
    <section
      id="contact"
      className="relative min-h-[calc(100vh-4.5rem)] py-8 sm:py-12 lg:py-16 border-t border-neutral-800/70 bg-[#07080e] overflow-hidden flex flex-col justify-center"
    >
      {/* Spider-Web & Particle Canvas Background */}
      <SpiderWebCanvas />

      {/* Atmospheric Ambient Radial Glows */}
      <div className="absolute top-1/4 -left-32 w-80 h-80 rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full bg-purple-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e810a_1px,transparent_1px),linear-gradient(to_bottom,#312e810a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_50%,transparent_90%)] opacity-50 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        {/* Section Header: Compact & Impactful */}
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md mb-2 shadow-[0_0_16px_rgba(99,102,241,0.12)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-[11px] font-mono font-medium tracking-wider text-indigo-300 uppercase">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight"
          >
            Let&apos;s Work{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
              Together
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-sm text-neutral-400 mt-1.5 max-w-md mx-auto"
          >
            Have a project in mind, an opportunity, or a technical inquiry? Send a note or reach out directly.
          </motion.p>
        </div>

        {/* Balanced 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: CTA Info, Direct Contact, & Social Links (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col justify-between gap-4"
          >
            {/* Status & Availability Glass Card */}
            <div className="relative p-5 sm:p-6 rounded-2xl bg-[#0c0d18]/80 border border-neutral-800/80 backdrop-blur-xl shadow-xl space-y-4 overflow-hidden group">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

              {/* Status Row */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                {PERSONAL_INFO.availableForHire && (
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-400 tracking-wide uppercase">
                      Available for Hire
                    </span>
                  </div>
                )}
                <div className="inline-flex items-center gap-1.5 text-[11px] text-neutral-400">
                  <Clock className="w-3.5 h-3.5 text-neutral-500" />
                  <span>Replies within 24h</span>
                </div>
              </div>

              {/* CTA pitch */}
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Ready to turn ideas into reality?
                </h3>
                <p className="text-xs text-neutral-300 leading-relaxed">
                  Specialized in full-stack web applications, scalable architectures, and interactive digital experiences. Open for freelance, contract, or full-time roles.
                </p>
              </div>

              {/* Direct Email Card */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="p-3 rounded-xl bg-neutral-950/80 border border-neutral-800/90 flex items-center justify-between gap-2.5 hover:border-indigo-500/40 hover:bg-neutral-900/90 transition-all group cursor-pointer"
                title="Send email via mail client"
                aria-label="Send email"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Mail className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">Direct Email</p>
                    <p className="text-xs font-semibold text-white group-hover:text-indigo-300 transition-colors truncate">
                      {PERSONAL_INFO.email}
                    </p>
                  </div>
                </div>

                <div className="p-1.5 rounded-lg bg-indigo-600 group-hover:bg-indigo-500 text-white transition-all shadow-[0_0_12px_rgba(99,102,241,0.3)] shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </a>

              {/* Location indicator */}
              <div className="flex items-center gap-2 text-[11px] text-neutral-400 pt-0.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                <span>Based in {PERSONAL_INFO.location ?? 'Nepal'} · Remote worldwide</span>
              </div>
            </div>

            {/* Social Links Card */}
            <div className="relative p-4 sm:p-5 rounded-2xl bg-[#0c0d18]/80 border border-neutral-800/80 backdrop-blur-xl shadow-xl overflow-hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <Sparkle className="w-3.5 h-3.5 text-indigo-400" />
                  <span className="text-xs font-semibold text-white tracking-wide">Social Profiles</span>
                </div>
                <span className="text-[11px] text-neutral-400 font-mono">Connect & Follow</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {SOCIALS.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2, scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    aria-label={social.name}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl bg-neutral-950/70 border border-neutral-800/80 text-neutral-400 transition-all duration-200 cursor-pointer ${social.accent}`}
                  >
                    <div className="mb-1">{social.icon}</div>
                    <span className="text-[11px] font-medium text-neutral-300">{social.name}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean, Compact & Modern Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative p-5 sm:p-6 lg:p-7 rounded-2xl bg-[#0c0d18]/85 border border-neutral-800/80 backdrop-blur-xl shadow-2xl h-full flex flex-col justify-between overflow-hidden">
              {/* Subtle top border highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

              <div className="flex items-center justify-between border-b border-neutral-800/70 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">Send a Direct Message</h4>
                    <p className="text-[11px] text-neutral-400">Fill in the details below</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                  Quick Form
                </span>
              </div>

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="my-auto py-8 flex flex-col items-center justify-center text-center space-y-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_24px_rgba(16,185,129,0.25)]">
                      <CheckCircle2 className="w-7 h-7 text-emerald-400" />
                    </div>

                    <div className="space-y-1 max-w-xs">
                      <h4 className="text-lg font-bold text-white">Message Sent Successfully!</h4>
                      <p className="text-xs text-neutral-300">
                        Thank you for reaching out, <span className="text-indigo-300 font-medium">{values.name || 'friend'}</span>. I will review your message and reply promptly.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setFormState('idle')
                        setValues({ name: '', email: '', message: '' })
                      }}
                      className="mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 px-4 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 hover:border-indigo-500/40 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 my-auto">
                    {/* Name & Email 2-column on sm+ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className="block text-[11px] font-medium text-neutral-300"
                        >
                          Name <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={values.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-3 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-medium text-neutral-300"
                        >
                          Email <span className="text-indigo-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={values.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full px-3 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-1">
                      <label
                        htmlFor="message"
                        className="block text-[11px] font-medium text-neutral-300"
                      >
                        Message <span className="text-indigo-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={3}
                        value={values.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, goals, or inquiries..."
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/80 focus:ring-1 focus:ring-indigo-500/50 transition-colors resize-none"
                      />
                    </div>

                    {/* Call to action Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full py-2.5 sm:py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group"
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

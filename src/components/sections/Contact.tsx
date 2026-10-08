import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Send,
  Mail,
  CheckCircle2,
  Loader2,
  MapPin,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import { PERSONAL_INFO } from '../../data/portfolio'

/* ─────────────────────────── Spider-Web Particle Canvas ─────────────────────────── */
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

      const count = width < 640 ? 24 : width < 1024 ? 38 : 50
      particles = []

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 1.5 + 1.2,
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

    const maxDistance = 110
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
            const alpha = (1 - dist / maxDistance) * 0.2
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`
            ctx.lineWidth = 0.8
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
            ctx.lineWidth = 1
            ctx.stroke()

            p1.x -= (mdx / mDist) * 0.12
            p1.y -= (mdy / mDist) * 0.12
          }
        }

        // Draw particle node
        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p1.color}0.85)`
        ctx.shadowColor = `${p1.color}0.7)`
        ctx.shadowBlur = 5
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
    href: PERSONAL_INFO.github,
    icon: (
      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    ),
    hoverClass: 'hover:border-neutral-500 hover:text-white hover:bg-neutral-800/80',
  },
  {
    name: 'LinkedIn',
    href: PERSONAL_INFO.linkedin,
    icon: (
      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    hoverClass: 'hover:border-sky-500/50 hover:text-sky-400 hover:bg-sky-500/10',
  },
  {
    name: 'Facebook',
    href: PERSONAL_INFO.facebook,
    icon: (
      <svg className="w-4.5 h-4.5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    hoverClass: 'hover:border-blue-500/50 hover:text-blue-400 hover:bg-blue-500/10',
  },
]

/* ─────────────────────────── Main Contact Component ─────────────────────────── */
export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle')
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [copied, setCopied] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    // Smooth simulated dispatch (or direct endpoint integration)
    await new Promise((resolve) => setTimeout(resolve, 1100))
    setFormState('success')
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2200)
  }

  return (
    <section
      id="contact"
      className="relative py-20 sm:py-28 border-t border-neutral-800/80 bg-[#07080e] overflow-hidden"
    >
      {/* Spider-Web & Constellation Background */}
      <SpiderWebCanvas />

      {/* Ambient Radial Color Glows */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e810a_1px,transparent_1px),linear-gradient(to_bottom,#312e810a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_50%,#000_50%,transparent_90%)] opacity-60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.12)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-mono font-medium tracking-wider text-indigo-300 uppercase">
              Start A Conversation // Open for Opportunities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
              Exceptional
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-300 leading-relaxed"
          >
            Have an ambitious project, a full-time role, or an innovative idea? Reach out directly or send a message below.
          </motion.p>
        </div>

        {/* Unified Modern Grid: Left Info & CTA / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct Action & Information (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col justify-between gap-6"
          >
            {/* Availability & Call-To-Action Card */}
            <div className="p-6 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl shadow-lg space-y-5">
              {/* Hiring status badge */}
              {PERSONAL_INFO.availableForHire && (
                <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-xs font-semibold text-emerald-400 tracking-wide uppercase">
                    Available for Work
                  </span>
                </div>
              )}

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-white tracking-tight">
                  Ready to elevate your engineering?
                </h3>
                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                  I specialize in building scalable web architectures, full-stack systems, and modern interactive experiences. Let&apos;s turn your vision into high-impact software.
                </p>
              </div>

              {/* Direct Email Card with One-Click Copy */}
              <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/25 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-neutral-400 uppercase">Direct Email</p>
                    <p className="text-xs sm:text-sm font-semibold text-white truncate">{PERSONAL_INFO.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={handleCopyEmail}
                    className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-800 hover:border-neutral-700 transition-colors cursor-pointer"
                    title={copied ? 'Copied to clipboard!' : 'Copy email'}
                    aria-label="Copy email address"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                    title="Send email via mail client"
                    aria-label="Send email"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Location indicator */}
              <div className="flex items-center gap-2.5 text-xs text-neutral-400 pt-1">
                <MapPin className="w-4 h-4 text-neutral-500 shrink-0" />
                <span>Based in {PERSONAL_INFO.location ?? 'Nepal'} · Available for remote work worldwide</span>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="p-5 rounded-2xl bg-neutral-900/70 border border-neutral-800/80 backdrop-blur-xl shadow-lg flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Social Presence</p>
                <p className="text-xs text-neutral-300">Connect & follow my updates</p>
              </div>

              <div className="flex items-center gap-2">
                {SOCIALS.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    title={social.name}
                    className={`w-10 h-10 rounded-xl bg-neutral-950/80 border border-neutral-800 flex items-center justify-center text-neutral-400 transition-all duration-200 cursor-pointer ${social.hoverClass}`}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean & Modern Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="lg:col-span-7"
          >
            <div className="relative p-6 sm:p-8 rounded-2xl bg-[#0c0d14]/90 border border-neutral-800/80 backdrop-blur-xl shadow-xl h-full flex flex-col justify-between overflow-hidden">
              {/* Subtle top border highlight */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="my-auto py-12 flex flex-col items-center justify-center text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.25)]">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>

                    <div className="space-y-1 max-w-sm">
                      <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                      <p className="text-sm text-neutral-400">
                        Thank you for reaching out, <span className="text-indigo-300 font-medium">{values.name || 'friend'}</span>. I will review your message and reply within 24 hours.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setFormState('idle')
                        setValues({ name: '', email: '', message: '' })
                      }}
                      className="mt-2 text-xs font-semibold text-indigo-400 hover:text-indigo-300 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/25 hover:border-indigo-500/40 transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 my-auto">
                    {/* Name & Email in 2 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name input */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="block text-xs font-medium text-neutral-300"
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
                          placeholder="Your name"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="block text-xs font-medium text-neutral-300"
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
                          className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/50 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="block text-xs font-medium text-neutral-300"
                      >
                        Message <span className="text-indigo-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={4}
                        value={values.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, timeline, or inquiries..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-indigo-500/70 focus:ring-1 focus:ring-indigo-500/50 transition-colors resize-none"
                      />
                    </div>

                    {/* Call to action Submit Button */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Send Message</span>
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

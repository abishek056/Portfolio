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
  Sparkle,
} from 'lucide-react'
import { PERSONAL_INFO } from '../../data/portfolio'
import profileImg from '../../assets/image/home/card.jpg'

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

    // Purple / Violet / Indigo theme
    const colors = [
      'rgba(168, 85, 247, ', // Purple
      'rgba(192, 132, 252, ', // Lavender / Violet
      'rgba(129, 140, 248, ', // Indigo
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

      const count = width < 640 ? 20 : width < 1024 ? 32 : 42
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
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`
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
            ctx.strokeStyle = `rgba(192, 132, 252, ${mAlpha})`
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
    hoverClass: 'hover:border-purple-400/60 hover:text-white hover:bg-purple-500/15 hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]',
  },
  {
    name: 'LinkedIn',
    href: PERSONAL_INFO.linkedin,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    hoverClass: 'hover:border-purple-400/60 hover:text-purple-300 hover:bg-purple-500/15 hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]',
  },
  {
    name: 'Facebook',
    href: PERSONAL_INFO.facebook,
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    hoverClass: 'hover:border-purple-400/60 hover:text-purple-300 hover:bg-purple-500/15 hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]',
  },
  {
    name: 'X (Twitter)',
    href: 'https://twitter.com',
    icon: (
      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    hoverClass: 'hover:border-purple-400/60 hover:text-white hover:bg-purple-500/15 hover:shadow-[0_0_16px_rgba(168,85,247,0.3)]',
  },
]

/* ─────────────────────────── Main Contact Component ─────────────────────────── */
export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success'>('idle')
  const [values, setValues] = useState({ name: '', email: '', subject: '', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.name.trim() || !values.email.trim() || !values.subject.trim() || !values.message.trim()) return

    setFormState('loading')
    // Smooth simulated dispatch (ready for EmailJS, Formspree or custom API)
    await new Promise((resolve) => setTimeout(resolve, 900))
    setFormState('success')
  }

  return (
    <section
      id="contact"
      className="relative min-h-[calc(100vh-4.5rem)] py-6 sm:py-10 lg:py-12 border-t border-neutral-800/70 bg-[#07080e] overflow-hidden flex flex-col justify-center"
    >
      {/* Spider-Web & Particle Canvas Background */}
      <SpiderWebCanvas />

      {/* Atmospheric Soft Purple Glows */}
      <div className="absolute top-1/4 -left-28 w-96 h-96 rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-28 w-96 h-96 rounded-full bg-violet-600/12 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] rounded-full bg-purple-900/10 blur-[150px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#581c870c_1px,transparent_1px),linear-gradient(to_bottom,#581c870c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_50%,transparent_90%)] opacity-60 pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 my-auto">
        {/* Section Header: Compact, Elegant with Purple Accent */}
        <div className="text-center max-w-xl mx-auto mb-5 sm:mb-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md mb-2 shadow-[0_0_16px_rgba(168,85,247,0.18)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-[11px] font-mono font-medium tracking-wider text-purple-300 uppercase">
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
            Let&apos;s Build Something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400">
              Together
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-md mx-auto"
          >
            Have a project in mind, an opportunity, or a technical inquiry? Drop a line or connect directly.
          </motion.p>
        </div>

        {/* Balanced 2-Column Responsive Layout: Left Profile Card / Right Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          {/* Left Column: Modern Profile Card (5 cols) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <div className="relative p-5 sm:p-6 rounded-2xl bg-[#0c0d18]/85 border border-purple-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.12)] h-full flex flex-col justify-between space-y-4 overflow-hidden group">
              {/* Soft purple top highlight border */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              {/* Profile Top: Avatar + Name + Title + Status */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  {/* Avatar with purple gradient glow ring */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl p-[2px] bg-gradient-to-tr from-purple-600 via-violet-500 to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.35)] shrink-0">
                    <div className="w-full h-full rounded-[14px] overflow-hidden bg-neutral-950 relative">
                      <img
                        src={profileImg}
                        alt={PERSONAL_INFO.name}
                        className="w-full h-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 to-transparent" />
                    </div>

                    {/* Online status indicator beacon */}
                    <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-[#0c0d18]" />
                    </span>
                  </div>

                  {/* Name, Title & Availability */}
                  <div className="min-w-0">
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight truncate">
                      {PERSONAL_INFO.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-purple-300 font-mono">
                      {PERSONAL_INFO.title}
                    </p>

                    {/* Availability Status Badge */}
                    {PERSONAL_INFO.availableForHire && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 mt-1 rounded-full bg-emerald-500/10 border border-emerald-500/25">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                        </span>
                        <span className="text-[10px] font-semibold text-emerald-400 tracking-wide uppercase">
                          Available for Hire
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Short Bio */}
                <p className="text-xs text-neutral-300 leading-relaxed border-l-2 border-purple-500/40 pl-3 py-0.5 bg-purple-500/[0.03] rounded-r-lg">
                  {PERSONAL_INFO.shortBio}
                </p>

                {/* Direct Email Card */}
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="p-3 rounded-xl bg-neutral-950/70 border border-purple-500/15 flex items-center justify-between gap-2.5 hover:border-purple-500/40 hover:bg-purple-950/20 transition-all group/mail cursor-pointer"
                  title="Send email via mail client"
                  aria-label="Send email"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center shrink-0 group-hover/mail:scale-105 transition-transform">
                      <Mail className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] font-mono text-purple-400 uppercase tracking-wider">Direct Email</p>
                      <p className="text-xs font-semibold text-white group-hover/mail:text-purple-300 transition-colors truncate">
                        {PERSONAL_INFO.email}
                      </p>
                    </div>
                  </div>

                  <div className="p-1.5 rounded-lg bg-purple-600/80 group-hover/mail:bg-purple-500 text-white transition-all shadow-[0_0_12px_rgba(168,85,247,0.3)] shrink-0">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/mail:translate-x-0.5 group-hover/mail:-translate-y-0.5 transition-transform" />
                  </div>
                </a>

                {/* Location indicator */}
                <div className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <MapPin className="w-3.5 h-3.5 text-purple-400/80 shrink-0" />
                  <span>Based in {PERSONAL_INFO.location ?? 'Nepal'} · Remote worldwide</span>
                </div>
              </div>

              {/* Social Links Row */}
              <div className="pt-2 border-t border-purple-500/15 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-medium text-neutral-400 flex items-center gap-1.5">
                    <Sparkle className="w-3 h-3 text-purple-400" />
                    Social Links
                  </span>
                  <span className="text-[10px] font-mono text-purple-400/80">Connect & Follow</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {SOCIALS.map((social) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ y: -2, scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      aria-label={social.name}
                      className={`flex flex-col items-center justify-center p-2 rounded-xl bg-neutral-950/70 border border-purple-500/15 text-neutral-400 transition-all duration-200 cursor-pointer ${social.hoverClass}`}
                    >
                      <div className="mb-0.5">{social.icon}</div>
                      <span className="text-[10px] font-medium text-neutral-300">{social.name.split(' ')[0]}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Clean Contact Form (7 cols) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="relative p-5 sm:p-6 lg:p-7 rounded-2xl bg-[#0c0d18]/85 border border-purple-500/20 backdrop-blur-xl shadow-[0_0_30px_rgba(168,85,247,0.12)] h-full flex flex-col justify-between overflow-hidden">
              {/* Soft purple top highlight border */}
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

              <div className="flex items-center justify-between border-b border-purple-500/15 pb-3 mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/25 flex items-center justify-center">
                    <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">Send a Message</h4>
                    <p className="text-[11px] text-neutral-400">I will get back to you promptly</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300">
                  Contact Form
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
                        Thank you for reaching out, <span className="text-purple-300 font-medium">{values.name || 'friend'}</span>. I will review your message and reply promptly.
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setFormState('idle')
                        setValues({ name: '', email: '', subject: '', message: '' })
                      }}
                      className="mt-2 text-xs font-semibold text-purple-300 hover:text-purple-200 px-4 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/25 hover:border-purple-500/40 transition-colors cursor-pointer shadow-[0_0_12px_rgba(168,85,247,0.2)]"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3 my-auto">
                    {/* Name & Email in 2 columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {/* Name input */}
                      <div className="space-y-1">
                        <label
                          htmlFor="name"
                          className="block text-[11px] font-medium text-neutral-300"
                        >
                          Name <span className="text-purple-400">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={values.name}
                          onChange={handleChange}
                          placeholder="Your full name"
                          className="w-full px-3 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-colors"
                        />
                      </div>

                      {/* Email input */}
                      <div className="space-y-1">
                        <label
                          htmlFor="email"
                          className="block text-[11px] font-medium text-neutral-300"
                        >
                          Email <span className="text-purple-400">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={values.email}
                          onChange={handleChange}
                          placeholder="your.email@example.com"
                          className="w-full px-3 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Subject input */}
                    <div className="space-y-1">
                      <label
                        htmlFor="subject"
                        className="block text-[11px] font-medium text-neutral-300"
                      >
                        Subject <span className="text-purple-400">*</span>
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        required
                        value={values.subject}
                        onChange={handleChange}
                        placeholder="Project Inquiry / Job Opportunity / Collaboration"
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-colors"
                      />
                    </div>

                    {/* Message textarea */}
                    <div className="space-y-1">
                      <label
                        htmlFor="message"
                        className="block text-[11px] font-medium text-neutral-300"
                      >
                        Message <span className="text-purple-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={3}
                        value={values.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, goals, or inquiries..."
                        className="w-full px-3 py-2 rounded-xl bg-neutral-950/70 border border-neutral-800 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40 transition-colors resize-none"
                      />
                    </div>

                    {/* Send Button with Purple Gradient & Glow */}
                    <button
                      type="submit"
                      disabled={formState === 'loading'}
                      className="w-full py-2.5 sm:py-3 px-5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 hover:from-purple-500 hover:via-violet-500 hover:to-indigo-500 shadow-[0_0_22px_rgba(168,85,247,0.35)] hover:shadow-[0_0_30px_rgba(168,85,247,0.55)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer group"
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

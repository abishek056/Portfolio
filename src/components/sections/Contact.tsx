import React, { useState, useRef, useEffect, useCallback } from 'react'
import { motion, useInView, AnimatePresence, type Variants } from 'framer-motion'
import { Send, Mail, CheckCircle, Loader2, MapPin } from 'lucide-react'
import { PERSONAL_INFO } from '../../data/portfolio'

/* ─────────────────────────── Floating Particles Canvas ─────────────────────────── */
interface Particle {
  x: number; y: number
  vx: number; vy: number
  size: number; opacity: number
  shape: 'circle' | 'triangle' | 'diamond'
  color: string
  rotation: number; rotSpeed: number
}

const COLORS = [
  'rgba(99,102,241,', 'rgba(139,92,246,', 'rgba(56,189,248,',
  'rgba(167,139,250,', 'rgba(236,72,153,',
]

const ParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)

  const initParticles = useCallback((w: number, h: number) => {
    particlesRef.current = Array.from({ length: 28 }, () => {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.35,
        size: Math.random() * 10 + 4,
        opacity: Math.random() * 0.35 + 0.08,
        shape: (['circle', 'triangle', 'diamond'] as const)[Math.floor(Math.random() * 3)],
        color,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
      }
    })
  }, [])

  const drawShape = (ctx: CanvasRenderingContext2D, p: Particle) => {
    ctx.save()
    ctx.translate(p.x, p.y)
    ctx.rotate(p.rotation)
    ctx.globalAlpha = p.opacity
    ctx.fillStyle = `${p.color}${p.opacity})`
    ctx.strokeStyle = `${p.color}${p.opacity * 1.5})`
    ctx.lineWidth = 1

    if (p.shape === 'circle') {
      ctx.beginPath()
      ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2)
      ctx.fill()
    } else if (p.shape === 'triangle') {
      const s = p.size
      ctx.beginPath()
      ctx.moveTo(0, -s / 2)
      ctx.lineTo(s / 2, s / 2)
      ctx.lineTo(-s / 2, s / 2)
      ctx.closePath()
      ctx.stroke()
    } else {
      const s = p.size / 2
      ctx.beginPath()
      ctx.moveTo(0, -s)
      ctx.lineTo(s, 0)
      ctx.lineTo(0, s)
      ctx.lineTo(-s, 0)
      ctx.closePath()
      ctx.stroke()
    }
    ctx.restore()
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      initParticles(canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particlesRef.current.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.rotation += p.rotSpeed
        if (p.x < -20) p.x = canvas.width + 20
        if (p.x > canvas.width + 20) p.x = -20
        if (p.y < -20) p.y = canvas.height + 20
        if (p.y > canvas.height + 20) p.y = -20
        drawShape(ctx, p)
      })
      rafRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect() }
  }, [initParticles])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  )
}

/* ─────────────────────────── Social Links ─────────────────────────── */
const socialLinks = [
  {
    label: 'GitHub',
    href: PERSONAL_INFO.github,
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    color: 'hover:border-neutral-400 hover:text-white',
    glow: 'hover:shadow-[0_0_20px_rgba(255,255,255,0.08)]',
  },
  {
    label: 'LinkedIn',
    href: PERSONAL_INFO.linkedin,
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    ),
    color: 'hover:border-sky-400 hover:text-sky-400',
    glow: 'hover:shadow-[0_0_20px_rgba(56,189,248,0.15)]',
  },
  {
    label: 'Facebook',
    href: PERSONAL_INFO.facebook,
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    color: 'hover:border-blue-500 hover:text-blue-400',
    glow: 'hover:shadow-[0_0_20px_rgba(59,130,246,0.2)]',
  },
  {
    label: 'Email',
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: <Mail className="w-5 h-5" />,
    color: 'hover:border-indigo-400 hover:text-indigo-400',
    glow: 'hover:shadow-[0_0_20px_rgba(99,102,241,0.2)]',
  },
]

/* ─────────────────────────── Main Contact Section ─────────────────────────── */
type FormState = 'idle' | 'loading' | 'success'

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })

  const [formState, setFormState] = useState<FormState>('idle')
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState('loading')
    await new Promise((r) => setTimeout(r, 1400))
    setFormState('success')
  }

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  }
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 sm:py-32 border-t border-neutral-800/60 overflow-hidden"
    >
      {/* Floating particles background */}
      <div className="absolute inset-0">
        <ParticlesCanvas />
        {/* Ambient radial glows */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-indigo-600/8 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-purple-600/8 blur-[90px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-cyan-600/5 blur-[120px] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center max-w-2xl mx-auto mb-16 space-y-3"
        >
          <motion.p variants={itemVariants} className="text-xs font-semibold tracking-[0.2em] text-indigo-400 uppercase font-mono">
            Get In Touch
          </motion.p>
          <motion.h2 variants={itemVariants} className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
            Let&apos;s{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-sky-400">
              Collaborate
            </span>
          </motion.h2>
          <motion.p variants={itemVariants} className="text-base text-neutral-400 leading-relaxed">
            Have a project, idea, or opportunity? I'd love to hear from you.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch max-w-5xl mx-auto"
        >
          {/* Left: Info + Social */}
          <motion.div variants={itemVariants} className="lg:col-span-2 flex flex-col gap-5">
            {/* Location card */}
            <div className="group p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-indigo-500/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(99,102,241,0.1)]">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                  <MapPin className="w-4.5 h-4.5 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs font-mono text-indigo-400 mb-1">Based in</p>
                  <p className="text-white font-semibold">{PERSONAL_INFO.location ?? 'Nepal'}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Open to remote worldwide</p>
                </div>
              </div>
            </div>

            {/* Email card */}
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="group p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm hover:border-indigo-500/40 transition-all duration-300 hover:shadow-[0_0_24px_rgba(99,102,241,0.1)] block"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 group-hover:bg-indigo-500/20 transition-colors">
                  <Mail className="w-4.5 h-4.5 text-indigo-400" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-mono text-indigo-400 mb-1">Email me directly</p>
                  <p className="text-white font-semibold text-sm break-all">{PERSONAL_INFO.email}</p>
                  <p className="text-xs text-neutral-500 mt-0.5">Typically replies within 24h</p>
                </div>
              </div>
            </a>

            {/* Social links */}
            <div className="p-5 rounded-2xl bg-neutral-900/50 border border-neutral-800 backdrop-blur-sm">
              <p className="text-xs font-mono text-neutral-500 mb-4 uppercase tracking-widest">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.href.startsWith('mailto') ? undefined : '_blank'}
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.08, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-12 h-12 rounded-xl bg-neutral-800/60 border border-neutral-700 flex items-center justify-center text-neutral-400 transition-all duration-300 ${s.color} ${s.glow}`}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Availability badge */}
            {PERSONAL_INFO.availableForHire && (
              <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 flex items-center gap-3">
                <span className="relative flex h-2.5 w-2.5 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_8px_#10b981]" />
                </span>
                <p className="text-sm text-emerald-400 font-medium">Available for new projects</p>
              </div>
            )}
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div variants={itemVariants} className="lg:col-span-3">
            <div className="relative p-7 sm:p-8 rounded-2xl bg-neutral-900/60 border border-neutral-800 backdrop-blur-md shadow-2xl overflow-hidden h-full">
              {/* Card inner glow */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <AnimatePresence mode="wait">
                {formState === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center justify-center py-12 gap-5 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
                      className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]"
                    >
                      <CheckCircle className="w-7 h-7 text-emerald-400" />
                    </motion.div>
                    <div>
                      <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                      <p className="text-sm text-neutral-400">
                        Thanks for reaching out — I'll get back to you soon.
                      </p>
                    </div>
                    <button
                      onClick={() => { setFormState('idle'); setValues({ name: '', email: '', message: '' }) }}
                      className="text-sm text-indigo-400 hover:text-indigo-300 border border-indigo-500/30 hover:border-indigo-400 px-5 py-2.5 rounded-lg transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name */}
                      <div>
                        <label htmlFor="contact-name" className="block text-xs font-medium text-neutral-400 mb-2">
                          Your Name <span className="text-indigo-400">*</span>
                        </label>
                        <div className={`relative rounded-xl transition-all duration-300 ${focused === 'name' ? 'shadow-[0_0_0_2px_rgba(99,102,241,0.4)]' : ''}`}>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            required
                            value={values.name}
                            onChange={handleChange}
                            onFocus={() => setFocused('name')}
                            onBlur={() => setFocused(null)}
                            placeholder="Jane Doe"
                            className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
                          />
                        </div>
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="contact-email" className="block text-xs font-medium text-neutral-400 mb-2">
                          Email Address <span className="text-indigo-400">*</span>
                        </label>
                        <div className={`relative rounded-xl transition-all duration-300 ${focused === 'email' ? 'shadow-[0_0_0_2px_rgba(99,102,241,0.4)]' : ''}`}>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            required
                            value={values.email}
                            onChange={handleChange}
                            onFocus={() => setFocused('email')}
                            onBlur={() => setFocused(null)}
                            placeholder="jane@example.com"
                            className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="contact-message" className="block text-xs font-medium text-neutral-400 mb-2">
                        Message <span className="text-indigo-400">*</span>
                      </label>
                      <div className={`relative rounded-xl transition-all duration-300 ${focused === 'message' ? 'shadow-[0_0_0_2px_rgba(99,102,241,0.4)]' : ''}`}>
                        <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={5}
                          value={values.message}
                          onChange={handleChange}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          placeholder="Tell me about your project or idea..."
                          className="w-full px-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-800 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-indigo-500/60 transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {/* Submit */}
                    <motion.button
                      type="submit"
                      disabled={formState === 'loading'}
                      whileHover={formState !== 'loading' ? { scale: 1.02, y: -1 } : {}}
                      whileTap={formState !== 'loading' ? { scale: 0.98 } : {}}
                      className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_24px_rgba(99,102,241,0.3)] hover:shadow-[0_0_36px_rgba(99,102,241,0.5)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2.5"
                    >
                      {formState === 'loading' ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

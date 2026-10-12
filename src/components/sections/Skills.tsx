import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════
   BRAND SVG ICONS  (inline, no dep)
═══════════════════════════════════════════════════════════ */

const ReactLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="50" cy="50" r="9" fill="#22d3ee" />
    <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#22d3ee" strokeWidth="3.5" fill="none" />
    <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#22d3ee" strokeWidth="3.5" fill="none"
      transform="rotate(60 50 50)" />
    <ellipse cx="50" cy="50" rx="46" ry="18" stroke="#22d3ee" strokeWidth="3.5" fill="none"
      transform="rotate(120 50 50)" />
  </svg>
)

const TypeScriptLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect width="100" height="100" rx="14" fill="#3178c6" opacity={0.25} />
    <rect width="100" height="100" rx="14" stroke="#60a5fa" strokeWidth="2.5" fill="none" />
    <text x="8" y="72" fontSize="52" fontWeight="900" fill="#60a5fa" fontFamily="monospace">TS</text>
  </svg>
)

const TailwindLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 22c-11 0-18 5.5-21.5 16.5C33 32 38.5 29.5 45 31c3.1.8 5.3 3 7.7 5.5 4 4.1 8.6 8.8 18.8 8.8C82.5 45.3 89 39.8 92.5 28.8 87.5 35.7 82 38.2 75.5 36.7c-3.1-.8-5.3-3-7.7-5.5C63.8 27.1 59.2 22 50 22Z"
      fill="#818cf8"
    />
    <path
      d="M28.5 45.3c-11 0-18 5.5-21.5 16.5 4.5-6.5 10-9 16.5-7.5 3.1.8 5.3 3 7.7 5.5 4 4.1 8.6 8.8 18.8 8.8 11 0 17.5-5.5 21-16.5C66 58.6 60.5 61 54 59.5c-3.1-.8-5.3-3-7.7-5.5-4-4.1-8.6-8.7-17.8-8.7Z"
      fill="#818cf8"
    />
  </svg>
)

const ThreejsLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="50,8 96,90 4,90" stroke="#c084fc" strokeWidth="4" fill="none" />
    <polygon points="50,30 78,78 22,78" fill="#c084fc" opacity={0.3} />
    <polygon points="50,52 64,76 36,76" fill="#c084fc" opacity={0.6} />
    <circle cx="50" cy="8" r="4" fill="#c084fc" />
    <circle cx="96" cy="90" r="4" fill="#c084fc" />
    <circle cx="4" cy="90" r="4" fill="#c084fc" />
  </svg>
)

const LaravelLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M96 26L72 10 48 26v32l24 16 24-16V26z"
      stroke="#f87171" strokeWidth="3" fill="none" strokeLinejoin="round"
    />
    <path
      d="M48 26L24 10 0 26v32l24 16 24-16"
      stroke="#f87171" strokeWidth="3" fill="none" strokeLinejoin="round" opacity={0.5}
    />
    <path d="M72 10v32M48 26v32M96 26L72 58M48 58L24 42M24 10v32M0 26L24 42"
      stroke="#f87171" strokeWidth="1.5" opacity={0.35} />
    <circle cx="72" cy="10" r="5" fill="#f87171" />
    <circle cx="72" cy="58" r="5" fill="#f87171" opacity={0.7} />
    <circle cx="96" cy="26" r="5" fill="#f87171" opacity={0.5} />
  </svg>
)

const DjangoLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <rect x="6" y="6" width="88" height="88" rx="12" stroke="#34d399" strokeWidth="3" fill="none" opacity={0.4} />
    <text x="14" y="62" fontSize="34" fontWeight="900" fill="#34d399" fontFamily="serif" letterSpacing="-2">DJ</text>
    <path d="M16 72 h68" stroke="#34d399" strokeWidth="2" opacity={0.5} />
    <text x="14" y="88" fontSize="14" fontWeight="600" fill="#34d399" fontFamily="monospace" opacity={0.7}>PYTHON</text>
  </svg>
)

const NodejsLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 8L88 30v44L50 96 12 74V30L50 8Z"
      stroke="#4ade80" strokeWidth="3" fill="none" strokeLinejoin="round"
    />
    <path d="M50 8v88M12 30l38 22 38-22M50 52l38 22M50 52L12 74"
      stroke="#4ade80" strokeWidth="1.5" opacity={0.3} />
    <circle cx="50" cy="50" r="14" stroke="#4ade80" strokeWidth="2.5" fill="none" />
    <circle cx="50" cy="50" r="6" fill="#4ade80" opacity={0.7} />
  </svg>
)

const GitLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <circle cx="24" cy="24" r="9" fill="#f97316" stroke="#f97316" strokeWidth="2" />
    <circle cx="76" cy="24" r="9" fill="#f97316" stroke="#f97316" strokeWidth="2" opacity={0.6} />
    <circle cx="24" cy="76" r="9" fill="#f97316" stroke="#f97316" strokeWidth="2" opacity={0.6} />
    <line x1="24" y1="33" x2="24" y2="67" stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M33 24 h20 a20 20 0 0 1 20 20 v9"
      stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    <path d="M24 67 q0 12 20 12 h8"
      stroke="#f97316" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity={0.5} />
  </svg>
)

const GithubLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <path
      d="M50 8C27 8 8 27 8 50c0 18.5 12 34.3 28.7 39.8 2.1.4 2.9-.9 2.9-2v-7c-11.7 2.5-14.1-5.6-14.1-5.6-1.9-4.8-4.7-6.1-4.7-6.1-3.8-2.6.3-2.5.3-2.5 4.2.3 6.4 4.3 6.4 4.3 3.7 6.4 9.8 4.5 12.2 3.5.4-2.7 1.5-4.5 2.7-5.5-9.3-1.1-19.1-4.7-19.1-20.8 0-4.6 1.6-8.3 4.3-11.3-.4-1-1.8-5.3.4-11.1 0 0 3.5-1.1 11.5 4.3a39.6 39.6 0 0 1 21 0c8-5.4 11.4-4.3 11.4-4.3 2.3 5.8.9 10.1.4 11.1 2.7 3 4.3 6.7 4.3 11.3 0 16.2-9.8 19.7-19.2 20.8 1.5 1.3 2.9 3.9 2.9 7.8v11.6c0 1.1.7 2.4 2.9 2C80 84.3 92 68.5 92 50 92 27 73 8 50 8Z"
      fill="#a78bfa"
    />
  </svg>
)

const VercelLogo = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
    <polygon points="50,10 95,88 5,88" fill="#e2e8f0" opacity={0.9} />
    <polygon points="50,10 95,88 5,88" stroke="#e2e8f0" strokeWidth="2"
      fill="none" opacity={0.4} />
  </svg>
)

/* ═══════════════════════════════════════════════════════════
   SKILL DATA  (10 focused skills as per requirements)
═══════════════════════════════════════════════════════════ */
interface Skill {
  name: string
  desc: string
  Logo: React.FC<{ size?: number }>
  color: string        // primary neon accent
  glow: string         // rgba prefix for box-shadow
  category: 'frontend' | 'backend' | 'tools'
}

const SKILLS: Skill[] = [
  // Frontend
  { name: 'React',        desc: 'UI Library',        Logo: ReactLogo,      color: '#22d3ee', glow: '34,211,238',  category: 'frontend' },
  { name: 'TypeScript',   desc: 'Typed JavaScript',  Logo: TypeScriptLogo, color: '#60a5fa', glow: '96,165,250',  category: 'frontend' },
  { name: 'Tailwind CSS', desc: 'Utility-first CSS', Logo: TailwindLogo,   color: '#818cf8', glow: '129,140,248', category: 'frontend' },
  { name: 'Three.js',     desc: '3D & WebGL',        Logo: ThreejsLogo,    color: '#c084fc', glow: '192,132,252', category: 'frontend' },
  // Backend
  { name: 'Laravel',      desc: 'PHP Framework',     Logo: LaravelLogo,    color: '#f87171', glow: '248,113,113', category: 'backend'  },
  { name: 'Django',       desc: 'Python Framework',  Logo: DjangoLogo,     color: '#34d399', glow: '52,211,153',  category: 'backend'  },
  { name: 'Node.js',      desc: 'JS Runtime',        Logo: NodejsLogo,     color: '#4ade80', glow: '74,222,128',  category: 'backend'  },
  // Tools
  { name: 'Git',          desc: 'Version Control',   Logo: GitLogo,        color: '#f97316', glow: '249,115,22',  category: 'tools'    },
  { name: 'GitHub',       desc: 'Code Hosting',      Logo: GithubLogo,     color: '#a78bfa', glow: '167,139,250', category: 'tools'    },
  { name: 'Vercel',       desc: 'Edge Deployment',   Logo: VercelLogo,     color: '#e2e8f0', glow: '226,232,240', category: 'tools'    },
]

const CATEGORY_META = {
  frontend: { label: 'Frontend',       accent: '#22d3ee', rgb: '34,211,238',   num: '01' },
  backend:  { label: 'Backend',        accent: '#a855f7', rgb: '168,85,247',   num: '02' },
  tools:    { label: 'Tools & DevOps', accent: '#4ade80', rgb: '74,222,128',   num: '03' },
} as const

/* ═══════════════════════════════════════════════════════════
   ANIMATED NEON CARD
═══════════════════════════════════════════════════════════ */
interface NeonCardProps {
  skill: Skill
  index: number
}

const NeonCard: React.FC<NeonCardProps> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)

  /* 3-D tilt */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const cfg    = { damping: 18, stiffness: 220, mass: 0.4 }
  const sX     = useSpring(mouseX, cfg)
  const sY     = useSpring(mouseY, cfg)
  const rotateX = useTransform(sY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(sX, [-0.5, 0.5], [-8, 8])

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const r = cardRef.current.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width  - 0.5)
    mouseY.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const handleLeave = () => { setHovered(false); mouseX.set(0); mouseY.set(0) }

  /* Idle breathing glow box-shadow */
  const idleShadow  = `0 0 0 1px rgba(${skill.glow},0.3), 0 0 12px rgba(${skill.glow},0.18), 0 4px 24px rgba(0,0,0,0.5)`
  const hoverShadow = `0 0 0 1.5px rgba(${skill.glow},0.85), 0 0 20px rgba(${skill.glow},0.55), 0 0 45px rgba(${skill.glow},0.22), inset 0 0 22px rgba(${skill.glow},0.09), 0 8px 32px rgba(0,0,0,0.7)`

  return (
    <motion.div
      initial={{ opacity: 0, y: 28, scale: 0.88 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 900 }}
    >
      {/* Breathing idle glow (separate layer so it doesn't conflict with hover) */}
      <motion.div
        animate={{
          boxShadow: hovered
            ? hoverShadow
            : [idleShadow,
               `0 0 0 1px rgba(${skill.glow},0.45), 0 0 20px rgba(${skill.glow},0.28), 0 4px 24px rgba(0,0,0,0.5)`,
               idleShadow],
        }}
        transition={hovered
          ? { duration: 0.25, ease: 'easeOut' }
          : { duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.25 }
        }
        onMouseMove={handleMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleLeave}
        ref={cardRef}
        style={{
          rotateX, rotateY,
          transformStyle: 'preserve-3d',
          background: hovered
            ? `radial-gradient(circle at 50% 40%, rgba(${skill.glow},0.1) 0%, rgba(8,8,20,0.95) 70%)`
            : 'rgba(8,8,20,0.88)',
          border: `1px solid rgba(${skill.glow},${hovered ? '0.6' : '0.22'})`,
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
        whileHover={{ y: -5, scale: 1.03 }}
        className="relative flex items-center gap-4 px-4 py-4 rounded-xl
          cursor-default overflow-hidden backdrop-blur-xl select-none"
      >
        {/* Top neon seam */}
        <div
          className="absolute top-0 inset-x-0 h-[1.5px] pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${skill.glow},${hovered ? '0.9' : '0.5'}), transparent)`,
            transition: 'opacity 0.3s',
          }}
        />

        {/* Corner glow disc */}
        <div
          className="absolute -top-8 -right-8 w-20 h-20 rounded-full blur-2xl pointer-events-none transition-opacity duration-300"
          style={{
            background: `rgba(${skill.glow},0.35)`,
            opacity: hovered ? 1 : 0.3,
          }}
        />

        {/* Scan-line shimmer on hover */}
        {hovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            initial={{ backgroundPosition: '-200% 0' }}
            animate={{ backgroundPosition: '200% 0' }}
            transition={{ duration: 0.7, ease: 'easeInOut' }}
            style={{
              backgroundImage: `linear-gradient(105deg, transparent 40%, rgba(${skill.glow},0.15) 50%, transparent 60%)`,
              backgroundSize: '200% 100%',
            }}
          />
        )}

        {/* Icon ring */}
        <div className="relative shrink-0" style={{ transform: 'translateZ(16px)' }}>
          {/* Outer rotating ring */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{ rotate: hovered ? 360 : 0 }}
            transition={{ duration: hovered ? 4 : 0, ease: 'linear', repeat: hovered ? Infinity : 0 }}
            style={{
              border: `1.5px dashed rgba(${skill.glow},0.4)`,
              margin: '-6px',
            }}
          />

          {/* Icon container */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center relative"
            style={{
              background: `radial-gradient(circle, rgba(${skill.glow},0.18) 0%, rgba(${skill.glow},0.06) 100%)`,
              border: `1.5px solid rgba(${skill.glow},${hovered ? '0.6' : '0.3'})`,
              boxShadow: hovered
                ? `0 0 18px rgba(${skill.glow},0.5), inset 0 0 12px rgba(${skill.glow},0.12)`
                : `0 0 8px rgba(${skill.glow},0.25)`,
              transition: 'box-shadow 0.3s, border-color 0.3s',
            }}
          >
            <skill.Logo size={26} />
          </div>
        </div>

        {/* Text content — now in a row layout */}
        <div
          className="flex flex-col gap-0.5 min-w-0 flex-1"
          style={{ transform: 'translateZ(10px)' }}
        >
          <div className="flex items-center gap-2">
            <h3
              className="text-[13px] font-extrabold tracking-tight transition-colors duration-200 truncate"
              style={{
                color: hovered ? skill.color : '#e2e8f0',
                textShadow: hovered ? `0 0 12px rgba(${skill.glow},0.8)` : 'none',
              }}
            >
              {skill.name}
            </h3>
            {/* Status dot */}
            <div
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: skill.color,
                boxShadow: `0 0 ${hovered ? '8px' : '4px'} rgba(${skill.glow},${hovered ? '1' : '0.6'})`,
                transition: 'box-shadow 0.3s',
              }}
            />
          </div>
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full w-fit"
            style={{
              color: skill.color,
              background: `rgba(${skill.glow},0.1)`,
              border: `1px solid rgba(${skill.glow},0.22)`,
            }}
          >
            {skill.desc}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   CATEGORY SECTION HEADER
═══════════════════════════════════════════════════════════ */
interface CatHeaderProps {
  catKey: 'frontend' | 'backend' | 'tools'
  index: number
}

const CategoryHeader: React.FC<CatHeaderProps> = ({ catKey, index }) => {
  const meta = CATEGORY_META[catKey]
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1 }}
      className="flex items-center gap-3 mb-4"
    >
      {/* Number badge */}
      <span
        className="text-[11px] font-black font-mono tabular-nums px-2 py-1 rounded-md"
        style={{
          color: meta.accent,
          background: `rgba(${meta.rgb},0.1)`,
          border: `1px solid rgba(${meta.rgb},0.3)`,
          textShadow: `0 0 10px rgba(${meta.rgb},0.7)`,
        }}
      >
        {meta.num}
      </span>

      {/* Label */}
      <h3
        className="text-lg sm:text-xl font-extrabold tracking-widest uppercase"
        style={{
          color: meta.accent,
          textShadow: `0 0 16px rgba(${meta.rgb},0.65)`,
        }}
      >
        {meta.label}
      </h3>

      {/* Neon line */}
      <div className="flex-1 h-px relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ background: `linear-gradient(90deg, rgba(${meta.rgb},0.6), transparent)` }}
        />
        {/* Traveling light particle */}
        <motion.div
          className="absolute top-0 h-full w-8"
          animate={{ left: ['-8%', '108%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: index * 0.8 }}
          style={{
            background: `linear-gradient(90deg, transparent, rgba(${meta.rgb},0.9), transparent)`,
          }}
        />
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MARQUEE
═══════════════════════════════════════════════════════════ */
const TICKER = [
  'React 19', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Vite',
  'Laravel 13', 'Django 6', 'Node.js', 'PHP 8.3', 'MySQL',
  'Git', 'GitHub', 'Vercel', 'Docker', 'WebSockets',
  'Framer Motion', 'REST APIs', 'React Native', 'Mapbox GL', 'Postman',
]

const Marquee: React.FC = () => {
  const doubled = [...TICKER, ...TICKER]
  return (
    <div className="relative mt-8 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#07080e] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#07080e] to-transparent" />
      <motion.div
        className="flex gap-3 w-max py-1"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 32, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((tag, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono whitespace-nowrap cursor-default"
            style={{
              background: 'rgba(10,10,25,0.8)',
              border: '1px solid rgba(129,140,248,0.18)',
              color: 'rgba(167,139,250,0.8)',
              boxShadow: '0 0 8px rgba(129,140,248,0.07)',
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: '#818cf8', boxShadow: '0 0 6px rgba(129,140,248,0.9)' }}
            />
            #{tag}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════════════════════════ */
export const Skills: React.FC = () => {
  const categories = (['frontend', 'backend', 'tools'] as const)

  return (
    <section
      id="skills"
      className="relative py-14 sm:py-20 overflow-hidden bg-transparent border-t border-neutral-800/50"
    >
      {/* ── Background: ambient neon blooms ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top-center: purple bloom */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(ellipse, rgba(168,85,247,0.09) 0%, transparent 70%)' }} />
        {/* Left: blue bloom */}
        <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'rgba(34,211,238,0.06)' }} />
        {/* Right: purple bloom */}
        <div className="absolute top-2/3 -right-40 w-[500px] h-[500px] rounded-full blur-[160px]"
          style={{ background: 'rgba(192,132,252,0.07)' }} />
        {/* Bottom: green tint */}
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[300px] rounded-full blur-[140px]"
          style={{ background: 'rgba(74,222,128,0.05)' }} />
      </div>

      {/* ── Grid overlay ── */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(129,140,248,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(129,140,248,1) 1px, transparent 1px)
          `,
          backgroundSize: '52px 52px',
          maskImage: 'radial-gradient(ellipse 85% 70% at 50% 50%, black 30%, transparent 85%)',
        }}
      />

      {/* ── Top seam ── */}
      <div className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(34,211,238,0.4), transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">

        {/* ── Section heading ── */}
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-3">

          {/* Eyebrow chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.18em] uppercase"
            style={{
              background: 'rgba(168,85,247,0.07)',
              border: '1px solid rgba(168,85,247,0.35)',
              color: '#c084fc',
              boxShadow: '0 0 24px rgba(168,85,247,0.14)',
            }}
          >
            {/* Pulse dot */}
            <motion.span
              className="w-2 h-2 rounded-full"
              animate={{ opacity: [1, 0.3, 1], scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{ background: '#a855f7', boxShadow: '0 0 8px rgba(168,85,247,1)' }}
            />
            Tech Stack
          </motion.div>

          {/* H2 */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight"
          >
            <span className="text-white">Skills &amp; </span>
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #22d3ee 0%, #a855f7 55%, #818cf8 100%)',
                filter: 'drop-shadow(0 0 30px rgba(168,85,247,0.4))',
              }}
            >
              Technologies
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-500 leading-relaxed max-w-lg mx-auto"
          >
            Hand-picked tools and frameworks powering modern,
            scalable, and immersive web experiences.
          </motion.p>
        </div>

        {/* ── Skill groups ── */}
        <div className="space-y-6">
          {categories.map((catKey, catIdx) => {
            const skills = SKILLS.filter(s => s.category === catKey)

            return (
              <div key={catKey}>
                <CategoryHeader catKey={catKey} index={catIdx} />

                <div
                  className={`grid gap-4 ${
                    catKey === 'frontend'
                      ? 'grid-cols-2 sm:grid-cols-4'
                      : 'grid-cols-1 sm:grid-cols-3'
                  }`}
                >
                  {skills.map((skill, i) => (
                    <NeonCard key={skill.name} skill={skill} index={i} />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Marquee ── */}
        <Marquee />
      </div>
    </section>
  )
}

export default Skills

import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import {
  Code2,
  Database,
  Cpu,
  Terminal,
  Globe,
  Radio,
  Layers,
  Sparkles,
  GitBranch,
  MapPin,
  Send,
  Cloud,
  Package,
  Boxes,
} from 'lucide-react'
import type { Skill } from '../../../data/portfolio'

interface SkillMetadata {
  icon: React.ComponentType<{ className?: string }>
  color: string
  bgGlow: string
  tags: string[]
}

const SKILL_META: Record<string, SkillMetadata> = {
  'React 19 / React': {
    icon: Code2,
    color: '#06b6d4',
    bgGlow: 'rgba(6, 182, 212, 0.15)',
    tags: ['Hooks', 'Vite', 'React Native', 'Three.js'],
  },
  'TypeScript / JavaScript': {
    icon: Terminal,
    color: '#38bdf8',
    bgGlow: 'rgba(56, 189, 248, 0.15)',
    tags: ['ESNext', 'Generics', 'Strict Typing', 'Async/Await'],
  },
  'Tailwind CSS': {
    icon: Layers,
    color: '#38bdf8',
    bgGlow: 'rgba(56, 189, 248, 0.15)',
    tags: ['v4 & v3', 'Flexbox & Grid', 'Glassmorphism', 'Dark Mode'],
  },
  Vite: {
    icon: Cpu,
    color: '#a855f7',
    bgGlow: 'rgba(168, 85, 247, 0.15)',
    tags: ['Fast HMR', 'Rollup Bundler', 'Optimized Build'],
  },
  'React Native': {
    icon: Globe,
    color: '#60a5fa',
    bgGlow: 'rgba(96, 165, 250, 0.15)',
    tags: ['Mobile UI', 'Cross-Platform', 'Navigation'],
  },
  'Bootstrap 5 / CSS3 / HTML5': {
    icon: Boxes,
    color: '#c084fc',
    bgGlow: 'rgba(192, 132, 252, 0.15)',
    tags: ['Semantic HTML', 'Grid Layout', 'Responsive'],
  },
  'Laravel 13 / PHP 8.3': {
    icon: ServerIcon,
    color: '#f43f5e',
    bgGlow: 'rgba(244, 63, 94, 0.15)',
    tags: ['Eloquent ORM', 'Routing & Middleware', 'Queues', 'PHP 8.3'],
  },
  'Django 6.0 / Python': {
    icon: Code2,
    color: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.15)',
    tags: ['Django REST', 'ORM Models', 'RBAC Auth', 'Python'],
  },
  'MySQL / Relational Databases': {
    icon: Database,
    color: '#3b82f6',
    bgGlow: 'rgba(59, 130, 246, 0.15)',
    tags: ['Relational Schemas', 'Indexing', 'Query Optimization'],
  },
  'Laravel Sanctum (Auth)': {
    icon: Cpu,
    color: '#f43f5e',
    bgGlow: 'rgba(244, 63, 94, 0.15)',
    tags: ['API Tokens', 'SPA Security', 'Guards & Abilities'],
  },
  'Laravel Reverb (WebSockets)': {
    icon: Radio,
    color: '#f59e0b',
    bgGlow: 'rgba(245, 158, 11, 0.15)',
    tags: ['Real-Time Broadcast', 'Echo Channels', 'Live Events'],
  },
  'RESTful APIs': {
    icon: Globe,
    color: '#6366f1',
    bgGlow: 'rgba(99, 102, 241, 0.15)',
    tags: ['API Architecture', 'JSON Specification', 'Rate Limiting'],
  },
  'Git & GitHub': {
    icon: GitBranch,
    color: '#f97316',
    bgGlow: 'rgba(249, 115, 22, 0.15)',
    tags: ['Version Control', 'Pull Requests', 'GitHub Actions'],
  },
  'Mapbox GL': {
    icon: MapPin,
    color: '#38bdf8',
    bgGlow: 'rgba(56, 189, 248, 0.15)',
    tags: ['GIS Visualization', 'Fleet Tracking', 'GeoJSON'],
  },
  'Postman / API Testing': {
    icon: Send,
    color: '#f97316',
    bgGlow: 'rgba(249, 115, 22, 0.15)',
    tags: ['Endpoint Testing', 'Env Variables', 'Automated Tests'],
  },
  'Vercel Deployment': {
    icon: Cloud,
    color: '#ffffff',
    bgGlow: 'rgba(255, 255, 255, 0.15)',
    tags: ['Edge Network', 'CI/CD Pipeline', 'Production Hosting'],
  },
  'Composer & npm': {
    icon: Package,
    color: '#ec4899',
    bgGlow: 'rgba(236, 72, 153, 0.15)',
    tags: ['Package Ecosystem', 'Dependency Resolving', 'CLI Scripts'],
  },
}

function ServerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      <line x1="6" x2="6.01" y1="6" y2="6" />
      <line x1="6" x2="6.01" y1="18" y2="18" />
    </svg>
  )
}

interface SkillCard3DProps {
  skill: Skill
  index: number
}

export const SkillCard3D: React.FC<SkillCard3DProps> = ({ skill, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const springConfig = { damping: 22, stiffness: 220, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-8, 8])
  const glareX = useTransform(smoothX, [-0.5, 0.5], [20, 80])
  const glareY = useTransform(smoothY, [-0.5, 0.5], [20, 80])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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

  const meta = SKILL_META[skill.name] || {
    icon: Sparkles,
    color: '#818cf8',
    bgGlow: 'rgba(129, 140, 248, 0.15)',
    tags: [skill.category],
  }

  const Icon = meta.icon

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1000 }}
      className="h-full"
    >
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
        whileHover={{ scale: 1.025, y: -4 }}
        className="group relative h-full flex flex-col justify-between p-5 rounded-2xl bg-neutral-900/80 border border-neutral-800/80 hover:border-neutral-700/80 backdrop-blur-md shadow-xl transition-all duration-300 overflow-hidden"
      >
        {/* Dynamic Specular Light Glare */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300 rounded-2xl"
          style={{
            opacity: isHovered ? 1 : 0,
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(255,255,255,0.08), transparent 70%)`
            ),
          }}
        />

        {/* Ambient Corner Glow on Hover */}
        <div
          className="absolute -top-16 -right-16 w-32 h-32 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
          style={{ backgroundColor: meta.color }}
        />

        {/* Top: Icon + Skill Name + Category Badge */}
        <div className="space-y-4" style={{ transform: 'translateZ(12px)' }}>
          <div className="flex items-center justify-between gap-3">
            <div
              className="p-2.5 rounded-xl border border-neutral-700/60 shadow-inner flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
              style={{
                backgroundColor: meta.bgGlow,
                color: meta.color,
                borderColor: `${meta.color}40`,
              }}
            >
              <Icon className="w-5 h-5" />
            </div>

            <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-950/70 text-neutral-400 border border-neutral-800/80">
              {skill.category}
            </span>
          </div>

          <div>
            <h4 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight">
              {skill.name}
            </h4>
          </div>
        </div>

        {/* Middle: Progress Bar & Percentage */}
        <div className="space-y-2 py-3" style={{ transform: 'translateZ(15px)' }}>
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neutral-400">Mastery Level</span>
            <span className="font-semibold" style={{ color: meta.color }}>
              {skill.level}%
            </span>
          </div>

          <div className="w-full bg-neutral-950/80 rounded-full h-1.5 overflow-hidden p-0.5 border border-neutral-800/50">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: 0.1 + index * 0.03, ease: 'easeOut' }}
              className="h-full rounded-full transition-all"
              style={{
                background: `linear-gradient(to right, #6366f1, ${meta.color})`,
              }}
            />
          </div>
        </div>

        {/* Bottom: Sub-skill tags */}
        <div className="pt-2 flex flex-wrap gap-1.5" style={{ transform: 'translateZ(18px)' }}>
          {meta.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-neutral-950/60 text-neutral-300 border border-neutral-800/80 group-hover:border-neutral-700/80 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

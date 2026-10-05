import React, { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowUpRight, Sparkles, Layers, Terminal } from 'lucide-react'
import type { Project } from '../../../data/portfolio'

// Direct Vite asset imports for guaranteed bundling
import healthhubImg from '../../../assets/image/projects/healthhub.png'
import urbanstyleImg from '../../../assets/image/projects/urbanstyle.png'
import complaintImg from '../../../assets/image/projects/complaint.png'
import portfolioImg from '../../../assets/image/projects/portfolio.png'
import dreamcafeImg from '../../../assets/image/projects/dreamcafe.png'

const projectImageMap: Record<string, string> = {
  healthhub: healthhubImg,
  urbanstyle: urbanstyleImg,
  'complaint-management-system': complaintImg,
  'portfolio-v1': portfolioImg,
  'dream-cafe': dreamcafeImg,
}

interface ProjectCard3DProps {
  project: Project
  index: number
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({ project, index }) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  // Motion values for normalized cursor coordinates (-0.5 to 0.5)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Spring physics for silky smooth tilt without jerkiness
  const springConfig = { damping: 22, stiffness: 200, mass: 0.5 }
  const smoothX = useSpring(mouseX, springConfig)
  const smoothY = useSpring(mouseY, springConfig)

  // 3D Rotations
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10])

  // Specular light sheen positions
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

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    mouseX.set(0)
    mouseY.set(0)
  }

  const resolvedImage = projectImageMap[project.id] || project.image || ''

  // Category badge styles
  const categoryStyles: Record<string, { badge: string; text: string; border: string }> = {
    'Full-Stack': {
      badge: 'bg-indigo-500/15 text-indigo-300 border-indigo-500/30',
      text: 'text-indigo-400',
      border: 'hover:border-indigo-500/50',
    },
    Frontend: {
      badge: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      text: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
    },
    Backend: {
      badge: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      text: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
    },
  }

  const catStyle = categoryStyles[project.category] || categoryStyles['Full-Stack']

  // Floating idle animation variants (staggered float)
  const floatDelay = (index % 3) * 0.4
  const floatDuration = 4.2 + (index % 3) * 0.7

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 35 }}
      animate={{
        opacity: 1,
        y: isHovered ? -8 : 0,
      }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative h-full flex flex-col"
      style={{ perspective: 1200 }}
    >
      {/* Outer Floating Animation container */}
      <motion.div
        animate={
          isHovered
            ? { y: 0 }
            : {
                y: [0, -6, 0],
              }
        }
        transition={{
          duration: floatDuration,
          delay: floatDelay,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="h-full flex flex-col"
      >
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          whileHover={{ scale: 1.025 }}
          className={`group relative h-full flex flex-col justify-between rounded-2xl bg-neutral-900/80 backdrop-blur-xl border border-neutral-800/90 ${catStyle.border} shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-colors duration-300 overflow-hidden`}
        >
          {/* Dynamic Specular Light Glare (moves in 3D with cursor) */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0,
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle 320px at ${gx}% ${gy}%, rgba(255,255,255,0.08), transparent 70%)`
              ),
            }}
          />

          {/* Ambient Corner Glow on Hover */}
          <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Top Section: Card Header & Image (Depth Layer 1) */}
          <div className="p-5 pb-0 flex flex-col gap-4" style={{ transform: 'translateZ(15px)' }}>
            {/* Project Image Frame with macOS Window Chrome */}
            <div className="relative rounded-xl overflow-hidden border border-neutral-800 bg-neutral-950/90 shadow-md group/img flex flex-col">
              {/* Window Chrome Titlebar */}
              <div className="relative z-20 flex items-center justify-between px-3 py-2 bg-neutral-950/95 border-b border-neutral-800/80 backdrop-blur-md shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex items-center gap-1 text-[11px] font-mono text-neutral-400">
                  <Terminal className="w-3 h-3 text-neutral-400" />
                  <span>{project.id}.dev</span>
                </div>
                {project.liveUrl ? (
                  <span className="flex items-center gap-1 text-[10px] font-medium text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-neutral-400">SOURCE</span>
                )}
              </div>

              {/* Image Preview with Zoom Effect */}
              <div className="relative w-full aspect-video overflow-hidden bg-neutral-950">
                <img
                  src={resolvedImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transform group-hover:scale-106 transition-transform duration-700 ease-out"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

                {/* Quick Action Overlay on Image Hover */}
                <div className="absolute inset-0 bg-neutral-950/60 opacity-0 group-hover/img:opacity-100 backdrop-blur-[2px] transition-all duration-300 flex items-center justify-center gap-3">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg hover:scale-110 transition-all"
                      title="Open Live Demo"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-full bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700 hover:scale-110 transition-all"
                      title="View GitHub Repository"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Badges: Category & Featured Pill */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border ${catStyle.badge}`}
              >
                <Layers className="w-3 h-3" />
                {project.category}
              </span>

              {project.featured && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  Featured
                </span>
              )}
            </div>

            {/* Title & Description (Depth Layer 2) */}
            <div className="space-y-2" style={{ transform: 'translateZ(20px)' }}>
              <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors tracking-tight flex items-center gap-2">
                <span>{project.title}</span>
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </div>
          </div>

          {/* Bottom Section: Tech Stack Badges & CTAs (Depth Layer 3) */}
          <div className="p-5 pt-4 space-y-4" style={{ transform: 'translateZ(25px)' }}>
            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-1.5">
              {project.stack.slice(0, 6).map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-neutral-950/70 text-neutral-300 border border-neutral-800 hover:border-neutral-700 hover:text-white transition-colors"
                >
                  {tech}
                </span>
              ))}
              {project.stack.length > 6 && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-neutral-900 text-neutral-400 border border-neutral-800">
                  +{project.stack.length - 6} more
                </span>
              )}
            </div>

            {/* Action Buttons: Live Demo & GitHub */}
            <div className="flex items-center gap-2.5 pt-1">
              {project.liveUrl ? (
                <>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 shadow-[0_0_15px_rgba(99,102,241,0.25)] hover:shadow-[0_0_22px_rgba(99,102,241,0.45)] transition-all duration-300 group/btn"
                  >
                    <span>Live Demo</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-neutral-300 hover:text-white bg-neutral-950/80 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 transition-all duration-300"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                      />
                    </svg>
                    <span>Source</span>
                  </a>
                </>
              ) : (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-neutral-800 to-neutral-900 hover:from-neutral-700 hover:to-neutral-800 border border-neutral-700/80 hover:border-neutral-600 shadow-md transition-all duration-300"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                  <span>Explore Repository &rarr;</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles,
  Monitor,
  Server,
  Wrench,
  Layers,
  Code2,
  Terminal,
  Database,
  Cpu,
  Globe,
  Radio,
  GitBranch,
  MapPin,
  Send,
  Cloud,
  Package,
  Boxes,
  CheckCircle2,
} from 'lucide-react'
import { SKILLS_BY_CATEGORY, type SkillCategory, type Skill } from '../../data/portfolio'

/* ─────────────────────────── Skill Metadata Map ─────────────────────────── */
interface SkillInfo {
  icon: React.ComponentType<{ className?: string }>
  subtags: string[]
  accent: string
}

const SKILL_DETAILS: Record<string, SkillInfo> = {
  // Frontend
  'React 19 / React': {
    icon: Code2,
    subtags: ['Hooks', 'Vite', 'Three.js'],
    accent: 'text-cyan-400 group-hover:text-cyan-300',
  },
  'TypeScript / JavaScript': {
    icon: Terminal,
    subtags: ['ESNext', 'Generics', 'Strict Typing'],
    accent: 'text-sky-400 group-hover:text-sky-300',
  },
  'Tailwind CSS': {
    icon: Layers,
    subtags: ['v4 & v3', 'Flex/Grid', 'Dark Mode'],
    accent: 'text-cyan-400 group-hover:text-cyan-300',
  },
  Vite: {
    icon: Cpu,
    subtags: ['Fast HMR', 'Rollup Bundler'],
    accent: 'text-purple-400 group-hover:text-purple-300',
  },
  'React Native': {
    icon: Globe,
    subtags: ['Cross-Platform', 'Mobile UI'],
    accent: 'text-sky-400 group-hover:text-sky-300',
  },
  'Bootstrap 5 / CSS3 / HTML5': {
    icon: Boxes,
    subtags: ['Semantic HTML', 'Responsive'],
    accent: 'text-purple-400 group-hover:text-purple-300',
  },

  // Backend
  'Laravel 13 / PHP 8.3': {
    icon: Server,
    subtags: ['Eloquent ORM', 'Queues', 'Routing'],
    accent: 'text-rose-400 group-hover:text-rose-300',
  },
  'Django 6.0 / Python': {
    icon: Code2,
    subtags: ['Django REST', 'ORM Models', 'RBAC'],
    accent: 'text-emerald-400 group-hover:text-emerald-300',
  },
  'MySQL / Relational Databases': {
    icon: Database,
    subtags: ['Schemas', 'Indexing', 'Query Tuning'],
    accent: 'text-indigo-400 group-hover:text-indigo-300',
  },
  'Laravel Sanctum (Auth)': {
    icon: Cpu,
    subtags: ['API Tokens', 'SPA Security'],
    accent: 'text-rose-400 group-hover:text-rose-300',
  },
  'Laravel Reverb (WebSockets)': {
    icon: Radio,
    subtags: ['Real-Time Broadcast', 'Echo'],
    accent: 'text-amber-400 group-hover:text-amber-300',
  },
  'RESTful APIs': {
    icon: Globe,
    subtags: ['JSON Spec', 'Architecture', 'Rate Limits'],
    accent: 'text-indigo-400 group-hover:text-indigo-300',
  },

  // Tools
  'Git & GitHub': {
    icon: GitBranch,
    subtags: ['Version Control', 'PR Reviews', 'CI/CD'],
    accent: 'text-orange-400 group-hover:text-orange-300',
  },
  'Docker & Linux CLI': {
    icon: Terminal,
    subtags: ['Containers', 'Bash', 'DevOps'],
    accent: 'text-sky-400 group-hover:text-sky-300',
  },
  'Mapbox GL': {
    icon: MapPin,
    subtags: ['GIS Mapping', 'GeoJSON Data'],
    accent: 'text-emerald-400 group-hover:text-emerald-300',
  },
  'Postman / API Testing': {
    icon: Send,
    subtags: ['API Validation', 'Automation'],
    accent: 'text-amber-400 group-hover:text-amber-300',
  },
  'Vercel Deployment': {
    icon: Cloud,
    subtags: ['Edge CDN', 'Instant Deploys'],
    accent: 'text-sky-400 group-hover:text-sky-300',
  },
  'Composer & npm': {
    icon: Package,
    subtags: ['Package Mgmt', 'CLI Scripting'],
    accent: 'text-emerald-400 group-hover:text-emerald-300',
  },
}

/* ─────────────────────────── Category Metadata ─────────────────────────── */
interface CategoryConfig {
  key: SkillCategory
  title: string
  tagline: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  borderHover: string
  glow: string
  headerBg: string
}

const CATEGORY_CONFIGS: Record<SkillCategory, CategoryConfig> = {
  Frontend: {
    key: 'Frontend',
    title: 'Frontend Ecosystem',
    tagline: 'Reactive interfaces, mobile apps & 3D canvases',
    icon: Monitor,
    color: 'text-cyan-400',
    borderHover: 'hover:border-cyan-500/40',
    glow: 'from-cyan-500/20 via-sky-500/5 to-transparent',
    headerBg: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
  },
  Backend: {
    key: 'Backend',
    title: 'Backend & Systems',
    tagline: 'Scalable services, real-time WebSockets & databases',
    icon: Server,
    color: 'text-indigo-400',
    borderHover: 'hover:border-indigo-500/40',
    glow: 'from-indigo-500/20 via-purple-500/5 to-transparent',
    headerBg: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20',
  },
  Tools: {
    key: 'Tools',
    title: 'Tools & DevOps',
    tagline: 'Version control, automated testing & cloud hosting',
    icon: Wrench,
    color: 'text-emerald-400',
    borderHover: 'hover:border-emerald-500/40',
    glow: 'from-emerald-500/20 via-teal-500/5 to-transparent',
    headerBg: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  },
}

type TabFilter = 'All' | SkillCategory
const TABS: TabFilter[] = ['All', 'Frontend', 'Backend', 'Tools']

/* ─────────────────────────── Main Skills Section ─────────────────────────── */
export const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabFilter>('All')

  // Categories to render based on active tab
  const visibleCategories = useMemo(() => {
    if (activeTab === 'All') {
      return (['Frontend', 'Backend', 'Tools'] as SkillCategory[])
    }
    return [activeTab as SkillCategory]
  }, [activeTab])

  // Total counts
  const totalCount = useMemo(() => {
    return (
      SKILLS_BY_CATEGORY.Frontend.length +
      SKILLS_BY_CATEGORY.Backend.length +
      SKILLS_BY_CATEGORY.Tools.length
    )
  }, [])

  return (
    <section
      id="skills"
      className="relative py-20 sm:py-28 lg:py-32 border-t border-neutral-800/80 bg-transparent overflow-hidden"
    >
      {/* Top Section Highlight Seam */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-500/25 to-transparent pointer-events-none" />

      {/* Ambient Radial Color Glows */}
      <div className="absolute top-1/4 -left-28 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-2/3 -right-28 w-[450px] h-[450px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e810a_1px,transparent_1px),linear-gradient(to_bottom,#312e810a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_50%,#000_50%,transparent_90%)] opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-3">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.12)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-mono font-medium tracking-wider text-indigo-300 uppercase">
              Technical Capabilities // Stack Mastery
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Skills, Tools &{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
              Architecture
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-neutral-300 leading-relaxed"
          >
            Comprehensive toolkit spanning interactive client-side engineering, real-time backend systems, and automated deployment tooling.
          </motion.p>
        </div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10 sm:mb-12"
        >
          <div
            role="tablist"
            className="p-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-center gap-1 sm:gap-1.5"
          >
            {TABS.map((tab) => {
              const isActive = activeTab === tab
              const count =
                tab === 'All'
                  ? totalCount
                  : SKILLS_BY_CATEGORY[tab as SkillCategory].length

              return (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillsTabPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {tab === 'All' && <Layers className="w-3.5 h-3.5" />}
                    {tab === 'Frontend' && <Monitor className="w-3.5 h-3.5" />}
                    {tab === 'Backend' && <Server className="w-3.5 h-3.5" />}
                    {tab === 'Tools' && <Wrench className="w-3.5 h-3.5" />}
                    <span>{tab}</span>
                    <span
                      className={`text-[11px] font-mono px-1.5 py-0.2 rounded-md ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-neutral-800 text-neutral-400'
                      }`}
                    >
                      {count}
                    </span>
                  </span>
                </button>
              )
            })}
          </div>
        </motion.div>

        {/* Grouped Skills Cards Layout */}
        <motion.div
          layout
          className={`grid gap-6 items-stretch ${
            activeTab === 'All'
              ? 'grid-cols-1 lg:grid-cols-3'
              : 'grid-cols-1 max-w-2xl mx-auto'
          }`}
        >
          <AnimatePresence mode="popLayout">
            {visibleCategories.map((catKey, catIdx) => {
              const config = CATEGORY_CONFIGS[catKey]
              const skillsList = SKILLS_BY_CATEGORY[catKey]
              const CategoryIcon = config.icon

              return (
                <motion.div
                  key={catKey}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: catIdx * 0.08 }}
                  className={`relative flex flex-col justify-between rounded-2xl bg-[#0c0d14]/90 border border-neutral-800/80 ${config.borderHover} backdrop-blur-xl shadow-xl hover:shadow-[0_16px_40px_rgba(0,0,0,0.6)] transition-all duration-300 overflow-hidden`}
                >
                  {/* Subtle Top Accent Gradient Line */}
                  <div
                    className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${config.glow}`}
                  />

                  {/* Card Header */}
                  <div className="p-5 pb-4 border-b border-neutral-800/60 bg-neutral-950/40">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center border ${config.headerBg}`}
                        >
                          <CategoryIcon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                            {config.title}
                          </h3>
                        </div>
                      </div>

                      <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400">
                        {skillsList.length} Technologies
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {config.tagline}
                    </p>
                  </div>

                  {/* Skills List Items */}
                  <div className="p-4 sm:p-5 flex flex-col gap-2.5 flex-1 justify-start">
                    {skillsList.map((skill: Skill) => {
                      const details = SKILL_DETAILS[skill.name] || {
                        icon: Code2,
                        subtags: ['Core Tech'],
                        accent: 'text-neutral-300',
                      }
                      const SkillIcon = details.icon

                      return (
                        <div
                          key={skill.name}
                          className="group relative p-3 rounded-xl bg-neutral-950/70 hover:bg-neutral-900/90 border border-neutral-800/80 hover:border-neutral-700/80 transition-all duration-200"
                        >
                          <div className="flex items-center justify-between gap-3 mb-2">
                            {/* Icon & Title */}
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="w-7 h-7 rounded-lg bg-neutral-900 border border-neutral-800 flex items-center justify-center shrink-0 group-hover:border-neutral-700 transition-colors">
                                <SkillIcon className={`w-3.5 h-3.5 ${details.accent}`} />
                              </div>
                              <span className="text-xs sm:text-sm font-semibold text-white group-hover:text-indigo-200 transition-colors truncate">
                                {skill.name}
                              </span>
                            </div>

                            {/* Level Percentage Tag */}
                            <span className="text-[11px] font-mono font-medium text-neutral-400 group-hover:text-indigo-300 transition-colors shrink-0">
                              {skill.level}%
                            </span>
                          </div>

                          {/* Progress Meter Bar */}
                          <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden mb-2">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${skill.level}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                              className={`h-full rounded-full bg-gradient-to-r ${
                                catKey === 'Frontend'
                                  ? 'from-cyan-500 to-sky-400'
                                  : catKey === 'Backend'
                                  ? 'from-indigo-500 to-purple-400'
                                  : 'from-emerald-500 to-teal-400'
                              }`}
                            />
                          </div>

                          {/* Subtags / Micro Tech Keywords */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                            {details.subtags.map((tag) => (
                              <span
                                key={tag}
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-neutral-900/80 border border-neutral-800/80 text-neutral-400 group-hover:text-neutral-300 group-hover:border-neutral-700/60 transition-colors"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Card Bottom Micro Banner */}
                  <div className="p-3.5 px-5 bg-neutral-950/60 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="flex items-center gap-1.5 font-mono text-neutral-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Production Ready</span>
                    </span>
                    <span className="font-mono text-neutral-400">
                      High Confidence
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </motion.div>

        {/* Compact Architecture Keywords Ticker */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <div className="p-4 sm:p-5 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md shadow-lg max-w-4xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-indigo-300">
              <Terminal className="w-3.5 h-3.5 text-indigo-400" />
              <span>Full-Stack & Real-Time Keywords</span>
            </div>

            <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
              {[
                'React 19',
                'Laravel 13',
                'TypeScript',
                'Laravel Reverb',
                'Django REST',
                'WebSockets',
                'Tailwind CSS',
                'MySQL Optimization',
                'Sanctum RBAC',
                'Mapbox GL GIS',
                'Vite HMR',
                'Framer Motion',
                'RESTful APIs',
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="px-2.5 py-1 rounded-full text-xs font-mono bg-neutral-950/70 border border-neutral-800/80 text-neutral-300 hover:border-indigo-500/50 hover:text-white transition-all cursor-default"
                >
                  #{keyword}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills

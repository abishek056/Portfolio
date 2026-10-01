import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Terminal, Layers, Server, Wrench, Code2 } from 'lucide-react'
import { SKILLS, type SkillCategory } from '../../data/portfolio'
import { SkillCard3D } from './skills/SkillCard3D'
import { SkillsScene3D } from './skills/SkillsScene3D'

type FilterCategory = 'All' | SkillCategory

const CATEGORIES: FilterCategory[] = ['All', 'Frontend', 'Backend', 'Tools']

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All')

  // Calculate counts per category
  const categoryCounts = useMemo(() => {
    return {
      All: SKILLS.length,
      Frontend: SKILLS.filter((s) => s.category === 'Frontend').length,
      Backend: SKILLS.filter((s) => s.category === 'Backend').length,
      Tools: SKILLS.filter((s) => s.category === 'Tools').length,
    }
  }, [])

  // Filter skills based on selection
  const filteredSkills = useMemo(() => {
    if (activeCategory === 'All') return SKILLS
    return SKILLS.filter((skill) => skill.category === activeCategory)
  }, [activeCategory])

  return (
    <section
      id="skills"
      className="relative py-24 sm:py-32 border-t border-neutral-800/80 bg-[#07080e] overflow-hidden"
    >
      {/* Ambient Radial Background Glows */}
      <div className="absolute top-1/3 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#4f46e512_1px,transparent_1px)] [background-size:2rem_2rem] opacity-60 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.12)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-mono font-medium tracking-wider text-indigo-300 uppercase">
              Technical Stack // Interactive Orbit
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
              Architecture Mastery
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            Categorized across frontend ecosystems, backend micro-architectures, relational data models, and modern developer tooling.
          </motion.p>
        </div>

        {/* Light 3D Floating Spheres Scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-10 rounded-2xl border border-neutral-800/80 bg-neutral-900/40 backdrop-blur-md overflow-hidden relative shadow-2xl"
        >
          {/* Subtle floating 3D canvas banner */}
          <div className="absolute top-3 left-4 z-10 flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
            <span>Interactive 3D Tech Nodes // Hover to expand</span>
          </div>

          <SkillsScene3D />
        </motion.div>

        {/* Category Filter Tabs with Sliding Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12"
        >
          <div className="p-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-center gap-1 sm:gap-1.5">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat
              const count = categoryCounts[cat]

              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                  aria-pressed={isActive}
                >
                  {/* Sliding Pill Background with LayoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTabPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {cat === 'All' && <Layers className="w-3.5 h-3.5" />}
                    {cat === 'Frontend' && <Code2 className="w-3.5 h-3.5" />}
                    {cat === 'Backend' && <Server className="w-3.5 h-3.5" />}
                    {cat === 'Tools' && <Wrench className="w-3.5 h-3.5" />}
                    <span>{cat}</span>
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

        {/* 3D Skills Grid with Smooth Stagger Entrance */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, index) => (
              <SkillCard3D key={skill.name} skill={skill} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Interactive Tech Tags Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md shadow-lg max-w-4xl mx-auto space-y-4">
            <div className="flex items-center justify-center gap-2 text-xs font-mono text-indigo-300">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span>Full-Stack Ecosystem & Architecture Keywords</span>
            </div>

            <div className="flex flex-wrap justify-center gap-2 pt-1">
              {[
                'Laravel Reverb',
                'WebSockets',
                'React 19',
                'TypeScript',
                'Django REST',
                'Sanctum RBAC',
                'Tailwind CSS v4',
                'Mapbox GL GIS',
                'Three.js / 3D',
                'MySQL Optimization',
                'Vite Bundler',
                'Framer Motion',
                'Postman Automation',
                'RESTful APIs',
              ].map((keyword) => (
                <span
                  key={keyword}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-neutral-950/70 border border-neutral-800 text-neutral-300 hover:border-indigo-500/50 hover:text-white transition-all cursor-default"
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

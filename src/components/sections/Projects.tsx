import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, Code2, Layers, Monitor, Server } from 'lucide-react'
import { PROJECTS, type ProjectCategory } from '../../data/portfolio'
import { ProjectCard3D } from './projects/ProjectCard3D'
import { ProjectBackground3D } from './projects/ProjectBackground3D'

type FilterType = 'All' | ProjectCategory

const FILTERS: FilterType[] = ['All', 'Full-Stack', 'Frontend', 'Backend']

export const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('All')

  // Calculate project count per category
  const filterCounts = useMemo(() => {
    const counts: Record<FilterType, number> = {
      All: PROJECTS.length,
      'Full-Stack': PROJECTS.filter((p) => p.category === 'Full-Stack').length,
      Frontend: PROJECTS.filter((p) => p.category === 'Frontend').length,
      Backend: PROJECTS.filter((p) => p.category === 'Backend').length,
    }
    return counts
  }, [])

  // Filtered projects list
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return PROJECTS
    return PROJECTS.filter((project) => project.category === activeFilter)
  }, [activeFilter])

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 border-t border-neutral-800/80 bg-[#07080e] overflow-hidden"
    >
      {/* Spider-Web & Constellation Particle Network Background */}
      <ProjectBackground3D />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-14 space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.12)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span className="text-xs font-mono font-medium tracking-wider text-indigo-300 uppercase">
              Featured Work // Interactive Showcase
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Selected{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
              Projects & Architectures
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-neutral-300 max-w-2xl mx-auto leading-relaxed"
          >
            Explore real-time emergency dispatch platforms, full-stack systems, e-commerce storefronts, and interactive web applications.
          </motion.p>
        </div>

        {/* Filter Buttons with Animated Active Sliding Pill */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12 sm:mb-14"
        >
          <div
            role="tablist"
            aria-label="Filter projects by category"
            className="p-1.5 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 backdrop-blur-xl shadow-xl flex flex-wrap items-center justify-center gap-1 sm:gap-1.5"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter
              const count = filterCounts[filter]

              return (
                <button
                  key={filter}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors duration-200 cursor-pointer flex items-center gap-2 ${
                    isActive ? 'text-white' : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {/* Sliding Pill Background with LayoutId */}
                  {isActive && (
                    <motion.div
                      layoutId="activeProjectFilterPill"
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  <span className="relative z-10 flex items-center gap-1.5">
                    {filter === 'All' && <Layers className="w-3.5 h-3.5" />}
                    {filter === 'Full-Stack' && <Code2 className="w-3.5 h-3.5" />}
                    {filter === 'Frontend' && <Monitor className="w-3.5 h-3.5" />}
                    {filter === 'Backend' && <Server className="w-3.5 h-3.5" />}
                    <span>{filter}</span>
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

        {/* Projects Grid with Fluid Reordering Animation */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard3D key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State Fallback (Defensive) */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-neutral-400">No projects found in this category.</p>
          </div>
        )}

        {/* Bottom GitHub CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-5 sm:px-8 sm:py-4 rounded-2xl bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-md shadow-lg">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <p className="text-xs sm:text-sm text-neutral-300">
                Interested in viewing additional repositories, microservices, and experiments?
              </p>
            </div>
            <a
              href="https://github.com/abishek056"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 border border-neutral-700 hover:border-indigo-400/50 transition-all duration-200"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>Explore GitHub (@abishek056) &rarr;</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects

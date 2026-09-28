import React from 'react'
import { PROJECTS } from '../../data/portfolioData'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-20 border-t border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            Featured Works
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Selected Projects
          </p>
          <p className="text-sm sm:text-base text-neutral-400">
            A showcase of selected web and interactive applications built with modern tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-44 w-full rounded-lg bg-neutral-800/80 border border-neutral-700/50 flex items-center justify-center overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 to-neutral-900/60 group-hover:scale-105 transition-transform duration-300" />
                  <span className="relative z-10 text-neutral-400 text-xs font-mono">
                    Project Preview #{project.id}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md bg-neutral-800 text-indigo-300 border border-neutral-700/60 font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Button variant="outline" className="w-full text-xs py-2">
                  View Details &rarr;
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

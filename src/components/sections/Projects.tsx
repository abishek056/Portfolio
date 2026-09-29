import React from 'react'
import { PROJECTS } from '../../data/portfolio'
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
            A showcase of selected full-stack, backend, and frontend web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project) => (
            <Card key={project.id} className="flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="h-44 w-full rounded-lg bg-neutral-900 border border-neutral-800 flex flex-col justify-between p-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/30 to-purple-950/20 group-hover:scale-105 transition-transform duration-300" />
                  
                  <div className="relative z-10 flex justify-between items-center">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                      {project.category}
                    </span>
                    {project.liveUrl && (
                      <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Live
                      </span>
                    )}
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-mono text-neutral-400">
                      {project.id}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2 py-0.5 rounded-md bg-neutral-800 text-neutral-300 border border-neutral-700/60 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-2 pt-2">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                    >
                      <Button variant="primary" className="w-full text-xs py-2">
                        Live Demo &rarr;
                      </Button>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={project.liveUrl ? 'flex-1' : 'w-full'}
                    >
                      <Button variant="outline" className="w-full text-xs py-2">
                        GitHub &rarr;
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

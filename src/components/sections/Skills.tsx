import React from 'react'
import { SKILLS } from '../../data/portfolioData'
import { Card } from '../ui/Card'

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-20 border-t border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            Technical Stack
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Skills & Expertise
          </p>
          <p className="text-sm sm:text-base text-neutral-400">
            Core technologies and creative tools I use in production workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill) => (
            <Card key={skill.name} className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-white text-base">{skill.name}</span>
                  <span className="text-xs font-mono text-indigo-400">{skill.category}</span>
                </div>
              </div>

              <div className="mt-4">
                <div className="w-full bg-neutral-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span className="text-[11px] text-neutral-500 font-mono">{skill.level}%</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

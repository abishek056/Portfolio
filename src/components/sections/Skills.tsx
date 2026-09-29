import React from 'react'
import { SKILLS_BY_CATEGORY, type SkillCategory } from '../../data/portfolio'
import { Card } from '../ui/Card'

const CATEGORIES: SkillCategory[] = ['Frontend', 'Backend', 'Tools']

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
            Categorized across Frontend, Backend architectures, and production development tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((category) => (
            <Card key={category} className="p-6 flex flex-col space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  {category}
                </h3>
                <span className="text-xs font-mono text-neutral-400">
                  {SKILLS_BY_CATEGORY[category].length} skills
                </span>
              </div>

              <div className="space-y-4">
                {SKILLS_BY_CATEGORY[category].map((skill) => (
                  <div key={skill.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium text-neutral-200">{skill.name}</span>
                      <span className="text-xs font-mono text-indigo-400">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-neutral-800/80 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

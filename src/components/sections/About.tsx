import React from 'react'
import aboutImg from '../../assets/image/about/about.jpg'
import { PERSONAL_INFO } from '../../data/portfolio'
import { Card } from '../ui/Card'

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 border-t border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h2 className="text-xs font-semibold tracking-wider text-indigo-400 uppercase">
            About Me
          </h2>
          <p className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Passionate {PERSONAL_INFO.title} & Problem Solver
          </p>
          <p className="text-sm sm:text-base text-neutral-400">
            A quick glimpse into my background, passions, and engineering philosophy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative group max-w-sm w-full">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 opacity-25 blur-lg group-hover:opacity-40 transition duration-500"></div>
              <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-xl aspect-4/5">
                <img
                  src={aboutImg}
                  alt={PERSONAL_INFO.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 text-left">
            <h3 className="text-2xl font-bold text-white">
              Hi, I'm {PERSONAL_INFO.name} — bridging full-stack systems with smooth user experiences.
            </h3>
            <p className="text-neutral-300 leading-relaxed">
              I specialize in end-to-end web engineering, from scalable backend APIs in Laravel and Django to responsive, performant user interfaces built with React and Tailwind CSS.
            </p>
            <p className="text-neutral-400 text-sm leading-relaxed">
              Whether building real-time hospital dispatch platforms like HealthHub, e-commerce storefronts, or role-based management portals, I prioritize clean architecture, maintainability, and exceptional UI craftsmanship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <Card className="p-4">
                <h4 className="text-indigo-400 font-semibold text-sm mb-1">Full-Stack Architecture</h4>
                <p className="text-xs text-neutral-400">
                  Designing resilient backend services, authentication systems, and database models in Laravel & Django.
                </p>
              </Card>
              <Card className="p-4">
                <h4 className="text-indigo-400 font-semibold text-sm mb-1">Modern UI & Real-Time UX</h4>
                <p className="text-xs text-neutral-400">
                  Building fluid interfaces with React, Tailwind CSS, WebSockets, and interactive visual components.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import React from 'react'
import profileImg from '../../assets/image/home/profile1.jpg'
import { CanvasPlaceholder } from '../3d/CanvasPlaceholder'
import { Button } from '../ui/Button'

export const Home: React.FC = () => {
  return (
    <section id="home" className="min-h-screen pt-28 pb-16 flex items-center relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-xs font-medium text-indigo-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Available for new projects
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">digital experiences</span> that inspire.
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 max-w-xl">
              Welcome to my portfolio! I build performant web applications, modern interfaces, and interactive 3D elements with clean code and cutting-edge web technologies.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a href="#projects">
                <Button variant="primary">Explore Projects</Button>
              </a>
              <a href="#contact">
                <Button variant="secondary">Contact Me</Button>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 items-center">
            <div className="relative group">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 to-purple-600 opacity-30 blur-lg group-hover:opacity-50 transition duration-500"></div>
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="w-full max-w-md">
              <CanvasPlaceholder
                title="3D Home Canvas"
                subtitle="Ready for Three.js / React Three Fiber interactive scene"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

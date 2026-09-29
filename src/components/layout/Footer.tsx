import React from 'react'
import logoImg from '../../assets/image/logo.png'
import { PERSONAL_INFO } from '../../data/portfolio'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-neutral-800/80 bg-neutral-950/90 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain rounded" />
          <span className="font-semibold text-neutral-300">{PERSONAL_INFO.name}</span>
        </div>
        <p className="text-xs text-neutral-500">
          © {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved. Crafted with React 19, Tailwind CSS, & Vite.
        </p>
        <div className="flex items-center space-x-6 text-sm text-neutral-400">
          <a
            href={PERSONAL_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            GitHub
          </a>
          <a
            href={PERSONAL_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors"
          >
            LinkedIn
          </a>
          <a href="#home" className="hover:text-neutral-200 transition-colors">
            Back to Top ↑
          </a>
        </div>
      </div>
    </footer>
  )
}

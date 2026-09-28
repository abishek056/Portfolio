import React from 'react'
import logoImg from '../../assets/image/logo.png'
import { NAV_LINKS } from '../../data/portfolioData'

export const Navbar: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-neutral-950/80 border-b border-neutral-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3 group">
          <img
            src={logoImg}
            alt="Logo"
            className="w-9 h-9 object-contain rounded-lg border border-neutral-800 group-hover:border-indigo-500/50 transition-colors"
          />
          <span className="font-bold text-lg text-white tracking-tight group-hover:text-indigo-400 transition-colors">
            Abishek Adhikari
          </span>
        </a>

        <nav className="hidden md:flex items-center space-x-1 sm:space-x-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3 py-1.5 text-sm font-medium text-neutral-300 hover:text-white hover:bg-neutral-800/60 rounded-md transition-all duration-150"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="text-xs sm:text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg transition-colors shadow-sm"
          >
            Get in touch
          </a>
        </div>
      </div>
    </header>
  )
}

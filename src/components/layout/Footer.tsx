import React from 'react'
import { motion } from 'framer-motion'
import { Mail, Heart, ArrowUp } from 'lucide-react'
import logoImg from '../../assets/image/logo.png'
import { PERSONAL_INFO, NAV_LINKS } from '../../data/portfolio'

const GithubIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

const LinkedinIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
)

const socialLinks = [
  { label: 'GitHub', href: PERSONAL_INFO.github, icon: <GithubIcon /> },
  { label: 'LinkedIn', href: PERSONAL_INFO.linkedin, icon: <LinkedinIcon /> },
  { label: 'Email', href: `mailto:${PERSONAL_INFO.email}`, icon: <Mail className="w-4 h-4" /> },
]

export const Footer: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '')
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <footer className="relative border-t border-neutral-800/60 bg-neutral-950/95 overflow-hidden">
      {/* Top highlight line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      {/* Background ambient */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[500px] h-40 rounded-full bg-indigo-600/5 blur-[80px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <img src={logoImg} alt="Logo" className="w-8 h-8 object-contain rounded-lg border border-neutral-800" />
              <span className="font-bold text-white text-lg tracking-tight">
                {PERSONAL_INFO.name.split(' ')[0]}
                <span className="text-indigo-400">.</span>
              </span>
            </div>
            <p className="text-sm text-neutral-500 leading-relaxed max-w-xs">
              {PERSONAL_INFO.shortBio}
            </p>
          </div>

          {/* Quick Nav */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Navigation</p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href) }}
                  className="text-sm text-neutral-400 hover:text-indigo-400 transition-colors w-fit"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Social + Contact */}
          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">Connect</p>
            <div className="flex gap-2.5">
              {socialLinks.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith('mailto') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-indigo-500/40 hover:text-indigo-400 flex items-center justify-center text-neutral-500 transition-all duration-200 hover:shadow-[0_0_12px_rgba(99,102,241,0.2)]"
                >
                  {s.icon}
                </motion.a>
              ))}
            </div>
            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="text-sm text-neutral-500 hover:text-indigo-400 transition-colors break-all mt-1"
            >
              {PERSONAL_INFO.email}
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-neutral-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-600 flex items-center gap-1.5">
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Crafted with
            <Heart className="w-3 h-3 text-indigo-400 inline-block" />
            using React 19, Vite &amp; Framer Motion.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 text-xs text-neutral-500 hover:text-indigo-400 transition-colors px-3 py-1.5 rounded-lg border border-neutral-800 hover:border-indigo-500/30 hover:shadow-[0_0_12px_rgba(99,102,241,0.15)]"
            aria-label="Back to top"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  )
}

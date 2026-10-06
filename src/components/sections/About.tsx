import React, { Suspense } from 'react'
import { motion } from 'framer-motion'
import {
  Sparkles,
  Download,
  Eye,
  Mail,
  MapPin,
  CheckCircle2,
  FolderGit2,
  Terminal,
  Award,
  ShieldCheck,
  Feather,
} from 'lucide-react'
import aboutImg from '../../assets/image/about/about.jpg'
import signatureImg from '../../assets/image/about/signature.png'
import { HeroScene } from '../3d/HeroScene'

export const About: React.FC = () => {
  // 4 Small stats cards
  const stats = [
    {
      value: '5+',
      label: 'Projects Completed',
      icon: FolderGit2,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/25',
    },
    {
      value: '10+',
      label: 'Core Technologies',
      icon: Terminal,
      color: 'text-cyan-400',
      bg: 'bg-cyan-500/10 border-cyan-500/25',
    },
    {
      value: '2+',
      label: 'Years Experience',
      icon: Award,
      color: 'text-purple-400',
      bg: 'bg-purple-500/10 border-purple-500/25',
    },
    {
      value: '100%',
      label: 'Dedication to Quality',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/25',
    },
  ]

  return (
    <section
      id="about"
      className="relative py-20 sm:py-28 border-t border-neutral-800/80 bg-[#07080e] overflow-hidden"
    >
      {/* 3D Spider-web Constellation Background (Exact Hero Scene) */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Atmospheric Radial Gradients & Tech Grid */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px]" />
        <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan-600/5 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e810a_1px,transparent_1px),linear-gradient(to_bottom,#312e810a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_50%,transparent_95%)] opacity-70" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* ═══════════════ LEFT SIDE ═══════════════ */}
          <div className="lg:col-span-7 space-y-6">
            {/* Pill Header & Name Below */}
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-neutral-900/80 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.12)]"
              >
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] font-mono font-medium tracking-wider text-indigo-300 uppercase">
                  About Me // Overview
                </span>
              </motion.div>

              {/* Name written below About Me // Overview */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: 0.05 }}
                className="text-xs sm:text-sm font-mono text-indigo-400 font-semibold tracking-wider uppercase flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                <span>Abishek Adhikari</span>
              </motion.div>
            </div>

            {/* Big Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
            >
              Building Digital Solutions That{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-purple-400">
                Make a Difference
              </span>
            </motion.h2>

            {/* Short Professional Description (2-3 lines only) */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.14 }}
              className="text-base sm:text-lg text-neutral-300 leading-relaxed max-w-2xl"
            >
              Full-stack software developer engineering robust web applications, high-performance backends, and responsive user experiences. Passionate about transforming ideas into resilient, production-ready digital products.
            </motion.p>

            {/* 4 Small Stats Cards */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2"
            >
              {stats.map((s) => {
                const Icon = s.icon
                return (
                  <motion.div
                    key={s.label}
                    whileHover={{ y: -3, scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="p-3.5 rounded-xl border border-neutral-800/90 bg-neutral-900/70 backdrop-blur-md hover:border-indigo-500/40 hover:bg-neutral-900/90 shadow-lg transition-all group"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className={`p-1.5 rounded-lg border ${s.bg} ${s.color} group-hover:scale-110 transition-transform duration-200`}>
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                      {s.value}
                    </div>
                    <div className="text-[11px] font-mono text-neutral-400 leading-tight mt-0.5">
                      {s.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* View CV & Download CV Buttons Side by Side */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.26 }}
              className="pt-2 flex flex-wrap items-center gap-3"
            >
              {/* Option to View CV */}
              <motion.a
                href="/cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-neutral-200 hover:text-white bg-neutral-900/90 hover:bg-neutral-800/90 border border-neutral-700/80 hover:border-indigo-500/40 backdrop-blur-md shadow-sm transition-all duration-300"
              >
                <Eye className="w-4 h-4 text-indigo-400" />
                <span>View CV</span>
              </motion.a>

              {/* Option to Download CV */}
              <motion.a
                href="/cv.pdf"
                download="Abishek_Adhikari_CV.pdf"
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-purple-600 shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:shadow-[0_0_28px_rgba(99,102,241,0.5)] transition-all duration-300"
              >
                <Download className="w-4 h-4 text-indigo-100 group-hover:-translate-y-0.5 transition-transform duration-300" />
                <span>Download CV</span>
              </motion.a>
            </motion.div>
          </div>

          {/* ═══════════════ RIGHT SIDE ═══════════════ */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              whileHover={{ y: -4 }}
              className="relative w-full max-w-[420px] rounded-2xl p-[1px] bg-gradient-to-br from-indigo-500/40 via-purple-500/20 to-neutral-800/80 shadow-2xl group"
            >
              {/* Outer Ambient Glow */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-cyan-500/10 blur-2xl opacity-50 group-hover:opacity-75 transition-opacity pointer-events-none" />

              {/* Main Card Container */}
              <div className="relative rounded-2xl bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/80 p-6 sm:p-7 space-y-6 overflow-hidden">
                {/* Decorative Top Accent Line */}
                <div className="absolute top-0 left-8 right-8 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/60 to-transparent pointer-events-none" />

                {/* Profile Header Row with Thumbnail */}
                <div className="flex items-center gap-4 pb-5 border-b border-neutral-800/70">
                  <div className="relative w-14 h-14 rounded-full ring-2 ring-indigo-500/40 p-0.5 overflow-hidden shrink-0 bg-neutral-950">
                    <img
                      src={aboutImg}
                      alt="Abishek Adhikari"
                      className="w-full h-full object-cover object-top rounded-full"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-neutral-900 animate-pulse" />
                  </div>

                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-semibold block">
                      Developer Profile
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                      Abishek Adhikari
                    </h3>
                    <p className="text-xs font-mono text-neutral-400">Full-Stack Engineer</p>
                  </div>
                </div>

                {/* Info Fields */}
                <div className="space-y-3.5">
                  {/* Name Field */}
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70 flex items-center justify-between">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Name</span>
                    <span className="text-sm font-semibold text-white">Abishek Adhikari</span>
                  </div>

                  {/* Email Field (Clean without copy button) */}
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 shrink-0">
                      <Mail className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Email</span>
                    </div>

                    <a
                      href="mailto:abishekadhikari056@gmail.com"
                      className="text-xs sm:text-sm font-medium text-neutral-200 hover:text-indigo-300 transition-colors truncate text-right"
                    >
                      abishekadhikari056@gmail.com
                    </a>
                  </div>

                  {/* Location Field */}
                  <div className="p-3 rounded-xl bg-neutral-950/60 border border-neutral-800/70 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                      <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Location</span>
                    </div>
                    <span className="text-sm font-semibold text-white">Kathmandu, Nepal</span>
                  </div>

                  {/* Availability Field */}
                  <div className="p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/25 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-mono text-emerald-300 uppercase tracking-wider">Availability</span>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-emerald-300">
                      Available for Opportunities
                    </span>
                  </div>
                </div>

                {/* Signature Section with User's Uploaded Signature */}
                <div className="pt-4 border-t border-neutral-800/70 flex flex-col items-center justify-center text-center space-y-1.5">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    <Feather className="w-3 h-3 text-indigo-400/80" />
                    <span>Personal Signature</span>
                  </div>

                  {/* User's Exact Signature Image */}
                  <div className="py-1 flex items-center justify-center">
                    <img
                      src={signatureImg}
                      alt="Abishek Adhikari Signature"
                      className="h-16 sm:h-20 w-auto object-contain filter drop-shadow-[0_0_12px_rgba(129,140,248,0.35)] hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="text-xs font-mono text-neutral-400 tracking-wider">
                    Abishek Adhikari
                  </div>
                  <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

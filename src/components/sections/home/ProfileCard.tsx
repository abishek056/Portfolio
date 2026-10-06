import React, { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Globe, MapPin, Zap, Layers, Code2 } from 'lucide-react'
import profileImg from '../../../assets/image/home/card.jpg'

/* ─── Barcode SVG ───────────────────────────────────────────────────────── */
const Barcode: React.FC = () => {
  const pattern = [3,1,2,1,1,3,1,2,1,3,2,1,1,2,1,3,1,2,2,1,3,1,1,2,3,1,2,1,1,3,2,1,2,1,3]
  let cx = 0
  const bars: { x: number; w: number }[] = []
  pattern.forEach((w, i) => {
    if (i % 2 === 0) bars.push({ x: cx, w })
    cx += w + 0.8
  })
  return (
    <svg viewBox={`0 0 ${cx} 22`} preserveAspectRatio="none" className="w-full h-5" aria-hidden="true">
      <defs>
        <linearGradient id="bcGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#a855f7" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {bars.map((b, i) => (
        <rect key={i} x={b.x} y={0} width={b.w} height={22} fill="url(#bcGrad)" />
      ))}
    </svg>
  )
}

/* ─── Info Row ──────────────────────────────────────────────────────────── */
interface RowProps {
  icon: React.ReactNode
  label: string
  value: string
  iconBg: string
  iconColor: string
  dotColor: string
}
const InfoRow: React.FC<RowProps> = ({ icon, label, value, iconBg, iconColor, dotColor }) => (
  <motion.div
    className="flex items-center gap-2 group/row"
    whileHover={{ x: 2 }}
    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
  >
    {/* Icon badge */}
    <span className={`flex-shrink-0 w-[22px] h-[22px] rounded-[6px] flex items-center justify-center ${iconBg} ${iconColor} shadow-sm`}>
      {icon}
    </span>
    {/* Label */}
    <span className="text-[9.5px] font-mono text-purple-400/60 uppercase tracking-[0.12em] w-[52px] flex-shrink-0">
      {label}
    </span>
    {/* Connector dots */}
    <span className="flex-1 flex items-center gap-[3px] overflow-hidden mx-1">
      {Array.from({ length: 8 }).map((_, i) => (
        <span key={i} className={`w-[2px] h-[2px] rounded-full flex-shrink-0 ${dotColor} opacity-30`} />
      ))}
    </span>
    {/* Value */}
    <span className="text-[11px] font-medium text-white/90 flex-shrink-0 text-right leading-tight max-w-[120px] truncate">
      {value}
    </span>
  </motion.div>
)

/* ─── Corner ornament ───────────────────────────────────────────────────── */
const Corner: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`absolute w-4 h-4 ${className}`}>
    <div className="absolute top-0 left-0 w-full h-[1.5px] bg-violet-400/50" />
    <div className="absolute top-0 left-0 w-[1.5px] h-full bg-violet-400/50" />
  </div>
)

/* ─── Main Card ─────────────────────────────────────────────────────────── */
export const ProfileCard: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.6 })
  const smoothY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.6 })
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [6, -6])
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-6, 6])
  const glareX  = useTransform(smoothX, [-0.5, 0.5], [15, 85])
  const glareY  = useTransform(smoothY, [-0.5, 0.5], [15, 85])
  const shadowX = useTransform(smoothX, [-0.5, 0.5], [-12, 12])
  const shadowY = useTransform(smoothY, [-0.5, 0.5], [-8, 8])

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (window.matchMedia('(pointer: coarse)').matches) return
    const r = cardRef.current?.getBoundingClientRect()
    if (!r) return
    mouseX.set((e.clientX - r.left) / r.width  - 0.5)
    mouseY.set((e.clientY - r.top)  / r.height - 0.5)
  }
  const onMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[430px]"
      style={{ perspective: 1000 }}
    >
      {/* ── Multi-layer ambient glow ───────────────────────────────────── */}
      <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-violet-600/30 via-purple-700/20 to-indigo-600/30 blur-3xl opacity-75 pointer-events-none" />
      <div className="absolute -inset-1 rounded-[2rem] bg-gradient-to-tr from-fuchsia-600/10 to-cyan-500/10 blur-xl opacity-60 pointer-events-none" />

      {/* ── Animated gradient border wrapper ──────────────────────────── */}
      <motion.div
        className="p-[1.5px] rounded-2xl"
        style={{
          background: 'linear-gradient(135deg, rgba(124,58,237,0.8) 0%, rgba(168,85,247,0.5) 30%, rgba(99,102,241,0.3) 60%, rgba(168,85,247,0.8) 100%)',
          boxShadow: useTransform(
            [shadowX, shadowY],
            ([sx, sy]) =>
              `${sx}px ${sy}px 40px rgba(124,58,237,0.25), 0 0 60px rgba(99,102,241,0.15), inset 0 0 0 1px rgba(255,255,255,0.03)`
          ),
        }}
      >
        {/* ── Glass card surface ──────────────────────────────────────── */}
        <motion.div
          ref={cardRef}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          whileHover={{ scale: 1.012 }}
          transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          className="relative rounded-[14px] overflow-hidden bg-[#080713] backdrop-blur-2xl"
        >
          {/* ── Interior mesh gradient background ─────────────────────── */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_50%,rgba(124,58,237,0.12),transparent)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_90%_30%,rgba(99,102,241,0.10),transparent)]" />
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-violet-950/30 to-transparent" />
          </div>

          {/* ── Animated scanline shimmer ──────────────────────────────── */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10"
            style={{
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)',
            }}
          />

          {/* ── Hover specular glare ───────────────────────────────────── */}
          <motion.div
            className="absolute inset-0 z-20 pointer-events-none rounded-[14px]"
            style={{
              background: useTransform(
                [glareX, glareY],
                ([gx, gy]) =>
                  `radial-gradient(circle 220px at ${gx}% ${gy}%, rgba(200,150,255,0.10), transparent 60%)`
              ),
            }}
          />

          {/* ── Corner ornaments ──────────────────────────────────────── */}
          <Corner className="top-3 left-3" />
          <div className="absolute top-3 right-3 w-4 h-4">
            <div className="absolute top-0 right-0 w-full h-[1.5px] bg-violet-400/50" />
            <div className="absolute top-0 right-0 w-[1.5px] h-full bg-violet-400/50" />
          </div>
          <div className="absolute bottom-3 left-3 w-4 h-4">
            <div className="absolute bottom-0 left-0 w-full h-[1.5px] bg-violet-400/30" />
            <div className="absolute bottom-0 left-0 w-[1.5px] h-full bg-violet-400/30" />
          </div>
          <div className="absolute bottom-3 right-3 w-4 h-4">
            <div className="absolute bottom-0 right-0 w-full h-[1.5px] bg-violet-400/30" />
            <div className="absolute bottom-0 right-0 w-[1.5px] h-full bg-violet-400/30" />
          </div>

          {/* ── Body ──────────────────────────────────────────────────── */}
          <div className="relative z-10 flex items-stretch">

            {/* ── LEFT: Photo column ────────────────────────────────── */}
            <div className="relative flex flex-col items-center justify-center px-4 py-5 flex-shrink-0 w-[108px]">
              {/* Left column subtle bg */}
              <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 via-purple-900/10 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-violet-500/30 to-transparent" />

              {/* Photo with animated glow ring */}
              <div className="relative">
                {/* Outer pulse ring */}
                <motion.div
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -inset-[6px] rounded-full bg-gradient-to-br from-violet-500/30 via-purple-500/20 to-indigo-500/30 blur-md"
                />

                {/* Spinning conic border */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
                  className="absolute -inset-[2.5px] rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 0deg, #7c3aed 0%, #c084fc 25%, #6366f1 50%, #a855f7 75%, #7c3aed 100%)',
                    borderRadius: '9999px',
                  }}
                />

                {/* Inner photo container */}
                <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden bg-[#0d0920] ring-[2.5px] ring-[#080713]">
                  {/*
                    Full-body 2:3 image — face is in the top ~20%.
                    Render the img at 2.8× the container width, centered horizontally,
                    and shifted up so the face is visible in the circle.
                  */}
                  <img
                    src={profileImg}
                    alt="Abishek Adhikari"
                    className="absolute"
                    style={{
                      width: '210%',        /* 2.1× wider than circle  */
                      height: 'auto',       /* maintain aspect ratio   */
                      left: '50%',
                      top: '-4px',          /* shift up to show face   */
                      transform: 'translateX(-50%)',
                    }}
                  />
                  {/* Subtle color-match overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-violet-950/20 to-transparent" />
                </div>

                {/* Online indicator */}
                <span className="absolute -bottom-0.5 -right-0.5 flex">
                  <span className="absolute inline-flex h-3.5 w-3.5 rounded-full bg-emerald-400 opacity-40 animate-ping" />
                  <span className="relative w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-[#080713] shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                </span>
              </div>

              {/* Monogram */}
              <div className="mt-3 flex flex-col items-center gap-0.5">
                <span className="text-[10px] font-mono font-bold text-violet-300/70 tracking-[0.2em]">AA</span>
                <div className="w-8 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent" />
              </div>

              {/* Floating accent dots */}
              <div className="absolute top-4 left-2 w-1 h-1 rounded-full bg-violet-400/30" />
              <div className="absolute bottom-6 left-3 w-0.5 h-0.5 rounded-full bg-purple-400/40" />
            </div>

            {/* ── RIGHT: Info column ────────────────────────────────── */}
            <div className="flex-1 px-3.5 py-4 flex flex-col justify-between min-w-0">

              {/* Name + title block */}
              <div className="mb-2.5">
                {/* Card type badge */}
                <div className="flex items-center gap-1.5 mb-2">
                  <Code2 className="w-3 h-3 text-violet-400/60" />
                  <span className="text-[8.5px] font-mono tracking-[0.25em] text-violet-400/50 uppercase">
                    Developer · Portfolio
                  </span>
                </div>

                <h3 className="text-[15px] font-bold text-white tracking-tight leading-none">
                  Abishek Adhikari
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[11px] font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-300 to-indigo-400">
                    Full-Stack Developer
                  </p>
                  {/* Level badge */}
                  <span className="px-1.5 py-0.5 rounded-full bg-violet-500/15 border border-violet-500/25 text-[8px] font-mono text-violet-300/80 uppercase tracking-wide">
                    Pro
                  </span>
                </div>
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500/20 to-transparent mb-2.5" />

              {/* 4 Info rows */}
              <div className="space-y-[7px] mb-2.5">
                <InfoRow
                  icon={<Globe className="w-[10px] h-[10px]" />}
                  label="Focus"
                  value="Web Development"
                  iconBg="bg-violet-500/15"
                  iconColor="text-violet-400"
                  dotColor="bg-violet-400"
                />
                <InfoRow
                  icon={<MapPin className="w-[10px] h-[10px]" />}
                  label="Location"
                  value="Kathmandu, Nepal"
                  iconBg="bg-rose-500/15"
                  iconColor="text-rose-400"
                  dotColor="bg-rose-400"
                />
                <InfoRow
                  icon={<Zap className="w-[10px] h-[10px]" />}
                  label="Status"
                  value="Available"
                  iconBg="bg-emerald-500/15"
                  iconColor="text-emerald-400"
                  dotColor="bg-emerald-400"
                />
                <InfoRow
                  icon={<Layers className="w-[10px] h-[10px]" />}
                  label="Exp."
                  value="Full-Stack Projects"
                  iconBg="bg-sky-500/15"
                  iconColor="text-sky-400"
                  dotColor="bg-sky-400"
                />
              </div>

              {/* Separator */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-violet-500/15 to-transparent mb-2" />

              {/* Barcode + tagline */}
              <div>
                <Barcode />
                <div className="flex items-center justify-between mt-1.5">
                  <span className="text-[8.5px] font-mono font-bold tracking-[0.2em] text-violet-400/50 uppercase">
                    BUILD · LEARN · CREATE
                  </span>
                  <span className="text-[8px] font-mono text-violet-500/35 tabular-nums">
                    v2.0 · 2024
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default ProfileCard

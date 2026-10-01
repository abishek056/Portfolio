import React, { useMemo } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  color: string
}

export const AboutBackground3D: React.FC = () => {
  // Soft floating light particles around the about content
  const particles: Particle[] = useMemo(() => {
    const colors = [
      'rgba(99, 102, 241, 0.45)', // Indigo
      'rgba(56, 189, 248, 0.4)',  // Sky
      'rgba(168, 85, 247, 0.4)',  // Purple
      'rgba(52, 211, 153, 0.35)', // Emerald
    ]
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      x: (i * 19 + 5) % 94 + 3,
      y: (i * 27 + 11) % 92 + 4,
      size: (i % 3) * 1.5 + 2,
      duration: 8 + (i % 5) * 2.5,
      delay: (i % 4) * 1.5,
      color: colors[i % colors.length],
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Soft Ambient Radial Atmospheric Glows */}
      <div className="absolute -top-24 -left-20 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[120px]" />
      <div className="absolute top-1/2 -right-24 w-[480px] h-[480px] rounded-full bg-purple-600/10 blur-[130px]" />
      <div className="absolute -bottom-20 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-600/10 blur-[120px]" />

      {/* Subtle Matrix Dot Grid with Radial Mask */}
      <div className="absolute inset-0 bg-[radial-gradient(#4f46e515_1px,transparent_1px)] [background-size:2rem_2rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,#000_60%,transparent_100%)] opacity-60" />

      {/* Light 3D Floating Shape 1: Wireframe Dodecahedron / Multi-faceted Geosphere (Top Left) */}
      <motion.div
        animate={{
          y: [-10, 14, -10],
          rotate: [0, 180, 360],
          rotateX: [10, 30, 10],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-16 left-[5%] w-28 h-28 opacity-25 hidden md:block"
        style={{ perspective: 800 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-indigo-400 fill-none" strokeWidth="1.2">
          {/* Outer hexagon */}
          <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" />
          {/* Inner isometric lines */}
          <polygon points="50,22 80,38 80,62 50,78 20,62 20,38" stroke="rgba(129, 140, 248, 0.5)" strokeDasharray="3 3" />
          <line x1="50" y1="5" x2="50" y2="22" stroke="rgba(99, 102, 241, 0.7)" />
          <line x1="90" y1="27" x2="80" y2="38" stroke="rgba(99, 102, 241, 0.7)" />
          <line x1="90" y1="73" x2="80" y2="62" stroke="rgba(99, 102, 241, 0.7)" />
          <line x1="50" y1="95" x2="50" y2="78" stroke="rgba(99, 102, 241, 0.7)" />
          <line x1="10" y1="73" x2="20" y2="62" stroke="rgba(99, 102, 241, 0.7)" />
          <line x1="10" y1="27" x2="20" y2="38" stroke="rgba(99, 102, 241, 0.7)" />
          <circle cx="50" cy="50" r="3" fill="#818cf8" />
        </svg>
      </motion.div>

      {/* Light 3D Floating Shape 2: Double Gyroscope Rings (Top Right) */}
      <motion.div
        animate={{
          y: [12, -15, 12],
          rotateZ: [0, 360],
          rotateX: [60, 40, 60],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute top-24 right-[6%] w-32 h-32 opacity-20 hidden lg:block"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-cyan-400 fill-none" strokeWidth="1">
          <ellipse cx="50" cy="50" rx="42" ry="20" stroke="rgba(56, 189, 248, 0.6)" />
          <ellipse cx="50" cy="50" rx="30" ry="42" stroke="rgba(168, 85, 247, 0.5)" strokeDasharray="4 3" />
          <circle cx="85" cy="50" r="2.5" fill="#38bdf8" />
          <circle cx="50" cy="8" r="2.5" fill="#c084fc" />
        </svg>
      </motion.div>

      {/* Light 3D Floating Shape 3: Octahedron Diamond Crystal (Bottom Left) */}
      <motion.div
        animate={{
          y: [-8, 12, -8],
          rotateY: [0, 180, 360],
          rotateZ: [10, -10, 10],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-20 left-[8%] w-24 h-24 opacity-20 hidden md:block"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-purple-400 fill-none" strokeWidth="1.2">
          <polygon points="50,10 88,50 50,90 12,50" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(192, 132, 252, 0.7)" />
          <line x1="12" y1="50" x2="88" y2="50" stroke="rgba(192, 132, 252, 0.7)" />
          <polygon points="50,26 72,50 50,74 28,50" stroke="rgba(168, 85, 247, 0.4)" strokeDasharray="2 2" />
          <circle cx="50" cy="10" r="2" fill="#c084fc" />
          <circle cx="50" cy="90" r="2" fill="#c084fc" />
        </svg>
      </motion.div>

      {/* Light 3D Floating Shape 4: Isometric Tech Cube (Bottom Right) */}
      <motion.div
        animate={{
          y: [10, -12, 10],
          rotate: [-15, 15, -15],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-16 right-[10%] w-24 h-24 opacity-20 hidden sm:block"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-indigo-300 fill-none" strokeWidth="1.2">
          <polygon points="50,15 85,35 50,55 15,35" stroke="rgba(165, 180, 252, 0.7)" />
          <polygon points="15,35 50,55 50,95 15,75" stroke="rgba(129, 140, 248, 0.5)" />
          <polygon points="50,55 85,35 85,75 50,95" stroke="rgba(99, 102, 241, 0.6)" />
          <circle cx="50" cy="55" r="2" fill="#818cf8" />
        </svg>
      </motion.div>

      {/* Drifting Soft Particles / Stardust */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            backgroundColor: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
          }}
          animate={{
            y: [-12, 12, -12],
            x: [-6, 6, -6],
            opacity: [0.2, 0.65, 0.2],
            scale: [0.9, 1.25, 0.9],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

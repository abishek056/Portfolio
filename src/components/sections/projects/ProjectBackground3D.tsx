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

export const ProjectBackground3D: React.FC = () => {
  // Generate random light particles once
  const particles: Particle[] = useMemo(() => {
    const colors = [
      'rgba(99, 102, 241, 0.45)', // Indigo
      'rgba(56, 189, 248, 0.45)', // Sky
      'rgba(168, 85, 247, 0.45)', // Purple
      'rgba(236, 72, 153, 0.35)', // Pink
    ]
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 17 + 7) % 96 + 2,
      y: (i * 23 + 13) % 94 + 3,
      size: (i % 3) * 1.5 + 2,
      duration: 7 + (i % 6) * 2,
      delay: (i % 5) * 1.2,
      color: colors[i % colors.length],
    }))
  }, [])

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Ambient Radial Color Glows */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px]" />
      <div className="absolute top-2/3 -right-32 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[130px]" />

      {/* Cyber Grid with Elliptical Radial Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e810c_1px,transparent_1px),linear-gradient(to_bottom,#312e810c_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_50%,#000_50%,transparent_90%)] opacity-70" />

      {/* Floating 3D Geometric Shape 1: Floating Icosahedron Wireframe (Top Right) */}
      <motion.div
        animate={{
          y: [-12, 16, -12],
          rotate: [0, 180, 360],
          rotateX: [15, 35, 15],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-12 right-[8%] w-32 h-32 opacity-25 hidden md:block"
        style={{ perspective: 800 }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-indigo-400 fill-none" strokeWidth="1">
          <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" strokeDasharray="3 3" />
          <polygon points="50,15 80,32 80,68 50,85 20,68 20,32" stroke="rgba(129, 140, 248, 0.6)" />
          <line x1="50" y1="5" x2="50" y2="95" stroke="rgba(99, 102, 241, 0.4)" />
          <line x1="10" y1="25" x2="90" y2="75" stroke="rgba(99, 102, 241, 0.3)" />
          <line x1="10" y1="75" x2="90" y2="25" stroke="rgba(99, 102, 241, 0.3)" />
          <circle cx="50" cy="50" r="3" fill="#818cf8" />
        </svg>
      </motion.div>

      {/* Floating 3D Geometric Shape 2: Octahedron / Diamond Wireframe (Left Center) */}
      <motion.div
        animate={{
          y: [15, -18, 15],
          rotate: [360, 180, 0],
          rotateY: [-20, 20, -20],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-[4%] w-28 h-28 opacity-20 hidden lg:block"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-cyan-400 fill-none" strokeWidth="1.2">
          <polygon points="50,10 90,50 50,90 10,50" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="rgba(56, 189, 248, 0.7)" />
          <line x1="10" y1="50" x2="90" y2="50" stroke="rgba(56, 189, 248, 0.7)" />
          <polygon points="50,25 75,50 50,75 25,50" stroke="rgba(56, 189, 248, 0.4)" strokeDasharray="2 2" />
          <circle cx="50" cy="10" r="2.5" fill="#38bdf8" />
          <circle cx="50" cy="90" r="2.5" fill="#38bdf8" />
        </svg>
      </motion.div>

      {/* Floating 3D Geometric Shape 3: Dual Orbital Rings / Torus Wireframe (Bottom Center) */}
      <motion.div
        animate={{
          y: [-10, 14, -10],
          rotateZ: [0, 360],
          rotateX: [55, 65, 55],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-16 left-[22%] w-36 h-36 opacity-20 hidden sm:block"
      >
        <svg viewBox="0 0 120 120" className="w-full h-full stroke-purple-400 fill-none" strokeWidth="1">
          <ellipse cx="60" cy="60" rx="50" ry="24" stroke="rgba(192, 132, 252, 0.5)" />
          <ellipse cx="60" cy="60" rx="35" ry="16" stroke="rgba(168, 85, 247, 0.4)" strokeDasharray="4 4" />
          <line x1="10" y1="60" x2="110" y2="60" stroke="rgba(168, 85, 247, 0.25)" />
          <circle cx="105" cy="56" r="3" fill="#c084fc" />
          <circle cx="15" cy="64" r="2" fill="#818cf8" />
        </svg>
      </motion.div>

      {/* Floating 3D Geometric Shape 4: Isometric Cube (Bottom Right) */}
      <motion.div
        animate={{
          y: [12, -14, 12],
          rotate: [-10, 15, -10],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-28 right-[6%] w-24 h-24 opacity-20 hidden md:block"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full stroke-indigo-300 fill-none" strokeWidth="1.2">
          {/* Top Face */}
          <polygon points="50,15 85,35 50,55 15,35" stroke="rgba(165, 180, 252, 0.7)" />
          {/* Left Face */}
          <polygon points="15,35 50,55 50,95 15,75" stroke="rgba(129, 140, 248, 0.5)" />
          {/* Right Face */}
          <polygon points="50,55 85,35 85,75 50,95" stroke="rgba(99, 102, 241, 0.6)" />
          <circle cx="50" cy="55" r="2" fill="#a5b4fc" />
        </svg>
      </motion.div>

      {/* Drifting Light Particle Dust */}
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
            y: [-15, 15, -15],
            x: [-8, 8, -8],
            opacity: [0.2, 0.7, 0.2],
            scale: [0.9, 1.3, 0.9],
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

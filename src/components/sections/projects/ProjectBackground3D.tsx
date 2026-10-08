import React from 'react'
import { motion } from 'framer-motion'

export const ProjectBackground3D: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* Ambient Radial Color Glows */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px]" />
      <div className="absolute top-2/3 -right-32 w-[550px] h-[550px] rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] rounded-full bg-cyan-600/8 blur-[130px]" />

      {/* Cyber Grid with Elliptical Radial Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e810a_1px,transparent_1px),linear-gradient(to_bottom,#312e810a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_50%,#000_50%,transparent_90%)] opacity-70" />

      {/* Floating 3D Geometric Shape 1: Floating Icosahedron Wireframe (Top Right) */}
      <motion.div
        animate={{
          y: [-10, 14, -10],
          rotate: [0, 180, 360],
          rotateX: [15, 30, 15],
        }}
        transition={{
          duration: 26,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-12 right-[8%] w-28 h-28 opacity-25 hidden md:block transform-gpu"
        style={{ perspective: 800, willChange: 'transform' }}
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
          y: [12, -15, 12],
          rotate: [360, 180, 0],
          rotateY: [-15, 15, -15],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-1/2 left-[4%] w-24 h-24 opacity-20 hidden lg:block transform-gpu"
        style={{ willChange: 'transform' }}
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

      {/* Floating 3D Geometric Shape 3: Dual Orbital Rings (Bottom Center) */}
      <motion.div
        animate={{
          y: [-8, 12, -8],
          rotateZ: [0, 360],
          rotateX: [55, 65, 55],
        }}
        transition={{
          duration: 34,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="absolute bottom-16 left-[22%] w-32 h-32 opacity-20 hidden sm:block transform-gpu"
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 120 120" className="w-full h-full stroke-purple-400 fill-none" strokeWidth="1">
          <ellipse cx="60" cy="60" rx="50" ry="24" stroke="rgba(192, 132, 252, 0.5)" />
          <ellipse cx="60" cy="60" rx="35" ry="16" stroke="rgba(168, 85, 247, 0.4)" strokeDasharray="4 4" />
          <line x1="10" y1="60" x2="110" y2="60" stroke="rgba(168, 85, 247, 0.25)" />
          <circle cx="105" cy="56" r="3" fill="#c084fc" />
          <circle cx="15" cy="64" r="2" fill="#818cf8" />
        </svg>
      </motion.div>
    </div>
  )
}

export default ProjectBackground3D

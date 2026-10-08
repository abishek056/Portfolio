import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

interface NodeParticle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
}

export const ProjectBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  })

  // Canvas-based interactive spider-web constellation
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let isVisible = true
    let width = 0
    let height = 0
    let particles: NodeParticle[] = []

    const colors = [
      'rgba(129, 140, 248, ', // Indigo
      'rgba(56, 189, 248, ',  // Sky / Cyan
      'rgba(192, 132, 252, ', // Purple
    ]

    const initParticles = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = container.clientWidth
      height = container.clientHeight

      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.scale(dpr, dpr)

      // Adjust particle count dynamically based on screen width
      const count = width < 640 ? 28 : width < 1024 ? 44 : 58
      particles = []

      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 1.2,
          color: colors[i % colors.length],
        })
      }
    }

    initParticles()

    const handleResize = () => {
      initParticles()
    }

    const ro = new ResizeObserver(handleResize)
    ro.observe(container)

    // Track mouse for interactive spider-web connection
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      }
    }

    const handleMouseLeave = () => {
      mouseRef.current.active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    container.addEventListener('mouseleave', handleMouseLeave)

    const maxDistance = 115
    const mouseMaxDistance = 150

    // Animation loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      const mouse = mouseRef.current

      // 1. Update and draw connection lines (Spider-Web effect)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        // Update particle positions
        p1.x += p1.vx
        p1.y += p1.vy

        // Gentle boundary bounce with damping
        if (p1.x < 0) {
          p1.x = 0
          p1.vx *= -1
        } else if (p1.x > width) {
          p1.x = width
          p1.vx *= -1
        }
        if (p1.y < 0) {
          p1.y = 0
          p1.vy *= -1
        } else if (p1.y > height) {
          p1.y = height
          p1.vy *= -1
        }

        // Particle to particle spider-web lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * 0.22
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`
            ctx.lineWidth = 0.85
            ctx.stroke()
          }
        }

        // Mouse interactive spider-web connection
        if (mouse.active) {
          const mdx = p1.x - mouse.x
          const mdy = p1.y - mouse.y
          const mDist = Math.sqrt(mdx * mdx + mdy * mdy)

          if (mDist < mouseMaxDistance) {
            const mAlpha = (1 - mDist / mouseMaxDistance) * 0.4
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(168, 85, 247, ${mAlpha})`
            ctx.lineWidth = 1.1
            ctx.stroke()

            // Subtle attraction toward cursor
            p1.x -= (mdx / mDist) * 0.15
            p1.y -= (mdy / mDist) * 0.15
          }
        }

        // Draw particle node
        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.radius, 0, Math.PI * 2)
        ctx.fillStyle = `${p1.color}0.85)`
        ctx.shadowColor = `${p1.color}0.8)`
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0 // Reset shadow for line rendering
      }

      animationFrameId = requestAnimationFrame(render)
    }

    // Intersection observer to pause loop off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0.05 }
    )
    io.observe(container)

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('mousemove', handleMouseMove)
      container.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0"
    >
      {/* Ambient Radial Color Glows */}
      <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] rounded-full bg-indigo-600/12 blur-[130px]" />
      <div className="absolute top-2/3 -right-32 w-[550px] h-[550px] rounded-full bg-purple-600/12 blur-[140px]" />
      <div className="absolute -bottom-20 left-1/3 w-[450px] h-[450px] rounded-full bg-cyan-600/10 blur-[130px]" />

      {/* Cyber Grid with Elliptical Radial Mask */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e810a_1px,transparent_1px),linear-gradient(to_bottom,#312e810a_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_80%_65%_at_50%_50%,#000_50%,transparent_90%)] opacity-70" />

      {/* Canvas Spider-Web & Constellation Particle Network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block w-full h-full pointer-events-none"
      />

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

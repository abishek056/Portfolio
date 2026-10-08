import React, { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  baseAlpha: number
  pulsePhase: number
  pulseSpeed: number
  color: string
  glowColor: string
  layer: 0 | 1 // 0: background (slow, soft), 1: foreground (faster, brighter)
}

export const SpiderWebBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    let animationFrameId: number
    let width = 0
    let height = 0
    let particles: Particle[] = []

    const mouse = {
      x: -1000,
      y: -1000,
      active: false,
      lastMoveTime: 0,
    }

    const colors = [
      { color: 'rgba(129, 140, 248, ', glow: 'rgba(99, 102, 241, ' }, // Indigo
      { color: 'rgba(56, 189, 248, ', glow: 'rgba(14, 165, 233, ' },  // Sky / Cyan
      { color: 'rgba(192, 132, 252, ', glow: 'rgba(168, 85, 247, ' }, // Purple
      { color: 'rgba(224, 231, 255, ', glow: 'rgba(199, 210, 254, ' }, // Pearl white
    ]

    const getParticleCount = (w: number) => {
      if (w < 640) return 32       // Mobile (super fast, prevents crowding)
      if (w < 1024) return 54      // Tablet
      return 78                    // Desktop
    }

    const getMaxDistance = (w: number) => {
      if (w < 640) return 100
      if (w < 1024) return 118
      return 132
    }

    const initParticles = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight

      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      const count = getParticleCount(width)
      particles = []

      for (let i = 0; i < count; i++) {
        const isForeground = i % 3 === 0
        const c = colors[i % colors.length]
        const speedMultiplier = isForeground ? 0.38 : 0.22

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speedMultiplier,
          vy: (Math.random() - 0.5) * speedMultiplier,
          radius: isForeground ? Math.random() * 0.9 + 1.6 : Math.random() * 0.6 + 1.0,
          baseAlpha: isForeground ? Math.random() * 0.25 + 0.65 : Math.random() * 0.2 + 0.35,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: Math.random() * 0.025 + 0.015,
          color: c.color,
          glowColor: c.glow,
          layer: isForeground ? 1 : 0,
        })
      }
    }

    initParticles()

    let resizeTimer: number
    const handleResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(initParticles, 120)
    }

    window.addEventListener('resize', handleResize, { passive: true })

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
      mouse.active = true
      mouse.lastMoveTime = performance.now()
    }

    const handleMouseLeave = () => {
      mouse.active = false
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
        mouse.active = true
        mouse.lastMoveTime = performance.now()
      }
    }

    const handleTouchEnd = () => {
      mouse.active = false
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('touchmove', handleTouchMove, { passive: true })
    window.addEventListener('touchend', handleTouchEnd)

    let isDocumentVisible = true
    const handleVisibilityChange = () => {
      isDocumentVisible = document.visibilityState === 'visible'
      if (isDocumentVisible) {
        lastTime = performance.now()
        render(performance.now())
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    let lastTime = performance.now()

    const render = (now: number) => {
      if (!isDocumentVisible) return

      const delta = Math.min((now - lastTime) / 16.667, 2.5) // Normalized delta around 60fps
      lastTime = now

      // Auto-inactivate mouse after 3.5s of no motion
      if (mouse.active && now - mouse.lastMoveTime > 3500) {
        mouse.active = false
      }

      ctx.clearRect(0, 0, width, height)

      const maxDist = getMaxDistance(width)
      const maxDistSq = maxDist * maxDist
      const mouseMaxDist = width < 640 ? 115 : 155
      const mouseMaxDistSq = mouseMaxDist * mouseMaxDist

      const pLen = particles.length

      // 1. Draw Spider-Web connecting lines
      for (let i = 0; i < pLen; i++) {
        const p1 = particles[i]

        // Advance pulse phase
        p1.pulsePhase += p1.pulseSpeed * delta

        // Update positions with wrapping
        p1.x += p1.vx * delta
        p1.y += p1.vy * delta

        if (p1.x < -10) p1.x = width + 10
        else if (p1.x > width + 10) p1.x = -10

        if (p1.y < -10) p1.y = height + 10
        else if (p1.y > height + 10) p1.y = -10

        // Particle-to-particle spider-web connection
        for (let j = i + 1; j < pLen; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < maxDistSq) {
            const dist = Math.sqrt(distSq)
            const alpha = (1 - dist / maxDist) * (p1.layer === 1 && p2.layer === 1 ? 0.25 : 0.16)

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(129, 140, 248, ${alpha})`
            ctx.lineWidth = p1.layer === 1 && p2.layer === 1 ? 0.9 : 0.65
            ctx.stroke()
          }
        }

        // Mouse interactive connection & gentle magnetic pull
        if (mouse.active) {
          const mdx = p1.x - mouse.x
          const mdy = p1.y - mouse.y
          const mDistSq = mdx * mdx + mdy * mdy

          if (mDistSq < mouseMaxDistSq) {
            const mDist = Math.sqrt(mDistSq)
            const mAlpha = (1 - mDist / mouseMaxDist) * 0.42

            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(mouse.x, mouse.y)
            ctx.strokeStyle = `rgba(168, 85, 247, ${mAlpha})`
            ctx.lineWidth = 1.15
            ctx.stroke()

            // Gentle gravity pull toward cursor, with gentle buffer zone
            if (mDist > 25) {
              p1.x -= (mdx / mDist) * 0.16 * delta
              p1.y -= (mdy / mDist) * 0.16 * delta
            } else {
              p1.x += (mdx / (mDist || 1)) * 0.25 * delta
              p1.y += (mdy / (mDist || 1)) * 0.25 * delta
            }
          }
        }

        // Draw particle node with organic pulse
        const pulse = 0.85 + Math.sin(p1.pulsePhase) * 0.15
        const currentAlpha = p1.baseAlpha * pulse

        ctx.beginPath()
        ctx.arc(p1.x, p1.y, p1.radius * pulse, 0, Math.PI * 2)
        ctx.fillStyle = `${p1.color}${currentAlpha})`

        if (p1.layer === 1) {
          ctx.shadowColor = `${p1.glowColor}0.65)`
          ctx.shadowBlur = 6
        }
        ctx.fill()
        if (p1.layer === 1) {
          ctx.shadowBlur = 0 // Reset shadow immediately
        }
      }

      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none select-none z-0 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-none"
      />
    </div>
  )
}

export default SpiderWebBackground

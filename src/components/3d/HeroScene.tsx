import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

interface ParticleData {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
}

// Deterministic pseudo-random number generator for pure initialization
function pseudoRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function createConstellationData(count: number) {
  const pData: ParticleData[] = []
  const pPositions = new Float32Array(count * 3)

  for (let i = 0; i < count; i++) {
    const rx = (pseudoRandom(i * 3 + 1) - 0.5) * 14
    const ry = (pseudoRandom(i * 3 + 2) - 0.5) * 9
    const rz = (pseudoRandom(i * 3 + 3) - 0.5) * 6

    pPositions[i * 3] = rx
    pPositions[i * 3 + 1] = ry
    pPositions[i * 3 + 2] = rz

    const vx = (pseudoRandom(i * 3 + 100) - 0.5) * 0.007
    const vy = (pseudoRandom(i * 3 + 200) - 0.5) * 0.007
    const vz = (pseudoRandom(i * 3 + 300) - 0.5) * 0.005

    pData.push({
      x: rx,
      y: ry,
      z: rz,
      vx,
      vy,
      vz,
    })
  }

  const maxLines = Math.floor((count * (count - 1)) / 2)
  const lPositions = new Float32Array(maxLines * 6)
  const lColors = new Float32Array(maxLines * 6)

  return {
    particles: pData,
    initialPositions: pPositions,
    linePositions: lPositions,
    lineColors: lColors,
  }
}

// Module-level cached texture
let cachedPointTexture: THREE.Texture | null = null
function getPointTexture(): THREE.Texture | null {
  if (cachedPointTexture) return cachedPointTexture
  if (typeof document === 'undefined') return null

  const canvas = document.createElement('canvas')
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)')
    grad.addColorStop(0.2, 'rgba(165, 180, 252, 0.9)')
    grad.addColorStop(0.5, 'rgba(99, 102, 241, 0.4)')
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 64, 64)
  }
  cachedPointTexture = new THREE.CanvasTexture(canvas)
  return cachedPointTexture
}

const ConstellationNetwork: React.FC<{ count: number; maxDistance: number }> = ({
  count,
  maxDistance,
}) => {
  const pointsRef = useRef<THREE.Points>(null)
  const linesRef = useRef<THREE.LineSegments>(null)

  // React-idiomatic single-time initialization
  const [constellation] = useState(() => createConstellationData(count))
  const particlesRef = useRef<ParticleData[] | null>(null)
  if (particlesRef.current == null) {
    particlesRef.current = constellation.particles
  }

  const texture = getPointTexture()

  useFrame(() => {
    if (!pointsRef.current || !linesRef.current || !particlesRef.current) return

    const particles = particlesRef.current
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const posArr = posAttr.array as Float32Array

    // 1. Update particle positions
    for (let i = 0; i < count; i++) {
      const p = particles[i]
      p.x += p.vx
      p.y += p.vy
      p.z += p.vz

      if (p.x < -8.5 || p.x > 8.5) p.vx *= -1
      if (p.y < -5.5 || p.y > 5.5) p.vy *= -1
      if (p.z < -4.0 || p.z > 3.0) p.vz *= -1

      posArr[i * 3] = p.x
      posArr[i * 3 + 1] = p.y
      posArr[i * 3 + 2] = p.z
    }
    posAttr.needsUpdate = true

    // 2. Compute dynamic spider-web connection lines directly into geometry buffers
    const lineGeo = linesRef.current.geometry
    const linePosAttr = lineGeo.attributes.position as THREE.BufferAttribute
    const lineColAttr = lineGeo.attributes.color as THREE.BufferAttribute
    const lPosArr = linePosAttr.array as Float32Array
    const lColArr = lineColAttr.array as Float32Array

    let lineIdx = 0
    let colorIdx = 0
    const colorA = new THREE.Color('#818cf8') // Indigo
    const colorB = new THREE.Color('#c084fc') // Purple
    const mixed = new THREE.Color()

    for (let i = 0; i < count; i++) {
      const p1 = particles[i]
      for (let j = i + 1; j < count; j++) {
        const p2 = particles[j]
        const dx = p1.x - p2.x
        const dy = p1.y - p2.y
        const dz = p1.z - p2.z
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < maxDistance) {
          lPosArr[lineIdx++] = p1.x
          lPosArr[lineIdx++] = p1.y
          lPosArr[lineIdx++] = p1.z

          lPosArr[lineIdx++] = p2.x
          lPosArr[lineIdx++] = p2.y
          lPosArr[lineIdx++] = p2.z

          const alpha = 1 - dist / maxDistance
          mixed.lerpColors(colorA, colorB, (p1.x + 8) / 16)

          const r = mixed.r * alpha * 0.7
          const g = mixed.g * alpha * 0.7
          const b = mixed.b * alpha * 0.7

          lColArr[colorIdx++] = r
          lColArr[colorIdx++] = g
          lColArr[colorIdx++] = b

          lColArr[colorIdx++] = r
          lColArr[colorIdx++] = g
          lColArr[colorIdx++] = b
        }
      }
    }

    linePosAttr.needsUpdate = true
    lineColAttr.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx / 3)
  })

  return (
    <group>
      {/* Constellation Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[constellation.initialPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          map={texture || undefined}
          transparent
          alphaTest={0.01}
          opacity={0.85}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      {/* Spider-web Connecting Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[constellation.linePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[constellation.lineColors, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          vertexColors
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>
    </group>
  )
}

/** Delicate floating crystal accents with slow, calm motion */
const FloatingCrystal: React.FC<{
  position: [number, number, number]
  geometry: 'octahedron' | 'icosahedron' | 'tetrahedron'
  color: string
  size: number
  speed: number
}> = ({ position, geometry, color, size, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.15 * speed
    meshRef.current.rotation.y += delta * 0.2 * speed
  })

  return (
    <Float speed={speed * 1.5} rotationIntensity={0.6} floatIntensity={0.8} position={position}>
      <mesh ref={meshRef}>
        {geometry === 'octahedron' && <octahedronGeometry args={[size, 0]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[size, 0]} />}
        {geometry === 'tetrahedron' && <tetrahedronGeometry args={[size, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.9}
          wireframe
          transparent
          opacity={0.35}
        />
      </mesh>
    </Float>
  )
}

/** Gentle parallax responding to pointer movement */
const CameraParallax: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const targetX = (state.pointer.x * Math.PI) / 24
    const targetY = (-state.pointer.y * Math.PI) / 24
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, delta * 2)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, delta * 2)
  })

  return <group ref={groupRef}>{children}</group>
}

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.05, rootMargin: '100px' }
    )

    observer.observe(el)

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const count = isMobile ? 48 : 88
  const maxDistance = isMobile ? 2.1 : 2.5

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.0} color="#a5b4fc" />

        <CameraParallax>
          {/* Spider-Web Constellation Network */}
          <ConstellationNetwork count={count} maxDistance={maxDistance} />

          {/* Delicate slow ambient wireframe crystals */}
          <FloatingCrystal
            position={[-5.0, 2.2, -1.5]}
            geometry="icosahedron"
            color="#818cf8"
            size={0.7}
            speed={0.8}
          />
          <FloatingCrystal
            position={[5.2, -1.8, -1.0]}
            geometry="octahedron"
            color="#c084fc"
            size={0.65}
            speed={0.9}
          />
          <FloatingCrystal
            position={[4.5, 2.5, -2.0]}
            geometry="tetrahedron"
            color="#38bdf8"
            size={0.55}
            speed={0.7}
          />
          {!isMobile && (
            <FloatingCrystal
              position={[-4.2, -2.6, -1.2]}
              geometry="octahedron"
              color="#a855f7"
              size={0.5}
              speed={1.0}
            />
          )}
        </CameraParallax>
      </Canvas>
    </div>
  )
}

export default HeroScene

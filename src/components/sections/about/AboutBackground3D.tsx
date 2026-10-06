import React, { useRef, useState, useEffect, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/** Gentle Wireframe Polyhedron with subtle rotation and floating */
const FloatingWireframeShape: React.FC<{
  position: [number, number, number]
  geometry: 'octahedron' | 'icosahedron' | 'dodecahedron' | 'torus'
  color: string
  size: number
  speed?: number
  wireframeLinewidth?: number
}> = ({ position, geometry, color, size, speed = 1 }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.12 * speed
    meshRef.current.rotation.y += delta * 0.16 * speed
    meshRef.current.rotation.z += delta * 0.08 * speed
  })

  return (
    <Float
      speed={speed * 1.6}
      rotationIntensity={0.8}
      floatIntensity={1.0}
      position={position}
    >
      <mesh ref={meshRef}>
        {geometry === 'octahedron' && <octahedronGeometry args={[size, 0]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[size, 0]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[size, 0]} />}
        {geometry === 'torus' && <torusGeometry args={[size, size * 0.35, 12, 24]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.32}
        />
      </mesh>
    </Float>
  )
}

/** Soft floating particles (stardust) with drifting positions */
const SoftFloatingParticles: React.FC<{ count: number }> = ({ count }) => {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6

      vel[i * 3] = (Math.random() - 0.5) * 0.004
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.005
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.003
    }
    return [pos, vel]
  }, [count])

  useFrame(() => {
    if (!pointsRef.current) return
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute
    const pos = posAttr.array as Float32Array

    for (let i = 0; i < count; i++) {
      pos[i * 3] += velocities[i * 3]
      pos[i * 3 + 1] += velocities[i * 3 + 1]
      pos[i * 3 + 2] += velocities[i * 3 + 2]

      if (pos[i * 3] < -8.5 || pos[i * 3] > 8.5) velocities[i * 3] *= -1
      if (pos[i * 3 + 1] < -5.5 || pos[i * 3 + 1] > 5.5) velocities[i * 3 + 1] *= -1
      if (pos[i * 3 + 2] < -3.5 || pos[i * 3 + 2] > 3.5) velocities[i * 3 + 2] *= -1
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#a5b4fc"
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

/** Gentle parallax responding to pointer movement */
const CameraParallax: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const targetX = (state.pointer.x * Math.PI) / 30
    const targetY = (-state.pointer.y * Math.PI) / 30
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, delta * 2)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, delta * 2)
  })

  return <group ref={groupRef}>{children}</group>
}

export const AboutBackground3D: React.FC = () => {
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
      { threshold: 0.05, rootMargin: '120px' }
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

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    >
      {/* Ambient Radial Atmospheric Glows */}
      <div className="absolute top-1/4 -left-20 w-[460px] h-[460px] rounded-full bg-indigo-600/10 blur-[130px]" />
      <div className="absolute top-1/3 -right-24 w-[480px] h-[480px] rounded-full bg-purple-600/10 blur-[140px]" />
      <div className="absolute -bottom-24 left-1/3 w-[450px] h-[450px] rounded-full bg-cyan-600/5 blur-[120px]" />

      {/* Subtle Tech Grid overlay aligned with Hero */}
      <div className="absolute inset-0 bg-[radial-gradient(#4f46e512_1px,transparent_1px)] [background-size:2.2rem_2.2rem] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_50%,#000_60%,transparent_100%)] opacity-70" />

      {/* 3D WebGL Canvas Layer */}
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
        <directionalLight position={[5, 5, 5]} intensity={0.9} color="#a5b4fc" />

        <CameraParallax>
          {/* Soft floating particle dust */}
          <SoftFloatingParticles count={isMobile ? 28 : 55} />

          {/* Light 3D Floating Geometric Shapes in perimeter */}
          {/* Top-Left: Dodecahedron */}
          <FloatingWireframeShape
            position={[-5.4, 2.2, -1.2]}
            geometry="dodecahedron"
            color="#818cf8"
            size={0.7}
            speed={0.75}
          />

          {/* Top-Right: Icosahedron */}
          <FloatingWireframeShape
            position={[5.5, 2.4, -1.5]}
            geometry="icosahedron"
            color="#38bdf8"
            size={0.65}
            speed={0.85}
          />

          {/* Bottom-Right: Octahedron */}
          <FloatingWireframeShape
            position={[5.2, -2.2, -1.0]}
            geometry="octahedron"
            color="#c084fc"
            size={0.6}
            speed={0.9}
          />

          {/* Bottom-Left (Desktop only): Torus Ring */}
          {!isMobile && (
            <FloatingWireframeShape
              position={[-5.0, -2.4, -1.4]}
              geometry="torus"
              color="#a855f7"
              size={0.55}
              speed={0.7}
            />
          )}
        </CameraParallax>
      </Canvas>
    </div>
  )
}

export default AboutBackground3D

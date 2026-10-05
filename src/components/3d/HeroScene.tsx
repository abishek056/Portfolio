import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveShapeProps {
  position: [number, number, number]
  geometry: 'octahedron' | 'dodecahedron' | 'torusKnot' | 'box' | 'icosahedron'
  color: string
  emissive: string
  scale?: number
  speed?: number
  rotationIntensity?: number
  floatIntensity?: number
}

const InteractiveShape: React.FC<InteractiveShapeProps> = ({
  position,
  geometry,
  color,
  emissive,
  scale = 1,
  speed = 2,
  rotationIntensity = 1.5,
  floatIntensity = 1.5,
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.4
    meshRef.current.rotation.y += delta * 0.5
    // Smooth scale on hover
    const targetScale = hovered ? scale * 1.25 : scale
    meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8)
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
      position={position}
    >
      <mesh
        ref={meshRef}
        scale={scale}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        {geometry === 'octahedron' && <octahedronGeometry args={[0.9, 0]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[0.8, 0]} />}
        {geometry === 'torusKnot' && <torusKnotGeometry args={[0.6, 0.2, 64, 12]} />}
        {geometry === 'box' && <boxGeometry args={[0.9, 0.9, 0.9]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[0.85, 0]} />}

        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          emissive={emissive}
          emissiveIntensity={hovered ? 1.2 : 0.4}
          roughness={0.2}
          metalness={0.85}
        />
      </mesh>
    </Float>
  )
}

const CentralCore: React.FC<{ isMobile?: boolean }> = ({ isMobile }) => {
  const coreRef = useRef<THREE.Mesh>(null)
  const wireframeRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (coreRef.current) {
      coreRef.current.rotation.y = t * 0.25
      coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.2
    }
    if (wireframeRef.current) {
      wireframeRef.current.rotation.y = -t * 0.35
      wireframeRef.current.rotation.z = t * 0.15
    }
    if (ring1Ref.current) {
      ring1Ref.current.rotation.x = t * 0.4
      ring1Ref.current.rotation.y = t * 0.3
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = -t * 0.3
      ring2Ref.current.rotation.z = t * 0.4
    }
  })

  const baseScale = isMobile ? 1.1 : 1.35
  const hoverScale = isMobile ? 1.2 : 1.45

  return (
    <group
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
    >
      {/* Dynamic distorting inner core - optimized geometry detail 3 */}
      <Float speed={2.5} rotationIntensity={1} floatIntensity={1.2}>
        <mesh ref={coreRef} scale={hovered ? hoverScale : baseScale}>
          <icosahedronGeometry args={[1, 3]} />
          <MeshDistortMaterial
            color={hovered ? '#a855f7' : '#6366f1'}
            emissive="#312e81"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.9}
            distort={0.4}
            speed={2.2}
          />
        </mesh>

        {/* Outer futuristic geodesic wireframe lattice */}
        <mesh ref={wireframeRef} scale={isMobile ? 1.45 : 1.75}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#38bdf8"
            emissive="#0284c7"
            emissiveIntensity={0.8}
            wireframe
            transparent
            opacity={hovered ? 0.65 : 0.35}
          />
        </mesh>

        {/* Orbiting tilted ring 1 */}
        <mesh ref={ring1Ref}>
          <torusGeometry args={[isMobile ? 1.7 : 2.0, 0.02, 12, 64]} />
          <meshStandardMaterial
            color="#818cf8"
            emissive="#6366f1"
            emissiveIntensity={1}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>

        {/* Orbiting tilted ring 2 */}
        <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0, Math.PI / 4]}>
          <torusGeometry args={[isMobile ? 1.9 : 2.3, 0.016, 12, 64]} />
          <meshStandardMaterial
            color="#c084fc"
            emissive="#a855f7"
            emissiveIntensity={0.9}
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
      </Float>
    </group>
  )
}

const InteractiveRig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Smooth lerp following cursor pointer (-1 to 1)
    const targetX = (state.pointer.x * Math.PI) / 9
    const targetY = (-state.pointer.y * Math.PI) / 9

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, delta * 3)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, delta * 3)
  })

  return <group ref={groupRef}>{children}</group>
}

export const HeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Track viewport visibility to pause frameloop when scrolled offscreen
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

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[360px] sm:min-h-[460px] lg:min-h-[580px] flex items-center justify-center"
    >
      {/* Background glow layers */}
      <div className="absolute inset-0 bg-radial from-indigo-500/15 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      <Canvas
        camera={{ position: [0, 0, isMobile ? 6.8 : 6.2], fov: isMobile ? 48 : 45 }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
        performance={{ min: 0.5 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        {/* Optimized Lighting Setup */}
        <ambientLight intensity={0.7} color="#e0e7ff" />
        <directionalLight position={[8, 8, 4]} intensity={1.6} color="#bae6fd" />
        <directionalLight position={[-8, -8, -4]} intensity={0.9} color="#c084fc" />

        {/* Accent Point Lights */}
        <pointLight position={[3.5, 2.5, 2]} intensity={3.0} color="#06b6d4" distance={12} />
        <pointLight position={[-3.5, -2.5, 2]} intensity={3.5} color="#a855f7" distance={12} />

        <InteractiveRig>
          {/* Central Complex */}
          <CentralCore isMobile={isMobile} />

          {/* Floating Geometric Satellites */}
          <InteractiveShape
            position={[isMobile ? 1.8 : 2.4, 1.3, -0.6]}
            geometry="octahedron"
            color="#38bdf8"
            emissive="#0284c7"
            scale={isMobile ? 0.45 : 0.55}
            speed={2.2}
            rotationIntensity={1.8}
          />

          <InteractiveShape
            position={[isMobile ? -1.8 : -2.4, -1.1, 0.4]}
            geometry="dodecahedron"
            color="#c084fc"
            emissive="#9333ea"
            scale={isMobile ? 0.4 : 0.48}
            speed={1.9}
            rotationIntensity={1.6}
          />

          <InteractiveShape
            position={[isMobile ? 1.6 : 2.1, -1.3, -0.4]}
            geometry="torusKnot"
            color="#818cf8"
            emissive="#4f46e5"
            scale={isMobile ? 0.26 : 0.32}
            speed={2.4}
            rotationIntensity={1.4}
          />

          {!isMobile && (
            <>
              <InteractiveShape
                position={[-2.0, 1.6, -0.8]}
                geometry="box"
                color="#2dd4bf"
                emissive="#0d9488"
                scale={0.42}
                speed={1.7}
                rotationIntensity={1.3}
              />

              <InteractiveShape
                position={[0.3, 2.3, -1.2]}
                geometry="icosahedron"
                color="#f472b6"
                emissive="#db2777"
                scale={0.38}
                speed={2.6}
                rotationIntensity={2.0}
              />
            </>
          )}

          {/* Optimized Cosmic particles & starfield */}
          <Sparkles
            count={isMobile ? 25 : 45}
            scale={isMobile ? 6 : 8.5}
            size={2.2}
            speed={0.3}
            color="#818cf8"
            opacity={0.7}
          />
          <Sparkles
            count={isMobile ? 18 : 30}
            scale={isMobile ? 5 : 6.5}
            size={1.8}
            speed={0.4}
            color="#38bdf8"
            opacity={0.6}
          />
        </InteractiveRig>
      </Canvas>

      {/* Floating HUD badge */}
      <div className="absolute bottom-3 right-4 px-3 py-1 rounded-full bg-neutral-900/80 border border-neutral-700/60 backdrop-blur-md text-[11px] font-mono text-neutral-300 flex items-center gap-2 pointer-events-none select-none">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        Interactive 3D Space
      </div>
    </div>
  )
}

export default HeroScene

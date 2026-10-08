import React, { useRef, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

/** Delicate floating crystal accents with smooth rotation & floating */
const FloatingCrystal: React.FC<{
  position: [number, number, number]
  geometry: 'octahedron' | 'icosahedron' | 'tetrahedron' | 'dodecahedron'
  color: string
  size: number
  speed: number
}> = ({ position, geometry, color, size, speed }) => {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x += delta * 0.12 * speed
    meshRef.current.rotation.y += delta * 0.18 * speed
  })

  return (
    <Float
      speed={speed * 1.5}
      rotationIntensity={0.6}
      floatIntensity={0.8}
      position={position}
    >
      <mesh ref={meshRef}>
        {geometry === 'octahedron' && <octahedronGeometry args={[size, 0]} />}
        {geometry === 'icosahedron' && <icosahedronGeometry args={[size, 0]} />}
        {geometry === 'tetrahedron' && <tetrahedronGeometry args={[size, 0]} />}
        {geometry === 'dodecahedron' && <dodecahedronGeometry args={[size, 0]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.45}
          roughness={0.2}
          metalness={0.85}
          wireframe
          transparent
          opacity={0.38}
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

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden"
    >
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
        <directionalLight position={[5, 5, 5]} intensity={1.1} color="#a5b4fc" />

        <CameraParallax>
          {/* Delicate 3D Wireframe Crystals Floating in Perimeter */}
          {/* Top-Left: Icosahedron (Indigo) */}
          <FloatingCrystal
            position={[-5.0, 2.2, -1.5]}
            geometry="icosahedron"
            color="#818cf8"
            size={0.7}
            speed={0.8}
          />

          {/* Top-Right: Dodecahedron (Cyan) */}
          <FloatingCrystal
            position={[5.2, 2.3, -1.8]}
            geometry="dodecahedron"
            color="#38bdf8"
            size={0.65}
            speed={0.75}
          />

          {/* Bottom-Right: Octahedron (Purple) */}
          <FloatingCrystal
            position={[5.0, -2.0, -1.0]}
            geometry="octahedron"
            color="#c084fc"
            size={0.6}
            speed={0.9}
          />

          {/* Bottom-Left (Desktop only): Tetrahedron (Violet) */}
          {!isMobile && (
            <FloatingCrystal
              position={[-4.5, -2.4, -1.2]}
              geometry="tetrahedron"
              color="#a855f7"
              size={0.55}
              speed={0.85}
            />
          )}
        </CameraParallax>
      </Canvas>
    </div>
  )
}

export default HeroScene

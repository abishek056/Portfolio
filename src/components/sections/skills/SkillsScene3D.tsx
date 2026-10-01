import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sparkles } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingTechOrbProps {
  position: [number, number, number]
  color: string
  emissive: string
  geometryType: 'sphere' | 'octahedron' | 'dodecahedron' | 'torus' | 'icosahedron'
  scale?: number
  speed?: number
  label?: string
  rotationIntensity?: number
  floatIntensity?: number
}

const FloatingTechOrb: React.FC<FloatingTechOrbProps> = ({
  position,
  color,
  emissive,
  geometryType,
  scale = 0.8,
  speed = 1.8,
  rotationIntensity = 1.2,
  floatIntensity = 1.2,
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.35
      meshRef.current.rotation.y += delta * 0.45
      const targetScale = hovered ? scale * 1.3 : scale
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8)
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.6
      ringRef.current.rotation.x += delta * 0.3
    }
  })

  return (
    <Float
      speed={speed}
      rotationIntensity={rotationIntensity}
      floatIntensity={floatIntensity}
      position={position}
    >
      <group
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
        }}
        onPointerOut={() => setHovered(false)}
      >
        <mesh ref={meshRef} scale={scale}>
          {geometryType === 'sphere' && <sphereGeometry args={[0.7, 32, 32]} />}
          {geometryType === 'octahedron' && <octahedronGeometry args={[0.75, 0]} />}
          {geometryType === 'dodecahedron' && <dodecahedronGeometry args={[0.7, 0]} />}
          {geometryType === 'torus' && <torusGeometry args={[0.55, 0.2, 16, 32]} />}
          {geometryType === 'icosahedron' && <icosahedronGeometry args={[0.72, 0]} />}

          <meshStandardMaterial
            color={hovered ? '#ffffff' : color}
            emissive={emissive}
            emissiveIntensity={hovered ? 1.5 : 0.6}
            roughness={0.25}
            metalness={0.8}
            wireframe={false}
          />
        </mesh>

        {/* Orbiting thin wireframe ring for selected orbs */}
        {(geometryType === 'sphere' || geometryType === 'icosahedron') && (
          <mesh ref={ringRef} scale={scale * 1.4}>
            <torusGeometry args={[0.85, 0.015, 12, 48]} />
            <meshStandardMaterial
              color={color}
              emissive={emissive}
              emissiveIntensity={0.8}
              transparent
              opacity={hovered ? 0.9 : 0.4}
            />
          </mesh>
        )}
      </group>
    </Float>
  )
}

const SkillsRig: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((state, delta) => {
    if (!groupRef.current) return
    // Very gentle pointer drift
    const targetX = (state.pointer.x * Math.PI) / 16
    const targetY = (-state.pointer.y * Math.PI) / 16
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetX, delta * 2)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetY, delta * 2)
  })

  return <group ref={groupRef}>{children}</group>
}

export const SkillsScene3D: React.FC = () => {
  const orbs = useMemo(
    () => [
      // React / Frontend Orb (Cyan Sphere)
      {
        position: [-3.8, 0.8, -0.5] as [number, number, number],
        color: '#06b6d4',
        emissive: '#0891b2',
        geometryType: 'sphere' as const,
        scale: 0.85,
        speed: 2.0,
      },
      // Laravel & PHP Node (Indigo/Crimson Dodecahedron)
      {
        position: [3.8, 1.0, -0.6] as [number, number, number],
        color: '#f43f5e',
        emissive: '#e11d48',
        geometryType: 'dodecahedron' as const,
        scale: 0.8,
        speed: 1.8,
      },
      // Django & Python Crystal (Emerald Octahedron)
      {
        position: [-2.2, -1.2, 0.5] as [number, number, number],
        color: '#10b981',
        emissive: '#059669',
        geometryType: 'octahedron' as const,
        scale: 0.85,
        speed: 2.2,
      },
      // TypeScript / JS Torus Ring (Sky Blue)
      {
        position: [2.3, -1.3, 0.3] as [number, number, number],
        color: '#38bdf8',
        emissive: '#0284c7',
        geometryType: 'torus' as const,
        scale: 0.75,
        speed: 1.7,
      },
      // Database & Systems Icosahedron (Violet / Indigo Core)
      {
        position: [0, 1.4, -0.8] as [number, number, number],
        color: '#818cf8',
        emissive: '#4f46e5',
        geometryType: 'icosahedron' as const,
        scale: 0.95,
        speed: 1.9,
      },
      // Tools & Cloud Amber Sphere
      {
        position: [0, -1.5, -0.5] as [number, number, number],
        color: '#fbbf24',
        emissive: '#d97706',
        geometryType: 'sphere' as const,
        scale: 0.65,
        speed: 2.4,
      },
    ],
    []
  )

  return (
    <div className="w-full h-44 sm:h-52 md:h-60 relative overflow-hidden select-none">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 48 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[5, 6, 5]} intensity={1.4} color="#e0e7ff" />
        <pointLight position={[-6, -4, 4]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[6, 4, 3]} intensity={1.2} color="#a855f7" />

        <SkillsRig>
          {orbs.map((orb, idx) => (
            <FloatingTechOrb key={idx} {...orb} />
          ))}

          {/* Soft floating luminous stardust particles */}
          <Sparkles
            count={32}
            scale={11}
            size={2.2}
            speed={0.4}
            opacity={0.5}
            color="#a5b4fc"
          />
        </SkillsRig>
      </Canvas>
    </div>
  )
}
export default SkillsScene3D

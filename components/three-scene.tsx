"use client"

import type React from "react"

import { useRef, Suspense, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Float, Sphere, Box, Torus, Octahedron, Stars, Sparkles } from "@react-three/drei"
import type * as THREE from "three"

// Particle System Component
function ParticleSystem() {
  const particlesRef = useRef<THREE.Points>(null)
  const particleCount = 1000

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.05
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.075
    }
  })

  const particles = new Float32Array(particleCount * 3)
  for (let i = 0; i < particleCount * 3; i++) {
    particles[i] = (Math.random() - 0.5) * 50
  }

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={particles} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#8b5cf6" transparent opacity={0.6} />
    </points>
  )
}

// Advanced Spaceship Component
function AdvancedSpaceship({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Group>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
    }
  })

  return (
    <group ref={meshRef} position={position} scale={[scale, scale, scale]}>
      {/* Main hull */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.6, 3, 8]} />
        <meshStandardMaterial color="#4a5568" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Wings */}
      <mesh position={[-1.2, 0, -0.3]} rotation={[0, 0, Math.PI / 8]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh position={[1.2, 0, -0.3]} rotation={[0, 0, -Math.PI / 8]}>
        <boxGeometry args={[1.5, 0.1, 0.8]} />
        <meshStandardMaterial color="#2d3748" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Cockpit */}
      <mesh position={[0, 0.1, 1.2]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#1a202c" metalness={0.9} roughness={0.05} />
      </mesh>

      {/* Engine glow */}
      <mesh position={[0, 0, -1.8]}>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial color="#00d4ff" emissive="#0099cc" emissiveIntensity={2} />
      </mesh>

      {/* Wing tip lights */}
      <mesh position={[-1.8, 0, -0.3]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#ff0040" emissive="#ff0040" emissiveIntensity={1} />
      </mesh>
      <mesh position={[1.8, 0, -0.3]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#40ff00" emissive="#40ff00" emissiveIntensity={1} />
      </mesh>
    </group>
  )
}

// Floating 3D Text - Simplified to avoid font loading issues
function Floating3DText({
  text,
  position,
  color = "#8b5cf6",
}: { text: string; position: [number, number, number]; color?: string }) {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh position={position}>
        <boxGeometry args={[2, 0.5, 0.2]} />
        <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
      </mesh>
    </Float>
  )
}

// Error Boundary Component
function SceneErrorBoundary({ children }: { children: React.ReactNode }) {
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const handleError = () => setHasError(true)
    window.addEventListener("error", handleError)
    return () => window.removeEventListener("error", handleError)
  }, [])

  if (hasError) {
    return null // Render nothing if there's an error
  }

  return <>{children}</>
}

// Main Three.js Scene Component
export default function ThreeScene() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <SceneErrorBoundary>
        <Canvas camera={{ position: [0, 0, 15], fov: 75 }} onError={() => console.warn("Canvas error occurred")}>
          <Suspense fallback={null}>
            {/* Background + Lighting */}
            <color attach="background" args={["#020617"]} />
            <fog attach="fog" args={["#020617", 10, 50]} />
            <ambientLight intensity={0.3} />
            <pointLight position={[10, 10, 10]} intensity={1} color="#8b5cf6" />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color="#3b82f6" />
            <pointLight position={[0, 15, 0]} intensity={0.6} color="#ec4899" />

            {/* Particle System */}
            <ParticleSystem />

            {/* Stars */}
            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

            {/* Floating Spaceships */}
            <AdvancedSpaceship position={[-12, 3, -20]} scale={0.8} />
            <AdvancedSpaceship position={[15, -2, -25]} scale={1.2} />
            <AdvancedSpaceship position={[8, 8, -30]} scale={0.6} />
            <AdvancedSpaceship position={[-8, -6, -18]} scale={1} />

            {/* Geometric Shapes */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[-8, 4, -15]}>
              <Box args={[1, 1, 1]}>
                <meshStandardMaterial color="#8b5cf6" metalness={0.8} roughness={0.2} transparent opacity={0.7} />
              </Box>
            </Float>

            <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} position={[10, -3, -12]}>
              <Sphere args={[0.8, 32, 32]}>
                <meshStandardMaterial color="#3b82f6" metalness={0.6} roughness={0.3} transparent opacity={0.6} />
              </Sphere>
            </Float>

            <Float speed={1.8} rotationIntensity={2} floatIntensity={1} position={[6, 6, -18]}>
              <Torus args={[1, 0.3, 16, 100]}>
                <meshStandardMaterial color="#ec4899" metalness={0.7} roughness={0.2} transparent opacity={0.5} />
              </Torus>
            </Float>

            <Float speed={1.2} rotationIntensity={1.5} floatIntensity={2.5} position={[-6, -4, -14]}>
              <Octahedron args={[1]}>
                <meshStandardMaterial color="#f59e0b" metalness={0.9} roughness={0.1} transparent opacity={0.6} />
              </Octahedron>
            </Float>

            {/* Simplified 3D Text Elements */}
            <Floating3DText text="DEV" position={[-15, 8, -25]} color="#10b981" />
            <Floating3DText text="OPS" position={[12, -8, -22]} color="#f59e0b" />
            <Floating3DText text="AWS" position={[18, 5, -28]} color="#ff6b35" />

            {/* Sparkles */}
            <Sparkles count={100} scale={[20, 20, 20]} size={2} speed={0.4} />
          </Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  )
}

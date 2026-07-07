import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture, Float } from '@react-three/drei'
import * as THREE from 'three'

/* ─── A single floating leaf with real 3D rotation and touch/cursor interaction ─── */
function Leaf({ texturePath, position, scale, rotSpeed, floatSpeed, floatRange, parallaxFactor }) {
  const ref = useRef()
  const texture = useTexture(texturePath)
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()

    // Full 3D tumbling
    ref.current.rotation.x = Math.sin(t * rotSpeed * 0.3 + phase) * 0.6
    ref.current.rotation.y = Math.cos(t * rotSpeed * 0.2 + phase * 1.3) * 0.8
    ref.current.rotation.z += rotSpeed * 0.001

    // Drifting based on touch/cursor coordinates
    const targetX = position[0] + state.pointer.x * parallaxFactor * 0.5
    const targetY = position[1] + state.pointer.y * parallaxFactor * 0.5
    ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, targetX, 0.02)
    ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, targetY, 0.02)
  })

  return (
    <Float
      speed={floatSpeed}
      rotationIntensity={0}
      floatIntensity={floatRange}
      floatingRange={[-0.2, 0.2]}
    >
      <mesh ref={ref} scale={scale}>
        <planeGeometry args={[2, 2, 1, 1]} />
        <meshStandardMaterial
          map={texture}
          transparent
          opacity={0.58}
          depthWrite={false}
          side={THREE.DoubleSide}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </Float>
  )
}

/* ─── Glowing orb for depth and atmosphere ─── */
function Orb({ position, color, size }) {
  const ref = useRef()
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.getElapsedTime()
    ref.current.position.y = position[1] + Math.sin(t * 0.4 + phase) * 0.3
    ref.current.position.x = position[0] + Math.cos(t * 0.3 + phase) * 0.15
    // Pulse the emissive intensity
    ref.current.material.emissiveIntensity = 0.8 + Math.sin(t * 0.6 + phase) * 0.4
  })

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={1.0}
        transparent
        opacity={0.35}
        roughness={1}
      />
    </mesh>
  )
}

/* ─── Full 3D scene ─── */
function Scene() {
  const leaves = useMemo(() => [
    // Near leaves — larger, more visible rotation & high parallax
    { texturePath: '/ILH leaf - Green.png', position: [-3, 2, -3], scale: 1.8, rotSpeed: 0.5, floatSpeed: 1.2, floatRange: 1.5, parallaxFactor: 0.8 },
    { texturePath: '/ILH leaf - Blue.png', position: [3.5, 3, -4], scale: 2.2, rotSpeed: -0.4, floatSpeed: 1.0, floatRange: 1.2, parallaxFactor: 0.9 },
    // Mid leaves — moderate parallax
    { texturePath: '/ILH leaf - Green.png', position: [3, -2.5, -5], scale: 1.5, rotSpeed: 0.6, floatSpeed: 0.8, floatRange: 1.0, parallaxFactor: 0.5 },
    { texturePath: '/ILH leaf - Blue.png', position: [-3.5, -3, -4.5], scale: 2.0, rotSpeed: -0.35, floatSpeed: 1.1, floatRange: 1.3, parallaxFactor: 0.6 },
    // Far leaves — low parallax for depth depth
    { texturePath: '/ILH leaf - Green.png', position: [-1, 4, -7], scale: 3.0, rotSpeed: 0.2, floatSpeed: 0.6, floatRange: 0.8, parallaxFactor: 0.2 },
    { texturePath: '/ILH leaf - Blue.png', position: [1.5, -4.5, -6], scale: 2.5, rotSpeed: -0.25, floatSpeed: 0.7, floatRange: 0.9, parallaxFactor: 0.3 },
    { texturePath: '/ILH leaf - Blue.png', position: [-4, 0, -8], scale: 3.5, rotSpeed: 0.15, floatSpeed: 0.5, floatRange: 0.6, parallaxFactor: 0.15 },
  ], [])

  const orbs = useMemo(() => [
    { position: [-2.5, 1.5, -3], color: '#004679', size: 0.4 },
    { position: [3, -1, -4], color: '#46946f', size: 0.35 },
    { position: [0, 3, -5], color: '#38bdf8', size: 0.25 },
    { position: [-1, -3.5, -3.5], color: '#004679', size: 0.3 },
    { position: [2, 2.5, -6], color: '#46946f', size: 0.5 },
    { position: [-3, -1, -5], color: '#38bdf8', size: 0.2 },
  ], [])

  return (
    <>
      {/* Ambient base — low so directional lights create contrast */}
      <ambientLight intensity={0.3} color="#1a2744" />

      {/* Key light — blue tint from upper right */}
      <directionalLight position={[5, 4, 3]} intensity={1.2} color="#4a90d9" />

      {/* Fill light — green tint from lower left */}
      <directionalLight position={[-4, -2, 2]} intensity={0.6} color="#46946f" />

      {/* Rim/back light for depth separation */}
      <pointLight position={[0, 0, -5]} intensity={1.5} color="#0a4a7a" distance={15} decay={2} />

      {/* Accent spot lights */}
      <pointLight position={[-3, 3, -2]} intensity={0.8} color="#38bdf8" distance={10} decay={2} />
      <pointLight position={[3, -3, -2]} intensity={0.6} color="#46946f" distance={10} decay={2} />

      {/* Fog for depth perception */}
      <fog attach="fog" args={['#060d1f', 4, 14]} />

      {leaves.map((leaf, i) => <Leaf key={`l-${i}`} {...leaf} />)}
      {orbs.map((orb, i) => <Orb key={`o-${i}`} {...orb} />)}
    </>
  )
}

export default function LeafCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-[#060d1f]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{ antialias: true, alpha: false, powerPreference: 'default' }}
        dpr={[1, 1.5]}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

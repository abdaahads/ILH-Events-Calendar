import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function FloatingLeaf({ texturePath, initialPosition, scale, speed, parallaxFactor, rotationSpeed, isDark }) {
  const meshRef = useRef()
  const texture = useTexture(texturePath)
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  // Very subtle in light mode so the pearl white stays clean
  const opacity = isDark ? 0.15 : 0.06

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z += rotationSpeed * 0.0005
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15 + phase) * 0.08
    const floatOffset = Math.sin(state.clock.getElapsedTime() * speed * 0.3 + phase) * 0.1
    const targetX = initialPosition[0] + state.pointer.x * parallaxFactor * 0.35
    const targetY = initialPosition[1] + state.pointer.y * parallaxFactor * 0.35 + floatOffset
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.02)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.02)
  })

  return (
    <mesh ref={meshRef} position={initialPosition} scale={scale}>
      <planeGeometry args={[2.5, 2.5]} />
      <meshBasicMaterial map={texture} transparent opacity={opacity} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Scene({ isDark }) {
  const leaves = useMemo(() => [
    { texturePath: '/ILH leaf - Green.png', initialPosition: [-5, 3, -7], scale: 2.8, speed: 0.15, parallaxFactor: 0.5, rotationSpeed: 0.15 },
    { texturePath: '/ILH leaf - Blue.png', initialPosition: [5, 4, -8], scale: 3.2, speed: 0.12, parallaxFactor: 0.6, rotationSpeed: -0.12 },
    { texturePath: '/ILH leaf - Green.png', initialPosition: [4.5, -3, -6], scale: 2.2, speed: 0.18, parallaxFactor: 0.4, rotationSpeed: 0.2 },
    { texturePath: '/ILH leaf - Blue.png', initialPosition: [-4.5, -4, -7.5], scale: 2.8, speed: 0.13, parallaxFactor: 0.55, rotationSpeed: -0.15 },
    { texturePath: '/ILH leaf - Green.png', initialPosition: [-1.5, 5, -9], scale: 3.6, speed: 0.1, parallaxFactor: 0.7, rotationSpeed: 0.08 },
    { texturePath: '/ILH leaf - Blue.png', initialPosition: [2, -5.5, -8.5], scale: 3.0, speed: 0.11, parallaxFactor: 0.6, rotationSpeed: -0.18 }
  ], [])

  return (
    <>
      <ambientLight intensity={isDark ? 1.5 : 2.5} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.8 : 1.2} />
      {leaves.map((leaf, i) => <FloatingLeaf key={i} {...leaf} isDark={isDark} />)}
    </>
  )
}

export default function LeafCanvas({ isDark }) {
  const bgClass = isDark
    ? "bg-gradient-to-br from-[#040915] via-[#071021] to-[#0a1128]"
    : "bg-gradient-to-br from-[#faf9f7] via-[#f5f3ef] to-[#f0ede8]"

  return (
    <div className={`fixed inset-0 w-full h-full -z-10 transition-colors duration-700 ${bgClass}`}>
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: false }}>
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  )
}

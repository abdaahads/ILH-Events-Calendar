import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function FloatingLeaf({ texturePath, initialPosition, scale, speed, parallaxFactor, rotationSpeed, isDark }) {
  const meshRef = useRef()
  const texture = useTexture(texturePath)

  // Random phase for a natural floating animation
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  // Dynamic opacity based on theme: light mode needs extremely subtle leaves for contrast
  const opacity = isDark ? 0.18 : 0.08

  useFrame((state) => {
    if (!meshRef.current) return

    // 1. Slow, continuous rotation (reduced speed)
    meshRef.current.rotation.z += rotationSpeed * 0.0008
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2 + phase) * 0.1

    // 2. Subtle auto-float hover effect (reduced speed)
    const floatOffset = Math.sin(state.clock.getElapsedTime() * speed * 0.4 + phase) * 0.15

    // 3. Parallax based on cursor position (reduced scale factor)
    const targetX = initialPosition[0] + state.pointer.x * parallaxFactor * 0.5
    const targetY = initialPosition[1] + state.pointer.y * parallaxFactor * 0.5 + floatOffset

    // Lerp mesh positions for smooth responsiveness
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.03)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.03)
  })

  return (
    <mesh ref={meshRef} position={initialPosition} scale={scale}>
      <planeGeometry args={[2.5, 2.5]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        opacity={opacity} 
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Scene({ isDark }) {
  // Define instances of floating leaves pushed further back on Z axis (from -5 to -8)
  const leaves = useMemo(() => [
    {
      texturePath: '/ILH leaf - Green.png',
      initialPosition: [-5, 3, -6],
      scale: 2.5,
      speed: 0.2,
      parallaxFactor: 0.6,
      rotationSpeed: 0.2
    },
    {
      texturePath: '/ILH leaf - Blue.png',
      initialPosition: [5, 4, -7],
      scale: 3.0,
      speed: 0.15,
      parallaxFactor: 0.8,
      rotationSpeed: -0.15
    },
    {
      texturePath: '/ILH leaf - Green.png',
      initialPosition: [4.5, -3, -5],
      scale: 2.0,
      speed: 0.25,
      parallaxFactor: 0.5,
      rotationSpeed: 0.3
    },
    {
      texturePath: '/ILH leaf - Blue.png',
      initialPosition: [-4.5, -4, -6.5],
      scale: 2.6,
      speed: 0.18,
      parallaxFactor: 0.7,
      rotationSpeed: -0.2
    },
    {
      texturePath: '/ILH leaf - Green.png',
      initialPosition: [-1.5, 4.5, -8],
      scale: 3.5,
      speed: 0.12,
      parallaxFactor: 0.9,
      rotationSpeed: 0.1
    },
    {
      texturePath: '/ILH leaf - Blue.png',
      initialPosition: [2.0, -5, -7.5],
      scale: 2.8,
      speed: 0.14,
      parallaxFactor: 0.8,
      rotationSpeed: -0.25
    }
  ], [])

  return (
    <>
      <ambientLight intensity={isDark ? 1.5 : 2.0} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 1.0 : 1.5} />
      {leaves.map((leaf, index) => (
        <FloatingLeaf key={index} {...leaf} isDark={isDark} />
      ))}
    </>
  )
}

export default function LeafCanvas({ isDark }) {
  // Theme-adaptive background gradients
  const bgClass = isDark
    ? "bg-gradient-to-tr from-[#040915] via-[#071021] to-[#0a1128]"
    : "bg-gradient-to-tr from-[#eef2f7] via-[#e2e8f0] to-[#f1f5f9]"

  return (
    <div className={`fixed inset-0 w-full h-full -z-10 transition-colors duration-500 ${bgClass}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene isDark={isDark} />
      </Canvas>
    </div>
  )
}

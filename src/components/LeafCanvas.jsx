import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function FloatingLeaf({ texturePath, initialPosition, scale, speed, parallaxFactor, rotationSpeed }) {
  const meshRef = useRef()
  const texture = useTexture(texturePath)

  // Random phase for a natural floating animation
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!meshRef.current) return

    // 1. Slow, continuous rotation
    meshRef.current.rotation.z += rotationSpeed * 0.002
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5 + phase) * 0.15

    // 2. Subtle auto-float hover effect (sine wave)
    const floatOffset = Math.sin(state.clock.getElapsedTime() * speed + phase) * 0.2

    // 3. Parallax based on cursor position
    const targetX = initialPosition[0] + state.pointer.x * parallaxFactor
    const targetY = initialPosition[1] + state.pointer.y * parallaxFactor + floatOffset

    // Lerp mesh positions for silky smooth responsiveness
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.05)
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.05)
  })

  return (
    <mesh ref={meshRef} position={initialPosition} scale={scale}>
      <planeGeometry args={[2.5, 2.5]} />
      <meshBasicMaterial 
        map={texture} 
        transparent={true} 
        opacity={0.85} 
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Scene() {
  const { viewport } = useThree()

  // Define instances of floating leaves at various coordinates & depths
  const leaves = useMemo(() => [
    {
      texturePath: '/ILH leaf - Green.png',
      initialPosition: [-4, 2, -3],
      scale: 2.2,
      speed: 0.4,
      parallaxFactor: 1.2,
      rotationSpeed: 0.6
    },
    {
      texturePath: '/ILH leaf - Blue.png',
      initialPosition: [4, 3, -4],
      scale: 2.8,
      speed: 0.3,
      parallaxFactor: 1.5,
      rotationSpeed: -0.4
    },
    {
      texturePath: '/ILH leaf - Green.png',
      initialPosition: [3.5, -2.5, -2],
      scale: 1.8,
      speed: 0.5,
      parallaxFactor: 1.0,
      rotationSpeed: 0.8
    },
    {
      texturePath: '/ILH leaf - Blue.png',
      initialPosition: [-3.5, -3, -3.5],
      scale: 2.4,
      speed: 0.35,
      parallaxFactor: 1.4,
      rotationSpeed: -0.5
    },
    {
      texturePath: '/ILH leaf - Green.png',
      initialPosition: [-1, 3.5, -5],
      scale: 3.2,
      speed: 0.25,
      parallaxFactor: 1.8,
      rotationSpeed: 0.3
    },
    {
      texturePath: '/ILH leaf - Blue.png',
      initialPosition: [1.5, -4, -4.5],
      scale: 2.6,
      speed: 0.3,
      parallaxFactor: 1.6,
      rotationSpeed: -0.7
    }
  ], [])

  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      {leaves.map((leaf, index) => (
        <FloatingLeaf key={index} {...leaf} />
      ))}
    </>
  )
}

export default function LeafCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-tr from-[#050b18] via-[#09152a] to-[#0a1128]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}

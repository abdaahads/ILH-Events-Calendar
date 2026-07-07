import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function FloatingLeaf({ texturePath, initialPosition, scale, speed, rotationSpeed }) {
  const meshRef = useRef()
  const texture = useTexture(texturePath)
  const phase = useMemo(() => Math.random() * Math.PI * 2, [])

  useFrame((state) => {
    if (!meshRef.current) return
    meshRef.current.rotation.z += rotationSpeed * 0.0004
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.12 + phase) * 0.06
    const floatY = Math.sin(state.clock.getElapsedTime() * speed * 0.25 + phase) * 0.08
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, initialPosition[1] + floatY, 0.015)
  })

  return (
    <mesh ref={meshRef} position={initialPosition} scale={scale}>
      <planeGeometry args={[2.5, 2.5]} />
      <meshBasicMaterial map={texture} transparent opacity={0.12} depthWrite={false} side={THREE.DoubleSide} />
    </mesh>
  )
}

function Scene() {
  const leaves = useMemo(() => [
    { texturePath: '/ILH leaf - Green.png', initialPosition: [-4, 3, -8], scale: 2.5, speed: 0.12, rotationSpeed: 0.12 },
    { texturePath: '/ILH leaf - Blue.png', initialPosition: [4, 4, -9], scale: 3.0, speed: 0.1, rotationSpeed: -0.1 },
    { texturePath: '/ILH leaf - Green.png', initialPosition: [3.5, -3, -7], scale: 2.0, speed: 0.14, rotationSpeed: 0.15 },
    { texturePath: '/ILH leaf - Blue.png', initialPosition: [-3.5, -4, -8.5], scale: 2.6, speed: 0.11, rotationSpeed: -0.12 },
  ], [])

  return (
    <>
      <ambientLight intensity={1.2} />
      {leaves.map((leaf, i) => <FloatingLeaf key={i} {...leaf} />)}
    </>
  )
}

export default function LeafCanvas() {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 bg-gradient-to-b from-[#060d1f] via-[#081428] to-[#060d1f]">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }} gl={{ antialias: true, alpha: false }} dpr={[1, 1.5]}>
        <Scene />
      </Canvas>
    </div>
  )
}

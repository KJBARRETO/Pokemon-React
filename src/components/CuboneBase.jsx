// src/components/CuboneBase.jsx
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function CuboneBase() {
  const baseRef = useRef()

  useFrame(() => {
    if (baseRef.current) {
      baseRef.current.rotation.y += 0.0005
    }
  })

  return (
    <mesh
      ref={baseRef}
      position={[0, -1.8, 0]} // Posicionada debajo del modelo
      rotation={[-Math.PI / 2, 0, 0]} // Horizontal, mirando hacia arriba
      receiveShadow
    >
      <cylinderGeometry args={[1.8, 1.8, 0.2, 64]} />
      <meshStandardMaterial color="#4b3621" roughness={0.7} metalness={0.3} />
    </mesh>
  )
}

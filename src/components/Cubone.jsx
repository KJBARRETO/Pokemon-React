// src/components/Cubone.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars } from '@react-three/drei'
import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'

function CuboneModel() {
  const { scene } = useGLTF('/models/cubone.glb')
  const modelRef = useRef()

  // Animación: rotación automática
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <primitive object={scene} ref={modelRef} scale={2} position={[0, -1, 0]} />
  )
}

export default function Cubone() {
  const audio = useRef(new Audio('/music/cubone.mp3'))
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = () => {
    if (isPlaying) {
      audio.current.pause()
    } else {
      audio.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="container mt-4 text-center">
      <h2>Cubone</h2>
      <p>Cubone es un Pokémon huérfano que usa el cráneo de su madre como casco. Su historia es muy emotiva y lo hace especial.</p>

      <div style={{ width: '100%', height: '400px' }}>
        <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <CuboneModel />
          <OrbitControls 
            enablePan={false} 
            enableZoom={false} 
            minPolarAngle={Math.PI / 3} 
            maxPolarAngle={Math.PI / 1.8}
          />
          <Stars />
        </Canvas>
      </div>

      <div className="mt-3">
        <button onClick={toggleAudio} className="btn btn-primary">
          {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
        </button>
      </div>
    </div>
  )
}

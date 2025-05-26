import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'

function PikachuModel() {
  const { scene } = useGLTF('/models/pikachu.glb')
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <primitive object={scene} ref={modelRef} scale={2} position={[0, -1, 0]} />
  )
}

export default function Pikachu() {
  const audio = useRef(new Audio('/music/pikachu.mp3'))
  const [isPlaying, setIsPlaying] = useState(false)

  const toggleAudio = () => {
    if (isPlaying) {
      audio.current.pause()
    } else {
      audio.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    return () => {
      audio.current.pause()
      audio.current.currentTime = 0
    }
  }, [])

  return (
    <div className="container mt-4 text-center">
      <h2>Pikachu</h2>
      <p>
        Pikachu es el Pokémon más icónico, de tipo eléctrico, famoso por su poder y simpatía.
      </p>

      <div style={{ width: '100%', height: '400px' }}>
        <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} />
          <Suspense fallback={null}>
            <PikachuModel />
          </Suspense>
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
        <button
          onClick={toggleAudio}
          className="btn btn-primary"
          aria-pressed={isPlaying}
        >
          {isPlaying ? 'Pausar Música' : 'Reproducir Música'}
        </button>
      </div>
    </div>
  )
}

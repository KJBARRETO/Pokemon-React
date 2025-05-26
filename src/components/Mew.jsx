import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars, Plane } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import AudioPlayer from './AudioPlayer'

function MewModel() {
  const { scene } = useGLTF('/models/mew.glb')
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
    }
  })

  return (
    <>
      <primitive object={scene} ref={modelRef} scale={0.05} position={[0, -1, 0]} />
      <Plane 
        args={[10, 10]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.5, 0]}
      >
        <meshStandardMaterial 
          color="#4a90e2" 
          metalness={0.5} 
          roughness={0.2} 
        />
      </Plane>
    </>
  )
}

export default function Mew() {
  const audio = useRef(new Audio('/music/mew.mp3'))
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
      <h2>Mew</h2>
      <p>
        Mew es un Pokémon legendario de tipo psíquico, conocido por su rareza y poder.
        Se dice que contiene el ADN de todos los Pokémon y puede aprender cualquier movimiento.
        Su naturaleza juguetona y su capacidad para volar lo hacen único entre los Pokémon.
      </p>

      <div style={{ width: '100%', height: '400px' }}>
        <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
          <color attach="background" args={['#1a1a1a']} />
          
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, 5, -5]} intensity={0.6} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ff69b4" />
          
          <Suspense fallback={null}>
            <MewModel />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
          
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1.5}
          />
        </Canvas>
      </div>

      <AudioPlayer songPath="/music/Cancion.mp3" />
    </div>
  )
}

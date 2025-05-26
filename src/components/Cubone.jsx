// src/components/Cubone.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import AudioPlayer from './AudioPlayer'
import DustParticles from './DustParticles'
import CuboneBase from './CuboneBase'
import './Cubone.css'

function CuboneModel() {
  const { scene } = useGLTF('/models/cubone.glb')
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

export default function Cubone() {
  return (
    <div className="cubone-container">
      <div className="content-wrapper">
        <h2 className="title">Cubone</h2>

        <div className="cubone-grid">
          <div className="model-column">
            <div className="canvas-container" style={{ height: '400px' }}>
              <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
                <color attach="background" args={['#1a1a1a']} />
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <directionalLight position={[-5, 5, -5]} intensity={0.6} />
                <pointLight position={[0, 5, 0]} intensity={0.5} color="#8b4513" />

                <Suspense fallback={null}>
                  <CuboneModel />
                  <CuboneBase /> {/* Base horizontal */}
                  <DustParticles />
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
          </div>

          <div className="info-column">
            <div className="info-section">
              <h3>Descripción</h3>
              <p>
                Cubone es un Pokémon de tipo tierra, conocido por llevar el cráneo de su madre fallecida.
                Su triste historia y su valentía lo han convertido en uno de los Pokémon más queridos.
                Utiliza su hueso como arma y su casco como protección.
              </p>
            </div>

            <div className="info-section">
              <h3>Características</h3>
              <ul>
                <li>Tipo: Tierra</li>
                <li>Altura: 0.4 m</li>
                <li>Peso: 6.5 kg</li>
                <li>Habilidad: Intimidación / Mudar piel</li>
                <li>Generación: I</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Habilidades destacadas</h3>
              <ul>
                <li>Golpe Hueso (ataque con hueso)</li>
                <li>Refugio en su casco</li>
                <li>Fuerte defensa física</li>
                <li>Gran resistencia emocional</li>
              </ul>
            </div>

            <AudioPlayer songPath="/music/Cancion.mp3" />
          </div>
        </div>
      </div>
    </div>
  )
}

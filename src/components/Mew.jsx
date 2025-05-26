import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars, Plane, Box } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import AudioPlayer from './AudioPlayer'
import './Mew.css'

function PsychicParticles() {
  const particlesRef = useRef()
  const particleCount = 2000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const sizes = new Float32Array(particleCount)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    // Crear un patrón más circular y suave
    const radius = Math.random() * 8
    const theta = Math.random() * Math.PI * 2
    const phi = Math.random() * Math.PI

    positions[i3] = radius * Math.sin(phi) * Math.cos(theta)
    positions[i3 + 1] = radius * Math.cos(phi) + Math.random() * 2
    positions[i3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    
    colors[i3] = 1.0 // R
    colors[i3 + 1] = 0.41 // G
    colors[i3 + 2] = 0.71 // B

    // Variar el tamaño de las partículas
    sizes[i] = Math.random() * 0.1 + 0.05
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.0005
      const positions = particlesRef.current.geometry.attributes.position.array
      const time = state.clock.elapsedTime

      for (let i = 0; i < positions.length; i += 3) {
        // Movimiento más suave y ondulante
        positions[i + 1] += Math.sin(time * 0.5 + i * 0.01) * 0.005
        positions[i] += Math.cos(time * 0.3 + i * 0.01) * 0.003
        positions[i + 2] += Math.sin(time * 0.4 + i * 0.01) * 0.003
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particleCount}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </points>
  )
}

function Scene() {
  return (
    <group>
      {/* Base principal */}
      <Plane 
        args={[10, 10]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -1.5, 0]}
      >
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.5}
          roughness={0.3}
          emissive="#ff69b4"
          emissiveIntensity={0.2}
        />
      </Plane>

      {/* Paredes del escenario */}
      <Box args={[10, 0.5, 0.5]} position={[0, -1.25, -5]}>
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.7}
          roughness={0.2}
          emissive="#ff69b4"
          emissiveIntensity={0.1}
        />
      </Box>
      <Box args={[10, 0.5, 0.5]} position={[0, -1.25, 5]}>
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.7}
          roughness={0.2}
          emissive="#ff69b4"
          emissiveIntensity={0.1}
        />
      </Box>
      <Box args={[0.5, 0.5, 10]} position={[-5, -1.25, 0]}>
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.7}
          roughness={0.2}
          emissive="#ff69b4"
          emissiveIntensity={0.1}
        />
      </Box>
      <Box args={[0.5, 0.5, 10]} position={[5, -1.25, 0]}>
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.7}
          roughness={0.2}
          emissive="#ff69b4"
          emissiveIntensity={0.1}
        />
      </Box>

      {/* Elementos decorativos */}
      <Box args={[0.3, 0.3, 0.3]} position={[-4, -1.35, -4]}>
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff69b4"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[4, -1.35, 4]}>
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff69b4"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[-4, -1.35, 4]}>
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff69b4"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[4, -1.35, -4]}>
        <meshStandardMaterial 
          color="#ff69b4"
          metalness={0.8}
          roughness={0.2}
          emissive="#ff69b4"
          emissiveIntensity={0.5}
        />
      </Box>
    </group>
  )
}

function MewModel() {
  const { scene } = useGLTF('/models/mew.glb')
  const modelRef = useRef()

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005
      modelRef.current.position.y = -0.5 + Math.sin(Date.now() * 0.001) * 0.2
    }
  })

  return (
    <primitive object={scene} ref={modelRef} scale={0.03} position={[1, 0, 1]} />
  )
}

export default function Mew() {
  return (
    <div className="mew-container">
      <div className="content-wrapper">
        <h2 className="title">Mew</h2>
        
        <div className="mew-grid">
          {/* Columna del modelo 3D */}
          <div className="model-column">
            <div className="canvas-container">
              <Canvas camera={{ position: [0, 0, 8], fov: 30 }}>
                <color attach="background" args={['#1a1a1a']} />
                
                {/* Iluminación mejorada */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <directionalLight position={[-5, 5, -5]} intensity={0.6} />
                <directionalLight position={[0, -5, 0]} intensity={0.4} />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ff69b4" />
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#ff69b4" />
                <spotLight 
                  position={[0, 5, 0]} 
                  angle={0.3} 
                  penumbra={1} 
                  intensity={0.6} 
                  color="#ff69b4"
                />
                <spotLight 
                  position={[0, -5, 0]} 
                  angle={0.3} 
                  penumbra={1} 
                  intensity={0.4} 
                  color="#ff69b4"
                />

                <Suspense fallback={null}>
                  <Scene />
                  <MewModel />
                  <PsychicParticles />
                </Suspense>

                <OrbitControls
                  enablePan={false}
                  enableZoom={false}
                  minPolarAngle={Math.PI / 4}
                  maxPolarAngle={Math.PI / 2}
                  minDistance={6}
                  maxDistance={10}
                  target={[1, 0, 1]}
                />
                
                <Stars 
                  radius={100}
                  depth={50}
                  count={5000}
                  factor={4}
                  saturation={0}
                  fade
                  speed={1}
                />
              </Canvas>
            </div>
            <AudioPlayer songPath="/music/Cancion.mp3" />
          </div>

          {/* Columna de información */}
          <div className="info-column">
            <div className="info-section">
              <h3>Información Básica</h3>
              <ul>
                <li>Puntos de exp. en nivel 100: 1.059.860 (parabólico)</li>
                <li>Ratio de captura: 45</li>
                <li>Amistad base: 100</li>
                <li>Pasos para la eclosión: 120 ciclos: 15360 / 30720 - 30976</li>
                <li>Hábitat: Raro</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Objetos Equipados en Estado Salvaje</h3>
              <ul>
                <li>Bayamarga (5%)</li>
                <li>Baya Milagro (5%)</li>
                <li>Baya Ziuela (5%)</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Estadísticas del Pokéathlon</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span>Velocidad</span>
                  <div className="stars">★★★★★</div>
                  <span>5</span>
                </div>
                <div className="stat-item">
                  <span>Fortaleza</span>
                  <div className="stars">★★★★★</div>
                  <span>5</span>
                </div>
                <div className="stat-item">
                  <span>Precisión</span>
                  <div className="stars">★★★★★</div>
                  <span>5</span>
                </div>
                <div className="stat-item">
                  <span>Resistencia</span>
                  <div className="stars">★★★★★</div>
                  <span>5</span>
                </div>
                <div className="stat-item">
                  <span>Salto</span>
                  <div className="stars">★★★★★</div>
                  <span>5</span>
                </div>
              </div>
              <div className="stats-summary">
                <p>Total — 25</p>
                <p>Media — 5</p>
              </div>
              <p className="stats-note">
                Estos son los máximos alcanzables por el Pokémon; lo que quiere decir que los valores iniciales serán bastante inferiores.
              </p>
            </div>

            <div className="attribution">
              <p>
                Este contenido proviene de wikidex.net.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

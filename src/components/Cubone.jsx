// src/components/Cubone.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars, Plane, Box, useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import AudioPlayer from './AudioPlayer'
import './Cubone.css'

function GroundParticles() {
  const particlesRef = useRef()
  const particleCount = 1000
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 10
    positions[i3 + 1] = Math.random() * 5
    positions[i3 + 2] = (Math.random() - 0.5) * 10
    
    colors[i3] = 0.8 // R
    colors[i3 + 1] = 0.6 // G
    colors[i3 + 2] = 0.2 // B
  }

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.01
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
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
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
          color="#8b4513"
          metalness={0.5}
          roughness={0.3}
          emissive="#8b4513"
          emissiveIntensity={0.2}
        />
      </Plane>

      {/* Paredes del escenario */}
      <Box args={[10, 0.5, 0.5]} position={[0, -1.25, -5]}>
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.7}
          roughness={0.2}
          emissive="#8b4513"
          emissiveIntensity={0.1}
        />
      </Box>
      <Box args={[10, 0.5, 0.5]} position={[0, -1.25, 5]}>
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.7}
          roughness={0.2}
          emissive="#8b4513"
          emissiveIntensity={0.1}
        />
      </Box>
      <Box args={[0.5, 0.5, 10]} position={[-5, -1.25, 0]}>
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.7}
          roughness={0.2}
          emissive="#8b4513"
          emissiveIntensity={0.1}
        />
      </Box>
      <Box args={[0.5, 0.5, 10]} position={[5, -1.25, 0]}>
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.7}
          roughness={0.2}
          emissive="#8b4513"
          emissiveIntensity={0.1}
        />
      </Box>

      {/* Elementos decorativos */}
      <Box args={[0.3, 0.3, 0.3]} position={[-4, -1.35, -4]}>
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.8}
          roughness={0.2}
          emissive="#8b4513"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[4, -1.35, 4]}>
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.8}
          roughness={0.2}
          emissive="#8b4513"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[-4, -1.35, 4]}>
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.8}
          roughness={0.2}
          emissive="#8b4513"
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.3, 0.3, 0.3]} position={[4, -1.35, -4]}>
        <meshStandardMaterial 
          color="#8b4513"
          metalness={0.8}
          roughness={0.2}
          emissive="#8b4513"
          emissiveIntensity={0.5}
        />
      </Box>
    </group>
  )
}

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
  return (
    <div className="pikachu-container">
      <div className="content-wrapper">
        <h2 className="title">Cubone</h2>
        
        <div className="pikachu-grid">
          {/* Columna del modelo 3D */}
          <div className="model-column">
            <div className="canvas-container">
              <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
                <color attach="background" args={['#1a1a1a']} />
                
                {/* Iluminación mejorada */}
                <ambientLight intensity={0.4} />
                <directionalLight position={[5, 5, 5]} intensity={0.8} />
                <directionalLight position={[-5, 5, -5]} intensity={0.6} />
                <directionalLight position={[0, -5, 0]} intensity={0.4} />
                <pointLight position={[-5, 5, -5]} intensity={0.5} color="#8b4513" />
                <pointLight position={[5, 5, 5]} intensity={0.5} color="#8b4513" />
                <spotLight 
                  position={[0, 5, 0]} 
                  angle={0.3} 
                  penumbra={1} 
                  intensity={0.6} 
                  color="#8b4513"
                />
                <spotLight 
                  position={[0, -5, 0]} 
                  angle={0.3} 
                  penumbra={1} 
                  intensity={0.4} 
                  color="#8b4513"
                />

                <Suspense fallback={null}>
                  <Scene />
                  <CuboneModel />
                  <GroundParticles />
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

          {/* Columna de información */}
          <div className="info-column">
            <div className="info-section">
              <h3>Información Básica</h3>
              <ul>
                <li>Puntos de exp. en nivel 100: 1.000.000 (medio)</li>
                <li>Ratio de captura: 190</li>
                <li>Amistad base: 50 (70 antes de la octava generación)</li>
                <li>Pasos para la eclosión: 20 ciclos: 2560 / 5120 - 5376</li>
                <li>Hábitat: Montaña</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Objetos Equipados en Estado Salvaje</h3>
              <ul>
                <li>Baya (intercambiado de la primera generación a O/P/C)</li>
                <li>Hueso grueso (2% O/P/C, 5% R/Z/E, RF/VH, D/P/Pt, HG/SS, X/Y, S/L, US/UL, Ep/Ec)</li>
              </ul>
            </div>

            <div className="info-section">
              <h3>Estadísticas del Pokéathlon</h3>
              <div className="stats-grid">
                <div className="stat-item">
                  <span>Velocidad</span>
                  <div className="stars">★★★★</div>
                  <span>4</span>
                </div>
                <div className="stat-item">
                  <span>Fortaleza</span>
                  <div className="stars">★★★★★</div>
                  <span>5</span>
                </div>
                <div className="stat-item">
                  <span>Precisión</span>
                  <div className="stars">★★★</div>
                  <span>3</span>
                </div>
                <div className="stat-item">
                  <span>Resistencia</span>
                  <div className="stars">★★★</div>
                  <span>3</span>
                </div>
                <div className="stat-item">
                  <span>Salto</span>
                  <div className="stars">★★★</div>
                  <span>3</span>
                </div>
              </div>
              <div className="stats-summary">
                <p>Total — 18</p>
                <p>Media — 3.6</p>
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

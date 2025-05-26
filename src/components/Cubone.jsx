// src/components/Cubone.jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars, Plane, Box, useTexture } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
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
                <li>Hueso Grueso (2% O/P/C, 5% R/Z/E, RF/VH, D/P/Pt, HG/SS, X/Y, S/L, US/UL, Ep/Ec)</li>
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

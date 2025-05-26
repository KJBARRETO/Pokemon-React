import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars, Text, Plane } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Player({ position, onCollision, onScore }) {
  const { scene } = useGLTF('/models/pikachu.glb')
  const modelRef = useRef()
  const [velocity, setVelocity] = useState({ x: 0, y: 0 })
  const [isJumping, setIsJumping] = useState(false)
  const playerBox = useRef(new THREE.Box3())

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space' && !isJumping) {
        e.preventDefault()
        setVelocity(prev => ({ ...prev, y: 0.18 }))
        setIsJumping(true)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isJumping])

  useFrame((state, delta) => {
    if (modelRef.current) {
      // Aplicar gravedad
      setVelocity(prev => ({ ...prev, y: prev.y - 0.01 }))
      
      // Actualizar posición
      modelRef.current.position.y += velocity.y
      
      // Limitar movimiento vertical
      if (modelRef.current.position.y < -1) {
        modelRef.current.position.y = -1
        setVelocity(prev => ({ ...prev, y: 0 }))
        setIsJumping(false)
      }

      // Actualizar caja de colisión
      playerBox.current.setFromObject(modelRef.current)

      // Aumentar puntuación por movimiento
      onScore(1)
    }
  })

  return (
    <primitive 
      object={scene} 
      ref={modelRef} 
      scale={0.12}
      position={position}
    />
  )
}

function Obstacle({ position, onCollision, playerBox }) {
  const { scene } = useGLTF('/models/pokeball.glb')
  const modelRef = useRef()
  const obstacleBox = useRef(new THREE.Box3())

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x -= 0.01
      modelRef.current.rotation.y += 0.002 

      // Actualizar caja de colisión
      obstacleBox.current.setFromObject(modelRef.current)

      // Verificar colisión
      if (playerBox.current && obstacleBox.current.intersectsBox(playerBox.current)) {
        onCollision()
      }
    }
  })

  return (
    <primitive 
      object={scene} 
      ref={modelRef} 
      scale={0.003}
      position={[position[0], -1, 0]}
    >
      <meshStandardMaterial 
        color="#ff0000"
        metalness={0.5}
        roughness={0.2}
        emissive="#ff0000"
        emissiveIntensity={0.2}
      />
    </primitive>
  )
}

function Collectible({ position, onCollect, playerBox }) {
  const { scene } = useGLTF('/models/mew.glb')
  const modelRef = useRef()
  const collectibleBox = useRef(new THREE.Box3())

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x -= 0.08
      modelRef.current.rotation.y += 0.02
      modelRef.current.position.y += Math.sin(Date.now() * 0.003) * 0.01

      collectibleBox.current.setFromObject(modelRef.current)

      if (playerBox.current && collectibleBox.current.intersectsBox(playerBox.current)) {
        onCollect()
        modelRef.current.visible = false
      }
    }
  })

  return (
    <primitive 
      object={scene} 
      ref={modelRef} 
      scale={0.1} 
      position={position}
    />
  )
}

function ParticleEffect({ position, color = '#ffd700' }) {
  const particlesRef = useRef()
  const particleCount = 100
  const positions = new Float32Array(particleCount * 3)
  const colors = new Float32Array(particleCount * 3)
  const colorObj = new THREE.Color(color)

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3
    positions[i3] = (Math.random() - 0.5) * 0.5
    positions[i3 + 1] = Math.random() * 0.5
    positions[i3 + 2] = (Math.random() - 0.5) * 0.5
    
    colors[i3] = colorObj.r
    colors[i3 + 1] = colorObj.g
    colors[i3 + 2] = colorObj.b
  }

  useFrame(() => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.01
      const positions = particlesRef.current.geometry.attributes.position.array
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.001 + i) * 0.01
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={particlesRef} position={position}>
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

function Ground() {
  return (
    <Plane 
      args={[20, 10]} 
      rotation={[-Math.PI / 2, 0, 0]} 
      position={[0, -1.5, 0]}
    >
      <meshStandardMaterial 
        color="#4a90e2"
        metalness={0.5}
        roughness={0.2}
        emissive="#4a90e2"
        emissiveIntensity={0.2}
      />
    </Plane>
  )
}

function Game() {
  const [gameState, setGameState] = useState('playing')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [obstacles, setObstacles] = useState([])
  const [collectibles, setCollectibles] = useState([])
  const [showParticles, setShowParticles] = useState(false)
  const [particleColor, setParticleColor] = useState('#ffd700')
  const playerBox = useRef(new THREE.Box3())

  const resetGame = () => {
    setGameState('playing')
    setScore(0)
    setObstacles([])
    setCollectibles([])
    setShowParticles(false)
    
    const initialObstacles = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      position: [12 + i * 10, -1, 0],
    }))
    setObstacles(initialObstacles)
  }

  const handleCollision = () => {
    setGameState('lost')
    setParticleColor('#ff0000')
    setShowParticles(true)
    
    if (score > highScore) {
      setHighScore(score)
    }

    setTimeout(() => {
      resetGame()
    }, 2000)
  }

  useEffect(() => {
    const initialObstacles = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      position: [12 + i * 10, -1, 0],
    }))
    setObstacles(initialObstacles)

    const obstacleInterval = setInterval(() => {
      if (gameState === 'playing') {
        setObstacles(prev => {
          const visibleObstacles = prev.filter(obs => obs.position[0] > -10)
          return [
            ...visibleObstacles,
            {
              id: Date.now(),
              position: [20, -1, 0],
            }
          ]
        })
      }
    }, 2500)

    return () => clearInterval(obstacleInterval)
  }, [gameState])

  const handleScore = (points) => {
    setScore(prev => {
      const newScore = prev + points
      if (newScore > highScore) {
        setHighScore(newScore)
      }
      return newScore
    })
  }

  const handleCollect = () => {
    setScore(prev => prev + 50)
    setParticleColor('#ff69b4')
    setShowParticles(true)
    setTimeout(() => setShowParticles(false), 1000)
  }

  return (
    <div className="container mt-4 text-center">
      <h2>Pokémon Runner</h2>
      <div className="score-display mb-3">
        Puntuación: {score} | Mejor Puntuación: {highScore}
      </div>

      <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <Canvas camera={{ position: [0, 1, 4], fov: 50 }}>
          <color attach="background" args={['#1a1a1a']} />
          
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <directionalLight position={[-5, 5, -5]} intensity={0.6} />
          <pointLight position={[0, 5, 0]} intensity={0.5} color="#ffd700" />
          
          <Suspense fallback={null}>
            <Ground />
            <Player 
              position={[0, -1, 0]} 
              onCollision={handleCollision}
              onScore={handleScore}
            />
            {obstacles.map(obstacle => (
              <Obstacle 
                key={obstacle.id} 
                position={obstacle.position} 
                onCollision={handleCollision}
                playerBox={playerBox}
              />
            ))}
            {showParticles && <ParticleEffect position={[0, 0, 0]} color={particleColor} />}
          </Suspense>

          {gameState !== 'playing' && (
            <group position={[0, 0, 0]}>
              <Text
                position={[0, 1, 0]}
                fontSize={0.5}
                color="#ff0000"
                anchorX="center"
                anchorY="middle"
              >
                ¡Perdiste!
              </Text>
              <Text
                position={[0, 0, 0]}
                fontSize={0.3}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                Puntuación: {score}
              </Text>
              <Text
                position={[0, -0.5, 0]}
                fontSize={0.3}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
              >
                Reiniciando en 2 segundos...
              </Text>
            </group>
          )}

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

      <div className="mt-3">
        <h4>Controles:</h4>
        <p>
          Espacio: Saltar<br />
          Evita las Pokebolas saltando sobre ellas
        </p>
      </div>
    </div>
  )
}

export default Game;

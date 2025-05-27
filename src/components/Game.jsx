import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF, Stars, Text, Plane } from '@react-three/drei'
import { useRef, useState, useEffect, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Constantes del juego
const GAME_CONSTANTS = {
  GROUND_LEVEL: -1,
  JUMP_FORCE: 1.0,
  GRAVITY: 0.008,
  OBSTACLE_SPEED: 0.05,
  OBSTACLE_ROTATION: 0.02,
  POINTS_PER_JUMP: 10,
  WINNING_SCORE: 100
}

// Componente de carga
function LoadingScreen() {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'white',
      fontSize: '24px',
      textAlign: 'center',
      zIndex: 1000
    }}>
      Cargando juego...
    </div>
  )
}

// Componente de error
function ErrorScreen({ message }) {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      color: 'red',
      fontSize: '24px',
      textAlign: 'center',
      zIndex: 1000
    }}>
      Error: {message}
    </div>
  )
}

// Componente de mensaje de juego
function GameMessage({ type, score }) {
  if (type === 'none') return null;

  const color = type === 'won' ? '#00ff00' : '#ff0000';
  const message = type === 'won' ? '¡Ganaste!' : '¡Perdiste!';

  return (
    <group position={[0, 0, 0]}>
      <Text
        position={[0, 1, 0]}
        fontSize={0.5}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {message}
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
  );
}

function Player({ position, onCollision, playerBoxRef }) {
  const { scene } = useGLTF('/models/pikachu.glb')
  const modelRef = useRef()
  const [isJumping, setIsJumping] = useState(false)
  const jumpStartTime = useRef(0)
  const jumpHeight = useRef(0)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.code === 'Space' || e.key === ' ') && !isJumping) {
        e.preventDefault()
        console.log('¡Salto iniciado!')
        setIsJumping(true)
        jumpStartTime.current = Date.now()
        jumpHeight.current = 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isJumping])

  useFrame(() => {
    if (modelRef.current) {
      if (isJumping) {
        const elapsed = Date.now() - jumpStartTime.current
        const progress = Math.min(elapsed / 800, 1)
        
        jumpHeight.current = GAME_CONSTANTS.JUMP_FORCE * Math.sin(progress * Math.PI)
        
        modelRef.current.position.y = GAME_CONSTANTS.GROUND_LEVEL + jumpHeight.current
        
        if (progress >= 1) {
          setIsJumping(false)
          modelRef.current.position.y = GAME_CONSTANTS.GROUND_LEVEL
        }
      } else {
        modelRef.current.position.y = GAME_CONSTANTS.GROUND_LEVEL
      }

      playerBoxRef.current.setFromObject(modelRef.current)
    }
  })

  return (
    <primitive 
      object={scene} 
      ref={modelRef} 
      scale={0.12}
      position={[position[0], GAME_CONSTANTS.GROUND_LEVEL, position[2]]}
    />
  )
}

function Obstacle({ position, onCollision, playerBox, onJumpSuccess }) {
  const { scene } = useGLTF('/models/pokeball.glb')
  const modelRef = useRef()
  const obstacleBox = useRef(new THREE.Box3())
  const hasCollided = useRef(false)
  const hasScored = useRef(false)
  const wasAbove = useRef(false)

  useFrame(() => {
    if (modelRef.current && playerBox.current) {
      modelRef.current.position.x -= GAME_CONSTANTS.OBSTACLE_SPEED
      modelRef.current.rotation.y += GAME_CONSTANTS.OBSTACLE_ROTATION

      obstacleBox.current.setFromObject(modelRef.current)

      if (!hasCollided.current && obstacleBox.current.intersectsBox(playerBox.current)) {
        const playerBottom = playerBox.current.min.y
        const obstacleTop = modelRef.current.position.y + 0.2

        if (playerBottom <= obstacleTop) {
          console.log('¡Colisión detectada!')
          hasCollided.current = true
          onCollision()
        }
      }

      const isAbove = playerBox.current.min.y > modelRef.current.position.y + 0.4

      if (!hasScored.current && 
          modelRef.current.position.x < -1 && 
          wasAbove.current && 
          !isAbove) {
        console.log('¡Salto exitoso! +10 puntos')
        hasScored.current = true
        onJumpSuccess()
      }

      wasAbove.current = isAbove
    }
  })

  return (
    <primitive 
      object={scene} 
      ref={modelRef} 
      scale={0.003}
      position={[position[0], GAME_CONSTANTS.GROUND_LEVEL, 0]}
    />
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
      position={[0, GAME_CONSTANTS.GROUND_LEVEL - 0.5, 0]}
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
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [obstacles, setObstacles] = useState([])
  const playerBoxRef = useRef(new THREE.Box3())

  useEffect(() => {
    // Reiniciar el puntaje al cargar el juego
    setScore(0)
    
    Promise.all([
      useGLTF.preload('/models/pikachu.glb'),
      useGLTF.preload('/models/pokeball.glb')
    ]).then(() => {
      setIsLoading(false)
    }).catch(err => {
      setError('Error al cargar los modelos 3D')
      console.error(err)
    })

    const initialObstacles = Array.from({ length: 3 }, (_, i) => ({
      id: i,
      position: [3 + i * 3, GAME_CONSTANTS.GROUND_LEVEL, 0],
    }))
    setObstacles(initialObstacles)

    const obstacleInterval = setInterval(() => {
      if (!gameOver && !gameWon) {
        setObstacles(prev => {
          const visibleObstacles = prev.filter(obs => obs.position[0] > -5)
          return [
            ...visibleObstacles,
            {
              id: Date.now(),
              position: [8, GAME_CONSTANTS.GROUND_LEVEL, 0],
            }
          ]
        })
      }
    }, 2000)

    return () => clearInterval(obstacleInterval)
  }, [gameOver, gameWon])

  const handleScore = () => {
    setScore(prevScore => {
      const newScore = prevScore + GAME_CONSTANTS.POINTS_PER_JUMP
      console.log(`Puntuación actualizada: ${newScore} puntos`)
      if (newScore >= GAME_CONSTANTS.WINNING_SCORE) {
        setGameWon(true)
      }
      return newScore
    })
  }

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return <ErrorScreen message={error} />
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {gameOver && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          color: 'white',
          textAlign: 'center',
          zIndex: 1000
        }}>
          <h2>¡Perdiste!</h2>
          <p>Puntuación final: {score}</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Jugar de nuevo
          </button>
        </div>
      )}
      {gameWon && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: '20px',
          borderRadius: '10px',
          color: 'white',
          textAlign: 'center',
          zIndex: 1000
        }}>
          <h2>¡Ganaste!</h2>
          <p>¡Felicidades! Has alcanzado 100 puntos</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#2ecc71',
              color: 'white',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer'
            }}
          >
            Jugar de nuevo
          </button>
        </div>
      )}
      <div style={{
        position: 'absolute',
        top: '20px',
        left: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: '10px 20px',
        borderRadius: '5px',
        color: 'white',
        zIndex: 1000
      }}>
        <h3>Puntuación: {score}</h3>
        <p>Objetivo: {GAME_CONSTANTS.WINNING_SCORE} puntos</p>
      </div>
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 75 }}
        style={{ background: '#1a1a1a' }}
        onContextLost={(e) => {
          e.preventDefault()
          console.log('Context lost, attempting to restore...')
        }}
      >
        <color attach="background" args={['#1a1a1a']} />
        
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <directionalLight position={[-5, 5, -5]} intensity={0.6} />
        
        <Suspense fallback={null}>
          <Ground />
          <Player 
            position={[0, GAME_CONSTANTS.GROUND_LEVEL, 0]} 
            onCollision={() => setGameOver(true)}
            playerBoxRef={playerBoxRef}
          />
          {obstacles.map(obstacle => (
            <Obstacle 
              key={obstacle.id} 
              position={obstacle.position} 
              onCollision={() => setGameOver(true)}
              playerBox={playerBoxRef}
              onJumpSuccess={handleScore}
            />
          ))}
        </Suspense>

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
  )
}

export default Game;


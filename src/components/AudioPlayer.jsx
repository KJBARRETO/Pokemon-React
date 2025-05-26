import { useState, useEffect, useRef } from 'react'

export default function AudioPlayer({ songPath }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(songPath)
    
    audio.addEventListener('error', (e) => {
      console.error('Error de audio:', e.target.error)
    })
    
    audio.addEventListener('loadeddata', () => {
      console.log('Audio cargado correctamente')
    })
    
    audio.addEventListener('canplaythrough', () => {
      console.log('Audio listo para reproducir')
    })

    audioRef.current = audio
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current = null
      }
    }
  }, [songPath])

  const toggleAudio = () => {
    if (!audioRef.current) {
      console.log('Audio no inicializado')
      return
    }

    if (isPlaying) {
      console.log('Pausando audio')
      audioRef.current.pause()
    } else {
      console.log('Intentando reproducir audio...')
      audioRef.current.load()
      
      const playPromise = audioRef.current.play()
      
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log('Audio iniciado correctamente')
          })
          .catch(error => {
            console.error('Error al reproducir audio:', error)
            audioRef.current.load()
          })
      }
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="mt-3">
      <button
        onClick={toggleAudio}
        className="btn btn-primary"
        aria-pressed={isPlaying}
      >
        {isPlaying ? '⏸️ Pausar' : '▶️ Reproducir'}
      </button>
    </div>
  )
} 
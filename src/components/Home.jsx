import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
  return (
    <div className="container">
      <h1 className="mb-4">Bienvenidos a nuestra Exposicion de Pokemones</h1>

      <p className="lead">
        Vive una aventura interactiva con Pokémon en 3D. Este proyecto combina animaciones, luces
        , sonidos y efectos visuales para dar vida a personajes del universo Pokémon en un entorno 
        web envolvente. Además, incluye un emocionante minijuego.
      </p>

      <hr className="my-4" />

      <h2 className="text-center mb-4">Tecnologías que dan vida al proyecto</h2>
      <div className="card shadow-lg border-0">
        <div className="card-body">
          <p><strong>React</strong> se encargó de construir una interfaz dinámica e interactiva.</p>
          <p><strong>React Router</strong> nos permitió movernos fluida y rápidamente entre las distintas secciones del proyecto.</p>
          <p><strong>Three.js + @react-three/fiber</strong> dieron vida a los personajes y escenarios 3D, con animaciones y efectos visuales en tiempo real.</p>
          <p><strong>Bootstrap</strong> se utilizó para lograr un diseño limpio, adaptable y atractivo en todos los dispositivos.</p>
          <p><strong>Vite</strong> fue nuestra herramienta clave para un entorno de desarrollo veloz y eficiente.</p>
        </div>
      </div>

      <p className="mt-4">¡Usa el menú de navegación para explorar a Cubone, Mew, Pikachu y jugar el minijuego!</p>
    </div>
  )
}

export default Home

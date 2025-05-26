// src/components/Home.jsx
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-4">Bienvenidos a la Expo Multimedia</h1>

      <p className="lead">
        Este proyecto presenta una experiencia interactiva con personajes 3D del universo Pokémon,
        integrando animaciones, sonidos, luces, efectos visuales y un minijuego.
      </p>

      <hr className="my-4" />

      <h2 className="mt-4">¿Qué tecnologías se usaron?</h2>
      <ul className="list-group list-group-flush my-3 text-start">
        <li className="list-group-item"><strong>React</strong> – Para construir la interfaz de usuario.</li>
        <li className="list-group-item"> <strong>React Router</strong> – Para la navegación entre componentes.</li>
        <li className="list-group-item"> <strong>Three.js + @react-three/fiber</strong> – Para los personajes y escenarios 3D.</li>
        <li className="list-group-item"><strong>Bootstrap</strong> – Para el diseño responsivo y estético.</li>
        <li className="list-group-item"><strong>Vite</strong> – Como herramienta de desarrollo rápida.</li>
      </ul>

      <p className="mt-4">¡Usa el menú de navegación para explorar a Cubone, Mew, Pikachu y jugar el minijuego!</p>
    </div>
  )
}

export default Home

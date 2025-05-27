import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="text-center mb-4" style={{
            color: '#e74c3c',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            fontSize: '2.5rem',
            fontWeight: 'bold'
          }}>
            ¡Bienvenidos al Mundo Pokémon!
          </h1>

          <div className="card shadow-sm border-0 mb-5" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px'
          }}>
            <div className="card-body p-4">
              <p className="lead text-center mb-4" style={{ 
                lineHeight: '1.8', 
                fontSize: '1.2rem',
                color: '#2c3e50'
              }}>
                Explora y juega con tus Pokémon favoritos en 3D. 
                Interactúa con Pikachu, Cubone y Mew en un mundo virtual 
                lleno de aventuras y diversión.
              </p>
            </div>
          </div>

          <h2 className="text-center mb-4" style={{
            color: '#e74c3c',
            fontSize: '2rem',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            ¡Conoce a tus Pokémon!
          </h2>

          <div className="card shadow-sm border-0 mb-5" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px'
          }}>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="pokemon-item p-3 text-center" style={{
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    borderRadius: '10px',
                    height: '100%'
                  }}>
                    <h5 style={{ color: '#e74c3c', fontWeight: 'bold' }}>Pikachu</h5>
                    <p className="mb-0" style={{ color: '#34495e' }}>El Pokémon más famoso y amigable. ¡Juega con él en nuestro emocionante minijuego!</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="pokemon-item p-3 text-center" style={{
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    borderRadius: '10px',
                    height: '100%'
                  }}>
                    <h5 style={{ color: '#e74c3c', fontWeight: 'bold' }}>Cubone</h5>
                    <p className="mb-0" style={{ color: '#34495e' }}>Un Pokémon solitario que lleva el cráneo de su madre. ¡Interactúa con él en 3D!</p>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="pokemon-item p-3 text-center" style={{
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    borderRadius: '10px',
                    height: '100%'
                  }}>
                    <h5 style={{ color: '#e74c3c', fontWeight: 'bold' }}>Mew</h5>
                    <p className="mb-0" style={{ color: '#34495e' }}>El Pokémon legendario más raro. ¡Descubre sus poderes místicos!</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm border-0 mb-5" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px'
          }}>
            <div className="card-body p-4">
              <h3 className="text-center mb-4" style={{ 
                color: '#e74c3c',
                fontWeight: 'bold',
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
              }}>
                ¡Juega con Pikachu!
              </h3>
              <p className="text-center mb-4" style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6',
                color: '#34495e'
              }}>
                Salta sobre las Pokeballs y gana puntos. 
                ¡Llega a 100 puntos para ganar! 
                Usa la barra espaciadora para saltar y evita las Pokeballs.
              </p>
            </div>
          </div>

          <h2 className="text-center mb-4" style={{
            color: '#e74c3c',
            fontSize: '2rem',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
          }}>
            Tecnologías que dan vida al proyecto
          </h2>

          <div className="card shadow-sm border-0 mb-5" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '15px'
          }}>
            <div className="card-body p-4">
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="tech-item p-3" style={{
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    borderRadius: '10px',
                    height: '100%'
                  }}>
                    <h5 style={{ color: '#e74c3c', fontWeight: 'bold' }}>React</h5>
                    <p className="mb-0" style={{ color: '#34495e' }}>Interfaz dinámica e interactiva para una experiencia Pokémon inmersiva</p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="tech-item p-3" style={{
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    borderRadius: '10px',
                    height: '100%'
                  }}>
                    <h5 style={{ color: '#e74c3c', fontWeight: 'bold' }}>React Router</h5>
                    <p className="mb-0" style={{ color: '#34495e' }}>Navegación fluida entre los diferentes Pokémon y el minijuego</p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="tech-item p-3" style={{
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    borderRadius: '10px',
                    height: '100%'
                  }}>
                    <h5 style={{ color: '#e74c3c', fontWeight: 'bold' }}>Three.js + @react-three/fiber</h5>
                    <p className="mb-0" style={{ color: '#34495e' }}>Gráficos 3D y animaciones en tiempo real para dar vida a los Pokémon</p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="tech-item p-3" style={{
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    borderRadius: '10px',
                    height: '100%'
                  }}>
                    <h5 style={{ color: '#e74c3c', fontWeight: 'bold' }}>Bootstrap</h5>
                    <p className="mb-0" style={{ color: '#34495e' }}>Diseño adaptable y atractivo para disfrutar en cualquier dispositivo</p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="tech-item p-3" style={{
                    backgroundColor: 'rgba(44, 62, 80, 0.1)',
                    borderRadius: '10px',
                    height: '100%'
                  }}>
                    <h5 style={{ color: '#e74c3c', fontWeight: 'bold' }}>Vite</h5>
                    <p className="mb-0" style={{ color: '#34495e' }}>Desarrollo veloz y eficiente para una experiencia Pokémon sin interrupciones</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="lead" style={{ 
              color: '#e74c3c',
              fontSize: '1.3rem',
              fontWeight: 'bold',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
            }}>
              ¡Usa el menú de navegación para comenzar tu aventura!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home

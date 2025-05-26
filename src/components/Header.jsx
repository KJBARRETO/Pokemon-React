// src/components/Header.jsx
import { Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Expo Multimedia</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cubone">Cubone</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/mew">Mew</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pikachu">Pikachu</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/game">Juego</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Header

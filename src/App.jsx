import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './components/Home'
import Cubone from './components/Cubone'
import Mew from './components/Mew'
import Pikachu from './components/Pikachu'
import Game from './components/Game'
import './App.css'

function App() {
  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cubone" element={<Cubone />} />
          <Route path="/mew" element={<Mew />} />
          <Route path="/pikachu" element={<Pikachu />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
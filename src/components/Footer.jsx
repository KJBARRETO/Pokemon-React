// src/components/Footer.jsx
import 'bootstrap/dist/css/bootstrap.min.css'

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#1a1a1a',
      color: '#4a90e2',
      padding: '1rem 0',
      marginTop: '2rem',
      borderTop: '1px solid rgba(74, 144, 226, 0.3)',
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div className="container">
        <p style={{
          margin: 0,
          fontSize: '1.1rem',
          fontWeight: '500',
          textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
        }}>
          &copy; 2025 Expo Multimedia - Ingeniería Multimedia
        </p>
      </div>
    </footer>
  )
}

export default Footer

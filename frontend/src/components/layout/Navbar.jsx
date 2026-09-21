import { Search, Ticket, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-icon">
            <Ticket size={20} strokeWidth={2.5} />
          </span>

          <span>TiketSini</span>
        </Link>

        <nav className={`navbar-menu ${isMenuOpen ? 'is-open' : ''}`}>
          <Link
            to="/"
            className="navbar-link active"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>

          <Link
            to="/events"
            className="navbar-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Events
          </Link>

          <Link
            to="/categories"
            className="navbar-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Categories
          </Link>

          <Link
            to="/about"
            className="navbar-link"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="navbar-search-button"
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          <Link to="/login" className="navbar-login">
            Login
          </Link>

          <Link to="/register" className="navbar-register">
            Create Account
          </Link>
        </div>

        <button
          type="button"
          className="navbar-mobile-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
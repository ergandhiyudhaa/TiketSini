import { Search, Ticket, Menu, X, ChevronDown, User, TicketCheck, LogOut, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  const { user, loading, isAuthenticated, logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    setIsUserMenuOpen(false)
    setIsMenuOpen(false)

    await logout()
    navigate('/')
  }

  function closeMenus() {
    setIsMenuOpen(false)
    setIsUserMenuOpen(false)
  }

  const userInitial =
    user?.name?.trim()?.charAt(0)?.toUpperCase() || 'U'

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenus}>
          <span className="navbar-logo-icon">
            <Ticket size={20} strokeWidth={2.5} />
          </span>

          <span>
            Tiket<span>Sini</span>
          </span>
        </Link>

        <nav
          className={`navbar-menu ${isMenuOpen ? 'is-open' : ''}`}
        >
          <Link
            to="/"
            className="navbar-link active"
            onClick={closeMenus}
          >
            Home
          </Link>

          <Link
            to="/events"
            className="navbar-link"
            onClick={closeMenus}
          >
            Events
          </Link>

          <Link
            to="/categories"
            className="navbar-link"
            onClick={closeMenus}
          >
            Categories
          </Link>

          <Link
            to="/about"
            className="navbar-link"
            onClick={closeMenus}
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

          {!loading && isAuthenticated ? (
            <div className="navbar-user">
              <button
                type="button"
                className="navbar-user-button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                aria-expanded={isUserMenuOpen}
              >
                <span className="navbar-user-avatar">
                  {userInitial}
                </span>

                <span className="navbar-user-name">
                  {user?.name || 'Account'}
                </span>

                <ChevronDown
                  size={16}
                  className={`navbar-user-chevron ${
                    isUserMenuOpen ? 'is-open' : ''
                  }`}
                />
              </button>

              {isUserMenuOpen && (
                <div className="navbar-user-dropdown">
                  <div className="navbar-user-info">
                    <span className="navbar-user-info-name">
                      {user?.name}
                    </span>

                    <span className="navbar-user-info-email">
                      {user?.email}
                    </span>
                  </div>

                  <div className="navbar-user-divider" />

                  <Link
                    to="/my-tickets"
                    className="navbar-dropdown-link"
                    onClick={closeMenus}
                  >
                    <TicketCheck size={17} />
                    <span>My Tickets</span>
                  </Link>

                  <Link
                    to="/profile"
                    className="navbar-dropdown-link"
                    onClick={closeMenus}
                  >
                    <User size={17} />
                    <span>Profile</span>
                  </Link>

                  <button
                    type="button"
                    className="navbar-dropdown-link navbar-logout"
                    onClick={handleLogout}
                  >
                    <LogOut size={17} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="navbar-login">
                Login
              </Link>

              <Link to="/register" className="navbar-register">
                Create Account
              </Link>
            </>
          )}
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

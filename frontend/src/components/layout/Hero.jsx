import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowUpRight,
  Search,
  Sparkles,
  Ticket,
  MapPin,
  CalendarDays,
} from 'lucide-react'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSearch(event) {
    event.preventDefault()

    const trimmedQuery = query.trim()

    if (trimmedQuery) {
      navigate(`/events?search=${encodeURIComponent(trimmedQuery)}`)
    } else {
      navigate('/events')
    }
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-gradient hero-gradient-blue" />
        <div className="hero-gradient hero-gradient-orange" />
        <div className="hero-gradient hero-gradient-yellow" />
        <div className="hero-grid" />
        <div className="hero-noise" />
      </div>

      <div className="hero-floating-shape hero-floating-shape-one" />
      <div className="hero-floating-shape hero-floating-shape-two" />
      <div className="hero-floating-shape hero-floating-shape-three" />

      <div className="hero-inner">

        <div className="hero-content">

          <div className="hero-eyebrow">
            <span className="hero-eyebrow-icon">
              <Sparkles size={14} />
            </span>

            <span>YOUR NEXT EXPERIENCE STARTS HERE</span>

            <span className="hero-eyebrow-dot" />
          </div>

          <h1>
            Find something
            <span>worth experiencing.</span>
          </h1>

          <p className="hero-description">
            Discover concerts, sports, festivals, workshops,
            and unforgettable experiences happening around Indonesia.
          </p>

          <form
            className="hero-search"
            onSubmit={handleSearch}
          >
            <div className="hero-search-icon">
              <Search size={20} />
            </div>

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="What do you want to experience?"
              aria-label="Search events"
            />

            <button type="submit">
              <span>Explore</span>
              <ArrowUpRight size={18} />
            </button>
          </form>

          <div className="hero-quick-links">
            <span>Popular:</span>

            <button
              type="button"
              onClick={() => navigate('/events?category=Music')}
            >
              Music
            </button>

            <button
              type="button"
              onClick={() => navigate('/events?category=Sports')}
            >
              Sports
            </button>

            <button
              type="button"
              onClick={() => navigate('/events?category=Festival')}
            >
              Festivals
            </button>

            <button
              type="button"
              onClick={() => navigate('/events?category=Workshop')}
            >
              Workshops
            </button>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <strong>8+</strong>
              <span>Live events</span>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat">
              <strong>6</strong>
              <span>Categories</span>
            </div>

            <div className="hero-stat-divider" />

            <div className="hero-stat">
              <strong>∞</strong>
              <span>Memories</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">

          <div className="hero-orbit hero-orbit-one" />
          <div className="hero-orbit hero-orbit-two" />

          <div className="hero-ticket hero-ticket-main">

            <div className="hero-ticket-top">
              <div className="hero-ticket-brand">
                <Ticket size={17} />
                <span>TIKETSINI</span>
              </div>

              <span className="hero-ticket-live">
                LIVE
              </span>
            </div>

            <div className="hero-ticket-main-content">
              <span className="hero-ticket-label">
                NEXT EXPERIENCE
              </span>

              <h3>
                Jakarta
                <br />
                Music Festival
              </h3>

              <div className="hero-ticket-meta">
                <span>
                  <CalendarDays size={14} />
                  10 OCT 2026
                </span>

                <span>
                  <MapPin size={14} />
                  JAKARTA
                </span>
              </div>
            </div>

            <div className="hero-ticket-perforation">
              <span />
              <span />
            </div>

            <div className="hero-ticket-bottom">
              <strong>
                IDR 150K
              </strong>

              <span>
                EARLY BIRD
              </span>
            </div>

          </div>

          <div className="hero-floating-card hero-floating-card-top">
            <div className="hero-floating-icon">
              <CalendarDays size={17} />
            </div>

            <div>
              <strong>10 OCT</strong>
              <span>Saturday</span>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-card-bottom">
            <div className="hero-floating-icon">
              <MapPin size={17} />
            </div>

            <div>
              <strong>JAKARTA</strong>
              <span>Indonesia</span>
            </div>
          </div>

          <div className="hero-floating-badge">
            <Sparkles size={15} />
            <span>Something exciting?</span>
          </div>

        </div>

      </div>

      <div className="hero-bottom-fade" />
    </section>
  )
}

export default Hero

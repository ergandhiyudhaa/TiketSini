import { ArrowRight, Search, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './Hero.css'

function Hero() {
  const navigate = useNavigate()

  function handleSearchSubmit(event) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const query = formData.get('query')?.trim()

    if (query) {
      navigate(`/events?search=${encodeURIComponent(query)}`)
      return
    }

    navigate('/events')
  }

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="hero-orb hero-orb-blue" />
        <div className="hero-orb hero-orb-orange" />
        <div className="hero-grid" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={14} />
            <span>DISCOVER YOUR NEXT EXPERIENCE</span>
          </div>

          <h1>
            Find something
            <span>worth experiencing.</span>
          </h1>

          <p>
            Discover events, concerts, sports and experiences
            happening around you. Find your next reason to go out.
          </p>

          <form
            className="hero-search"
            onSubmit={handleSearchSubmit}
          >
            <Search size={20} />

            <input
              name="query"
              type="search"
              placeholder="Search events, concerts, sports..."
              aria-label="Search events"
            />

            <button type="submit">
              Search
            </button>
          </form>

          <div className="hero-actions">
            <button
              type="button"
              className="hero-primary-action"
              onClick={() => navigate('/events')}
            >
              Explore events
              <ArrowRight size={17} />
            </button>

            <span>
              Find events you'll actually want to attend.
            </span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-ticket hero-ticket-main">
            <div className="hero-ticket-image">
              <div className="hero-ticket-image-shape" />
            </div>

            <div className="hero-ticket-content">
              <span>LIVE EXPERIENCE</span>
              <strong>Something<br />worth going to.</strong>

              <div className="hero-ticket-meta">
                <span>EVENT</span>
                <span>JAKARTA</span>
              </div>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-top">
            <span>UPCOMING</span>
            <strong>128+</strong>
            <small>events to explore</small>
          </div>

          <div className="hero-floating-card hero-floating-bottom">
            <div className="hero-floating-dot" />
            <div>
              <strong>Ready to go?</strong>
              <small>Pick your experience.</small>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-bottom-line">
        <span>EVENTS</span>
        <span>MUSIC</span>
        <span>SPORTS</span>
        <span>EXPERIENCES</span>
      </div>
    </section>
  )
}

export default Hero

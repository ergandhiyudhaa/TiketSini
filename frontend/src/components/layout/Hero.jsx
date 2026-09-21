import { ArrowRight, MapPin, Search, Sparkles } from 'lucide-react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-eyebrow">
            <Sparkles size={15} />
            <span>YOUR NEXT EXPERIENCE STARTS HERE</span>
          </div>

          <h1>
            Find something
            <span> worth experiencing.</span>
          </h1>

          <p className="hero-description">
            Discover concerts, sports, festivals, and unforgettable events
            happening around you.
          </p>

          <div className="hero-search">
            <div className="hero-search-field">
              <Search size={21} />
              <input
                type="text"
                placeholder="Search events, artists, or places"
                aria-label="Search events"
              />
            </div>

            <button type="button" className="hero-search-button">
              Search
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="hero-popular">
            <span>Popular:</span>

            <button type="button">Music</button>
            <button type="button">Sports</button>
            <button type="button">Festival</button>
            <button type="button">Comedy</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card hero-card-main">
            <div className="hero-card-image">
              <div className="hero-card-overlay" />

              <div className="hero-card-badge">
                FEATURED EVENT
              </div>

              <div className="hero-card-content">
                <span className="hero-card-date">
                  SAT • 24 OCT 2026
                </span>

                <h2>Live the moment.</h2>

                <div className="hero-card-location">
                  <MapPin size={15} />
                  <span>Jakarta, Indonesia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="hero-floating-card hero-floating-card-top">
            <span className="hero-floating-number">120+</span>
            <span className="hero-floating-label">Events</span>
          </div>

          <div className="hero-floating-card hero-floating-card-bottom">
            <span className="hero-floating-dot" />
            <span>Tickets available now</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
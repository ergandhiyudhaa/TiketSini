import { ArrowRight, CalendarDays, Heart, Ticket, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import './About.css'

function About() {
  return (
    <main className="about-page">

      <section className="about-hero">
        <div className="about-hero-decoration about-hero-decoration-one"></div>
        <div className="about-hero-decoration about-hero-decoration-two"></div>

        <div className="about-container about-hero-inner">
          <div className="about-hero-copy">
            <span className="about-eyebrow">
              ABOUT TIKETSINI
            </span>

            <h1>
              Make every moment
              <span> worth remembering.</span>
            </h1>

            <p>
              TiketSini is a place to discover, explore, and get tickets
              for the moments that matter. From music and sports to
              unforgettable experiences, everything starts here.
            </p>

            <Link to="/events" className="about-primary-button">
              Explore Events
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="about-hero-visual">
            <div className="about-ticket-card about-ticket-card-main">
              <div className="about-ticket-top">
                <span>TIKETSINI</span>
                <Ticket size={22} />
              </div>

              <div className="about-ticket-event">
                <span>YOUR NEXT</span>
                <strong>ADVENTURE</strong>
                <small>starts here.</small>
              </div>

              <div className="about-ticket-bottom">
                <span>EVENT PASS</span>
                <span>TS • 2026</span>
              </div>
            </div>

            <div className="about-floating-card about-floating-card-calendar">
              <CalendarDays size={19} />
              <span>Find your event</span>
            </div>

            <div className="about-floating-card about-floating-card-heart">
              <Heart size={18} />
              <span>Make memories</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-story">
        <div className="about-container about-story-grid">
          <div>
            <span className="about-section-label">OUR STORY</span>
            <h2>
              More than just
              <span> a ticket.</span>
            </h2>
          </div>

          <div className="about-story-copy">
            <p>
              We believe a ticket is more than a piece of paper or a QR code.
              It is the beginning of a story, a night to remember, a new
              experience, or a moment shared with people who matter.
            </p>

            <p>
              TiketSini was created to make discovering and getting tickets
              feel simple, enjoyable, and accessible. We bring events and
              people together in one place, without making the journey
              complicated.
            </p>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="about-container">
          <div className="about-section-heading">
            <span className="about-section-label">WHAT WE BELIEVE</span>
            <h2>
              Built around
              <span> experiences.</span>
            </h2>
          </div>

          <div className="about-values-grid">
            <article className="about-value-card about-value-blue">
              <div className="about-value-icon">
                <Ticket size={23} />
              </div>
              <span>01</span>
              <h3>Simple</h3>
              <p>
                Finding and getting your ticket should feel easy from
                discovery to checkout.
              </p>
            </article>

            <article className="about-value-card about-value-orange">
              <div className="about-value-icon">
                <Heart size={23} />
              </div>
              <span>02</span>
              <h3>Meaningful</h3>
              <p>
                Every event has a story. We want to help you find the ones
                worth being part of.
              </p>
            </article>

            <article className="about-value-card about-value-purple">
              <div className="about-value-icon">
                <Users size={23} />
              </div>
              <span>03</span>
              <h3>Together</h3>
              <p>
                Great experiences become better when they are shared with
                the people around you.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="about-how">
        <div className="about-container">
          <div className="about-how-heading">
            <span className="about-section-label">HOW IT WORKS</span>
            <h2>
              From discovery
              <span> to the moment.</span>
            </h2>
          </div>

          <div className="about-steps">
            <div className="about-step">
              <div className="about-step-number">01</div>
              <div>
                <h3>Discover</h3>
                <p>Explore events and find something you want to experience.</p>
              </div>
            </div>

            <div className="about-step">
              <div className="about-step-number">02</div>
              <div>
                <h3>Choose</h3>
                <p>Pick your date, ticket type, and experience.</p>
              </div>
            </div>

            <div className="about-step">
              <div className="about-step-number">03</div>
              <div>
                <h3>Experience</h3>
                <p>Get your ticket and enjoy the moment. That's it.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="about-container">
          <div className="about-cta-card">
            <div>
              <span className="about-section-label">READY?</span>
              <h2>
                Your next moment
                <span> starts here.</span>
              </h2>
            </div>

            <Link to="/events" className="about-cta-button">
              Find an Event
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}

export default About

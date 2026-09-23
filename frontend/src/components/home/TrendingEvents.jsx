import { ArrowUpRight, Flame } from 'lucide-react'
import EventCard from '../event/EventCard'
import './TrendingEvents.css'

function TrendingEvents({ events = [] }) {
  const trendingEvents = events.slice(0, 4)

  if (trendingEvents.length === 0) {
    return null
  }

  return (
    <section className="trending-events-section">
      <div className="trending-events-container">
        <div className="trending-events-heading">
          <div>
            <span className="section-eyebrow">
              <Flame size={15} />
              TRENDING NOW
            </span>

            <h2>Events people are talking about.</h2>

            <p>
              Discover experiences that are getting attention right now.
            </p>
          </div>

          <a href="/events" className="trending-events-link">
            Explore all
            <ArrowUpRight size={17} />
          </a>
        </div>

        <div className="trending-events-grid">
          {trendingEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default TrendingEvents

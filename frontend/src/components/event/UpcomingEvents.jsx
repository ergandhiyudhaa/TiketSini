import { useEffect, useState } from 'react'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { apiRequest } from '../../lib/api'
import EventCard from './EventCard'
import './UpcomingEvents.css'

function UpcomingEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await apiRequest('/events?per_page=8')
        setEvents(response.data)
      } catch (err) {
        setError(err.message || 'Failed to load events.')
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  return (
    <section className="upcoming-events">
      <div className="upcoming-events-container">
        <div className="upcoming-events-header">
          <div>
            <span className="section-eyebrow">
              <CalendarDays size={15} />
              DON'T MISS OUT
            </span>

            <h2>
              Upcoming
              <span> events.</span>
            </h2>

            <p>
              Discover exciting events happening soon and find your next
              unforgettable experience.
            </p>
          </div>

          <button type="button" className="upcoming-events-view-all">
            View all events
            <ArrowRight size={18} />
          </button>
        </div>

        {loading && (
          <div className="upcoming-events-grid">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="event-card-loading"
                key={index}
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="upcoming-events-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="upcoming-events-empty">
            <h3>No upcoming events yet.</h3>
            <p>
              Check back soon for new events.
            </p>
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="upcoming-events-grid">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default UpcomingEvents
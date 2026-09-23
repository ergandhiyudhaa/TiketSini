import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getEvents } from '../../services/eventService'
import EventCard from './EventCard'
import './UpcomingEvents.css'

function UpcomingEvents() {
  const navigate = useNavigate()

  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function loadEvents() {
      try {
        const response = await getEvents()

        const data = Array.isArray(response)
          ? response
          : response?.data || response?.events || []

        if (active) {
          setEvents(data.slice(0, 6))
        }
      } catch (requestError) {
        console.error(requestError)

        if (active) {
          setError('Unable to load events right now.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadEvents()

    return () => {
      active = false
    }
  }, [])

  return (
    <section className="upcoming-events">
      <div className="upcoming-events-container">
        <div className="upcoming-events-heading">
          <div>
            <span className="upcoming-events-eyebrow">
              DON'T MISS OUT
            </span>

            <h2>Events worth showing up for.</h2>

            <p>
              Fresh experiences, live moments and things
              happening around you.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('/events')}
          >
            Explore all
            <ArrowRight size={16} />
          </button>
        </div>

        {loading && (
          <div className="upcoming-events-state">
            <span>Finding events...</span>
          </div>
        )}

        {!loading && error && (
          <div className="upcoming-events-state upcoming-events-error">
            {error}
          </div>
        )}

        {!loading && !error && events.length === 0 && (
          <div className="upcoming-events-state">
            No upcoming events available yet.
          </div>
        )}

        {!loading && !error && events.length > 0 && (
          <div className="upcoming-events-grid">
            {events.map((event) => (
              <EventCard
                key={event.id || event.slug}
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

import { useEffect, useState } from 'react'
import { ArrowUpRight, Sparkles } from 'lucide-react'
import { getEvents } from '../../services/eventService'
import EventCard from './EventCard'
import './UpcomingEvents.css'

function UpcomingEvents() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await getEvents()
        setEvents((response.data || []).slice(0, 8))
      } catch (error) {
        console.error('Failed to load upcoming events:', error)
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [])

  return (
    <section className="upcoming-events">
      <div className="upcoming-events-background">
        <span className="upcoming-orb upcoming-orb-blue" />
        <span className="upcoming-orb upcoming-orb-orange" />
        <span className="upcoming-orb upcoming-orb-yellow" />
        <span className="upcoming-dots" />
      </div>

      <div className="upcoming-events-inner">

        <div className="upcoming-events-header">

          <div className="upcoming-events-heading">

            <div className="upcoming-events-kicker">
              <span className="upcoming-kicker-icon">
                <Sparkles size={14} />
              </span>

              <span>DISCOVER</span>

              <span className="upcoming-kicker-dot" />
              <span className="upcoming-kicker-small">
                WHAT'S HAPPENING
              </span>
            </div>

            <h2>
              Upcoming
              <span>events.</span>
            </h2>

            <p>
              From music and sports to festivals and
              unexpected adventures, find something
              worth getting excited about.
            </p>

          </div>

          <div className="upcoming-events-side">

            <div className="upcoming-events-count">
              <strong>{events.length}</strong>

              <div>
                <span>events</span>
                <span>to explore</span>
              </div>
            </div>

            <a
              href="/events"
              className="upcoming-events-view-all"
            >
              <span>View all events</span>

              <span className="upcoming-events-view-icon">
                <ArrowUpRight size={17} />
              </span>
            </a>

          </div>

        </div>

        <div className="upcoming-events-divider">
          <span />
        </div>

        {loading ? (
          <div className="upcoming-events-loading">
            <div />
            <div />
            <div />
          </div>
        ) : events.length > 0 ? (
          <div className="upcoming-events-grid">
            {events.map((event, index) => (
              <div
                className="upcoming-event-item"
                key={event.id}
                style={{ '--event-index': index }}
              >
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="upcoming-events-empty">
            <Sparkles size={22} />
            <span>No upcoming events yet.</span>
          </div>
        )}

      </div>
    </section>
  )
}

export default UpcomingEvents

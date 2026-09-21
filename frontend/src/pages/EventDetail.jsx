import { useEffect, useState } from 'react'
import {
  ArrowLeft,
  CalendarDays,
  Clock3,
  MapPin,
  Ticket,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { getEventBySlug } from '../services/eventService'
import './EventDetail.css'

function EventDetail() {
  const { slug } = useParams()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadEvent() {
      try {
        const response = await getEventBySlug(slug)
        setEvent(response.data)
      } catch (err) {
        setError(err.message || 'Failed to load event.')
      } finally {
        setLoading(false)
      }
    }

    loadEvent()
  }, [slug])

  if (loading) {
    return (
      <div className="event-detail-state">
        <div className="event-detail-loading" />
        <p>Loading event...</p>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="event-detail-state">
        <h1>Event not found</h1>
        <p>
          {error || 'The event you are looking for does not exist.'}
        </p>

        <Link to="/events" className="event-detail-back-button">
          <ArrowLeft size={18} />
          Back to events
        </Link>
      </div>
    )
  }

  const eventDate = new Date(event.starts_at)

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  })

  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  })
  const ticketTypes = event.ticket_types || []

  return (
    <div className="event-detail">
      <section className="event-detail-hero">
        <div className="event-detail-container">
          <Link to="/" className="event-detail-back">
            <ArrowLeft size={18} />
            Back to home
          </Link>

          <div className="event-detail-cover">
            {event.cover_image ? (
              <img
                src={event.cover_image}
                alt={event.title}
              />
            ) : (
              <div className="event-detail-cover-placeholder">
                <span>
                  {event.category?.name || 'EVENT'}
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="event-detail-content">
        <div className="event-detail-container">
          <div className="event-detail-layout">
            <div className="event-detail-main">
              {event.category && (
                <span className="event-detail-category">
                  {event.category.name}
                </span>
              )}

              <h1>{event.title}</h1>

              <div className="event-detail-meta">
                <div className="event-detail-meta-item">
                  <CalendarDays size={19} />
                  <div>
                    <span>Date</span>
                    <strong>{formattedDate}</strong>
                  </div>
                </div>

                <div className="event-detail-meta-item">
                  <Clock3 size={19} />
                  <div>
                    <span>Time</span>
                    <strong>{formattedTime}</strong>
                  </div>
                </div>

                <div className="event-detail-meta-item">
                  <MapPin size={19} />
                  <div>
                    <span>Location</span>
                    <strong>
                      {event.venue?.name || 'Location TBA'}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="event-detail-description">
                <h2>About this event</h2>

                <p>
                  {event.description ||
                    'Event description will be available soon.'}
                </p>
              </div>

              <div className="event-detail-location">
                <h2>Location</h2>

                <div className="event-detail-location-box">
                  <MapPin size={20} />

                  <div>
                    <strong>
                      {event.venue?.name || 'Location TBA'}
                    </strong>

                    <p>
                      {event.venue?.address ||
                        'Address will be announced soon.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <aside className="event-detail-sidebar">
              <div className="event-ticket-card">
                <div className="event-ticket-card-header">
                  <span>
                    <Ticket size={18} />
                    Tickets
                  </span>

                  <small>
                    {ticketTypes.length} ticket types
                  </small>
                </div>

                <div className="event-ticket-list">
                  {ticketTypes.map((ticket) => (
                    <div
                      className="event-ticket-item"
                      key={ticket.id}
                    >
                      <div>
                        <h3>{ticket.name}</h3>

                        {ticket.description && (
                          <p>{ticket.description}</p>
                        )}

                        <span>
                          {ticket.available} tickets available
                        </span>
                      </div>

                      <strong>
                        {new Intl.NumberFormat('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                          maximumFractionDigits: 0,
                        }).format(Number(ticket.price))}
                      </strong>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  className="event-buy-button"
                >
                  Buy Tickets
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

export default EventDetail
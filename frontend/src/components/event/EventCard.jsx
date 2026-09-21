import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './EventCard.css'

function EventCard({ event }) {
  const navigate = useNavigate()

  const eventDate = new Date(event.starts_at)

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  })

  const ticketPrices = event.ticket_types || []

  const lowestPrice =
    ticketPrices.length > 0
      ? Math.min(
          ...ticketPrices.map((ticket) => Number(ticket.price)),
        )
      : null

  const formattedPrice =
    lowestPrice !== null
      ? new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(lowestPrice)
      : 'Price unavailable'

  function openEvent() {
    navigate(`/events/${event.slug}`)
  }

  function handleKeyDown(eventKey) {
    if (eventKey.key === 'Enter' || eventKey.key === ' ') {
      eventKey.preventDefault()
      openEvent()
    }
  }

  return (
    <article
      className="event-card"
      onClick={openEvent}
      onKeyDown={handleKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`View ${event.title}`}
    >
      <div className="event-card-image-wrapper">
        {event.cover_image ? (
          <img
            src={event.cover_image}
            alt={event.title}
            className="event-card-image"
          />
        ) : (
          <div className="event-card-image-placeholder">
            <span>{event.category?.name || 'EVENT'}</span>
          </div>
        )}

        {event.category && (
          <span className="event-card-category">
            {event.category.name}
          </span>
        )}

        <span className="event-card-arrow">
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="event-card-body">
        <h3 className="event-card-title">
          {event.title}
        </h3>

        <div className="event-card-info">
          <div className="event-card-info-item">
            <CalendarDays size={16} />
            <span>{formattedDate}</span>
          </div>

          <div className="event-card-info-item">
            <MapPin size={16} />
            <span>
              {event.venue?.city || 'Location TBA'}
            </span>
          </div>
        </div>

        <div className="event-card-footer">
          <div>
            <span className="event-card-price-label">
              Starting from
            </span>

            <strong className="event-card-price">
              {formattedPrice}
            </strong>
          </div>

          <span className="event-card-detail-button">
            Details
          </span>
        </div>
      </div>
    </article>
  )
}

export default EventCard
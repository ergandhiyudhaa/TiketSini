import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
  
  Ticket,
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

  const shortDate = eventDate.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
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

  const categoryName = event.category?.name || 'Event'

  const categoryClass = categoryName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')

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
      className={`event-card event-card--${categoryClass}`}
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
            <span>{categoryName}</span>
          </div>
        )}

        <div className="event-card-image-overlay" />

        <div className="event-card-top">
          <span className="event-card-category">
            {categoryName}
          </span>

          <span className="event-card-date-badge">
            <strong>{shortDate.split(' ')[0]}</strong>
            <span>{shortDate.split(' ')[1]}</span>
          </span>
        </div>

        <span className="event-card-arrow">
          <ArrowUpRight size={19} strokeWidth={2.4} />
        </span>

        <div className="event-card-image-caption">
          <span>TIKETSINI PRESENTS</span>
          <strong>{categoryName}</strong>
        </div>
      </div>

      <div className="event-card-body">
        <div className="event-card-heading">
          <h3 className="event-card-title">
            {event.title}
          </h3>

          <span className="event-card-mini-ticket">
            <Ticket size={14} />
          </span>
        </div>

        <div className="event-card-info">
          <div className="event-card-info-item">
            <CalendarDays size={15} />
            <span>{formattedDate}</span>
          </div>

          <div className="event-card-info-item">
            <MapPin size={15} />
            <span>
              {event.venue?.city || 'Location TBA'}
            </span>
          </div>
        </div>

        <div className="event-card-divider">
          <span />
          <span />
        </div>

        <div className="event-card-footer">
          <div className="event-card-price-wrapper">
            <span className="event-card-price-label">
              Tickets from
            </span>

            <strong className="event-card-price">
              {formattedPrice}
            </strong>
          </div>

          <span className="event-card-detail-button">
            Explore
            <ArrowUpRight size={14} />
          </span>
        </div>
      </div>
    </article>
  )
}

export default EventCard

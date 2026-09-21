import {
  CalendarDays,
  MapPin,
  ArrowUpRight,
} from 'lucide-react'
import './EventCard.css'

function EventCard({ event }) {
  const eventDate = new Date(event.starts_at)

  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  const ticketPrices = event.ticket_types || []

  const lowestPrice =
    ticketPrices.length > 0
      ? Math.min(...ticketPrices.map((ticket) => Number(ticket.price)))
      : null

  const formattedPrice =
    lowestPrice !== null
      ? new Intl.NumberFormat('id-ID', {
          style: 'currency',
          currency: 'IDR',
          maximumFractionDigits: 0,
        }).format(lowestPrice)
      : 'Price unavailable'

  return (
    <article className="event-card">
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

        <button
          type="button"
          className="event-card-arrow"
          aria-label={`View ${event.title}`}
        >
          <ArrowUpRight size={18} />
        </button>
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

          <button
            type="button"
            className="event-card-detail-button"
          >
            Details
          </button>
        </div>
      </div>
    </article>
  )
}

export default EventCard
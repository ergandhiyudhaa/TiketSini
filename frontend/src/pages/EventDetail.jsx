import { useEffect, useMemo, useState } from 'react'
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  MapPin,
  Minus,
  Plus,
  Ticket,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getEventBySlug } from '../services/eventService'
import './EventDetail.css'
function EventDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [quantities, setQuantities] = useState({})

  useEffect(() => {
    let mounted = true

    async function loadEvent() {
      try {
        setLoading(true)
        setError('')

        const response = await getEventBySlug(slug)

        if (!mounted) return

        const eventData = response.data

        setEvent(eventData)

        const initialQuantities = {}

        ;(eventData.ticket_types || []).forEach((ticket) => {
          initialQuantities[ticket.id] = 0
        })

        setQuantities(initialQuantities)
      } catch (err) {
        console.error(err)

        if (mounted) {
          setError(err.message || 'Failed to load event.')
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadEvent()

    return () => {
      mounted = false
    }
  }, [slug])

  const ticketTypes = event?.ticket_types || []

  const totalTickets = Object.values(quantities).reduce(
    (total, quantity) => total + quantity,
    0,
  )

  const subtotal = useMemo(() => {
    return ticketTypes.reduce((total, ticket) => {
      const quantity = quantities[ticket.id] || 0

      return total + Number(ticket.price) * quantity
    }, 0)
  }, [ticketTypes, quantities])

  const formattedSubtotal = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(subtotal)

  const lowestPrice =
    ticketTypes.length > 0
      ? Math.min(
          ...ticketTypes.map((ticket) => Number(ticket.price)),
        )
      : 0

  const formattedLowestPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(lowestPrice)

  function updateQuantity(ticket, change) {
    setQuantities((current) => {
      const currentQuantity = current[ticket.id] || 0
      const available = Number(ticket.available) || 0

      const nextQuantity = Math.max(
        0,
        Math.min(currentQuantity + change, available, 10),
      )

      return {
        ...current,
        [ticket.id]: nextQuantity,
      }
    })
  }

  function handleContinue() {
    if (!event || totalTickets === 0) return

    const selectedTickets = ticketTypes
      .filter((ticket) => (quantities[ticket.id] || 0) > 0)
      .map((ticket) => ({
        ticket_type_id: ticket.id,
        name: ticket.name,
        price: Number(ticket.price),
        quantity: quantities[ticket.id],
      }))

    navigate('/checkout', {
      state: {
        event,
        tickets: selectedTickets,
        subtotal,
      },
    })
  }

  if (loading) {
    return (
      <div className="event-detail-loading-state">
        <div className="event-detail-spinner" />
        <span>Loading event...</span>
      </div>
    )
  }

  if (error || !event) {
    return (
      <div className="event-detail-error-state">
        <div className="event-detail-error-icon">
          !
        </div>

        <h1>Event not found</h1>

        <p>
          {error || 'The event you are looking for does not exist.'}
        </p>

        <Link to="/events" className="event-detail-primary-link">
          <ArrowLeft size={17} />
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

  const shortDate = eventDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  })

  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZone: 'Asia/Jakarta',
  })

  return (
    <div className="event-detail">

      {/* HERO */}

      <section className="event-detail-hero">

        <div className="event-detail-hero-background">
          {event.cover_image && (
            <img
              src={event.cover_image}
              alt=""
              aria-hidden="true"
            />
          )}
        </div>

        <div className="event-detail-hero-overlay" />

        <div className="event-detail-container">

          <Link
            to="/events"
            className="event-detail-back"
          >
            <ArrowLeft size={17} />
            All events
          </Link>

          <div className="event-detail-hero-grid">

            <div className="event-detail-cover-wrap">

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

              <div className="event-detail-cover-shadow" />

            </div>

            <div className="event-detail-hero-info">

              {event.category && (
                <span className="event-detail-category">
                  {event.category.name}
                </span>
              )}

              <h1>{event.title}</h1>

              <p className="event-detail-hero-description">
                {event.description}
              </p>

              <div className="event-detail-hero-meta">

                <div className="event-detail-hero-meta-item">
                  <div className="event-detail-meta-icon">
                    <CalendarDays size={19} />
                  </div>

                  <div>
                    <span>DATE</span>
                    <strong>{formattedDate}</strong>
                  </div>
                </div>

                <div className="event-detail-hero-meta-item">
                  <div className="event-detail-meta-icon">
                    <Clock3 size={19} />
                  </div>

                  <div>
                    <span>TIME</span>
                    <strong>{formattedTime} WIB</strong>
                  </div>
                </div>

                <div className="event-detail-hero-meta-item">
                  <div className="event-detail-meta-icon">
                    <MapPin size={19} />
                  </div>

                  <div>
                    <span>LOCATION</span>
                    <strong>
                      {event.venue?.name || 'Location TBA'}
                    </strong>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* MAIN */}

      <main className="event-detail-main">

        <div className="event-detail-container">

          <div className="event-detail-layout">

            {/* LEFT */}

            <div className="event-detail-content-column">

              <div className="event-detail-section">

                <div className="event-detail-section-heading">
                  <span>THE EXPERIENCE</span>
                  <h2>About this event</h2>
                </div>

                <p className="event-detail-description">
                  {event.description ||
                    'More information about this event will be available soon.'}
                </p>

              </div>

              <div className="event-detail-divider" />

              <div className="event-detail-section">

                <div className="event-detail-section-heading">
                  <span>WHEN & WHERE</span>
                  <h2>Event information</h2>
                </div>

                <div className="event-detail-info-grid">

                  <div className="event-detail-info-card">
                    <div className="event-detail-info-card-icon">
                      <CalendarDays size={21} />
                    </div>

                    <div>
                      <span>Date</span>
                      <strong>{formattedDate}</strong>
                    </div>
                  </div>

                  <div className="event-detail-info-card">
                    <div className="event-detail-info-card-icon">
                      <Clock3 size={21} />
                    </div>

                    <div>
                      <span>Time</span>
                      <strong>{formattedTime} WIB</strong>
                    </div>
                  </div>

                  <div className="event-detail-info-card event-detail-info-card-wide">
                    <div className="event-detail-info-card-icon">
                      <MapPin size={21} />
                    </div>

                    <div>
                      <span>Venue</span>
                      <strong>
                        {event.venue?.name || 'Location TBA'}
                      </strong>

                      <p>
                        {event.venue?.address ||
                          event.venue?.city ||
                          'Address will be announced soon.'}
                      </p>
                    </div>
                  </div>

                </div>

              </div>

              <div className="event-detail-divider" />

              <div className="event-detail-section">

                <div className="event-detail-section-heading">
                  <span>GOOD TO KNOW</span>
                  <h2>Before you book</h2>
                </div>

                <div className="event-detail-points">

                  <div>
                    <Check size={17} />
                    <span>
                      Tickets are subject to availability.
                    </span>
                  </div>

                  <div>
                    <Check size={17} />
                    <span>
                      Please check the event date and venue before purchasing.
                    </span>
                  </div>

                  <div>
                    <Check size={17} />
                    <span>
                      Each ticket type has its own availability.
                    </span>
                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT */}

            <aside className="event-detail-booking">

              <div className="event-ticket-card">

                <div className="event-ticket-card-top">

                  <div>
                    <span className="event-ticket-eyebrow">
                      GET YOUR TICKETS
                    </span>

                    <h2>Choose your ticket</h2>
                  </div>

                  <div className="event-ticket-icon">
                    <Ticket size={20} />
                  </div>

                </div>

                <div className="event-ticket-price-preview">
                  <span>Starting from</span>
                  <strong>{formattedLowestPrice}</strong>
                  <small>per ticket</small>
                </div>

                <div className="event-ticket-list">

                  {ticketTypes.map((ticket) => {
                    const quantity = quantities[ticket.id] || 0

                    const price = new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                      maximumFractionDigits: 0,
                    }).format(Number(ticket.price))

                    const available = Number(ticket.available) || 0

                    return (
                      <div
                        className={`event-ticket-item ${
                          quantity > 0
                            ? 'event-ticket-item-selected'
                            : ''
                        }`}
                        key={ticket.id}
                      >

                        <div className="event-ticket-item-main">

                          <div className="event-ticket-name-row">
                            <h3>{ticket.name}</h3>

                            {quantity > 0 && (
                              <span className="event-ticket-selected">
                                <Check size={12} />
                                Selected
                              </span>
                            )}
                          </div>

                          <strong>{price}</strong>

                          <span className="event-ticket-availability">
                            {available > 0
                              ? `${available} available`
                              : 'Sold out'}
                          </span>

                        </div>

                        <div className="event-ticket-controls">

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(ticket, -1)
                            }
                            disabled={quantity === 0}
                            aria-label={`Decrease ${ticket.name}`}
                          >
                            <Minus size={14} />
                          </button>

                          <span>{quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(ticket, 1)
                            }
                            disabled={
                              quantity >= available ||
                              quantity >= 10
                            }
                            aria-label={`Increase ${ticket.name}`}
                          >
                            <Plus size={14} />
                          </button>

                        </div>

                      </div>
                    )
                  })}

                </div>

                <div className="event-ticket-summary">

                  <div className="event-ticket-summary-line">
                    <span>
                      Tickets
                      {totalTickets > 0
                        ? ` (${totalTickets})`
                        : ''}
                    </span>

                    <strong>{formattedSubtotal}</strong>
                  </div>

                  <div className="event-ticket-summary-note">
                    Prices shown are before any applicable fees.
                  </div>

                </div>

                <button
                  type="button"
                  className="event-buy-button"
                  onClick={handleContinue}
                  disabled={totalTickets === 0}
                >
                  <span>
                    {totalTickets === 0
                      ? 'Select a ticket'
                      : 'Continue to checkout'}
                  </span>

                  {totalTickets > 0 && (
                    <ArrowUpRight size={18} />
                  )}
                </button>

                <div className="event-ticket-secure">
                  <Check size={14} />
                  Secure ticket selection
                </div>

              </div>

            </aside>

          </div>

        </div>
    </main>

    </div>
  )
}

export default EventDetail

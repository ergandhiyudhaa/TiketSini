import {
  CalendarDays,
  ChevronRight,
  Clock3,
  MapPin,
  Ticket,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getMyTickets } from '../services/orderService'
import './MyTickets.css'

function formatDate(value) {
  if (!value) return 'Date TBA'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

function getStatusClass(status) {
  const normalized = String(status || '').toLowerCase()

  if (['paid', 'confirmed', 'completed', 'success'].includes(normalized)) {
    return 'my-ticket-status-success'
  }

  if (['pending', 'waiting'].includes(normalized)) {
    return 'my-ticket-status-pending'
  }

  if (['cancelled', 'canceled', 'failed', 'expired'].includes(normalized)) {
    return 'my-ticket-status-danger'
  }

  return 'my-ticket-status-default'
}

function getStatusLabel(status) {
  if (!status) return 'Pending'

  return String(status)
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function getOrderItems(order) {
  return order?.items || order?.order_items || order?.orderItems || []
}

function getEventFromItem(item) {
  return item?.event || item?.ticket?.event || null
}

function MyTickets() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadTickets() {
      try {
        setLoading(true)
        setError('')

        const response = await getMyTickets()

        const data =
          response?.orders ||
          response?.data ||
          response?.tickets ||
          []

        if (mounted) {
          setOrders(Array.isArray(data) ? data : [])
        }
      } catch (requestError) {
        if (mounted) {
          setError(
            requestError?.message ||
              'Unable to load your tickets right now.',
          )
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadTickets()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="my-tickets-page">
      <section className="my-tickets-hero">
        <div className="my-tickets-container">
          <span className="my-tickets-eyebrow">
            YOUR EXPERIENCE
          </span>

          <h1>
            My <span>Tickets.</span>
          </h1>

          <p>
            Keep track of your events, bookings, and tickets
            all in one place.
          </p>
        </div>
      </section>

      <section className="my-tickets-content">
        <div className="my-tickets-container">
          <div className="my-tickets-heading">
            <div>
              <span className="my-tickets-section-label">
                MY BOOKINGS
              </span>
              <h2>Your upcoming moments</h2>
            </div>

            <Link
              to="/events"
              className="my-tickets-browse-button"
            >
              Find an Event
            </Link>
          </div>

          {loading && (
            <div className="my-tickets-loading">
              <div className="my-tickets-spinner"></div>
              <span>Loading your tickets...</span>
            </div>
          )}

          {!loading && error && (
            <div className="my-tickets-error">
              <div className="my-tickets-empty-icon">
                <Ticket size={24} />
              </div>

              <h3>Something went wrong</h3>

              <p>{error}</p>

              <Link
                to="/events"
                className="my-tickets-primary-button"
              >
                Browse Events
              </Link>
            </div>
          )}

          {!loading && !error && orders.length === 0 && (
            <div className="my-tickets-empty">
              <div className="my-tickets-empty-icon">
                <Ticket size={28} />
              </div>

              <h3>No tickets yet</h3>

              <p>
                You haven't booked any events yet. Your tickets
                will appear here after you make a booking.
              </p>

              <Link
                to="/events"
                className="my-tickets-primary-button"
              >
                Explore Events
              </Link>
            </div>
          )}

          {!loading && !error && orders.length > 0 && (
            <div className="my-tickets-list">
              {orders.map((order) => {
                const items = getOrderItems(order)
                const firstItem = items[0]
                const event = getEventFromItem(firstItem)

                const orderId =
                  order.id ||
                  order.order_id ||
                  order.uuid

                const eventName =
                  event?.title ||
                  event?.name ||
                  firstItem?.event_name ||
                  'Event Ticket'

                const eventImage =
                  event?.image_url ||
                  event?.image ||
                  event?.cover_image ||
                  event?.thumbnail ||
                  null

                const quantity =
                  items.reduce(
                    (total, item) =>
                      total +
                      Number(
                        item.quantity ||
                          item.qty ||
                          1,
                      ),
                    0,
                  ) || 1

                const eventDate =
                  event?.start_at ||
                  event?.starts_at ||
                  event?.event_date ||
                  firstItem?.event_date

                const eventLocation =
                  event?.location ||
                  event?.venue ||
                  event?.city ||
                  event?.address ||
                  'Event location'

                const total =
                  order.total_amount ||
                  order.total ||
                  order.grand_total ||
                  0

                const status =
                  order.status ||
                  order.payment_status ||
                  'pending'

                return (
                  <article
                    className="my-ticket-card"
                    key={orderId}
                  >
                    <div className="my-ticket-image">
                      {eventImage ? (
                        <img
                          src={eventImage}
                          alt={eventName}
                        />
                      ) : (
                        <div className="my-ticket-image-placeholder">
                          <Ticket size={36} />
                        </div>
                      )}
                    </div>

                    <div className="my-ticket-main">
                      <div className="my-ticket-top">
                        <span
                          className={`my-ticket-status ${getStatusClass(
                            status,
                          )}`}
                        >
                          {getStatusLabel(status)}
                        </span>

                        <span className="my-ticket-order">
                          #{orderId}
                        </span>
                      </div>

                      <h3>{eventName}</h3>

                      <div className="my-ticket-meta">
                        <span>
                          <CalendarDays size={16} />
                          {formatDate(eventDate)}
                        </span>

                        <span>
                          <MapPin size={16} />
                          {eventLocation}
                        </span>

                        <span>
                          <Ticket size={16} />
                          {quantity}{' '}
                          {quantity === 1
                            ? 'ticket'
                            : 'tickets'}
                        </span>
                      </div>
                    </div>

                    <div className="my-ticket-side">
                      <div className="my-ticket-total-label">
                        TOTAL
                      </div>

                      <strong>
                        {formatCurrency(total)}
                      </strong>

                      <Link
                        to={`/my-tickets/${orderId}`}
                        className="my-ticket-view-button"
                      >
                        View Ticket
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          <div className="my-tickets-note">
            <Clock3 size={17} />
            <span>
              Your ticket details and QR code will be available
              from your booking.
            </span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default MyTickets

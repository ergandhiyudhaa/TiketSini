import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Download,
  MapPin,
  Ticket as TicketIcon,
  UserRound,
  XCircle,
} from 'lucide-react'
import { QRCodeCanvas } from 'qrcode.react'
import { getOrder } from '../services/orderService'
import './TicketDetail.css'

function formatCurrency(value) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

function formatDate(value) {
  if (!value) return '-'

  return new Date(value).toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Asia/Jakarta',
  })
}

function formatTime(value) {
  if (!value) return '-'

  return `${new Date(value).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Jakarta',
  })} WIB`
}

function getStatusConfig(status) {
  const normalized = String(status || '').toLowerCase()

  if (normalized === 'paid' || normalized === 'completed') {
    return {
      label: 'Paid',
      className: 'is-paid',
      icon: CheckCircle2,
      description: 'Your ticket is ready to use at the venue.',
    }
  }

  if (normalized === 'cancelled' || normalized === 'canceled') {
    return {
      label: 'Cancelled',
      className: 'is-cancelled',
      icon: XCircle,
      description: 'This order has been cancelled.',
    }
  }

  if (normalized === 'expired') {
    return {
      label: 'Expired',
      className: 'is-expired',
      icon: XCircle,
      description: 'This order has expired.',
    }
  }

  return {
    label: 'Payment pending',
    className: 'is-pending',
    icon: Clock3,
    description: 'Complete your payment to activate your ticket.',
  }
}

function getEventFromOrder(order) {
  return order?.items?.[0]?.event || null
}

function TicketDetail() {
  const { orderId } = useParams()
  const navigate = useNavigate()

  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadOrder() {
      try {
        setLoading(true)
        setError('')

        const response = await getOrder(orderId)

        setOrder(response?.data || response)
      } catch (err) {
        console.error('Failed to load ticket:', err)

        if (err?.status === 403) {
          setError('You are not allowed to view this ticket.')
        } else if (err?.status === 404) {
          setError('Ticket not found.')
        } else {
          setError('Failed to load ticket details.')
        }
      } finally {
        setLoading(false)
      }
    }

    if (orderId) {
      loadOrder()
    }
  }, [orderId])

  const event = useMemo(() => getEventFromOrder(order), [order])

  const status = useMemo(
    () => getStatusConfig(order?.status),
    [order?.status],
  )

  const StatusIcon = status.icon

  function handlePrint() {
    window.print()
  }

  if (loading) {
    return (
      <main className="ticket-detail-page">
        <div className="ticket-detail-loading">
          <div className="ticket-detail-spinner" />
          <span>Loading your ticket...</span>
        </div>
      </main>
    )
  }

  if (error || !order) {
    return (
      <main className="ticket-detail-page">
        <div className="ticket-detail-error">
          <div className="ticket-detail-error-icon">
            <TicketIcon size={28} />
          </div>

          <span className="ticket-detail-eyebrow">
            TICKET NOT AVAILABLE
          </span>

          <h1>{error || 'Ticket not found.'}</h1>

          <p>
            We couldn't load this ticket. Please return to My Tickets
            and try again.
          </p>

          <Link
            to="/my-tickets"
            className="ticket-detail-back-button"
          >
            <ArrowLeft size={17} />
            Back to My Tickets
          </Link>
        </div>
      </main>
    )
  }

  const items = order.items || []
  const isUsable =
    order.status === 'paid' ||
    order.status === 'completed'

  return (
    <main className="ticket-detail-page">
      <div className="ticket-detail-container">

        {/* BACK */}
        <div className="ticket-detail-topbar">
          <button
            type="button"
            className="ticket-detail-back"
            onClick={() => navigate('/my-tickets')}
          >
            <ArrowLeft size={18} />
            <span>Back to My Tickets</span>
          </button>
        </div>

        {/* STATUS */}
        <div className={`ticket-status-banner ${status.className}`}>
          <div className="ticket-status-icon">
            <StatusIcon size={19} />
          </div>

          <div className="ticket-status-content">
            <strong>{status.label}</strong>
            <span>{status.description}</span>
          </div>

          <div className="ticket-status-order">
            <span>ORDER</span>
            <strong>#{order.order_number || order.id}</strong>
          </div>
        </div>

        <div className="ticket-detail-layout">

          {/* LEFT */}
          <div className="ticket-detail-main">

            {/* EVENT CARD */}
            <section className="ticket-event-card">
              <div className="ticket-event-image">
                {event?.image ? (
                  <img
                    src={event.image}
                    alt={event.name}
                  />
                ) : (
                  <div className="ticket-event-image-placeholder">
                    <TicketIcon size={42} />
                  </div>
                )}
              </div>

              <div className="ticket-event-content">
                <span className="ticket-section-label">
                  EVENT
                </span>

                <h1>
                  {event?.name || 'Event'}
                </h1>

                <div className="ticket-event-info">

                  <div className="ticket-info-row">
                    <CalendarDays size={18} />
                    <div>
                      <span>Date</span>
                      <strong>
                        {formatDate(event?.start_at)}
                      </strong>
                    </div>
                  </div>

                  <div className="ticket-info-row">
                    <Clock3 size={18} />
                    <div>
                      <span>Time</span>
                      <strong>
                        {formatTime(event?.start_at)}
                      </strong>
                    </div>
                  </div>

                  <div className="ticket-info-row">
                    <MapPin size={18} />
                    <div>
                      <span>Venue</span>
                      <strong>
                        {event?.venue || 'Location TBA'}
                      </strong>
                    </div>
                  </div>

                </div>

                <div className="ticket-event-location">
                  <MapPin size={17} />
                  <span>
                    {event?.location ||
                      event?.city ||
                      'Location TBA'}
                  </span>
                </div>
              </div>
            </section>

            {/* ACTUAL TICKETS */}
            <section className="ticket-section">
              <div className="ticket-section-heading">
                <div>
                  <span className="ticket-section-label">
                    TICKET DETAILS
                  </span>
                  <h2>Your tickets</h2>
                </div>

                <span className="ticket-count">
                  {items.reduce(
                    (total, item) =>
                      total + Number(item.quantity || 0),
                    0,
                  )}{' '}
                  {items.length === 1 ? 'ticket' : 'tickets'}
                </span>
              </div>

              <div className="ticket-list">
                {items.map((item) => {
                  const quantity = Number(item.quantity || 0)

                  return Array.from(
                    { length: quantity },
                    (_, index) => {
                      const ticketKey =
                        `${item.id}-${index + 1}`

                      const ticketReference =
                        `${order.order_number || order.id}-${item.id}-${index + 1}`

                      return (
                        <article
                          className="actual-ticket"
                          key={ticketKey}
                        >
                          <div className="actual-ticket-left">

                            <div className="actual-ticket-icon">
                              <TicketIcon size={21} />
                            </div>

                            <div className="actual-ticket-info">
                              <span className="actual-ticket-label">
                                TICKET {quantity > 1 ? `#${index + 1}` : ''}
                              </span>

                              <h3>
                                {item.ticket_name}
                              </h3>

                              <div className="actual-ticket-meta">
                                <span>
                                  {formatCurrency(item.unit_price)}
                                </span>

                                <span>
                                  Ticket ID: {ticketReference}
                                </span>
                              </div>
                            </div>

                          </div>

                          <div className="actual-ticket-qr">
                            {isUsable ? (
                              <>
                                <QRCodeCanvas
                                  value={`TIKETSINI|${ticketReference}`}
                                  size={112}
                                  bgColor="#ffffff"
                                  fgColor="#111827"
                                  level="M"
                                  includeMargin
                                />

                                <span>
                                  Scan at venue
                                </span>
                              </>
                            ) : (
                              <div className="ticket-qr-locked">
                                <Clock3 size={24} />
                                <span>
                                  Awaiting payment
                                </span>
                              </div>
                            )}
                          </div>
                        </article>
                      )
                    },
                  )
                })}
              </div>
            </section>

            {/* ATTENDEE */}
            <section className="ticket-section attendee-section">
              <div className="ticket-section-heading">
                <div>
                  <span className="ticket-section-label">
                    ATTENDEE
                  </span>
                  <h2>Ticket holder</h2>
                </div>
              </div>

              <div className="attendee-card">
                <div className="attendee-icon">
                  <UserRound size={20} />
                </div>

                <div>
                  <strong>
                    {order.user?.name || 'Ticket holder'}
                  </strong>

                  <span>
                    {order.user?.email || 'Email unavailable'}
                  </span>
                </div>
              </div>
            </section>

          </div>

          {/* RIGHT */}
          <aside className="ticket-detail-sidebar">

            {/* ORDER SUMMARY */}
            <section className="ticket-summary-card">
              <span className="ticket-section-label">
                ORDER SUMMARY
              </span>

              <h2>Payment details</h2>

              <div className="ticket-summary-order">
                <span>Order number</span>
                <strong>
                  #{order.order_number || order.id}
                </strong>
              </div>

              <div className="ticket-summary-divider" />

              <div className="ticket-summary-row">
                <span>Subtotal</span>
                <strong>
                  {formatCurrency(order.subtotal)}
                </strong>
              </div>

              <div className="ticket-summary-row">
                <span>Service fee</span>
                <strong>
                  {formatCurrency(order.service_fee)}
                </strong>
              </div>

              <div className="ticket-summary-total">
                <span>Total</span>
                <strong>
                  {formatCurrency(order.total)}
                </strong>
              </div>

              <button
                type="button"
                className={`ticket-download-button ${
                  !isUsable ? 'is-disabled' : ''
                }`}
                onClick={handlePrint}
                disabled={!isUsable}
              >
                <Download size={18} />

                <span>
                  {isUsable
                    ? 'Print / Save Ticket'
                    : 'Payment Required'}
                </span>
              </button>

              {isUsable && (
                <p className="ticket-print-note">
                  Use your browser's print dialog to save the
                  ticket as PDF.
                </p>
              )}
            </section>

            {/* HELP */}
            <section className="ticket-help-card">
              <span className="ticket-section-label">
                NEED HELP?
              </span>

              <h3>
                Your ticket is ready when you are.
              </h3>

              <p>
                Keep your ticket available when you arrive
                at the event venue. Show the QR code at the
                entrance.
              </p>

              <Link to="/events">
                Explore more events
              </Link>
            </section>

          </aside>
        </div>
      </div>
    </main>
  )
}

export default TicketDetail

import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  MapPin,
  ShieldCheck,
  Ticket,
} from 'lucide-react'
import './Checkout.css'

function Checkout() {
  const location = useLocation()
  const navigate = useNavigate()

  const event = location.state?.event
  const tickets = location.state?.tickets || []
  const subtotal = Number(location.state?.subtotal || 0)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
  })

  const [submitted, setSubmitted] = useState(false)

  const serviceFee = useMemo(() => {
    return Math.round(subtotal * 0.05)
  }, [subtotal])

  const total = subtotal + serviceFee

  const formattedDate = event?.starts_at
    ? new Date(event.starts_at).toLocaleDateString('en-US', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'Asia/Jakarta',
      })
    : ''

  const formattedTime = event?.starts_at
    ? new Date(event.starts_at).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
      })
    : ''

  const formatPrice = (value) =>
    new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value)

  function handleChange(event) {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  function handleSubmit(eventSubmit) {
    eventSubmit.preventDefault()

    if (!form.name || !form.email || !form.phone) return

    setSubmitted(true)
  }

  if (!event || tickets.length === 0) {
    return (
      <main className="checkout-empty">
        <div className="checkout-empty-card">
          <div className="checkout-empty-icon">
            <Ticket size={28} />
          </div>

          <h1>No tickets selected</h1>

          <p>
            Choose your tickets first before continuing to checkout.
          </p>

          <button
            type="button"
            onClick={() => navigate('/events')}
          >
            Browse events
          </button>
        </div>
      </main>
    )
  }

  if (submitted) {
    return (
      <main className="checkout-success">
        <div className="checkout-success-card">
          <div className="checkout-success-icon">
            <CheckCircle2 size={42} />
          </div>

          <span className="checkout-success-eyebrow">
            ORDER READY
          </span>

          <h1>You're almost there.</h1>

          <p>
            Your order has been prepared successfully. The payment
            integration will be connected in the next step.
          </p>

          <div className="checkout-success-summary">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
          >
            Back to checkout
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="checkout-page">
      <section className="checkout-header">
        <div className="checkout-header-inner">
          <button
            type="button"
            className="checkout-back"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div>
            <span className="checkout-eyebrow">
              TIKETSINI CHECKOUT
            </span>

            <h1>Complete your order.</h1>

            <p>
              Review your tickets and enter your details before payment.
            </p>
          </div>
        </div>
      </section>

      <section className="checkout-content">
        <div className="checkout-main">

          <div className="checkout-card checkout-event-card">
            <div className="checkout-event-image">
              {event.cover_image ? (
                <img
                  src={event.cover_image}
                  alt={event.title}
                />
              ) : (
                <div className="checkout-event-placeholder">
                  <Ticket size={30} />
                </div>
              )}
            </div>

            <div className="checkout-event-content">
              <span className="checkout-event-category">
                {event.category?.name || 'Event'}
              </span>

              <h2>{event.title}</h2>

              <div className="checkout-event-meta">
                <span>
                  <CalendarDays size={16} />
                  {formattedDate} · {formattedTime}
                </span>

                <span>
                  <MapPin size={16} />
                  {event.venue?.name || event.venue?.city || 'Location TBA'}
                </span>
              </div>
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-heading">
              <div>
                <span>YOUR TICKETS</span>
                <h2>Ticket summary</h2>
              </div>

              <Ticket size={21} />
            </div>

            <div className="checkout-ticket-list">
              {tickets.map((ticket) => (
                <div
                  className="checkout-ticket"
                  key={ticket.ticket_type_id}
                >
                  <div>
                    <strong>{ticket.name}</strong>

                    <span>
                      {ticket.quantity} × {formatPrice(ticket.price)}
                    </span>
                  </div>

                  <strong>
                    {formatPrice(
                      ticket.price * ticket.quantity,
                    )}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          <div className="checkout-card">
            <div className="checkout-card-heading">
              <div>
                <span>BUYER DETAILS</span>
                <h2>Who's attending?</h2>
              </div>
            </div>

            <form
              className="checkout-form"
              onSubmit={handleSubmit}
            >
              <label>
                Full name
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Email address
                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                Phone number
                <input
                  type="tel"
                  name="phone"
                  placeholder="+62 812..."
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </label>

              <div className="checkout-security">
                <ShieldCheck size={18} />

                <span>
                  Your information is only used to process your
                  ticket order.
                </span>
              </div>

              <button
                type="submit"
                className="checkout-submit-mobile"
              >
                Continue to payment
              </button>
            </form>
          </div>

        </div>

        <aside className="checkout-sidebar">
          <div className="checkout-summary-card">
            <span className="checkout-summary-eyebrow">
              ORDER SUMMARY
            </span>

            <h2>Your order</h2>

            <div className="checkout-summary-lines">
              <div>
                <span>Tickets</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div>
                <span>Service fee</span>
                <strong>{formatPrice(serviceFee)}</strong>
              </div>
            </div>

            <div className="checkout-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <button
              type="button"
              className="checkout-submit"
              onClick={() => {
                document
                  .querySelector('.checkout-form')
                  ?.requestSubmit()
              }}
            >
              Continue to payment
            </button>

            <p className="checkout-terms">
              By continuing, you agree to TiketSini's terms and
              conditions.
            </p>
          </div>
        </aside>
      </section>
    </main>
  )
}

export default Checkout

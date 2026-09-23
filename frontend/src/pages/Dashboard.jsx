import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  MapPin,
  Ticket,
  TicketCheck,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { getEvents } from '../services/eventService'
import './Dashboard.css'

function getGreeting() {
  const hour = new Date().getHours()

  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

function formatDate(date) {
  if (!date) return 'Date to be announced'

  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

function Dashboard() {
  const { user } = useAuth()
  const [events, setEvents] = useState([])
  const [loadingEvents, setLoadingEvents] = useState(true)

  useEffect(() => {
    let mounted = true

    async function loadEvents() {
      try {
        const response = await getEvents()

        const items =
          response?.data ||
          response?.events ||
          []

        if (mounted) {
          setEvents(items.slice(0, 3))
        }
      } catch {
        if (mounted) {
          setEvents([])
        }
      } finally {
        if (mounted) {
          setLoadingEvents(false)
        }
      }
    }

    loadEvents()

    return () => {
      mounted = false
    }
  }, [])

  const firstName =
    user?.name?.trim()?.split(' ')[0] || 'there'

  return (
    <main className="dashboard-page">
      <div className="dashboard-container">

        <section className="dashboard-hero">
          <div className="dashboard-hero-decoration dashboard-decoration-one" />
          <div className="dashboard-hero-decoration dashboard-decoration-two" />
          <div className="dashboard-hero-decoration dashboard-decoration-three" />

          <div className="dashboard-hero-content">
            <span className="dashboard-eyebrow">
              <Sparkles size={15} />
              YOUR TIKETSINI
            </span>

            <h1>
              {getGreeting()}, {firstName}!
            </h1>

            <p>
              Ready to find something worth showing up for?
              Your next experience might be just a few clicks away.
            </p>

            <div className="dashboard-hero-actions">
              <Link to="/events" className="dashboard-primary-button">
                Explore events
                <ArrowRight size={18} />
              </Link>

              <Link to="/my-tickets" className="dashboard-secondary-button">
                <TicketCheck size={17} />
                My tickets
              </Link>
            </div>
          </div>

          <div className="dashboard-hero-ticket">
            <div className="dashboard-ticket-top">
              <span>TIKETSINI</span>
              <Ticket size={22} />
            </div>

            <div className="dashboard-ticket-middle">
              <small>YOUR NEXT</small>
              <strong>ADVENTURE</strong>
              <span>IS WAITING.</span>
            </div>

            <div className="dashboard-ticket-line" />

            <div className="dashboard-ticket-bottom">
              <span>READY?</span>
              <span>TSN • 2026</span>
            </div>
          </div>
        </section>

        <section className="dashboard-section dashboard-quick-section">
          <div className="dashboard-section-heading">
            <div>
              <span className="dashboard-section-eyebrow">
                QUICK ACCESS
              </span>
              <h2>Make it happen.</h2>
            </div>
          </div>

          <div className="dashboard-quick-grid">
            <Link to="/events" className="dashboard-quick-card quick-blue">
              <span className="dashboard-quick-icon">
                <CalendarDays size={22} />
              </span>

              <div>
                <strong>Explore Events</strong>
                <p>Find your next plan.</p>
              </div>

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/my-tickets"
              className="dashboard-quick-card quick-orange"
            >
              <span className="dashboard-quick-icon">
                <TicketCheck size={22} />
              </span>

              <div>
                <strong>My Tickets</strong>
                <p>Your tickets, all in one place.</p>
              </div>

              <ArrowRight size={18} />
            </Link>

            <Link
              to="/profile"
              className="dashboard-quick-card quick-purple"
            >
              <span className="dashboard-quick-icon">
                <UserRound size={22} />
              </span>

              <div>
                <strong>My Profile</strong>
                <p>Manage your account.</p>
              </div>

              <ArrowRight size={18} />
            </Link>
          </div>
        </section>

        <section className="dashboard-section">
          <div className="dashboard-section-heading dashboard-events-heading">
            <div>
              <span className="dashboard-section-eyebrow">
                DISCOVER
              </span>
              <h2>What's happening?</h2>
              <p>Some events you might want to check out.</p>
            </div>

            <Link to="/events" className="dashboard-view-all">
              View all
              <ArrowRight size={16} />
            </Link>
          </div>

          {loadingEvents ? (
            <div className="dashboard-event-loading">
              <div />
              <div />
              <div />
            </div>
          ) : events.length > 0 ? (
            <div className="dashboard-events-grid">
              {events.map((event) => (
                <Link
                  to={`/events/${event.slug}`}
                  className="dashboard-event-card"
                  key={event.id}
                >
                  <div className="dashboard-event-image">
                    {event.cover_image ? (
                      <img
                        src={event.cover_image}
                        alt={event.title}
                      />
                    ) : (
                      <div className="dashboard-event-placeholder">
                        <Ticket size={30} />
                      </div>
                    )}

                    {event.category?.name && (
                      <span className="dashboard-event-category">
                        {event.category.name}
                      </span>
                    )}
                  </div>

                  <div className="dashboard-event-content">
                    <h3>{event.title}</h3>

                    <div className="dashboard-event-meta">
                      <span>
                        <CalendarDays size={15} />
                        {formatDate(event.starts_at)}
                      </span>

                      {event.city && (
                        <span>
                          <MapPin size={15} />
                          {event.city}
                        </span>
                      )}
                    </div>

                    <div className="dashboard-event-link">
                      View event
                      <ArrowRight size={15} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="dashboard-empty">
              <div className="dashboard-empty-icon">
                <CalendarDays size={26} />
              </div>

              <h3>No upcoming events yet.</h3>

              <p>
                We're getting things ready. Check back soon
                for something exciting.
              </p>

              <Link to="/events">
                Browse events
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </section>

        <section className="dashboard-bottom-cta">
          <div>
            <span>ONE ACCOUNT. ENDLESS EXPERIENCES.</span>
            <h2>
              There’s always something
              <br />
              happening nearby.
            </h2>
          </div>

          <Link to="/events">
            Find something fun
            <ArrowRight size={18} />
          </Link>
        </section>

      </div>
    </main>
  )
}

export default Dashboard

import {
  Search,
  Ticket,
  CreditCard,
  Smartphone,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  CalendarDays,
  Download,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './HowItWorks.css'

const steps = [
  {
    number: '01',
    icon: Search,
    title: 'Find your event',
    description:
      'Explore concerts, sports, experiences, and exciting events happening around you.',
  },
  {
    number: '02',
    icon: Ticket,
    title: 'Choose your ticket',
    description:
      'Pick the event and ticket type that fits what you are looking for.',
  },
  {
    number: '03',
    icon: CreditCard,
    title: 'Complete your payment',
    description:
      'Checkout quickly and securely using the payment method available to you.',
  },
  {
    number: '04',
    icon: Smartphone,
    title: 'Get your ticket',
    description:
      'Your digital ticket is ready. Access it anytime from your TiketSini account.',
  },
]

function HowItWorks() {
  const navigate = useNavigate()

  return (
    <div className="how-page">
      <section className="how-hero">
        <div className="how-hero-orb how-hero-orb-one" />
        <div className="how-hero-orb how-hero-orb-two" />

        <div className="how-container how-hero-content">
          <span className="how-eyebrow">
            <Sparkles size={14} />
            HOW IT WORKS
          </span>

          <h1>
            From <span>“what’s happening?”</span>
            <br />
            to <strong>“I’m going!”</strong>
          </h1>

          <p>
            Getting tickets on TiketSini is simple. Discover something
            exciting, book your spot, and get ready to make memories.
          </p>

          <button
            type="button"
            className="how-primary-button"
            onClick={() => navigate('/events')}
          >
            Explore events
            <ArrowRight size={18} />
          </button>
        </div>

        <div className="how-floating-ticket how-floating-ticket-one">
          <Ticket size={22} />
          <div>
            <strong>Event booked!</strong>
            <small>Your ticket is ready</small>
          </div>
          <CheckCircle2 size={20} />
        </div>

        <div className="how-floating-ticket how-floating-ticket-two">
          <CalendarDays size={21} />
          <div>
            <strong>Something fun?</strong>
            <small>Find it on TiketSini</small>
          </div>
        </div>
      </section>

      <section className="how-steps-section">
        <div className="how-container">
          <div className="how-section-heading">
            <span className="how-section-label">THE EASY PART</span>
            <h2>Four steps. Zero drama.</h2>
            <p>
              Everything you need to go from browsing to enjoying your event.
            </p>
          </div>

          <div className="how-steps">
            {steps.map((step, index) => {
              const Icon = step.icon

              return (
                <div className="how-step" key={step.number}>
                  <div className="how-step-top">
                    <span className="how-step-number">{step.number}</span>

                    <div className="how-step-icon">
                      <Icon size={25} />
                    </div>
                  </div>

                  <h3>{step.title}</h3>
                  <p>{step.description}</p>

                  {index < steps.length - 1 && (
                    <ArrowRight className="how-step-arrow" size={22} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="how-ticket-section">
        <div className="how-container">
          <div className="how-ticket-card">
            <div className="how-ticket-copy">
              <span className="how-section-label">YOUR TICKET, YOUR WAY</span>

              <h2>
                Keep your tickets
                <br />
                <span>right in your pocket.</span>
              </h2>

              <p>
                No need to worry about losing a paper ticket. Your tickets
                stay available in your TiketSini account whenever you need
                them.
              </p>

              <div className="how-feature-list">
                <div>
                  <CheckCircle2 size={18} />
                  <span>Digital tickets</span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>Easy access anytime</span>
                </div>

                <div>
                  <CheckCircle2 size={18} />
                  <span>Ready when you are</span>
                </div>
              </div>

              <button
                type="button"
                className="how-secondary-button"
                onClick={() => navigate('/my-tickets')}
              >
                View my tickets
                <ArrowRight size={17} />
              </button>
            </div>

            <div className="how-ticket-visual">
              <div className="how-ticket">
                <div className="how-ticket-header">
                  <div className="how-ticket-logo">
                    <span>Tiket</span>Sini
                  </div>
                  <Ticket size={23} />
                </div>

                <div className="how-ticket-event">
                  <span>YOUR NEXT ADVENTURE</span>
                  <strong>Good times<br />are waiting.</strong>
                </div>

                <div className="how-ticket-details">
                  <div>
                    <small>DATE</small>
                    <strong>YOUR DAY</strong>
                  </div>

                  <div>
                    <small>LOCATION</small>
                    <strong>YOUR CITY</strong>
                  </div>
                </div>

                <div className="how-ticket-barcode">
                  <div className="barcode-lines" />
                  <Download size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-cta-section">
        <div className="how-container">
          <div className="how-cta">
            <Sparkles size={25} />
            <h2>Ready to find something fun?</h2>
            <p>
              Your next experience might be closer than you think.
            </p>

            <button
              type="button"
              onClick={() => navigate('/events')}
            >
              Browse all events
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks

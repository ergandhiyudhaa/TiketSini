import {
  BadgeCheck,
  CreditCard,
  Headphones,
  Zap,
} from 'lucide-react'
import './WhyTiketSini.css'

const features = [
  {
    icon: Zap,
    number: '01',
    title: 'Simple booking',
    description:
      'Find an event, choose your ticket, and complete your booking without unnecessary steps.',
  },
  {
    icon: CreditCard,
    number: '02',
    title: 'Easy payment',
    description:
      'A straightforward checkout experience designed to make buying tickets feel effortless.',
  },
  {
    icon: BadgeCheck,
    number: '03',
    title: 'Instant confirmation',
    description:
      'Get your booking information clearly after completing your purchase.',
  },
  {
    icon: Headphones,
    number: '04',
    title: 'Here when you need us',
    description:
      'Need help? TiketSini is built to keep support close throughout your experience.',
  },
]

function WhyTiketSini() {
  return (
    <section className="why-tiketsini-section">
      <div className="why-tiketsini-container">
        <div className="why-tiketsini-intro">
          <span className="section-eyebrow">
            WHY TIKETSINI
          </span>

          <h2>
            Ticketing should feel
            <span> effortless.</span>
          </h2>

          <p>
            From discovering something exciting to getting your ticket,
            we keep the experience simple and focused on what matters.
          </p>
        </div>

        <div className="why-tiketsini-grid">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <article
                className="why-tiketsini-card"
                key={feature.number}
              >
                <div className="why-tiketsini-card-top">
                  <span>{feature.number}</span>
                  <Icon size={22} />
                </div>

                <h3>{feature.title}</h3>

                <p>{feature.description}</p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default WhyTiketSini

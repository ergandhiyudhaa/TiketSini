import './HowItWorks.css'

const steps = [
  {
    number: '01',
    label: 'DISCOVER',
    title: 'Find something worth going to.',
    description:
      'Explore events, discover new experiences, and find something that matches your vibe.',
    visual: (
      <div className="hiw-visual hiw-discover">
        <div className="hiw-search-bar">
          <span className="hiw-search-dot" />
          <span>Search events...</span>
        </div>

        <div className="hiw-mini-card hiw-mini-card-one">
          <div className="hiw-mini-image" />
          <div>
            <strong>Music Festival</strong>
            <span>Jakarta · Sat</span>
          </div>
        </div>

        <div className="hiw-mini-card hiw-mini-card-two">
          <div className="hiw-mini-image orange" />
          <div>
            <strong>Golf Experience</strong>
            <span>Bandung · Sun</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    number: '02',
    label: 'CHOOSE',
    title: 'Pick your perfect ticket.',
    description:
      'Choose the ticket type that works for you and set the quantity in just a few taps.',
    visual: (
      <div className="hiw-visual hiw-choose">
        <div className="hiw-ticket-card">
          <div>
            <span>GENERAL ADMISSION</span>
            <strong>IDR 150K</strong>
          </div>

          <div className="hiw-counter">
            <button type="button">−</button>
            <strong>2</strong>
            <button type="button">+</button>
          </div>
        </div>

        <div className="hiw-floating-badge">2 tickets</div>
      </div>
    ),
  },
  {
    number: '03',
    label: 'CHECKOUT',
    title: 'One quick checkout.',
    description:
      'Review your order, enter your details, and complete your payment securely.',
    visual: (
      <div className="hiw-visual hiw-checkout">
        <div className="hiw-payment-card">
          <div className="hiw-payment-top">
            <span>YOUR ORDER</span>
            <span>•••</span>
          </div>

          <div className="hiw-payment-line">
            <span>2 × Ticket</span>
            <strong>IDR 300K</strong>
          </div>

          <div className="hiw-payment-divider" />

          <div className="hiw-payment-total">
            <span>Total</span>
            <strong>IDR 300K</strong>
          </div>

          <div className="hiw-payment-button">Pay securely</div>
        </div>
      </div>
    ),
  },
  {
    number: '04',
    label: 'ENJOY',
    title: 'Show up. Have fun.',
    description:
      'Your ticket is ready. Bring it with you and enjoy the experience.',
    visual: (
      <div className="hiw-visual hiw-enjoy">
        <div className="hiw-ticket-pass">
          <div className="hiw-pass-main">
            <span className="hiw-pass-label">TIKETSINI PASS</span>
            <strong>LIVE MUSIC NIGHT</strong>
            <small>23 OCT · JAKARTA</small>
          </div>

          <div className="hiw-pass-code">
            <div className="hiw-barcode">
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span>#TS24023</span>
          </div>
        </div>

        <div className="hiw-spark hiw-spark-one">✦</div>
        <div className="hiw-spark hiw-spark-two">✦</div>
      </div>
    ),
  },
]

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-heading">
          <div>
            <span className="how-it-works-eyebrow">HOW IT WORKS</span>
            <h2>
              From “what should I do?”
              <br />
              to <em>“see you there.”</em>
            </h2>
          </div>

          <p>
            Getting your next experience should be as exciting as the event
            itself.
          </p>
        </div>

        <div className="how-it-works-steps">
          {steps.map((step, index) => (
            <article className="hiw-step" key={step.number}>
              <div className="hiw-step-top">
                <span className="hiw-step-number">{step.number}</span>
                <span className="hiw-step-label">{step.label}</span>
              </div>

              {step.visual}

              <div className="hiw-step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hiw-connector" aria-hidden="true">
                  <span>→</span>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HowItWorks

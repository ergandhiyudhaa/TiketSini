import { ArrowUpRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './HomeCTA.css'

function HomeCTA() {
  const navigate = useNavigate()

  return (
    <section className="home-cta-section">
      <div className="home-cta-container">
        <div className="home-cta-glow home-cta-glow-one" />
        <div className="home-cta-glow home-cta-glow-two" />

        <div className="home-cta-content">
          <span className="home-cta-eyebrow">
            READY FOR YOUR NEXT EXPERIENCE?
          </span>

          <h2>
            There is always
            <br />
            something <span>waiting.</span>
          </h2>

          <p>
            Find your next event and make your next day a little
            more exciting.
          </p>

          <button
            type="button"
            className="home-cta-button"
            onClick={() => navigate('/events')}
          >
            Explore events
            <ArrowUpRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default HomeCTA

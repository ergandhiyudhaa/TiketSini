import {
  Music2,
  Trophy,
  CalendarDays,
  Sparkles,
  PartyPopper,
  MapPinned,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import './CategorySection.css'

const categories = [
  {
    name: 'Music',
    icon: Music2,
    description: 'Concerts & festivals',
  },
  {
    name: 'Sports',
    icon: Trophy,
    description: 'Games & competitions',
  },
  {
    name: 'Events',
    icon: CalendarDays,
    description: 'Things happening nearby',
  },
  {
    name: 'Experience',
    icon: Sparkles,
    description: 'Something different',
  },
  {
    name: 'Entertainment',
    icon: PartyPopper,
    description: 'Fun & good times',
  },
  {
    name: 'Local',
    icon: MapPinned,
    description: 'Discover your city',
  },
]

function CategorySection() {
  const navigate = useNavigate()

  return (
    <section className="category-section">
      <div className="category-container">
        <div className="category-heading">
          <div>
            <span className="category-eyebrow">BROWSE BY TYPE</span>
            <h2>What are you in the mood for?</h2>
          </div>

          <button
            type="button"
            onClick={() => navigate('/events')}
          >
            View all events
          </button>
        </div>

        <div className="category-list">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <button
                type="button"
                className="category-item"
                key={category.name}
                onClick={() =>
                  navigate(
                    `/events?category=${encodeURIComponent(
                      category.name,
                    )}`,
                  )
                }
              >
                <span className="category-icon">
                  <Icon size={21} />
                </span>

                <span className="category-copy">
                  <strong>{category.name}</strong>
                  <small>{category.description}</small>
                </span>

                <span className="category-arrow">↗</span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CategorySection

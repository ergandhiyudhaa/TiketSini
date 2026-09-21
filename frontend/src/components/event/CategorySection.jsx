import { useEffect, useState } from 'react'
import {
  ArrowRight,
  CalendarDays,
  Clapperboard,
  Dumbbell,
  Laugh,
  Music,
  Palette,
  Presentation,
  Sparkles,
} from 'lucide-react'
import { getCategories } from '../../services/categoryService'
import './CategorySection.css'

const categoryIcons = {
  music: Music,
  sports: Dumbbell,
  comedy: Laugh,
  festival: Sparkles,
  conference: Presentation,
  workshop: Palette,
  exhibition: Clapperboard,
}

function CategorySection() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories()
        setCategories(data)
      } catch (err) {
        setError(err.message || 'Failed to load categories.')
      } finally {
        setLoading(false)
      }
    }

    loadCategories()
  }, [])

  return (
    <section className="category-section">
      <div className="category-container">
        <div className="category-header">
          <div>
            <span className="section-eyebrow">
              <CalendarDays size={15} />
              EXPLORE BY CATEGORY
            </span>

            <h2>
              Find events that
              <span> match your vibe.</span>
            </h2>

            <p>
              From live music to exciting sports and creative experiences,
              discover something worth experiencing.
            </p>
          </div>

          <button type="button" className="category-view-all">
            View all
            <ArrowRight size={18} />
          </button>
        </div>

        {loading && (
          <div className="category-grid">
            {Array.from({ length: 7 }).map((_, index) => (
              <div className="category-skeleton" key={index} />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="category-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="category-grid">
            {categories.map((category) => {
              const Icon = categoryIcons[category.slug] || Sparkles

              return (
                <button
                  type="button"
                  className="category-card"
                  key={category.id}
                >
                  <div className="category-icon">
                    <Icon size={24} strokeWidth={2} />
                  </div>

                  <div className="category-card-content">
                    <h3>{category.name}</h3>
                    <span>Explore events</span>
                  </div>

                  <ArrowRight
                    className="category-card-arrow"
                    size={18}
                  />
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}

export default CategorySection
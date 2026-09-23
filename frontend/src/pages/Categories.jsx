import {
  ArrowRight,
  Dumbbell,
  Gamepad2,
  Heart,
  Landmark,
  MapPin,
  Music2,
  Palette,
  Plane,
  Sparkles,
  Ticket,
  Trophy,
  Utensils,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import './Categories.css'

const categories = [
  {
    name: 'Music',
    description: 'Concerts, festivals, and live performances.',
    icon: Music2,
    className: 'category-blue',
  },
  {
    name: 'Sports',
    description: 'Matches, tournaments, races, and more.',
    icon: Trophy,
    className: 'category-orange',
  },
  {
    name: 'Entertainment',
    description: 'Shows, games, attractions, and experiences.',
    icon: Sparkles,
    className: 'category-purple',
  },
  {
    name: 'Arts & Culture',
    description: 'Art exhibitions, theatre, and cultural events.',
    icon: Palette,
    className: 'category-pink',
  },
  {
    name: 'Food & Drink',
    description: 'Food experiences, tastings, and culinary events.',
    icon: Utensils,
    className: 'category-green',
  },
  {
    name: 'Travel',
    description: 'Trips, tours, destinations, and adventures.',
    icon: Plane,
    className: 'category-sky',
  },
  {
    name: 'Wellness',
    description: 'Fitness, wellness, and mindful experiences.',
    icon: Heart,
    className: 'category-red',
  },
  {
    name: 'Community',
    description: 'Meetups, social events, and local gatherings.',
    icon: Landmark,
    className: 'category-yellow',
  },
  {
    name: 'Activities',
    description: 'Fun things to do with friends and family.',
    icon: Gamepad2,
    className: 'category-indigo',
  },
  {
    name: 'Golf',
    description: 'Golf games, tournaments, and golf experiences.',
    icon: Dumbbell,
    className: 'category-teal',
  },
]

function Categories() {
  return (
    <main className="categories-page">
      <section className="categories-hero">
        <div className="categories-hero-orb categories-hero-orb-one" />
        <div className="categories-hero-orb categories-hero-orb-two" />

        <div className="categories-container categories-hero-inner">
          <div className="categories-hero-copy">
            <span className="categories-eyebrow">
              <Ticket size={14} />
              FIND YOUR MOMENT
            </span>

            <h1>
              What are you
              <span> into?</span>
            </h1>

            <p>
              Explore events by category and find something worth
              experiencing. From music and sports to food, travel, and
              everything in between.
            </p>
          </div>

          <div className="categories-hero-badge">
            <div className="categories-hero-badge-icon">
              <Sparkles size={25} />
            </div>
            <strong>Something for everyone.</strong>
            <span>Find an experience that feels like you.</span>
          </div>
        </div>
      </section>

      <section className="categories-content">
        <div className="categories-container">
          <div className="categories-heading">
            <div>
              <span className="categories-section-label">
                EXPLORE CATEGORIES
              </span>
              <h2>
                Find what
                <span> excites you.</span>
              </h2>
            </div>

            <p>
              Browse different types of experiences and discover your next
              event.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => {
              const Icon = category.icon

              return (
                <Link
                  key={category.name}
                  to={`/events?category=${encodeURIComponent(category.name)}`}
                  className={`category-card ${category.className}`}
                >
                  <div className="category-card-top">
                    <div className="category-icon">
                      <Icon size={23} strokeWidth={2.2} />
                    </div>

                    <ArrowRight
                      className="category-arrow"
                      size={20}
                    />
                  </div>

                  <div className="category-card-content">
                    <span className="category-location">
                      <MapPin size={12} />
                      TIKETSINI
                    </span>

                    <h3>{category.name}</h3>

                    <p>{category.description}</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="categories-bottom">
        <div className="categories-container">
          <div className="categories-bottom-card">
            <div>
              <span className="categories-section-label">CAN'T DECIDE?</span>
              <h2>
                Just explore
                <span> everything.</span>
              </h2>
            </div>

            <Link to="/events" className="categories-primary-button">
              Explore All Events
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Categories

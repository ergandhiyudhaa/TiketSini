import { useEffect, useMemo, useState } from 'react'
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react'

import { getEvents } from '../services/eventService'
import EventCard from '../components/event/EventCard'

import './Events.css'

function Events() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [search, setSearch] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  const [categoryFilter, setCategoryFilter] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [dateFilter, setDateFilter] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const [appliedFilters, setAppliedFilters] = useState({
    category: '',
    location: '',
    date: '',
    maxPrice: '',
  })

  async function loadEvents() {
    try {
      setLoading(true)
      setError('')

      const response = await getEvents()

      setEvents(response.data || [])
    } catch (err) {
      console.error(err)
      setError('Failed to load events.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents()
  }, [])


  const categories = useMemo(() => {
    const values = events
      .map((event) => event.category?.name)
      .filter(Boolean)

    return [...new Set(values)].sort()
  }, [events])

  const locations = useMemo(() => {
    const values = events
      .map((event) => event.venue?.city)
      .filter(Boolean)

    return [...new Set(values)].sort()
  }, [events])

  const filteredEvents = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return events.filter((event) => {
      const title = event.title?.toLowerCase() || ''
      const category = event.category?.name?.toLowerCase() || ''
      const city = event.venue?.city?.toLowerCase() || ''

      const matchesSearch =
        !normalizedSearch ||
        title.includes(normalizedSearch) ||
        category.includes(normalizedSearch) ||
        city.includes(normalizedSearch)

      const matchesCategory =
        !appliedFilters.category ||
        event.category?.name === appliedFilters.category

      const matchesLocation =
        !appliedFilters.location ||
        event.venue?.city === appliedFilters.location

      const eventDate = event.starts_at
        ? new Date(event.starts_at)
        : null

      const today = new Date()

      const matchesDate = (() => {
        if (!appliedFilters.date || !eventDate) {
          return true
        }

        if (appliedFilters.date === 'today') {
          return (
            eventDate.getFullYear() === today.getFullYear() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getDate() === today.getDate()
          )
        }

        if (appliedFilters.date === 'this-week') {
          const startOfWeek = new Date(today)
          startOfWeek.setHours(0, 0, 0, 0)

          const day = startOfWeek.getDay()
          const diff = day === 0 ? -6 : 1 - day

          startOfWeek.setDate(
            startOfWeek.getDate() + diff
          )

          const endOfWeek = new Date(startOfWeek)
          endOfWeek.setDate(
            startOfWeek.getDate() + 6
          )
          endOfWeek.setHours(23, 59, 59, 999)

          return (
            eventDate >= startOfWeek &&
            eventDate <= endOfWeek
          )
        }

        if (appliedFilters.date === 'this-month') {
          return (
            eventDate.getFullYear() === today.getFullYear() &&
            eventDate.getMonth() === today.getMonth()
          )
        }

        if (appliedFilters.date === 'next-month') {
          const nextMonth = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            1
          )

          return (
            eventDate.getFullYear() ===
              nextMonth.getFullYear() &&
            eventDate.getMonth() ===
              nextMonth.getMonth()
          )
        }

        return true
      })()

      const lowestPrice =
        event.ticket_types?.length > 0
          ? Math.min(
              ...event.ticket_types.map((ticket) =>
                Number(ticket.price)
              )
            )
          : null

      const matchesPrice =
        !appliedFilters.maxPrice ||
        (lowestPrice !== null &&
          lowestPrice <= Number(appliedFilters.maxPrice))

      return (
        matchesSearch &&
        matchesCategory &&
        matchesLocation &&
        matchesDate &&
        matchesPrice
      )
    })
  }, [events, search, appliedFilters])

  const activeFilterCount = [
    appliedFilters.category,
    appliedFilters.location,
    appliedFilters.date,
    appliedFilters.maxPrice,
  ].filter(Boolean).length

  function applyFilters() {
    setAppliedFilters({
      category: categoryFilter,
      location: locationFilter,
      date: dateFilter,
      maxPrice,
    })

    setIsFilterOpen(false)
  }

  function resetFilters() {
    setCategoryFilter('')
    setLocationFilter('')
    setDateFilter('')
    setMaxPrice('')

    setAppliedFilters({
      category: '',
      location: '',
      date: '',
      maxPrice: '',
    })
  }

  return (
    <main className="events-page">

      {/* =========================
          HERO
      ========================= */}

      <section className="events-hero">
        <div className="events-hero-content">

          <span className="events-eyebrow">
            EXPLORE TIKETSINI
          </span>

          <h1>
            Find something
            <span>worth experiencing.</span>
          </h1>

          <p>
            Discover concerts, sports, festivals, workshops,
            and unforgettable experiences around Indonesia.
          </p>

        </div>
      </section>

      {/* =========================
          CONTENT
      ========================= */}

      <section className="events-content">

        {/* SEARCH */}

        <div className="events-toolbar">

          <div className="events-search">

            <Search size={20} />

            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

            {search && (
              <button
                type="button"
                className="events-search-clear"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}

          </div>

          <button
            type="button"
            className={`events-filter-button ${
              isFilterOpen ? 'is-active' : ''
            }`}
            onClick={() =>
              setIsFilterOpen((current) => !current)
            }
          >
            <SlidersHorizontal size={18} />

            <span>Filters</span>

            {activeFilterCount > 0 && (
              <span className="events-filter-count">
                {activeFilterCount}
              </span>
            )}
          </button>

        </div>

        {/* FILTER PANEL */}

        {isFilterOpen && (
          <div className="events-filter-panel">

            <div className="events-filter-header">

              <div>
                <span className="events-filter-label">
                  FILTER EVENTS
                </span>

                <h3>Find the right event</h3>
              </div>

              <button
                type="button"
                className="events-filter-close"
                onClick={() => setIsFilterOpen(false)}
                aria-label="Close filters"
              >
                <X size={18} />
              </button>

            </div>

            <div className="events-filter-grid">

              {/* CATEGORY */}

              <label className="events-filter-field">
                <span>Category</span>

                <div className="events-select">
                  <select
                    value={categoryFilter}
                    onChange={(event) =>
                      setCategoryFilter(event.target.value)
                    }
                  >
                    <option value="">
                      All categories
                    </option>

                    {categories.map((category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={16} />
                </div>
              </label>

              {/* LOCATION */}

              <label className="events-filter-field">
                <span>Location</span>

                <div className="events-select">
                  <select
                    value={locationFilter}
                    onChange={(event) =>
                      setLocationFilter(event.target.value)
                    }
                  >
                    <option value="">
                      All locations
                    </option>

                    {locations.map((location) => (
                      <option
                        key={location}
                        value={location}
                      >
                        {location}
                      </option>
                    ))}
                  </select>

                  <ChevronDown size={16} />
                </div>
              </label>

              {/* DATE */}

              <label className="events-filter-field">
                <span>Date</span>

                <div className="events-select">
                  <select
                    value={dateFilter}
                    onChange={(event) =>
                      setDateFilter(event.target.value)
                    }
                  >
                    <option value="">
                      Any date
                    </option>

                    <option value="today">
                      Today
                    </option>

                    <option value="this-week">
                      This week
                    </option>

                    <option value="this-month">
                      This month
                    </option>

                    <option value="next-month">
                      Next month
                    </option>
                  </select>

                  <ChevronDown size={16} />
                </div>
              </label>

              {/* PRICE */}

              <label className="events-filter-field">
                <span>Maximum price</span>

                <div className="events-price-input">
                  <span>Rp</span>

                  <input
                    type="number"
                    min="0"
                    placeholder="No limit"
                    value={maxPrice}
                    onChange={(event) =>
                      setMaxPrice(event.target.value)
                    }
                  />
                </div>
              </label>

            </div>

            <div className="events-filter-actions">

              <button
                type="button"
                className="events-reset-button"
                onClick={resetFilters}
              >
                Reset
              </button>

              <button
                type="button"
                className="events-apply-button"
                onClick={applyFilters}
              >
                Apply filters
              </button>

            </div>

          </div>
        )}

        {/* HEADING */}

        <div className="events-heading">

          <div>
            <span className="events-section-label">
              DISCOVER
            </span>

            <h2>
              Upcoming <span>events.</span>
            </h2>
          </div>

          <span className="events-count">
            {filteredEvents.length} events
          </span>

        </div>

        {/* STATES */}

        {loading && (
          <div className="events-state">
            Loading events...
          </div>
        )}

        {error && (
          <div className="events-state events-error">
            {error}
          </div>
        )}

        {!loading &&
          !error &&
          filteredEvents.length === 0 && (
            <div className="events-empty">

              <div className="events-empty-icon">
                <Search size={24} />
              </div>

              <h3>
                No events found
              </h3>

              <p>
                Try changing your search or filters
                to find more events.
              </p>

              {(search || activeFilterCount > 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch('')
                    resetFilters()
                  }}
                >
                  Clear all filters
                </button>
              )}

            </div>
          )}

        {/* GRID */}

        {!loading &&
          !error &&
          filteredEvents.length > 0 && (
            <div className="events-grid">

              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              ))}

            </div>
          )}

      </section>

    </main>
  )
}

export default Events

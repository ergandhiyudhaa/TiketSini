import { useState } from 'react'
import { ChevronDown, HelpCircle, Search, Sparkles } from 'lucide-react'
import './FAQ.css'

const faqGroups = [
  {
    title: 'Getting started',
    icon: '✨',
    questions: [
      {
        question: 'What is TiketSini?',
        answer:
          'TiketSini is a place to discover and book tickets for events, concerts, sports, festivals, workshops, and other exciting experiences.',
      },
      {
        question: 'How do I buy a ticket?',
        answer:
          'Find an event you like, choose your ticket type and quantity, continue to checkout, and complete your order. Your ticket will be available from your account after the order is confirmed.',
      },
      {
        question: 'Do I need an account to buy a ticket?',
        answer:
          'Yes. Creating an account helps us keep your orders and tickets in one place, so you can easily access them whenever you need them.',
      },
    ],
  },
  {
    title: 'Tickets & orders',
    icon: '🎟️',
    questions: [
      {
        question: 'Where can I find my tickets?',
        answer:
          'You can find your purchased tickets from the My Tickets page after signing in to your TiketSini account.',
      },
      {
        question: 'Can I choose different ticket types in one order?',
        answer:
          'Yes. When an event offers multiple ticket types, you can select the available ticket types and quantities before checking out.',
      },
      {
        question: 'How long is my pending order valid?',
        answer:
          'A pending order is temporarily reserved for you while you complete the checkout process. The reservation expires when the order reaches its expiration time.',
      },
      {
        question: 'Why is my selected ticket unavailable?',
        answer:
          'Ticket availability can change quickly. If another customer purchases the remaining quota before your order is completed, the ticket may no longer be available.',
      },
    ],
  },
  {
    title: 'Events',
    icon: '🎉',
    questions: [
      {
        question: 'What kind of events are available?',
        answer:
          'TiketSini can feature many types of experiences, including music, sports, festivals, comedy, conferences, workshops, exhibitions, and more.',
      },
      {
        question: 'How can I find a specific event?',
        answer:
          'Use the search bar on the Events page. You can also filter events by category, location, date, and ticket price.',
      },
      {
        question: 'Can event information change?',
        answer:
          'Yes. Event details such as schedules, venues, ticket availability, and other information may change. Always check the latest event information before attending.',
      },
    ],
  },
  {
    title: 'Account & support',
    icon: '💬',
    questions: [
      {
        question: 'How do I update my profile?',
        answer:
          'Sign in to your account and open your Profile page to manage your available account information.',
      },
      {
        question: 'I have a problem with my order. What should I do?',
        answer:
          'Start by checking your order status and ticket details from your account. If you still need help, please contact the TiketSini support team.',
      },
      {
        question: 'I still have a question. Can I contact TiketSini?',
        answer:
          'Absolutely. If your question is not answered here, reach out to the TiketSini team and include your order number when your question is related to a purchase.',
      },
    ],
  },
]

function FAQ() {
  const [openItem, setOpenItem] = useState('0-0')
  const [search, setSearch] = useState('')

  const normalizedSearch = search.trim().toLowerCase()

  const filteredGroups = faqGroups
    .map((group, groupIndex) => ({
      ...group,
      groupIndex,
      questions: group.questions.filter((item) => {
        if (!normalizedSearch) return true

        return (
          item.question.toLowerCase().includes(normalizedSearch) ||
          item.answer.toLowerCase().includes(normalizedSearch)
        )
      }),
    }))
    .filter((group) => group.questions.length > 0)

  function toggleItem(id) {
    setOpenItem((current) => (current === id ? '' : id))
  }

  return (
    <main className="faq-page">
      <section className="faq-hero">
        <div className="faq-hero-orb faq-hero-orb-blue" />
        <div className="faq-hero-orb faq-hero-orb-orange" />
        <div className="faq-hero-orb faq-hero-orb-yellow" />

        <div className="faq-hero-inner">
          <div className="faq-eyebrow">
            <span className="faq-eyebrow-icon">
              <HelpCircle size={15} />
            </span>
            <span>HELP CENTER</span>
            <span className="faq-eyebrow-dot" />
            <span>WE GOT YOU</span>
          </div>

          <h1>
            Got questions?
            <span>Let's clear things up.</span>
          </h1>

          <p>
            Everything you need to know about discovering events,
            buying tickets, and enjoying your next experience with TiketSini.
          </p>

          <div className="faq-search">
            <Search size={20} />
            <input
              type="text"
              placeholder="Search your question..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        <div className="faq-hero-decoration faq-decoration-one">?</div>
        <div className="faq-hero-decoration faq-decoration-two">!</div>
        <div className="faq-hero-decoration faq-decoration-three">+</div>
      </section>

      <section className="faq-content">
        <div className="faq-content-header">
          <div>
            <span className="faq-section-label">
              <Sparkles size={15} />
              FREQUENTLY ASKED
            </span>

            <h2>
              Answers, without
              <span>the headache.</span>
            </h2>
          </div>

          <p>
            Can't find exactly what you're looking for?
            Try another keyword or reach out to our team.
          </p>
        </div>

        {filteredGroups.length > 0 ? (
          <div className="faq-groups">
            {filteredGroups.map((group) => (
              <section className="faq-group" key={group.title}>
                <div className="faq-group-heading">
                  <span className="faq-group-icon">{group.icon}</span>
                  <div>
                    <span>FAQ</span>
                    <h3>{group.title}</h3>
                  </div>
                </div>

                <div className="faq-list">
                  {group.questions.map((item, itemIndex) => {
                    const id = `${group.groupIndex}-${itemIndex}`
                    const isOpen = openItem === id

                    return (
                      <article
                        className={`faq-item ${isOpen ? 'is-open' : ''}`}
                        key={item.question}
                      >
                        <button
                          type="button"
                          className="faq-question"
                          onClick={() => toggleItem(id)}
                          aria-expanded={isOpen}
                        >
                          <span>{item.question}</span>
                          <span className="faq-question-icon">
                            <ChevronDown size={19} />
                          </span>
                        </button>

                        <div className="faq-answer">
                          <div>
                            <p>{item.answer}</p>
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            ))}
          </div>
        ) : (
          <div className="faq-empty">
            <div className="faq-empty-icon">
              <Search size={25} />
            </div>
            <h3>No questions found.</h3>
            <p>
              We couldn't find anything matching "{search}".
              Try a different keyword.
            </p>
            <button type="button" onClick={() => setSearch('')}>
              Show all questions
            </button>
          </div>
        )}

        <div className="faq-bottom-card">
          <div className="faq-bottom-sparkle">
            <Sparkles size={22} />
          </div>

          <div>
            <span>STILL CURIOUS?</span>
            <h3>Didn't find your answer?</h3>
            <p>
              No worries. Our team is happy to help you figure things out.
            </p>
          </div>

          <a href="mailto:support@tiketsini.com">
            Talk to us
            <span>↗</span>
          </a>
        </div>
      </section>
    </main>
  )
}

export default FAQ

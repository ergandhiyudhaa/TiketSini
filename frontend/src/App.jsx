import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Hero from './components/layout/Hero'
import CategorySection from './components/event/CategorySection'
import UpcomingEvents from './components/event/UpcomingEvents'
import EventDetail from './pages/EventDetail'

function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <UpcomingEvents />
    </>
  )
}

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events/:slug" element={<EventDetail />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
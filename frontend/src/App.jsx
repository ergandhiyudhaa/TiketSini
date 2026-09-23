import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Hero from './components/layout/Hero'
import CategorySection from './components/event/CategorySection'
import UpcomingEvents from './components/event/UpcomingEvents'
import EventDetail from './pages/EventDetail'
import Events from './pages/Events'
import TrendingEvents from './components/home/TrendingEvents'
import WhyTiketSini from './components/home/WhyTiketSini'
import HowItWorks from './components/home/HowItWorks'
import HomeCTA from './components/home/HomeCTA'
import Footer from './components/layout/Footer'

import Checkout from './pages/Checkout'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Categories from './pages/Categories'
import { AuthProvider } from './context/AuthContext'

function HomePage() {
  return (
    <>
      <Hero />
      <CategorySection />
      <UpcomingEvents />
      <TrendingEvents />
      <WhyTiketSini />
      <HowItWorks />
      <HomeCTA />
    </>
  )
}

function App() {
  return (
    <AuthProvider>
      <div className="app">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:slug" element={<EventDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
      </div>
    </AuthProvider>
  )
}

export default App
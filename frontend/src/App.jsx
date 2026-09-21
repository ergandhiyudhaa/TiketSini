import Navbar from './components/layout/Navbar'
import Hero from './components/layout/Hero'
import CategorySection from './components/event/CategorySection'
import UpcomingEvents from './components/event/UpcomingEvents'

function App() {
  return (
    <div className="app">
      <Navbar />

      <main>
        <Hero />
        <CategorySection />
        <UpcomingEvents />
      </main>
    </div>
  )
}

export default App
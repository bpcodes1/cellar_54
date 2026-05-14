import { Routes, Route, Navigate, Link } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import { useScrollReveal } from './hooks/useScrollReveal'
import Nav from './components/Nav'
import Hero from './components/Hero'
import StatsBar from './components/StatsBar'
import Story from './components/Story'
import Events from './components/Events'
import Gallery from './components/Gallery'
import Amenities from './components/Amenities'
import Testimonial from './components/Testimonial'
import LocationBar from './components/LocationBar'
import Footer from './components/Footer'
import BookingPage from './pages/BookingPage'

function HomePage() {
  useScrollReveal()

  return (
    <>
      <Nav />
      <Hero />
      <StatsBar />
      <Story />
      <Events />
      <Gallery />
      <Amenities />
      <Testimonial />
      <div className="booking-cta-wrap">
        <div className="booking-cta-inner">
          <span className="section-eyebrow">Reserve Your Date</span>
          <h2 className="section-title">Planning something <em>bold?</em></h2>
          <p className="booking-cta-body">Check availability and secure your date with a $500 deposit — applied toward your total.</p>
          <Link to="/booking" className="booking-cta-btn">Check Availability</Link>
        </div>
      </div>
      <LocationBar />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

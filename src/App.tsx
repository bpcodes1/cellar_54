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
import InquireForm from './components/InquireForm'
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
      <InquireForm />
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

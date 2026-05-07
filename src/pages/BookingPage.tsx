import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Nav from '../components/Nav'
import Calendar from '../components/Calendar'
import Footer from '../components/Footer'

export default function BookingPage() {
  useScrollReveal()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)

const handleDateSelect = (date: string) => {
    setSelectedDate(date)
  }

  return (
    <>
      <Nav />

      {/* Logo Hero */}
      <div className="bp-hero">
        <div className="bp-hero-bg" />
        <div className="bp-hero-overlay" />
        <div className="bp-hero-content">
          <img src="/cellar54-logo.webp" alt="Cellar 54" className="bp-logo" />
          <p className="bp-hero-tagline">Check availability. Claim your date.</p>
          <a href="#cal-section" className="bp-scroll-cue">
            <span>View Calendar</span>
            <div className="scroll-line" />
          </a>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="bp-cal-section" id="cal-section">
        <div className="bp-cal-inner">
          <div className="bp-cal-header reveal">
            <span className="section-eyebrow">Availability</span>
            <h2 className="section-title">Find your <em>date.</em></h2>
            <p className="bp-cal-sub">Select an available date below to begin your inquiry. Booked dates are marked — reach out if you need something special.</p>
          </div>
          <Calendar onSelect={handleDateSelect} selected={selectedDate} />
        </div>
      </div>

      <div className="bp-divider" />
      <Footer />
    </>
  )
}

import { useState, useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import Nav from '../components/Nav'
import Calendar from '../components/Calendar'
import Footer from '../components/Footer'

export default function BookingPage() {
  useScrollReveal()
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const bookingRef = useRef<HTMLDivElement>(null)

  const handleDateSelect = (date: string) => {
    setSelectedDate(date)
    setTimeout(() => {
      bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }, 100)
  }

  return (
    <>
      <Nav />

      {/* Logo Hero */}
      <div className="bp-hero">
        <div className="bp-hero-bg" />
        <div className="bp-hero-overlay" />
        <div className="bp-hero-content">
          <img src={`${import.meta.env.BASE_URL}cellar54-logo.webp`} alt="Cellar 54" className="bp-logo" />
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
            <p className="bp-cal-sub">Select an available date below to begin your booking. Booked dates are marked — reach out if you need something special.</p>
          </div>
          <Calendar onSelect={handleDateSelect} selected={selectedDate} />

          {/* Bookings paused — shown in place of the booking form when a date is clicked */}
          <div ref={bookingRef} role="status" aria-live="polite">
            {selectedDate && (
              <div className="bp-closed-notice">
                <span className="bp-selected-label">Bookings Paused</span>
                <p className="bp-closed-text">We are not accepting any bookings at the moment. Please check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bp-divider" />
      <Footer />
    </>
  )
}

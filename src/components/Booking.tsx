import { useState, type FormEvent } from 'react'

export default function Booking() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    eventType: '',
    guests: '',
    date: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Form submission logic goes here
    alert('Thank you! We\'ll be in touch within 24 hours.')
  }

  return (
    <div className="booking-wrap" id="booking">
      <div className="booking-inner">
        <div className="booking-left reveal">
          <span className="section-eyebrow">Plan Your Event</span>
          <h2 className="section-title">Planning something <em>bold?</em></h2>
          <div className="booking-body">
            <p>Tell us a little about what you&#8217;re planning. We&#8217;ll get back to you within 24 hours to talk availability, walk you through the space, and answer every question you have.</p>
            <p>No pressure. No packages. <strong>Just an honest conversation about whether Cellar 54 is right for your event.</strong></p>
          </div>
        </div>
        <form className="booking-form reveal d1" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                className="form-input"
                type="text"
                name="firstName"
                placeholder="Your name"
                value={form.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                className="form-input"
                type="text"
                name="lastName"
                placeholder="Last name"
                value={form.lastName}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              className="form-input"
              type="email"
              name="email"
              placeholder="your@email.com"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Event Type</label>
              <select
                className="form-input"
                name="eventType"
                value={form.eventType}
                onChange={handleChange}
              >
                <option value="" disabled>Select...</option>
                <option>Wedding / Ceremony</option>
                <option>Corporate Event</option>
                <option>Private Party</option>
                <option>Gala / Fundraiser</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Estimated Guests</label>
              <input
                className="form-input"
                type="text"
                name="guests"
                placeholder="e.g. 100–150"
                value={form.guests}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Preferred Date</label>
            <input
              className="form-input"
              type="text"
              name="date"
              placeholder="Month / Year, or flexible"
              value={form.date}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="form-submit">Send My Inquiry</button>
          <p className="form-note">We respond within 24 hours. No spam, ever.</p>
        </form>
      </div>
    </div>
  )
}

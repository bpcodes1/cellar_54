import { useState, type FormEvent } from 'react'

export default function InquireForm() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    eventType: '', guests: '', date: '', message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: '4e9faa8a-a5ab-4026-bfb3-52457f9038cf',
          subject: `Inquiry from ${form.firstName} ${form.lastName}`,
          ...form,
        }),
      })
      if (!res.ok) throw new Error()
      setSuccess(true)
    } catch {
      setError('Something went wrong. Please email us directly at info@cellar54salem.com.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="booking-wrap" id="inquire">
        <div className="booking-inner" style={{ alignItems: 'center' }}>
          <div className="booking-left" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span className="section-eyebrow">Message Received</span>
            <h2 className="section-title">We'll be in <em>touch.</em></h2>
            <div className="booking-body">
              <p>Thank you for reaching out. Expect to hear from us within 24 hours.</p>
            </div>
          </div>
          <div className="inquire-success-logo">
            <img src={`${import.meta.env.BASE_URL}cellar54-mark.webp`} alt="Cellar 54" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="booking-wrap" id="inquire">
      <div className="booking-inner">
        <div className="booking-left reveal">
          <span className="section-eyebrow">Get in Touch</span>
          <h2 className="section-title">Planning something <em>bold?</em></h2>
          <div className="booking-body">
            <p>Tell us about your event and we'll get back to you within 24 hours. No packages. No pressure.</p>
            <p><strong>Just an honest conversation about whether Cellar 54 is right for your event.</strong></p>
          </div>
        </div>
        <form className="booking-form reveal d1" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input className="form-input" type="text" name="firstName" placeholder="Your name" value={form.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input className="form-input" type="text" name="lastName" placeholder="Last name" value={form.lastName} onChange={handleChange} required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label className="form-label">Phone</label>
              <input className="form-input" type="tel" name="phone" placeholder="(503) 000-0000" value={form.phone} onChange={handleChange} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Event Type</label>
              <select className="form-input" name="eventType" value={form.eventType} onChange={handleChange} required>
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
              <input className="form-input" type="text" name="guests" placeholder="e.g. 100–150" value={form.guests} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Preferred Date</label>
            <input className="form-input" type="text" name="date" placeholder="Month / Year, or flexible" value={form.date} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Tell us about your event</label>
            <textarea className="form-input form-textarea" name="message" placeholder="Any details, questions, or special requests..." value={form.message} onChange={handleChange} rows={4} />
          </div>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="form-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Inquiry'}
          </button>
        </form>
      </div>
    </div>
  )
}

import { useState, useEffect, useRef, type FormEvent } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY,
)

const SQUARE_APP_ID = import.meta.env.VITE_SQUARE_APP_ID as string
const SQUARE_LOCATION_ID = import.meta.env.VITE_SQUARE_LOCATION_ID as string

declare global {
  interface Window {
    Square?: {
      payments: (appId: string, locationId: string) => {
        card: () => Promise<{
          attach: (selector: string) => Promise<void>
          tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>
          destroy: () => void
        }>
      }
    }
  }
}

interface BookingProps {
  selectedDate?: string
}

export default function Booking({ selectedDate = '' }: BookingProps) {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    eventType: '',
    guests: '',
    date: selectedDate,
  })

  useEffect(() => {
    setForm(f => ({ ...f, date: selectedDate }))
  }, [selectedDate])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const cardRef = useRef<{ tokenize: () => Promise<{ status: string; token?: string; errors?: { message: string }[] }>; destroy: () => void } | null>(null)

  useEffect(() => {
    let destroyed = false

    function loadSquareScript(): Promise<void> {
      return new Promise((resolve, reject) => {
        if (window.Square) { resolve(); return }
        const existing = document.querySelector('script[src*="squarecdn.com"]')
        if (existing) {
          existing.addEventListener('load', () => resolve())
          existing.addEventListener('error', reject)
          return
        }
        const script = document.createElement('script')
        script.src = 'https://web.squarecdn.com/v1/square.js'
        script.onload = () => resolve()
        script.onerror = reject
        document.head.appendChild(script)
      })
    }

    async function initSquare() {
      try {
        await loadSquareScript()
        if (!window.Square || destroyed) return
        const payments = window.Square.payments(SQUARE_APP_ID, SQUARE_LOCATION_ID)
        const card = await payments.card()
        if (destroyed) { card.destroy(); return }
        await card.attach('#sq-card-container')
        cardRef.current = card
      } catch (e) {
        console.error('Square init failed:', e)
      }
    }

    initSquare()
    return () => {
      destroyed = true
      cardRef.current?.destroy()
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!cardRef.current) {
      setError('Payment form not ready. Please refresh and try again.')
      return
    }

    setLoading(true)
    try {
      const result = await cardRef.current.tokenize()

      if (result.status !== 'OK') {
        setError(result.errors?.[0]?.message ?? 'Card tokenization failed.')
        return
      }

      const { data, error: fnError } = await supabase.functions.invoke('process-payment', {
        body: { token: result.token, ...form },
      })

      if (fnError || !data?.success) {
        setError(data?.error ?? 'Payment failed. Please try again.')
        return
      }

      setSuccess(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // === UNDER DEVELOPMENT: restore these returns when payment is ready ===
  // if (success) {
  //   return (
  //     <div className="booking-wrap" id="booking">
  //       <div className="booking-inner">
  //         <div className="booking-success reveal">
  //           <span className="section-eyebrow">You&#8217;re on the books</span>
  //           <h2 className="section-title">Date reserved.</h2>
  //           <p>Your $500 deposit has been processed and your date is held. We&#8217;ll be in touch within 24 hours to confirm the details.</p>
  //         </div>
  //       </div>
  //     </div>
  //   )
  // }

  // return (
  //   <div className="booking-wrap" id="booking">
  //     <div className="booking-inner">
  //       <div className="booking-left reveal">
  //         <span className="section-eyebrow">Plan Your Event</span>
  //         <h2 className="section-title">Planning something <em>bold?</em></h2>
  //         <div className="booking-body">
  //           <p>Reserve your date with a $500 deposit — applied toward your total. We&#8217;ll confirm availability and reach out within 24 hours.</p>
  //           <p>No packages. No pressure. <strong>Just an honest conversation about whether Cellar 54 is right for your event.</strong></p>
  //         </div>
  //       </div>
  //       <form className="booking-form reveal d1" onSubmit={handleSubmit}>
  //         <div className="form-row">
  //           <div className="form-group">
  //             <label className="form-label">First Name</label>
  //             <input
  //               className="form-input"
  //               type="text"
  //               name="firstName"
  //               placeholder="Your name"
  //               value={form.firstName}
  //               onChange={handleChange}
  //               required
  //             />
  //           </div>
  //           <div className="form-group">
  //             <label className="form-label">Last Name</label>
  //             <input
  //               className="form-input"
  //               type="text"
  //               name="lastName"
  //               placeholder="Last name"
  //               value={form.lastName}
  //               onChange={handleChange}
  //               required
  //             />
  //           </div>
  //         </div>
  //         <div className="form-group">
  //           <label className="form-label">Email</label>
  //           <input
  //             className="form-input"
  //             type="email"
  //             name="email"
  //             placeholder="your@email.com"
  //             value={form.email}
  //             onChange={handleChange}
  //             required
  //           />
  //         </div>
  //         <div className="form-row">
  //           <div className="form-group">
  //             <label className="form-label">Event Type</label>
  //             <select
  //               className="form-input"
  //               name="eventType"
  //               value={form.eventType}
  //               onChange={handleChange}
  //               required
  //             >
  //               <option value="" disabled>Select...</option>
  //               <option>Wedding / Ceremony</option>
  //               <option>Corporate Event</option>
  //               <option>Private Party</option>
  //               <option>Gala / Fundraiser</option>
  //               <option>Other</option>
  //             </select>
  //           </div>
  //           <div className="form-group">
  //             <label className="form-label">Estimated Guests</label>
  //             <input
  //               className="form-input"
  //               type="text"
  //               name="guests"
  //               placeholder="e.g. 100–150"
  //               value={form.guests}
  //               onChange={handleChange}
  //             />
  //           </div>
  //         </div>
  //         <div className="form-group">
  //           <label className="form-label">Preferred Date</label>
  //           <input
  //             className="form-input"
  //             type="text"
  //             name="date"
  //             placeholder="Month / Year, or flexible"
  //             value={form.date}
  //             onChange={handleChange}
  //           />
  //         </div>
  //         <div className="form-group">
  //           <label className="form-label">Card Details — $500 Deposit</label>
  //           <div id="sq-card-container" className="sq-card-input" />
  //         </div>
  //         {error && <p className="form-error">{error}</p>}
  //         <button type="submit" className="form-submit" disabled={loading}>
  //           {loading ? 'Processing...' : 'Reserve My Date — $500 Deposit'}
  //         </button>
  //         <p className="form-note">Deposit applied toward your total. Secure payment via Square. Remaining balance due prior to your event.</p>
  //       </form>
  //     </div>
  //   </div>
  // )
  // ======================================================================

  return (
    <div className="booking-wrap" id="booking">
      <div className="booking-inner" style={{ justifyContent: 'center', textAlign: 'center' }}>
        <div className="booking-success reveal">
          <span className="section-eyebrow">Booking</span>
          <h2 className="section-title">Under Development</h2>
          <p>Our online booking is currently under development. Please contact us directly to reserve your date.</p>
          <a href="/contact" className="form-submit" style={{ display: 'inline-block', marginTop: '24px', textDecoration: 'none' }}>
            Contact Us for Booking
          </a>
        </div>
      </div>
    </div>
  )
}

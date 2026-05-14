import { useState, useEffect } from 'react'

const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID as string
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY as string

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function fmt(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

async function fetchBookedDates(year: number, month: number): Promise<string[]> {
  const timeMin = new Date(year, month, 1).toISOString()
  const timeMax = new Date(year, month + 1, 1).toISOString()

  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?key=${API_KEY}&timeMin=${encodeURIComponent(timeMin)}&timeMax=${encodeURIComponent(timeMax)}&singleEvents=true`

  const res = await fetch(url)
  if (!res.ok) return []
  const data = await res.json()

  const booked = new Set<string>()

  for (const event of data.items ?? []) {
    if (event.start?.date) {
      // All-day event — end.date is exclusive
      const start = new Date(event.start.date + 'T00:00:00')
      const end = new Date(event.end.date + 'T00:00:00')
      for (const d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
        booked.add(fmt(d.getFullYear(), d.getMonth(), d.getDate()))
      }
    } else if (event.start?.dateTime) {
      // Timed event — mark just the start date
      booked.add(event.start.dateTime.split('T')[0])
    }
  }

  return Array.from(booked)
}

interface Props {
  onSelect: (date: string) => void
  selected: string | null
}

export default function Calendar({ onSelect, selected }: Props) {
  const today = new Date()
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [booked, setBooked] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const year = view.getFullYear()
  const month = view.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  useEffect(() => {
    setLoading(true)
    fetchBookedDates(year, month)
      .then(setBooked)
      .finally(() => setLoading(false))
  }, [year, month])

  const prev = () => setView(new Date(year, month - 1, 1))
  const next = () => setView(new Date(year, month + 1, 1))

  const isPast = (d: number) =>
    new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const isBooked = (d: number) => booked.includes(fmt(year, month, d))

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="cal-wrap">
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={prev} aria-label="Previous month">&#8592;</button>
        <span className="cal-month-label">
          {MONTHS[month]} {year}
          {loading && <span className="cal-loading"> ...</span>}
        </span>
        <button className="cal-nav-btn" onClick={next} aria-label="Next month">&#8594;</button>
      </div>

      <div className="cal-legend">
        <span className="cal-legend-item"><span className="cal-dot booked-dot" />Booked</span>
        <span className="cal-legend-item"><span className="cal-dot available-dot" />Available</span>
        <span className="cal-legend-item"><span className="cal-dot selected-dot" />Your Selection</span>
      </div>

      <div className="cal-day-headers">
        {DAYS.map(d => <span key={d}>{d}</span>)}
      </div>

      <div className="cal-grid">
        {cells.map((d, i) => {
          if (!d) return <div key={i} className="cal-cell empty" />
          const dateStr = fmt(year, month, d)
          const past = isPast(d)
          const bkd = isBooked(d)
          const sel = selected === dateStr
          const available = !past && !bkd

          return (
            <div
              key={i}
              className={`cal-cell${past ? ' past' : ''}${bkd ? ' booked' : ''}${available ? ' available' : ''}${sel ? ' selected' : ''}`}
              onClick={() => available && onSelect(dateStr)}
            >
              <span className="cal-day-num">{d}</span>
              {bkd && <span className="cal-status-dot" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

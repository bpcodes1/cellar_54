import { useState } from 'react'

// Placeholder booked dates — replace with real data later
const BOOKED: string[] = [
  '2026-05-10',
  '2026-05-17',
  '2026-05-23',
  '2026-06-06',
  '2026-06-14',
  '2026-06-21',
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function fmt(y: number, m: number, d: number) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

interface Props {
  onSelect: (date: string) => void
  selected: string | null
}

export default function Calendar({ onSelect, selected }: Props) {
  const today = new Date()
  const [view, setView] = useState(new Date(today.getFullYear(), today.getMonth(), 1))

  const year = view.getFullYear()
  const month = view.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const prev = () => setView(new Date(year, month - 1, 1))
  const next = () => setView(new Date(year, month + 1, 1))

  const isPast = (d: number) =>
    new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate())

  const isBooked = (d: number) => BOOKED.includes(fmt(year, month, d))

  const cells: (number | null)[] = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  return (
    <div className="cal-wrap">
      <div className="cal-nav">
        <button className="cal-nav-btn" onClick={prev} aria-label="Previous month">&#8592;</button>
        <span className="cal-month-label">{MONTHS[month]} {year}</span>
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
          const booked = isBooked(d)
          const sel = selected === dateStr
          const available = !past && !booked

          return (
            <div
              key={i}
              className={`cal-cell${past ? ' past' : ''}${booked ? ' booked' : ''}${available ? ' available' : ''}${sel ? ' selected' : ''}`}
              onClick={() => available && onSelect(dateStr)}
            >
              <span className="cal-day-num">{d}</span>
              {booked && <span className="cal-status-dot" />}
            </div>
          )
        })}
      </div>
    </div>
  )
}

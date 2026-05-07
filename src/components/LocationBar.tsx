const locations = [
  { label: 'Address', value: 'Lower Level, 285 Liberty St NE · Salem, OR 97301' },
  { label: 'Parking', value: 'Free — Chemeketa Parkade (connected to The Forge)' },
  { label: 'Contact', value: 'events@cellar54salem.com' },
  { label: 'Hours', value: 'By Appointment & Event Booking' },
]

export default function LocationBar() {
  return (
    <div className="location-bar">
      <div className="location-inner">
        {locations.map((loc, i) => (
          <div key={loc.label} className="location-item-wrap">
            <div className="location-item">
              <div className="location-dot" />
              <div>
                <div className="location-text-label">{loc.label}</div>
                <div className="location-text-value">{loc.value}</div>
              </div>
            </div>
            {i < locations.length - 1 && <div className="location-divider" />}
          </div>
        ))}
      </div>
    </div>
  )
}

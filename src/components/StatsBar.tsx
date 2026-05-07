import { Fragment } from 'react'

const stats = [
  { number: '4,000', label: 'Square Feet' },
  { number: '200', label: 'Standing Capacity' },
  { number: '180', label: 'Seated Capacity' },
  { number: '6+', label: 'Layout Configurations' },
  { number: 'Free', label: 'Connected Parking' },
]

export default function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {stats.map((stat, i) => (
          <Fragment key={stat.label}>
            <div className="stat-item">
              <span className="stat-number">{stat.number}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
            {i < stats.length - 1 && <div className="stat-divider" />}
          </Fragment>
        ))}
      </div>
    </div>
  )
}

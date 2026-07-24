import comedy1 from '../assets/Cellar54_images/Cellar54-comedy1.webp'
import comedy2 from '../assets/Cellar54_images/Cellar54-comedy2.webp'
import comedy3 from '../assets/Cellar54_images/Cellar54-comedy3.webp'

const TICKETS_URL = 'https://tickets.willamettevalleylaughs.com/events/willamettevalleylaughs/2286359'

const details = [
  { label: 'Doors', value: '6:30 PM' },
  { label: 'Show', value: '7:00 PM' },
  { label: 'Every', value: 'Friday' },
]

const photos = [
  { cls: 'cn1', img: comedy1 },
  { cls: 'cn2', img: comedy2 },
  { cls: 'cn3', img: comedy3 },
]

export default function ComedyNight() {
  return (
    <div className="comedy-wrap" id="comedy">
      <section>
        <div className="comedy-section">
          <div className="comedy-text reveal">
            <span className="section-eyebrow">Every Friday Night</span>
            <h2 className="section-title">
              Comedy Night<br /><em>at Cellar 54.</em>
            </h2>
            <p className="comedy-body">
              Grab a seat, grab a drink, and let loose. Live stand-up comedy hits our stage every Friday night — doors open at 6:30, show starts at 7:00.
            </p>
            <div className="comedy-details">
              {details.map((d) => (
                <div className="comedy-detail-item" key={d.label}>
                  <span className="comedy-detail-label">{d.label}</span>
                  <span className="comedy-detail-value">{d.value}</span>
                </div>
              ))}
            </div>
            <a href={TICKETS_URL} target="_blank" rel="noopener noreferrer" className="btn-primary comedy-cta">
              Get Tickets
            </a>
          </div>
          <div className="comedy-photos reveal d1">
            {photos.map((p) => (
              <div className={`comedy-photo ${p.cls}`} key={p.cls}>
                <div className="comedy-photo-bg" style={{ backgroundImage: `url(${p.img})` }} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

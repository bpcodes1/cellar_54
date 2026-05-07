import projector from '../assets/Cellar54_images/Cellar54-projector.webp'
import bar1 from '../assets/Cellar54_images/Cellar54-bar1.webp'
import sign from '../assets/Cellar54_images/Cellar54-sign.webp'
import chairSetup1 from '../assets/Cellar54_images/ChairSetup1.webp'
import greenRoom from '../assets/Cellar54_images/GreenRoom2.webp'

const thumbs = [
  { cls: 'gt1', img: projector, label: 'Main Hall' },
  { cls: 'gt2', img: bar1, label: 'The Bar' },
  { cls: 'gt3', img: sign, label: 'The Sign' },
  { cls: 'gt4', img: chairSetup1, label: 'Ceremony Setup' },
  { cls: 'gt5', img: greenRoom, label: 'Green Room' },
]

export default function Gallery() {
  return (
    <div className="gallery-wrap" id="gallery">
      <div className="gallery-inner">
        <div className="gallery-header reveal">
          <div>
            <span className="section-eyebrow">The Gallery</span>
            <h2 className="section-title">See it <em>in the light.</em></h2>
          </div>
          <a href="#" className="link-subtle">Full gallery &rarr;</a>
        </div>
        <div className="gallery-grid">
          {thumbs.map((t) => (
            <div className={`g-thumb ${t.cls}`} key={t.cls}>
              <div className="g-thumb-bg" style={{ backgroundImage: `url(${t.img})` }} />
              <div className="g-thumb-diamond" />
              <div className="g-thumb-overlay">
                <span className="g-thumb-label">{t.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

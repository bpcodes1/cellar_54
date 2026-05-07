import openingImg from '../assets/Cellar54_images/Cellar54-opening.webp'

const highlights = [
  { title: 'Full-Service Bar', desc: 'We operate the bar. You bring the guests.' },
  { title: 'Open Vendor Policy', desc: 'Choose any caterer you love. No forced packages.' },
  { title: 'Green Room', desc: 'Hollywood vanity suite for the people of the hour.' },
  { title: 'Warming Kitchen', desc: 'Commercial-grade catering prep, included.' },
]

export default function Story() {
  return (
    <div className="story-wrap" id="space">
      <section>
        <div className="story-section">
          <div className="story-text reveal">
            <span className="section-eyebrow">The Venue</span>
            <h2 className="section-title">Not loud.<br /><em>But unforgettable.</em></h2>
            <div className="story-body">
              <p>Cellar 54 is Salem&#8217;s newest event space, built beneath The Forge in the heart of downtown. We designed it for events that deserve intention — weddings, corporate gatherings, milestone parties, and everything in between.</p>
              <p>What makes us different? We stay out of your way. You choose your caterer, your d&#233;cor, your vision. We run the bar and hand you the keys. The rest is yours.</p>
            </div>
            <div className="story-highlights">
              {highlights.map((h) => (
                <div className="highlight-item" key={h.title}>
                  <div className="highlight-title">{h.title}</div>
                  <div className="highlight-desc">{h.desc}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="story-visual reveal d1">
            <div className="story-img-frame">
              <img src={openingImg} alt="Cellar 54 opening night" className="story-photo" />
              <div className="corner tl" />
              <div className="corner tr" />
              <div className="corner bl" />
              <div className="corner br" />
              <div className="story-img-tag">
                Something good<br />about to happen.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

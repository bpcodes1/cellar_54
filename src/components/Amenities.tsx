const amenities = [
  {
    num: '01',
    title: 'Signature Lighting',
    desc: 'Our custom LED diamond ceiling installation sets the mood before your first guest walks through the door. Fully programmable. Completely iconic.',
  },
  {
    num: '02',
    title: 'The Green Room',
    desc: 'Hollywood vanity mirrors, velvet seating, and a glass-top table. A private suite to get ready — or just escape the room for a moment.',
  },
  {
    num: '03',
    title: 'Open Vendor Freedom',
    desc: 'Bring your own caterer, florist, and DJ. We never force preferred vendor lists. Your event should be yours, not ours.',
  },
  {
    num: '04',
    title: 'Full-Service Bar',
    desc: 'We handle the bar — that\u2019s one thing you don\u2019t have to think about. Stocked, staffed, and ready for your guests.',
  },
  {
    num: '05',
    title: 'Warming Kitchen',
    desc: 'Commercial-grade prep kitchen for your caterer. Industrial refrigeration, stainless surfaces, floor drains. The real thing.',
  },
  {
    num: '06',
    title: 'Free Connected Parking',
    desc: 'The Chemeketa Parkade is attached to The Forge. Your guests never have to hunt for parking in downtown Salem.',
  },
]

const delays = ['', 'd1', 'd2', '', 'd1', 'd2']

export default function Amenities() {
  return (
    <div className="amenities-wrap" id="amenities">
      <section>
        <div className="amenities-header">
          <span className="section-eyebrow reveal">Why Cellar 54</span>
          <h2 className="section-title reveal">The details that<br /><em>make the difference.</em></h2>
        </div>
        <div className="amenities-grid">
          {amenities.map((a, i) => (
            <div className={`amenity-item reveal ${delays[i]}`} key={a.num}>
              <span className="amenity-num">{a.num}</span>
              <div className="amenity-diamond" />
              <div className="amenity-title">{a.title}</div>
              <div className="amenity-desc">{a.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

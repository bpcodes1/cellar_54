import setup2 from '../assets/Cellar54_images/Setup2.webp'
import mainImg from '../assets/Cellar54_images/Cellar54-main.webp'
import event4 from '../assets/Cellar54_images/Cellar54-event4.webp'
import bar4 from '../assets/Cellar54_images/Cellar54-bar4.webp'

const events = [
  {
    cls: 'ec-1',
    img: setup2,
    title: 'Weddings & Ceremonies',
    desc: 'Your ceremony. Your people. Your space. Moody, modern, and entirely yours.',
  },
  {
    cls: 'ec-2',
    img: mainImg,
    title: 'Corporate Events',
    desc: 'The room your team will actually remember. Skip the hotel conference room.',
  },
  {
    cls: 'ec-3',
    img: bar4,
    title: 'Private Parties',
    desc: 'The kind of party that lives on in group chats. Big enough to feel like an event.',
  },
  {
    cls: 'ec-4',
    img: event4,
    title: 'Galas & Fundraisers',
    desc: 'Set the stage. Let the space do the talking. Up to 200 guests.',
  },
]

const delays = ['', 'd1', 'd2', 'd3']

export default function Events() {
  return (
    <div className="events-wrap" id="events">
      <div className="events-inner">
        <div className="events-header reveal">
          <div>
            <span className="section-eyebrow">What We Host</span>
            <h2 className="section-title">Every event.<br /><em>One space.</em></h2>
          </div>
          <a href="#" className="link-subtle">See all event types &rarr;</a>
        </div>
        <div className="events-grid">
          {events.map((ev, i) => (
            <div className={`event-card ${ev.cls} reveal ${delays[i]}`} key={ev.title}>
              <div className="event-card-bg" style={{ backgroundImage: `url(${ev.img})` }} />
              <div className="event-card-overlay" />
              <div className="event-card-top-line" />
              <div className="event-card-content">
                <span className="event-card-icon">&#9670;</span>
                <div className="event-card-title">{ev.title}</div>
                <div className="event-card-desc">{ev.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

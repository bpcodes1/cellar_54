export default function Testimonial() {
  return (
    <div className="testimonial-wrap">
      <div className="diamond-bg" />
      <div className="reveal" style={{ position: 'relative', zIndex: 1 }}>
        <blockquote className="testimonial-quote">
          &#8220;The space did exactly what we hoped &#8212; it got out of our way and let our vision take over. The lighting alone had people stopping mid-conversation just to look up.&#8221;
        </blockquote>
        <div className="testimonial-author-name">Sarah &amp; Marcus R.</div>
        <div className="testimonial-author-detail">Wedding Reception &middot; Fall 2024</div>
        <div className="testimonial-dots">
          <div className="t-dot active" />
          <div className="t-dot" />
          <div className="t-dot" />
        </div>
      </div>
    </div>
  )
}

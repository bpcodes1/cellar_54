import logoOutline from '../assets/Cellar54_images/Cellar54-logo-outline.webp'

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero-bg" />
      <div className="hero-logo-bg" style={{ backgroundImage: `url(${logoOutline})` }} />
      <div className="diamond-bg" />
      <div className="hero-overlay" />
      <div className="hero-led" />
      <div className="hero-content">
        <p className="hero-eyebrow">Downtown Salem · The Forge Lower Level</p>
        <h1 className="hero-title">
          A space that <em>flexes</em><br />with your <span className="red">vision.</span>
        </h1>
        <p className="hero-tagline">
          4,000 sq ft of moody, modern possibility beneath The Forge. Your event. Your vendors. Your rules.
        </p>
        <div className="hero-actions">
          <a href="#booking" className="btn-primary">Inquire Now</a>
          <a href="#space" className="btn-ghost">Explore the Space</a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </div>
  )
}

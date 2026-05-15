import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <img src={`${import.meta.env.BASE_URL}cellar54-logo.webp`} alt="Cellar 54" className="footer-logo" />
            <p className="footer-brand-desc">Built beneath The Forge in downtown Salem. Moody. Modern. Entirely yours.</p>
          </div>
          <div>
            <div className="footer-col-title">The Venue</div>
            <ul className="footer-links">
              <li><a href="#space">The Space</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#amenities">Amenities</a></li>
              <li><Link to="/booking">Book Now</Link></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Events</div>
            <ul className="footer-links">
              <li><a href="#">Weddings</a></li>
              <li><a href="#">Corporate</a></li>
              <li><a href="#">Private Parties</a></li>
              <li><a href="#">Galas</a></li>
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Connect</div>
            <ul className="footer-links">
              <li><a href="mailto:info@cellar54salem.com">Inquire Now</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="https://www.instagram.com/cellar_54/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.facebook.com/p/Cellar-54-61582894706553/" target="_blank" rel="noopener noreferrer">Facebook</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">&copy; 2026 Cellar 54 &middot; Downtown Salem, Oregon</p>
          <a href="https://forgesalem.com" target="_blank" rel="noopener noreferrer" className="footer-forge">
            Part of <span className="mini-d" /> The Forge &middot; Salem
          </a>
          <div className="footer-socials">
            <a href="https://www.instagram.com/cellar_54/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/p/Cellar-54-61582894706553/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="#">Email</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

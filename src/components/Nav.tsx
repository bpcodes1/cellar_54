import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <nav className={`${scrolled ? 'scrolled' : ''}${menuOpen ? ' menu-open' : ''}`}>
      <a className="nav-logo" href="/">
        <img src={`${import.meta.env.BASE_URL}cellar54-logo.webp`} alt="Cellar 54 — Entertainment & Event Venue" />
      </a>

      <ul className="nav-links">
        <li><a href="#space">The Space</a></li>
        <li><Link to="/booking" className="nav-cta">Book Now</Link></li>
      </ul>

      <button
        className="nav-hamburger"
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      {menuOpen && (
        <div className="nav-mobile-menu">
          <a href="#space" onClick={closeMenu}>The Space</a>
          <Link to="/booking" className="nav-cta" onClick={closeMenu}>Book Now</Link>
        </div>
      )}
    </nav>
  )
}

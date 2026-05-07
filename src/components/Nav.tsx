import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <a className="nav-logo" href="/">
        <img src={`${import.meta.env.BASE_URL}cellar54-logo.webp`} alt="Cellar 54 — Entertainment & Event Venue" />
      </a>
      <ul className="nav-links">
        <li><a href="#space">The Space</a></li>
        <li><Link to="/booking" className="nav-cta">Book Now</Link></li>
      </ul>
    </nav>
  )
}

import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logorbg.png'; // Adjust the path if needed

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo-img" />
          </Link>
        </div>

        <ul className="navbar-links desktop">
          {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((item, i) => (
            <li key={i}>
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>

        <div className="menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {['Home', 'About', 'Services', 'Gallery', 'Contact'].map((item, i) => (
            <li key={i} onClick={toggleMenu}>
              <Link to={`/${item.toLowerCase()}`}>{item}</Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Back to Top Button */}
      {scrolled && (
        <button className="back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑
        </button>
      )}
    </>
  );
}

export default Navbar;

import { Link, useLocation } from 'react-router-dom';
import '../../styles/AdminNavbar.css';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import logo from '../assets/logorbg.png';

function AdminNavbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navItems = [
    { name: 'Gallery', path: '/admin/gallery' },
    { name: 'Services', path: '/admin/services' },
    { name: 'Testimonials', path: '/admin/testimonials' },
  ];

  return (
    <>
      <nav className={`admin-navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="admin-navbar-logo">
          <Link to="/admin">
            <img src={logo} alt="Logo" className="admin-logo-img" />
          </Link>
        </div>

        <ul className="admin-navbar-links desktop">
          {navItems.map(({ name, path }) => (
            <li key={name} className={location.pathname === path ? 'active' : ''}>
              <Link to={path}>{name}</Link>
            </li>
          ))}
        </ul>

        <div className="admin-menu-icon" onClick={toggleMenu}>
          {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </div>
      </nav>

      <div className={`admin-mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          {navItems.map(({ name, path }) => (
            <li key={name} onClick={toggleMenu}>
              <Link to={path} className={location.pathname === path ? 'active' : ''}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {scrolled && (
        <button className="admin-back-to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          ↑
        </button>
      )}
    </>
  );
}

export default AdminNavbar;

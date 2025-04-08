// src/components/AdminNavbar.jsx
import { Link, useLocation } from 'react-router-dom';
import '../styles/AdminNavbar.css';

function AdminNavbar() {
  const location = useLocation();

  return (
    <nav className="admin-navbar">
      <ul>
        <li className={location.pathname.includes('gallery') ? 'active' : ''}>
          <Link to="/admin/gallery">Gallery</Link>
        </li>
        <li className={location.pathname.includes('services') ? 'active' : ''}>
          <Link to="/admin/services">Services</Link>
        </li>
        <li className={location.pathname.includes('testimonials') ? 'active' : ''}>
          <Link to="/admin/testimonials">Testimonials</Link>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;

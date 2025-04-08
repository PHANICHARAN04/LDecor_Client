import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/AdminNavbar.css';

function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    window.location.href='/'
  };

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
        <li>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </li>
      </ul>
    </nav>
  );
}

export default AdminNavbar;
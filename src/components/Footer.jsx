import '../styles/Footer.css';
import { FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import logo from '../assets/logorbg.png'; // Ensure the path is correct

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <a href="/" className="footer-logo">
          <img src={logo} alt="Logo" />
        </a>

        <div className="footer-socials">
          <a href="https://www.instagram.com/thoranamdecors/" aria-label="Instagram"><FaInstagram /></a>
          <a href="#" aria-label="WhatsApp"><FaWhatsapp /></a>
          <a href="#" aria-label="Facebook"><FaFacebookF /></a>
        </div>
      </div>

      <div className="footer-divider" />
      <p className="footer-copy">© 2025 Lotus Decors. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

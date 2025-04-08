import '../styles/Contact.css';
import { memo } from 'react';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaSearchLocation 
} from 'react-icons/fa';

const ANIMATION_VARIANTS = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,  // Reduced stagger time for faster load
        delayChildren: 0.2
      }
    }
  },
  item: {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 120, damping: 15 }
    }
  },
  floating: {
    y: [0, -10, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const SOCIAL_LINKS = [
  { icon: <FaFacebookF />, href: "#" },
  { icon: <FaInstagram />, href: "https://www.instagram.com/thoranamdecors/" },
  { icon: <FaWhatsapp />, href: "#" }
];

const CONTACT_INFO = [
  { icon: <FaPhoneAlt className="icon" />, text: "+1(484)302-9331 / +1(732)912-8810" },
  { icon: <FaEnvelope className="icon" />, text: "info@lotusdecorandevents.com" },
  { icon: <FaSearchLocation className="icon" />, text: "14800 Quorum Dr, Dallas, Tx 75254" }
];

const Contact = memo(() => {
  return (
    <div 
      className="contact-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}  // Slightly reduced duration for snappiness
    >
      {/* Title */}
      <h2 
        className="contact-title"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, type: "spring", stiffness: 100 }}
      >
        Get in Touch
        <span 
          className="title-underline"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        />
      </h2>

      {/* Main Container */}
      <div 
        className="contact-container"
        variants={ANIMATION_VARIANTS.container}
        initial="hidden"
        animate="visible"
        layout  // Improves animation handling for flexbox elements
      >
        {/* Left Column */}
        <div className="contact-left-column">
          {/* Contact Details Card */}
          <div 
            className="contact-card"
            variants={ANIMATION_VARIANTS.item}
            whileHover={{ 
              y: -4,
              boxShadow: "0 12px 24px rgba(0,0,0,0.1)"
            }}
          >
            <h3>Contact Details</h3>
            <div className="contact-info">
              {CONTACT_INFO.map((info, index) => (
                <p 
                  key={index}
                  whileTap={{ scale: 0.98 }}  // Optimized from whileHover
                >
                  {info.icon} {info.text}
                </p>
              ))}
            </div>
            
            <div 
              className="social-links"
              initial={false}  // Prevents unnecessary reanimations
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {SOCIAL_LINKS.map((link, index) => (
                <a 
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Map Card */}
          <div 
            className="map-card"
            variants={ANIMATION_VARIANTS.item}
            whileHover={{ scale: 1.01 }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6696.1489937245515!2d-96.82996381836749!3d32.949042505501446!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c21301cd36de9%3A0x6d00286db264afb8!2s14800%20Quorum%20Dr%2C%20Dallas%2C%20TX%2075254!5e0!3m2!1sen!2sus!4v1743693641805!5m2!1sen!2sus"
              allowFullScreen
              loading="lazy"
              title="Lotus Decor Map"
            />
          </div>
        </div>

        {/* Right Column - Form */}
        <div 
          className="form-card"
          variants={ANIMATION_VARIANTS.item}
          animate={ANIMATION_VARIANTS.floating}
          whileHover={{ y: -3 }}
        >
          <h3>Let's Talk</h3>
          
          <form className="contact-form">
            {['Name', 'Email', 'Message'].map((field) => (
              <div 
                key={field}
                className="form-group"
                whileTap={{ scale: 0.98 }} // Prevents too much hover computation
              >
                <label>{field}</label>
                {field === 'Message' ? (
                  <textarea rows="4" placeholder="Tell us more..." required />
                ) : (
                  <input 
                    type={field === 'Email' ? 'email' : 'text'} 
                    placeholder={field === 'Email' ? 'you@example.com' : 'Your Name'} 
                    required 
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="contactshine-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
});

export default Contact;

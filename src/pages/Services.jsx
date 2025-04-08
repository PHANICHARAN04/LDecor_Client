import '../styles/Services.css';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function Services() {
  const [services, setServices] = useState([]);

  const fetchServices = async () => {
    try {
      const res = await axios.get('/api/services');
      setServices(res.data);
    } catch (err) {
      console.error('Failed to load services:', err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <div className="services-page">
      <section className="services-description" data-aos="fade-up">
        <h2>Crafted Services</h2>
        <div className="services-divider"></div>
        <p>Each offering is designed with elegance and intention — curated to make every space unforgettable.</p>
      </section>

      {/* Services List */}
      <section className="services-list">
        {services.map((service, index) => (
          <div className={`service-card ${index % 2 !== 0 ? 'reverse' : ''}`} key={index}>
            <div className="service-image framed" data-aos="zoom-in">
              <img src={service.imageUrl} alt={service.title} />
              <span className="category-tag">{service.category}</span>
            </div>
            <div className="service-text" data-aos={index % 2 === 0 ? "fade-left" : "fade-right"}>
              <h2>{service.title}</h2>
              <p>{service.description}</p>
              <Link to="/contact" className="service-btn"> Book Now </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export default Services;
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from 'axios';
import "../styles/Home.css";
import heroImg from "../assets/home/11.png";

function Home() {
  const texts = [
    "Where Elegance Meets Emotion..",
    "Where Luxury Meets Love..",
    "Where Your Dream Event Begins..",
  ];

  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setTextIndex((prev) => (prev + 1) % texts.length);
        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('/api/testimonials');
        setTestimonials(res.data);
      } catch (err) {
        console.error('Failed to load testimonials:', err);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <img src={heroImg} alt="Luxury Wedding Decor" className="hero-img" />
        <div className="hero-content" data-aos="fade-up">
          <h1 className={`fade-text ${fade ? "fade-in" : "fade-out"}`}>
            {texts[textIndex]}
          </h1>
          <p className="luxury-tagline">
            Crafting unforgettable experiences with grace, charm, and timeless beauty.
          </p>
          <Link to="/gallery" className="cta-btn shine"> Explore Our Creations </Link>
        </div>
      </section>

      {/* Why Us */}
      <section className="our-promise" data-aos="fade-up">
        <h2>Why Us?</h2>
        <div className="divider" />
        <p>
          At Lotus Décor and Events, we believe every event is a reflection of your unique vision,
          and we bring it to life with unmatched creativity and attention to detail. Unlike generic
          decor services, we specialize in fully customized setups tailored to each client’s style,
          budget, and dreams. 
        </p>
        <p>Whether you envision a grand traditional celebration or a chic modern affair, we offer decor 
          for all occasions and ages. We take pride in being the only decor company in Dallas that 
          incorporates exquisite sola wood flowers alongside fresh florals, ensuring elegance and sustainability.
        </p>
        <p>
          As full-time event planners and organizers, we don’t just design—we travel with you
          throughout the event, providing expert guidance every step of the way. Let us transform
          your vision into reality with stunning decor that leaves a lasting impression!
        </p>
      </section>

      {/* Testimonials */}
      <section className="testimonials" data-aos="fade-up">
        <h2>What Our Clients Say</h2>
        <div className="divider" />
        <div className="testimonial-wrapper">
          <div className="testimonial-scroller">
            {[...Array(3)].flatMap(() => testimonials).map((item, index) => (
              <div className="testimonial-card" key={index}>
                <div className="testimonial-img-container">
                  <img src={item.imageUrl} alt={item.name} className="testimonial-img" />
                </div>
                <div className="testimonial-overlay">
                  <h3>{item.name}</h3>
                  <p>{item.quote}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" data-aos="zoom-in">
        <h2>Let’s Make Your Dream Event Come True</h2>
        <Link to="/contact" className="homeshine-btn"> Book a Consultation </Link>
      </section>
    </div>
  );
}

export default Home;

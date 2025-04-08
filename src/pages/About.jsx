
import '../styles/About.css';
import founderImg from '../assets/founders/founder.jpg';
import cofounderImg from '../assets/founders/cofounder.jpg';
import about from '../assets/hero.jpg';

function About() {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero-section" style={{ backgroundImage: `url(${about})` }}>
        <div className="about-hero-overlay">
          <h1 data-aos="fade-down">About Lotus Decors</h1>
          <p data-aos="fade-up">Crafting timeless memories through elegance, tradition, and artistry.</p>
        </div>
      </section>

      {/* Description */}
      <section className="about-description" data-aos="fade-up">
        <p>
          <strong>Lotus Decors</strong> is where we bring passion and creativity to every event, transforming ordinary venues into breathtaking experiences. 
          Specializing in weddings, sangeet, haldi, pooja, housewarming, birthdays, and more, we design stunning spaces that capture emotions and traditions beautifully.
        </p>
        <p>
          Our expert team blends cultural elegance with modern aesthetics, ensuring every detail reflects your unique style and vision. 
          From enchanting floral setups to grand stage designs, we create decor that leaves a lasting impression.
        </p>
        <p>Your special moments deserve nothing less than perfection. Let’s craft memories that shine forever.</p>
      </section>

      {/* Founders */}
      <section className="founders-section">
        <div className="founder-card">
          <div className="founder-image framed" data-aos="zoom-in">
            <img src={founderImg} alt="Founder" />
          </div>
          <div className="founder-text" data-aos="fade-left">
            <h2>Sneha Gorijala</h2>
            <p>"Design is the silent ambassador of elegance."</p>
          </div>
        </div>

        <div className="founder-card">
          <div className="founder-text" data-aos="fade-right">
            <h2>Swetha Kongara</h2>
            <p>"We turn dreams into unforgettable décor experiences."</p>
          </div>
          <div className="founder-image framed" data-aos="zoom-in">
            <img src={cofounderImg} alt="Co-founder" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;

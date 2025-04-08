import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Gallery.css';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const categories = ['All', 'Wedding', 'Sangeeth', 'Birthday', 'Graduation'];

function Gallery() {
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchImages = async () => {
    try {
      const res = await axios.get('/api/gallery');
      setImages(res.data);
    } catch (err) {
      console.error('Failed to load gallery:', err);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const filteredImages =
    selectedCategory === 'All'
      ? images
      : images.filter((img) => img.category.toLowerCase() === selectedCategory.toLowerCase());

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredImages.length - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev < filteredImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header" data-aos="fade-up">
        <h2>Our Signature Looks</h2>
        <div className="gallery-divider" />
        <p>Moments captured with timeless elegance and curated charm.</p>
      </div>

      <div className="gallery-categories" data-aos="fade-up">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              setSelectedIndex(null);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="masonry-grid">
        {filteredImages.map((img, i) => (
          <div
            className="masonry-item"
            key={i}
            data-aos="fade-up"
            data-aos-delay={i * 50}
          >
            <img
              src={img.imageUrl}
              alt={`${img.category} ${i + 1}`}
              loading="lazy"
              onClick={() => setSelectedIndex(i)}
            />
          </div>
        ))}
      </div>

      {selectedIndex !== null && (
        <div className="lightbox" onClick={() => setSelectedIndex(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <FaTimes className="lightbox-close" onClick={() => setSelectedIndex(null)} />
            <FaChevronLeft className="lightbox-nav left" onClick={handlePrev} />
            <img
              src={filteredImages[selectedIndex].imageUrl}
              alt="Preview"
              className="lightbox-img"
            />
            <FaChevronRight className="lightbox-nav right" onClick={handleNext} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;

// src/pages/admin/GalleryAdmin.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/GalleryAdmin.css';

function GalleryAdmin() {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('Wedding');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(false);

  const categories = [
    'Wedding',
    'Pre-Wedding',
    'Sangeeth',
    'Half-Saree/Dothi Ceremony',
    'Reception',
    'Milestone Birthdays',
    'Graduations'
  ];

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/gallery');
      setImages(res.data);
      setFilteredImages(res.data);
    } catch (err) {
      console.error('Failed to fetch gallery:', err);
      alert('Failed to fetch gallery. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('category', category);
      setLoading(true);
      await axios.post('/api/gallery', formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setFile(null);
      setCategory('Wedding');
      setLoading(false);
      fetchImages();
    } catch (err) {
      console.error('Failed to upload image:', err);
      alert('Failed to upload image. Please try again.');
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/gallery/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchImages();
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (filter === 'All') {
      setFilteredImages(images);
    } else {
      setFilteredImages(images.filter((img) => img.category === filter));
    }
  }, [filter, images]);

  return (
    <div className="gallery-admin">
      <h2>Manage Gallery</h2>

      <div className="upload-wrapper">
        <form onSubmit={handleUpload} className="upload-form">
          <label>Upload Image</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} required />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <button type="submit">{loading ? 'Uploading...' : 'Upload'}</button>
        </form>
      </div>

      <div className="filter-bar">
        <label>Filter by Category:</label>
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div>
        {loading ? <p>Loading...</p> : (
          <div className="gallery-grid">
            {filteredImages.map((img) => (
              <div key={img._id} className="gallery-item">
                <img src={img.imageUrl} alt="Gallery" />
                <button onClick={() => handleDelete(img._id)}>Delete</button>
                <div className="gallery-info">
                  <p><strong>Category:</strong> {img.category || 'Uncategorized'}</p>
                  <p><strong>Uploaded:</strong> {new Date(img.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryAdmin;

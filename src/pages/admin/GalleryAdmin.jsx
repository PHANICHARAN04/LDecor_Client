// src/pages/admin/GalleryAdmin.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/GalleryAdmin.css';

function GalleryAdmin() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/api/gallery');
      setImages(res.data);
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
      setCategory('');
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

  useEffect(() => { fetchImages(); }, []);

  return (
    <div className="gallery-admin">
      <h2>Manage Gallery</h2>

      <form onSubmit={handleUpload} className="upload-form">
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category (optional)" />
        <button type="submit">{loading?'uploading...':'upload'}</button>
      </form>

      <div>
        {loading ? <p>Loading...</p> : (
          <div className="gallery-grid">
            {images.map((img) => (
              <div key={img._id} className="gallery-item">
                <img src={img.imageUrl} alt="Gallery" />
                <button onClick={() => handleDelete(img._id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default GalleryAdmin;

// src/pages/admin/TestimonialsAdmin.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/TestimonialsAdmin.css';

function TestimonialsAdmin() {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({ name: '', quote: '' });
  const [file, setFile] = useState(null);

  const fetchTestimonials = async () => {
    const res = await axios.get('/api/testimonials');
    setTestimonials(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', form.name);
    formData.append('quote', form.quote);

    await axios.post('/api/testimonials', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setForm({ name: '', quote: '' });
    setFile(null);
    fetchTestimonials();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/testimonials/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchTestimonials();
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <div className="testimonials-admin">
      <h2>Manage Testimonials</h2>

      <form onSubmit={handleUpload} className="upload-form">
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Client Name"
          required
        />
        <textarea
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          placeholder="Client Testimonial / Quote"
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <button type="submit">Add Testimonial</button>
      </form>

      <div className="testimonials-list">
        {testimonials.map((t) => (
          <div key={t._id} className="testimonial-item">
            <img src={t.imageUrl} alt={t.name} />
            <h3>{t.name}</h3>
            <p>{t.quote}</p>
            <button onClick={() => handleDelete(t._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TestimonialsAdmin;

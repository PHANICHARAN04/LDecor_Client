// src/pages/admin/ServicesAdmin.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import '../../styles/ServicesAdmin.css';

function ServicesAdmin() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ title: '', description: '', category: '' });
  const [file, setFile] = useState(null);

  const fetchServices = async () => {
    const res = await axios.get('/api/services');
    setServices(res.data);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('category', form.category);

    await axios.post('/api/services', formData, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    setForm({ title: '', description: '', category: '' });
    setFile(null);
    fetchServices();
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/services/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    fetchServices();
  };

  useEffect(() => { fetchServices(); }, []);

  return (
    <div className="services-admin">
      <h2>Manage Services</h2>

      <form onSubmit={handleUpload} className="upload-form">
        <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" required />
        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" required />
        <input type="text" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="Category (optional)" />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} required />
        <button type="submit">Add Service</button>
      </form>

      <div className="services-list">
        {services.map((s) => (
          <div key={s._id} className="service-item">
            <img src={s.imageUrl} alt={s.title} />
            <div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
              <button onClick={() => handleDelete(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ServicesAdmin;

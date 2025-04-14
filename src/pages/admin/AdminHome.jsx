// src/pages/admin/AdminHome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AdminHome.css';
import { motion } from 'framer-motion';
import { FaImages, FaConciergeBell, FaCommentDots, FaServicestack, FaArchive } from 'react-icons/fa';

const AdminHome = () => {
  return (
    <motion.div 
      className="admin-dashboard-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="admin-title">Welcome to Admin Dashboard</h1>
      <p className="admin-subtext">
        Manage your application <strong>Gallery</strong>, <strong>Testimonials</strong>, and <strong>Services</strong> from here.
      </p>

      <div className="admin-shortcuts">
        <Link to="/admin/gallery" className="admin-card">
          <FaImages className="admin-icon" />
          <h3>Gallery</h3>
          <p>Upload, view, or delete event images.</p>
        </Link>

        <Link to="/admin/testimonials" className="admin-card">
          <FaCommentDots className="admin-icon" />
          <h3>Testimonials</h3>
          <p>Manage client quotes and feedback.</p>
        </Link>

        <Link to="/admin/services" className="admin-card">
          <FaArchive className="admin-icon" />
          <h3>Services</h3>
          <p>Update offerings for your decor portfolio.</p>
        </Link>
      </div>
    </motion.div>
  );
};

export default AdminHome;

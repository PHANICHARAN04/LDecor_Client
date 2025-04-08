import React from 'react';
import { useAuth } from '../Context/UserContext';
import Navbar from './Navbar'; // Fixed import path
import Footer from './Footer'; // Fixed import path
import Home from '../pages/Home'; // Fixed import path
import Services from '../pages/Services'; // Fixed import path
import Gallery from '../pages/Gallery'; // Fixed import path
import About from '../pages/About'; // Fixed import path
import Contact from '../pages/Contact'; // Fixed import path
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from '../pages/admin/AdminLogin'; // Fixed import path
import AdminHome from '../pages/admin/AdminHome'; // Fixed import path
import GalleryAdmin from '../pages/admin/GalleryAdmin'; // Fixed import path
import ServicesAdmin from '../pages/admin/ServicesAdmin'; // Fixed import path
import TestimonialsAdmin from '../pages/admin/TestimonialsAdmin'; // Fixed import path
import Admin from '../pages/admin/Admin';

function Layout() {
  const { user } = useAuth();
  
  return (
    <>
      <>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/" element={<Home/>} />
      </Routes>
        {user?.role !== 'admin'  ? (
          <>
            <Navbar />
            <main>
              <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/adminlogin" element={<AdminLogin />} />
                <Route path="*" element={<h1>Not found </h1>} /> {/* Fallback route */}

              </Routes>
            </main>
          </>
        ) : (
          <>
            
              <div className="admin-content">
        <Routes>
            <Route path="/admin" element={<Admin />} >
          <Route path="/admin/home" element={<AdminHome/>} />
          <Route path="/admin/gallery" element={<GalleryAdmin />} />
          <Route path="/admin/services" element={<ServicesAdmin />} />
          <Route path="/admin/testimonials" element={<TestimonialsAdmin />} />
          <Route path="*" element={<h1>Not found </h1>} /> {/* Fallback route */}
            </Route>
        </Routes>
      </div>
          
          </>
        )}
      </>
    </>
  );
}

export default Layout;
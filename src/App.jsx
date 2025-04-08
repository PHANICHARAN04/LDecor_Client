import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import { useEffect } from 'react';
import AdminLogin from './pages/admin/AdminLogin';
import AdminHome from './pages/admin/Admin';
import GalleryAdmin from './pages/admin/GalleryAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import TestimonialsAdmin from './pages/admin/TestimonialsAdmin';
import UserContext from './Context/UserContext';
import Layout from './components/Layout';



function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  
  return (
    <Router>
      <ScrollToTop />
      <UserContext>
   
  <Layout/>
     

      </UserContext>
      <Footer />
    </Router>
  );
}

export default App;

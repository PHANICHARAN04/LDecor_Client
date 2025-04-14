import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './components/Footer';
import { useEffect } from 'react';
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

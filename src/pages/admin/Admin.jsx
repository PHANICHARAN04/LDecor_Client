// src/pages/admin/AdminHome.jsx
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/AdminNavbar';

import '../../styles/AdminHome.css';

function Admin() {


  return (
    <div className="admin-home">
      <AdminNavbar />
      
    <Outlet/>
    </div>
  );
}

export default Admin;

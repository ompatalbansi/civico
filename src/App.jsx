import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Navbar from './pages/navbar';
import Home from './pages/home';
import Resister from './pages/resister';
import Login from './pages/login';
import Track from './pages/track';
import Admin from './pages/admin';
import { ToastProvider } from './context/ToastContext';

import Footer from './components/Footer';

import Info from './pages/info';

function App() {

  return (
    <ToastProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Resister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/track" element={<Track />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/info" element={<Info />} />
      </Routes>
      <Footer />
    </ToastProvider>
  )
}

export default App

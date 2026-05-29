import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import GiftsPage from './pages/GiftsPage.jsx';
import GiftDetailPage from './pages/GiftDetailPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Notification from './components/Notification.jsx';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fcf8fa] flex flex-col justify-between antialiased">
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 pb-24 md:pb-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/gifts" element={<GiftsPage />} />
              <Route path="/gift/:slug" element={<GiftDetailPage />} />
              <Route path="/category/:categorySlug" element={<GiftsPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
        <Notification />
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';
import GiftsPage from './pages/GiftsPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Notification from './components/Notification.jsx';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onPageChange={setCurrentPage} />;
      case 'gifts':
        return <GiftsPage />;
      case 'cart':
        return <CartPage onPageChange={setCurrentPage} />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onPageChange={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fcf8fa] flex flex-col justify-between antialiased">
      <div>
        <Header currentPage={currentPage} onPageChange={setCurrentPage} />
        <main className="pb-16 md:pb-0">
          {renderPage()}
        </main>
      </div>
      <Footer />
      <Notification />
    </div>
  );
}

export default App;

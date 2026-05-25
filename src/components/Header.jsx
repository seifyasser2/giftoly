import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Hop as Home, Gift, PhoneCall } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const Header = () => {
  const location = useLocation();
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const navItems = [
    { path: '/', label: 'الرئيسية', icon: Home },
    { path: '/gifts', label: 'الهدايا', icon: Gift },
    { path: '/contact', label: 'تواصل معنا', icon: PhoneCall },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40 border-b border-pink-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 group focus:outline-none"
        >
          <span className="text-3xl transform group-hover:scale-110 transition-transform">🎁</span>
          <span className="text-2xl font-black bg-gradient-to-l from-[#FF1493] to-[#C71585] bg-clip-text text-transparent">
            Giftoly
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all duration-200 ${
                  active
                    ? 'bg-pink-50 text-[#FF1493]'
                    : 'text-gray-600 hover:text-[#FF1493] hover:bg-gray-50'
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Cart Icon */}
        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className={`relative p-3 rounded-xl transition-all duration-200 ${
              isActive('/cart')
                ? 'bg-[#FF1493] text-white shadow-lg shadow-pink-200'
                : 'bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-[#FF1493]'
            }`}
          >
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#FF1493] border-2 border-white text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center animate-bounce">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-[0_-4px_12px_rgba(0,0,0,0.05)] px-6 py-2 flex justify-around items-center z-40">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                active ? 'text-[#FF1493] font-bold' : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
        <Link
          to="/cart"
          className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
            isActive('/cart') ? 'text-[#FF1493] font-bold' : 'text-gray-400 hover:text-gray-600'
          }`}
        >
          <ShoppingBag size={20} />
          <span className="text-xs">السلة</span>
        </Link>
      </nav>
    </header>
  );
};

export default Header;

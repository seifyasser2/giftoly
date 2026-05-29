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
    { path: '/contact', label: 'تواصل', icon: PhoneCall },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header className="sticky top-0 bg-white/95 backdrop-blur-md shadow-sm z-40 border-b border-pink-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 group focus:outline-none"
          >
            <span className="text-2xl md:text-3xl transform group-hover:scale-110 transition-transform">🎁</span>
            <span className="text-xl md:text-2xl font-black bg-gradient-to-l from-[#FF1493] to-[#C71585] bg-clip-text text-transparent">
              Giftoly
            </span>
          </Link>

          {/* Desktop Navigation */}
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
              className={`relative p-2.5 md:p-3 rounded-xl transition-all duration-200 ${
                isActive('/cart')
                  ? 'bg-[#FF1493] text-white shadow-lg shadow-pink-200'
                  : 'bg-gray-100 text-gray-700 hover:bg-pink-50 hover:text-[#FF1493]'
              }`}
            >
              <ShoppingBag size={20} className="md:w-[22px] md:h-[22px]" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF1493] border-2 border-white text-white text-[10px] font-black w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] z-50 safe-area-pb">
        <div className="flex justify-around items-center py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center justify-center gap-0.5 p-2 rounded-xl transition-all min-w-[60px] ${
                  active
                    ? 'text-[#FF1493]'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <div className={`p-1.5 rounded-lg ${active ? 'bg-pink-50' : ''}`}>
                  <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                </div>
                <span className={`text-[11px] font-medium ${active ? 'font-bold' : ''}`}>{item.label}</span>
                {active && (
                  <div className="w-1 h-1 rounded-full bg-[#FF1493] mt-0.5" />
                )}
              </Link>
            );
          })}
          <Link
            to="/cart"
            className={`flex flex-col items-center justify-center gap-0.5 p-2 rounded-xl transition-all min-w-[60px] relative ${
              isActive('/cart')
                ? 'text-[#FF1493]'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className={`p-1.5 rounded-lg relative ${isActive('/cart') ? 'bg-pink-50' : ''}`}>
              <ShoppingBag size={22} strokeWidth={isActive('/cart') ? 2.5 : 2} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF1493] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className={`text-[11px] font-medium ${isActive('/cart') ? 'font-bold' : ''}`}>السلة</span>
            {isActive('/cart') && (
              <div className="w-1 h-1 rounded-full bg-[#FF1493] mt-0.5" />
            )}
          </Link>
        </div>
      </nav>

      {/* Spacer for Mobile Bottom Navigation */}
      <div className="md:hidden h-16" />
    </>
  );
};

export default Header;

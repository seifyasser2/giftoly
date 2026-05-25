import React, { useEffect } from 'react';
import { CheckCircle, Info, X } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const Notification = () => {
  const { notification, clearNotification } = useCart();

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        clearNotification();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [notification, clearNotification]);

  if (!notification) return null;

  return (
    <div className="fixed bottom-6 right-6 left-6 md:left-auto md:w-96 z-50 animate-fade-in">
      <div className={`p-4 rounded-xl shadow-2xl flex items-center justify-between border ${
        notification.type === 'success' 
          ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
          : 'bg-blue-50 border-blue-200 text-blue-800'
      }`}>
        <div className="flex items-center gap-3">
          {notification.type === 'success' ? (
            <CheckCircle className="text-emerald-500 flex-shrink-0" size={22} />
          ) : (
            <Info className="text-blue-500 flex-shrink-0" size={22} />
          )}
          <p className="font-medium text-sm md:text-base leading-relaxed">{notification.message}</p>
        </div>
        <button 
          onClick={clearNotification}
          className="p-1 hover:bg-black/5 rounded-lg transition-colors mr-2"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
};

export default Notification;

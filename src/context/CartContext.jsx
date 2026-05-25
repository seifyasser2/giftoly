import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('giftoly_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notification, setNotification] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('giftoly_cart', JSON.stringify(cartItems));
    } catch {
      console.error('Failed to save cart to localStorage');
    }
  }, [cartItems]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const addToCart = (gift) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === gift.id);
      if (existingItem) {
        showNotification(`تم زيادة كمية ${gift.name} في السلة`, 'success');
        return prev.map(item =>
          item.id === gift.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        showNotification(`تم إضافة ${gift.name} إلى السلة بنجاح`, 'success');
        return [...prev, { ...gift, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (giftId) => {
    setCartItems(prev => prev.filter(item => item.id !== giftId));
    showNotification('تم حذف المنتج من السلة', 'info');
  };

  const updateQuantity = (giftId, quantity) => {
    if (quantity < 1) {
      removeFromCart(giftId);
      return;
    }
    setCartItems(prev =>
      prev.map(item => item.id === giftId ? { ...item, quantity } : item)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    showNotification('تم إفراغ السلة بالكامل', 'info');
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
      notification,
      showNotification,
      clearNotification
    }}>
      {children}
    </CartContext.Provider>
  );
};

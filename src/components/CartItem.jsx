import React from 'react';
import { Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm flex gap-4 items-center justify-between hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4 flex-1">
        {/* Product Image */}
        <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100">
          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-900 text-base md:text-lg mb-1 truncate">{item.name}</h3>
          <p className="text-[#FF1493] font-black text-base">
            {item.price} <span className="text-xs text-gray-400 font-normal">ج.م / للقطعة</span>
          </p>
        </div>
      </div>

      {/* Actions (Quantity & Delete) */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Quantity Controls */}
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl p-1 shadow-sm">
          <button
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            className="p-1.5 hover:bg-white rounded-lg text-gray-600 hover:text-[#FF1493] transition-all"
          >
            <Plus size={16} />
          </button>
          
          <span className="w-8 text-center font-black text-gray-800 text-sm">
            {item.quantity}
          </span>

          <button
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            className="p-1.5 hover:bg-white rounded-lg text-gray-600 hover:text-red-500 transition-all"
          >
            <Minus size={16} />
          </button>
        </div>

        {/* Total & Delete Button */}
        <div className="flex items-center gap-3 justify-end w-full sm:w-auto">
          <span className="text-base font-black text-gray-900 hidden md:inline min-w-[70px] text-left">
            {item.price * item.quantity} ج.م
          </span>
          <button
            onClick={() => removeFromCart(item.id)}
            className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
            title="حذف المنتج"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;

import React from 'react';
import { ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

const GiftCard = ({ gift }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group">
      {/* Product Image Wrapper */}
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={gift.image} 
          alt={gift.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <span className="bg-white/90 backdrop-blur-sm p-3 rounded-full text-gray-700 shadow-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
            <Eye size={20} />
          </span>
        </div>
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold text-[#FF1493] shadow-sm">
          تميز وفخامة
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-[#FF1493] transition-colors">
            {gift.name}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
            {gift.description}
          </p>
        </div>

        <div className="pt-2 border-t border-gray-50 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">السعر</span>
            <span className="text-xl font-black text-[#FF1493]">
              {gift.price} <span className="text-sm font-bold text-gray-500">ج.م</span>
            </span>
          </div>

          <button
            onClick={() => addToCart(gift)}
            className="bg-[#FF1493] hover:bg-[#C71585] text-white p-3 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-pink-100 flex items-center gap-2 group/btn active:scale-95"
            title="إضافة للسلة"
          >
            <ShoppingCart size={18} className="transform group-hover/btn:rotate-12 transition-transform" />
            <span className="text-sm font-bold hidden sm:inline">أضف للسلة</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;

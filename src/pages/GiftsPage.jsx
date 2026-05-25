import React, { useState } from 'react';
import { GIFTS, CATEGORIES } from '../data/gifts.js';
import GiftCard from '../components/GiftCard.jsx';
import { Search, SlidersHorizontal, PackageX } from 'lucide-react';

const GiftsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGifts = GIFTS.filter(gift => {
    const matchesCategory = selectedCategory === 'all' || gift.category === selectedCategory;
    const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         gift.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">كتالوج الهدايا الفاخرة</h1>
        <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">
          اكتشف تشكيلتنا الحصرية المصممة لتناسب كافة الأذواق والمناسبات السعيدة.
        </p>
      </div>

      {/* Search and Filters Container */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-12 space-y-6">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative">
          <Search className="absolute right-4 top-4 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="ابحث عن عطر، صندوق، زهور أو اسم الهدية..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full border border-gray-200 rounded-xl py-3.5 pr-12 pl-4 focus:outline-none focus:border-[#FF1493] focus:ring-2 focus:ring-pink-100 transition-all text-sm md:text-base shadow-sm"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-col items-center gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-400 self-start md:self-center">
            <SlidersHorizontal size={14} />
            <span>تصفية حسب الفئة:</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 w-full justify-start md:justify-center no-scrollbar mask-image">
            {CATEGORIES.map(category => {
              const isSelected = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#FF1493] text-white shadow-md shadow-pink-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gifts Grid Display */}
      {filteredGifts.length > 0 ? (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredGifts.map(gift => (
              <GiftCard key={gift.id} gift={gift} />
            ))}
          </div>
          
          {/* Results Count Summary */}
          <div className="mt-12 text-center text-gray-500 font-medium text-sm">
            <p>نعرض لكم {filteredGifts.length} من أصل {GIFTS.length} منتج متاح حالياً</p>
          </div>
        </div>
      ) : (
        /* Beautiful Empty State */
        <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <PackageX size={36} />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">عذراً، لم نجد الهدايا المطلوبة!</h3>
          <p className="text-gray-400 text-sm max-w-xs mx-auto leading-relaxed">
            حاول تغيير كلمات البحث أو اختر فئة أخرى للعثور على ما تبحث عنه.
          </p>
        </div>
      )}
    </div>
  );
};

export default GiftsPage;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCart } from '../context/CartContext.jsx';
import { Search, SlidersHorizontal, PackageX, Loader, ShoppingCart, Check, Plus } from 'lucide-react';

const GiftsPage = () => {
  const [categories, setCategories] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);
  const { addToCart, isInCart, getItemQuantity } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // جلب الفئات
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      setCategories(categoriesData || []);

      // جلب الهدايا مع الصور
      const { data: giftsData } = await supabase
        .from('gifts')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          ),
          gift_images (
            image_url,
            is_primary
          )
        `)
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      setGifts(giftsData || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (e, gift) => {
    e.preventDefault();
    e.stopPropagation();

    setAddingToCart(gift.id);

    const primaryImage = gift.gift_images?.find(img => img.is_primary)?.image_url || gift.gift_images?.[0]?.image_url;

    addToCart({
      id: gift.id,
      name: gift.name,
      price: gift.sale_price || gift.price,
      image: primaryImage,
    });

    // تحريك تأخير بسيط لإظهار التأثير
    setTimeout(() => {
      setAddingToCart(null);
    }, 600);
  };

  const filteredGifts = gifts.filter(gift => {
    const matchesCategory = selectedCategory === 'all' || gift.categories?.slug === selectedCategory;
    const matchesSearch = gift.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (gift.description?.toLowerCase() || '').includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const allCategories = [
    { slug: 'all', name: 'كل الهدايا' },
    ...categories
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="animate-spin mx-auto text-[#FF1493]" size={48} />
          <p className="mt-4 text-gray-500 font-medium">جاري تحميل الهدايا...</p>
        </div>
      </div>
    );
  }

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
            {allCategories.map(category => {
              const isSelected = selectedCategory === category.slug;
              return (
                <button
                  key={category.slug}
                  onClick={() => setSelectedCategory(category.slug)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 whitespace-nowrap ${
                    isSelected
                      ? 'bg-[#FF1493] text-white shadow-md shadow-pink-100'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
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
            {filteredGifts.map(gift => {
              const primaryImage = gift.gift_images?.find(img => img.is_primary)?.image_url || gift.gift_images?.[0]?.image_url;
              const inCart = isInCart(gift.id);
              const quantity = getItemQuantity(gift.id);
              const isAdding = addingToCart === gift.id;

              return (
                <div
                  key={gift.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col group relative"
                >
                  {/* Product Image Wrapper */}
                  <Link to={`/gift/${gift.slug}`} className="relative aspect-square overflow-hidden bg-gray-50 block">
                    <img
                      src={primaryImage}
                      alt={gift.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {gift.sale_price && gift.price > gift.sale_price && (
                      <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-lg text-xs font-bold">
                        خصم {Math.round(((gift.price - gift.sale_price) / gift.price) * 100)}%
                      </span>
                    )}

                    {/* Quick Add Button - appears on hover (desktop) */}
                    <button
                      onClick={(e) => handleAddToCart(e, gift)}
                      disabled={isAdding}
                      className={`absolute bottom-3 left-3 right-3 md:opacity-0 md:group-hover:opacity-100 transition-all duration-300 ${
                        isAdding
                          ? 'bg-emerald-500 text-white'
                          : inCart
                            ? 'bg-emerald-500 text-white'
                            : 'bg-[#FF1493] hover:bg-[#C71585] text-white'
                      } font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-lg active:scale-95`}
                    >
                      {isAdding ? (
                        <>
                          <Check size={18} />
                          <span className="text-sm">تمت الإضافة!</span>
                        </>
                      ) : inCart ? (
                        <>
                          <ShoppingCart size={18} />
                          <span className="text-sm">في السلة ({quantity})</span>
                          <Plus size={16} />
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={18} />
                          <span className="text-sm">إضافة للسلة</span>
                        </>
                      )}
                    </button>
                  </Link>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1 justify-between">
                    <div>
                      <Link to={`/gift/${gift.slug}`}>
                        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-1 group-hover:text-[#FF1493] transition-colors">
                          {gift.name}
                        </h3>
                      </Link>
                      <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">
                        {gift.description}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-gray-50 flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400">السعر</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xl font-black text-[#FF1493]">
                            {(gift.sale_price || gift.price).toLocaleString()}
                          </span>
                          <span className="text-sm font-bold text-gray-500">ج.م</span>
                        </div>
                        {gift.sale_price && gift.price > gift.sale_price && (
                          <span className="text-xs text-gray-400 line-through">
                            {gift.price.toLocaleString()} ج.م
                          </span>
                        )}
                      </div>

                      {/* Add to cart button - always visible on mobile */}
                      <button
                        onClick={(e) => handleAddToCart(e, gift)}
                        disabled={isAdding}
                        className={`md:hidden p-3 rounded-xl transition-all ${
                          isAdding
                            ? 'bg-emerald-500 text-white'
                            : inCart
                              ? 'bg-emerald-500 text-white'
                              : 'bg-[#FF1493] hover:bg-[#C71585] text-white'
                        } shadow-md active:scale-95`}
                      >
                        {isAdding ? (
                          <Check size={20} />
                        ) : (
                          <ShoppingCart size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* In Cart Indicator Badge */}
                  {inCart && (
                    <div className="absolute top-3 left-3 bg-emerald-500 text-white px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 shadow-md">
                      <ShoppingCart size={12} />
                      <span>{quantity}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Results Count Summary */}
          <div className="mt-12 text-center text-gray-500 font-medium text-sm">
            <p>نعرض لكم {filteredGifts.length} من أصل {gifts.length} منتج متاح حالياً</p>
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

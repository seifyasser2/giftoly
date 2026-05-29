import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, isSupabaseAvailable } from '../lib/supabase';
import { useCart } from '../context/CartContext.jsx';
import {
  ShoppingCart,
  Heart,
  Share2,
  Check,
  Package,
  Truck,
  Shield,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Minus,
  Plus,
  Star,
  Gift,
  Clock
} from 'lucide-react';
import { CONTACT } from '../data/gifts.js';

const GiftDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [gift, setGift] = useState(null);
  const [images, setImages] = useState([]);
  const [components, setComponents] = useState([]);
  const [tags, setTags] = useState([]);
  const [relatedGifts, setRelatedGifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchGiftDetails();
  }, [slug]);

  const fetchGiftDetails = async () => {
    try {
      setLoading(true);
      
      // التحقق من توفر Supabase
      if (!isSupabaseAvailable()) {
        setError('قاعدة البيانات غير متاحة حالياً. تحقق من ملف .env');
        setLoading(false);
        return;
      }

      // جلب تفاصيل الهدية
      const { data: giftData, error: giftError } = await supabase
        .from('gifts')
        .select(`
          *,
          categories (
            id,
            name,
            slug
          )
        `)
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (giftError || !giftData) {
        console.error('Error fetching gift:', giftError);
        navigate('/gifts');
        return;
      }

      setGift(giftData);

      // جلب الصور - تصحيح: استخدام gift_id بدلاً من gallery_id
      const { data: imagesData } = await supabase
        .from('gift_images')
        .select('*')
        .eq('gift_id', giftData.id)
        .order('sort_order', { ascending: true });

      setImages(imagesData || []);

      // جلب المكونات
      const { data: componentsData } = await supabase
        .from('gift_components')
        .select('*')
        .eq('gift_id', giftData.id)
        .order('sort_order', { ascending: true });

      setComponents(componentsData || []);

      // جلب الوسوم
      const { data: tagsData } = await supabase
        .from('gift_tags')
        .select('*')
        .eq('gift_id', giftData.id);

      setTags(tagsData || []);

      // جلب منتجات مشابهة
      if (giftData.category_id) {
        const { data: relatedData } = await supabase
          .from('gifts')
          .select(`
            *,
            gift_images (
              image_url,
              is_primary
            )
          `)
          .eq('category_id', giftData.category_id)
          .neq('id', giftData.id)
          .eq('is_active', true)
          .limit(4);

        setRelatedGifts(relatedData || []);
      }
    } catch (err) {
      console.error('Error:', err);
      setError('حدث خطأ أثناء تحميل تفاصيل الهدية');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    const primaryImage = images.find(img => img.is_primary)?.image_url || images[0]?.image_url;

    addToCart({
      id: gift.id,
      name: gift.name,
      price: gift.sale_price || gift.price,
      image: primaryImage,
    }, quantity);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const calculateDiscount = () => {
    if (gift.sale_price && gift.price > gift.sale_price) {
      return Math.round(((gift.price - gift.sale_price) / gift.price) * 100);
    }
    return 0;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FF1493]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md text-center">
          <p className="text-red-600 font-bold text-lg mb-4">{error}</p>
          <button
            onClick={() => navigate('/gifts')}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
          >
            العودة للهدايا
          </button>
        </div>
      </div>
    );
  }

  if (!gift) {
    return null;
  }

  const primaryImage = images.find(img => img.is_primary)?.image_url || images[0]?.image_url;
  const discount = calculateDiscount();

  return (
    <div className="min-h-screen py-8 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <button onClick={() => navigate('/')} className="hover:text-[#FF1493]">الرئيسية</button>
        <ChevronLeft size={16} />
        <button onClick={() => navigate('/gifts')} className="hover:text-[#FF1493]">الهدايا</button>
        <ChevronLeft size={16} />
        <span className="text-gray-700">{gift.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
        {/* Images Section */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100">
            <img
              src={images[currentImageIndex]?.image_url || primaryImage}
              alt={gift.name}
              className="w-full h-full object-cover"
            />

            {discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                خصم {discount}%
              </div>
            )}

            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <ChevronRight size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-all"
                >
                  <ChevronLeft size={20} />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Images */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    currentImageIndex === idx
                      ? 'border-[#FF1493] ring-2 ring-pink-100'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={img.image_url}
                    alt={`${gift.name} - صورة ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="space-y-6">
          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-pink-50 text-[#FF1493] px-3 py-1 rounded-full text-xs font-bold"
                >
                  {tag.tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight">
            {gift.name}
          </h1>

          {/* Rating (static) */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} className="text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <span className="text-sm text-gray-500">(5.0) - 128 تقييم</span>
          </div>

          {/* Pricing */}
          <div className="flex items-end gap-4">
            <span className="text-4xl md:text-5xl font-black text-[#FF1493]">
              {(gift.sale_price || gift.price).toLocaleString()} ج.م
            </span>
            {gift.sale_price && gift.price > gift.sale_price && (
              <span className="text-xl text-gray-400 line-through">
                {gift.price.toLocaleString()} ج.م
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 text-lg leading-relaxed">
            {gift.detailed_description || gift.description}
          </p>

          {/* Components */}
          {components.length > 0 && (
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Package size={20} className="text-[#FF1493]" />
                محتويات الصندوق
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {components.map((component) => (
                  <div
                    key={component.id}
                    className="flex items-start gap-3 bg-white p-3 rounded-xl"
                  >
                    <Check size={18} className="text-emerald-500 mt-0.5 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-gray-900 text-sm">{component.name}</p>
                      {component.description && (
                        <p className="text-xs text-gray-500">{component.description}</p>
                      )}
                      {component.quantity > 1 && (
                        <p className="text-xs text-[#FF1493] mt-1">الكمية: {component.quantity}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center gap-4 bg-gray-50 rounded-xl p-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-white rounded-lg transition-all"
              >
                <Minus size={20} />
              </button>
              <span className="w-12 text-center font-black text-lg">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-white rounded-lg transition-all"
              >
                <Plus size={20} />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-[#FF1493] hover:bg-[#C71585] text-white font-black py-4 px-8 rounded-xl transition-all shadow-lg shadow-pink-100 flex items-center justify-center gap-2 text-lg active:scale-95"
            >
              <ShoppingCart size={22} />
              <span>إضافة للسلة</span>
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className={`p-4 rounded-xl border-2 transition-all ${
                isWishlisted
                  ? 'bg-red-50 border-red-300 text-red-500'
                  : 'bg-gray-50 border-gray-200 text-gray-500 hover:border-red-300 hover:text-red-500'
              }`}
            >
              <Heart size={22} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
          </div>

          {/* Delivery & Guarantee Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <Truck className="text-[#FF1493]" size={24} />
              <div>
                <p className="font-bold text-gray-900 text-sm">توصيل سريع</p>
                <p className="text-xs text-gray-500">خلال 1-2 يوم</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield className="text-[#FF1493]" size={24} />
              <div>
                <p className="font-bold text-gray-900 text-sm">ضمان الجودة</p>
                <p className="text-xs text-gray-500">منتجات أصلية %100</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Gift className="text-[#FF1493]" size={24} />
              <div>
                <p className="font-bold text-gray-900 text-sm">تغليف فاخر</p>
                <p className="text-xs text-gray-500">مجاني مع كل طلب</p>
              </div>
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 text-sm">
            {gift.stock > 10 ? (
              <>
                <Check className="text-emerald-500" size={18} />
                <span className="text-emerald-600 font-medium">متوفر في المخزون</span>
              </>
            ) : gift.stock > 0 ? (
              <>
                <Clock className="text-orange-500" size={18} />
                <span className="text-orange-600 font-medium">متبقي {gift.stock} قطع فقط</span>
              </>
            ) : (
              <>
                <span className="text-red-600 font-medium">غير متوفر حالياً</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedGifts.length > 0 && (
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">منتجات مشابهة</h2>
            <button
              onClick={() => navigate(`/category/${gift.categories?.slug}`)}
              className="text-[#FF1493] font-bold text-sm hover:underline flex items-center gap-1"
            >
              عرض الكل
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {relatedGifts.map((relatedGift) => {
              const relatedImage = relatedGift.gift_images?.find(img => img.is_primary)?.image_url || relatedGift.gift_images?.[0]?.image_url;
              return (
                <button
                  key={relatedGift.id}
                  onClick={() => navigate(`/gift/${relatedGift.slug}`)}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all text-right"
                >
                  <div className="aspect-square overflow-hidden bg-gray-50">
                    <img
                      src={relatedImage}
                      alt={relatedGift.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 text-sm mb-1 line-clamp-1">{relatedGift.name}</h3>
                    <p className="text-[#FF1493] font-black">
                      {(relatedGift.sale_price || relatedGift.price).toLocaleString()} ج.م
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default GiftDetailPage;
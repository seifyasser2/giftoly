import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';
import { MessageCircle, ShoppingBag, ArrowRight, Trash2, ShieldCheck } from 'lucide-react';
import { CONTACT } from '../data/gifts.js';

const CartPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    const itemsList = cartItems
      .map(item => `- ${item.name} (العدد: ${item.quantity}) = ${item.price * item.quantity} ج.م`)
      .join('\n');

    const totalPrice = getTotalPrice();
    const message = `مرحباً متجر Giftoly ✨

أود إرسال طلب شراء للهدايا التالية:

${itemsList}

الإجمالي الكلي للطلب: ${totalPrice} ج.م

أرجو تأكيد الطلب وتحديد موعد التوصيل 🎁`;

    const whatsappLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">سلة المشتريات</h1>
          <p className="text-gray-500 text-sm md:text-base">
            {cartItems.length > 0
              ? `لديك حالياً ${cartItems.length} هدايا مميزة جاهزة للتغليف والطلب`
              : 'تصفح المتجر وأضف هداياك المفضلة هنا'}
          </p>
        </div>

        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm font-bold text-red-500 hover:text-red-700 flex items-center gap-1.5 px-3 py-2 hover:bg-red-50 rounded-xl transition-colors self-start md:self-auto"
          >
            <Trash2 size={16} />
            <span>إفراغ السلة بالكامل</span>
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Order Summary Sidebar Box */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sticky top-24 space-y-6">
            <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-100">ملخص وعملية الطلب</h2>

            {/* Price Itemized Summary */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between text-sm text-gray-600">
                  <span className="truncate max-w-[180px]">{item.name} <span className="font-bold text-xs text-gray-400">(x{item.quantity})</span></span>
                  <span className="font-semibold text-gray-900">{item.price * item.quantity} ج.م</span>
                </div>
              ))}
            </div>

            {/* Total Row */}
            <div className="bg-pink-50/50 rounded-xl p-4 flex justify-between items-center">
              <span className="font-bold text-gray-800 text-base">الإجمالي النهائي:</span>
              <span className="text-2xl font-black text-[#FF1493]">{getTotalPrice()} ج.م</span>
            </div>

            {/* Security/Note Info */}
            <div className="flex items-start gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
              <ShieldCheck size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                يتم إرسال الطلب بشكل آمن وفوري إلى خدمة عملاء الواتساب لتجهيز التغليف والرد عليك في دقائق.
              </p>
            </div>

            {/* CTA Execution Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2 text-md active:scale-[0.98]"
              >
                <MessageCircle size={22} />
                <span>إرسال وتأكيد الطلب عبر الواتساب</span>
              </button>

              <Link
                to="/gifts"
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-1.5 text-sm"
              >
                <ArrowRight size={16} />
                <span>العودة لمتابعة التسوق</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State Layout */
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm max-w-lg mx-auto">
          <div className="w-20 h-20 bg-pink-50 text-[#FF1493] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-pulse">
            <ShoppingBag size={40} />
          </div>
          <h2 className="text-2xl font-black text-gray-800 mb-3">سلتك فارغة تماماً!</h2>
          <p className="text-gray-400 mb-8 max-w-xs mx-auto text-sm md:text-base leading-relaxed">
            يبدو أنك لم تقم بإضافة أي من هدايانا الفاخرة بعد. تصفح الكتالوج واصنع السعادة الآن.
          </p>
          <Link
            to="/gifts"
            className="bg-[#FF1493] hover:bg-[#C71585] text-white font-black py-3.5 px-10 rounded-xl transition-all shadow-lg shadow-pink-100 inline-flex items-center gap-2 text-md active:scale-95"
          >
            <span>ابدأ بتصفح الهدايا</span>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;

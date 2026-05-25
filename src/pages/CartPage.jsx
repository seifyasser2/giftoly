import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import CartItem from '../components/CartItem.jsx';
import CheckoutForm from '../components/CheckoutForm.jsx';
import OrderSuccess from '../components/OrderSuccess.jsx';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck, CreditCard } from 'lucide-react';

const CartPage = () => {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [orderData, setOrderData] = useState(null);

  const subtotal = getTotalPrice();

  const handleProceedToCheckout = () => {
    setCheckoutStep('checkout');
  };

  const handleOrderComplete = (order) => {
    setOrderData(order);
    setCheckoutStep('success');
    clearCart();
  };

  const handleBackToCart = () => {
    setCheckoutStep('cart');
  };

  // عرض صفحة النجاح
  if (checkoutStep === 'success' && orderData) {
    return <OrderSuccess order={orderData} />;
  }

  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {checkoutStep === 'checkout' ? 'إتمام الطلب' : 'سلة المشتريات'}
          </h1>
          <p className="text-gray-500 text-sm md:text-base">
            {checkoutStep === 'checkout'
              ? 'يرجى إدخال بياناتك来完成 الطلب'
              : cartItems.length > 0
                ? `لديك حالياً ${cartItems.length} هدايا مميزة جاهزة للتغليف والطلب`
                : 'تصفح المتجر وأضف هداياك المفضلة هنا'}
          </p>
        </div>

        {checkoutStep === 'cart' && cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="text-sm font-bold text-red-500 hover:text-red-700 flex items-center gap-1.5 px-3 py-2 hover:bg-red-50 rounded-xl transition-colors self-start md:self-auto"
          >
            <Trash2 size={16} />
            <span>إفراغ السلة بالكامل</span>
          </button>
        )}
      </div>

      {checkoutStep === 'cart' && (
        <>
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
                <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-100">ملخص السلة</h2>

                {/* Price Itemized Summary */}
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex justify-between text-sm text-gray-600">
                      <span className="truncate max-w-[180px]">{item.name} <span className="font-bold text-xs text-gray-400">(x{item.quantity})</span></span>
                      <span className="font-semibold text-gray-900">{(item.price * item.quantity).toLocaleString()} ج.م</span>
                    </div>
                  ))}
                </div>

                {/* Total Row */}
                <div className="bg-pink-50/50 rounded-xl p-4 flex justify-between items-center">
                  <span className="font-bold text-gray-800 text-base">إجمالي المنتجات:</span>
                  <span className="text-2xl font-black text-[#FF1493]">{subtotal.toLocaleString()} ج.م</span>
                </div>

                {/* Security/Note Info */}
                <div className="flex items-start gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-100">
                  <ShieldCheck size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-gray-500 leading-relaxed">
                    بياناتك آمنة ومشفرة. يمكنك إضافة بيانات الشحن في الخطوة التالية.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div className="space-y-3 pt-2">
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full bg-[#FF1493] hover:bg-[#C71585] text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-pink-100 flex items-center justify-center gap-2 text-lg active:scale-95"
                  >
                    <CreditCard size={22} />
                    <span>إتمام الطلب</span>
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
        </>
      )}

      {checkoutStep === 'checkout' && (
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6">
            <CheckoutForm
              onOrderComplete={handleOrderComplete}
              cartItems={cartItems}
              subtotal={subtotal}
            />
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 pb-3 border-b border-gray-100 mb-4">المنتجات المطلوبة</h2>

              <div className="space-y-4">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">الكمية: {item.quantity}</p>
                      <p className="text-sm font-bold text-[#FF1493]">
                        {(item.price * item.quantity).toLocaleString()} ج.م
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>إجمالي المنتجات:</span>
                  <span className="font-bold">{subtotal.toLocaleString()} ج.م</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-2">
                  <span>تكلفة الشحن:</span>
                  <span className="font-bold text-sm">(سيتم تحديدها حسب المحافظة)</span>
                </div>
              </div>

              <button
                onClick={handleBackToCart}
                className="w-full mt-4 text-sm font-bold text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
              >
                <ArrowRight size={16} />
                <span>العودة للسلة</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

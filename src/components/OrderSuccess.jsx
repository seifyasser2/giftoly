import React from 'react';
import { Link } from 'react-router-dom';
import { CircleCheck as CheckCircle, Package, Hop as Home, MessageCircle, Copy, Check } from 'lucide-react';
import { CONTACT } from '../data/gifts.js';
import { useCart } from '../context/CartContext.jsx';

const OrderSuccess = ({ order }) => {
  const { clearCart } = useCart();
  const [copied, setCopied] = React.useState(false);

  const handleCopyOrderNumber = () => {
    navigator.clipboard.writeText(order.order_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppOrder = () => {
    const itemsList = order.items
      .map(item => `- ${item.name} (العدد: ${item.quantity}) = ${item.price * item.quantity} ج.م`)
      .join('\n');

    const message = `مرحباً متجر Giftoly ✨

تم إرسال طلب جديد عبر الموقع:

📦 رقم الطلب: ${order.order_number}

👤 بيانات العميل:
الاسم: ${order.customer_name}
الهاتف 1: ${order.phone1}
الهاتف 2: ${order.phone2 || 'غير محدد'}

📍 العنوان:
${order.address}

🛒 المنتجات:
${itemsList}

💰 التفاصيل المالية:
إجمالي المنتجات: ${order.subtotal} ج.م
تكلفة الشحن: ${order.shipping_cost} ج.م
الإجمالي الكلي: ${order.total} ج.م

📝 ملاحظات:
${order.notes || 'لا توجد ملاحظات'}

أرجو تأكيد الطلب وتحديد موعد التوصيل 🎁`;

    const whatsappLink = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow-xl overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-8 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <CheckCircle className="text-emerald-500" size={48} />
          </div>
          <h1 className="text-3xl font-black mb-2">تم تأكيد الطلب بنجاح!</h1>
          <p className="text-emerald-100">شكراً لك، سيتم التواصل معك قريباً</p>
        </div>

        {/* Order Details */}
        <div className="p-6 space-y-4">
          {/* Order Number */}
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-500 mb-1">رقم الطلب</p>
            <div className="flex items-center justify-between">
              <p className="text-xl font-black text-gray-900">{order.order_number}</p>
              <button
                onClick={handleCopyOrderNumber}
                className="flex items-center gap-1 text-[#FF1493] hover:text-[#C71585] transition-colors"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    <span className="text-sm font-bold">تم النسخ</span>
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    <span className="text-sm font-bold">نسخ</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-3 border-b border-gray-100 pb-4">
            <div className="flex justify-between text-gray-600">
              <span>الاسم:</span>
              <span className="font-bold">{order.customer_name}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>الهاتف:</span>
              <span className="font-bold" dir="ltr">{order.phone1}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>عدد المنتجات:</span>
              <span className="font-bold">{order.items.length}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>إجمالي المنتجات:</span>
              <span className="font-bold">{order.subtotal.toLocaleString()} ج.م</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>تكلفة الشحن:</span>
              <span className="font-bold">{order.shipping_cost.toLocaleString()} ج.م</span>
            </div>
            <div className="flex justify-between text-lg pt-2 border-t border-gray-200">
              <span className="font-bold text-gray-900">الإجمالي الكلي:</span>
              <span className="font-black text-[#FF1493]">{order.total.toLocaleString()} ج.م</span>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3 bg-emerald-50 text-emerald-700 p-4 rounded-xl">
            <Package size={22} />
            <div>
              <p className="font-bold">جاري معالجة الطلب</p>
              <p className="text-sm text-emerald-600">سيتم التواصل معك خلال 24 ساعة</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl transition-all shadow-md shadow-emerald-100 flex items-center justify-center gap-2"
            >
              <MessageCircle size={22} />
              <span>إرسال الطلب عبر واتساب</span>
            </button>

            <Link
              to="/"
              onClick={clearCart}
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Home size={20} />
              <span>العودة للرئيسية</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;

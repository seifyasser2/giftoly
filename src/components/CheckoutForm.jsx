import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User, Phone, MapPin, Building, Loader, CircleAlert as AlertCircle } from 'lucide-react';

const CheckoutForm = ({ onOrderComplete, cartItems, subtotal }) => {
  const [governorates, setGovernorates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    customer_name: '',
    phone1: '',
    phone2: '',
    governorate_id: '',
    address: '',
    notes: ''
  });

  useEffect(() => {
    fetchGovernorates();
  }, []);

  const fetchGovernorates = async () => {
    try {
      const { data } = await supabase
        .from('governorates')
        .select('*')
        .eq('is_active', true)
        .order('sort_order', { ascending: true });

      setGovernorates(data || []);
    } catch (err) {
      console.error('Error fetching governorates:', err);
    }
  };

  const selectedGovernorate = governorates.find(g => g.id === formData.governorate_id);
  const shippingCost = selectedGovernorate?.shipping_cost || 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // إزالة الخطأ عند الكتابة
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.customer_name.trim()) {
      newErrors.customer_name = 'الاسم ثلاثي مطلوب';
    } else if (formData.customer_name.trim().split(' ').length < 3) {
      newErrors.customer_name = 'يرجى إدخال الاسم ثلاثي كامل';
    }

    if (!formData.phone1.trim()) {
      newErrors.phone1 = 'رقم الهاتف الأول مطلوب';
    } else if (!/^01[0-9]{9}$/.test(formData.phone1)) {
      newErrors.phone1 = 'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم';
    }

    if (formData.phone2 && !/^01[0-9]{9}$/.test(formData.phone2)) {
      newErrors.phone2 = 'رقم الهاتف يجب أن يبدأ بـ 01 ويتكون من 11 رقم';
    }

    if (!formData.governorate_id) {
      newErrors.governorate_id = 'يرجى اختيار المحافظة';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'العنوان التفصيلي مطلوب';
    } else if (formData.address.trim().length < 10) {
      newErrors.address = 'يرجى إدخال عنوان تفصيلي (10 أحرف على الأقل)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const generateOrderNumber = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `GO-${year}${month}${day}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const orderNumber = generateOrderNumber();

      const orderData = {
        order_number: orderNumber,
        customer_name: formData.customer_name,
        phone1: formData.phone1,
        phone2: formData.phone2 || null,
        governorate_id: formData.governorate_id,
        address: formData.address,
        shipping_cost: shippingCost,
        subtotal: subtotal,
        total: total,
        items: cartItems,
        notes: formData.notes || null
      };

      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select();

      if (error) throw error;

      onOrderComplete(data[0]);
    } catch (err) {
      console.error('Error creating order:', err);
      setErrors({ submit: 'حدث خطأ أثناء إنشاء الطلب. يرجى المحاولة مرة أخرى.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* الاسم ثلاثي */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          <User size={16} className="inline ml-1" />
          الاسم ثلاثي <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleInputChange}
          placeholder="مثال: أحمد محمد علي"
          className={`w-full border-2 rounded-xl py-3 px-4 focus:outline-none focus:border-[#FF1493] transition-all ${
            errors.customer_name ? 'border-red-500 bg-red-50' : 'border-gray-200'
          }`}
        />
        {errors.customer_name && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.customer_name}
          </p>
        )}
      </div>

      {/* أرقام الهواتف */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Phone size={16} className="inline ml-1" />
            رقم الهاتف الأول <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone1"
            value={formData.phone1}
            onChange={handleInputChange}
            placeholder="01xxxxxxxxx"
            maxLength={11}
            className={`w-full border-2 rounded-xl py-3 px-4 focus:outline-none focus:border-[#FF1493] transition-all ${
              errors.phone1 ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.phone1 && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.phone1}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            <Phone size={16} className="inline ml-1" />
            رقم الهاتف الثاني (اختياري)
          </label>
          <input
            type="tel"
            name="phone2"
            value={formData.phone2}
            onChange={handleInputChange}
            placeholder="01xxxxxxxxx"
            maxLength={11}
            className={`w-full border-2 rounded-xl py-3 px-4 focus:outline-none focus:border-[#FF1493] transition-all ${
              errors.phone2 ? 'border-red-500 bg-red-50' : 'border-gray-200'
            }`}
          />
          {errors.phone2 && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
              <AlertCircle size={14} />
              {errors.phone2}
            </p>
          )}
        </div>
      </div>

      {/* المحافظة */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          <Building size={16} className="inline ml-1" />
          المحافظة <span className="text-red-500">*</span>
        </label>
        <select
          name="governorate_id"
          value={formData.governorate_id}
          onChange={handleInputChange}
          className={`w-full border-2 rounded-xl py-3 px-4 focus:outline-none focus:border-[#FF1493] transition-all ${
            errors.governorate_id ? 'border-red-500 bg-red-50' : 'border-gray-200'
          }`}
        >
          <option value="">اختر المحافظة</option>
          {governorates.map(gov => (
            <option key={gov.id} value={gov.id}>
              {gov.name} - شحن: {gov.shipping_cost} ج.م
            </option>
          ))}
        </select>
        {errors.governorate_id && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.governorate_id}
          </p>
        )}
      </div>

      {/* العنوان التفصيلي */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          <MapPin size={16} className="inline ml-1" />
          العنوان التفصيلي <span className="text-red-500">*</span>
        </label>
        <textarea
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="الشارع، رقم العمارة، رقم الشقة، أقرب معلم..."
          rows={3}
          className={`w-full border-2 rounded-xl py-3 px-4 focus:outline-none focus:border-[#FF1493] transition-all resize-none ${
            errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200'
          }`}
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
            <AlertCircle size={14} />
            {errors.address}
          </p>
        )}
      </div>

      {/* ملاحظات */}
      <div>
        <label className="block text-sm font-bold text-gray-700 mb-2">
          ملاحظات إضافية (اختياري)
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          placeholder="أي تفاصيل إضافية عن الطلب أو التوصيل..."
          rows={2}
          className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-[#FF1493] transition-all resize-none"
        />
      </div>

      {/* ملخص التكاليف */}
      <div className="bg-gray-50 rounded-xl p-4 space-y-3">
        <div className="flex justify-between text-gray-600">
          <span>إجمالي المنتجات:</span>
          <span className="font-bold">{subtotal.toLocaleString()} ج.م</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>تكلفة الشحن ({selectedGovernorate?.name || 'لم تحدد'}):</span>
          <span className="font-bold">{shippingCost.toLocaleString()} ج.م</span>
        </div>
        <div className="border-t border-gray-200 pt-3 flex justify-between text-lg">
          <span className="font-bold text-gray-900">الإجمالي الكلي:</span>
          <span className="font-black text-[#FF1493]">{total.toLocaleString()} ج.م</span>
        </div>
      </div>

      {/* خطأ عام */}
      {errors.submit && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600">
          {errors.submit}
        </div>
      )}

      {/* زر تأكيد الطلب */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#FF1493] hover:bg-[#C71585] disabled:bg-gray-400 text-white font-black py-4 rounded-xl transition-all shadow-lg shadow-pink-100 flex items-center justify-center gap-2 text-lg active:scale-95"
      >
        {loading ? (
          <>
            <Loader className="animate-spin" size={22} />
            <span>جاري تأكيد الطلب...</span>
          </>
        ) : (
          <span>تأكيد الطلب - {total.toLocaleString()} ج.م</span>
        )}
      </button>
    </form>
  );
};

export default CheckoutForm;

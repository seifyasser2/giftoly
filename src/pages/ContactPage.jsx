import React from 'react';
import { Mail, Phone, MapPin, MessageCircle, Clock } from 'lucide-react';
import { CONTACT } from '../data/gifts.js';

// Custom Instagram Icon
const InstagramIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Custom Facebook Icon
const FacebookIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || 24}
    height={props.size || 24}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const ContactPage = () => {
  return (
    <div className="min-h-screen py-12 px-4 max-w-7xl mx-auto animate-fade-in">
      {/* Top Banner Header */}
      <div className="text-center mb-16">
        <div className="inline-block bg-pink-50 text-[#FF1493] px-4 py-1 rounded-full text-xs font-bold mb-3">سعداء بخدمتكم</div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">تواصل معنا</h1>
        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto">
          نحن هنا دائماً لمساعدتك في تنسيق واختيار الهدية المثالية والإجابة على جميع الاستفسارات.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-start">
        {/* Contact Quick Link Grid Info */}
        <div className="space-y-5">
          <h2 className="text-2xl font-black text-gray-900 mb-2">قنوات التواصل المباشر</h2>

          {/* Phone */}
          <a
            href={`tel:${CONTACT.phone}`}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FF1493] transition-all group"
          >
            <div className="p-3 bg-pink-50 text-[#FF1493] rounded-xl group-hover:bg-[#FF1493] group-hover:text-white transition-colors">
              <Phone size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">الاتصال الهاتفي</h3>
              <p dir="ltr" className="text-gray-700 font-medium text-sm md:text-base text-right">{CONTACT.phone}</p>
              <p className="text-xs text-gray-400 mt-1">متاح طوال أيام العمل الرسمية</p>
            </div>
          </a>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${CONTACT.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all group"
          >
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <MessageCircle size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">المحادثة عبر الواتساب</h3>
              <p dir="ltr" className="text-gray-700 font-medium text-sm md:text-base text-right">{CONTACT.phone}</p>
              <p className="text-xs text-emerald-500 font-medium mt-1">رد فوري وسريع لخدمتكم</p>
            </div>
          </a>

          {/* Email */}
          <a
            href={`mailto:${CONTACT.email}`}
            className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#FF1493] transition-all group"
          >
            <div className="p-3 bg-pink-50 text-[#FF1493] rounded-xl group-hover:bg-[#FF1493] group-hover:text-white transition-colors">
              <Mail size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">البريد الإلكتروني الرسمي</h3>
              <p className="text-gray-700 font-medium text-sm md:text-base">{CONTACT.email}</p>
              <p className="text-xs text-gray-400 mt-1">نرد على رسائلكم خلال 24 ساعة كحد أقصى</p>
            </div>
          </a>

          {/* Location Address */}
          <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-3 bg-gray-50 text-gray-500 rounded-xl">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 text-base mb-1">نطاق العمل والعنوان</h3>
              <p className="text-gray-700 text-sm md:text-base">{CONTACT.address}</p>
              <p className="text-xs text-gray-400 mt-1">{CONTACT.location}</p>
            </div>
          </div>
        </div>

        {/* Social Media Channels & Business Hours Column */}
        <div className="space-y-6">
          <h2 className="text-2xl font-black text-gray-900 mb-2">منصاتنا الرقمية وساعات العمل</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Instagram Link Card */}
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <div>
                <h3 className="font-bold text-md mb-0.5">Instagram</h3>
                <p className="text-xs opacity-90">@giftoly.eg</p>
              </div>
              <InstagramIcon size={28} />
            </a>

            {/* TikTok Link Card */}
            <a
              href={CONTACT.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <div>
                <h3 className="font-bold text-md mb-0.5">TikTok</h3>
                <p className="text-xs opacity-90">@giftoly.eg</p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
              </svg>
            </a>

            {/* Facebook Link Card */}
            <a
              href={CONTACT.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <div>
                <h3 className="font-bold text-md mb-0.5">Facebook Page</h3>
                <p className="text-xs opacity-90">Giftoly Store</p>
              </div>
              <FacebookIcon size={28} />
            </a>

            {/* WhatsApp */}
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-5 bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            >
              <div>
                <h3 className="font-bold text-md mb-0.5">WhatsApp</h3>
                <p className="text-xs opacity-90">رد سريع 24/7</p>
              </div>
              <MessageCircle size={28} />
            </a>
          </div>

          {/* Detailed Business Operational Hours */}
          <div className="p-6 bg-white rounded-2xl border-2 border-dashed border-pink-200 shadow-sm">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-lg mb-4">
              <Clock size={20} className="text-[#FF1493]" />
              <h3>ساعات العمل الرسمية لتجهيز الهدايا</h3>
            </div>
            <div className="space-y-2.5 text-sm md:text-base text-gray-600 font-medium">
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span>الأحد - الخميس:</span>
                <span className="text-gray-900 font-bold">09:00 ص - 08:00 م</span>
              </div>
              <div className="flex justify-between border-b border-gray-50 pb-2">
                <span>الجمعة:</span>
                <span className="text-gray-900 font-bold">12:00 م - 08:00 م</span>
              </div>
              <div className="flex justify-between text-red-500 font-bold">
                <span>السبت:</span>
                <span>عطلة أسبوعية</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Accordion Style FAQ Section Layout */}
      <section className="bg-white rounded-2xl border border-gray-100 shadow-xl p-6 md:p-10 max-w-4xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-gray-900 text-center mb-10">الأسئلة الشائعة والإجابات</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">كم يستغرق وقت شحن وتوصيل الطلب؟</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              نوصل كافة الطلبات بعناية فائقة لجميع أحياء ومناطق القاهرة الكبرى خلال 1-2 يوم عمل كحد أقصى.
            </p>
          </div>

          <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">هل يمكنني تعديل مكونات الطلب بعد الإرسال؟</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              بكل تأكيد، يرجى التواصل معنا فوراً وبأسرع وقت عبر الهاتف أو الواتساب قبل البدء في تغليف وتجهيز البوكس.
            </p>
          </div>

          <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">هل تقدمون خدمة تنسيق هدايا مخصصة؟</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              نعم، يسعدنا للغاية توفير ميزة تخصيص وتعديل الهدايا وإضافة الحفر والأسماء وكروت الإهداء الخاصة بناءً على رغبتك.
            </p>
          </div>

          <div className="bg-gray-50/60 p-5 rounded-xl border border-gray-100">
            <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2">ما هي السياسة المتبعة في الاسترجاع؟</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              لدينا مرونة كاملة وسياسة إرجاع واستبدال واضحة تمتد لغاية 7 أيام من موعد التسليم للمنتجات غير المستخدمة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

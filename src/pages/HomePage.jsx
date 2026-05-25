import React from 'react';
import { ArrowLeft, Sparkles, Truck, Gift, ShieldCheck } from 'lucide-react';

const HomePage = ({ onPageChange }) => {
  return (
    <div className="min-h-[calc(100vh-80px)] animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-pink-50/60 via-transparent to-transparent py-20 lg:py-32 px-4">
        <div className="absolute top-20 right-10 text-pink-200 blur-sm pointer-events-none animate-pulse">
          <Sparkles size={120} />
        </div>
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-pink-100/80 text-[#FF1493] px-4 py-1.5 rounded-full text-xs md:text-sm font-black mb-6 border border-pink-200">
            <Sparkles size={16} />
            <span>عالم من الهدايا الراقية والمبتكرة</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-[1.2] md:leading-[1.15]">
            أهدِ اللحظات الجميلة <br/>
            <span className="bg-gradient-to-l from-[#FF1493] to-[#C71585] bg-clip-text text-transparent">
              واصنع ذكريات لا تُنسى 🎁
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            اختر من تشكيلتنا الفاخرة من أجود الهدايا والمصممة بعناية فائقة لتُسعد قلوب أحبائك وتليق بمناسباتكم السعيدة.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onPageChange('gifts')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FF1493] hover:bg-[#C71585] text-white font-black py-4 px-10 rounded-2xl transition-all duration-200 text-lg shadow-xl shadow-pink-100 hover:shadow-pink-200 hover:-translate-y-0.5 active:scale-95"
            >
              <span>اكتشف الهدايا الفاخرة</span>
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={() => onPageChange('contact')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-bold py-4 px-10 rounded-2xl transition-all border border-gray-200 text-lg shadow-sm"
            >
              <span>تواصل معنا مباشرة</span>
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">لماذا يختار عملاؤنا Giftoly؟</h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm md:text-base">نضمن لكم الجودة العالية والاهتمام التام بكل تفصيلة صغيرة في هديتكم.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-pink-50 text-[#FF1493] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FF1493] group-hover:text-white transition-colors duration-300">
              <ShieldCheck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">منتجات فاخرة وأصلية</h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              ننتقي أرقى المنتجات العالمية والمحلية بدقة بالغة لضمان الجودة العالية التي تليق بكم.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-pink-50 text-[#FF1493] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FF1493] group-hover:text-white transition-colors duration-300">
              <Truck size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">توصيل سريع وآمن</h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              نوصل طلبك بكل أمان وعناية فائقة لباب منزلك أو مباشرة إلى الشخص المُهدى إليه.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 text-center group">
            <div className="w-16 h-16 bg-pink-50 text-[#FF1493] rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-[#FF1493] group-hover:text-white transition-colors duration-300">
              <Gift size={32} />
            </div>
            <h3 className="text-2xl font-bold mb-3 text-gray-900">تغليف ملكي فاخر</h3>
            <p className="text-gray-500 leading-relaxed text-sm md:text-base">
              نهتم بجمال المظهر؛ حيث تُغلف كل هدية بلمسات فنية ساحرة وكرت إهداء مخصص ومميز.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 mb-12">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-[#FF1493] to-[#C71585] rounded-3xl p-12 text-white text-center relative overflow-hidden shadow-xl shadow-pink-100">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-black mb-4">هل تبحث عن هدية مخصصة ومحددة؟</h2>
            <p className="text-pink-100 mb-8 text-sm md:text-base leading-relaxed">
              تصفح مجموعتنا الاستثنائية الآن، أو تواصل مع خدمة العملاء لمساعدتك في تنسيق بوكس خاص على ذوقك.
            </p>
            <button
              onClick={() => onPageChange('gifts')}
              className="bg-white text-[#FF1493] font-black py-4 px-10 rounded-2xl transition-all duration-200 text-md hover:bg-pink-50 shadow-md active:scale-95"
            >
              ابدأ تسوق الهدايا الآن
            </button>
          </div>
          <div className="absolute -bottom-10 -right-10 text-white/5 pointer-events-none select-none">
            <Gift size={280} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

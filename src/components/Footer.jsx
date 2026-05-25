import React from 'react';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT } from '../data/gifts.js';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-16 mt-24 border-t-4 border-[#FF1493] pb-24 md:pb-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* About Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-3xl">🎁</span>
              <h3 className="text-2xl font-black text-white tracking-wide">Giftoly</h3>
            </div>
            <p className="text-gray-400 leading-relaxed text-sm md:text-base">
              متجرك المفضل لأجود وأفخم الهدايا. نختار لك أفضل المنتجات بعناية فائقة لتصنع لحظات لا تُنسى مع من تحب.
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg relative pb-2 after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#FF1493]">
              تواصل معنا
            </h4>
            <div className="space-y-3 text-sm md:text-base">
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 hover:text-[#FF1493] transition-colors w-fit">
                <Phone size={18} className="text-[#FF1493]" />
                <span dir="ltr">{CONTACT.phone}</span>
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 hover:text-[#FF1493] transition-colors w-fit">
                <Mail size={18} className="text-[#FF1493]" />
                <span>{CONTACT.email}</span>
              </a>
              <div className="flex items-start gap-3 text-gray-400">
                <MapPin size={18} className="text-[#FF1493] flex-shrink-0 mt-0.5" />
                <span>{CONTACT.address}</span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-lg relative pb-2 after:content-[''] after:absolute after:right-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-[#FF1493]">
              تابعنا على منصاتنا
            </h4>
            <p className="text-sm text-gray-400 mb-3">
              ابق على تواصل دائم لجديد عروضنا الفاخرة.
            </p>
            <div className="flex flex-wrap gap-3">
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${CONTACT.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-emerald-600/10 hover:bg-emerald-600 text-emerald-400 hover:text-white rounded-xl transition-all duration-200"
                title="واتساب"
              >
                <MessageCircle size={20} />
              </a>

              {/* Instagram */}
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-pink-600/10 hover:bg-pink-600 text-pink-400 hover:text-white rounded-xl transition-all duration-200"
                title="إنستغرام"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
              </a>

              {/* TikTok */}
              <a
                href={CONTACT.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gray-700/10 hover:bg-gray-700 text-gray-400 hover:text-white rounded-xl transition-all duration-200"
                title="تيك توك"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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

              {/* Facebook */}
              <a
                href={CONTACT.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-xl transition-all duration-200"
                title="فيسبوك"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center text-xs md:text-sm text-gray-500">
          <p>&copy; 2026 Giftoly. جميع الحقوق محفوظة لتطوير الواجهات الفاخرة.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// التحقق من وجود متغيرات البيئة
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ خطأ: متغيرات بيئة Supabase مفقودة!');
  console.error('تأكد من وجود ملف .env في جذر المشروع بالمتغيرات التالية:');
  console.error('- VITE_SUPABASE_URL');
  console.error('- VITE_SUPABASE_ANON_KEY');
  
  // لا نرمي error هنا لأننا نريد التطبيق أن يشتغل حتى بدون Supabase
  console.warn('⚠️ سيتم تشغيل التطبيق في وضع محدود بدون قاعدة البيانات');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// دالة helper للتحقق من توفر Supabase
export const isSupabaseAvailable = () => {
  return supabase !== null;
};
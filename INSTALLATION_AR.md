# 📋 خطوات التثبيت والتشغيل الكاملة

## الخطوة 1️⃣: انقل المشروع لمجلد جديد

```bash
# اختر مسار مناسب (سطح المكتب أو أي مجلد)
cd ~/Desktop  # أو أي مجلد تريده

# انسخ جميع الملفات من outputs إلى مجلد المشروع
# يمكنك تحميل الملفات أو نسخها
```

## الخطوة 2️⃣: فتح Terminal/Command Prompt

### على Windows:
```bash
# افتح Command Prompt في مجلد المشروع
# اضغط Shift + Right Click → Open PowerShell window here
```

### على Mac/Linux:
```bash
# افتح Terminal
cd /path/to/giftoly-store
```

## الخطوة 3️⃣: تثبيت Node.js (إذا لم تثبته)

**تحقق أولاً إذا كنت ثبّته:**
```bash
node --version
npm --version
```

إذا ما فيش، حمّل Node.js من:
👉 https://nodejs.org/ (اختر LTS)

## الخطوة 4️⃣: تثبيت المكتبات

في مجلد المشروع، اكتب:

```bash
npm install
```

⏳ هذا قد يستغرق 2-5 دقائق... اصبر! 😊

ستشوف هالرسالة في الآخر:
```
added XXX packages in XXs
```

## الخطوة 5️⃣: تشغيل المشروع

```bash
npm run dev
```

✨ ستشوف كلام شبه هذا:

```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## الخطوة 6️⃣: افتح المتصفح

انسخ الرابط:
```
http://localhost:5173/
```

والصقه في المتصفح أو اضغط Ctrl+Click على الرابط 🌐

---

## ✅ تم! المشروع شغّال! 🎉

الآن يمكنك:
- 🛍️ تصفح الهدايا
- 🔍 البحث والتصفية
- 🛒 إضافة للسلة
- 💬 التواصل عبر WhatsApp

---

## ⚙️ أوامر مهمة أثناء التطوير

### لإيقاف المشروع:
```bash
# اضغط Ctrl+C في Terminal
```

### لإعادة تشغيل:
```bash
npm run dev
```

### لبناء النسخة الإنتاجية (للنشر):
```bash
npm run build
```

### لعرض النسخة المبنية:
```bash
npm run preview
```

---

## 🆘 حل المشاكل الشائعة

### ❌ خطأ: "npm: command not found"
✅ **الحل:** ثبّت Node.js من https://nodejs.org/

### ❌ خطأ: "ENOENT: no such file or directory"
✅ **الحل:** تأكد أنك في المجلد الصحيح:
```bash
pwd  # اعرض المسار الحالي
ls   # اعرض الملفات (شوف لو package.json موجود)
```

### ❌ المتصفح يعرض "Connection refused"
✅ **الحل:** تأكد من الأمر:
```bash
npm run dev  # يجب أن يكون مشتغل
```

### ❌ الأيقونات ما تظهر
✅ **الحل:** تحديث المكتبات:
```bash
npm install lucide-react@latest
```

### ❌ Tailwind CSS ما يشتغل
✅ **الحل:** المكتبات ما تثبتت كويس:
```bash
npm install --legacy-peer-deps
npm run dev
```

---

## 📱 تجربة على هاتفك

لو تبي تفتح المشروع على هاتفك من نفس الشبكة:

```bash
# شوف رقم IP الكمبيوتر
# Windows:
ipconfig

# Mac/Linux:
ifconfig

# ثم افتح في الهاتف:
http://YOUR_IP:5173/
# مثلاً: http://192.168.1.100:5173/
```

---

## 🎓 نصائح مهمة

1. **اترك Terminal مفتوح** - المشروع يحتاج للخادم يشتغل
2. **الملفات في `src/`** - أي تعديل فيها يُحفّظ تلقائياً
3. **اضغط F5** - لو صار حاجة غريبة، جدّد الصفحة
4. **اضغط Ctrl+Shift+I** - اعرض أدوات المطور لو في مشاكل

---

## 🎯 الخطوة التالية (اختياري)

لو تبي تثبت المشروع على **Netlify أو Vercel** (للنشر الفعلي):

```bash
npm run build
# ثم حمّل مجلد `dist`
```

---

**كل شيء تمام! المشروع شغّال بكفاءة عالية!** ✨

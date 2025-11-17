# 🌐 دليل نشر المشروع على Vercel

## الرابط المفيد: https://vercel.com/new

## الخطوات:

### الخطوة 1: تسجيل الدخول
1. اذهب إلى: https://vercel.com
2. سجل دخولك باستخدام GitHub
3. اختر "New Project"

### الخطوة 2: ربط المستودع
1. اختر "Import Git Repository"
2. ابحث عن: `volo-platform`
3. اختر المستودع: `badidjm9-hue/volo-platform`
4. اضغط "Import"

### الخطوة 3: إعداد المشروع
1. **Project Name**: `volo-platform` (أو أي اسم تفضله)
2. **Framework Preset**: `Next.js`
3. **Root Directory**: `./` (افتراضي)
4. **Build Command**: `npm run build`
5. **Output Directory**: `.next`

### الخطوة 4: إضافة متغيرات البيئة (Environment Variables)
أضف هذه المتغيرات في قسم Environment Variables:

```
LITEAPI_PRIVATE_KEY=sand_615a5da4-8696-4c72-b626-3997aa52dd21
LITEAPI_PUBLIC_KEY=b01ce90a-ca0d-4f5c-9ab7-67f148f45055
LITEAPI_BASE_URL=https://api.liteapi.travel
NEXTAUTH_URL=https://your-domain.vercel.app (سيتم تعيينه تلقائياً)
NEXTAUTH_SECRET=volo-super-secret-key-2025-production
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/volo?schema=public
SATIM_MERCHANT_ID=demo-merchant-id
SATIM_API_KEY=demo-api-key
SATIM_SECRET_KEY=demo-secret-key-for-development
```

### الخطوة 5: النشر
1. اضغط "Deploy"
2. انتظر حتى يكتمل البناء (حوالي 2-3 دقائق)
3. ستحصل على رابط الموقع!

### الخطوة 6: إعداد قاعدة البيانات
**خيار A: استخدم Vercel Postgres (الأسرع)**
- اذهب إلى Vercel Dashboard
- اختر مشروعك
- اضغط "Add New Database"
- اختر "PostgreSQL"
- انسخ DATABASE_URL الجديد

**خيار B: استخدم قاعدة بيانات خارجية**
- استخدم أي خدمة PostgreSQL (Supabase, Railway, etc.)
- استبدل DATABASE_URL

## 🔧 بعد النشر:
1. **اختبار الموقع**: اذهب للرابط وحمل الصفحة الرئيسية
2. **اختبار API**: ادخل على `/api/health`
3. **اختبار حجز الفنادق**: جرب البحث عن الفنادق

## 📞 مشاكل شائعة:
- **Build Error**: تأكد من أن Node.js Version 18+
- **Database Error**: تأكد من إعداد DATABASE_URL
- **API Error**: تأكد من متغيرات البيئة liteAPI

## 🎯 رابط المشروع النهائي:
https://volo-platform.vercel.app (أو أي رابط يُعطى لك)

## 📱 اختبار الموقع:
1. ادخل على الرابط
2. سجل حساب جديد
3. ابحث عن فنادق
4. جرب حجز غرفة
5. تحقق من لوحة التحكم

---
**✅ المشروع جاهز للنشر الآن!**
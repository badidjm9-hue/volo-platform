# 🌟 منصة فولو - منصة الحجز الذكية

منصة حجز فنادق متقدمة مع تكامل كامل مع liteAPI للبحث عن الفنادق بأفضل الأسعار.

![منصة فولو](https://img.shields.io/badge/منصة-فولو-009639?style=for-the-badge)
![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-38B2AC?style=flat-square&logo=tailwind-css)

## ✨ الميزات الرئيسية

### 🎯 الوظائف الأساسية
- **البحث المتقدم عن الفنادق** - بحث ذكي مع فلاتر متقدمة
- **تكامل liteAPI** - ربط مباشر مع قاعدة بيانات الفنادق العالمية
- **نظام الحجز الذكي** - حجز آمن وسريع
- **لوحة تحكم فائقة** - إدارة شاملة للمحتوى
- **تصميم متجاوب** - يعمل على جميع الأجهزة

### 🔧 المميزات التقنية
- **Next.js 14** - إطار عمل حديث وسريع
- **TypeScript** - كود آمن ومنظم
- **Prisma ORM** - إدارة قاعدة البيانات المتقدمة
- **NextAuth.js** - نظام مصادقة آمن
- **Tailwind CSS** - تصميم عصري ومرن
- **Framer Motion** - حركات وانتقالات سلسة

## 🚀 البدء السريع

### 1. التثبيت
```bash
# استنساخ المستودع
git clone https://github.com/YOUR_USERNAME/volo-platform.git
cd volo-platform

# تثبيت التبعيات
npm install

# إعداد متغيرات البيئة
cp .env.example .env.local
```

### 2. إعداد متغيرات البيئة
```env
# قاعدة البيانات
DATABASE_URL="postgresql://postgres:admin123@localhost:5432/volo?schema=public"

# المصادقة
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# تكامل liteAPI
LITEAPI_PRIVATE_KEY="sand_615a5da4-8696-4c72-b626-3997aa52dd21"
LITEAPI_PUBLIC_KEY="b01ce90a-ca0d-4f5c-9ab7-67f148f45055"
LITEAPI_BASE_URL="https://api.liteapi.travel"

# بوابة الدفع SATIM (الجزائر)
SATIM_MERCHANT_ID="demo-merchant-id"
SATIM_API_KEY="demo-api-key"
SATIM_SECRET_KEY="demo-secret-key"

# خدمة البريد الإلكتروني
SENDGRID_API_KEY="demo-api-key"
SENDGRID_FROM_EMAIL="noreply@volo.dz"
```

### 3. تشغيل المشروع محلياً
```bash
# تشغيل الخادم المحلي
npm run dev

# فتح المتصفح
open http://localhost:3000
```

## 🌐 النشر على Vercel

### الطريقة السريعة

#### الخطوة 1: إنشاء حساب GitHub
- اذهب إلى [github.com](https://github.com)
- أنشئ مستودع جديد باسم `volo-platform`

#### الخطوة 2: رفع الكود
```bash
git init
git add .
git commit -m "منصة فولو مع تكامل liteAPI"
git branch -M main
git remote add origin https://github.com/USERNAME/volo-platform.git
git push -u origin main
```

#### الخطوة 3: النشر على Vercel
- اذهب إلى [vercel.com](https://vercel.com)
- سجل دخولك بحساب GitHub
- اختر "New Project" واختر المستودع
- اضغط "Deploy"

#### الخطوة 4: إعداد متغيرات البيئة
في لوحة تحكم Vercel → إعدادات المشروع → متغيرات البيئة:

```env
LITEAPI_PRIVATE_KEY=sand_615a5da4-8696-4c72-b626-3997aa52dd21
LITEAPI_PUBLIC_KEY=b01ce90a-ca0d-4f5c-9ab7-67f148f45055
LITEAPI_BASE_URL=https://api.liteapi.travel
NEXTAUTH_SECRET=your-secure-secret
NEXTAUTH_URL=https://your-project.vercel.app
```

## 🧪 اختبار التطبيق

### اختبار API
```
# فحص الصحة
GET /api/health

# البحث عن الفنادق
POST /api/hotels/search
{
  "destination": "الجزائر",
  "checkin": "2025-12-01",
  "checkout": "2025-12-05",
  "guests": 2
}

# تفاصيل الفندق
GET /api/hotels/{hotelId}
```

### الصفحات الرئيسية
- `/` - الصفحة الرئيسية
- `/search` - البحث عن الفنادق  
- `/booking` - إدارة الحجوزات
- `/dashboard` - لوحة التحكم
- `/api-test` - اختبار API

## 🔧 التطوير

### سكريبتات npm
```bash
npm run dev          # تشغيل خادم التطوير
npm run build        # بناء للإنتاج
npm run start        # تشغيل خادم الإنتاج
npm run lint         # فحص الكود
npm run type-check   # فحص TypeScript
npm run migrate      # تشغيل قاعدة البيانات
npm run seed         # إضافة بيانات تجريبية
```

## 🔐 الأمان

### إعدادات الحماية
- ✅ Rate limiting على نقاط API
- ✅ تكوين CORS
- ✅ سياسة أمان المحتوى (CSP)
- ✅ حماية XSS
- ✅ ترويسات آمنة
- ✅ حماية متغيرات البيئة

### المصادقة
- ✅ NextAuth.js مع رموز JWT
- ✅ تشفير كلمات المرور بـ bcrypt
- ✅ إدارة الجلسات
- ✅ إعدادات كوكيز آمنة

## 📱 توثيق API

### تكامل LiteAPI

#### البحث عن الفنادق
```typescript
interface SearchHotelsRequest {
  destination: string;
  checkin: string;
  checkout: string;
  guests: number;
  rooms?: number;
  minPrice?: number;
  maxPrice?: number;
}

interface Hotel {
  id: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  currency: string;
  images: string[];
  amenities: string[];
  location: {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
  };
}
```

#### تفاصيل الفندق
```typescript
GET /api/hotels/[id]
```

#### اختبار API
اذهب إلى `/api-test` لاختبار جميع APIs بصرياً.

## 🌍 اللغات

- **العربية** - اللغة الأساسية
- **الإنجليزية** - دعم كامل
- **الفرنسية** - للمقيمين في الجزائر

## 📊 المراقبة والتحليلات

### تحليلات Vercel
- إحصائيات الزوار
- أداء الموقع
- الأخطاء والاستثناءات

### مراقبة API
- مراقبة حالة liteAPI
- تتبع الاستجابات
- إحصائيات الاستخدام

## 🆘 الدعم والمساعدة

### التوثيق
- [دليل النشر](DEPLOYMENT_GUIDE.md)
- [التشغيل السريع](QUICK_DEPLOYMENT.md)
- [مجموعة APIs](API_SUCCESS_SUMMARY.md)

### حل المشاكل
1. تحقق من سجلات في لوحة تحكم Vercel
2. تأكد من صحة متغيرات البيئة
3. راجع ملف `.env.example` للمتطلبات

## 📄 الترخيص

هذا المشروع مرخص تحت [رخصة MIT](LICENSE).

## 🙏 الشكر والتقدير

- **LiteAPI** - لخدمة البحث عن الفنادق
- **فريق Next.js** - لإطار العمل الرائع
- **Vercel** - للاستضافة المجانية
- **Prisma** - لإدارة قاعدة البيانات

---

**تم التطوير بـ ❤️ في الجزائر**

## 📞 التواصل

- **البريد الإلكتروني:** support@volo.dz
- **الهاتف:** +213123456789
- **الموقع الإلكتروني:** [volo.dz](https://volo.dz)

---

<div align="center">

**🌟 إذا أعجبك المشروع، لا تنس إعطاؤه نجمة على GitHub! ⭐**

</div>

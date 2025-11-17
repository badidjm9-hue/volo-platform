# دليل النشر المجاني - منصة Volo

## نظرة عامة
هذا دليل شامل لنشر منصة Volo على خدمات الاستضافة المجانية مع دعم كامل لـ liteAPI.

## الخدمات المجانية المقترحة

### 1. Vercel (الأفضل لـ Next.js)
**مميزات:**
- مجاني بالكامل للشاريع الشخصية
- دعم كامل لـ Next.js
- نشر تلقائي من GitHub
- CDN عالمي سريع
- دعم API routes

**المتطلبات:**
- حساب GitHub مجاني
- حساب Vercel مجاني

### 2. Netlify
**مميزات:**
- مجاني للباحثين والمشاريع الشخصية
- دعم SSR لـ Next.js
- نشر تلقائي
- CDN مدمج

### 3. Railway
**مميزات:**
- مجاني للباحثين
- دعم قاعدة البيانات
- نشر سهل
- عرض مباشر

### 4. Render
**مميزات:**
- مجاني للاستخدام الشخصي
- دعم PostgreSQL مجاني
- تحديث تلقائي

## خطة النشر على Vercel

### الخطوة 1: إنشاء مستودع GitHub
```bash
# في GitHub، أنشئ مستودع جديد باسم "volo-platform"
# ثم اربطه بالمشروع المحلي
git init
git add .
git commit -m "Initial commit: Volo Platform with liteAPI integration"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/volo-platform.git
git push -u origin main
```

### الخطوة 2: إعداد متغيرات البيئة في Vercel
```
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/volo?schema=public
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
LITEAPI_PRIVATE_KEY=sand_615a5da4-8696-4c72-b626-3997aa52dd21
LITEAPI_PUBLIC_KEY=b01ce90a-ca0d-4f5c-9ab7-67f148f45055
LITEAPI_BASE_URL=https://api.liteapi.travel
SATIM_MERCHANT_ID=demo-merchant-id
SATIM_API_KEY=demo-api-key
SATIM_SECRET_KEY=demo-secret-key-for-development
SENDGRID_API_KEY=demo-api-key
PLATFORM_COMMISSION_RATE=0.15
PLATFORM_NAME=Volo
```

### الخطوة 3: النشر على Vercel
1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل دخولك بحساب GitHub
3. اضغط على "New Project"
4. اختر مستودع "volo-platform"
5. Configure Project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
6. اضغط "Deploy"

## إعدادات مخصصة للبيئة الإنتاجية

### 1. تحديث ملف .env.production
```bash
# إنشاء ملف .env.production
cp .env .env.production

# تحديث متغيرات البيئة للإنتاج
DATABASE_URL=postgresql://user:password@host:port/database?schema=public
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NODE_ENV=production
```

### 2. تحديث next.config.js للإنتاج
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'api.liteapi.travel'],
    unoptimized: true
  },
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
}

module.exports = nextConfig
```

### 3. تحديث package.json
```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit"
  }
}
```

## قواعد البيانات المجانية

### 1. PostgreSQL على Railway
- إنشاء حساب مجاني على [railway.app](https://railway.app)
- نشر PostgreSQL جديد
- نسخ Connection String

### 2. Supabase
- إنشاء حساب مجاني على [supabase.com](https://supabase.com)
- إنشاء مشروع جديد
- استخدام Connection String

### 3. PlanetScale
- إنشاء حساب مجاني على [planetscale.com](https://planetscale.com)
- إنشاء قاعدة بيانات
- استخدام Connection String

## النشر البديل: Netlify

### الخطوات:
1. تسجيل الدخول إلى [netlify.com](https://netlify.com)
2. ربط حساب GitHub
3. اختيار المستودع
4. إعدادات البناء:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Functions directory: `.next/server/pages/api`
5. نشر

## النشر البديل: Railway

### الخطوات:
1. تسجيل الدخول إلى [railway.app](https://railway.app)
2. إنشاء مشروع جديد من GitHub
3. Railway يكشف Next.js تلقائياً
4. إضافة متغيرات البيئة
5. النشر

## اختبار النشر

### 1. اختبار الصفحة الرئيسية
```
https://your-domain.vercel.app/
```

### 2. اختبار API
```
https://your-domain.vercel.app/api/health
```

### 3. اختبار صفحة البحث
```
https://your-domain.vercel.app/search
```

### 4. اختبار API الاختبار
```
https://your-domain.vercel.app/api-test
```

## استكشاف الأخطاء وحلها

### مشاكل شائعة:

#### 1. خطأ في Build
```bash
# تحقق من الأخطاء
npm run build

# تحقق من TypeScript
npm run type-check
```

#### 2. مشاكل متغيرات البيئة
- تأكد من إضافة جميع المتغيرات في Vercel Dashboard
- تأكد من صحة أسماء المتغيرات

#### 3. مشاكل LiteAPI
- تأكد من صحة المفاتيح في متغيرات البيئة
- تحقق من صحة Base URL

#### 4. مشاكل قاعدة البيانات
- تأكد من Connection String الصحيح
- تحقق من إعدادات الأمان

## النسخ الاحتياطي

### إنشاء نسخة احتياطية للمشروع:
```bash
# ضغط المشروع
tar -czf volo-platform-backup-$(date +%Y%m%d).tar.gz \
  --exclude=node_modules \
  --exclude=.next \
  --exclude=.env.local \
  .

# أو استخدام Git
git add .
git commit -m "Backup: $(date)"
git push origin main
```

## المراقبة والصيانة

### 1. مراقبة الأداء
- استخدام Vercel Analytics
- مراقبة استخدام الموارد
- تتبع الأخطاء

### 2. التحديثات الدورية
```bash
# تحديث التبعيات
npm update

# تنظيف المشروع
npm audit
npm audit fix

# بناء جديد
npm run build
```

## الدعم

في حالة مواجهة أي مشاكل:
1. تحقق من logs في Vercel
2. راجع documentation للخدمة المختارة
3. تحقق من status page للخدمات

---

**ملاحظة:** جميع الخدمات المذكورة تقدم خطط مجانية ممتازة للمشاريع الشخصية والتطوير.

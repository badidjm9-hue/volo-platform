# دليل نشر مشروع Volo Platform على Vercel

## متطلبات النشر

**رابط المشروع على GitHub:** https://github.com/badidjm9-hue/volo-platform

## الخطوات المطلوبة

### الخطوة 1: الوصول إلى Vercel
1. اذهب إلى: https://vercel.com/new
2. ستجد خيارين:
   - **"Import Git Repository"** (استيراد مستودع Git)
   - **"Browse"** (تصفح)

### الخطوة 2: الاتصال بحساب GitHub
1. اختر **"Import Git Repository"**
2. اختر **GitHub** كمزود
3. سيسألك Vercel للتوقيع بحساب GitHub
4. استخدم الحساب: badidjm9-hue (هذا هو اسم المستخدم الحقيقي)
5. أدخل كلمة مرور حسابك أو رمز التوثيق

### الخطوة 3: اختيار المشروع
1. ستجد قائمة بجميع مستودعاتك على GitHub
2. ابحث عن: **volo-platform**
3. اختر المشروع

### الخطوة 4: إعدادات النشر
**Framework Preset:** اختر "Next.js"

**Build Command:** سيحدد تلقائياً (npm run build)
**Output Directory:** سيحدد تلقائياً (.next أو dist)
**Install Command:** سيحدد تلقائياً (npm install)

### الخطوة 5: إضافة متغيرات البيئة (Environment Variables)
⚠️ **مهم جداً**: أضف هذه المتغيرات بدقة في قسم "Environment Variables":

#### متغيرات البيانات المطلوبة:

**LITEAPI_PRIVATE_KEY:**
```
sand_615a5da4-8696-4c72-b626-3997aa52dd21
```

**LITEAPI_PUBLIC_KEY:**
```
b01ce90a-ca0d-4f5c-9ab7-67f148f45055
```

**LITEAPI_BASE_URL:**
```
https://api.liteapi.travel
```

**NEXTAUTH_SECRET:**
```
volo-super-secret-key-2025-production
```

**DATABASE_URL:**
```
postgresql://postgres:admin123@localhost:5432/volo?schema=public
```
⚠️ **ملاحظة**: ستحتاج لتحديث هذا لاحقاً بقاعدة بيانات إنتاج

**SATIM_MERCHANT_ID:**
```
demo-merchant-id
```

**SATIM_API_KEY:**
```
demo-api-key
```

**SATIM_SECRET_KEY:**
```
demo-secret-key-for-development
```

### الخطوة 6: النقر على Deploy
1. اضغط على زر **"Deploy"**
2. انتظر حتى انتهاء عملية البناء والنشر (عادة 2-5 دقائق)
3. ستحصل على رابط موقعك النهائي

## الرابط النهائي
بعد اكتمال النشر، ستحصل على رابط مثل:
- https://volo-platform-xxx.vercel.app
- أو مجاني: https://volo-platform.vercel.app

## ما سيحدث بعد النشر
1. سيقوم Vercel ببناء مشروع Next.js تلقائياً
2. سيتم نشر الموقع على رابط مجاني
3. ستحصل على لوحة تحكم لمراقبة الموقع
4. يمكن ربط النطاق الخاص بك لاحقاً

## مشاكل قد تواجهها وحلولها
- **خطأ Build**: تأكد من وجود جميع ملفات package.json وnext.config.js
- **خطأ متغيرات البيئة**: تأكد من نسخ المفاتيح بدقة
- **خطأ قاعدة البيانات**: هذا طبيعي لأنها قاعدة محلية في التطوير

## الخطوات التالية
1. **اختبار الموقع**: زيارة الرابط والتأكد من عمل الوظائف الأساسية
2. **إعداد قاعدة بيانات إنتاج**: استخدم قاعدة بيانات PostgreSQL على cloud
3. **تحديث SATIM**: استخدم مفاتيح إنتاج حقيقية للمدفوعات
4. **ربط النطاق**: ربط نطاقك الخاص بالموقع

---
**تاريخ الإنشاء:** 2025-11-17 09:42:52
#!/bin/bash

# سكريبت النشر السريع لمنصة Volo
# Quick Deployment Script for Volo Platform

echo "🚀 بدء عملية النشر - Starting Volo Platform Deployment"

# التحقق من وجود Git
if ! command -v git &> /dev/null; then
    echo "❌ Git غير مثبت - Git is not installed"
    echo "قم بتثبيت Git أولاً - Please install Git first"
    exit 1
fi

# التحقق من وجود npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm غير مثبت - npm is not installed"
    exit 1
fi

# تنظيف المجلدات المؤقتة
echo "🧹 تنظيف المجلدات المؤقتة - Cleaning temporary directories..."
rm -rf node_modules/.cache
rm -rf .next/cache
rm -rf dist

# تثبيت التبعيات
echo "📦 تثبيت التبعيات - Installing dependencies..."
npm install

# التحقق من الأخطاء
echo "🔍 التحقق من الأخطاء - Checking for errors..."
npm run lint

# بناء المشروع
echo "🏗️ بناء المشروع - Building project..."
npm run build

# إنشاء ملف .env.production
echo "⚙️ إعداد متغيرات البيئة - Setting up environment variables..."
cat > .env.production << EOL
# Production Environment Variables
NODE_ENV=production
NEXTAUTH_URL=https://your-vercel-domain.vercel.app
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Database (Update with your production DB)
DATABASE_URL=postgresql://postgres:admin123@localhost:5432/volo?schema=public

# LiteAPI (Your actual keys)
LITEAPI_PRIVATE_KEY=sand_615a5da4-8696-4c72-b626-3997aa52dd21
LITEAPI_PUBLIC_KEY=b01ce90a-ca0d-4f5c-9ab7-67f148f45055
LITEAPI_BASE_URL=https://api.liteapi.travel

# Payment Gateway
SATIM_MERCHANT_ID=demo-merchant-id
SATIM_API_KEY=demo-api-key
SATIM_SECRET_KEY=demo-secret-key-for-development
SATIM_ENDPOINT=https://test.satim.dz/payment/rest/register.do
SATIM_CURRENCY=012

# Email
SENDGRID_API_KEY=demo-api-key
SENDGRID_FROM_EMAIL=noreply@volo.dz
SENDGRID_FROM_NAME=Volo

# Platform Settings
PLATFORM_COMMISSION_RATE=0.15
PLATFORM_NAME=Volo
PLATFORM_EMAIL=support@volo.dz
PLATFORM_PHONE=+213123456789

# Maps
NEXT_PUBLIC_MAPBOX_TOKEN=pk.demo-token
EOL

echo "✅ تم بناء المشروع بنجاح - Project built successfully!"
echo ""
echo "📋 الخطوات التالية - Next Steps:"
echo "1. إنشاء حساب GitHub - Create GitHub account"
echo "2. إنشاء مستودع جديد باسم 'volo-platform' - Create new repository named 'volo-platform'"
echo "3. رفع الكود إلى GitHub - Push code to GitHub:"
echo ""
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit: Volo Platform with liteAPI'"
echo "   git branch -M main"
echo "   git remote add origin https://github.com/YOUR_USERNAME/volo-platform.git"
echo "   git push -u origin main"
echo ""
echo "4. الذهاب إلى Vercel.com وإنشاء حساب - Go to Vercel.com and create account"
echo "5. ربط GitHub ونشر المشروع - Connect GitHub and deploy project"
echo "6. إضافة متغيرات البيئة في Vercel - Add environment variables in Vercel"
echo ""
echo "🌐 روابط مفيدة - Useful Links:"
echo "- Vercel: https://vercel.com"
echo "- GitHub: https://github.com"
echo "- Deployment Guide: DEPLOYMENT_GUIDE.md"
echo ""
echo "🎉 تم إعداد المشروع للنشر بنجاح - Project ready for deployment!"

import { PrismaClient } from '@prisma/client'
import { hashPassword } from '@/lib/auth'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create admin user
  const adminPassword = await hashPassword('admin123')
  const admin = await prisma.user.upsert({
    where: { email: 'admin@volo.dz' },
    update: {},
    create: {
      email: 'admin@volo.dz',
      firstName: 'مدير',
      lastName: 'النظام',
      passwordHash: adminPassword,
      role: 'ADMIN',
      language: 'ar',
      isActive: true,
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create hotel owner user
  const ownerPassword = await hashPassword('owner123')
  const owner = await prisma.user.upsert({
    where: { email: 'owner@volo.dz' },
    update: {},
    create: {
      email: 'owner@volo.dz',
      firstName: 'أحمد',
      lastName: 'الفيلالي',
      passwordHash: ownerPassword,
      role: 'HOTEL_OWNER',
      language: 'ar',
      isActive: true,
    },
  })
  console.log('✅ Created hotel owner user:', owner.email)

  // Create sample user
  const userPassword = await hashPassword('user123')
  const user = await prisma.user.upsert({
    where: { email: 'user@volo.dz' },
    update: {},
    create: {
      email: 'user@volo.dz',
      firstName: 'سارة',
      lastName: 'بن علي',
      passwordHash: userPassword,
      role: 'GUEST',
      language: 'ar',
      loyaltyTier: 'SILVER',
      loyaltyPoints: 500,
      isActive: true,
    },
  })
  console.log('✅ Created sample user:', user.email)

  // Create sample hotels
  const hotels = [
    {
      ownerId: owner.id,
      name: 'Hotel El Aurassi',
      nameAr: 'فندق الأوراسي',
      nameFr: 'Hotel El Aurassi',
      slug: 'hotel-el-aurassi',
      description: 'فندق فاخر بأطلالة رائعة على خليج الجزائر العاصمة',
      propertyType: 'HOTEL',
      starRating: 5,
      status: 'APPROVED',
      address: '24 Avenue du 8 Novembre 1945',
      city: 'Algiers',
      country: 'Algeria',
      latitude: 36.7538,
      longitude: 3.0588,
      phone: '+213 21 92 15 15',
      email: 'info@elaurassi.dz',
      amenities: [
        'مسبح خارجي',
        'مطعم',
        'واي فاي مجاني',
        'مركز لياقة',
        'خدمة الغرف',
        'بار',
        'مرافق للاجتماعات',
        'موقف سيارات'
      ],
      images: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
        'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800'
      ],
      featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      isFeatured: true,
    },
    {
      ownerId: owner.id,
      name: 'Hotel Sheraton Oran',
      nameAr: 'فندق شيراتون وهران',
      nameFr: 'Hotel Sheraton Oran',
      slug: 'hotel-sheraton-oran',
      description: 'فندق فاخر في قلب مدينة وهران الساحلية',
      propertyType: 'HOTEL',
      starRating: 5,
      status: 'APPROVED',
      address: 'Route 307, Les Andalouses',
      city: 'Oran',
      country: 'Algeria',
      latitude: 35.6969,
      longitude: -0.6331,
      phone: '+213 41 98 80 80',
      email: 'info@sheratonoran.dz',
      amenities: [
        'مسبح خارجي',
        'مطعمان',
        'واي فاي مجاني',
        'مركز لياقة',
        'خدمة الغرف',
        'سبا',
        'مرافق للاجتماعات',
        'موقف سيارات',
        'شاطئ خاص'
      ],
      images: [
        'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
        'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
        'https://images.unsplash.com/photo-1496417263034-38ec4f0b665a?w=800'
      ],
      featuredImage: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      isFeatured: true,
    },
    {
      ownerId: owner.id,
      name: 'Hotel Constantine',
      nameAr: 'فندق قسنطينة',
      nameFr: 'Hotel Constantine',
      slug: 'hotel-constantine',
      description: 'فندق مريح في مدينة قسنطينة التاريخية',
      propertyType: 'HOTEL',
      starRating: 4,
      status: 'APPROVED',
      address: '1 Rue Ahmed Bey',
      city: 'Constantine',
      country: 'Algeria',
      latitude: 36.3650,
      longitude: 6.6147,
      phone: '+213 31 92 45 45',
      email: 'info@hotelconst.dz',
      amenities: [
        'مطعم',
        'واي فاي مجاني',
        'خدمة الغرف',
        'بار',
        'مرافق للاجتماعات',
        'موقف سيارات'
      ],
      images: [
        'https://images.unsplash.com/photo-1568495248636-6432b98f0cc4?w=800',
        'https://images.unsplash.com/photo-1559599238-22c5c13f7b57?w=800',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'
      ],
      featuredImage: 'https://images.unsplash.com/photo-1568495248636-6432b98f0cc4?w=800',
      isFeatured: false,
    }
  ]

  for (const hotelData of hotels) {
    const hotel = await prisma.hotel.upsert({
      where: { slug: hotelData.slug },
      update: {},
      create: hotelData,
    })
    console.log('✅ Created hotel:', hotel.nameAr)

    // Create rooms for each hotel
    const rooms = [
      {
        hotelId: hotel.id,
        name: 'Standard Room',
        nameAr: 'غرفة قياسية',
        description: 'غرفة مزدوجة مريحة مع إطلالة على المدينة',
        maxOccupancy: 2,
        bedConfiguration: { beds: 1, type: 'double' },
        roomSize: 25,
        bathroomCount: 1,
        basePrice: 8000,
        amenities: ['تكييف', 'تلفزيون', 'واي فاي', 'ثلاجة صغيرة', 'خزنة'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
        mealPlans: ['لا يوجد', 'إفطار'],
        quantity: 20,
        cancellationPolicy: 'إلغاء مجاني حتى 24 ساعة قبل الوصول'
      },
      {
        hotelId: hotel.id,
        name: 'Deluxe Room',
        nameAr: 'غرفة فاخرة',
        description: 'غرفة كبيرة مع إطلالة رائعة ومرافق إضافية',
        maxOccupancy: 3,
        bedConfiguration: { beds: 1, type: 'king' },
        roomSize: 35,
        bathroomCount: 1,
        basePrice: 12000,
        amenities: ['تكييف', 'تلفزيون', 'واي فاي', 'ثلاجة صغيرة', 'خزنة', 'شرفة'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
        mealPlans: ['لا يوجد', 'إفطار', 'نصف إقامة'],
        quantity: 10,
        cancellationPolicy: 'إلغاء مجاني حتى 48 ساعة قبل الوصول'
      },
      {
        hotelId: hotel.id,
        name: 'Suite',
        nameAr: 'جناح',
        description: 'جناح فاخر مع غرفة معيشة منفصلة',
        maxOccupancy: 4,
        bedConfiguration: { beds: 2, type: 'king' },
        roomSize: 60,
        bathroomCount: 2,
        basePrice: 20000,
        amenities: ['تكييف', 'تلفزيونان', 'واي فاي', 'ثلاجة', 'خزنة', 'شرفة', 'جاكوزي'],
        images: ['https://images.unsplash.com/photo-1631049421451-15b1f4e4c8f8?w=800'],
        mealPlans: ['لا يوجد', 'إفطار', 'نصف إقامة', 'كامل الإقامة'],
        quantity: 5,
        cancellationPolicy: 'إلغاء مجاني حتى 72 ساعة قبل الوصول'
      }
    ]

    for (const roomData of rooms) {
      const room = await prisma.room.create({
        data: roomData,
      })
      console.log('✅ Created room:', room.nameAr)
    }
  }

  // Create sample promotions
  const promotions = [
    {
      code: 'WELCOME10',
      description: 'خصم 10% للحجز الأول',
      discountType: 'PERCENTAGE',
      discountValue: 10,
      minAmount: 5000,
      startDate: new Date(),
      endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      usageLimit: 100,
      isActive: true,
    },
    {
      code: 'SUMMER20',
      description: 'خصم 20% على الإقامات الصيفية',
      discountType: 'PERCENTAGE',
      discountValue: 20,
      minAmount: 15000,
      maxDiscount: 5000,
      startDate: new Date(),
      endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days from now
      usageLimit: 50,
      isActive: true,
    }
  ]

  for (const promoData of promotions) {
    const promotion = await prisma.promotion.upsert({
      where: { code: promoData.code },
      update: {},
      create: promoData,
    })
    console.log('✅ Created promotion:', promotion.code)
  }

  // Create platform settings
  await prisma.platformSettings.upsert({
    where: { id: '1' },
    update: {},
    create: {
      id: '1',
      commissionRate: 0.15,
      vatRate: 0.19,
      currency: 'DZD',
      paymentMethods: ['CIB', 'EDHAHABIA', 'PAY_AT_PROPERTY'],
      featuredSlots: 10,
      maintenanceMode: false,
    },
  })
  console.log('✅ Created platform settings')

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
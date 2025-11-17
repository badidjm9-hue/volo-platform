'use client'

import { useState } from 'react'
import { Star, MapPin, Wifi, Car, Coffee, Dumbbell, Waves, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useRouter } from 'next/navigation'

export default function HotelDetailsPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const [selectedRoomType, setSelectedRoomType] = useState('standard')
  const [checkIn] = useState('2025-01-15')
  const [checkOut] = useState('2025-01-17')

  // Mock hotel data
  const hotel = {
    id: '1',
    name: 'Hotel El Aurassi',
    nameAr: 'فندق الأوراسي',
    description: 'فندق فاخر بأطلالة رائعة على خليج الجزائر العاصمة. يتميز الفندق بإطلالته الخلابة ومرافقه المتطورة التي تجعل من إقامتك تجربة لا تُنسى.',
    address: '24 Avenue du 8 Novembre 1945, Algiers, Algeria',
    city: 'Algiers',
    starRating: 5,
    averageRating: 4.8,
    totalReviews: 234,
    featuredImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200',
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800'
    ],
    amenities: [
      { icon: <Waves className="w-5 h-5" />, name: 'مسبح خارجي', available: true },
      { icon: <Coffee className="w-5 h-5" />, name: 'مطعم', available: true },
      { icon: <Wifi className="w-5 h-5" />, name: 'واي فاي مجاني', available: true },
      { icon: <Dumbbell className="w-5 h-5" />, name: 'مركز لياقة', available: true },
      { icon: <Car className="w-5 h-5" />, name: 'موقف سيارات', available: true },
      { icon: <Users className="w-5 h-5" />, name: 'مرافق للاجتماعات', available: true }
    ],
    rooms: [
      {
        id: '1',
        name: 'Standard Room',
        nameAr: 'غرفة قياسية',
        description: 'غرفة مزدوجة مريحة مع إطلالة على المدينة',
        price: 8000,
        maxOccupancy: 2,
        bedConfiguration: 'سرير مزدوج',
        size: '25 متر مربع',
        amenities: ['تكييف', 'تلفزيون', 'واي فاي', 'ثلاجة صغيرة', 'خزنة'],
        images: ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800'],
        available: true
      },
      {
        id: '2',
        name: 'Deluxe Room',
        nameAr: 'غرفة فاخرة',
        description: 'غرفة كبيرة مع إطلالة رائعة ومرافق إضافية',
        price: 12000,
        maxOccupancy: 3,
        bedConfiguration: 'سرير ملكي',
        size: '35 متر مربع',
        amenities: ['تكييف', 'تلفزيون', 'واي فاي', 'ثلاجة صغيرة', 'خزنة', 'شرفة'],
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800'],
        available: true
      },
      {
        id: '3',
        name: 'Suite',
        nameAr: 'جناح',
        description: 'جناح فاخر مع غرفة معيشة منفصلة',
        price: 20000,
        maxOccupancy: 4,
        bedConfiguration: 'سرير ملكي + أريكة',
        size: '60 متر مربع',
        amenities: ['تكييف', 'تلفزيونان', 'واي فاي', 'ثلاجة', 'خزنة', 'شرفة', 'جاكوزي'],
        images: ['https://images.unsplash.com/photo-1631049421451-15b1f4e4c8f8?w=800'],
        available: true
      }
    ],
    reviews: [
      {
        id: '1',
        userName: 'أحمد محمد',
        rating: 5,
        title: 'إقامة رائعة',
        comment: 'فندق ممتاز، الخدمة احترافية والإطلالة رائعة. أنصح به بشدة.',
        date: '2024-12-01',
        helpful: 12
      },
      {
        id: '2',
        userName: 'فاطمة علي',
        rating: 4,
        title: 'مكان جميل',
        comment: 'الفندق جميل والنظافة ممتازة، لكن الإفطار يمكن تحسينه.',
        date: '2024-11-28',
        helpful: 8
      }
    ]
  }

  const handleBookNow = () => {
    router.push('/booking', {
      state: {
        hotelId: hotel.id,
        roomId: hotel.rooms.find(r => r.id === selectedRoomType)?.id,
        checkIn,
        checkOut
      }
    })
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img 
          src={hotel.featuredImage} 
          alt={hotel.nameAr}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl font-bold mb-2">{hotel.nameAr}</h1>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < hotel.starRating ? 'text-yellow-400 fill-current' : 'text-gray-400'}`} 
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-yellow-400 font-semibold">{hotel.averageRating}</span>
                <span className="text-sm">({hotel.totalReviews} تقييم)</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>{hotel.address}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div>
              <h2 className="text-2xl font-bold mb-4">الصور</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotel.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${hotel.nameAr} ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                  />
                ))}
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>وصف الفندق</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
              </CardContent>
            </Card>

            {/* Amenities */}
            <Card>
              <CardHeader>
                <CardTitle>المرافق والخدمات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className={`text-primary-600 ${amenity.available ? '' : 'text-gray-400'}`}>
                        {amenity.icon}
                      </div>
                      <span className={amenity.available ? '' : 'text-gray-500 line-through'}>
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Rooms */}
            <Card>
              <CardHeader>
                <CardTitle>أنواع الغرف</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {hotel.rooms.map((room) => (
                    <div key={room.id} className="border rounded-lg p-4">
                      <div className="flex gap-4">
                        <img
                          src={room.images[0]}
                          alt={room.nameAr}
                          className="w-32 h-24 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-xl font-semibold">{room.nameAr}</h3>
                            <div className="text-left">
                              <div className="text-2xl font-bold text-primary-600">
                                {room.price.toLocaleString()} دج
                              </div>
                              <div className="text-sm text-gray-600">لكل ليلة</div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 mb-2">{room.description}</p>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                            <div>السعة: {room.maxOccupancy} ضيف</div>
                            <div>الحجم: {room.size}</div>
                            <div>السرير: {room.bedConfiguration}</div>
                            <div>الحالة: {room.available ? 'متوفر' : 'غير متوفر'}</div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.amenities.slice(0, 4).map((amenity, index) => (
                              <span key={index} className="bg-gray-100 px-2 py-1 rounded text-xs">
                                {amenity}
                              </span>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant={selectedRoomType === room.id ? 'default' : 'outline'}
                              size="sm"
                              onClick={() => setSelectedRoomType(room.id)}
                            >
                              {selectedRoomType === room.id ? 'محدد' : 'اختر هذه الغرفة'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>التقييمات والآراء</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {hotel.reviews.map((review) => (
                    <div key={review.id} className="border-b last:border-b-0 pb-6 last:pb-0">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="font-semibold">{review.userName}</div>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <h4 className="font-medium mb-2">{review.title}</h4>
                      <p className="text-gray-700 mb-2">{review.comment}</p>
                      <button className="text-sm text-primary-600 hover:underline">
                        مفيد ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>احجز الآن</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">تاريخ الوصول</label>
                  <input
                    type="date"
                    value={checkIn}
                    readOnly
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">تاريخ المغادرة</label>
                  <input
                    type="date"
                    value={checkOut}
                    readOnly
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">الضيوف</label>
                  <select className="w-full p-2 border rounded">
                    <option>ضيف واحد</option>
                    <option>ضيفان</option>
                    <option>3 ضيوف</option>
                    <option>4 ضيوف</option>
                  </select>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span>السعر لكل ليلة:</span>
                    <span className="font-semibold">
                      {hotel.rooms.find(r => r.id === selectedRoomType)?.price.toLocaleString()} دج
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span>عدد الليالي:</span>
                    <span className="font-semibold">2</span>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>الإجمالي:</span>
                    <span className="text-primary-600">
                      {(hotel.rooms.find(r => r.id === selectedRoomType)?.price || 0) * 2} دج
                    </span>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gradient-to-r from-primary-500 to-navy-600"
                  onClick={handleBookNow}
                  disabled={!hotel.rooms.find(r => r.id === selectedRoomType)?.available}
                >
                  احجز الآن
                </Button>

                <p className="text-sm text-gray-600 text-center">
                  دفع آمن ومشفر
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
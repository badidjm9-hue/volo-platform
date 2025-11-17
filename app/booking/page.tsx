'use client'

import { useState } from 'react'
import { useLocation, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useToast } from '@/components/ui/use-toast'
import { Calendar, Users, CreditCard, Shield, Phone, Mail } from 'lucide-react'

export default function BookingPage() {
  const location = useLocation()
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [guestDetails, setGuestDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: ''
  })
  const [paymentMethod, setPaymentMethod] = useState('CIB')

  // Get data from navigation state
  const bookingData = location.state || {
    hotelId: '1',
    roomId: '1',
    checkIn: '2025-01-15',
    checkOut: '2025-01-17'
  }

  // Mock hotel and room data
  const hotel = {
    nameAr: 'فندق الأوراسي',
    city: 'الجزائر',
    address: '24 Avenue du 8 Novembre 1945',
    phone: '+213 21 92 15 15'
  }

  const room = {
    nameAr: 'غرفة فاخرة',
    price: 12000,
    amenities: ['تكييف', 'تلفزيون', 'واي فاي', 'ثلاجة صغيرة', 'خزنة', 'شرفة']
  }

  const checkInDate = new Date(bookingData.checkIn)
  const checkOutDate = new Date(bookingData.checkOut)
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24))
  const subtotal = room.price * nights
  const serviceFee = subtotal * 0.1 // 10% service fee
  const tax = (subtotal + serviceFee) * 0.19 // 19% VAT
  const total = subtotal + serviceFee + tax

  const handleBookingSubmit = async () => {
    if (!guestDetails.firstName || !guestDetails.lastName || !guestDetails.email) {
      toast({
        title: 'بيانات ناقصة',
        description: 'يرجى ملء جميع الحقول المطلوبة',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hotelId: bookingData.hotelId,
          roomId: bookingData.roomId,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          guests: [{ firstName: guestDetails.firstName, lastName: guestDetails.lastName }],
          guestDetails,
          paymentMethod,
          specialRequests: guestDetails.specialRequests
        }),
      })

      const data = await response.json()

      if (data.success) {
        if (data.data.paymentUrl) {
          // Redirect to SATIM payment
          window.location.href = data.data.paymentUrl
        } else {
          toast({
            title: 'تم تأكيد الحجز',
            description: `رقم الحجز: ${data.data.referenceNumber}`
          })
          router.push('/dashboard')
        }
      } else {
        toast({
          title: 'خطأ في الحجز',
          description: data.error,
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        title: 'خطأ في الحجز',
        description: 'حدث خطأ غير متوقع',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">إتمام الحجز</h1>
          <p className="text-gray-600">يرجى مراجعة تفاصيل حجزك وإتمام عملية الدفع</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Guest Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  بيانات الضيف
                </CardTitle>
                <CardDescription>أدخل بياناتك الشخصية</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">الاسم الأول *</label>
                    <Input
                      value={guestDetails.firstName}
                      onChange={(e) => setGuestDetails({...guestDetails, firstName: e.target.value})}
                      placeholder="الاسم الأول"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">الاسم الأخير *</label>
                    <Input
                      value={guestDetails.lastName}
                      onChange={(e) => setGuestDetails({...guestDetails, lastName: e.target.value})}
                      placeholder="الاسم الأخير"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">البريد الإلكتروني *</label>
                  <Input
                    type="email"
                    value={guestDetails.email}
                    onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                    placeholder="example@email.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">رقم الهاتف</label>
                  <Input
                    type="tel"
                    value={guestDetails.phone}
                    onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                    placeholder="05XX XX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">طلبات خاصة</label>
                  <textarea
                    value={guestDetails.specialRequests}
                    onChange={(e) => setGuestDetails({...guestDetails, specialRequests: e.target.value})}
                    placeholder="أي طلبات خاصة أو ملاحظات..."
                    className="w-full p-3 border rounded-md h-20 resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  طريقة الدفع
                </CardTitle>
                <CardDescription>اختر طريقة الدفع المفضلة لديك</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'CIB' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('CIB')}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === 'CIB'}
                        onChange={() => setPaymentMethod('CIB')}
                        className="text-primary-600"
                      />
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <div className="font-medium">بطاقة مصرفية (CIB)</div>
                        <div className="text-sm text-gray-600">الدفع الآمن عبر بوابة SATIM</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'EDHAHABIA' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('EDHAHABIA')}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === 'EDHAHABIA'}
                        onChange={() => setPaymentMethod('EDHAHABIA')}
                        className="text-primary-600"
                      />
                      <Phone className="w-5 h-5" />
                      <div>
                        <div className="font-medium">الذهبية</div>
                        <div className="text-sm text-gray-600">الدفع عبر الهاتف المحمول</div>
                      </div>
                    </div>
                  </div>
                  
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'PAY_AT_PROPERTY' ? 'border-primary-500 bg-primary-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setPaymentMethod('PAY_AT_PROPERTY')}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        checked={paymentMethod === 'PAY_AT_PROPERTY'}
                        onChange={() => setPaymentMethod('PAY_AT_PROPERTY')}
                        className="text-primary-600"
                      />
                      <Mail className="w-5 h-5" />
                      <div>
                        <div className="font-medium">الدفع في الموقع</div>
                        <div className="text-sm text-gray-600">ادفع نقداً عند الوصول</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="font-medium text-blue-900">حجزك آمن ومشفر</div>
                    <div className="text-sm text-blue-700">
                      نحن نستخدم أحدث تقنيات الأمان لحماية بياناتك
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>ملخص الحجز</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Hotel Info */}
                <div>
                  <h3 className="font-semibold text-lg">{hotel.nameAr}</h3>
                  <p className="text-sm text-gray-600">{hotel.city}</p>
                  <p className="text-sm text-gray-600">{hotel.address}</p>
                </div>

                {/* Room Info */}
                <div>
                  <h4 className="font-medium">{room.nameAr}</h4>
                  <div className="text-sm text-gray-600">
                    {room.price.toLocaleString()} دج / ليلة
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">تاريخ الوصول</div>
                    <div className="text-gray-600">{checkInDate.toLocaleDateString('ar')}</div>
                  </div>
                  <div>
                    <div className="font-medium">تاريخ المغادرة</div>
                    <div className="text-gray-600">{checkOutDate.toLocaleDateString('ar')}</div>
                  </div>
                </div>

                <div className="text-sm text-center text-gray-600">
                  <Calendar className="w-4 h-4 inline ml-1" />
                  {nights} {nights === 1 ? 'ليلة' : 'ليالي'}
                </div>

                {/* Price Breakdown */}
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>السعر الأساسي</span>
                    <span>{subtotal.toLocaleString()} دج</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>رسوم الخدمة</span>
                    <span>{serviceFee.toLocaleString()} دج</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>الضريبة المضافة</span>
                    <span>{tax.toLocaleString()} دج</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg border-t pt-2">
                    <span>المجموع</span>
                    <span className="text-primary-600">{total.toLocaleString()} دج</span>
                  </div>
                </div>

                {/* Book Button */}
                <Button 
                  onClick={handleBookingSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-primary-500 to-navy-600"
                  size="lg"
                >
                  {isLoading ? 'جاري الحجز...' : 'تأكيد الحجز والدفع'}
                </Button>

                {/* Contact Info */}
                <div className="text-center text-sm text-gray-600 space-y-1">
                  <div>هل تحتاج مساعدة؟</div>
                  <div>{hotel.phone}</div>
                  <div>support@volo.dz</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
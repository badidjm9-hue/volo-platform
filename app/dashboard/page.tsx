'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { 
  Calendar, 
  MapPin, 
  Star, 
  CreditCard, 
  User, 
  Settings,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState('bookings')

  // Mock data for demonstration
  const bookings = [
    {
      id: '1',
      referenceNumber: 'VOL20241215001',
      hotelName: 'فندق السلام',
      hotelCity: 'الجزائر',
      checkIn: '2025-01-15',
      checkOut: '2025-01-17',
      nights: 2,
      totalAmount: 12000,
      status: 'CONFIRMED',
      paymentStatus: 'PAID',
      roomName: 'غرفة مزدوجة'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'COMPLETED':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'CANCELLED':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': 'في الانتظار',
      'CONFIRMED': 'مؤكد',
      'CANCELLED': 'ملغي',
      'COMPLETED': 'مكتمل'
    }
    return statusMap[status] || status
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">إدارة حجوزاتك وملفك الشخصي</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  الملف الشخصي
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  variant={activeTab === 'bookings' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('bookings')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  حجوزاتي
                </Button>
                <Button 
                  variant={activeTab === 'favorites' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('favorites')}
                >
                  <Star className="w-4 h-4 mr-2" />
                  المفضلة
                </Button>
                <Button 
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  الإعدادات
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>إحصائيات سريعة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">إجمالي الحجوزات</span>
                  <span className="font-bold">12</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">النقاط المكتسبة</span>
                  <span className="font-bold">250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">المستوى</span>
                  <span className="font-bold text-yellow-600">ذهبي</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">حجوزاتي</h2>
                  <Button className="bg-primary-500 hover:bg-primary-600">
                    حجز جديد
                  </Button>
                </div>

                {bookings.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        لا توجد حجوزات
                      </h3>
                      <p className="text-gray-600 mb-6">
                        قم بحجز أول فندق لك الآن
                      </p>
                      <Button className="bg-primary-500 hover:bg-primary-600">
                        ابحث عن فندق
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    {bookings.map((booking) => (
                      <Card key={booking.id}>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold">{booking.hotelName}</h3>
                              <div className="flex items-center gap-2 text-gray-600 mt-1">
                                <MapPin className="w-4 h-4" />
                                <span>{booking.hotelCity}</span>
                              </div>
                            </div>
                            <div className="text-left">
                              <div className="flex items-center gap-2 mb-1">
                                {getStatusIcon(booking.status)}
                                <span className="font-medium">
                                  {getStatusText(booking.status)}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600">
                                {booking.referenceNumber}
                              </div>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-3 gap-4 mb-4">
                            <div>
                              <div className="text-sm text-gray-600">تاريخ الوصول</div>
                              <div className="font-medium">{booking.checkIn}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">تاريخ المغادرة</div>
                              <div className="font-medium">{booking.checkOut}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-600">عدد الليالي</div>
                              <div className="font-medium">{booking.nights} ليلة</div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-4 border-t">
                            <div>
                              <div className="text-sm text-gray-600">نوع الغرفة</div>
                              <div className="font-medium">{booking.roomName}</div>
                            </div>
                            <div className="text-left">
                              <div className="text-sm text-gray-600">المبلغ الإجمالي</div>
                              <div className="text-xl font-bold text-primary-600">
                                {booking.totalAmount.toLocaleString()} دج
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4">
                            <Button variant="outline" size="sm">
                              عرض التفاصيل
                            </Button>
                            {booking.status === 'CONFIRMED' && (
                              <Button variant="outline" size="sm">
                                إلغاء الحجز
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <Card>
                <CardHeader>
                  <CardTitle>المفضلة</CardTitle>
                  <CardDescription>الفنادق المحفوظة في قائمة المفضلة</CardDescription>
                </CardHeader>
                <CardContent className="text-center py-12">
                  <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    لا توجد فنادق مفضلة
                  </h3>
                  <p className="text-gray-600">
                    احفظ فنادقك المفضلة للعودة إليها بسهولة
                  </p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle>الإعدادات الشخصية</CardTitle>
                  <CardDescription>إدارة بياناتك الشخصية</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">قريباً...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
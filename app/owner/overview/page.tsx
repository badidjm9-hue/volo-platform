'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { 
  Calendar, 
  MapPin, 
  Star, 
  TrendingUp, 
  DollarSign,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  Home
} from 'lucide-react'

export default function OwnerDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview')

  // Mock data for demonstration
  const stats = {
    totalBookings: 45,
    totalRevenue: 560000,
    averageRating: 4.8,
    occupancyRate: 75
  }

  const recentBookings = [
    {
      id: '1',
      guestName: 'أحمد محمد',
      hotelName: 'فندق الأوراسي',
      roomType: 'جناح',
      checkIn: '2025-01-15',
      checkOut: '2025-01-17',
      nights: 2,
      totalAmount: 40000,
      status: 'CONFIRMED',
      paymentStatus: 'PAID'
    },
    {
      id: '2',
      guestName: 'فاطمة علي',
      hotelName: 'فندق الأوراسي',
      roomType: 'غرفة فاخرة',
      checkIn: '2025-01-18',
      checkOut: '2025-01-20',
      nights: 2,
      totalAmount: 24000,
      status: 'PENDING',
      paymentStatus: 'PENDING'
    },
    {
      id: '3',
      guestName: 'محمد السنوسي',
      hotelName: 'فندق الأوراسي',
      roomType: 'غرفة قياسية',
      checkIn: '2025-01-20',
      checkOut: '2025-01-22',
      nights: 2,
      totalAmount: 16000,
      status: 'CONFIRMED',
      paymentStatus: 'PAID'
    }
  ]

  const myHotels = [
    {
      id: '1',
      name: 'فندق الأوراسي',
      nameAr: 'فندق الأوراسي',
      city: 'الجزائر',
      starRating: 5,
      averageRating: 4.8,
      totalBookings: 156,
      status: 'APPROVED',
      revenue: 2340000,
      occupancyRate: 78
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'CONFIRMED':
      case 'APPROVED':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'PENDING':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'REJECTED':
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      'PENDING': 'في الانتظار',
      'CONFIRMED': 'مؤكد',
      'APPROVED': 'معتمد',
      'REJECTED': 'مرفوض',
      'CANCELLED': 'ملغي'
    }
    return statusMap[status] || status
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة تحكم صاحب الفندق</h1>
          <p className="text-gray-600">إدارة فنادقك وحجوزاتك</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  القائمة الرئيسية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button 
                  variant={activeTab === 'overview' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('overview')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  نظرة عامة
                </Button>
                <Button 
                  variant={activeTab === 'hotels' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('hotels')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  فنادقي
                </Button>
                <Button 
                  variant={activeTab === 'bookings' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('bookings')}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  الحجوزات
                </Button>
                <Button 
                  variant={activeTab === 'analytics' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('analytics')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  التحليلات
                </Button>
                <Button 
                  variant={activeTab === 'payouts' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('payouts')}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  المدفوعات
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        إجمالي الحجوزات
                      </CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.totalBookings}</div>
                      <p className="text-xs text-muted-foreground">
                        +20% من الشهر الماضي
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        إجمالي الإيرادات
                      </CardTitle>
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(stats.totalRevenue / 1000).toFixed(0)}K دج
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +15% من الشهر الماضي
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        متوسط التقييم
                      </CardTitle>
                      <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.averageRating}/5</div>
                      <p className="text-xs text-muted-foreground">
                        +0.2 من الشهر الماضي
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        معدل الإشغال
                      </CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{stats.occupancyRate}%</div>
                      <p className="text-xs text-muted-foreground">
                        +5% من الشهر الماضي
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>الحجوزات الأخيرة</CardTitle>
                    <CardDescription>آخر الحجوزات الواردة</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentBookings.map((booking) => (
                        <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div>
                              <div className="font-semibold">{booking.guestName}</div>
                              <div className="text-sm text-gray-600">{booking.roomType}</div>
                              <div className="text-sm text-gray-600">
                                {booking.checkIn} - {booking.checkOut}
                              </div>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2 mb-1">
                              {getStatusIcon(booking.status)}
                              <span className="text-sm font-medium">
                                {getStatusText(booking.status)}
                              </span>
                            </div>
                            <div className="text-sm font-bold">
                              {booking.totalAmount.toLocaleString()} دج
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === 'hotels' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">فنادقي</h2>
                  <Button className="bg-primary-500 hover:bg-primary-600">
                    إضافة فندق جديد
                  </Button>
                </div>

                <div className="grid gap-6">
                  {myHotels.map((hotel) => (
                    <Card key={hotel.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-semibold">{hotel.nameAr}</h3>
                            <div className="flex items-center gap-2 text-gray-600 mt-1">
                              <MapPin className="w-4 h-4" />
                              <span>{hotel.city}</span>
                            </div>
                          </div>
                          <div className="text-left">
                            <div className="flex items-center gap-2 mb-1">
                              {getStatusIcon(hotel.status)}
                              <span className="font-medium">
                                {getStatusText(hotel.status)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              {hotel.starRating} نجوم
                            </div>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-primary-600">
                              {hotel.averageRating}
                            </div>
                            <div className="text-sm text-gray-600">متوسط التقييم</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-primary-600">
                              {hotel.totalBookings}
                            </div>
                            <div className="text-sm text-gray-600">إجمالي الحجوزات</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-primary-600">
                              {(hotel.revenue / 1000).toFixed(0)}K
                            </div>
                            <div className="text-sm text-gray-600">الإيرادات (دج)</div>
                          </div>
                          <div className="text-center p-3 bg-gray-50 rounded">
                            <div className="text-lg font-bold text-primary-600">
                              {hotel.occupancyRate}%
                            </div>
                            <div className="text-sm text-gray-600">معدل الإشغال</div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            عرض التفاصيل
                          </Button>
                          <Button variant="outline" size="sm">
                            تعديل الفندق
                          </Button>
                          <Button variant="outline" size="sm">
                            إدارة الغرف
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <Card>
                <CardHeader>
                  <CardTitle>إدارة الحجوزات</CardTitle>
                  <CardDescription>جميع حجوزات فنادقك</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">قريباً...</p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'analytics' && (
              <Card>
                <CardHeader>
                  <CardTitle>التحليلات والإحصائيات</CardTitle>
                  <CardDescription>تحليل أداء فنادقك</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">قريباً...</p>
                </CardContent>
              </Card>
            )}

            {activeTab === 'payouts' && (
              <Card>
                <CardHeader>
                  <CardTitle>المدفوعات</CardTitle>
                  <CardDescription>إدارة المدفوعات والأرباح</CardDescription>
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
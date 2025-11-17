'use client'

import { useState, useEffect } from 'react'
import { Search, MapPin, Calendar, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import voloApi from '@/lib/api-client'

interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  price: number;
  currency: string;
  imageUrl?: string;
  amenities?: string[];
  description?: string;
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState({
    destination: 'الجزائر',
    checkIn: '2025-11-20',
    checkOut: '2025-11-22',
    guests: '2',
  })

  const [hotels, setHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [apiConnected, setApiConnected] = useState(false)

  useEffect(() => {
    // Check API health on component mount
    checkApiHealth()
  }, [])

  const checkApiHealth = async () => {
    try {
      const connected = await voloApi.checkHealth()
      setApiConnected(connected)
    } catch (err) {
      console.error('API health check failed:', err)
      setApiConnected(false)
    }
  }

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setHasSearched(true)

    try {
      const results = await voloApi.searchHotels({
        destination: searchParams.destination,
        checkIn: searchParams.checkIn,
        checkOut: searchParams.checkOut,
        guests: parseInt(searchParams.guests),
        rooms: 1
      })
      
      setHotels(results)
    } catch (err) {
      console.error('Search failed:', err)
      setError('حدث خطأ في البحث عن الفنادق')
      // Fallback to demo data
      const demoData = await voloApi.getFeaturedHotels()
      setHotels(demoData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      <Header />

      <div className="bg-primary-500 py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-white mb-6">ابحث عن فندقك المثالي</h1>
          
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-gray-700 text-sm mb-2">الوجهة</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="أدخل اسم المدينة"
                    value={searchParams.destination}
                    onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm mb-2">تاريخ الوصول</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    value={searchParams.checkIn}
                    onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm mb-2">تاريخ المغادرة</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    value={searchParams.checkOut}
                    onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                    className="pr-10"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-gray-700 text-sm mb-2">الضيوف</label>
                <div className="relative">
                  <Users className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <select 
                    value={searchParams.guests}
                    onChange={(e) => setSearchParams({ ...searchParams, guests: e.target.value })}
                    className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none"
                  >
                    <option value="1">ضيف واحد</option>
                    <option value="2">ضيفان</option>
                    <option value="3">3 ضيوف</option>
                    <option value="4">4 ضيوف</option>
                    <option value="5">5 ضيوف</option>
                    <option value="6">6 ضيوف</option>
                  </select>
                </div>
              </div>
            </div>
            
            <Button 
              size="lg" 
              className="w-full mt-6 bg-gradient-to-r from-primary-500 to-navy-600"
              onClick={handleSearch}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white ml-2"></div>
                  جاري البحث...
                </div>
              ) : (
                <>
                  <Search className="w-5 h-5 ml-2" />
                  بحث
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {hasSearched ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-2">نتائج البحث</h2>
              <div className="flex items-center space-x-4 space-x-reverse text-sm text-gray-600">
                <span>📍 {searchParams.destination}</span>
                <span>📅 {searchParams.checkIn} إلى {searchParams.checkOut}</span>
                <span>👥 {searchParams.guests} ضيف</span>
                {apiConnected && (
                  <span className="text-green-600">✅ API متصل</span>
                )}
              </div>
            </div>

            {error && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                <p className="text-orange-800">{error}</p>
                <p className="text-sm text-orange-600 mt-1">
                  عرض البيانات التجريبية كبديل
                </p>
              </div>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {hotels.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>

            {hotels.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏨</div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  لم يتم العثور على فنادق
                </h3>
                <p className="text-gray-500">
                  جرب تغيير معايير البحث أو التواريخ
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              ابدأ البحث عن فندقك المثالي
            </h3>
            <p className="text-gray-500">
              اختر وجهتك وتواريخ الإقامة للبدء
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}

// Hotel Card Component
function HotelCard({ hotel }: { hotel: Hotel }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img 
          src={hotel.imageUrl || '/api/placeholder/400/250'} 
          alt={hotel.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80'
          }}
        />
        <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
          <Star className="w-3 h-3 ml-1" />
          {hotel.rating}
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{hotel.name}</h3>
        <p className="text-gray-600 mb-4 flex items-center">
          <MapPin className="w-4 h-4 ml-2" />
          {hotel.location}
        </p>
        
        {hotel.description && (
          <p className="text-gray-700 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>
        )}
        
        {hotel.amenities && hotel.amenities.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {amenity}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-teal-500">
            {hotel.price.toLocaleString()} {hotel.currency}
          </div>
          <div className="text-sm text-gray-500">لليلة واحدة</div>
        </div>
        
        <Button 
          className="w-full mt-4 bg-teal-500 hover:bg-teal-600"
          onClick={() => {
            // Navigate to hotel details page
            window.location.href = `/hotel/${hotel.id}`
          }}
        >
          عرض التفاصيل والحجز
        </Button>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import { Search, MapPin, Calendar, Users, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export default function SearchPage() {
  const [searchParams, setSearchParams] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: '2',
  })

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
            >
              <Search className="w-5 h-5 ml-2" />
              بحث
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">النتائج</h2>
        <p className="text-gray-600">قم بتنفيذ البحث لرؤية الفنادق المتاحة</p>
      </div>

      <Footer />
    </div>
  )
}
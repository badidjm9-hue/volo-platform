'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Calendar, Users, MapPin, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { useRouter } from 'next/navigation'

export default function HomePage() {
  const router = useRouter()

  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90" />
        <div className="absolute inset-0 bg-[url('/patterns/dots.svg')] opacity-10" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-6xl mx-auto px-4 py-20"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              اكتشف الجزائر
              <br />
              <span className="text-white/90">احجز فندقك الآن</span>
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              آلاف الفنادق في جميع أنحاء الجزائر، أفضل الأسعار، حجز سريع وآمن
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-2xl">
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-white/80 text-sm mb-2">الوجهة</label>
                <div className="relative">
                  <MapPin className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="أين تريد الذهاب؟"
                    className="w-full pr-10 pl-4 py-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-white text-right"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2">تاريخ الوصول</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pr-10 pl-4 py-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2">تاريخ المغادرة</label>
                <div className="relative">
                  <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    className="w-full pr-10 pl-4 py-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-white/80 text-sm mb-2">الضيوف</label>
                <div className="relative">
                  <Users className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                  <select className="w-full pr-10 pl-4 py-3 rounded-lg bg-white/90 focus:outline-none focus:ring-2 focus:ring-white appearance-none">
                    <option>2 ضيوف</option>
                    <option>3 ضيوف</option>
                    <option>4 ضيوف</option>
                  </select>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => router.push('/search')}
              className="w-full mt-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              بحث عن فنادق
            </button>
          </div>
        </motion.div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '10,000+', label: 'فندق' },
              { value: '500K+', label: 'حجز' },
              { value: '48', label: 'ولاية' },
              { value: '4.8/5', label: 'تقييم' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-500 to-navy-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">هل تملك فندق؟</h2>
          <p className="text-xl text-white/90 mb-8">
            انضم إلى Volo وابدأ في استقبال حجوزات من آلاف العملاء
          </p>
          <Button
            size="lg"
            className="bg-white text-primary-600 hover:bg-white/90 text-lg px-8 py-6"
            onClick={() => router.push('/owner/register')}
          >
            سجل فندقك الآن
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
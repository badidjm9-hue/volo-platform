'use client'

import Link from 'next/link'
import { Menu, Bell, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-3xl font-bold bg-gradient-to-r from-primary-500 to-navy-600 bg-clip-text text-transparent">
              Volo
            </Link>
            <nav className="hidden md:flex gap-6">
              <Link href="/" className="text-gray-700 hover:text-primary-500 transition-colors">
                الرئيسية
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-primary-500 transition-colors">
                البحث
              </Link>
              <Link href="/offers" className="text-gray-700 hover:text-primary-500 transition-colors">
                عروض
              </Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost">
              تسجيل الدخول
            </Button>
            <Button className="bg-gradient-to-r from-primary-500 to-navy-600">
              إنشاء حساب
            </Button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
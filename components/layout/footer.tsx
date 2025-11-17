import Link from 'next/link'
import { Facebook, Instagram, Twitter, Mail, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-navy-800 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-4 text-primary-400">Volo</h3>
            <p className="text-gray-300">
              منصة حجز الفنادق الرائدة في الجزائر
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">روابط سريعة</h4>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-300 hover:text-primary-400">من نحن</Link></li>
              <li><Link href="/contact" className="text-gray-300 hover:text-primary-400">اتصل بنا</Link></li>
              <li><Link href="/terms" className="text-gray-300 hover:text-primary-400">الشروط والأحكام</Link></li>
              <li><Link href="/privacy" className="text-gray-300 hover:text-primary-400">سياسة الخصوصية</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">للفنادق</h4>
            <ul className="space-y-2">
              <li><Link href="/owner/register" className="text-gray-300 hover:text-primary-400">سجل فندقك</Link></li>
              <li><Link href="/owner/login" className="text-gray-300 hover:text-primary-400">تسجيل دخول الملاك</Link></li>
              <li><Link href="/help" className="text-gray-300 hover:text-primary-400">مركز المساعدة</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">تواصل معنا</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span className="text-gray-300">support@volo.dz</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="text-gray-300">+213 123 456 789</span>
              </div>
              <div className="flex gap-4 mt-4">
                <Facebook className="w-5 h-5 cursor-pointer hover:text-primary-400" />
                <Instagram className="w-5 h-5 cursor-pointer hover:text-primary-400" />
                <Twitter className="w-5 h-5 cursor-pointer hover:text-primary-400" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Volo. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: 'خطأ في البيانات',
        description: 'كلمتا المرور غير متطابقتين',
        variant: 'destructive'
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (data.success) {
        toast({
          title: 'تم إنشاء الحساب بنجاح',
          description: 'يمكنك الآن تسجيل الدخول'
        })
        router.push('/login')
      } else {
        toast({
          title: 'خطأ في التسجيل',
          description: data.error || 'حدث خطأ غير متوقع',
          variant: 'destructive'
        })
      }
    } catch (error) {
      toast({
        title: 'خطأ في التسجيل',
        description: 'حدث خطأ غير متوقع',
        variant: 'destructive'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-400 via-primary-500 to-navy-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold text-white">
            Volo
          </Link>
          <p className="text-white/90 mt-2">انضم إلى منصتنا اليوم</p>
        </div>

        <Card className="shadow-2xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">إنشاء حساب جديد</CardTitle>
            <CardDescription className="text-center">
              أدخل بياناتك لإنشاء حسابك
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    الاسم الأول
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="الاسم الأول"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    الاسم الأخير
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="الاسم الأخير"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="pr-10"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pr-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">
                  رقم الهاتف (اختياري)
                </label>
                <div className="relative">
                  <Phone className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="05XX XX XX XX"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pr-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    className="pr-10 pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium">
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pr-10 pl-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  أوافق على{' '}
                  <Link href="/terms" className="text-primary-600 hover:underline">
                    الشروط والأحكام
                  </Link>
                  {' '}و{' '}
                  <Link href="/privacy" className="text-primary-600 hover:underline">
                    سياسة الخصوصية
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary-500 to-navy-600 hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? 'جاري إنشاء الحساب...' : 'إنشاء حساب'}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                لديك حساب بالفعل؟{' '}
                <Link href="/login" className="text-primary-600 hover:underline font-medium">
                  تسجيل الدخول
                </Link>
              </p>
            </div>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">أو</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <Link href="/" className="text-sm text-gray-600 hover:text-primary-600">
                  العودة إلى الرئيسية
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-white/70 text-sm">
          © 2025 Volo. جميع الحقوق محفوظة.
        </div>
      </div>
    </div>
  )
}
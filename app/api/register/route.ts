import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'
import { validateEmail, validatePhone } from '@/lib/utils'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, password } = body

    // Validation
    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'جميع الحقول مطلوبة' },
        { status: 400 }
      )
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, error: 'البريد الإلكتروني غير صحيح' },
        { status: 400 }
      )
    }

    if (phone && !validatePhone(phone)) {
      return NextResponse.json(
        { success: false, error: 'رقم الهاتف غير صحيح' },
        { status: 400 }
      )
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'البريد الإلكتروني مستخدم بالفعل' },
        { status: 409 }
      )
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        passwordHash,
        role: 'GUEST',
        language: 'ar',
        isActive: true,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    })

    return NextResponse.json({
      success: true,
      data: user,
      message: 'تم إنشاء الحساب بنجاح'
    })

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { success: false, error: 'خطأ في الخادم' },
      { status: 500 }
    )
  }
}
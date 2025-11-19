import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { generateReferenceNumber, calculateNights } from '@/lib/utils'
import { satimGateway } from '@/lib/satim'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'يجب تسجيل الدخول' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      hotelId,
      roomId,
      checkIn,
      checkOut,
      guests,
      roomsBooked = 1,
      specialRequests,
      guestDetails,
      paymentMethod
    } = body

    // Get room and hotel details
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      include: { hotel: true }
    })

    if (!room || room.hotelId !== hotelId) {
      return NextResponse.json(
        { success: false, error: 'الغرفة غير موجودة' },
        { status: 404 }
      )
    }

    // Calculate nights and total price
    const checkInDate = new Date(checkIn)
    const checkOutDate = new Date(checkOut)
    const nights = calculateNights(checkInDate, checkOutDate)
    const totalAmount = room.basePrice * nights * roomsBooked

    // Generate booking reference
    const referenceNumber = generateReferenceNumber()

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        referenceNumber,
        userId: session.user.id,
        hotelId,
        roomId,
        checkIn: checkInDate,
        checkOut: checkOutDate,
        nights,
        guests: JSON.stringify(guests),
        roomsBooked,
        pricePerNight: room.basePrice,
        totalAmount,
        specialRequests,
        guestDetails: JSON.stringify(guestDetails),
        status: 'PENDING',
        paymentStatus: paymentMethod === 'CIB' || paymentMethod === 'EDHAHABIA' ? 'PENDING' : 'PAID'
      },
      include: {
        hotel: {
          include: {
            owner: {
              select: {
                firstName: true,
                lastName: true
              }
            }
          }
        },
        room: true,
        user: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

    // Create transaction if payment is required
    if (paymentMethod === 'CIB' || paymentMethod === 'EDHAHABIA') {
      await prisma.transaction.create({
        data: {
          bookingId: booking.id,
          amount: totalAmount,
          method: paymentMethod,
          status: 'PENDING'
        }
      })

      // If SATIM payment is needed, create SATIM payment
      if (paymentMethod === 'CIB') {
        const paymentResult = await satimGateway.createPayment({
          amount: totalAmount,
          returnUrl: `${process.env.NEXTAUTH_URL}/booking/${booking.id}/payment/success`,
          failUrl: `${process.env.NEXTAUTH_URL}/booking/${booking.id}/payment/fail`,
          description: `حجز فندق ${booking.hotel.nameAr}`,
          customerEmail: booking.user.email
        })

        if (!paymentResult.success) {
          return NextResponse.json(
            { success: false, error: paymentResult.error },
            { status: 400 }
          )
        }

        // Update transaction with SATIM order ID
        await prisma.transaction.update({
          where: { bookingId: booking.id },
          data: {
            gatewayResponse: JSON.stringify({
              orderId: paymentResult.orderId,
              formUrl: paymentResult.formUrl
            })
          }
        })

        return NextResponse.json({
          success: true,
          data: {
            bookingId: booking.id,
            referenceNumber: booking.referenceNumber,
            totalAmount: booking.totalAmount,
            paymentUrl: paymentResult.formUrl,
            orderId: paymentResult.orderId
          }
        })
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        bookingId: booking.id,
        referenceNumber: booking.referenceNumber,
        totalAmount: booking.totalAmount,
        message: 'تم إنشاء الحجز بنجاح'
      }
    })

  } catch (error) {
    console.error('Booking creation error:', error)
    return NextResponse.json(
      { success: false, error: 'خطأ في إنشاء الحجز' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'يجب تسجيل الدخول' },
        { status: 401 }
      )
    }

    const bookings = await prisma.booking.findMany({
      where: { userId: session.user.id },
      include: {
        hotel: {
          select: {
            id: true,
            name: true,
            nameAr: true,
            city: true,
            images: true,
            featuredImage: true
          }
        },
        room: {
          select: {
            name: true,
            nameAr: true,
            images: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: bookings
    })

  } catch (error) {
    console.error('Bookings fetch error:', error)
    return NextResponse.json(
      { success: false, error: 'خطأ في جلب الحجوزات' },
      { status: 500 }
    )
  }
}

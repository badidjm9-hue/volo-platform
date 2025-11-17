import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const city = searchParams.get('city')
    const checkIn = searchParams.get('checkIn')
    const checkOut = searchParams.get('checkOut')
    const guests = parseInt(searchParams.get('guests') || '2')

    const hotels = await prisma.hotel.findMany({
      where: {
        status: 'APPROVED',
        city: city ? {
          contains: city,
          mode: 'insensitive'
        } : undefined,
      },
      include: {
        rooms: {
          where: {
            isActive: true,
            maxOccupancy: {
              gte: guests
            }
          },
          take: 1
        },
        reviews: {
          select: {
            overallScore: true
          }
        },
        owner: {
          select: {
            firstName: true,
            lastName: true
          }
        }
      },
      take: 20,
      orderBy: [
        { isFeatured: 'desc' },
        { averageRating: 'desc' }
      ]
    })

    // Transform data for response
    const transformedHotels = hotels.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      nameAr: hotel.nameAr,
      slug: hotel.slug,
      city: hotel.city,
      address: hotel.address,
      starRating: hotel.starRating,
      averageRating: hotel.averageRating,
      totalReviews: hotel.totalReviews,
      priceFrom: hotel.rooms.length > 0 ? hotel.rooms[0].basePrice : null,
      featuredImage: hotel.featuredImage,
      images: hotel.images,
      amenities: hotel.amenities,
      description: hotel.description,
      ownerName: `${hotel.owner.firstName} ${hotel.owner.lastName}`,
      roomCount: hotel.rooms.length,
      reviewCount: hotel.reviews.length
    }))

    return NextResponse.json({
      success: true,
      data: transformedHotels,
      count: transformedHotels.length
    })

  } catch (error) {
    console.error('Hotels API Error:', error)
    return NextResponse.json(
      { success: false, error: 'خطأ في جلب البيانات' },
      { status: 500 }
    )
  }
}
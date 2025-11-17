import { NextRequest, NextResponse } from 'next/server';
import liteApi from '@/lib/liteapi';

interface SearchRequest {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests?: number;
  rooms?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body: SearchRequest = await request.json();
    
    // Validate required fields
    if (!body.destination || !body.checkIn || !body.checkOut) {
      return NextResponse.json(
        { error: 'المعلومات المطلوبة مفقودة' },
        { status: 400 }
      );
    }

    // Validate date format
    const checkInDate = new Date(body.checkIn);
    const checkOutDate = new Date(body.checkOut);
    
    if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
      return NextResponse.json(
        { error: 'صيغة التاريخ غير صحيحة' },
        { status: 400 }
      );
    }

    if (checkOutDate <= checkInDate) {
      return NextResponse.json(
        { error: 'تاريخ المغادرة يجب أن يكون بعد تاريخ الوصول' },
        { status: 400 }
      );
    }

    // Check API connectivity
    const isConnected = await liteApi.ping();
    
    // Search hotels using LiteAPI
    const hotels = await liteApi.searchHotels({
      destination: body.destination,
      checkIn: body.checkIn,
      checkOut: body.checkOut,
      guests: body.guests || 2,
      rooms: body.rooms || 1
    });

    // Return results
    return NextResponse.json({
      success: true,
      hotels,
      meta: {
        destination: body.destination,
        checkIn: body.checkIn,
        checkOut: body.checkOut,
        apiConnected: isConnected,
        count: hotels.length
      }
    });

  } catch (error) {
    console.error('Hotel search error:', error);
    
    return NextResponse.json(
      { 
        error: 'حدث خطأ في البحث عن الفنادق',
        message: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    );
  }
}

// GET method for direct access
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  
  const destination = searchParams.get('destination');
  const checkIn = searchParams.get('checkIn');
  const checkOut = searchParams.get('checkOut');
  const guests = searchParams.get('guests');
  const rooms = searchParams.get('rooms');

  if (!destination || !checkIn || !checkOut) {
    return NextResponse.json(
      { error: 'المعلومات المطلوبة مفقودة' },
      { status: 400 }
    );
  }

  try {
    const hotels = await liteApi.searchHotels({
      destination,
      checkIn,
      checkOut,
      guests: guests ? parseInt(guests) : 2,
      rooms: rooms ? parseInt(rooms) : 1
    });

    return NextResponse.json({
      success: true,
      hotels,
      meta: {
        destination,
        checkIn,
        checkOut,
        count: hotels.length
      }
    });

  } catch (error) {
    console.error('Hotel search error:', error);
    
    return NextResponse.json(
      { error: 'حدث خطأ في البحث عن الفنادق' },
      { status: 500 }
    );
  }
}
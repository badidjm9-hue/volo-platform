import { NextRequest, NextResponse } from 'next/server';
import liteApi from '@/lib/liteapi';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hotelId = params.id;

    if (!hotelId) {
      return NextResponse.json(
        { error: 'معرف الفندق مطلوب' },
        { status: 400 }
      );
    }

    // Get hotel details from LiteAPI
    const hotel = await liteApi.getHotelDetails(hotelId);

    if (!hotel) {
      return NextResponse.json(
        { error: 'الفندق غير موجود' },
        { status: 404 }
      );
    }

    // Return hotel details
    return NextResponse.json({
      success: true,
      hotel
    });

  } catch (error) {
    console.error('Hotel details error:', error);
    
    return NextResponse.json(
      { 
        error: 'حدث خطأ في جلب تفاصيل الفندق',
        message: error instanceof Error ? error.message : 'خطأ غير معروف'
      },
      { status: 500 }
    );
  }
}
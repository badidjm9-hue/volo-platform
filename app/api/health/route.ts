import { NextRequest, NextResponse } from 'next/server';
import liteApi from '@/lib/liteapi';

export async function GET(request: NextRequest) {
  try {
    // Test LiteAPI connectivity
    const isConnected = await liteApi.ping();
    
    // Check configuration
    const config = {
      apiConnected: isConnected,
      sandboxMode: true,
      baseUrl: 'https://api.liteapi.travel/v1',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json({
      success: true,
      message: isConnected ? 'LiteAPI متصل بنجاح' : 'LiteAPI غير متصل',
      config
    });

  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'حدث خطأ في فحص الحالة',
      error: error instanceof Error ? error.message : 'خطأ غير معروف'
    }, { status: 500 });
  }
}
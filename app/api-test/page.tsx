// API Test Page - Check LiteAPI Integration

'use client';

import { useState, useEffect } from 'react';
import voloApi from '@/lib/api-client';

export default function ApiTestPage() {
  const [healthStatus, setHealthStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkApiHealth();
  }, []);

  const checkApiHealth = async () => {
    setLoading(true);
    try {
      const isHealthy = await voloApi.checkHealth();
      setHealthStatus(isHealthy);
    } catch (err) {
      console.error('Health check failed:', err);
      setHealthStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const testSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const results = await voloApi.searchHotels({
        destination: 'الجزائر',
        checkIn: '2025-11-20',
        checkOut: '2025-11-22',
        guests: 2,
        rooms: 1
      });
      setSearchResults(results);
    } catch (err) {
      console.error('Search test failed:', err);
      setError('فشل في اختبار البحث');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🔧 اختبار API Volo Platform
        </h1>

        <div className="grid gap-6">
          {/* Health Check */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">فحص حالة API</h2>
            
            {healthStatus === null ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500 mx-auto mb-4"></div>
                <p className="text-gray-600">جاري فحص الاتصال...</p>
              </div>
            ) : (
              <div className={`flex items-center space-x-3 space-x-reverse ${healthStatus ? 'text-green-600' : 'text-red-600'}`}>
                <div className={`w-4 h-4 rounded-full ${healthStatus ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="font-semibold">
                  {healthStatus ? '✅ API متصل بنجاح' : '❌ API غير متصل'}
                </span>
              </div>
            )}

            <button
              onClick={checkApiHealth}
              disabled={loading}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              إعادة فحص
            </button>
          </div>

          {/* API Keys Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">معلومات API</h2>
            <div className="space-y-3 text-sm">
              <div>
                <strong>Public Key:</strong>
                <code className="bg-gray-100 px-2 py-1 rounded mr-2 text-xs">
                  b01ce90a-ca0d-4f5c-9ab7-67f148f45055
                </code>
              </div>
              <div>
                <strong>Private Key:</strong>
                <code className="bg-gray-100 px-2 py-1 rounded mr-2 text-xs">
                  sand_615a5da4-8696-4c72-b626-3997aa52dd21
                </code>
                <span className="text-orange-600 text-xs">(Sandbox)</span>
              </div>
              <div>
                <strong>API Base URL:</strong>
                <code className="bg-gray-100 px-2 py-1 rounded mr-2 text-xs">
                  https://api.liteapi.travel/v1
                </code>
              </div>
              <div>
                <strong>Authentication:</strong>
                <span className="text-gray-700">HMAC-SHA256</span>
              </div>
            </div>
          </div>

          {/* Search Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">اختبار البحث</h2>
            <p className="text-gray-600 mb-4">
              اختبار البحث عن الفنادق في الجزائر
            </p>

            <button
              onClick={testSearch}
              disabled={loading}
              className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 disabled:opacity-50 mb-4"
            >
              {loading ? (
                <span className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white ml-2"></div>
                  جاري الاختبار...
                </span>
              ) : (
                'اختبار البحث'
              )}
            </button>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {searchResults && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">النتائج:</h3>
                <div className="space-y-2">
                  <p><strong>عدد الفنادق:</strong> {searchResults.length}</p>
                  {searchResults.map((hotel: any, index: number) => (
                    <div key={index} className="bg-gray-50 p-3 rounded">
                      <p><strong>{hotel.name}</strong></p>
                      <p className="text-sm text-gray-600">{hotel.location}</p>
                      <p className="text-sm text-teal-600">{hotel.price} {hotel.currency}/ليلة</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-blue-800">📋 تعليمات الاستخدام</h2>
            <ul className="space-y-2 text-blue-700">
              <li>1. انتظر حتى يكتمل فحص حالة API</li>
              <li>2. إذا كان API متصلاً، اختبر البحث عن الفنادق</li>
              <li>3. سيتم عرض البيانات الحقيقية أو البديلة حسب حالة الاتصال</li>
              <li>4. في حالة الفشل، سيتم عرض البيانات التجريبية</li>
            </ul>
          </div>

          {/* API Status Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4">ملخص حالة النظام</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span>LiteAPI Connection</span>
                <span className={`px-3 py-1 rounded-full text-sm ${healthStatus ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {healthStatus === null ? 'جاري الفحص...' : healthStatus ? 'متصل' : 'غير متصل'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Mode</span>
                <span className="px-3 py-1 rounded-full text-sm bg-orange-100 text-orange-800">
                  Sandbox
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Authentication</span>
                <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                  HMAC-SHA256
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span>Currency</span>
                <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                  DZD (Algerian Dinar)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
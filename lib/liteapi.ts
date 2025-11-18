// LiteAPI for Hotels/Flights booking
export const liteApiConfig = {
  apiKey: process.env.LITEAPI_KEY || '',
  baseUrl: process.env.LITEAPI_URL || 'https://api.liteapi.travel',
};

export interface SearchHotelsParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  rooms: number;
}

export const searchHotels = async (params: SearchHotelsParams) => {
  try {
    const response = await fetch(`${liteApiConfig.baseUrl}/hotels/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': liteApiConfig.apiKey,
      },
      body: JSON.stringify(params),
    });

    return await response.json();
  } catch (error) {
    console.error('LiteAPI Error:', error);
    throw error;
  }
};

export default liteApiConfig;

import axios, { AxiosInstance } from 'axios';

interface SearchHotelsParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  filters?: {
    priceRange?: { min: number; max: number };
    starRating?: number[];
    amenities?: string[];
    hotelChain?: string[];
  };
}

interface HotelSearchResult {
  id: string;
  name: string;
  location: string;
  description: string;
  images: string[];
  amenities: string[];
  starRating: number;
  priceFrom: number;
  currency: string;
  availability: {
    available: boolean;
    roomsLeft?: number;
    lastUpdated: string;
  };
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  policies?: {
    checkIn: string;
    checkOut: string;
    cancellationPolicy: string;
  };
}

interface LiteApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

const liteApiConfig = {
  apiKey: process.env.LITEAPI_API_KEY || '',
  baseUrl: process.env.LITEAPI_BASE_URL || 'https://api.liteapi.travel/v3.0',
  timeout: 30000,
  retryAttempts: 3,
};

class LiteApiClient {
  private client: AxiosInstance;
  private config: typeof liteApiConfig;

  constructor(config: typeof liteApiConfig) {
    this.config = config;
    
    this.client = axios.create({
      baseURL: this.config.baseUrl,
      timeout: this.config.timeout,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Lite API Request: ${config.method?.toUpperCase()} ${config.url}`);
        if (!this.config.apiKey) {
          console.warn('Lite API Key not configured');
        }
        return config;
      },
      (error) => {
        console.error('Lite API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor with retry logic
    this.client.interceptors.response.use(
      (response) => {
        console.log(`Lite API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      async (error) => {
        console.error('Lite API Response Error:', error.response?.data || error.message);
        
        const config = error.config;
        if (!config) return Promise.reject(error);

        // Retry logic for certain errors
        if (config.retryAttempts < this.config.retryAttempts && 
            (error.response?.status >= 500 || error.code === 'ECONNABORTED')) {
          config.retryAttempts = (config.retryAttempts || 0) + 1;
          
          // Exponential backoff
          const delay = Math.pow(2, config.retryAttempts) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
          
          console.log(`Retrying Lite API request (attempt ${config.retryAttempts})`);
          return this.client(config);
        }
        
        return Promise.reject(error);
      }
    );
  }

  async searchHotels(params: SearchHotelsParams): Promise<LiteApiResponse<HotelSearchResult[]>> {
    try {
      // Validate required parameters
      if (!params.destination || !params.checkIn || !params.checkOut) {
        throw new Error('Missing required parameters: destination, checkIn, checkOut');
      }

      // Validate dates
      const checkInDate = new Date(params.checkIn);
      const checkOutDate = new Date(params.checkOut);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (isNaN(checkInDate.getTime()) || isNaN(checkOutDate.getTime())) {
        throw new Error('Invalid date format provided');
      }

      if (checkInDate < today) {
        throw new Error('Check-in date cannot be in the past');
      }

      if (checkOutDate <= checkInDate) {
        throw new Error('Check-out date must be after check-in date');
      }

      if (params.guests <= 0 || params.guests > 20) {
        throw new Error('Number of guests must be between 1 and 20');
      }

      if (params.rooms <= 0 || params.rooms > 10) {
        throw new Error('Number of rooms must be between 1 and 10');
      }

      // Prepare search parameters for Lite API
      const searchParams = {
        destination: params.destination,
        checkIn: params.checkIn,
        checkOut: params.checkOut,
        guests: params.guests,
        rooms: params.rooms,
        limit: 50, // Default limit
        offset: 0, // Default offset
        sort: 'price_asc', // Default sort
        filters: params.filters || {},
      };

      console.log('Searching hotels with params:', searchParams);

      // Call Lite API
      const response = await this.client.post('/hotels/search', searchParams);

      // Transform response to match our interface
      const hotels: HotelSearchResult[] = (response.data.hotels || []).map((hotel: any) => ({
        id: hotel.hotelId || hotel.id,
        name: hotel.name,
        location: hotel.location?.address || hotel.address || '',
        description: hotel.description || '',
        images: hotel.images || [],
        amenities: hotel.amenities || [],
        starRating: hotel.starRating || 0,
        priceFrom: hotel.price?.amount || hotel.priceFrom || 0,
        currency: hotel.price?.currency || 'USD',
        availability: {
          available: hotel.availability?.isAvailable || true,
          roomsLeft: hotel.availability?.roomsLeft,
          lastUpdated: new Date().toISOString(),
        },
        coordinates: hotel.coordinates,
        policies: hotel.policies,
      }));

      return {
        success: true,
        data: hotels,
        pagination: {
          page: 1,
          limit: 50,
          total: response.data.total || hotels.length,
          totalPages: Math.ceil((response.data.total || hotels.length) / 50),
        },
      };
    } catch (error: any) {
      console.error('Lite API Hotel Search Error:', error);
      
      // Provide more specific error messages
      let errorMessage = 'Failed to search hotels';
      if (error.response?.status === 401) {
        errorMessage = 'Invalid API credentials';
      } else if (error.response?.status === 429) {
        errorMessage = 'API rate limit exceeded';
      } else if (error.response?.status >= 500) {
        errorMessage = 'Lite API service temporarily unavailable';
      } else if (error.message) {
        errorMessage = error.message;
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  // Additional methods for other Lite API endpoints
  async getHotelDetails(hotelId: string): Promise<LiteApiResponse<HotelSearchResult>> {
    try {
      if (!hotelId) {
        throw new Error('Hotel ID is required');
      }

      const response = await this.client.get(`/hotels/${hotelId}`);

      const hotel: HotelSearchResult = {
        id: response.data.hotelId || response.data.id,
        name: response.data.name,
        location: response.data.location?.address || response.data.address || '',
        description: response.data.description || '',
        images: response.data.images || [],
        amenities: response.data.amenities || [],
        starRating: response.data.starRating || 0,
        priceFrom: response.data.price?.amount || 0,
        currency: response.data.price?.currency || 'USD',
        availability: {
          available: response.data.availability?.isAvailable || true,
          roomsLeft: response.data.availability?.roomsLeft,
          lastUpdated: new Date().toISOString(),
        },
        coordinates: response.data.coordinates,
        policies: response.data.policies,
      };

      return {
        success: true,
        data: hotel,
      };
    } catch (error: any) {
      console.error('Lite API Hotel Details Error:', error);
      
      let errorMessage = 'Failed to get hotel details';
      if (error.response?.status === 404) {
        errorMessage = 'Hotel not found';
      } else if (error.response?.status === 401) {
        errorMessage = 'Invalid API credentials';
      }

      return {
        success: false,
        error: errorMessage,
      };
    }
  }

  async healthCheck(): Promise<LiteApiResponse<{ status: string; timestamp: string }>> {
    try {
      const response = await this.client.get('/status');
      return {
        success: true,
        data: {
          status: response.data.status || 'ok',
          timestamp: new Date().toISOString(),
        },
      };
    } catch (error: any) {
      console.error('Lite API Health Check Error:', error);
      return {
        success: false,
        error: 'Lite API health check failed',
      };
    }
  }
}

export const liteApiClient = new LiteApiClient(liteApiConfig);
export { liteApiConfig };
export type { SearchHotelsParams, HotelSearchResult, LiteApiResponse };
export default liteApiConfig;
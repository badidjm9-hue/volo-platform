import axios, { AxiosInstance } from 'axios';

interface SearchHotelsParams {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
}

interface BookingData {
  hotelId: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  guestInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

class VoloApiClient {
  private client: AxiosInstance;

  constructor() {
    const baseURL = process.env.VOLO_API_URL || 'https://api.volo.dz';
    
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        console.log(`Volo API Request: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
      },
      (error) => {
        console.error('Volo API Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => {
        console.log(`Volo API Response: ${response.status} ${response.config.url}`);
        return response;
      },
      (error) => {
        console.error('Volo API Response Error:', error.response?.data || error.message);
        return Promise.reject(error);
      }
    );
  }

  async searchHotels(params: SearchHotelsParams): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/hotels/search', params);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async createBooking(data: BookingData): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/bookings/create', data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async healthCheck(): Promise<ApiResponse<{ status: string; timestamp: string }>> {
    try {
      const response = await this.client.get('/health');
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  // Additional methods for cars and flights
  async searchCars(params: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/cars/search', params);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }

  async searchFlights(params: any): Promise<ApiResponse<any>> {
    try {
      const response = await this.client.post('/flights/search', params);
      return {
        success: true,
        data: response.data,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || error.message,
      };
    }
  }
}

export const voloApi = new VoloApiClient();
export default voloApi;
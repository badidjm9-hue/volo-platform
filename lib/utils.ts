import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateNights(checkIn: string | Date, checkOut: string | Date): number {
  try {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    
    const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return Math.max(0, nights);
  } catch (error) {
    console.error('Error calculating nights:', error);
    return 0;
  }
}

export function generateReferenceNumber(): string {
  try {
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    const reference = `VOLO-${timestamp}-${random}`;
    return reference.slice(0, 15); // Limit to 15 characters
  } catch (error) {
    console.error('Error generating reference number:', error);
    return `VOLO-${Date.now()}`;
  }
}

export function validateEmail(email: string): boolean {
  try {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 255;
  } catch (error) {
    console.error('Error validating email:', error);
    return false;
  }
}

export function validatePhone(phone: string): boolean {
  try {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Algerian phone number patterns:
    // Mobile: 05xxxxxxxx, 06xxxxxxxx, 07xxxxxxxx
    // International: +213xxxxxxxx, +2135xxxxxxxx, etc.
    
    // Check for international format
    const internationalRegex = /^\+213[567]\d{8}$/;
    
    // Check for national format
    const nationalRegex = /^[567]\d{8}$/;
    
    if (cleaned.startsWith('213')) {
      // Remove country code and check
      const numberWithoutCountry = cleaned.substring(3);
      return internationalRegex.test(`+213${numberWithoutCountry}`);
    } else if (cleaned.startsWith('0')) {
      // Remove leading 0 and check
      const numberWithoutZero = cleaned.substring(1);
      return nationalRegex.test(numberWithoutZero);
    } else {
      // Check direct 8-digit numbers
      return nationalRegex.test(cleaned);
    }
  } catch (error) {
    console.error('Error validating phone:', error);
    return false;
  }
}

export function formatPrice(price: number, currency: string = 'DZD'): string {
  try {
    // Remove decimals for DZD (Algerian Dinar) - typically no cents
    const isDZD = currency === 'DZD';
    const priceInCents = isDZD ? Math.round(price) : Math.round(price * 100) / 100;
    
    if (isDZD) {
      // Format for Algerian Dinar
      return new Intl.NumberFormat('ar-DZ', {
        style: 'currency',
        currency: 'DZD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(priceInCents);
    } else {
      // Format for other currencies
      return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(priceInCents);
    }
  } catch (error) {
    console.error('Error formatting price:', error);
    return `${price.toFixed(2)} ${currency}`;
  }
}

export function formatPhoneNumber(phone: string): string {
  try {
    const cleaned = phone.replace(/\D/g, '');
    
    if (cleaned.startsWith('213')) {
      const number = cleaned.substring(3);
      if (number.startsWith('0')) {
        return `+213 ${number.slice(0, 1)} ${number.slice(1, 3)} ${number.slice(3, 5)} ${number.slice(5)}`;
      } else {
        return `+213 ${number.slice(0, 1)} ${number.slice(1, 3)} ${number.slice(3, 5)} ${number.slice(5)}`;
      }
    } else if (cleaned.startsWith('0')) {
      const number = cleaned.substring(1);
      return `${number.slice(0, 1)} ${number.slice(1, 3)} ${number.slice(3, 5)} ${number.slice(5)}`;
    } else {
      return cleaned;
    }
  } catch (error) {
    console.error('Error formatting phone number:', error);
    return phone;
  }
}

export function generateOTP(length: number = 6): string {
  try {
    const digits = '0123456789';
    let otp = '';
    
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * digits.length)];
    }
    
    return otp;
  } catch (error) {
    console.error('Error generating OTP:', error);
    return '000000';
  }
}

export function formatDate(date: string | Date, locale: string = 'fr-FR'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString(locale);
  } catch (error) {
    console.error('Error formatting date:', error);
    return date.toString();
  }
}

export function formatDateTime(date: string | Date, locale: string = 'fr-FR'): string {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleString(locale);
  } catch (error) {
    console.error('Error formatting date time:', error);
    return date.toString();
  }
}

export function isValidDate(date: string | Date): boolean {
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  } catch (error) {
    return false;
  }
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
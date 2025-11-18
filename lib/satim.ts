// SATIM Payment Gateway for Algeria
export const satimConfig = {
  merchantId: process.env.SATIM_MERCHANT_ID || '',
  apiKey: process.env.SATIM_API_KEY || '',
  apiUrl: process.env.SATIM_API_URL || 'https://payment.satim.dz/api',
  environment: process.env.NODE_ENV === 'production' ? 'production' : 'test',
};

export interface SatimPaymentRequest {
  amount: number;
  currency: string;
  orderId: string;
  customerEmail: string;
  returnUrl: string;
}

export const createSatimPayment = async ( SatimPaymentRequest) => {
  try {
    const response = await fetch(`${satimConfig.apiUrl}/payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${satimConfig.apiKey}`,
      },
      body: JSON.stringify({
        ...data,
        merchantId: satimConfig.merchantId,
      }),
    });

    return await response.json();
  } catch (error) {
    console.error('SATIM Payment Error:', error);
    throw error;
  }
};

export default satimConfig;

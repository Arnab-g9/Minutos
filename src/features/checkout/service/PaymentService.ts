import { postData } from '../../../api/api';

export interface CreateRazorpayOrderResponse {
  success: boolean;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  key: string;
}

class PaymentService {
  createRazorpayOrder = async (
    endpoint: string,
    body: { orderId: string }
  ): Promise<CreateRazorpayOrderResponse> => {
    const res = await postData(endpoint, body);
    return res?.data;
  };
}

export default new PaymentService();

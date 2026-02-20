import { postData, fetchData } from '../../../api/api';

class OrderService {
  createOrder = async (endpoint: string, body: any) => {
    const res = await postData(endpoint, body);
    console.log("This is respose of createOrder ===>", res)
    return res?.data;
  };

  getOrders = async (endpoint: string) => {
    const res = await fetchData(endpoint);
    return res?.data;
  };
}

export default new OrderService();

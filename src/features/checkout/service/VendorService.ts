import { fetchData } from '../../../api/api';

class VendorService {
  getVendors = async (endpoint: string) => {
    const res = await fetchData(endpoint);
    return res?.data;
  };
}

export default new VendorService();

import { fetchData, postData } from "../../../api/api";
import { IGetAdsResponse } from "../Types/GetAds.Types";
import { ICategoryResponse } from "../Types/GetCategories.Types";

class DashboardService {
    getAds = async (endPoint: string): Promise<IGetAdsResponse> => {
        const res = await fetchData(endPoint);
        return res?.data?.banner;
    }
    getCategories = async (endpoint: string): Promise<ICategoryResponse> =>{
        const res = await fetchData(endpoint);
        return res?.data;
    }
}

export default new DashboardService();
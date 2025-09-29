import { fetchData, postData } from "../../../api/api";


class DashboardService {
    getInitailCartItem = async (endpoint: string, userId: string) => {
        const res = await fetchData(`${endpoint}=${userId}`)
        console.log("This is initial cartData ===>", res?.data)
        return res?.data;
    }
    addToCart = async (endpoint: string, body: any) => {
        const res = await postData(`${endpoint}`, body);
        console.log("This is response of add to cart product ===>", res);
        return res?.data;
    }
}

export default new DashboardService();
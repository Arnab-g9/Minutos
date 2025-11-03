import { fetchData, postData, putData } from "../../../api/api";
import { GetCartResponse } from "../Types/Getcart.Types";


class DashboardService {
    getInitailCartItem = async (endpoint: string, userId: string):Promise<GetCartResponse> => {
        const res = await fetchData(`${endpoint}=${userId}`)
        return res?.data;
    }
    addToCart = async (endpoint: string, body: any) => {
        const res = await postData(`${endpoint}`, body);
        console.log("This is response of add to cart product ===>", res);
        return res?.data;
    }
     updateCart = async (endpoint: string, body: any) => {
        console.log("this is updatecart body ===>", body)
        const res = await putData(`${endpoint}`, body);
        console.log("This is response of updateCart to cart product ===>", res);
        return res?.data;
    }
     removeFromCart = async (endpoint: string, body: any) => {
        const res = await postData(`${endpoint}`, body);
        console.log("This is response of add to cart product ===>", res);
        return res?.data;
    }
}

export default new DashboardService();
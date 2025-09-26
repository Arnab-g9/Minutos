import { postData } from "../../../api/api";

class AuthService{
    sendOTP = async(endPoint: string, param:any)=>{
        const res = await postData(endPoint, param);
        console.log("this is sendOTP response inside the service file ===>", res)
        return res?.data;
    }
}

export default new AuthService();
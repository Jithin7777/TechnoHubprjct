import { BASE_URL } from "./baseUrl";
import { commonApi } from "./commonApi";


//register
export const registerApi=async(body)=>{
   return await commonApi('POST',`${BASE_URL}/user/register`,body,"")
}

export const loginApi=async(body)=>{
    return await commonApi('POST',`${BASE_URL}/user/login`,body,"")
}

// export const sendOtp=async(body)=>{
//     return await commonApi('POST',`${BASE_URL}/user/sendotp`,body,"")
// }

export const generateOtpAPI = async (body) => {
    return await commonApi("POST", `${BASE_URL}/emailGeneration`, body, "");
  };
  

  export const emailOtpVerificationAPI = async (body) => {
    return await commonApi("POST", `${BASE_URL}/emailverification`, body, "");
  };
  
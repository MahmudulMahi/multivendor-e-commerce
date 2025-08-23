import { publicRequest } from "@/lib/axios"
// register api call here 
export const signup = async(payload)=>{
    return publicRequest.post("auth/register",payload)
}
// login api call here 
export const login = async(payload)=>{
    return publicRequest.post("auth/login",payload)
}
// verify otp call here
export const verifyotp = async(payload)=>{
    return publicRequest.post("auth/account/verify/sms-send",payload)
}
// resend api call 
export const resendOtp = async(payload)=>{
    return publicRequest.post("auth/account/verify/resend",payload)
}
// password api call 
export const setupPassword = async(payload)=>{
    return publicRequest.post("auth/set-password",payload)
}
// password api call 
export const forgotPassword = async(payload)=>{
    return publicRequest.post("auth/forgot/password/sms-send",payload)
}
// forgot otp call here
export const forgot_otp = async(payload)=>{
    return publicRequest.post("auth/forgot-code-check",payload)
}
// forgot otp call here
export const setupForgotPassword = async(payload)=>{
    return publicRequest.post("auth/forgot-password-update",payload)
}
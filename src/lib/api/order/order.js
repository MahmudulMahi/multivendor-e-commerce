import { privateRequest } from "@/lib/axios";

export const order = async(params={})=>{
    return await privateRequest.get(`/user/order`,{params});
}
export const singleOrder = async(id)=>{
    return await privateRequest.get(`/user/order/${id}` );
}

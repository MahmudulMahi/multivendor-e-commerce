const { publicRequest } = require("@/lib/axios"); 
export const product = async(params={})=>{
    return await publicRequest.get("user/product",{params});
}
export const searchProduct = async(params={})=>{
    return await publicRequest.get("product/filterder-product",{params});
}
export const singleProduct = async(id)=>{
    return await publicRequest.get(`user/product/${id}`);
}

const { publicRequest } = require("@/lib/axios");

export const category = async()=>{
    return await publicRequest.get("user/category");
}
export const getCategoryById = async(id,query={})=>{
    return await publicRequest.get(`user/category-filterd-products/${id}`,{
        params:query
    })
}
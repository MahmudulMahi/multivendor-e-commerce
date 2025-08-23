const { publicRequest } = require("@/lib/axios");

export const shop = async(params={})=>{
    return await publicRequest.get("user/vendor",{params});
}
// single shop 
export const getSingleShopById = async(id,query={})=>{
    return await publicRequest.get(`user/vendor-filterd-products/${id}`,{
        params:query
    })
}
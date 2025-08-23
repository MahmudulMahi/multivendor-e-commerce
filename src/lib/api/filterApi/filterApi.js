const { publicRequest } = require("@/lib/axios")

export const filterDynamicApi = async(apiEndPoint)=>{
    return await publicRequest?.get(apiEndPoint)
}
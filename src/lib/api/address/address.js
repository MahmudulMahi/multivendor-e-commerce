import { privateRequest  } from "@/lib/axios"

export const address = async( )=>{
    return privateRequest.get("user/address")
}
export const division = async( )=>{
    return privateRequest.get("user/division")
}
export const fetchCity = async(id)=>{
    return privateRequest.get(`user/division/${id}`)
}
export const fetchArea = async(id)=>{
    return privateRequest.get(`user/city/${id}`)
}
export const singleAddress = async(id)=>{
    return privateRequest.get(`user/address/${id}`)
}
export const postDefaultAddress = async(payload)=>{
    return privateRequest.post(`user/address/default`,payload)
}
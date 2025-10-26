import { publicRequest } from "@/lib/axios";

export const banner = async()=>{
    return await publicRequest.get("/banner");
}
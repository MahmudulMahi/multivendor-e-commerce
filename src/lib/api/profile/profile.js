import { privateRequest } from "@/lib/axios";

export const getProfile = async () => {
  return privateRequest.get("/user/profile");
};
export const profileUpdate = async (data) => {
  return privateRequest.post("/user/update-profile",data);
};
export const passwordReset = async (data) => {
  return privateRequest.post("/user/reset-password",data);
};

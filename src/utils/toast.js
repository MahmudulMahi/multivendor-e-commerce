import { toast } from "sonner";
export const notifySuccess = (msg) => toast.success(msg);

export const notifyError = (msg) => toast.error(msg);

export const notifyInfo = (msg) => toast.info(msg);

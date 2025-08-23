import Cookies from "js-cookie";
import { notifyError } from "../toast";
/* Set token */
export const setToken = async (token) => {
  Cookies.set("bajar_token", token, { expires: 7, path: "/" });
  return true;
};
/* Get token */
export const getToken = () => {
  if (typeof window !== "undefined") {
    return Cookies.get("bajar_token");
  }
};
/* Remove token */
export const removeToken = () => {
  Cookies.remove("bajar_token");
  return true;
};
// success response handler
export const responseHandler = async (response) => {
  if (response?.status === 200 || response?.status === 201) {
    return true;
  }
};

// error handler
export const networkErrorHandeller = (error) => {
  if (
    error &&
    error.response &&
    error.response.data &&
    error.response.data.error
  ) {
    error?.response?.data?.error?.map((item, index) => {
      return (
        <span key={index} className="">
          {notifyError(error?.response?.data?.error[0])}
        </span>
      );
    });
  } else {
    return notifyError("Something going wrong, Try again.");
  }
};

import React, { useEffect, useState } from "react";
import { CiLock } from "@/icons";
import { useAuth } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { notifySuccess } from "@/utils/toast";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { passwordReset } from "@/lib/api/profile/profile";
import Button from "../ui/Button";
import {
  getValidateConfirmPassword,
  validatePassword,
} from "@/utils/validation";
import { PasswordInput } from "../ui/Input"; 
const ResetPassword = ( ) => {
  const { user, fetchProfile } = useAuth();
  const [success, setSuccess] = useState({
    loading: false,
    success: false,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    watch,
    setValue,
  } = useForm();

  useEffect(() => {
    if (user?.name) {
      setValue("name", user.name);
    }
  }, [user?.name, setValue]);
  const onsubmit = async (data) => {
    setSuccess({
      ...success,
      loading: true,
    });
    try {
      const response = await passwordReset(data);
      console.log(response);
      if (responseHandler(response)) {
        setSuccess({
          loading: false,
          success: true,
        });
        fetchProfile();
        notifySuccess(response?.data?.message);
        setTimeout(() => {
          setSuccess({
            loading: false,
            success: false,
          });
        }, 700); 
      }
    } catch (error) {
      networkErrorHandeller(error);
      setSuccess({
        loading: false,
        success: false,
      });
    }
  }; 
  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="  shadow-md px-5 py-7 border rounded-lg space-y-4  "
    >
      <h1 className="text-black opacity-70 text-center py-1 font-bold text-xl">
        Password Reset
      </h1>
      <PasswordInput
        register={register}
        name="password"
        label={
          <p className="px-3 flex items-center text-black/50 gap-2 font-semibold text-sm ">
            {" "}
            <CiLock /> Current Password *
          </p>
        }
        placeholder="Enter Password"
        rules={validatePassword}
        errors={errors}
        trigger={trigger}
        errorColor="text-primary"
      />
      <PasswordInput
        register={register}
        name="newPassword"
        label={
          <p className="px-3 flex items-center text-black/50 gap-2 font-semibold text-sm ">
            {" "}
            <CiLock /> New Password *
          </p>
        }
        placeholder="Enter New Password"
        rules={getValidateConfirmPassword(watch)}
        errors={errors}
        trigger={trigger}
        errorColor="text-primary"
        disabled={errors["password"] || !watch("password") ? true : false}
      /> 
      <div className=" flex justify-center">
        <Button
          className="rounded-lg mt-1 font-bold !w-[188px]  !h-[48px]"
          type="submit"
          textSize="text-xs lg:text-sm"
          bgColor="bg-primary"
          color="text-white"
          isLoading={success?.loading}
          isSuccess={success?.success}
        >
          Reset Password
        </Button>
      </div>
    </form>
  );
};

export default ResetPassword;

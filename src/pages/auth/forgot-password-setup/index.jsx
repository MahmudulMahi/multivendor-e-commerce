import React, { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import AuthLayout from "@/components/auth/AuthLayout";
import Button from "@/components/ui/Button";
import { PasswordInput } from "@/components/ui/Input";
import { CiLock } from "@/icons";
import { validatePassword } from "@/utils/validation";
import { setupForgotPassword } from "@/lib/api/auth/auth";
import { networkErrorHandeller, responseHandler } from "@/utils/helpers";
import { notifySuccess } from "@/utils/toast"; 
import { ROUTES } from "@/constants/route";

const SetupForgotPassword = () => {
  const router = useRouter(); 
  const [success, setSuccess] = useState({
    loading: false,
    success: false,
  });
  // hook form use
  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
  } = useForm();
  const onSubmit = async (data) => {
    setSuccess({
      ...success,
      loading: true,
    });

    // login api integrate here
    try {
      const response = await setupForgotPassword({
        ...data,
        phone: router?.query?.number,
        code: router?.query?.code,
      });
      if (responseHandler(response)) {
        setSuccess({
          loading: false,
          success: true,
        });
        notifySuccess(response?.data?.message);
        router?.push(ROUTES?.LOGIN);
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
    <AuthLayout onsubmit={handleSubmit(onSubmit)}>
      <p className="text-center pb-5 font-normal">
        Hello  <br />
        <span className="font-semibold text-white text-[15px]">
          Please set a password for your account
        </span>
      </p>

      <PasswordInput
        register={register}
        name="password"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            <CiLock /> Password{" "}
          </p>
        }
        rules={validatePassword}
        errors={errors}
        trigger={trigger}
        placeholder={"Password"}
      />
      <PasswordInput
        register={register}
        name="confirm_password"
        label={
          <p className="px-3 flex items-center text-white gap-2 font-semibold text-sm ">
            {" "}
            <CiLock /> Password{" "}
          </p>
        }
        rules={validatePassword}
        errors={errors}
        trigger={trigger}
        placeholder={"Re Type password"}
      />
      <div className=" flex justify-center">
        <Button
          className="rounded-lg mt-8  font-bold !w-[188px]  !h-[48px]"
          type="submit"
          textSize="text-xs lg:text-sm"
          bgColor="bg-white"
          color="text-primary"
          isLoading={success?.loading}
          isSuccess={success?.success}
        >
          Save Password
        </Button>
      </div>
    </AuthLayout>
  );
};

export default SetupForgotPassword;
